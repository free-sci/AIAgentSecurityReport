from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = Path(r"E:\下载\AI_智能体安全调研报告.pdf")
BIB_PATH = Path(r"E:\下载\references (2).bib")
CHAPTER2_PATH = ROOT / "chapter2.tex"
OUTPUT_PATH = ROOT / "src" / "data" / "latestReportData.ts"


STAGES = [
    ("planning", "需求规划", (61, 65), (89, 93), (117, 121)),
    ("architecture", "架构设计", (65, 69), (93, 97), (121, 125)),
    ("development", "编码开发", (69, 73), (97, 101), (125, 129)),
    ("testing", "安全测试评估", (73, 77), (101, 105), (129, 133)),
    ("delivery", "部署交付", (77, 81), (105, 109), (133, 137)),
    ("operation", "运行迭代", (81, 85), (109, 113), (137, 141)),
    ("retirement", "退役销毁", (85, 89), (113, 117), (141, 145)),
]


def strip_tex_comments(text: str) -> str:
    lines = []
    for line in text.splitlines():
        match = re.search(r"(?<!\\)%", line)
        lines.append(line[: match.start()] if match else line)
    return "\n".join(lines)


def unwrap_command(text: str, command: str) -> str:
    marker = "\\" + command + "{"
    while marker in text:
        start = text.find(marker)
        content_start = start + len(marker)
        depth = 1
        pos = content_start
        while pos < len(text) and depth:
            if text[pos] == "{" and text[pos - 1 : pos] != "\\":
                depth += 1
            elif text[pos] == "}" and text[pos - 1 : pos] != "\\":
                depth -= 1
            pos += 1
        if depth:
            break
        text = text[:start] + text[content_start : pos - 1] + text[pos:]
    return text


def clean_latex(text: str) -> str:
    text = re.sub(r"\\SetCell(?:\[[^\]]*\])?\{[^}]*\}", "", text)
    text = re.sub(r"\\multirow\{[^}]*\}\{[^}]*\}", "", text)
    text = re.sub(r"\\begin\{(?:itemize|enumerate)\}(?:\[[^\]]*\])?", "", text)
    text = re.sub(r"\\end\{(?:itemize|enumerate)\}", "", text)
    text = re.sub(
        r"~?\\cite\{([^}]+)\}",
        lambda m: " " + " ".join(f"[@{key.strip()}]" for key in m.group(1).split(",")),
        text,
    )
    for command in [
        "textbf",
        "textit",
        "emph",
        "underline",
        "mbox",
        "makecell",
        "texttt",
        "url",
    ]:
        text = unwrap_command(text, command)
    text = text.replace("\\item", " • ")
    text = text.replace("\\newline", "\n")
    text = text.replace("\\allowbreak", "")
    text = text.replace("\\&", "&")
    text = text.replace("\\%", "%")
    text = text.replace("--", "–")
    text = text.replace("~", " ")
    text = re.sub(r"\\(?:centering|raggedright|footnotesize|small|scriptsize)\b", "", text)
    text = re.sub(r"\\[a-zA-Z@]+\*?(?:\[[^\]]*\])?", "", text)
    text = text.replace("{", "").replace("}", "")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\s*\n\s*", "\n", text)
    return text.strip(" \n&")


def split_top_level(text: str, separator: str) -> list[str]:
    parts: list[str] = []
    start = 0
    depth = 0
    index = 0
    while index < len(text):
        char = text[index]
        escaped = index > 0 and text[index - 1] == "\\"
        if char == "{" and not escaped:
            depth += 1
        elif char == "}" and not escaped and depth:
            depth -= 1
        elif char == separator and not escaped and depth == 0:
            parts.append(text[start:index])
            start = index + 1
        index += 1
    parts.append(text[start:])
    return parts


def split_table_rows(text: str) -> list[str]:
    # A table row terminator is followed by a horizontal rule in these sources.
    # Cell-internal manual line breaks may also use `\\`, so splitting every
    # occurrence corrupts wide product tables.
    return re.split(r"\\\\(?=\s*\\(?:hline|cline)\b)", text)


