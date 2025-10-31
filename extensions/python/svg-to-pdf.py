from svglib.svglib import svg2rlg
from reportlab.graphics import renderPDF

drawing = svg2rlg("_{{svg_file}}_")
renderPDF.drawToFile(drawing, "_{{pdf_file}}_")

print(True)
