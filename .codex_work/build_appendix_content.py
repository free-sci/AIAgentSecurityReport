import json
import re
from pathlib import Path

TEXT_PATH = Path(".codex_work/appendix_text.txt")
OUT_PATH = Path("src/data/appendixContent.ts")

FILTERS = [
    ("all", "全部", "显示所有附录表格与条目"),
    ("terms", "术语", "中英文术语、核心概念"),
    ("architecture", "架构机制", "技术架构、运行机制、供应链概念"),
    ("dataset", "Dataset", "训练、轨迹、评测数据集"),
    ("benchmark", "Benchmark", "评测基准与能力测试"),
    ("safety", "Safety", "安全、对齐、治理相关资源"),
    ("attacks", "Attacks", "攻击工具、攻击方法"),
    ("product", "Product", "模型、平台、产品能力"),
    ("incidents", "Incidents", "安全事件与损失"),
    ("milestones", "Milestones", "关键里程碑"),
    ("community", "Community", "开源社区、标准组织"),
    ("scholar", "Scholars", "国内外研究学者"),
    ("factory", "Factory", "智能体工厂案例"),
]


def q(value):
    return json.dumps(value, ensure_ascii=False)


def clean_line(line):
    line = line.strip()
    line = re.sub(r"^\d{3}$", "", line).strip()
    return line


def keywords_for(title, appendix):
    text = f"{appendix} {title}"
    tags = set()
    if "附录A" in text or "术语" in text:
        tags.add("terms")
    if "附录B" in text or "附录C" in text or "供应链" in text or "技术架构" in text or "运行机制" in text:
        tags.add("architecture")
    if "数据集" in text or "训练" in text or "轨迹" in text:
        tags.add("dataset")
    if "评测" in text or "基准" in text:
        tags.add("benchmark")
    if "安全" in text or "对齐" in text or "漏洞" in text or "治理" in text:
        tags.add("safety")
    if "攻击" in text or "工具" in text and "攻击" in text:
        tags.add("attacks")
    if "模型" in text or "产品" in text or "平台" in text:
        tags.add("product")
    if "事件" in text or "损失" in text:
        tags.add("incidents")
    if "里程碑" in text:
        tags.add("milestones")
    if "社区" in text or "开源" in text or "标准组织" in text:
        tags.add("community")
    if "学者" in text:
        tags.add("scholar")
    if "工厂" in text or "Factory" in text:
        tags.add("factory")
    return sorted(tags or {"architecture"})


def build():
    text = TEXT_PATH.read_text(encoding="utf-8")
    lines = [clean_line(line) for line in text.splitlines()]
    lines = [line for line in lines if line and not line.startswith("--- PAGE")]

    sections = []
    current_appendix = None
    current_table = None
    appendix_buffer = []

    def flush_table():
        nonlocal current_table
        if current_table and current_table["rows"]:
            sections.append(current_table)
        current_table = None

    def flush_appendix_buffer():
        nonlocal appendix_buffer, current_appendix
        if current_appendix and appendix_buffer:
            title = current_appendix
            rows = [[line] for line in appendix_buffer if not line.startswith("附录")]
            if rows:
                sections.append(
                    {
                        "appendix": current_appendix,
                        "title": title,
                        "columns": ["原文条目"],
                        "rows": rows,
                        "keywords": keywords_for(title, current_appendix),
                    }
                )
        appendix_buffer = []

    for line in lines:
        if line.startswith("附录"):
            flush_table()
            flush_appendix_buffer()
            current_appendix = line
            appendix_buffer = []
            continue

        if re.match(r"^表\s+[A-Z]\.\d+", line):
            flush_table()
            current_table = {
                "appendix": current_appendix or "附录",
                "title": line,
                "columns": ["原表行"],
                "rows": [],
                "keywords": keywords_for(line, current_appendix or ""),
            }
            continue

        if line == "表。":
            continue

        if current_table:
            current_table["rows"].append([line])
        elif current_appendix:
            appendix_buffer.append(line)

    flush_table()
    flush_appendix_buffer()

    blocks = []
    for item in sections:
        rows = ",\n          ".join("[" + q(row[0]) + "]" for row in item["rows"])
        blocks.append(
            "    {\n"
            f"      appendix: {q(item['appendix'])},\n"
            f"      title: {q(item['title'])},\n"
            f"      columns: [{', '.join(q(c) for c in item['columns'])}],\n"
            f"      rows: [\n          {rows}\n      ],\n"
            f"      keywords: [{', '.join(q(k) for k in item['keywords'])}],\n"
            "    }"
        )

    filter_blocks = ",\n  ".join(
        "{ id: " + q(fid) + ", label: " + q(label) + ", description: " + q(desc) + " }"
        for fid, label, desc in FILTERS
    )

    content = (
        "export interface AppendixTable {\n"
        "  appendix: string;\n"
        "  title: string;\n"
        "  columns: string[];\n"
        "  rows: string[][];\n"
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
        "export const APPENDIX_TABLES: AppendixTable[] = [\n"
        + ",\n".join(blocks)
        + "\n];\n"
    )

    OUT_PATH.write_text(content, encoding="utf-8")
    print(f"wrote {OUT_PATH} tables={len(sections)}")


if __name__ == "__main__":
    build()
