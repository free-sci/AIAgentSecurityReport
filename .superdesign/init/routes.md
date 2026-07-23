# Routes

Framework: React 19 + React Router 7 + Vite.

| Path | Entry | Purpose |
|---|---|---|
| `/` | `src/pages/HomePage.tsx` | Report overview and primary entry points |
| `/survey` | `src/pages/SurveyPage.tsx` | Seven lifecycle stages across problems, defenses and trends |
| `/research` | `src/pages/ResearchPage.tsx` | Chapter 2 academic and industry-academia landscape |
| `/products` | `src/pages/ProductsPage.tsx` | Chapter 2 regional product catalog |
| `/incidents` | `src/pages/IncidentsPage.tsx` | Events, vulnerabilities and attack tools |
| `/policy` | `src/pages/PolicyPage.tsx` | Regulations and export controls |
| `/tables` | `src/pages/TablesPage.tsx` | Complete report table browser |
| `/references` | `src/pages/ReferencesPage.tsx` | Numbered bibliography with URL links |

Legacy `/vulnerability` redirects to `/survey`; `/appendix`, `/protocol`, `/product`, `/team` redirect to the closest new route.

The router is configured in `src/App.tsx`.