def extract_braced_value(text: str, start: int) -> tuple[str, int]:
    while start < len(text) and text[start] != "{":
        start += 1
    if start >= len(text):
        return "", start
    depth = 1
    pos = start + 1
    while pos < len(text) and depth:
        if text[pos] == "{" and text[pos - 1] != "\\":
            depth += 1
        elif text[pos] == "}" and text[pos - 1] != "\\":
            depth -= 1
        pos += 1
    return text[start + 1 : pos - 1], pos


def table_category(title: str) -> str:
    if "产品" in title:
        return "products"
    if "高校" in title or "科研" in title or "学术研究" in title:
        return "research"
    if (
        "产业" in title
        or "评测基准" in title
        or "工具调用协议" in title
        or "开源基础底座" in title
    ):
        return "collaboration"
    if "硬件" in title or "芯片" in title:
        return "hardware"
    if "事件" in title:
        return "incidents"
    if "漏洞" in title:
        return "vulnerabilities"
    if "攻击工具" in title:
        return "tools"
    if "政策" in title or "法规" in title or "出口管制" in title:
        return "policy"
    return "other"


def parse_chapter2_tables() -> list[dict[str, Any]]:
    source = strip_tex_comments(CHAPTER2_PATH.read_text(encoding="utf-8"))
    tables: list[dict[str, Any]] = []
    cursor = 0
    while True:
        begin = source.find(r"\begin{longtblr}", cursor)
        if begin < 0:
            break
        end = source.find(r"\end{longtblr}", begin)
        if end < 0:
            break
        block = source[begin:end]
        cursor = end + len(r"\end{longtblr}")
        caption_match = re.search(r"caption\s*=", block)
        if not caption_match:
            continue
        caption, _ = extract_braced_value(block, caption_match.end())
        first_hline = block.find(r"\hline")
        if first_hline < 0:
            continue
        body = block[first_hline:]
        parsed_rows: list[list[str]] = []
        for raw_row in split_table_rows(body):
            raw_row = re.sub(
                r"\\(?:hline|cline\{[^}]+\}|toprule|midrule|bottomrule)",
                "\n",
                raw_row,
            )
            cells = [clean_latex(cell) for cell in split_top_level(raw_row, "&")]
            if len(cells) < 2:
                continue
            if not any(cells):
                continue
            parsed_rows.append(cells)
        if len(parsed_rows) < 2:
            continue
        columns = parsed_rows[0]
        width = len(columns)
        rows = []
        previous = [""] * width
        for row in parsed_rows[1:]:
            row = (row + [""] * width)[:width]
            normalized = []
            for index, value in enumerate(row):
                value = value.strip()
                if not value and previous[index] and index < max(1, width - 1):
                    value = previous[index]
                normalized.append(value)
            if any(normalized):
                rows.append(normalized)
                previous = normalized
        tables.append(
            {
                "id": f"table-2-{len(tables) + 1}",
                "number": f"2.{len(tables) + 1}",
                "title": clean_latex(caption),
                "category": table_category(caption),
                "columns": columns,
                "rows": rows,
            }
        )
    unique_tables: list[dict[str, Any]] = []
    seen_titles: set[str] = set()
    for table in tables:
        if table["title"] in seen_titles:
            continue
        seen_titles.add(table["title"])
        unique_tables.append(table)

    category_order = {
        "research": 0,
        "products": 1,
        "collaboration": 2,
        "hardware": 3,
        "incidents": 4,
        "vulnerabilities": 5,
        "tools": 6,
        "policy": 7,
        "other": 8,
    }
    unique_tables.sort(key=lambda table: category_order[table["category"]])
    for index, table in enumerate(unique_tables, 1):
        table["id"] = f"table-2-{index}"
        table["number"] = f"2.{index}"
    return unique_tables


def remove_latex_environment(text: str, environment: str) -> str:
    pattern = re.compile(
        rf"\\begin\{{{re.escape(environment)}\}}.*?\\end\{{{re.escape(environment)}\}}",
        re.DOTALL,
    )
    return pattern.sub("\n", text)


