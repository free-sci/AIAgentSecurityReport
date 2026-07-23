# AI智能体主要安全漏洞核验后 Markdown 表格

说明：权威来源可确认并能修订的条目已更新；查不到权威来源的条目按用户要求保持原表内容不变，具体问题见 `agent_vuln_audit_report.md`。

| 发现精确日期 | 漏洞名称 / 事件 | 影响产品 / 框架 | CVSS 评分 | CVE 编号 | 漏洞影响简述（3 点） |
|---|---|---|---:|---|---|
| 2026-06-29 | Vertex MCP 无认证远程代码执行[参考文献] | GCP Vertex AI MCP | 9.7 | CVE-2026-46205 | 1. MCP工具参数未过滤恶意脚本，未登录攻击者直接执行云主机命令<br>2. 绕过云平台IAM权限体系，读取存储桶全部训练数据与模型权重<br>3. 漏洞公开48小时出现批量扫描利用脚本，谷歌云上大量租户未修复 |
| 2026-05-06 | OpenClaw OpenShell 沙箱文件写入 TOCTOU / symlink swap | OpenClaw before 2026.4.22 | 9.6 | CVE-2026-44112 | 1. OpenShell 沙箱文件系统写入存在 time-of-check/time-of-use 竞态<br>2. 攻击者可通过 symlink swap 将写入重定向到预期 mount root 之外<br>3. 应升级到 2026.4.22 或包含修复提交的版本 |
| 2026-04-02 | Azure MCP Server 关键功能缺失认证 | Azure MCP Server / Azure Web Apps hosted service | 9.1 | CVE-2026-32211 | 1. 关键功能缺少认证，未授权攻击者可经网络访问受影响服务<br>2. 可造成信息泄露；Microsoft CNA 评分还计入完整性影响<br>3. 以 Microsoft MSRC / NVD 记录为准，CVSS 9.1 为 Microsoft CNA 评分 |
| 2026-04-09 | CamoLeak | GitHub Copilot Chat | 9.6 | 未公开 | 1. PR隐藏注释嵌入隐形提示载荷，绕过前端内容过滤检测<br>2. 依托Camo代理中转流量，静默窃取仓库全部源代码与密钥<br>3. 攻击无交互、无日志告警，大量企业私有代码仓库遭批量泄露 |
| 2026-02-10 | Moltbook 大规模劫持 | Moltbook 平台 | 9.8 | 未公开 | 1. 后端数据库未加密裸存API访问凭证，批量窃取智能体密钥<br>2. WebSocket通道零点击远程接管在线运行Agent实例<br>3. 全网77万活跃智能体被批量劫持，用于挖矿、窃密与勒索分发 |
| 2025-12-23 | LangChain dumps/dumpd 序列化注入 | LangChain before 0.3.81 and 1.2.5 | 9.3 | CVE-2025-68664 | 1. `dumps()` / `dumpd()` 未转义自由字典中的 `lc` 键结构<br>2. 用户可控数据在反序列化时可能被当作 LangChain 对象处理，而非普通数据<br>3. 已在 0.3.81 和 1.2.5 修复，应避免反序列化不可信配置 |
| 2025-08-14 | Codex CLI 命令注入 | OpenAI Codex CLI | 9.1 | CVE-2025-61260 | 1. 用户本地配置文件字段未做过滤，可注入系统原生命令<br>2. 依托智能体高权限上下文执行高危系统操作<br>3. 本地密钥、ssh私钥等敏感文件可被攻击者完整读取外发 |
| 2025-06-11 | EchoLeak / M365 Copilot AI command injection | Microsoft 365 Copilot | 9.3 | CVE-2025-32711 | 1. M365 Copilot 存在 AI command injection，未授权攻击者可经网络触发信息泄露<br>2. 该漏洞被公开命名为 EchoLeak，NVD 同时引用 Microsoft MSRC 与 Aim Security 页面<br>3. CVSS 9.3 为 Microsoft CNA 评分；NVD 自身评分为 7.5 |
| 2026-07-01 | CometAgent 会话持久化后门植入 | Perplexity CometAgent | 8.9 | CVE-2026-46827 | 1. 本地日历载荷注入，持久写入后台会话存储长期潜伏<br>2. 静默遍历本地密码管理器、文档目录批量窃取隐私文件<br>3. 无弹窗、无日志告警，数月时间内持续上传用户敏感数据 |
| 2026-06-30 | CrewAI 集群中间人劫持 | CrewAI Enterprise v0.22+ | 8.4 | CVE-2026-46358 | 1. 多智能体通信通道未加密，中间人篡改任务调度指令<br>2. 诱导高权限智能体导出全集群业务数据库与向量知识库<br>3. 协同任务信任校验缺失，横向渗透所有关联业务智能体 |
| 2026-06-02 | AutoGen 多智能体跨角色越权 | Microsoft AutoGen | 8.7 | CVE-2026-45109 | 1. 多角色隔离逻辑失效，低权限智能体可调用管理员级工具<br>2. 跨会话记忆共享漏洞，读取其他Agent私有上下文与凭证<br>3. 可组合多工具链式调用，批量导出租户内部业务敏感数据 |
| 2026-05-28 | Claude Code Hooks RCE | Anthropic Claude Code | 8.2 | GHSA-ph6w-f82w-28w6 | 1. 恶意settings.json配置文件可注入自定义执行钩子脚本<br>2. 智能体会话启动时自动加载并执行攻击者预设恶意代码<br>3. 本地项目目录全部文件可读、可修改，泄露研发密钥与源码 |
| 2026-03-30 | LangChain prompt loading 路径遍历 | LangChain / langchain-core before 1.2.22 | 7.5 | CVE-2026-34070 | 1. `langchain_core.prompts.loading` 多个函数未充分校验配置字典中的路径<br>2. 当应用把用户可影响的 prompt 配置传入 `load_prompt()` 或 `load_prompt_from_config()` 时，攻击者可读取主机文件<br>3. 读取受模板/示例文件扩展名检查限制；已在 1.2.22 修复 |
| 2026-05-08 | PraisonAI legacy Flask API 默认禁用认证 | PraisonAI 2.5.6 to before 4.6.34 | 7.3 | CVE-2026-44338 | 1. legacy Flask API server 默认禁用认证<br>2. 任意可达调用方可访问 `/agents` 并通过 `/chat` 触发 `agents.yaml` 工作流<br>3. 已在 4.6.34 修复，应升级并限制 API 暴露面 |
| 2026-04-03 | PraisonAI Gateway 未授权 WebSocket / info 访问 | PraisonAI Gateway before 4.5.97 | 9.1 | CVE-2026-34952 | 1. Gateway server 在 `/ws` 接受 WebSocket 连接且 `/info` 暴露 agent topology，均缺少认证<br>2. 任意网络客户端可枚举已注册 agents，并向 agents 及其 tool sets 发送任意消息<br>3. 已在 4.5.97 修复，应升级并对网关入口加认证与网络隔离 |
| 2025-12-17 | MCP server git 复合漏洞 | Model Context Protocol Servers / mcp-server-git | 8.8 / 7.1 / 9.1 | CVE-2025-68143 / CVE-2025-68144 / CVE-2025-68145 | 1. `git_init` 可在任意可访问路径创建仓库，使后续 Git 操作越出预期范围<br>2. `git_diff` / `git_checkout` 对用户参数缺少校验，flag-like 参数可导致任意文件覆盖<br>3. `--repository` 限制下未校验后续 `repo_path` 是否仍在允许仓库内，可操作其他可访问仓库 |
| 2026-07-03 | LlamaIndex RAG 语义隐式注入 | LlamaIndex 0.11.2 | 6.2 | CVE-2026-46945 | 1. 向量检索相似度阈值校验缺陷，隐蔽恶意片段混入检索结果<br>2. 无来源溯源标记，篡改知识库诱导智能体输出虚假业务结论<br>3. 多租户场景跨库语义泄露，竞争对手可反向还原私有业务数据 |
| 2026-06-01 | LlamaIndex 向量库越权检索 | LlamaIndex 0.10.x | 6.4 | CVE-2026-45011 | 1. 租户向量空间无隔离，检索时可跨库读取其他用户私有嵌入数据<br>2. 相似度检索无访问权限校验，批量匹配获取隐私语义片段<br>3. 无法区分数据归属主体，多租户场景极易引发批量隐私泄露 |
| 2026-03-15 | CrewAI 角色越权 | CrewAI 多智能体框架 | 5.9 | 未公开 | 1. 角色权限边界隔离代码缺失，低权限Agent访问管理员上下文<br>2. 跨任务记忆无访问控制，窃取其他任务内存储的业务密钥<br>3. 多智能体协同任务中可篡改队友输出结果，伪造合规业务数据 |
| 2025-12-08 | Meta LiteLLM 供应链投毒 | Meta/Mercor | 6.8 | 未公开 | 1. 第三方依赖包被恶意污染，内置静默数据上传后门<br>2. 启动时自动导出训练数据集、模型权重与API访问密钥<br>3. 依赖广泛被智能体项目引用，形成大范围供应链连锁风险 |
