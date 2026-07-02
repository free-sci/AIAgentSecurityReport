import json
import re
from pathlib import Path

import pdfplumber

PDF_PATH = Path(r"E:\下载\智能时代网络安全调研报告_持续更新中.pdf")
OUT_PATH = Path(".codex_work/appendix_tables.json")


def clean_text(value):
    if value is None:
        return ""
    value = str(value).replace("\u3000", " ")
    value = re.sub(r"[ \t]+", " ", value)
    value = re.sub(r"\n+", "\n", value)
    return value.strip()


def find_caption(lines, table_index):
    for line in reversed(lines):
        line = clean_text(line)
        if re.match(r"^表\s*[A-Z]\.\d+", line):
            return line
    return f"未命名表格 {table_index}"


def main():
    payload = []
    in_appendix = False
    last_lines = []
    table_index = 0

    with pdfplumber.open(PDF_PATH) as pdf:
        for page_index, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            lines = [clean_text(line) for line in text.splitlines() if clean_text(line)]

            if any(re.match(r"^附录\s*[A-Z]", line) for line in lines):
                in_appendix = True
            if not in_appendix:
                continue

            page_tables = page.extract_tables() or []
            for table in page_tables:
                table_index += 1
                caption = find_caption(last_lines + lines, table_index)
                rows = [[clean_text(cell) for cell in row] for row in table if any(clean_text(cell) for cell in row)]
                if not rows:
                    continue
                payload.append(
                    {
                        "page": page_index,
                        "caption": caption,
                        "columns": rows[0],
                        "rows": rows[1:],
                    }
                )
            last_lines = (last_lines + lines)[-12:]

    OUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"tables={len(payload)} written={OUT_PATH}")
    for table in payload:
        print(f"p{table['page']} {table['caption']} cols={len(table['columns'])} rows={len(table['rows'])}")


if __name__ == "__main__":
    main()
