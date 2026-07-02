from pathlib import Path

import pdfplumber

PDF_PATH = r"E:\下载\智能时代网络安全调研报告_持续更新中.pdf"
OUT_PATH = Path(".codex_work/appendix_text.txt")

parts = []
with pdfplumber.open(PDF_PATH) as pdf:
    for page_no in range(292, 317):
        text = pdf.pages[page_no - 1].extract_text() or ""
        parts.append(f"\n--- PAGE {page_no} ---\n{text}")

OUT_PATH.write_text("\n".join(parts), encoding="utf-8")
print(OUT_PATH)