def latex_body_to_paragraphs(text: str) -> list[str]:
    for environment in [
        "longtblr",
        "longtable",
        "table",
        "figure",
        "center",
    ]:
        text = remove_latex_environment(text, environment)
    text = re.sub(r"表~?\\ref\{[^}]+\}", "相关表格", text)
    text = re.sub(r"\\label\{[^}]+\}", "", text)
    text = re.sub(r"\\(?:begin|end)\{[^}]+\}(?:\[[^\]]*\])?", "\n", text)
    text = re.sub(r"\\(?:begingroup|endgroup|clearpage|newpage|pagebreak)\b", "\n", text)
    paragraphs: list[str] = []
    item_parts = re.split(r"\\item\b", text)
    for item_index, item_part in enumerate(item_parts):
        raw_parts = re.split(r"\n\s*\n+", item_part)
        for raw_index, raw in enumerate(raw_parts):
            paragraph = re.sub(r"\s+", " ", clean_latex(raw)).strip()
            if len(paragraph) >= 15:
                if item_index > 0 and raw_index == 0:
                    paragraph = "• " + paragraph
                paragraphs.append(paragraph)
    return paragraphs


def parse_chapter2_sections() -> list[dict[str, Any]]:
    source = strip_tex_comments(CHAPTER2_PATH.read_text(encoding="utf-8"))
    section_matches = list(re.finditer(r"\\section\{([^{}]+)\}", source))
    sections: list[dict[str, Any]] = []
    for section_index, match in enumerate(section_matches, 1):
        end = (
            section_matches[section_index].start()
            if section_index < len(section_matches)
            else len(source)
        )
        body = source[match.end() : end]
        blocks: list[dict[str, str]] = []
        subsection_matches = list(re.finditer(r"\\subsection\{([^{}]+)\}", body))
        intro_end = subsection_matches[0].start() if subsection_matches else len(body)
        blocks.extend(
            {"type": "paragraph", "text": paragraph}
            for paragraph in latex_body_to_paragraphs(body[:intro_end])
        )
        for subsection_index, subsection in enumerate(subsection_matches, 1):
            subsection_end = (
                subsection_matches[subsection_index].start()
                if subsection_index < len(subsection_matches)
                else len(body)
            )
            blocks.append(
                {
                    "type": "heading",
                    "text": f"2.{section_index}.{subsection_index} {clean_latex(subsection.group(1))}",
                }
            )
            blocks.extend(
                {"type": "paragraph", "text": paragraph}
                for paragraph in latex_body_to_paragraphs(
                    body[subsection.end() : subsection_end]
                )
            )
        sections.append(
            {
                "id": f"2-{section_index}",
                "number": f"2.{section_index}",
                "title": clean_latex(match.group(1)),
                "paragraphs": [
                    block["text"] for block in blocks if block["type"] == "paragraph"
                ],
                "blocks": blocks,
            }
        )
    order = {
        "全球AI智能体安全学术研究现状": 1,
        "全球AI智能体安全主流产品": 2,
        "产业界与学术界联动": 3,
        "全球AI硬件与芯片底座安全研究现状": 4,
        "AI智能体安全事件与主流攻击工具": 5,
        "全球AI智能体安全政策与法规": 6,
    }
    sections.sort(key=lambda section: order.get(section["title"], 99))
    for section_index, section in enumerate(sections, 1):
        section["id"] = f"2-{section_index}"
        section["number"] = f"2.{section_index}"
        subsection_index = 0
        for block in section["blocks"]:
            if block["type"] != "heading":
                continue
            subsection_index += 1
            block["text"] = re.sub(
                r"^2\.\d+\.\d+\s+",
                f"2.{section_index}.{subsection_index} ",
                block["text"],
            )
    return sections


def clean_pdf_table_cell(value: str | None) -> str:
    if not value:
        return ""
    lines = [line.strip() for line in value.splitlines() if line.strip()]
    output = ""
    for line in lines:
        if not output:
            output = line
            continue
        if line.startswith("•"):
            output += "\n" + line
        elif output.endswith("-") and re.match(r"^[A-Za-z]", line):
            output = output[:-1] + line
        elif re.search(r"[A-Za-z0-9]$", output) and re.match(r"^[A-Za-z0-9]", line):
            output += " " + line
        else:
            output += line
    return re.sub(r"[ \t]+", " ", output).strip()


