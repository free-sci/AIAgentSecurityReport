from __future__ import annotations

import json
import re
import shutil
from pathlib import Path
from typing import Any, Iterable

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = Path(r"E:\下载\AI_智能体安全调研报告-终稿-20260731.pdf")
IMAGE_DIR = Path(r"E:\Photo\AI生图素材\安全报告配图\ai修改版")
BIB_PATH = Path(r"E:\下载\references (2).bib")
OUTPUT_PATH = ROOT / "src" / "data" / "latestReportData.ts"
PUBLIC_DIR = ROOT / "public"
FIGURE_DIR = PUBLIC_DIR / "report-figures"


FIGURES = [
    ("1.1", "AI 智能体安全研究背景、必要性与报告调研思路", 9, "ChatGPT Image 2026年7月28日 11_06_01.png"),
    ("1.2", "全生命周期视角下 AI 智能体安全分析：七大生命周期阶段 + 六大业务模块", 11, "ChatGPT Image 2026年7月28日 12_01_54.png"),
    ("1.3", "文献类型来源统计", 12, "chp1_paper_source_dist.png"),
    ("1.4", "研究主体来源统计", 12, "chp1_academia_industry_dist.png"),
    ("1.5", "论文第一作者所在单位的所属国家统计", 13, "chp1_author_country_dist.png"),
    ("1.6", "会议和期刊论文发表 Venue 分布分析", 14, "ChatGPT Image 2026年7月28日 15_13_21.png"),
    ("1.7", "高校/科研院所论文发表情况统计", 15, "chp1_academia_paper_dist.png"),
    ("1.8", "工业界论文发表情况统计", 16, "chp1_industry_paper_dist.png"),
    ("1.9", "全生命周期逐阶段自研安全 OpenClaw 框架", 17, "chp1_2_openclaw_sec_architecture-gpt.png"),
    ("1.10", "调研报告组织结构", 19, "ChatGPT Image 2026年7月28日 11_39_24.png"),
    ("2.1", "全球 AI 智能体安全研究现状", 21, "ChatGPT Image 2026年7月28日 16_23_23.png"),
    ("2.2", "全球 AI 智能体安全学术研究现状", 22, "ChatGPT Image 2026年7月30日 16_36_56.png"),
    ("2.3", "全球 AI 智能体安全主流产品", 32, "chp2_2_ai_agent.png"),
    ("2.4", "产业界与学术界联动现状", 41, "ChatGPT Image 2026年7月28日 15_25_49.png"),
    ("2.5", "全球 AI 硬件与芯片底座安全研究现状", 47, "ChatGPT Image 2026年7月28日 16_02_22.png"),
    ("2.6", "AI 智能体安全事件、漏洞与主流攻击工具", 54, "ChatGPT Image 2026年7月28日 16_02_14.png"),
    ("2.7", "全球 AI 智能体安全政策与法规", 63, "ChatGPT Image 2026年7月28日 16_15_03.png"),
    ("2.8", "全球 AI 智能体产业共性安全瓶颈", 73, "ChatGPT Image 2026年7月28日 16_23_00.png"),
    ("3.1", "AI 智能体全生命周期安全问题与挑战分析", 75, "ChatGPT Image 2026年7月28日 16_21_37.png"),
    ("4.1", "AI 智能体全生命周期安全现有防护方案分析", 105, "ChatGPT Image 2026年7月28日 16_27_46.png"),
    ("5.1", "AI 智能体全生命周期安全发展趋势", 135, "ChatGPT Image 2026年7月28日 16_33_19.png"),
    ("6.1", "AI 智能体规模化落地安全挑战与重要研究方向调研", 165, "ChatGPT Image 2026年7月28日 16_34_17.png"),
]


