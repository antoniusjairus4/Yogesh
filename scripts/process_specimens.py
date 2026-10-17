import os
import glob
from PIL import Image, ImageDraw, ImageFont

# Directory configuration
CORALS_RAW_DIR = 'Corals'
OCTORAL_RAW_DIR = 'Octorals'
MOLLUSCA_RAW_DIR = 'Mollusca'

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

MOLLUSCA_TEMPLATES = [
    { 'botanicalName': 'Trochus niloticus', 'family': 'Tegulidae', 'category': 'Gastropoda' },
    { 'botanicalName': 'Conus marmoreus', 'family': 'Conidae', 'category': 'Gastropoda' },
    { 'botanicalName': 'Mauritia mauritiana', 'family': 'Cypraeidae', 'category': 'Gastropoda' },
    { 'botanicalName': 'Pleuroploca trapezium', 'family': 'Fasciolariidae', 'category': 'Gastropoda' },
    { 'botanicalName': 'Conus ebraeus', 'family': 'Conidae', 'category': 'Gastropoda' },
    { 'botanicalName': 'Turbo marmoratus', 'family': 'Turbinidae', 'category': 'Gastropoda' },
    { 'botanicalName': 'Lyncina carneola', 'family': 'Cypraeidae', 'category': 'Gastropoda' },
    { 'botanicalName': 'Tridacna maxima', 'family': 'Cardiidae', 'category': 'Bivalvia' },
]

# Excluded non-specimen indices (0-indexed)
CORAL_EXCLUDE_INDICES = {79, 81}
OCTO_EXCLUDE_INDICES = set()
MOLLUSCA_EXCLUDE_INDICES = set()

def get_coral_raw_files():
    files = sorted([f for f in os.listdir(CORALS_RAW_DIR) if f.lower().endswith(('.jpeg', '.jpg', '.png'))])
    return [os.path.join(CORALS_RAW_DIR, f) for i, f in enumerate(files) if i not in CORAL_EXCLUDE_INDICES]

def get_octo_raw_files():
    files = sorted([f for f in os.listdir(OCTORAL_RAW_DIR) if f.lower().endswith(('.jpeg', '.jpg', '.png'))])
    return [os.path.join(OCTORAL_RAW_DIR, f) for i, f in enumerate(files) if i not in OCTO_EXCLUDE_INDICES]

def get_mollusca_raw_files():
    files = sorted([f for f in os.listdir(MOLLUSCA_RAW_DIR) if f.lower().endswith(('.jpeg', '.jpg', '.png'))])
    return [os.path.join(MOLLUSCA_RAW_DIR, f) for i, f in enumerate(files) if i not in MOLLUSCA_EXCLUDE_INDICES]

def process_specimen(in_path, out_filename, specimen_id, botanical_name, family, category, force=False):
    display_path = os.path.join(DISPLAY_DIR, out_filename)
    download_path = os.path.join(DOWNLOADS_DIR, out_filename)

    if not force and os.path.exists(display_path) and os.path.exists(download_path):
        print(f"Skipping already processed: {out_filename}")
        return

    with Image.open(in_path) as img:
        img = img.convert('RGB')
        w, h = img.size

        # --- 1. DISPLAY VERSION WITH CLEAN WATERMARK ---
        display_img = img.copy()
        if w > 1600:
            new_h = int(h * (1600 / w))
            display_img = display_img.resize((1600, new_h), Image.Resampling.LANCZOS)
        
        dw_disp, dh_disp = display_img.size
        banner_h_disp = max(40, int(dh_disp * 0.045))
        overlay_disp = Image.new('RGBA', (dw_disp, dh_disp), (0, 0, 0, 0))
        draw_overlay_disp = ImageDraw.Draw(overlay_disp)

        for y in range(dh_disp - banner_h_disp, dh_disp):
            alpha = int(180 + 50 * ((y - (dh_disp - banner_h_disp)) / banner_h_disp))
            draw_overlay_disp.line([(0, y), (dw_disp, y)], fill=(6, 16, 28, alpha))

        display_img_rgba = display_img.convert('RGBA')
        display_img_rgba = Image.alpha_composite(display_img_rgba, overlay_disp)
        draw_disp = ImageDraw.Draw(display_img_rgba)

        font_size_disp = max(13, int(banner_h_disp * 0.42))
        try:
            font_disp = ImageFont.truetype(FONT_BOLD_PATH, font_size_disp)
        except Exception:
            font_disp = ImageFont.load_default()

        watermark_text = "© Dr. J.S. Yogesh Kumar"
        pad_x_disp = max(16, int(dw_disp * 0.018))
        
        try:
            bbox = font_disp.getbbox(watermark_text)
            th = bbox[3] - bbox[1]
        except Exception:
            th = font_size_disp

        top_y_disp = (dh_disp - banner_h_disp) + int((banner_h_disp - th) / 2) - 1

        draw_disp.text((pad_x_disp, top_y_disp), watermark_text, fill=(226, 186, 125, 240), font=font_disp)

        final_display_img = display_img_rgba.convert('RGB')
        final_display_img.save(display_path, 'WEBP', quality=85)

        # --- 2. DOWNLOAD VERSION WITH CLEAN WATERMARK ---
        download_img = img.copy()
        dw, dh = download_img.size

        banner_h = max(48, int(dh * 0.048))
        overlay = Image.new('RGBA', (dw, dh), (0, 0, 0, 0))
        draw_overlay = ImageDraw.Draw(overlay)

        for y in range(dh - banner_h, dh):
            alpha = int(210 + 45 * ((y - (dh - banner_h)) / banner_h))
            draw_overlay.line([(0, y), (dw, y)], fill=(6, 16, 28, alpha))

        download_img_rgba = download_img.convert('RGBA')
        download_img_rgba = Image.alpha_composite(download_img_rgba, overlay)
        draw = ImageDraw.Draw(download_img_rgba)

        font_size_dl = max(15, int(banner_h * 0.42))
        try:
            font_dl = ImageFont.truetype(FONT_BOLD_PATH, font_size_dl)
        except Exception:
            font_dl = ImageFont.load_default()

        pad_x_dl = max(20, int(dw * 0.018))
        try:
            bbox_dl = font_dl.getbbox(watermark_text)
            th_dl = bbox_dl[3] - bbox_dl[1]
        except Exception:
            th_dl = font_size_dl

        top_y_dl = (dh - banner_h) + int((banner_h - th_dl) / 2) - 1

        draw.text((pad_x_dl, top_y_dl), watermark_text, fill=(226, 186, 125, 255), font=font_dl)

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

    mollusca_files = get_mollusca_raw_files()
    print(f"Ingesting {len(mollusca_files)} raw mollusca photos...")
    for idx, filepath in enumerate(mollusca_files):
        num = idx + 1
        num_str = f"{num:03d}"
        specimen_id = f"mollusc-{num_str}"
        out_filename = f"mollusca_{num_str}.webp"
        tmpl = MOLLUSCA_TEMPLATES[idx % len(MOLLUSCA_TEMPLATES)]
        process_specimen(filepath, out_filename, specimen_id, tmpl['botanicalName'], tmpl['family'], tmpl['category'])

    print("Batch pre-processing pipeline completed successfully!")

if __name__ == '__main__':
    main()
