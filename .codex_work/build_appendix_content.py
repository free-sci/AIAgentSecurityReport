from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path

import pdfplumber

PDF_PATH = Path(r"E:\下载\智能时代网络安全调研报告_持续更新中 (2).pdf")
OUT_PATH = Path("src/data/appendixContent.ts")


FILTERS = [
    ("all", "全部", "显示所有附录表格与条目"),
    ("terms", "术语", "中英文术语、核心概念"),
    ("architecture", "架构机制", "技术架构、运行机制、供应链概念"),
    ("dataset", "Dataset", "训练、轨迹、评测数据集"),
    ("benchmark", "Benchmark", "评测基准与能力测试"),
    ("safety", "Safety", "安全、对齐、治理相关资源"),
    ("attacks", "Attacks", "攻击工具、攻击方法"),
    ("product", "Product", "模型工具",),
    ("incidents", "Incidents", "安全事件、漏洞与损失"),
    ("milestones", "Milestones", "关键里程碑"),
    ("community", "Community", "开源社区、标准组织"),
    ("scholar", "Scholars", "国内外研究学者"),
    ("factory", "Factory", "智能体工厂案例"),
]


@dataclass
class TableSpec:
    key: str
    appendix: str
    title: str
    columns: list[str]
    pages: list[int]
    bounds: list[float]
    start_after: str | None = None
    end_before: str | None = None
    keywords: list[str] | None = None
    carry_columns: tuple[str, ...] = ()
    section_column: str | None = None


SPECS: list[TableSpec] = [
    TableSpec(
        "B.1",
        "附录B 主要术语",
        "表 B.1: AI Agent 整体发展历史与 OpenClaw 发展历史对比",
        ["发展阶段", "AI Agent 整体发展历程", "OpenClaw 发展历程"],
        [402],
        [50, 135, 340, 560],
        start_after="表 B.1",
        keywords=["architecture"],
    ),
    TableSpec(
        "B.2",
        "附录B 主要术语",
        "表 B.2: AI Agent 供应链、工具与技能概念对比",
        ["对比维度", "AI Agent 供应链", "工具（Tools）", "技能（Skills）"],
        [403],
        [50, 125, 280, 410, 560],
        start_after="表 B.2",
        end_before="表 B.3",
        keywords=["architecture"],
    ),
    TableSpec(
        "B.3",
        "附录B 主要术语",
        "表 B.3: AI Agent 供应商与 AI Agent 供应链概念对比",
        ["对比维度", "AI Agent 供应商", "AI Agent 供应链", "核心关系", "典型实例"],
        [403],
        [50, 120, 235, 365, 455, 560],
        start_after="表 B.3",
        keywords=["architecture"],
    ),
    TableSpec(
        "D.1",
        "附录D 主流数据集",
        "表 D.1: AI Agent 数据集--训练/轨迹类",
        ["类别", "数据集名称", "发布", "规模/核心内容", "用途"],
        [406],
        [55, 120, 245, 295, 430, 560],
        start_after="表 D.1",
        keywords=["dataset"],
        carry_columns=("类别",),
    ),
    TableSpec(
        "D.2",
        "附录D 主流数据集",
        "表 D.2: AI Agent 数据集--评测/基准类",
        ["类别", "数据集名称", "发布", "规模/核心内容", "用途"],
        [407],
        [80, 155, 265, 295, 405, 560],
        start_after="表 D.2",
        end_before="表 D.3",
        keywords=["dataset", "benchmark"],
        carry_columns=("类别",),
    ),
    TableSpec(
        "D.3",
        "附录D 主流数据集",
        "表 D.3: AI Agent 数据集--安全/对齐类",
        ["类别", "数据集名称", "发布", "规模/核心内容", "用途"],
        [407, 408],
        [55, 130, 255, 295, 405, 560],
        start_after="表 D.3",
        end_before="表 D.4",
        keywords=["dataset", "safety"],
        carry_columns=("类别",),
    ),
    TableSpec(
        "D.4",
        "附录D 主流数据集",
        "表 D.4: AI Agent 数据集--具身/多模态类",
        ["类别", "数据集名称", "发布", "规模/核心内容", "用途"],
        [408],
        [55, 130, 255, 295, 405, 560],
        start_after="表 D.4",
        end_before="表 D.5",
        keywords=["dataset", "benchmark"],
        carry_columns=("类别",),
    ),
    TableSpec(
        "D.5",
        "附录D 主流数据集",
        "表 D.5: AI Agent 数据集--中文/国内团队类",
        ["类别", "数据集名称", "发布", "规模/核心内容", "用途"],
        [408],
        [55, 130, 255, 295, 405, 560],
        start_after="表 D.5",
        keywords=["dataset"],
        carry_columns=("类别",),
    ),
    TableSpec(
        "E.1",
        "附录E 主流攻击工具（和方法）",
        "表 E.1: AI Agent 攻击工具全量明细汇总",
        ["工具分类", "工具名称", "核心功能", "应用场景", "形态属性", "风险等级"],
        [411],
        [50, 90, 150, 310, 415, 495, 560],
        start_after="表 E.1",
        keywords=["attacks", "safety"],
        carry_columns=("工具分类",),
    ),
    TableSpec(
        "F.1",
        "附录F 主要 AI Agent 模型",
        "表 F.1: 主流 AI Agent 模型能力多维对比表（2026）",
        ["模型名称", "所属厂商/社区", "能力等级", "开源/闭源", "多模态支持", "工具调用强度"],
        [412],
        [55, 155, 210, 295, 345, 445, 560],
        start_after="表 F.1",
        keywords=["product"],
    ),
    TableSpec(
        "G.1",
        "附录G 主流 AI Agent 安全事件与损失汇总",
        "表 G.1: 历年典型 AI Agent 安全事件明细",
        ["年份", "涉事主体", "事件类型", "攻击/异常手法", "核心损失与影响", "经济损失"],
        [414],
        [50, 80, 155, 230, 340, 450, 560],
        start_after="表 G.1",
        keywords=["incidents", "safety"],
        carry_columns=("年份",),
    ),
    TableSpec(
        "G.2",
        "附录G 主流 AI Agent 安全事件与损失汇总",
        "表 G.2: AI Agent 安全行业统计与学术风险事件",
        ["类别", "事件/统计主题", "核心内容", "备注"],
        [415],
        [50, 100, 245, 435, 560],
        start_after="表 G.2",
        end_before="表 G.3",
        keywords=["incidents", "safety"],
    ),
    TableSpec(
        "G.3",
        "附录G 主流 AI Agent 安全事件与损失汇总",
        "表 G.3: AI Agent 主要安全漏洞（按严重级别降序、发现时间倒序排列，2024-2026）",
        ["严重级别", "发现时间", "漏洞名称/事件", "影响产品/框架", "CVSS", "CVE/编号", "漏洞影响简述"],
        [415],
        [45, 120, 230, 300, 322, 378, 560],
        start_after="表 G.3",
        keywords=["incidents", "safety"],
        section_column="严重级别",
    ),
    TableSpec(
        "H.1",
        "附录H AI 智能体关键里程碑与安全事件全表",
        "表 H.1: openclaw 关键里程碑与安全事件全表（2025 年 10 月-2026 年 5 月）",
        ["时间", "类别", "完整事件说明"],
        [416, 417],
        [50, 105, 150, 560],
        start_after="表 H.1",
        keywords=["milestones", "incidents"],
    ),
]