def parse_lifecycle_tables(pages: list[Any]) -> list[dict[str, Any]]:
    tables: list[dict[str, Any]] = []
    chapter_starts = {
        3: 62,
        4: 90,
        5: 118,
    }
    for chapter, first_table_page in chapter_starts.items():
        for stage_index, (_, stage_title, _, _, _) in enumerate(STAGES, 1):
            start = first_table_page + (stage_index - 1) * 4
            combined_rows: list[list[str]] = []
            columns: list[str] = []
            title = ""
            for page_index in range(start, start + 3):
                page = pages[page_index]
                page_text = page.extract_text() or ""
                if not title:
                    caption_match = re.search(
                        rf"表\s*{chapter}\.{stage_index}\s*[:：]\s*(.+)",
                        page_text,
                    )
                    if caption_match:
                        title = caption_match.group(1).strip()
                extracted = page.extract_tables()
                if not extracted:
                    continue
                page_table = extracted[0]
                if not columns and page_table:
                    columns = [
                        clean_pdf_table_cell(cell).replace(" ", "")
                        for cell in page_table[0]
                    ]
                for row in page_table[1:]:
                    normalized = [clean_pdf_table_cell(cell) for cell in row]
                    if normalized and any(normalized):
                        normalized[0] = re.sub(r"\s+", "", normalized[0])
                        combined_rows.append(normalized)
            suffix = (
                "安全问题与研究挑战"
                if chapter == 3
                else "现有安全解决方案与缺陷"
                if chapter == 4
                else "攻防趋势"
            )
            title = f"AI 智能体{stage_title}阶段{suffix}"
            width = len(columns)
            rows = [(row + [""] * width)[:width] for row in combined_rows]
            tables.append(
                {
                    "id": f"table-{chapter}-{stage_index}",
                    "number": f"{chapter}.{stage_index}",
                    "title": title,
                    "category": "six-dimension",
                    "columns": columns,
                    "rows": rows,
                }
            )
    return tables


def extract_text_without_tables(page: Any) -> str:
    found_tables = sorted(page.find_tables(), key=lambda table: table.bbox[1])
    if not found_tables:
        return page.extract_text() or ""
    bands: list[str] = []
    cursor = 0.0
    for table in found_tables:
        _, top, _, bottom = table.bbox
        if top > cursor:
            text = page.crop((0, cursor, page.width, top)).extract_text() or ""
            if text.strip():
                bands.append(text)
        cursor = max(cursor, bottom)
    if cursor < page.height:
        text = page.crop((0, cursor, page.width, page.height)).extract_text() or ""
        if text.strip():
            bands.append(text)
    return "\n".join(bands)


def parse_chapter6_tables(pages: list[Any]) -> list[dict[str, Any]]:
    specs = [
        (
            "6.1",
            "AI 智能体规模化落地工程化安全挑战（产业部署与运维维度）",
            range(146, 148),
        ),
        (
            "6.2",
            "大规模自主协同多智能体系统安全研究现状与发展趋势",
            range(148, 151),
        ),
        (
            "6.3",
            "AI 智能体漏洞挖掘与修复研究现状与发展趋势",
            range(151, 153),
        ),
        (
            "6.4",
            "多模型集成安全推理体系研究现状与发展趋势",
            range(153, 155),
        ),
        (
            "6.5",
            "国产化多模型聚合安全网关研究现状与发展趋势",
            range(155, 158),
        ),
    ]
    tables: list[dict[str, Any]] = []
    for number, title, page_range in specs:
        columns: list[str] = []
        rows: list[list[str]] = []
        previous_group = ""
        for page_index in page_range:
            extracted = pages[page_index].extract_tables()
            if not extracted:
                continue
            page_table = extracted[0]
            if not columns and page_table:
                columns = [
                    re.sub(r"\s+", "", clean_pdf_table_cell(cell))
                    for cell in page_table[0]
                ]
            for raw_row in page_table[1:]:
                row = [clean_pdf_table_cell(cell) for cell in raw_row]
                if not row or not any(row):
                    continue
                row[0] = re.sub(r"\s+", "", row[0])
                if row[0]:
                    previous_group = row[0]
                elif previous_group:
                    row[0] = previous_group
                rows.append(row)
        width = len(columns)
        rows = [(row + [""] * width)[:width] for row in rows]
        tables.append(
            {
                "id": f"table-{number.replace('.', '-')}",
                "number": number,
                "title": title,
                "category": "research-directions",
                "columns": columns,
                "rows": rows,
            }
        )
    return tables


