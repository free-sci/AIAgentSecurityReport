# AI智能体安全漏洞表格逐条审核报告

审核日期：2026-07-08  
审核口径：优先采用 NVD、CVE.org、GitHub Security Advisory、厂商安全公告等权威来源。查不到权威来源的条目，按用户要求只在本报告说明，不改动修改版表格中的原条目。

## 总体结论

原表 20 条中，8 条存在可由权威来源确认的真实漏洞但字段或影响描述需要修订；7 条未找到权威来源证实其为公开漏洞或公开事件；3 条的 CVE 编号经权威来源核实指向完全不同产品；2 条只有媒体/研究报道层面的线索，未能支撑 CVE、CVSS 或大规模影响叙述。

最主要的问题不是“个别分数误差”，而是：部分 CVE 编号被错误关联到 AI 智能体产品；部分真实漏洞的影响被扩大为“全量泄露、集群接管、批量利用”；若用于正式报告，建议把“可核验漏洞”和“未公开/未证实事件”分开列示。

## 逐条审核

| 序号 | 原条目 | 核验结论 | 主要依据 | 表格处理 |
|---:|---|---|---|---|
| 1 | Vertex MCP 无认证远程代码执行 / CVE-2026-46205 | 不准确。`CVE-2026-46205` 权威记录指向 Linux kernel atomisp private IOCTLs，CNA 评分 7.8，不是 GCP Vertex AI MCP，也不是 CVSS 9.7。未找到 Vertex MCP 该事件权威来源。 | NVD: https://nvd.nist.gov/vuln/detail/CVE-2026-46205 | 按用户要求，未证实事件在修改版表格保留原行。 |
| 2 | Claw Chain（OpenClaw）/ CVE-2026-44112 | 部分准确。CVE、OpenClaw、CNA CVSS 9.6 可确认；日期应以 NVD 发布日 2026-05-06 为准。影响是 OpenShell 沙箱文件写入中的 TOCTOU/symlink swap，可越出 mount root 写文件；“主机 root、接管全部节点、24.5 万实例”未见权威来源。 | NVD: https://nvd.nist.gov/vuln/detail/CVE-2026-44112 | 已修订日期和影响描述。 |
| 3 | Azure MCP 认证绕过 / CVE-2026-32211 | 部分准确。CVE、Azure MCP Server、CNA CVSS 9.1 可确认；NVD 发布日为 2026-04-02。影响为缺失关键功能认证，未授权攻击者可经网络造成信息泄露；NVD NIST 评分为 7.5，Microsoft CNA 评分为 9.1。“无官方修复补丁、读取全部租户数据”未见权威来源。 | NVD: https://nvd.nist.gov/vuln/detail/CVE-2026-32211 | 已修订日期和影响描述，CVSS 保留 CNA 9.1。 |
| 4 | CamoLeak / GitHub Copilot Chat | 未见权威来源证实。未找到 GitHub、NVD、CVE、GHSA 对 “CamoLeak” 与该 3 点影响的公开确认。 | 检索范围：CamoLeak、GitHub Copilot Chat、Camo proxy、CVE/GHSA | 按用户要求保留原行。 |
| 5 | Moltbook 大规模劫持 | 未见权威漏洞来源证实。公开报道线索显示 Moltbook 曾被研究人员披露存在大量 API token 泄露风险，但未找到 CVE/CVSS、WebSocket 零点击接管、77 万智能体被挖矿/勒索分发等权威确认。 | 检索范围：Moltbook、Wiz、API keys、agents | 按用户要求保留原行。 |
| 6 | LangChain 序列化注入 / CVE-2025-68664 | 部分准确。CVE 与 CNA CVSS 9.3 可确认；NVD 发布日为 2025-12-23，不是 2025-11-22。漏洞位于 `dumps()` / `dumpd()`，不是 `loads()`；影响是用户可控 `lc` 键结构在反序列化时被当作 LangChain 对象处理。直接“任意远程代码执行、完全控制服务进程”表述过强。 | NVD: https://nvd.nist.gov/vuln/detail/CVE-2025-68664 | 已修订日期、名称和影响描述。 |
| 7 | Codex CLI 命令注入 / CVE-2025-61260 | 未见权威来源证实。未找到 NVD/CVE/GHSA/OpenAI 官方公告确认该 CVE 与 OpenAI Codex CLI 对应。 | 检索范围：CVE-2025-61260、OpenAI Codex CLI command injection、OpenAI advisory | 按用户要求保留原行。 |
| 8 | EchoLeak / CVE-2025-32711 | 部分准确。CVE、Microsoft 365 Copilot、Microsoft CNA CVSS 9.3 可确认；NVD 发布日为 2025-06-11。NVD 描述为 M365 Copilot AI command injection，未授权攻击者可经网络造成信息泄露。表中“跨会话持久留存、大量企业批量外泄”未见权威来源支持。 | NVD: https://nvd.nist.gov/vuln/detail/CVE-2025-32711 | 已修订日期和影响描述，CVSS 保留 Microsoft CNA 9.3。 |
| 9 | CometAgent 会话持久化后门植入 / CVE-2026-46827 | 不准确。`CVE-2026-46827` 权威记录指向 Oracle Payroll，不是 Perplexity CometAgent；CNA CVSS 为 8.8，不是 8.9。未找到该 CometAgent 事件权威来源。 | NVD: https://nvd.nist.gov/vuln/detail/CVE-2026-46827 | 按用户要求保留原行。 |
| 10 | CrewAI 集群中间人劫持 / CVE-2026-46358 | 未见权威来源证实。未找到 NVD/CVE/GHSA 或 CrewAI 官方公告确认该 CVE、CVSS 与事件。 | 检索范围：CVE-2026-46358、CrewAI Enterprise v0.22、MITM | 按用户要求保留原行。 |
| 11 | AutoGen 多智能体跨角色越权 / CVE-2026-45109 | 不准确。`CVE-2026-45109` 权威记录指向 Next.js/Turbopack middleware 修复缺失，不是 Microsoft AutoGen；CNA CVSS 为 7.5，不是 8.7。未找到该 AutoGen 事件权威来源。 | NVD: https://nvd.nist.gov/vuln/detail/CVE-2026-45109 | 按用户要求保留原行。 |
| 12 | Claude Code Hooks RCE / GHSA-ph6w-f82w-28w6 | 未见权威来源证实该 GHSA。可检索到第三方研究/报道讨论 Claude Code hooks 相关 RCE 风险，但未找到 Anthropic 官方公告或该 GHSA 编号。 | 检索范围：GHSA-ph6w-f82w-28w6、Claude Code hooks RCE、Anthropic advisory | 按用户要求保留原行。 |
| 13 | LangChain 路径遍历 / CVE-2026-34070 | 部分准确。CVE、LangChain、CVSS 7.5 可确认；NVD 发布日为 2026-03-30，不是 2026-05-16。影响为 `langchain_core.prompts.loading` 中 `load_prompt()` / `load_prompt_from_config()` 处理用户可影响配置时可读取主机文件，但受文件扩展名限制；“容器逃逸读取宿主机敏感配置”未见权威来源。 | NVD: https://nvd.nist.gov/vuln/detail/CVE-2026-34070 | 已修订日期、影响描述。 |
| 14 | PraisonAI 认证缺失 / CVE-2026-44338 | 部分准确。CVE、PraisonAI、版本范围、CVSS 7.3 基本准确；NVD 发布日为 2026-05-08，不是 2026-05-03。影响为 legacy Flask API 默认禁用认证，可访问 `/agents` 并通过 `/chat` 触发 `agents.yaml` 工作流；“3 小时 44 分钟武器化脚本扩散”未见权威来源。 | NVD: https://nvd.nist.gov/vuln/detail/CVE-2026-44338 | 已修订日期和影响描述。 |
| 15 | PraisonAI 未授权 WebSocket 访问 / CVE-2026-34952 | 部分准确。CVE 与核心影响准确，但 CVSS 应为 9.1，不是 8.6；NVD 发布日为 2026-04-03，不是 2026-04-22。影响为 `/ws` 与 `/info` 缺少认证，可枚举 agent topology 并向 agent/tool set 发送任意消息。 | NVD: https://nvd.nist.gov/vuln/detail/CVE-2026-34952 | 已修订日期、CVSS 和影响描述。 |
| 16 | Anthropic MCP Git 复合漏洞 / CVE-2025-68143/4/5 | 部分准确。三个 CVE 均存在，但产品应表述为 Model Context Protocol Servers / `mcp-server-git`，不是 “Anthropic Git MCP”。NVD 发布日均为 2025-12-17。三项 CVSS 分别为 8.8、7.1、9.1；不能统一写 8.8。影响分别是任意路径 `git_init`、argument injection 导致任意文件覆盖、`repo_path` 边界校验绕过；“错误返回泄露环境密钥”未见权威来源。 | NVD: https://nvd.nist.gov/vuln/detail/CVE-2025-68143；https://nvd.nist.gov/vuln/detail/CVE-2025-68144；https://nvd.nist.gov/vuln/detail/CVE-2025-68145 | 已修订日期、产品、CVSS 和影响描述。 |
| 17 | LlamaIndex RAG 语义隐式注入 / CVE-2026-46945 | 未见权威来源证实。未找到该 CVE 与 LlamaIndex 的 NVD/CVE/GHSA/官方公告记录。 | 检索范围：CVE-2026-46945、LlamaIndex RAG semantic injection | 按用户要求保留原行。 |
| 18 | LlamaIndex 向量库越权检索 / CVE-2026-45011 | 未见权威来源证实。未找到该 CVE 与 LlamaIndex 的 NVD/CVE/GHSA/官方公告记录。 | 检索范围：CVE-2026-45011、LlamaIndex vector store authorization | 按用户要求保留原行。 |
| 19 | CrewAI 角色越权 | 未见权威来源证实。未找到 CrewAI 官方公告、CVE/GHSA 或 NVD 记录支撑该事件和 CVSS 5.9。 | 检索范围：CrewAI role escalation vulnerability、CrewAI CVE/GHSA | 按用户要求保留原行。 |
| 20 | Meta LiteLLM 供应链投毒 | 未见权威漏洞来源证实。公开媒体报道层面可见 LiteLLM 供应链攻击牵涉 Mercor/Meta 的线索，但未找到 CVE/CVSS、训练数据/模型权重/API 密钥自动导出等权威确认。 | 检索范围：Meta LiteLLM Mercor supply chain poisoning | 按用户要求保留原行。 |

## 建议

1. 正式报告中建议新增“证据级别”列，区分“CVE/厂商公告确认”“第三方研究披露”“媒体报道”“未证实”。
2. 不建议把未证实条目与 CVE 确认条目混排为同一严重度榜单，否则会显著降低表格可信度。
3. CVSS 建议标注来源，例如 `9.1 (Microsoft CNA)` 或 `7.5 (NVD)`，因为同一 CVE 的 CNA 与 NVD 评分常不一致。
4. “全网实例数量、批量利用、海量泄露、无日志告警”等结论只有在厂商公告、执法公告、CISA KEV 或研究报告明确给出时才应保留。
