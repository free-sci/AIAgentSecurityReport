import pdfplumber

PDF_PATH = r"E:\下载\智能时代网络安全调研报告_持续更新中.pdf"

with pdfplumber.open(PDF_PATH) as pdf:
    print("pages", len(pdf.pages))
    for index, page in enumerate(pdf.pages, start=1):
        text = page.extract_text() or ""
        heads = []
        for line in text.splitlines():
            line = line.strip()
            if line.startswith("附录") or line.startswith("表"):
                heads.append(line)
        if heads:
            print(index, " | ".join(heads[:10]))