def clean_pdf_lines(text: str, chapter: int) -> list[str]:
    output: list[str] = []
    chapter_header = f"第 {chapter} 章"
    for raw in text.splitlines():
        line = raw.strip()
        if not line or re.fullmatch(r"\d+", line):
            continue
        if line == "AI 智能体安全调研报告" or line in {"续下页", "续上页"}:
            continue
        if line.startswith(chapter_header):
            continue
        if re.match(r"^表\s*[1-7]\.\d+", line):
            continue
        output.append(line)
    return output


def lines_to_paragraphs(lines: list[str]) -> list[str]:
    paragraphs: list[str] = []
    buffer = ""
    heading_pattern = re.compile(r"^[1-7]\.\d+(?:\.\d+)?\s")
    for line in lines:
        if heading_pattern.match(line):
            if buffer:
                paragraphs.append(buffer.strip())
                buffer = ""
            continue
        if line.startswith(("安全问题", "现有安全解决方案", "攻防趋势", "核心安全问题")):
            if buffer:
                paragraphs.append(buffer.strip())
                buffer = ""
            continue
        buffer += line
        if re.search(r"[。！？；：]$", line):
            paragraphs.append(buffer.strip())
            buffer = ""
    if buffer:
        paragraphs.append(buffer.strip())
    result = []
    seen = set()
    for paragraph in paragraphs:
        paragraph = re.sub(r"\s+", " ", paragraph)
        if len(paragraph) < 20 or paragraph in seen:
            continue
        seen.add(paragraph)
        result.append(paragraph)
    return result


def extract_page_range(pages: list[str], start: int, end: int, chapter: int) -> list[str]:
    lines: list[str] = []
    for page_text in pages[start:end]:
        lines.extend(clean_pdf_lines(page_text, chapter))
    return lines_to_paragraphs(lines)


def extract_numbered_sections(
    pages: list[str],
    start: int,
    end: int,
    chapter: int,
    section_defs: list[tuple[str, str]],
) -> list[dict[str, Any]]:
    lines: list[str] = []
    for page_text in pages[start:end]:
        lines.extend(clean_pdf_lines(page_text, chapter))
    starts: list[tuple[int, str, str]] = []
    for index, line in enumerate(lines):
        for section_id, section_title in section_defs:
            if re.match(rf"^{re.escape(section_id)}\s", line):
                starts.append((index, section_id, section_title))
                break
    sections: list[dict[str, Any]] = []
    for index, (line_index, section_id, section_title) in enumerate(starts):
        next_index = starts[index + 1][0] if index + 1 < len(starts) else len(lines)
        sections.append(
            {
                "id": section_id.replace(".", "-"),
                "number": section_id,
                "title": section_title,
                "paragraphs": lines_to_paragraphs(lines[line_index + 1 : next_index]),
            }
        )
    return sections