CHAPTERS = [
    (
        "chapter-1",
        "1",
        "绪论",
        [
            ("1-overview", "1", "本章概述", 9, 10),
            ("1-1", "1.1", "研究背景", 10, 11),
            ("1-2", "1.2", "全生命周期视角下 AI 智能体安全分析方法", 11, 12),
            ("1-3", "1.3", "调研报告参考文献统计分析", 12, 17),
            ("1-4", "1.4", "全生命周期逐阶段自研安全 OpenClaw 示例分析", 17, 19),
            ("1-5", "1.5", "调研报告组织结构", 19, 21),
        ],
    ),
    (
        "chapter-2",
        "2",
        "全球 AI 智能体安全研究现状",
        [
            ("2-overview", "2", "本章概述", 21, 22),
            ("2-1", "2.1", "全球 AI 智能体安全学术研究现状", 22, 32),
            ("2-2", "2.2", "全球 AI 智能体安全主流产品", 32, 41),
            ("2-3", "2.3", "产业界与学术界联动", 41, 47),
            ("2-4", "2.4", "全球 AI 硬件与芯片底座安全研究现状", 47, 54),
            ("2-5", "2.5", "AI 智能体安全事件与主流攻击工具", 54, 63),
            ("2-6", "2.6", "全球 AI 智能体安全政策与法规", 63, 73),
            ("2-7", "2.7", "全球 AI 智能体产业共性安全瓶颈", 73, 75),
        ],
    ),
    (
        "chapter-3",
        "3",
        "AI 智能体全生命周期安全问题与挑战分析",
        [
            ("3-overview", "3", "本章概述", 75, 76),
            ("3-1", "3.1", "需求规划阶段（安全产生源头）", 76, 80),
            ("3-2", "3.2", "架构设计阶段（安全体系定型）", 80, 84),
            ("3-3", "3.3", "编码开发阶段（安全工程落地）", 84, 88),
            ("3-4", "3.4", "安全测试评估阶段（安全验证排查）", 88, 92),
            ("3-5", "3.5", "部署交付阶段（安全环境固化）", 92, 96),
            ("3-6", "3.6", "运行迭代阶段（动态对抗演化）", 96, 100),
            ("3-7", "3.7", "退役销毁阶段（安全闭环收尾）", 100, 105),
        ],
    ),
    (
        "chapter-4",
        "4",
        "AI 智能体全生命周期安全现有防护方案分析",
        [
            ("4-overview", "4", "本章概述", 105, 106),
            ("4-1", "4.1", "需求规划阶段（源头安全基线）", 106, 110),
            ("4-2", "4.2", "架构设计阶段（原生防护拓扑定型）", 110, 114),
            ("4-3", "4.3", "编码开发阶段安全（安全工程落地）", 114, 118),
            ("4-4", "4.4", "安全测试评估阶段（安全验证防护）", 118, 122),
            ("4-5", "4.5", "部署交付阶段（安全防护固化）", 122, 126),
            ("4-6", "4.6", "运行迭代阶段（动态演化防护）", 126, 130),
            ("4-7", "4.7", "退役销毁阶段（闭环收尾防护）", 130, 135),
        ],
    ),
    (
        "chapter-5",
        "5",
        "AI 智能体全生命周期安全发展趋势",
        [
            ("5-overview", "5", "本章概述", 135, 136),
            ("5-1", "5.1", "需求规划阶段（攻防趋势）", 136, 140),
            ("5-2", "5.2", "架构设计阶段（攻防趋势）", 140, 144),
            ("5-3", "5.3", "编码开发阶段（攻防趋势）", 144, 148),
            ("5-4", "5.4", "安全测试评估阶段（攻防趋势）", 148, 152),
            ("5-5", "5.5", "部署交付阶段（攻防趋势）", 152, 156),
            ("5-6", "5.6", "运行迭代阶段（攻防趋势）", 156, 160),
            ("5-7", "5.7", "退役销毁阶段（攻防趋势）", 160, 165),
        ],
    ),
    (
        "chapter-6",
        "6",
        "AI 智能体规模化落地安全挑战与重要研究方向调研",
        [
            ("6-overview", "6", "本章概述", 165, 166),
            ("6-1", "6.1", "AI 智能体规模化落地安全研究", 166, 168),
            ("6-2", "6.2", "大规模自主协同多智能体系统安全研究", 168, 170),
            ("6-3", "6.3", "基于 AI 智能体的漏洞挖掘与修复体系研究", 170, 173),
            ("6-4", "6.4", "多模型集成安全推理体系研究", 173, 175),
            ("6-5", "6.5", "国产化多模型聚合安全网关研究", 175, 179),
        ],
    ),
    (
        "chapter-7",
        "7",
        "总结",
        [("7-summary", "7", "总结", 179, 181)],
    ),
]


