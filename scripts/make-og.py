"""
Render the Open Graph image (public/og.png, 1200 x 630) in the site's own
type and colours, so link previews match the page.

Usage:  python scripts/make-og.py
Needs:  Pillow (pip install pillow). The variable TTF of Bricolage Grotesque
        is downloaded once into scripts/.cache/ from the google/fonts repo.
"""
from __future__ import annotations

import os
import sys
import urllib.request

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "scripts", ".cache")
FONT_URL = (
    "https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/"
    "BricolageGrotesque%5Bopsz%2Cwdth%2Cwght%5D.ttf"
)
FONT_PATH = os.path.join(CACHE, "BricolageGrotesque-Variable.ttf")
OUT = os.path.join(ROOT, "public", "og.png")

PAPER = (251, 251, 248)
INK = (0, 0, 0)
TEXT = (38, 38, 36)
MUTED = (107, 107, 102)
ACCENT = (36, 57, 224)

NAME = "Gopal Krishna"
LINE = "I build machine-learning systems and the data pipelines they run on."
META = "MSc Data Science, University of Basel"


def font(size: int, weight: int, width: int, opsz: int) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(FONT_PATH, size)
    wanted = {"opsz": opsz, "wdth": width, "wght": weight, "optical size": opsz, "width": width, "weight": weight}
    try:
        values = []
        for ax in f.get_variation_axes():
            name = ax["name"]
            name = name.decode() if isinstance(name, bytes) else str(name)
            values.append(wanted.get(name.lower(), ax["default"]))
        f.set_variation_by_axes(values)
    except Exception as e:  # noqa: BLE001
        print("variation axes not supported, using default instance:", e, file=sys.stderr)
    return f


def wrap(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, max_w: int) -> list[str]:
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=f) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def main() -> None:
    os.makedirs(CACHE, exist_ok=True)
    if not os.path.exists(FONT_PATH):
        print("downloading Bricolage Grotesque")
        urllib.request.urlretrieve(FONT_URL, FONT_PATH)

    im = Image.new("RGB", (1200, 630), PAPER)
    d = ImageDraw.Draw(im)
    margin = 72

    # Name, display setting: condensed, heavy.
    name_font = font(196, 760, 86, 96)
    d.text((margin - 8, 200), NAME, font=name_font, fill=INK)

    # Rule and meta line at the top.
    d.rectangle([margin, 60, 1200 - margin, 61], fill=INK)
    meta_font = font(26, 500, 100, 24)
    d.text((margin, 76), META, font=meta_font, fill=MUTED)
    d.text((1200 - margin - d.textlength("Basel, Switzerland", font=meta_font), 76), "Basel, Switzerland", font=meta_font, fill=MUTED)

    # Statement at the bottom, with an accent square as the marker.
    stmt_font = font(40, 640, 92, 36)
    lines = wrap(d, LINE, stmt_font, 1200 - 2 * margin - 40)
    y = 630 - margin - 48 * len(lines)
    d.rectangle([margin, y + 12, margin + 18, y + 30], fill=ACCENT)
    for ln in lines:
        d.text((margin + 36, y), ln, font=stmt_font, fill=TEXT)
        y += 48

    im.save(OUT, "PNG", optimize=True)
    print("wrote", OUT, im.size)


if __name__ == "__main__":
    main()