def parse_bib_entries() -> list[dict[str, str]]:
    source = BIB_PATH.read_text(encoding="utf-8")
    entries: list[dict[str, str]] = []
    cursor = 0
    while True:
        match = re.search(r"@(\w+)\s*\{\s*([^,\s]+)\s*,", source[cursor:])
        if not match:
            break
        start = cursor + match.start()
        content_start = cursor + match.end()
        depth = 1
        pos = content_start
        while pos < len(source) and depth:
            if source[pos] == "{":
                depth += 1
            elif source[pos] == "}":
                depth -= 1
            pos += 1
        block = source[content_start : pos - 1]
        fields: dict[str, str] = {}
        for field in ["title", "author", "year", "publisher", "journal", "url"]:
            field_match = re.search(rf"(?im)^\s*{field}\s*=", block)
            if not field_match:
                continue
            value, _ = extract_braced_value(block, field_match.end())
            fields[field] = clean_latex(value)
        entries.append(
            {
                "key": match.group(2),
                "type": match.group(1).lower(),
                "title": fields.get("title", match.group(2)),
                "author": fields.get("author", ""),
                "year": fields.get("year", ""),
                "venue": fields.get("journal") or fields.get("publisher") or "",
                "url": fields.get("url", ""),
            }
        )
        cursor = pos
    return entries


def normalize_title(text: str) -> set[str]:
    text = text.lower()
    text = re.sub(r"https?://\S+", " ", text)
    return {
        token
        for token in re.findall(r"[a-z0-9]{3,}|[\u4e00-\u9fff]{2,}", text)
        if token not in {"online", "available", "accessed", "2025", "2026", "2024"}
    }


