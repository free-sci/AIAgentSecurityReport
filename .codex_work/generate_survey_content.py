import json
import re
from pathlib import Path

import pdfplumber


PDF_PATH = Path(r"E:\下载\智能时代网络安全调研报告_持续更新中.pdf")
OUT_PATH = Path("src/data/surveyContent.ts")


SURVEY_MAP = {
    "intro": {
        "sec-bg": ("1.1", "研究背景"),
        "sec-method": ("1.2", "全生命周期视角下 AI 智能体安全分析方法"),
        "sec-structure": ("1.3", "论文组织结构"),
        "sec-mythos": ("1.4", "顶尖漏洞挖掘 Mythos"),
        "sec-export": ("1.5", "美国 AI 领域出口管制完整体系"),
    },
    "research": {
        "sec-academic": ("2.1", "全球学术理论研究现状（学界：高校 + 科研院所）"),
        "sec-industry": ("2.2", "全球主流产品安全现状（业界：企业产品）"),
        "sec-collab": ("2.3", "合作方面：产学协同关系与发展趋势"),
        "sec-hardware": ("2.4", "全球 AI 硬件与芯片底座安全国内外研究现状"),
        "sec-summary": ("2.5", "本章小结"),
        "sec-policy": ("2.6", "全球政策法规与标准治理现状（国家 / 区域制度）"),
        "sec-gaps": ("2.7", "全球研究结构性缺陷与精细化研究空白（本章核心）"),
    },
    "deploy": {
        "sec-tech": ("6.1", "单体智能体底层技术短板"),
        "sec-integration": ("6.2", "系统工程与业务集成壁垒"),
        "sec-cost": ("6.3", "成本管控与投资回报难题"),
        "sec-data-risk": ("6.4", "数据安全与合规治理风险"),
        "sec-org": ("6.5", "企业业务与组织架构适配障碍"),
        "sec-cluster": ("6.6", "大规模多智能体集群协同挑战"),
        "sec-deploy-summary": ("6.7", "本节小结"),
    },
    "summary": {
        "sec-conclusion": ("7.1", "全文研究总结"),
        "sec-limits": ("7.2", "研究存在的不足"),
        "sec-future": ("7.3", "未来研究展望"),
    },
}

PHASE_MAP = {
    "analysis": {
        "phase-1": ("3.1", "需求规划阶段（安全源头阶段）"),
        "phase-2": ("3.2", "架构设计阶段（安全体系定型阶段）"),
        "phase-3": ("3.3", "编码开发阶段（安全工程落地阶段）"),
        "phase-4": ("3.4", "安全测试评估阶段（风险验证排查阶段）– 重点分析"),
        "phase-5": ("3.5", "部署交付阶段（安全环境固化阶段）– 重点分析"),
        "phase-6": ("3.6", "运行迭代阶段（动态对抗风险阶段）– 重点分析"),
        "phase-7": ("3.7", "退役销毁阶段（安全闭环收尾阶段）"),
    },
    "defense": {
        "phase-1": ("4.1", "需求规划阶段"),
        "phase-2": ("4.2", "架构设计阶段安全防护体系设计"),
        "phase-3": ("4.3", "编码开发阶段安全防护体系设计"),
        "phase-4": ("4.4", "安全测试评估阶段安全防护体系设计"),
        "phase-5": ("4.5", "部署交付阶段安全防护体系设计"),
        "phase-6": ("4.6", "运行迭代阶段安全防护体系设计"),
        "phase-7": ("4.7", "退役销毁阶段安全防护体系设计"),
    },
    "trends": {
        "phase-1": ("5.1", "需求规划阶段"),
        "phase-2": ("5.2", "架构设计阶段"),
        "phase-3": ("5.3", "编码开发阶段"),
        "phase-4": ("5.4", "安全测试阶段"),
        "phase-5": ("5.5", "部署交付阶段"),
        "phase-6": ("5.6", "运行迭代阶段（核心阶段）"),
        "phase-7": ("5.7", "退役销毁阶段"),
    },
}

HORIZONTAL_UNITS = {
    "perception": "感知",
    "memory": "记忆",
    "decision": "决策",
    "action": "行动",
    "interaction": "交互",
    "governance": "治理",
}

VERTICAL_UNITS = {
    "open-env": "开放环境适配",
    "adversarial": "对抗诱导安全",
    "privacy": "数据隐私安全",
    "decision-evolution": "自主决策演化",
    "system-control": "系统管控与可解释性",
}