def normalize_spaces(text: str) -> str:
    text = text.replace("\u00a0", " ").replace("\u200b", "")
    text = re.sub(r"\[\s*(\d+)\s*\]", r"[\1]", text)
    text = re.sub(r"\[\s*(\d+)\s*,\s*\[\s*(\d+)\s*\]", r"[\1], [\2]", text)
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()


def join_wrapped_lines(lines: Iterable[str]) -> str:
    output = ""
    for raw in lines:
        line = normalize_spaces(raw)
        if not line:
            continue
        if not output:
            output = line
            continue
        if output.endswith("-") and re.match(r"^[A-Za-z]", line):
            output = output[:-1] + line
        elif re.search(r"[A-Za-z0-9\]]$", output) and re.match(r"^[A-Za-z0-9\[]", line):
            output += " " + line
        else:
            output += line
    return normalize_spaces(output)


def clean_table_cell(value: str | None) -> str:
    if not value:
        return ""
    groups: list[str] = []
    buffer: list[str] = []
    for line in value.splitlines():
        stripped = normalize_spaces(line)
        if not stripped:
            continue
        if stripped.startswith("•") and buffer:
            groups.append(join_wrapped_lines(buffer))
            buffer = [stripped]
        else:
            buffer.append(stripped)
    if buffer:
        groups.append(join_wrapped_lines(buffer))
    text = "\n".join(groups)
    if len(text) <= 24 and not re.search(r"[。；：,.;:]", text):
        text = re.sub(r"\s+", "", text)
    return text.strip()


def table_category(number: str) -> str:
    chapter, index_text = number.split(".")
    index = int(index_text)
    if chapter == "2":
        if index <= 3:
            return "research"
        if index <= 6:
            return "products"
        if index <= 9:
            return "collaboration"
        if index <= 12:
            return "hardware"
        if index == 13:
            return "incidents"
        if index == 14:
            return "vulnerabilities"
        if index == 15:
            return "tools"
        if index <= 21:
            return "policy"
        return "bottlenecks"
    if chapter in {"3", "4", "5"}:
        return "six-dimension"
    if chapter == "6":
        return "research-directions"
    return "other"


def title_from_page(text: str, number: str) -> str:
    match = re.search(
        rf"(?m)^表\s*{re.escape(number)}\s*[:：]\s*(.+)$",
        text,
    )
    return normalize_spaces(match.group(1)) if match else f"报告表 {number}"


def extract_tables(pdf: Any, page_texts: list[str]) -> list[dict[str, Any]]:
    grouped: dict[str, dict[str, Any]] = {}
    titles: dict[str, str] = {}
    for text in page_texts:
        for match in re.finditer(r"(?m)^表\s*(\d+\.\d+)\s*[:：]\s*(.+)$", text):
            number = match.group(1)
            titles.setdefault(number, normalize_spaces(match.group(2)))

    current_number = ""
    caption_pattern = r"表\s*\d+\.\d+(?:\s*[-–—]?\s*续上页)?"
    for page_index, page in enumerate(pdf.pages):
        captions = page.search(caption_pattern, regex=True) or []
        found_tables = sorted(page.find_tables(), key=lambda item: item.bbox[1])
        for found in found_tables:
            preceding = [
                caption
                for caption in captions
                if caption["top"] < found.bbox[1] + 2
            ]
            if preceding:
                caption = max(preceding, key=lambda item: item["top"])
                number_match = re.search(r"(\d+\.\d+)", caption["text"])
                if number_match:
                    current_number = number_match.group(1)
            if not current_number:
                continue

            raw_rows = found.extract() or []
            if len(raw_rows) < 2:
                continue
            columns = [clean_table_cell(value) for value in raw_rows[0]]
            width = len(columns)
            if width < 2:
                continue
            entry = grouped.setdefault(
                current_number,
                {
                    "id": f"table-{current_number.replace('.', '-')}",
                    "number": current_number,
                    "title": titles.get(
                        current_number,
                        title_from_page(page_texts[page_index], current_number),
                    ),
                    "category": table_category(current_number),
                    "columns": columns,
                    "rows": [],
                    "_previous": [""] * width,
                },
            )
            if len(entry["columns"]) != width:
                raise RuntimeError(
                    f"Table {current_number} changed width "
                    f"{len(entry['columns'])} -> {width} on PDF page {page_index}."
                )
            previous = entry["_previous"]
            for raw_row in raw_rows[1:]:
                padded = (list(raw_row) + [None] * width)[:width]
                row: list[str] = []
                for cell_index, raw_value in enumerate(padded):
                    value = clean_table_cell(raw_value)
                    if raw_value is None and previous[cell_index]:
                        value = previous[cell_index]
                    row.append(value)
                if not any(row):
                    continue
                entry["rows"].append(row)
                previous = row
            entry["_previous"] = previous

    tables: list[dict[str, Any]] = []
    for number in sorted(
        grouped,
        key=lambda value: tuple(int(part) for part in value.split(".")),
    ):
        table = grouped[number]
        table.pop("_previous", None)
        tables.append(table)
    return tables


