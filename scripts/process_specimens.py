import os
import glob
from PIL import Image, ImageDraw, ImageFont

# Directory configuration
CORALS_RAW_DIR = 'Corals'
OCTORAL_RAW_DIR = 'Octoral'

DISPLAY_DIR = 'public/specimens/display'
DOWNLOADS_DIR = 'public/specimens/downloads'

os.makedirs(DISPLAY_DIR, exist_ok=True)
os.makedirs(DOWNLOADS_DIR, exist_ok=True)

# Select best available truetype fonts
FONT_BOLD_PATH = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FONT_REGULAR_PATH = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'

if not os.path.exists(FONT_BOLD_PATH):
    FONT_BOLD_PATH = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'
if not os.path.exists(FONT_REGULAR_PATH):
    FONT_REGULAR_PATH = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'

print("Using fonts:", FONT_BOLD_PATH, FONT_REGULAR_PATH)

# Species templates matching coralSpeciesData.ts
CORAL_TEMPLATES = [
    { 'botanicalName': 'Fungia paumotensis', 'family': 'Fungiidae', 'category': 'Scleractinia' },
    { 'botanicalName': 'Acropora formosa', 'family': 'Acroporidae', 'category': 'Scleractinia' },
    { 'botanicalName': 'Porites lutea', 'family': 'Poritidae', 'category': 'Scleractinia' },
    { 'botanicalName': 'Tubastraea coccinea', 'family': 'Dendrophylliidae', 'category': 'Scleractinia' },
    { 'botanicalName': 'Favites abdita', 'family': 'Merulinidae', 'category': 'Scleractinia' },
]

OCTO_TEMPLATES = [
    { 'botanicalName': 'Annella mollis', 'family': 'Subergorgiidae', 'category': 'Octocorallia' },
    { 'botanicalName': 'Sarcophyton glaucum', 'family': 'Alcyoniidae', 'category': 'Octocorallia' },
    { 'botanicalName': 'Dendronephthya hemprichi', 'family': 'Nephtheidae', 'category': 'Octocorallia' },
    { 'botanicalName': 'Echinomuricea indica', 'family': 'Plexauridae', 'category': 'Octocorallia' },
    { 'botanicalName': 'Ellisella maculata', 'family': 'Ellisellidae', 'category': 'Octocorallia' },
]

# Excluded non-specimen indices (0-indexed)
CORAL_EXCLUDE_INDICES = {79, 81}
OCTO_EXCLUDE_INDICES = {28, 30, 36, 37, 40}

def get_coral_raw_files():
    files = sorted([f for f in os.listdir(CORALS_RAW_DIR) if f.lower().endswith(('.jpeg', '.jpg', '.png'))])
    return [os.path.join(CORALS_RAW_DIR, f) for i, f in enumerate(files) if i not in CORAL_EXCLUDE_INDICES]

def get_octo_raw_files():
    files = sorted([f for f in os.listdir(OCTORAL_RAW_DIR) if f.lower().endswith(('.jpeg', '.jpg', '.png'))])
    return [os.path.join(OCTORAL_RAW_DIR, f) for i, f in enumerate(files) if i not in OCTO_EXCLUDE_INDICES]