HORIZONTAL_MARKERS = {
    "perception": re.compile(r"^(?:[（(一1]?[）)]?\s*)?感知(?:能力|模块)?(?:[^\n]{0,24})(?:风险|防护|趋势|研究|测试|部署|运行|安全)?"),
    "memory": re.compile(r"^(?:[（(二2]?[）)]?\s*)?记忆(?:能力|模块)?(?:[^\n]{0,24})(?:风险|防护|趋势|研究|测试|部署|运行|安全)?"),
    "decision": re.compile(r"^(?:[（(三3]?[）)]?\s*)?决策(?:能力|模块)?(?:[^\n]{0,24})(?:风险|防护|趋势|研究|测试|部署|运行|安全)?"),
    "action": re.compile(r"^(?:[（(四4]?[）)]?\s*)?(?:行动|执行|工具调用)(?:能力|模块)?(?:[^\n]{0,24})(?:风险|防护|趋势|研究|测试|部署|运行|安全)?"),
    "interaction": re.compile(r"^(?:[（(五5]?[）)]?\s*)?交互(?:能力|模块)?(?:[^\n]{0,24})(?:风险|防护|趋势|研究|测试|部署|运行|安全)?"),
    "governance": re.compile(r"^(?:[（(六6]?[）)]?\s*)?(?:治理|系统治理|管控)(?:能力|模块)?(?:[^\n]{0,24})(?:风险|防护|趋势|研究|测试|部署|运行|安全)?"),
}

VERTICAL_MARKERS = {
    "open-env": re.compile(r"^(?:[（(一1]?[）)]?\s*)?开放环境适配"),
    "adversarial": re.compile(r"^(?:[（(二2]?[）)]?\s*)?对抗诱导安全"),
    "privacy": re.compile(r"^(?:[（(三3]?[）)]?\s*)?数据隐私安全"),
    "decision-evolution": re.compile(r"^(?:[（(四4]?[）)]?\s*)?自主决策演化"),
    "system-control": re.compile(r"^(?:[（(五5]?[）)]?\s*)?系统管控与可解释性"),
}

AUTHOR_MARKER_RE = re.compile(
    r"(?:WYH|LYW|WR|ZM|QZX)\s*[:：]?\s*|"
    r"(?<![A-Za-z])(?:wyh|lyw|wr|zm|qzx)(?![A-Za-z])\s*[:：]?\s*|"
    r"(?:王耀辉|刘亚伟|王蓉|祝慕)\s*[:：]?\s*"
)


HEADING_RE = re.compile(r"^([1-7](?:\.\d+){1,3})\s+(.+)$")
CHAPTER_HEADING_RE = re.compile(r"^第\s+([1-7])\s+章\s+.+$")
APPENDIX_HEADING_RE = re.compile(r"^(?:附录|第\s+[A-Z]\s+章\s+).*$")
PAGE_NUMBER_RE = re.compile(r"^\d+$")
APPENDIX_TEXT_RE = re.compile(r"(?:^|[\s。；])(?:附录|第\s*[A-Z]\s*章|表\s+[A-Z]\.\d+)")


def normalize_line(line: str) -> str:
    line = AUTHOR_MARKER_RE.sub("", line)
    return re.sub(r"\s+", " ", line).strip()


def read_pdf_lines() -> list[str]:
    lines: list[str] = []
    with pdfplumber.open(PDF_PATH) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            lines.extend(text.splitlines())
    return [normalize_line(line) for line in lines]


def should_skip(line: str) -> bool:
    if not line:
        return True
    if PAGE_NUMBER_RE.fullmatch(line):
        return True
    if line in {"AI 智能体安全调研报告"}:
        return True
    if re.fullmatch(r"第 [1-7] 章 .+", line):
        return True
    if line.startswith("图 ") or line.startswith("表 "):
        return True
    return False


def collect_markers(lines: list[str]) -> dict[str, int]:
    markers: dict[str, int] = {}
    for index, line in enumerate(lines):
        match = HEADING_RE.match(line)
        if match:
            markers[match.group(1)] = index
    return markers


def is_section_boundary(line: str, section_no: str) -> bool:
    if APPENDIX_HEADING_RE.match(line):
        return True

    chapter_match = CHAPTER_HEADING_RE.match(line)
    if chapter_match and chapter_match.group(1) != section_no.split(".")[0]:
        return True

    heading_match = HEADING_RE.match(line)
    if not heading_match:
        return False

    current_no = heading_match.group(1)
    if current_no == section_no:
        return False

    is_child = current_no.startswith(section_no + ".")
    return not is_child


def get_section_lines(section_no: str, lines: list[str], markers: dict[str, int]) -> list[str]:
    start_index = markers.get(section_no)
    if start_index is None:
        return []

    body: list[str] = []
    for line in lines[start_index + 1 :]:
        if is_section_boundary(line, section_no):
            break
        if should_skip(line):
            continue
        body.append(line)
    return body


