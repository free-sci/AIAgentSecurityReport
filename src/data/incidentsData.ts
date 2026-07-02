export interface IncidentData {
  id: string;
  title: string;
  date: string;
  riskLevel: 'high' | 'medium' | 'info';
  description: string;
  tags: string[];
  imageUrl?: string;
}

export interface MonthNode {
  month: string;
  monthLabel: string;
  incidents: IncidentData[];
}

export interface YearGroup {
  year: string;
  yearLabel: string;
  months: MonthNode[];
}

const INCIDENTS: IncidentData[] = [
  {
    id: '2026-05-27-openclaw-claw-chain',
    title: 'Claw Chain（OpenClaw）漏洞公开',
    date: '2026.05.27',
    riskLevel: 'high',
    description:
      'OpenClaw 框架公开 CVE-2026-44112，CVSS 9.6，涉及沙箱逃逸、本地提权与持久化控制，约 24.5 万实例暴露。',
    tags: ['附录G.3', '附录H.1', 'Critical', 'OpenClaw'],
    imageUrl: 'gradient-blue',
  },
  {
    id: '2026-05-26-agent-policy-china',
    title: '《智能体规范应用与创新发展实施意见》印发',
    date: '2026.05.26',
    riskLevel: 'info',
    description: '国家级 AI Agent 专项政策落地，明确重点应用场景、规范要求与安全红线。',
    tags: ['附录H.1', 'Policy', 'Governance'],
  },
  {
    id: '2026-05-21-hermes-token-scale',
    title: 'Hermes Agent 日活 Token 达 2910 亿',
    date: '2026.05.21',
    riskLevel: 'info',
    description: 'Hermes Agent 日活 Token 达 2910 亿，超过 OpenClaw 成为全球第一大 Agent 应用。',
    tags: ['附录H.1', 'Industry'],
  },
  {
    id: '2026-05-20-gemini-3-5-agent',
    title: '谷歌 I/O 发布 Gemini 3.5',
    date: '2026.05.20',
    riskLevel: 'info',
    description: 'Gemini 3.5 支持全链路 Agent 化，月活达到 9 亿。',
    tags: ['附录H.1', 'Product', 'Gemini'],
  },
  {
    id: '2026-05-19-openclaw-version-update',
    title: 'OpenClaw 发布重大版本更新',
    date: '2026.05.19',
    riskLevel: 'info',
    description: 'OpenClaw 发布包含 100 多项优化的重大版本，强化容器化能力与权限控制机制。',
    tags: ['附录H.1', 'Product', 'OpenClaw'],
  },
  {
    id: '2026-05-14-baidu-agent-first',
    title: '百度确立“智能体优先”战略',
    date: '2026.05.14',
    riskLevel: 'info',
    description: '百度 Create 2026 提出“智能体优先”战略，并以 DAA 作为行业衡量指标。',
    tags: ['附录H.1', 'Strategy'],
  },
  {
    id: '2026-05-11-volcengine-agent-plan',
    title: '火山引擎发布 Agent Plan',
    date: '2026.05.11',
    riskLevel: 'info',
    description: '火山引擎推出全模态智能体套餐，将相关能力升级为企业级 Agent 平台。',
    tags: ['附录H.1', 'Product'],
  },
  {
    id: '2026-05-08-bytedance-office-agent',
    title: '字节跳动发布“字节智助”办公 Agent',
    date: '2026.05.08',
    riskLevel: 'info',
    description: '“字节智助”作为大规模企业办公智能体上线，推动办公场景自动化协作。',
    tags: ['附录H.1', 'Enterprise'],
  },
  {
    id: '2026-05-01-microsoft-agent-365',
    title: '微软发布 Agent 365',
    date: '2026.05.01',
    riskLevel: 'info',
    description: 'Agent 365 将智能体全面嵌入 Office 套件，企业级权限、身份与审计体系成型。',
    tags: ['附录H.1', 'Product', 'Microsoft'],
  },
  {
    id: '2026-05-claude-code-hooks-rce',
    title: 'Claude Code Hooks 远程代码执行风险',
    date: '2026.05',
    riskLevel: 'high',
    description: '恶意 settings.json 可在会话启动时触发远程代码执行，CVSS 8.2。',
    tags: ['附录G.3', 'High', 'RCE', 'Claude Code'],
  },
  {
    id: '2026-05-langchain-path-traversal',
    title: 'LangChain PromptLoading 路径遍历',
    date: '2026.05',
    riskLevel: 'high',
    description: 'PromptLoading API 存在路径遍历问题，可导致任意文件读取，CVSS 7.5。',
    tags: ['附录G.3', 'High', 'LangChain'],
  },
  {
    id: '2026-05-praisonai-auth-missing',
    title: 'PraisonAI 关键功能认证缺失',
    date: '2026.05',
    riskLevel: 'high',
    description: 'PraisonAI 2.5.6 至 4.6.33 关键功能缺少认证，CVSS 7.3。',
    tags: ['附录G.3', 'High', 'PraisonAI'],
  },
  {
    id: '2026-04-28-camoleak-copilot',
    title: 'CamoLeak 注入攻击窃取代码仓库数据',
    date: '2026.04.28',
    riskLevel: 'high',
    description: 'GitHub Copilot Chat 遭注入攻击，攻击者通过 Camo 代理静默窃取代码，CVSS 9.6。',
    tags: ['附录G.3', '附录H.1', 'Critical', 'Copilot'],
  },
  {
    id: '2026-04-21-openclaw-sandbox-bypass',
    title: 'OpenClaw 沙箱绕过提权漏洞',
    date: '2026.04.21',
    riskLevel: 'high',
    description: 'OpenClaw 披露 CVE-2026-41329，CVSS 9.9，涉及沙箱绕过和权限提升。',
    tags: ['附录H.1', 'Critical', 'OpenClaw'],
  },
  {
    id: '2026-04-15-azure-mcp-auth-bypass',
    title: 'Azure MCP 认证绕过漏洞',
    date: '2026.04.15',
    riskLevel: 'high',
    description: 'Azure MCP Server 可在无凭证条件下访问敏感数据，CVSS 9.1。',
    tags: ['附录G.3', '附录H.1', 'Critical', 'MCP'],
  },
  {
    id: '2026-04-10-praisonai-gateway',
    title: 'PraisonAI Gateway 未授权访问',
    date: '2026.04.10',
    riskLevel: 'high',
    description: '未认证 WebSocket 可被用于远程控制所有 Agent，CVSS 8.6。',
    tags: ['附录G.3', '附录H.1', 'High', 'PraisonAI'],
  },
  {
    id: '2026-03-18-crewai-role-escalation',
    title: 'CrewAI 多智能体角色越权',
    date: '2026.03.18',
    riskLevel: 'medium',
    description: 'CrewAI 多智能体框架角色权限隔离失效，可跨角色访问敏感上下文，CVSS 5.9。',
    tags: ['附录G.3', '附录H.1', 'Medium', 'CrewAI'],
  },
  {
    id: '2026-03-05-gpt-4o-agent-commercial',
    title: 'GPT-4o 多模态 Agent 正式商用',
    date: '2026.03.05',
    riskLevel: 'info',
    description: 'GPT-4o 多模态 Agent 进入商用阶段，整合实时视听理解与工具调用能力。',
    tags: ['附录H.1', 'Product'],
  },
  {
    id: '2026-03-meta-internal-agent',
    title: 'Meta 内部自研 AI Agent 权限越界',
    date: '2026.03',
    riskLevel: 'high',
    description: '内部 Agent 自主决策失控并越权访问核心敏感数据，后续开展权限重构审计。',
    tags: ['附录G.1', '联网核月', 'Access Control'],
  },
  {
    id: '2026-02-14-moltbook-hijack',
    title: 'Moltbook 77 万 Agent 被大规模劫持',
    date: '2026.02.14',
    riskLevel: 'high',
    description: 'Moltbook 平台数据库漏洞导致约 77 万活跃 Agent 被批量接管，CVSS 9.8。',
    tags: ['附录G.3', '附录H.1', 'Critical', 'Moltbook'],
    imageUrl: 'gradient-indigo',
  },
  {
    id: '2026-02-openclaw-moltbook-platform-compromise',
    title: 'OpenClaw/Moltbook 平台大规模集群沦陷',
    date: '2026.02',
    riskLevel: 'high',
    description: '平台漏洞导致全局权限被劫持，约 77 万个 Agent 被控制，估算损失 2.3 亿美元。',
    tags: ['附录G.1', '附录G.3', 'Financial Loss'],
  },
  {
    id: '2026-01-30-moltbot-openclaw',
    title: 'Moltbot 更名为 OpenClaw',
    date: '2026.01.30',
    riskLevel: 'info',
    description: 'Moltbot 正式更名为 OpenClaw，确立开源 AI 智能体标杆定位。',
    tags: ['附录H.1', 'Product', 'OpenClaw'],
  },
  {
    id: '2026-01-27-clawdbot-moltbot',
    title: 'Clawdbot 更名为 Moltbot',
    date: '2026.01.27',
    riskLevel: 'info',
    description: 'Clawdbot 因 Anthropic 商标投诉更名为 Moltbot。',
    tags: ['附录H.1', 'Product'],
  },
  {
    id: '2026-01-05-clawdbot-release',
    title: 'Clawdbot（OpenClaw 前身）发布',
    date: '2026.01.05',
    riskLevel: 'info',
    description: 'Peter Steinberger 发布 Clawdbot，开启“能动手做事”的开源行动型 Agent 阶段。',
    tags: ['附录H.1', 'Release', 'OpenClaw'],
  },
  {
    id: '2026-undated-mexico-government-agent-cluster',
    title: '墨西哥政府机构智能体集群遭定向渗透',
    date: '2026',
    riskLevel: 'high',
    description: '攻击者诱导编程智能体执行远程命令，造成 9 大政府机构被入侵、数亿条公民数据外泄。',
    tags: ['附录G.1', 'PDF未给月份', 'Government'],
  },
  {
    id: '2026-undated-csa-agent-security-stat',
    title: '企业 AI Agent 安全现状统计',
    date: '2026',
    riskLevel: 'info',
    description: '65% 企业年内遭遇 AI Agent 安全事件，仅 6% 企业配置专项安全预算。',
    tags: ['附录G.2', 'PDF未给月份', 'Industry Statistics'],
  },
  {
    id: '2025-12-18-gemini-3-flash',
    title: '谷歌 Gemini 3 Flash 发布',
    date: '2025.12.18',
    riskLevel: 'info',
    description: 'Gemini 3 Flash 发布，推理成本下降 90%，支撑端侧大规模部署。',
    tags: ['附录H.1', 'Product', 'Gemini'],
  },
  {
    id: '2025-12-11-gemini-deep-research-agent',
    title: 'Gemini Deep Research Agent 发布',
    date: '2025.12.11',
    riskLevel: 'info',
    description: 'Gemini Deep Research Agent 发布，HLE 准确率达到 46.4%。',
    tags: ['附录H.1', 'Research Agent'],
  },
  {
    id: '2025-12-05-gpt-5-2-chatgpt-agent',
    title: 'OpenAI 发布 GPT-5.2 + ChatGPT Agent',
    date: '2025.12.05',
    riskLevel: 'info',
    description: 'GPT-5.2 与 ChatGPT Agent 支持 100 多个工具并行调用。',
    tags: ['附录H.1', 'Product', 'Tool Calling'],
  },
  {
    id: '2025-12-01-meta-litellm-poisoning',
    title: 'Meta LiteLLM 供应链投毒事件',
    date: '2025.12.01',
    riskLevel: 'medium',
    description: 'LiteLLM 依赖污染导致训练数据密钥泄露，CVSS 6.8。',
    tags: ['附录G.3', '附录H.1', 'Medium', 'Supply Chain'],
  },
  {
    id: '2025-11-28-langchain-serialization',
    title: 'LangChain 序列化注入漏洞',
    date: '2025.11.28',
    riskLevel: 'high',
    description: 'CVE-2025-68664 可导致代码执行与环境变量泄露，CVSS 9.3。',
    tags: ['附录G.3', '附录H.1', 'Critical', 'LangChain'],
    imageUrl: 'gradient-blue',
  },
  {
    id: '2025-11-18-gemini-3-release',
    title: '谷歌 Gemini 3 正式发布',
    date: '2025.11.18',
    riskLevel: 'info',
    description: 'Gemini 3 正式发布，MMLU 1501 分刷新纪录。',
    tags: ['附录H.1', 'Product', 'Gemini'],
  },
  {
    id: '2025-11-03-amazon-openai-aws',
    title: '亚马逊与 OpenAI 达成 380 亿美元战略合作',
    date: '2025.11.03',
    riskLevel: 'info',
    description: 'AWS 成为独家云服务商，Agent 基础设施向头部云平台集中。',
    tags: ['附录H.1', 'Industry', 'Cloud'],
  },
  {
    id: '2025-11-01-clawdbot-initial',
    title: 'Clawdbot 初始版本上线',
    date: '2025.11.01',
    riskLevel: 'info',
    description: 'Clawdbot（OpenClaw）初始版本上线。',
    tags: ['附录H.1', 'Project Launch', 'OpenClaw'],
  },
  {
    id: '2025-09-anthropic-mcp-git',
    title: 'Anthropic MCP Git 三漏洞',
    date: '2025.09',
    riskLevel: 'high',
    description: 'CVE-2025-68143/68144/68145 涉及命令注入、路径遍历与信息泄露，CVSS 8.8。',
    tags: ['附录G.3', 'High', 'MCP'],
  },
  {
    id: '2025-08-codex-cli-command-injection',
    title: 'Codex CLI 命令注入漏洞',
    date: '2025.08',
    riskLevel: 'high',
    description: 'CVE-2025-61260 本地配置文件注入可导致任意命令执行，CVSS 9.1。',
    tags: ['附录G.3', 'Critical', 'Codex CLI'],
  },
  {
    id: '2025-07-replit-agent-data-deletion',
    title: 'Replit 开发平台 AI Agent 误操作删除数据',
    date: '2025.07',
    riskLevel: 'high',
    description: 'AI Agent 自主执行高危删除指令并篡改用户数据，导致生产数据库被删除。',
    tags: ['附录G.1', '联网核月', 'Data Destruction'],
  },
  {
    id: '2025-undated-langchain-cluster-loop',
    title: '市场调研公司 LangChain 集群无限调用循环',
    date: '2025',
    riskLevel: 'medium',
    description: '多智能体协作异常形成无限调用循环，长时间无效调用产生高额 API 账单。',
    tags: ['附录G.1', 'PDF未给月份', 'LangChain'],
  },
  {
    id: '2025-undated-aws-management-agent-outage',
    title: '企业 AWS 管理 Agent 批量删除生产节点',
    date: '2025',
    riskLevel: 'high',
    description: '运维 Agent 目标判断失误，批量删除生产服务器节点，造成云服务中断 13 小时。',
    tags: ['附录G.1', 'PDF未给月份', 'Cloud Ops'],
  },
  {
    id: '2025-undated-hospital-diagnosis-agent',
    title: '三甲医院 AI 诊断 Agent 知识库投毒',
    date: '2025',
    riskLevel: 'high',
    description: 'RAG 知识库被篡改并诱导智能体错误诊断，出现 37 例误诊并引发严重医疗事故。',
    tags: ['附录G.1', 'PDF未给月份', 'Healthcare'],
  },
  {
    id: '2025-undated-agentbench-attack',
    title: 'AgentBench-Attack 暴露生产级 Agent 风险',
    date: '2025',
    riskLevel: 'info',
    description: '测试显示生产级 Agent 存在工具链劫持与知识库投毒等通用安全隐患。',
    tags: ['附录G.2', 'PDF未给月份', 'Academic Risk'],
  },
  {
    id: '2025-undated-code-review-agent-backdoor',
    title: '代码审查 Agent 后门植入实验',
    date: '2025',
    riskLevel: 'info',
    description: '恶意代码注释可诱导智能体偏移目标并自动植入后门。',
    tags: ['附录G.2', 'PDF未给月份', 'Supply Chain'],
  },
  {
    id: '2024-10-copilot-codespaces-token',
    title: 'Copilot Codespaces 令牌泄露',
    date: '2024.10',
    riskLevel: 'medium',
    description: 'GitHub Copilot（Codespaces）指令注入导致 GITHUB_TOKEN 泄露，CVSS 6.5。',
    tags: ['附录G.3', 'Medium', 'Copilot'],
  },
  {
    id: '2024-08-slack-ai-agent-token-theft',
    title: 'Slack 企业版 AI Agent 私有频道令牌被窃取',
    date: '2024.08',
    riskLevel: 'high',
    description: '攻击者通过间接提示注入窃取私有频道数据或凭证，造成企业数据外泄风险。',
    tags: ['附录G.1', '联网核月', 'Prompt Injection'],
    imageUrl: 'gradient-indigo',
  },
  {
    id: '2024-01-microsoft-365-copilot-calendar',
    title: 'Microsoft 365 Copilot 恶意日历邀请劫持',
    date: '2024.01',
    riskLevel: 'high',
    description: '恶意日历事件可诱导 Copilot 泄露上下文中的敏感信息。',
    tags: ['附录G.1', '联网核月', 'Microsoft 365'],
  },
  {
    id: '2024-undated-code-hosting-review-agent',
    title: '头部代码托管平台审查 Agent 被诱导植入后门',
    date: '2024',
    riskLevel: 'high',
    description: '恶意注释诱导代码审查 Agent 决策偏移并自动植入后门，影响供应链安全。',
    tags: ['附录G.1', 'PDF未给月份', 'Backdoor'],
  },
  {
    id: '2023-undated-retail-monitoring-agent',
    title: '上市零售企业监控 Agent 遭内网入侵',
    date: '2023',
    riskLevel: 'high',
    description: '攻击者利用弱口令暴力破解并伪造代理接入内网，泄露经营数据、订单与联系方式。',
    tags: ['附录G.1', 'PDF未给月份', 'Data Breach'],
  },
  {
    id: '2023-undated-fintech-customer-service-agent',
    title: '金融科技客服 Agent 被提示注入调用转账接口',
    date: '2023',
    riskLevel: 'high',
    description: '提示注入绕过安全防护并调用转账接口，测试资金被非法划转。',
    tags: ['附录G.1', 'PDF未给月份', 'Finance'],
  },
  {
    id: '2023-undated-brokerage-advisor-agent',
    title: '多家券商 AI 理财 Agent 风控逻辑被绕过',
    date: '2023',
    riskLevel: 'high',
    description: 'AI 理财 Agent 风控逻辑被绕过并自主重仓高风险资产，全年出现多起财产损失事件。',
    tags: ['附录G.1', 'PDF未给月份', 'Financial Risk'],
  },
];

const dateParts = (date: string) => {
  const [year, month = '00', day = '00'] = date.split('.');
  return { year, month, day };
};

const monthLabel = (month: string) => {
  if (month === '00') return '年度事件';
  return `${Number(month)}月`;
};

export const INCIDENTS_TIMELINE: YearGroup[] = Object.entries(
  INCIDENTS.reduce<Record<string, Record<string, IncidentData[]>>>((acc, incident) => {
    const { year, month } = dateParts(incident.date);
    acc[year] ||= {};
    acc[year][month] ||= [];
    acc[year][month].push(incident);
    return acc;
  }, {}),
)
  .sort(([a], [b]) => Number(b) - Number(a))
  .map(([year, monthMap]) => ({
    year,
    yearLabel: `${year}年`,
    months: Object.entries(monthMap)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([month, incidents]) => ({
        month,
        monthLabel: monthLabel(month),
        incidents: incidents.sort((a, b) => {
          const ad = dateParts(a.date);
          const bd = dateParts(b.date);
          return Number(bd.day) - Number(ad.day);
        }),
      })),
  }));