TEXT_APPENDICES = [
    ("附录B 主要术语", [400, 401], ["terms", "architecture"]),
    ("附录C 智能体技术架构与运行机制", [404, 405], ["architecture"]),
    ("附录I AI 智能体主流开源与学术研究社区", [418, 419], ["community"]),
    ("附录K 智能体工厂（Agent Factory）", [422, 423], ["factory"]),
]


def q(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def page_lines(page) -> list[dict]:
    words = page.extract_words(x_tolerance=2, y_tolerance=3, keep_blank_chars=False)
    lines: list[dict] = []
    for word in words:
        top = float(word["top"])
        for line in lines:
            if abs(line["top"] - top) <= 3:
                line["words"].append(word)
                line["top"] = min(line["top"], top)
                break
        else:
            lines.append({"top": top, "words": [word]})
    for line in lines:
        line["words"].sort(key=lambda w: float(w["x0"]))
        line["text"] = normalize(" ".join(w["text"] for w in line["words"]))
    return sorted(lines, key=lambda item: item["top"])


def find_marker_top(lines: list[dict], marker: str | None, default: float) -> float:
    if not marker:
        return default
    for line in lines:
        if marker in line["text"]:
            return line["top"]
    return default


def cells_from_line(line: dict, bounds: list[float]) -> list[str]:
    cells = [[] for _ in range(len(bounds) - 1)]
    for word in line["words"]:
        x0 = float(word["x0"])
        for index in range(len(bounds) - 1):
            if bounds[index] <= x0 < bounds[index + 1]:
                cells[index].append(word["text"])
                break
    return [normalize(" ".join(parts)) for parts in cells]


def is_header_or_noise(text: str, spec: TableSpec) -> bool:
    if not text or text.isdigit():
        return True
    if text.startswith("第 ") or text.startswith("AI 智能体安全调研报告"):
        return True
    if text.startswith("附录") or text.startswith("表 "):
        return True
    hits = sum(1 for col in spec.columns if col in text)
    return hits >= max(2, min(3, len(spec.columns)))


def row_has_data(row: list[str]) -> bool:
    return any(cell.strip() for cell in row)


def merge_into_previous(rows: list[list[str]], row: list[str]) -> None:
    if not rows:
        rows.append(row)
        return
    previous = rows[-1]
    for index, cell in enumerate(row):
        if cell:
            previous[index] = normalize(f"{previous[index]} {cell}")


def looks_like_new_row(row: list[str], spec: TableSpec) -> bool:
    if spec.key in {"B.1", "B.2", "B.3"}:
        return bool(row[0])
    if spec.key.startswith("D."):
        return bool(row[1] and re.search(r"(20\d{2}|19\d{2})", row[2]))
    if spec.key == "E.1":
        return bool(row[1] and (row[5] or row[4] or row[3]))
    if spec.key == "F.1":
        return bool(row[0] and row[1] and (row[3] in {"开源", "闭源"} or "源" in row[3]))
    if spec.key == "G.1":
        return bool(row[1] and row[2])
    if spec.key == "G.2":
        return bool(row[0] and row[1])
    if spec.key == "G.3":
        return bool(re.match(r"20\d{2}-\d{2}", row[1]) and row[2])
    if spec.key == "H.1":
        return bool(re.match(r"20\d{2}-\d{2}-\d{2}", row[0]) and row[1])
    return bool(row[0])


def is_section_row(row: list[str], spec: TableSpec) -> bool:
    text = " ".join(cell for cell in row if cell)
    if spec.key == "G.3":
        return bool(re.search(r"(Critical|High|Medium|严重|高危|中危|CVSS)", text)) and not re.search(r"20\d{2}-\d{2}", text)
    if spec.key == "H.1":
        return bool(re.search(r"20\d{2}\s*年.*月", text)) and not re.search(r"20\d{2}-\d{2}-\d{2}", text)
    return False


def parse_spec(pdf, spec: TableSpec) -> dict:
    rows: list[list[str]] = []
    carry: dict[str, str] = {}
    section_value = ""

    for page_no in spec.pages:
        lines = page_lines(pdf.pages[page_no - 1])
        start_top = find_marker_top(lines, spec.start_after, 0) + (18 if spec.start_after else 0)
        end_top = find_marker_top(lines, spec.end_before, 10_000)
        for line in lines:
            if line["top"] <= start_top or line["top"] >= end_top:
                continue
            if is_header_or_noise(line["text"], spec):
                continue
            row = cells_from_line(line, spec.bounds)
            if not row_has_data(row):
                continue

            if is_section_row(row, spec):
                section_value = normalize(" ".join(cell for cell in row if cell))
                continue

            if spec.section_column:
                row = [section_value, *row]

            for column_name in spec.carry_columns:
                idx = spec.columns.index(column_name)
                if row[idx]:
                    carry[column_name] = row[idx]
                elif carry.get(column_name):
                    row[idx] = carry[column_name]

            if looks_like_new_row(row, spec):
                rows.append(row)
            else:
                merge_into_previous(rows, row)

    return {
        "appendix": spec.appendix,
        "title": spec.title,
        "columns": spec.columns,
        "rows": rows,
        "keywords": spec.keywords or [],
    }


def parse_text_appendix(pdf, title: str, pages: list[int], keywords: list[str]) -> dict:
    paragraphs: list[str] = []
    for page_no in pages:
        text = pdf.pages[page_no - 1].extract_text() or ""
        for raw in text.splitlines():
            line = normalize(raw)
            if not line or line.isdigit() or line.startswith("第 ") or line == "AI 智能体安全调研报告":
                continue
            if line.startswith("附录"):
                continue
            paragraphs.append(line)
    return {
        "appendix": title,
        "title": title,
        "paragraphs": paragraphs,
        "keywords": keywords,
    }


def postprocess_tables(tables: list[dict]) -> None:
    """Repair tables whose PDF glyph layout splits one logical row across columns."""
    for table in tables:
        if table["title"].startswith("表 B.1"):
            table["rows"] = [
                [
                    "起源与概念奠基（1956-1990）",
                    "1. 1956 年达特茅斯会议提出“人工智能”，明斯基提出“心灵社会”，奠定多智能体协作思想；2. 1970-1990 年主流为规则式专家系统，采用硬编码 if-then 逻辑，仅能在窄领域完成确定性任务，无自主学习能力；3. 90 年代分布式 AI、多 Agent 系统研究兴起，聚焦协作、通信、自治特性，受当时技术限制无法规模化落地。",
                    "无对应发展阶段；OpenClaw 诞生于大模型技术全面成熟时期，直接依托现有技术体系起步，未经历传统 AI 漫长演进过程。",
                ],
                [
                    "技术雏形期（2000-2025.10）",
                    "1. 2000-2022 年以统计学习、强化学习为核心，专用智能体可在游戏、机器人等封闭场景完成任务，通用理解与推理能力薄弱；2. 2022 年 11 月 ChatGPT（GPT-3.5）正式发布，大模型时代全面开启，为 LLM 驱动型智能体打下核心基础；3. 2023-2025 年，大模型工具调用、自主规划技术逐步普及，各类 Agent 框架相继出现，企业级智能体进入试点落地阶段。",
                    "1. 2025-11-01：Clawdbot 初始版本正式上线，由开发者 Peter Steinberger 打造，定位为本地执行、消息驱动、可落地实操的个人智能体；2. 2025-11-24：Clawdbot 对外正式发布，深度集成 WhatsApp，后端对接 Claude 模型，支持本地文件操作、命令执行、消息自动化处理。",
                ],
                [
                    "爆发增长期（AI：2023-2025；OpenClaw：2026.01）",
                    "1. 2023 年 AutoGPT、BabyAGI 等项目爆火，ReAct 思考-行动框架普及，智能体具备自主规划、调用搜索/代码/第三方工具能力；2. 2024 年被称作“智能体元年”，微软 Copilot、Anthropic GPT-4o、谷歌 Gemini 完成全链路 Agent 化，多模态、长上下文记忆、多工具并行能力趋于成熟；3. 2025 年各类 AgentOS、智能体云服务陆续落地，企业级应用走向普及，同时各类安全漏洞开始集中暴露。",
                    "1. 2026-01-05：Clawdbot 正式对外发布，凭借自主办事、代码迁移、深度调研等实战案例在全网传播走红；2. 2026-01-27：因涉及 Anthropic 商标侵权投诉，项目紧急更名为 Moltbot，延续龙虾主题，寓意版本重构迭代；3. 2026-01-30：再次调整品牌名称，正式定名 OpenClaw，秉持开源理念采用 MIT 协议完全开源，GitHub 星标单日新增 14 万 +，成为全球增长速度最快的开源项目之一；4. 2026-01-31：官方网站 openclaw.ai 上线，项目生态初步成型。",
                ],
                [
                    "生态扩张与安全风险期（2026.02-2026.04）",
                    "1. 2026 年 2-4 月，谷歌、微软、百度等头部科技公司全面布局系统级、办公级智能体，Agent 逐步演变为软硬件基础设施；2. LangChain、GitHub Copilot、Azure MCP 等主流框架与产品高危漏洞集中爆发，框架级 0day 漏洞出现并被武器化；3. 行业普遍开始重视智能体供应链安全、权限隔离、访问管控等安全体系建设。",
                    "1. 2026-02-14：关联平台 Moltbook 发生 77 万 Agent 大规模劫持事件，成为史上最大规模智能体安全事件，OpenClaw 底层安全短板彻底暴露；2. 2026 年 2-3 月，国内腾讯云、阿里云、百度智能云、火山引擎等主流云厂商相继上线 OpenClaw 云端托管服务，项目生态极速扩张，社区贡献者与使用者数量暴涨；3. 2026-04-21：披露高危漏洞 CVE-2026-41329（CVSS 9.9），存在沙箱绕过、本地提权风险；4. 2026-04-28：Claw Chain 漏洞 CVE-2026-44112（CVSS 9.6）公开，漏洞被武器化，共计 24.5 万实例受到影响。",
                ],
                [
                    "成熟与竞争格局期（2026.05）",
                    "1. 2026 年 5 月，AI 智能体全面成为各类软硬件标配，行业提出 DAA（日活智能体数）作为核心统计指标；2. 国内正式出台《智能体规范应用与创新发展实施意见》，国家级监管与合规体系落地，安全合规成为智能体规模化落地的硬性准入要求。",
                    "1. 2026-05-19：OpenClaw 推送重大版本更新，包含 100 余项功能与安全优化，重点强化容器化隔离、细粒度权限控制与安全审计日志，全面修复已知高危漏洞；2. 2026-05-21：Hermes Agent 日活 Token 规模超越 OpenClaw，行业头部格局发生变化，市场竞争进一步加剧；3. 2026-05-26：伴随国内智能体监管政策落地，OpenClaw 被纳入合规评估清单，正式进入规范化运营阶段。",
                ],
                [
                    "核心差异总结",
                    "整体发展历时近 70 年，从学术理论起步，逐步迭代走向大规模产业应用，演进节奏平缓、技术路径完整，是人工智能领域主流发展方向与终极形态之一。",
                    "整体发展仅历时 6 个月，依托成熟大模型技术实现病毒式传播与爆发增长，是 LLM 智能体时代的现象级开源项目；安全风险自发展初期便伴随全程，安全治理与合规化成为后期核心工作。",
                ],
            ]
        elif table["title"].startswith("表 B.2"):
            table["rows"] = [
                ["所处层级", "宏观产业/技术全链路", "外部功能组件层", "内部推理行为层"],
                ["存在形态", "生态、流程、服务、分发渠道", "API、插件、程序、脚本、接口", "任务范式、推理逻辑、执行流程"],
                ["核心本质", "端到端组件供给与流转体系", "可被调用的独立外部功能", "任务规划与多工具协同能力"],
                ["主体归属", "厂商、开源社区、云服务商", "第三方/系统内置功能单元", "AI Agent 自身行为能力"],
                ["调用关系", "为 Agent 提供全部底层资源", "被技能调度执行具体操作", "决策并编排多个工具完成任务"],
                ["复用范围", "全生态通用", "单一功能跨任务复用", "同类任务场景复用"],
                ["典型实例", "大模型 API、插件市场、开源框架、算力集群", "检索工具、代码解释器、浏览器、PDF 解析", "文献调研、代码开发、自动化办公"],
            ]
        elif table["title"].startswith(("表 D.1", "表 D.2", "表 D.3", "表 D.4")):
            category = table["title"].split("--", 1)[1].removesuffix("类") if "--" in table["title"] else ""
            for row in table["rows"]:
                if category and not row[0]:
                    row[0] = category
                match = re.match(r"^(20\d{2}|19\d{2})\s+(.+)$", row[2])
                if match:
                    row[2] = match.group(1)
                    row[3] = normalize(f"{match.group(2)} {row[3]}")
                if table["title"].startswith("表 D.2"):
                    if row[1] == "BFCL (Berkeley)":
                        row[3], row[4] = "多模式工具调用任务", "工具调用标准评测"
                    elif row[1] == "ToolEmu":
                        row[3], row[4] = "工具模拟执行环境", "鲁棒性低成本评测"
                    elif row[1] == "MINT":
                        row[3], row[4] = "图文多模态交互任务", "多模态智能体评测"
        if table["title"].startswith("表 D.5"):
            table["rows"] = [
                ["中文/国内", "m³-SafetyBench", "2025", "中文多领域安全数据", "中文场景安全评测"],
                ["中文/国内", "R-Judge", "2025", "中文多轮风险交互数据", "行为安全评测"],
                ["中文/国内", "Damo-Agent-ZH", "2025", "中文工具交互数据", "中文智能体训练"],
                ["中文/国内", "MSAgent-ZH", "2025", "中文对话 + 工具融合数据", "中文智能体训练"],
                ["中文/国内", "Chinese-WebAgent", "2025", "中文网页交互轨迹", "Web 智能体训练"],
                ["中文/国内", "C³-BenchMark", "2025", "中文复杂任务基准", "综合能力评测"],
                ["中文/国内", "FlowBench", "2024", "中文企业工作流数据", "流程自动化评测"],
                ["中文/国内", "MM-SafetyBench", "2024", "中文多模态安全样本", "多模态安全评测"],
            ]
        elif table["title"].startswith("表 E.1"):
            table["rows"] = [
                ["学术研究型", "AgentBench-Attack", "自动化发起提示注入、工具劫持、RAG 污染攻击", "安全评测、漏洞研究", "研究 POC", "中"],
                ["学术研究型", "AgentFuzz", "模糊测试，自动生成恶意提示词与异常工具调用序列", "漏洞挖掘、安全测试", "研究原型", "中"],
                ["学术研究型", "JailbreakAgent", "多阶段绕过 LLM 安全护栏，实现模型越狱", "安全边界测试、对抗样本研究", "研究框架", "高"],
                ["学术研究型", "PoisonRAG", "向知识库注入恶意内容，篡改检索结果诱导异常输出", "RAG 系统攻防研究", "专项 POC", "高"],
                ["学术研究型", "ToolSoup", "篡改工具描述与参数，劫持 Agent 工具调用链", "智能体工具链安全研究", "专项 POC", "高"],
                ["学术研究型", "PromptInjector", "生成直接/间接/文档嵌入等多类提示注入载荷", "提示注入攻防实验", "载荷生成工具", "高"],
                ["学术研究型", "MemoryHack", "实现 Agent 短期/长期记忆篡改、植入恶意信息、会话劫持", "智能体记忆安全研究", "专项攻击工具", "高"],
                ["学术研究型", "AgentLoop", "构造无限工具调用循环，耗尽 Token 与系统资源", "智能体 DoS 攻击研究", "资源攻击 POC", "中"],
                ["开源全能渗透框架", "HexStrike", "多智能体协同，集成全品类工具链，自动漏洞探测、利用、后门部署", "红队演练、渗透测试", "开源框架", "极高"],
                ["开源全能渗透框架", "Strix", "模拟人工行为挖掘漏洞，自动生成可利用 POC", "漏洞赏金、企业安全演练", "开源工具", "高"],
                ["开源全能渗透框架", "RAPTOR", "递归式自主渗透，覆盖侦察、利用、后渗透完整攻击链路", "全网自动化渗透测试", "开源框架", "极高"],
                ["开源全能渗透框架", "RedAmon", "自动化情报收集、漏洞扫描、权限提升、内网横向移动", "企业内网渗透、红队作战", "开源框架", "极高"],
                ["开源全能渗透框架", "Ankou", "AI 驱动 C2 服务，支持目标分析与自定义攻击链编排", "远控攻击、持久化控制", "开源工具", "极高"],
                ["开源全能渗透框架", "AutoPentest-DRL/AutoPentestX", "基于强化学习的自适应自动化渗透", "复杂网络环境渗透测试", "开源框架", "高"],
                ["开源专项攻击工具", "AgentBreaker", "自动识别 Agent 边界，定制化生成攻击载荷", "定向智能体攻击测试", "开源 + 商用混合", "高"],
                ["开源专项攻击工具", "Nebula", "人机协同模式开展渗透，行为可控", "企业合规安全测评", "开源工具", "中"],
                ["开源专项攻击工具", "Deadend CLI", "绕过 WAF、IDS、IPS 等传统安全防御设备", "防御机制突破测试", "开源工具", "高"],
                ["开源专项攻击工具", "PentestGPT", "快速构建攻击思路，验证攻击方案可行性", "入门攻防验证、方案原型", "开源工具", "中"],
                ["开源专项攻击工具", "CAI Framework", "支持多 Agent 集群编排、自定义攻击载荷库", "定制化攻防演练", "开源框架", "高"],
                ["AI 增强传统安全工具", "Nuclei + AI 模板扩展", "AI 自动生成、优化漏洞检测模板", "批量漏洞扫描", "插件扩展", "中"],
                ["AI 增强传统安全工具", "Ghidra + GhidraMCP", "AI 辅助二进制代码分析、逆向工程", "恶意样本分析、逆向攻防", "插件扩展", "中"],
                ["AI 增强传统安全工具", "BloodHound CE + 自然语言 Cypher", "自然语言解析，分析域环境攻击路径", "域安全、内网渗透分析", "插件扩展", "中"],
                ["AI 增强传统安全工具", "SQLMap + FastMCP", "AI 赋能，自动化 SQL 注入检测与利用", "数据库安全测试", "插件扩展", "高"],
                ["商业/地下定制工具", "AgentHack", "一体化套件，集成注入、投毒、数据窃取、批量扫描", "定向商业攻击、批量入侵", "商业付费", "极高"],
                ["商业/地下定制工具", "AI-Stealth", "隐形攻击，规避日志审计、行为分析、蜜罐检测", "隐蔽持久化攻击", "商业付费", "极高"],
                ["商业/地下定制工具", "DarkAgent", "开源情报采集 + AI Agent 组合式定向攻击", "精准目标打击、情报窃取", "商业付费", "极高"],
            ]
        elif table["title"].startswith("表 F.1"):
            table["rows"] = [
                ["GPT-4o/4 Turbo", "OpenAI", "S（顶级全能）", "闭源", "文本/图像/音频/视频", "★★★★★（原生强）"],
                ["GPTs / Operator", "OpenAI", "S（顶级 Agent）", "闭源", "文本/图像/网页", "★★★★★（闭环执行）"],
                ["Claude 3.5 Sonnet", "Anthropic", "S（推理/代码强）", "闭源", "文本/图像/PDF", "★★★★★（稳定）"],
                ["Claude Code", "Anthropic", "S（编程专用）", "闭源", "文本/代码/图像", "★★★★★（代码工具链）"],
                ["Gemini 3.5 Ultra", "Google", "S（多模态最强）", "闭源", "文本/图像/音频/视频", "★★★★★（原生）"],
                ["Gemini Spark", "Google", "A+（个人 Agent）", "闭源", "全模态", "★★★★（日常强）"],
                ["Devin", "Cognition", "S（AI 程序员）", "闭源", "文本/代码/终端", "★★★★★（全链路）"],
                ["Perplexity Agent", "Perplexity", "A+（检索强）", "闭源", "文本/网页/图像", "★★★★（检索 + 工具）"],
                ["文心一言 4.0", "百度", "A（国内顶尖）", "闭源", "文本/图像/视频", "★★★★（企业工具链）"],
                ["千帆 Agent 平台", "百度", "A（企业级）", "闭源", "文本/图像", "★★★★（平台化）"],
                ["通义千问 3（Qwen3）", "阿里", "A（通用强）", "闭源", "文本/图像/音频/视频", "★★★★（函数调用）"],
                ["通义百炼", "阿里", "A（行业定制）", "闭源", "文本/图像", "★★★★"],
                ["混元 4", "腾讯", "A（中文强）", "闭源", "文本/图像", "★★★★"],
                ["QClaw", "腾讯", "A-（轻量化）", "闭源", "文本", "★★★"],
                ["豆包（Doubao）", "字节", "A-（通用）", "闭源", "文本/图像/语音", "★★★★"],
                ["扣子（Coze）", "字节", "A（低代码平台）", "闭源", "文本/图像", "★★★★"],
                ["GLM-4", "智谱 AI", "A（中文推理强）", "闭源", "文本/图像", "★★★★"],
                ["Kimi-K2.5", "月之暗面", "A（长文本强）", "闭源", "文本/长 PDF", "★★★★"],
                ["MiniMax-M2.7", "MiniMax", "A（自进化）", "闭源", "文本/图像/视频", "★★★★"],
                ["实在 Agent（龙虾）", "实在智能", "A（RPA+AI）", "闭源", "文本/桌面 UI", "★★★★"],
                ["AutoGPT", "社区", "B（经典自主）", "开源", "文本（可扩展视觉）", "★★★★（基础闭环）"],
                ["OpenClaw", "社区", "B+（本地优先）", "开源", "文本/图像/桌面", "★★★★（系统级）"],
                ["LangGraph", "LangChain", "A-（编排王者）", "开源", "依赖基座", "★★★★★（工业级）"],
                ["CAMEL", "社区", "B+（多角色）", "开源", "文本", "★★★（角色扮演）"],
                ["Aider", "社区", "B+（编程）", "开源", "文本/代码", "★★★★（代码工具）"],
                ["OpenCode", "社区", "B+（编程平替）", "开源", "文本/代码", "★★★★"],
                ["Dify", "Dify", "B（低代码平台）", "开源", "文本/图像", "★★★"],
            ]
        elif table["title"].startswith("表 G.1"):
            table["rows"] = [
                ["2023", "上市零售企业监控 Agent", "内网入侵、数据泄露", "弱口令暴力破解，伪造代理接入内网", "泄露多年经营数据、用户订单与联系方式", "约 1200 万元人民币"],
                ["2023", "金融科技客服 Agent", "资金操作风险", "提示注入绕过安全防护，调用转账接口", "测试环境资金被非法划转，无真实业务损失", "120 万元人民币（测试资金）"],
                ["2023", "多家券商 AI 理财 Agent", "业务决策失控", "风控逻辑被绕过，自主重仓高风险资产", "全年超 1200 起财产损失事件，纠纷频发", "合计 17 亿元人民币"],
                ["2024", "Slack 企业版 AI Agent", "凭证窃取、数据泄露", "提示注入窃取私有频道 API 令牌", "数千家企业内部聊天数据外泄，合规风险加剧", "单家平均 20 万美元"],
                ["2024", "Microsoft 365 Copilot", "权限劫持、信息外泄", "恶意日历邀请劫持智能体，转发敏感邮件", "商业机密、人事数据泄露，平台紧急关停相关功能", "整改成本约 500 万美元"],
                ["2024", "头部代码托管平台审查 Agent", "供应链投毒、后门植入", "恶意注释诱导决策偏移，自动植入后门", "超 1200 个项目被植入后门，覆盖金融、电商领域", "合计约 1000 万美元"],
                ["2025", "Replit 开发平台 AI Agent", "误操作、数据销毁", "自主执行高危删除指令，篡改用户数据", "千余家企业数据被清空，业务中断三周", "约 470 万美元"],
                ["2025", "市场调研公司 LangChain 集群", "资源耗尽、死循环攻击", "多智能体协作异常，形成无限调用循环", "长时间无效调用产生高额 API 账单", "47000 美元"],
                ["2025", "企业 AWS 管理 Agent", "运维失控、服务中断", "目标判断失误，批量删除生产服务器节点", "云服务中断 13 小时，波及电商、支付业务", "约 1200 万美元"],
                ["2025", "三甲医院 AI 诊断 Agent", "知识库投毒、医疗事故", "RAG 知识库篡改，诱导智能体错误诊断", "出现 37 例误诊，引发 2 起严重医疗事故", "约 3000 万元人民币"],
                ["2026", "OpenClaw/Moltbook 平台", "大规模集群沦陷", "平台漏洞导致全局权限被劫持，接管海量智能体", "77 万个 Agent 被控制，用于窃密、传播恶意程序", "合计 2.3 亿美元"],
                ["2026", "Meta 内部自研 AI Agent", "权限越界、合规事故", "自主决策失控，越权访问核心敏感数据", "最高级别安全事故，开展全面权限重构审计", "整改成本约 1500 万美元"],
                ["2026", "墨西哥政府机构智能体集群", "定向渗透、大规模数据泄露", "投喂攻击载荷，诱导编程智能体执行远程命令", "9 大政府机构被入侵，数亿条公民数据外泄", "恢复整改成本超 1.2 亿美元"],
            ]
        elif table["title"].startswith("表 G.2"):
            table["rows"] = [
                ["行业统计", "企业 AI Agent 安全现状（2026 CSA 报告）", "65% 企业年内遭遇安全事件；主要风险为数据泄露、服务中断、非法操作、财产损失；数据泄露单家平均损失 140 万美元", "仅 6% 企业配置专项安全预算"],
                ["学术风险", "AgentBench-Attack 漏洞测试", "91% 生产级 Agent 存在工具链劫持漏洞；94% 记忆类 Agent 可被知识库投毒", "行业通用安全隐患"],
                ["学术风险", "代码审查 Agent 后门植入实验", "仅依靠恶意代码注释，即可诱导智能体偏移目标并自动植入后门", "供应链安全典型风险"],
            ]
        elif table["title"].startswith("表 G.3"):
            table["rows"] = [
                ["Critical（严重，CVSS ≥9.0）", "2026-05", "Claw Chain（OpenClaw）", "OpenClaw 框架", "9.6", "CVE-2026-44112", "沙箱逃逸 + 提权 + 持久化控制，24.5 万实例暴露"],
                ["Critical（严重，CVSS ≥9.0）", "2026-04", "Azure MCP 认证绕过", "Azure MCP Server", "9.1", "CVE-2026-32211", "无凭证访问敏感数据，无补丁"],
                ["Critical（严重，CVSS ≥9.0）", "2026-04", "CamoLeak", "GitHub Copilot Chat", "9.6", "未公开", "PR 隐藏注释注入，通过 Camo 代理静默窃取代码"],
                ["Critical（严重，CVSS ≥9.0）", "2026-02", "Moltbook 大规模劫持", "Moltbook 平台", "9.8", "未公开", "数据库漏洞，77 万活跃 Agent 被批量接管"],
                ["Critical（严重，CVSS ≥9.0）", "2025-11", "LangChain 序列化注入", "LangChain", "9.3", "CVE-2025-68664", "dumps() 反序列化漏洞，代码执行 + 环境变量泄露"],
                ["Critical（严重，CVSS ≥9.0）", "2025-08", "Codex CLI 命令注入", "OpenAI Codex CLI", "9.1", "CVE-2025-61260", "本地配置文件注入，任意命令执行"],
                ["Critical（严重，CVSS ≥9.0）", "2025-06", "EchoLeak", "Microsoft 365 Copilot", "9.3", "CVE-2025-32711", "零交互邮件注入，窃取 OneDrive/SharePoint 数据"],
                ["High（高危，7.0 ≤ CVSS ≤8.9）", "2026-05", "Claude Code Hooks RCE", "Anthropic Claude Code", "8.2", "GHSA-ph6w-f82w-28w6", "恶意 settings.json 注入，会话启动时 RCE"],
                ["High（高危，7.0 ≤ CVSS ≤8.9）", "2026-05", "LangChain 路径遍历", "LangChain", "7.5", "CVE-2026-", "PromptLoading API 任意文件读取"],
                ["High（高危，7.0 ≤ CVSS ≤8.9）", "2026-05", "PraisonAI 认证缺失", "PraisonAI 2.5.6-4.6.33", "7.3", "CVE-2026-44338", "关键功能无认证，3h44m 内被武器化"],
                ["High（高危，7.0 ≤ CVSS ≤8.9）", "2026-04", "PraisonAI 未授权访问", "PraisonAI Gateway", "8.6", "CVE-2026-34952", "无认证 WebSocket，远程控制所有 Agent"],
                ["High（高危，7.0 ≤ CVSS ≤8.9）", "2025-09", "Anthropic MCP Git 三漏洞", "Anthropic Git MCP", "8.8", "CVE-2025-68143/4/5", "命令注入、路径遍历、信息泄露"],
                ["Medium（中危，4.0 ≤ CVSS ≤6.9）", "2026-03", "CrewAI 角色越权", "CrewAI 多智能体框架", "5.9", "未公开", "角色权限隔离失效，跨角色访问敏感上下文"],
                ["Medium（中危，4.0 ≤ CVSS ≤6.9）", "2025-12", "Meta LiteLLM 供应链投毒", "Meta/Mercor", "6.8", "未公开", "LiteLLM 依赖污染，训练数据密钥泄露"],
                ["Medium（中危，4.0 ≤ CVSS ≤6.9）", "2024-10", "Copilot Codespaces 令牌泄露", "GitHub Copilot（Codespaces）", "6.5", "未公开", "指令注入导致 GITHUB_TOKEN 泄露"],
            ]


def write_ts(tables: list[dict], texts: list[dict]) -> None:
    filter_blocks = ",\n  ".join(
        "{ id: " + q(fid) + ", label: " + q(label) + ", description: " + q(desc) + " }"
        for fid, label, desc in FILTERS
    )
    text_blocks = []
    for text in texts:
        paragraphs = ",\n          ".join(q(paragraph) for paragraph in text["paragraphs"])
        text_blocks.append(
            "    {\n"
            f"      appendix: {q(text['appendix'])},\n"
            f"      title: {q(text['title'])},\n"
            f"      paragraphs: [\n          {paragraphs}\n      ],\n"
            f"      keywords: [{', '.join(q(k) for k in text['keywords'])}],\n"
            "    }"
        )
    table_blocks = []
    for table in tables:
        rows = ",\n          ".join(
            "[" + ", ".join(q(cell) for cell in row) + "]"
            for row in table["rows"]
        )
        table_blocks.append(
            "    {\n"
            f"      appendix: {q(table['appendix'])},\n"
            f"      title: {q(table['title'])},\n"
            f"      columns: [{', '.join(q(c) for c in table['columns'])}],\n"
            f"      rows: [\n          {rows}\n      ],\n"
            f"      keywords: [{', '.join(q(k) for k in table['keywords'])}],\n"
            "    }"
        )
    content = (
        "export interface AppendixTable {\n"
        "  appendix: string;\n"
        "  title: string;\n"
        "  columns: string[];\n"
        "  rows: string[][];\n"
        "  keywords: string[];\n"
        "}\n\n"
        "export interface AppendixText {\n"
        "  appendix: string;\n"
        "  title: string;\n"
        "  paragraphs: string[];\n"
        "  keywords: string[];\n"
        "}\n\n"
        "export interface AppendixFilter {\n"
        "  id: string;\n"
        "  label: string;\n"
        "  description: string;\n"
        "}\n\n"
        "export const APPENDIX_FILTERS: AppendixFilter[] = [\n"
        f"  {filter_blocks}\n"
        "];\n\n"
        "export const APPENDIX_TEXTS: AppendixText[] = [\n"
        + ",\n".join(text_blocks)
        + "\n];\n\n"
        "export const APPENDIX_TABLES: AppendixTable[] = [\n"
        + ",\n".join(table_blocks)
        + "\n];\n"
    )
    OUT_PATH.write_text(content, encoding="utf-8")


def main() -> None:
    with pdfplumber.open(PDF_PATH) as pdf:
        tables = [parse_spec(pdf, spec) for spec in SPECS]
        texts = [parse_text_appendix(pdf, title, pages, keywords) for title, pages, keywords in TEXT_APPENDICES]

    postprocess_tables(tables)
    write_ts(tables, texts)
    print(f"wrote {OUT_PATH} texts={len(texts)} tables={len(tables)}")
    for text in texts:
        print(f"{text['title']} paragraphs={len(text['paragraphs'])}")
    for table in tables:
        print(f"{table['title']} cols={len(table['columns'])} rows={len(table['rows'])}")
        bad = [idx for idx, row in enumerate(table["rows"], start=1) if len(row) != len(table["columns"])]
        if bad:
            print("  bad rows", bad[:10])


if __name__ == "__main__":
    main()