def compress_paragraphs(lines: list[str]) -> list[str]:
    paragraphs: list[str] = []
    current = ""
    for line in lines:
        heading = HEADING_RE.match(line)
        if heading:
            if current:
                paragraphs.append(current)
                current = ""
            paragraphs.append(line)
            continue

        if not current:
            current = line
            continue

        if re.search(r"[。！？；：]$|[）)]$", current):
            paragraphs.append(current)
            current = line
        else:
            current += line

    if current:
        paragraphs.append(current)

    cleaned = []
    for paragraph in paragraphs:
        paragraph = re.sub(r"\s+", " ", paragraph).strip()
        if APPENDIX_TEXT_RE.search(paragraph):
            break
        paragraph = AUTHOR_MARKER_RE.sub("", paragraph).strip()
        paragraph = paragraph.replace("AIAgent", "AI Agent")
        paragraph = paragraph.replace("A（I ArtificialGeneral", "AI（Artificial General")
        if paragraph:
            cleaned.append(paragraph)
    return cleaned


def match_marker(line: str, markers: dict[str, re.Pattern[str]]) -> str | None:
    stripped = HEADING_RE.sub("", line).strip()
    for unit_id, marker in markers.items():
        if marker.search(stripped):
            return unit_id
    return None


def split_units(
    section_no: str,
    lines: list[str],
    markers: dict[str, int],
    unit_markers: dict[str, re.Pattern[str]],
    unit_titles: dict[str, str],
    fallback_section_no: str | None = None,
) -> dict[str, dict[str, object]]:
    section_lines = get_section_lines(section_no, lines, markers)
    fallback_lines = (
        get_section_lines(fallback_section_no, lines, markers)
        if fallback_section_no
        else section_lines
    )
    if not fallback_lines:
        fallback_lines = section_lines
    buckets: dict[str, list[str]] = {unit_id: [] for unit_id in unit_titles}
    active_unit: str | None = None

    for line in section_lines:
        matched_unit = match_marker(line, unit_markers)
        if matched_unit:
            active_unit = matched_unit
        if active_unit:
            buckets[active_unit].append(line)

    return {
        unit_id: {
            "title": unit_titles[unit_id],
            "description": make_description(compress_paragraphs(unit_lines or fallback_lines)),
            "body": compress_paragraphs(unit_lines or fallback_lines),
        }
        for unit_id, unit_lines in buckets.items()
    }


def make_description(body: list[str]) -> str:
    description = body[0] if body else "该维度原文内容正在整理中。"
    if len(description) > 120:
        description = description[:117] + "..."
    return description


def make_content(
    section_no: str,
    title: str,
    lines: list[str],
    markers: dict[str, int],
) -> dict[str, object]:
    body = compress_paragraphs(get_section_lines(section_no, lines, markers))
    return {
        "title": title,
        "description": make_description(body),
        "body": body,
    }


def build_ts_object(obj: object) -> str:
    return json.dumps(obj, ensure_ascii=False, indent=2)


def main() -> None:
    lines = read_pdf_lines()
    markers = collect_markers(lines)

    survey = {
        chapter: {
            key: make_content(section_no, title, lines, markers)
            for key, (section_no, title) in chapter_map.items()
        }
        for chapter, chapter_map in SURVEY_MAP.items()
    }

    phases = {
        chapter: {
            key: make_content(section_no, title, lines, markers)
            for key, (section_no, title) in phase_map.items()
        }
        for chapter, phase_map in PHASE_MAP.items()
    }

    phase_units = {
        chapter: {
            key: {
                "horizontal": split_units(
                    section_no,
                    lines,
                    markers,
                    HORIZONTAL_MARKERS,
                    HORIZONTAL_UNITS,
                    f"{section_no}.1",
                ),
                "vertical": split_units(
                    section_no,
                    lines,
                    markers,
                    VERTICAL_MARKERS,
                    VERTICAL_UNITS,
                    f"{section_no}.2",
                ),
            }
            for key, (section_no, _title) in phase_map.items()
        }
        for chapter, phase_map in PHASE_MAP.items()
    }

    output = f"""// Survey content extracted from 《智能时代网络安全调研报告_持续更新中》.
// This file is generated from the PDF source. Keep the body text close to the original report.

export interface SubsectionContent {{
  title: string;
  description: string;
  body: string[];
  keyPoints?: string[];
  figures?: {{ caption: string; description: string }}[];
}}

export interface PhaseUnitContent {{
  horizontal: Record<string, SubsectionContent>;
  vertical: Record<string, SubsectionContent>;
}}

export const SURVEY_CONTENT: Record<string, Record<string, SubsectionContent>> = {build_ts_object(survey)};

export const PHASE_DETAIL_CONTENT: Record<string, Record<string, SubsectionContent>> = {build_ts_object(phases)};

export const PHASE_UNIT_CONTENT: Record<string, Record<string, PhaseUnitContent>> = {build_ts_object(phase_units)};
"""
    OUT_PATH.write_text(output, encoding="utf-8")


if __name__ == "__main__":
    main()