def parse_pdf_references(pages: list[str], bib_entries: list[dict[str, str]]) -> list[dict[str, Any]]:
    text = "\n".join(pages[161:])
    text = re.sub(r"\n参考文献\s*\n?", "\n", text)
    matches = list(re.finditer(r"(?m)^\[(\d+)\]\s*", text))
    references: list[dict[str, Any]] = []
    bib_tokens = [(entry, normalize_title(entry["title"])) for entry in bib_entries]
    for index, match in enumerate(matches):
        number = int(match.group(1))
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        raw = text[match.end() : end]
        raw = re.sub(r"\n\s*\d+\s*$", "", raw)
        citation = re.sub(r"\s+", " ", raw).strip()
        citation = re.sub(r"https\s*:\s*//", "https://", citation)
        url_match = re.search(r"https?://[^\s]+", citation)
        url = url_match.group(0).rstrip(".,;") if url_match else ""
        title_tokens = normalize_title(citation)
        best_entry: dict[str, str] | None = None
        best_score = 0.0
        if title_tokens:
            for entry, tokens in bib_tokens:
                if not tokens:
                    continue
                overlap = len(title_tokens & tokens)
                score = overlap / max(1, len(tokens))
                if overlap >= 2 and score > best_score:
                    best_entry = entry
                    best_score = score
        if best_entry and best_score >= 0.45:
            url = best_entry["url"] or url
            key = best_entry["key"]
        else:
            key = ""
        references.append(
            {
                "number": number,
                "key": key,
                "citation": citation,
                "url": url,
            }
        )
    return references


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
        "export interface SurveySection { id: string; number: string; title: string; paragraphs: string[]; "
        "blocks?: SurveyContentBlock[]; tableIds?: string[]; }\n"
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
    with pdfplumber.open(PDF_PATH) as pdf:
        pdf_pages = list(pdf.pages)
        pages = [page.extract_text() or "" for page in pdf_pages]
        lifecycle_tables = parse_lifecycle_tables(pdf_pages)
        chapter6_tables = parse_chapter6_tables(pdf_pages)
        chapter6_body_pages = list(pages)
        for page_index in range(145, 159):
            chapter6_body_pages[page_index] = extract_text_without_tables(
                pdf_pages[page_index]
            )
    lifecycle = []
    for stage_id, title, problem_range, solution_range, trend_range in STAGES:
        lifecycle.append(
            {
                "id": stage_id,
                "title": title,
                "problems": extract_page_range(
                    pages, problem_range[0], problem_range[0] + 1, 3
                ),
                "solutions": extract_page_range(
                    pages, solution_range[0], solution_range[0] + 1, 4
                ),
                "trends": extract_page_range(
                    pages, trend_range[0], trend_range[0] + 1, 5
                ),
            }
        )
    chapter1_sections = extract_numbered_sections(
        pages,
        7,
        11,
        1,
        [
            ("1.1", "研究背景"),
            ("1.2", "全生命周期视角下 AI 智能体安全分析方法"),
            ("1.3", "全生命周期逐阶段自研安全 OpenClaw 示例分析"),
        ],
    )
    for section in chapter1_sections:
        if section["number"] == "1.1":
            section["paragraphs"] = [
                paragraph
                for paragraph in section["paragraphs"]
                if not re.match(r"^1\s*本报告研究对象为", paragraph)
            ]
    chapter6_sections = extract_numbered_sections(
        chapter6_body_pages,
        145,
        159,
        6,
        [
            ("6.1", "AI 智能体规模化落地安全研究"),
            ("6.2", "大规模自主协同多智能体系统安全研究"),
            ("6.3", "基于 AI 智能体的漏洞挖掘与修复体系研究"),
            ("6.4", "多模型集成安全推理体系研究"),
            ("6.5", "国产化多模型聚合安全网关研究"),
        ],
    )
    for section_index, section in enumerate(chapter6_sections, 1):
        section["tableIds"] = [f"table-6-{section_index}"]
    chapter7_paragraphs = extract_page_range(pages, 159, 161, 7)
    chapter2_sections = parse_chapter2_sections()
    survey_chapters = [
        {
            "id": "chapter-1",
            "number": "1",
            "title": "绪论",
            "sections": chapter1_sections,
        },
        {
            "id": "chapter-2",
            "number": "2",
            "title": "全球 AI 智能体安全研究现状",
            "sections": chapter2_sections,
        },
        {
            "id": "chapter-3",
            "number": "3",
            "title": "全生命周期安全问题与挑战分析",
            "sections": [
                {
                    "id": f"3-{index + 1}",
                    "number": f"3.{index + 1}",
                    "title": stage["title"],
                    "paragraphs": stage["problems"],
                    "tableIds": [f"table-3-{index + 1}"],
                }
                for index, stage in enumerate(lifecycle)
            ],
        },
        {
            "id": "chapter-4",
            "number": "4",
            "title": "全生命周期安全现有防护方案分析",
            "sections": [
                {
                    "id": f"4-{index + 1}",
                    "number": f"4.{index + 1}",
                    "title": stage["title"],
                    "paragraphs": stage["solutions"],
                    "tableIds": [f"table-4-{index + 1}"],
                }
                for index, stage in enumerate(lifecycle)
            ],
        },
        {
            "id": "chapter-5",
            "number": "5",
            "title": "全生命周期安全发展趋势",
            "sections": [
                {
                    "id": f"5-{index + 1}",
                    "number": f"5.{index + 1}",
                    "title": stage["title"],
                    "paragraphs": stage["trends"],
                    "tableIds": [f"table-5-{index + 1}"],
                }
                for index, stage in enumerate(lifecycle)
            ],
        },
        {
            "id": "chapter-6",
            "number": "6",
            "title": "规模化落地安全挑战与重要研究方向",
            "sections": chapter6_sections,
        },
        {
            "id": "chapter-7",
            "number": "7",
            "title": "总结",
            "sections": [
                {
                    "id": "7-summary",
                    "number": "7",
                    "title": "总结",
                    "paragraphs": chapter7_paragraphs,
                }
            ],
        },
    ]
    tables = parse_chapter2_tables() + lifecycle_tables + chapter6_tables
    bib_entries = parse_bib_entries()
    references = parse_pdf_references(pages, bib_entries)
    data = {
        "meta": {
            "title": "AI 智能体安全调研报告",
            "edition": "2026 版",
            "organization": "计算机网络信息中心安全部",
            "published": "2026 年 7 月",
            "pages": len(pages),
            "referenceCount": len(references),
            "tableCount": len(tables),
        },
        "lifecycle": lifecycle,
        "surveyChapters": survey_chapters,
        "tables": tables,
        "references": references,
        "bib": bib_entries,
    }
    write_ts(data)
    print(
        json.dumps(
            {
                "output": str(OUTPUT_PATH),
                "lifecycleStages": len(lifecycle),
                "tables": len(tables),
                "tableNumbers": [table["number"] for table in tables],
                "references": len(references),
                "referencesWithUrl": sum(bool(ref["url"]) for ref in references),
                "bibEntries": len(bib_entries),
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
