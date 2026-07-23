const { spawn, spawnSync } = require('node:child_process');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'output', 'playwright');
fs.mkdirSync(output, { recursive: true });

const server = spawn(
  'npm.cmd',
  ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '5173'],
  { cwd: root, shell: true, stdio: ['ignore', 'pipe', 'pipe'] },
);

function waitForServer(attempts = 30) {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      http.get('http://127.0.0.1:5173/', (response) => {
        response.resume();
        if (response.statusCode === 200) resolve();
        else retry();
      }).on('error', retry);
    };
    const retry = () => {
      if (--attempts <= 0) reject(new Error('Vite server did not start'));
      else setTimeout(attempt, 250);
    };
    attempt();
  });
}

(async () => {
  const results = {
    pages: [],
    consoleErrors: [],
    requestFailures: [],
    checks: {},
  };
  let browser;
  try {
    await waitForServer();
    browser = await chromium.launch({
      headless: true,
      executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.on('console', (message) => {
      if (message.type() === 'error') results.consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => results.consoleErrors.push(error.message));
    page.on('requestfailed', (request) => {
      results.requestFailures.push({
        url: request.url(),
        error: request.failure()?.errorText || '',
      });
    });

    for (const route of ['/', '/survey', '/research', '/products', '/incidents', '/policy', '/tables', '/references']) {
      await page.goto(`http://127.0.0.1:5173${route}`, { waitUntil: 'networkidle' });
      const slug = route === '/' ? 'home' : route.slice(1);
      await page.screenshot({ path: path.join(output, `${slug}-desktop.png`), fullPage: route === '/' });
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        pageWidth: document.documentElement.scrollWidth,
        title: document.querySelector('h1')?.textContent?.trim() || '',
      }));
      results.pages.push({ route, ...dimensions });
    }

    await page.goto('http://127.0.0.1:5173/tables', { waitUntil: 'networkidle' });
    results.checks.tableShapes = await page.evaluate(() =>
      [...document.querySelectorAll('table')].map((table) => ({
        columns: table.querySelectorAll('thead th').length,
        validRows: [...table.querySelectorAll('tbody tr')].every(
          (row) => row.querySelectorAll('td').length === table.querySelectorAll('thead th').length,
        ),
      })),
    );

    await page.goto('http://127.0.0.1:5173/incidents', { waitUntil: 'networkidle' });
    const eventButtons = page.locator('aside button');
    const eventButtonCount = await eventButtons.count();
    if (eventButtonCount > 1) {
      await eventButtons.nth(1).click();
      await page.waitForTimeout(700);
      results.checks.incidentJump = await eventButtons.nth(1).evaluate((button) =>
        button.className.includes('bg-blue-50'),
      );
    }

    await page.goto('http://127.0.0.1:5173/survey', { waitUntil: 'networkidle' });
    const citationLinks = page.locator('article a[href^="http"]');
    results.checks.citationCount = await citationLinks.count();
    if (results.checks.citationCount > 0) {
      const href = await citationLinks.nth(0).getAttribute('href');
      results.checks.citationJump = {
        href,
        isExternalUrl: /^https?:\/\//.test(href || ''),
      };
    }
    await page.goto('http://127.0.0.1:5173/references#ref-502', { waitUntil: 'networkidle' });
    results.checks.referenceAnchor = await page.locator('#ref-502').count() === 1;

    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of ['/', '/survey', '/tables', '/incidents']) {
      await page.goto(`http://127.0.0.1:5173${route}`, { waitUntil: 'networkidle' });
      const slug = route === '/' ? 'home' : route.slice(1);
      await page.screenshot({ path: path.join(output, `${slug}-mobile.png`), fullPage: false });
      const noViewportOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      );
      results.checks[`${slug}MobileOverflow`] = noViewportOverflow;
    }

    fs.writeFileSync(path.join(output, 'qa-results.json'), JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally {
    if (browser) await browser.close();
    spawnSync('taskkill', ['/pid', String(server.pid), '/t', '/f']);
  }
})().catch((error) => {
  console.error(error);
  spawnSync('taskkill', ['/pid', String(server.pid), '/t', '/f']);
  process.exit(1);
});