def page_text_without_tables(page: Any) -> str:
    boxes = [table.bbox for table in page.find_tables()]
    if not boxes:
        return page.extract_text() or ""

    def keep_char(obj: dict[str, Any]) -> bool:
        center_x = (float(obj["x0"]) + float(obj["x1"])) / 2
        center_y = (float(obj["top"]) + float(obj["bottom"])) / 2
        return not any(
            x0 <= center_x <= x1 and top <= center_y <= bottom
            for x0, top, x1, bottom in boxes
        )

    return page.filter(keep_char).extract_text() or ""


def clean_body_lines(texts: Iterable[str], chapter_number: str) -> list[str]:
    lines: list[str] = []
    for text in texts:
        for raw in text.splitlines():
            line = normalize_spaces(raw)
            if not line:
                continue
            if line in {"AI 智能体安全调研报告", "续下页", "续上页"}:
                continue
            if re.fullmatch(r"[ivxlcdm]+|\d+", line, flags=re.IGNORECASE):
                continue
            if re.match(rf"^第\s*{re.escape(chapter_number)}\s*章\b", line):
                continue
            if re.match(r"^表\s*\d+\.\d+", line):
                continue
            if re.match(r"^图\s*\d+\.\d+", line):
                continue
            if line.startswith("完整参考文献详见"):
                continue
            lines.append(line)
    return lines


def append_line(buffer: str, line: str) -> str:
    if not buffer:
        return line
    if buffer.endswith("-") and re.match(r"^[A-Za-z]", line):
        return buffer[:-1] + line
    if re.search(r"[A-Za-z0-9\]]$", buffer) and re.match(r"^[A-Za-z0-9\[]", line):
        return buffer + " " + line
    return buffer + line


def lines_to_blocks(lines: list[str], main_number: str) -> list[dict[str, str]]:
    blocks: list[dict[str, str]] = []
    buffer = ""
    bullet_mode = False
    heading_pattern = re.compile(r"^(\d+\.\d+(?:\.\d+)*)\s+(.+)$")

    def flush() -> None:
        nonlocal buffer, bullet_mode
        cleaned = normalize_spaces(buffer)
        if cleaned:
            blocks.append({"type": "paragraph", "text": cleaned})
        buffer = ""
        bullet_mode = False

    for line in lines:
        heading = heading_pattern.match(line)
        if heading:
            number = heading.group(1)
            if number != main_number:
                flush()
                blocks.append({"type": "heading", "text": f"{number} {heading.group(2)}"})
            continue
        named_heading = re.match(
            r"^(未来研究发展趋势|报告局限性)\s*[:：]\s*(.*)$",
            line,
        )
        if named_heading:
            flush()
            blocks.append({"type": "heading", "text": named_heading.group(1)})
            if named_heading.group(2):
                buffer = named_heading.group(2)
            continue
        if line.startswith("•"):
            flush()
            buffer = line
            bullet_mode = True
            continue
        buffer = append_line(buffer, line)
        if not bullet_mode and re.search(r"[。！？]$", line):
            flush()
    flush()
    return blocks


