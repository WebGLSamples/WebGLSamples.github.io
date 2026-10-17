#!/usr/bin/env python3
"""Generate a 1200x630 OG image for WebGL Samples (webglsamples.org).

Pillow-only, reproducible. Draws a dark 3D wireframe-cube card using the
site's brand palette (#0090c5 blue, #ff4486 pink) on a dark ground.
"""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG_TOP = (15, 18, 32)
BG_BOT = (26, 31, 51)
BLUE = (0, 144, 197)
PINK = (255, 68, 134)
WHITE = (245, 247, 250)
GREY = (150, 158, 180)

FONT_DIR = os.environ.get("FONT_DIR", "/usr/share/fonts/truetype/dejavu")


def font(size, bold=False):
    name = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    p = os.path.join(FONT_DIR, name)
    if not os.path.exists(p):
        # fallback to Liberation
        p = os.path.join(FONT_DIR, "LiberationSans-Bold.ttf" if bold else "LiberationSans-Regular.ttf")
    return ImageFont.truetype(p, size)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def draw_cube(d, cx, cy, size, color, width=3):
    """Isometric wireframe cube centered at (cx, cy)."""
    s = size
    # 8 vertices of an isometric cube
    v = [
        (cx - s, cy - s * 0.5),  # 0 front-left-top
        (cx + s, cy - s * 0.5),  # 1 front-right-top
        (cx + s, cy + s * 0.5),  # 2 front-right-bottom
        (cx - s, cy + s * 0.5),  # 3 front-left-bottom
        (cx, cy - s * 1.5),      # 4 back-top
        (cx, cy - s * 0.5),      # 5 back-bottom
    ]
    edges = [
        (0, 1), (1, 2), (2, 3), (3, 0),  # front face
        (0, 4), (1, 4), (2, 5), (3, 5),  # to back
        (4, 5),                          # back edge
    ]
    for a, b in edges:
        d.line([v[a], v[b]], fill=color, width=width)


def main():
    img = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(img)
    # vertical gradient
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=lerp(BG_TOP, BG_BOT, t))

    # subtle grid dots
    for gx in range(0, W, 40):
        for gy in range(0, H, 40):
            d.ellipse([gx - 1, gy - 1, gx + 1, gy + 1], fill=(40, 46, 70))

    # 3D wireframe cubes (WebGL motif)
    draw_cube(d, 900, 300, 150, BLUE, width=4)
    draw_cube(d, 1020, 420, 90, PINK, width=3)
    draw_cube(d, 780, 430, 60, (70, 90, 130), width=2)

    # Title
    f_title = font(88, bold=True)
    d.text((70, 120), "WebGL", fill=WHITE, font=f_title)
    d.text((70, 220), "Samples", fill=BLUE, font=f_title)

    # Tagline
    f_tag = font(34)
    d.text((72, 360), "A place to host and work on", fill=GREY, font=f_tag)
    d.text((72, 404), "WebGL sample applications", fill=GREY, font=f_tag)

    # Domain
    f_dom = font(30, bold=True)
    d.text((72, 520), "webglsamples.org", fill=PINK, font=f_dom)

    out = os.environ.get("OUT", "og-image.png")
    img.save(out)
    print("wrote", out, img.size)


if __name__ == "__main__":
    main()