def process_specimen(in_path, out_filename, specimen_id, botanical_name, family, category):
    display_path = os.path.join(DISPLAY_DIR, out_filename)
    download_path = os.path.join(DOWNLOADS_DIR, out_filename)

    with Image.open(in_path) as img:
        img = img.convert('RGB')
        w, h = img.size

        # --- 1. DISPLAY VERSION ---
        # Resize to max width 1600px if larger, strip EXIF, clean WebP
        display_img = img.copy()
        if w > 1600:
            new_h = int(h * (1600 / w))
            display_img = display_img.resize((1600, new_h), Image.Resampling.LANCZOS)
        
        display_img.save(display_path, 'WEBP', quality=82)

        # --- 2. DOWNLOAD VERSION WITH BURNED-IN WATERMARK & CITATION ---
        download_img = img.copy()
        dw, dh = download_img.size

        # Create overlay layer for semi-transparent dark oceanic gradient bar
        # Height scaled dynamically to ~6.5% of image height (min 70px)
        banner_h = max(70, int(dh * 0.065))
        overlay = Image.new('RGBA', (dw, dh), (0, 0, 0, 0))
        draw_overlay = ImageDraw.Draw(overlay)

        # Draw dark gradient oceanic bar at the bottom
        for y in range(dh - banner_h, dh):
            alpha = int(220 + 35 * ((y - (dh - banner_h)) / banner_h)) # gradient from dark RGBA(6,16,28, 220) to (6,16,28, 255)
            draw_overlay.line([(0, y), (dw, y)], fill=(6, 16, 28, alpha))

        # Composite gradient overlay onto image
        download_img_rgba = download_img.convert('RGBA')
        download_img_rgba = Image.alpha_composite(download_img_rgba, overlay)
        draw = ImageDraw.Draw(download_img_rgba)

        # Dynamic Font Scaling based on banner height
        title_font_size = max(14, int(banner_h * 0.28))
        sub_font_size = max(11, int(banner_h * 0.21))
        badge_font_size = max(10, int(banner_h * 0.19))

        try:
            font_title = ImageFont.truetype(FONT_BOLD_PATH, title_font_size)
            font_sub = ImageFont.truetype(FONT_REGULAR_PATH, sub_font_size)
            font_badge = ImageFont.truetype(FONT_BOLD_PATH, badge_font_size)
        except Exception:
            font_title = font_sub = font_badge = ImageFont.load_default()

        # Text lines
        line1 = f"{botanical_name} ({family} / {category}) — {specimen_id}"
        line2 = "© Dr. J.S. Yogesh Kumar • Marine Biodiversity & Coral Taxonomy Lab • Academic & Educational Reference Only"
        badge_text = "RESEARCH CITATION ARCHIVE"

        # Padding offsets
        pad_x = max(16, int(dw * 0.015))
        top_y1 = (dh - banner_h) + int(banner_h * 0.18)
        top_y2 = (dh - banner_h) + int(banner_h * 0.54)

        # Draw Line 1 (Primary - Warm Gold Accent)
        draw.text((pad_x, top_y1), line1, fill=(226, 186, 125, 255), font=font_title)

        # Draw Line 2 (Secondary - Light Slate Slate-300)
        draw.text((pad_x, top_y2), line2, fill=(203, 213, 225, 240), font=font_sub)

        # Right Corner Badge
        try:
            bbox = font_badge.getbbox(badge_text)
            bw = bbox[2] - bbox[0]
            bh = bbox[3] - bbox[1]
        except Exception:
            bw, bh = 150, 14

        badge_x = dw - pad_x - bw - 16
        badge_y = (dh - banner_h) + int((banner_h - bh) / 2) - 2

        # Badge background pill box
        draw.rectangle(
            [badge_x - 8, badge_y - 4, badge_x + bw + 8, badge_y + bh + 4],
            fill=(197, 168, 128, 40),
            outline=(197, 168, 128, 140),
            width=1
        )
        draw.text((badge_x, badge_y), badge_text, fill=(226, 186, 125, 255), font=font_badge)

        # Convert back to RGB and save as high-quality WebP
        final_download_img = download_img_rgba.convert('RGB')
        final_download_img.save(download_path, 'WEBP', quality=92)

def main():
    coral_files = get_coral_raw_files()
    octo_files = get_octo_raw_files()

    print(f"Ingesting {len(coral_files)} raw coral photos...")
    for idx, filepath in enumerate(coral_files):
        num = idx + 1
        num_str = f"{num:03d}"
        specimen_id = f"coral-{num_str}"
        out_filename = f"coral_{num_str}.webp"
        tmpl = CORAL_TEMPLATES[idx % len(CORAL_TEMPLATES)]
        process_specimen(filepath, out_filename, specimen_id, tmpl['botanicalName'], tmpl['family'], tmpl['category'])

    print(f"Ingesting {len(octo_files)} raw octocoral photos...")
    for idx, filepath in enumerate(octo_files):
        num = idx + 1
        num_str = f"{num:03d}"
        specimen_id = f"octo-{num_str}"
        out_filename = f"octocoral_{num_str}.webp"
        tmpl = OCTO_TEMPLATES[idx % len(OCTO_TEMPLATES)]
        process_specimen(filepath, out_filename, specimen_id, tmpl['botanicalName'], tmpl['family'], tmpl['category'])

    print("Batch pre-processing pipeline completed successfully!")

if __name__ == '__main__':
    main()