def figures_for_range(start: int, end: int) -> list[dict[str, str]]:
    return [
        {
            "number": number,
            "caption": caption,
            "src": f"/report-figures/figure-{number.replace('.', '-')}.png",
        }
        for number, caption, page, _ in FIGURES
        if start <= page < end
    ]


def table_ids_for_section(number: str) -> list[str]:
    if number == "2.1":
        indexes = range(1, 4)
    elif number == "2.2":
        indexes = range(4, 7)
    elif number == "2.3":
        indexes = range(7, 10)
    elif number == "2.4":
        indexes = range(10, 13)
    elif number == "2.5":
        indexes = range(13, 16)
    elif number == "2.6":
        indexes = range(16, 22)
    elif number == "2.7":
        indexes = range(22, 23)
    elif re.fullmatch(r"[3-6]\.\d+", number):
        return [f"table-{number.replace('.', '-')}"]
    else:
        return []
    return [f"table-2-{index}" for index in indexes]


def build_survey(
    body_page_texts: list[str],
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    preface_lines = clean_body_lines([body_page_texts[1]], "0")
    frontmatter = {
        "id": "frontmatter",
        "number": "前",
        "title": "序言与报告信息",
        "sections": [
            {
                "id": "report-note",
                "number": "说明",
                "title": "报告说明",
                "paragraphs": [
                    "AI 智能体安全调研报告——全生命周期视角下的风险机理、威胁演化与趋势分析（2026 版）",
                    "中国科学院计算机网络信息中心网络空间安全技术与应用发展部，2026 年 7 月。",
                    "本报告聚焦 2025—2026 年度 AI 智能体安全领域工作进展，系统梳理国内外学术研究、产业落地产品及各国监管政策；全部调研资料整理截止至 2026 年 7 月 31 日。报告持续更新版本可查阅：https://2026.securityreportcnic.dpdns.org/。",
                ],
            },
            {
                "id": "preface",
                "number": "序",
                "title": "序言",
                "paragraphs": [
                    block["text"]
                    for block in lines_to_blocks(preface_lines, "0")
                    if block["type"] == "paragraph"
                ],
            },
            {
                "id": "credits",
                "number": "成员",
                "title": "调研组成员信息",
                "paragraphs": [
                    "策划：孙德刚",
                    "课题组长：杨琨",
                    "研究成员：丁文乐，李兴元，刘亚伟，钱郑希，王耀辉，张驰，郑思成，祝慕",
                    "研究成员依照姓氏排序。感谢王蓉参与第四章前期内容的撰写工作。",
                ],
            },
        ],
    }

    chapters: list[dict[str, Any]] = [frontmatter]
    for chapter_id, number, title, section_defs in CHAPTERS:
        sections: list[dict[str, Any]] = []
        for section_id, section_number, section_title, start, end in section_defs:
            lines = clean_body_lines(body_page_texts[start:end], number)
            blocks = lines_to_blocks(lines, section_number)
            section: dict[str, Any] = {
                "id": section_id,
                "number": section_number,
                "title": section_title,
                "paragraphs": [
                    block["text"] for block in blocks if block["type"] == "paragraph"
                ],
            }
            if any(block["type"] == "heading" for block in blocks):
                section["blocks"] = blocks
            figures = figures_for_range(start, end)
            if figures:
                section["figures"] = figures
            table_ids = table_ids_for_section(section_number)
            if table_ids:
                section["tableIds"] = table_ids
            sections.append(section)
        chapters.append(
            {
                "id": chapter_id,
                "number": number,
                "title": title,
                "sections": sections,
            }
        )

    lifecycle_titles = [
        ("planning", "需求规划"),
        ("architecture", "架构设计"),
        ("development", "编码开发"),
        ("testing", "安全测试评估"),
        ("delivery", "部署交付"),
        ("operation", "运行迭代"),
        ("retirement", "退役销毁"),
    ]
    chapter_map = {chapter["id"]: chapter for chapter in chapters}
    lifecycle: list[dict[str, Any]] = []
    for index, (stage_id, title) in enumerate(lifecycle_titles, 1):
        lifecycle.append(
            {
                "id": stage_id,
                "title": title,
                "problems": chapter_map["chapter-3"]["sections"][index]["paragraphs"],
                "solutions": chapter_map["chapter-4"]["sections"][index]["paragraphs"],
                "trends": chapter_map["chapter-5"]["sections"][index]["paragraphs"],
            }
        )
    return chapters, lifecycle


def extract_braced_value(text: str, start: int) -> tuple[str, int]:
    while start < len(text) and text[start] != "{":
        start += 1
    if start >= len(text):
        return "", start
    depth = 1
    position = start + 1
    while position < len(text) and depth:
        if text[position] == "{" and text[position - 1] != "\\":
            depth += 1
        elif text[position] == "}" and text[position - 1] != "\\":
            depth -= 1
        position += 1
    return text[start + 1 : position - 1], position


def clean_bib_value(value: str) -> str:
    value = value.replace("\\&", "&").replace("\\%", "%")
    value = re.sub(r"\\[\"'`^~=.uvHckbdtr]\s*\{?([A-Za-z])\}?", r"\1", value)
    for command in ["textbf", "textit", "emph", "url"]:
        value = re.sub(rf"\\{command}\{{([^{{}}]*)\}}", r"\1", value)
    value = value.replace("{", "").replace("}", "")
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def parse_bib_entries() -> list[dict[str, str]]:
    if not BIB_PATH.exists():
        return []
    source = BIB_PATH.read_text(encoding="utf-8")
    entries: list[dict[str, str]] = []
    cursor = 0
    while True:
        match = re.search(r"@(\w+)\s*\{\s*([^,\s]+)\s*,", source[cursor:])
        if not match:
            break
        content_start = cursor + match.end()
        depth = 1
        position = content_start
        while position < len(source) and depth:
            if source[position] == "{":
                depth += 1
            elif source[position] == "}":
                depth -= 1
            position += 1
        block = source[content_start : position - 1]
        fields: dict[str, str] = {}
        for field in [
            "title",
            "author",
            "year",
            "publisher",
            "journal",
            "booktitle",
            "url",
        ]:
            field_match = re.search(rf"(?im)^\s*{field}\s*=", block)
            if not field_match:
                continue
            value, _ = extract_braced_value(block, field_match.end())
            fields[field] = clean_bib_value(value)
        entries.append(
            {
                "key": match.group(2),
                "type": match.group(1).lower(),
                "title": fields.get("title", match.group(2)),
                "author": fields.get("author", ""),
                "year": fields.get("year", ""),
                "venue": fields.get("journal")
                or fields.get("booktitle")
                or fields.get("publisher")
                or "",
                "url": fields.get("url", ""),
            }
        )
        cursor = position
    return entries


def load_existing_references() -> tuple[list[dict[str, Any]], list[dict[str, str]]]:
    if not OUTPUT_PATH.exists():
        return [], []
    source = OUTPUT_PATH.read_text(encoding="utf-8")
    match = re.search(r"const DATA = (\{.*\}) as const;", source, flags=re.DOTALL)
    if not match:
        return [], []
    data = json.loads(match.group(1))
    return data.get("references", []), data.get("bib", [])


def build_reference_from_bib(
    bib_entries: list[dict[str, str]],
) -> list[dict[str, Any]]:
    references = []
    for index, entry in enumerate(bib_entries, 1):
        pieces = [
            entry["author"],
            entry["title"],
            entry["venue"],
            entry["year"],
        ]
        citation = ". ".join(piece.rstrip("., ") for piece in pieces if piece)
        references.append(
            {
                "number": index,
                "key": entry["key"],
                "citation": citation,
                "url": entry["url"],
            }
        )
    return references


def copy_assets() -> None:
    FIGURE_DIR.mkdir(parents=True, exist_ok=True)
    for number, _, _, source_name in FIGURES:
        source = IMAGE_DIR / source_name
        if not source.exists():
            raise FileNotFoundError(source)
        destination = FIGURE_DIR / f"figure-{number.replace('.', '-')}.png"
        shutil.copy2(source, destination)
    shutil.copy2(PDF_PATH, PUBLIC_DIR / "AI_智能体安全调研报告.pdf")


def write_ts(data: dict[str, Any]) -> None:
    serialized = json.dumps(data, ensure_ascii=False, indent=2)
    content = (
        "export interface ReportTable { id: string; number: string; title: string; "
        "category: string; columns: string[]; rows: string[][]; }\n"
        "export interface ReferenceEntry { number: number; key: string; citation: string; url: string; }\n"
        "export interface BibEntry { key: string; type: string; title: string; author: string; "
        "year: string; venue: string; url: string; }\n"
        "export interface LifecycleStage { id: string; title: string; problems: string[]; "
        "solutions: string[]; trends: string[]; }\n\n"
        "export interface SurveyContentBlock { type: 'heading' | 'paragraph'; text: string; }\n"
        "export interface ReportFigure { number: string; caption: string; src: string; }\n"
        "export interface SurveySection { id: string; number: string; title: string; paragraphs: string[]; "
        "blocks?: SurveyContentBlock[]; tableIds?: string[]; figures?: ReportFigure[]; }\n"
        "export interface SurveyChapter { id: string; number: string; title: string; sections: SurveySection[]; }\n\n"
        f"const DATA = {serialized} as const;\n\n"
        "export const REPORT_META = DATA.meta;\n"
        "export const LIFECYCLE_STAGES = DATA.lifecycle as unknown as LifecycleStage[];\n"
        "export const SURVEY_CHAPTERS = DATA.surveyChapters as unknown as SurveyChapter[];\n"
        "export const REPORT_TABLES = DATA.tables as unknown as ReportTable[];\n"
        "export const REFERENCES = DATA.references as unknown as ReferenceEntry[];\n"
        "export const BIB_ENTRIES = DATA.bib as unknown as BibEntry[];\n"
    )
    OUTPUT_PATH.write_text(content, encoding="utf-8")


def main() -> None:
    existing_references, existing_bib = load_existing_references()
    with pdfplumber.open(PDF_PATH) as pdf:
        page_texts = [page.extract_text() or "" for page in pdf.pages]
        body_page_texts = [page_text_without_tables(page) for page in pdf.pages]
        tables = extract_tables(pdf, page_texts)
    survey_chapters, lifecycle = build_survey(body_page_texts)

    parsed_bib = parse_bib_entries()
    bib_entries = parsed_bib or existing_bib
    references = existing_references or build_reference_from_bib(bib_entries)
    data = {
        "meta": {
            "title": "AI 智能体安全调研报告",
            "subtitle": "全生命周期视角下的风险机理、威胁演化与趋势分析",
            "edition": "2026 版（终稿）",
            "organization": "中国科学院计算机网络信息中心网络空间安全技术与应用发展部",
            "published": "2026 年 7 月 31 日",
            "pages": len(page_texts),
            "referenceCount": len(references),
            "tableCount": len(tables),
            "figureCount": len(FIGURES),
        },
        "lifecycle": lifecycle,
        "surveyChapters": survey_chapters,
        "tables": tables,
        "references": references,
        "bib": bib_entries,
    }
    copy_assets()
    write_ts(data)
    print(
        json.dumps(
            {
                "output": str(OUTPUT_PATH),
                "chapters": len(survey_chapters),
                "sections": sum(
                    len(chapter["sections"]) for chapter in survey_chapters
                ),
                "paragraphs": sum(
                    len(section["paragraphs"])
                    for chapter in survey_chapters
                    for section in chapter["sections"]
                ),
                "tables": len(tables),
                "tableNumbers": [table["number"] for table in tables],
                "tableWidths": {
                    table["number"]: len(table["columns"]) for table in tables
                },
                "tableRows": {
                    table["number"]: len(table["rows"]) for table in tables
                },
                "figures": len(FIGURES),
                "references": len(references),
                "bibEntries": len(bib_entries),
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
