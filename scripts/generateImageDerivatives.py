import os
import sys
from PIL import Image

def process_directory(source_dir, thumb_dir, med_dir, thumb_width=720, med_width=1440):
    os.makedirs(thumb_dir, exist_ok=True)
    os.makedirs(med_dir, exist_ok=True)
    
    files = [f for f in os.listdir(source_dir) if f.lower().endswith(('.webp', '.jpg', '.jpeg', '.png'))]
    print(f"Processing {len(files)} files in {source_dir}...")

    for filename in files:
        src_path = os.path.join(source_dir, filename)
        thumb_path = os.path.join(thumb_dir, filename)
        med_path = os.path.join(med_dir, filename)

        try:
            with Image.open(src_path) as img:
                orig_w, orig_h = img.size

                # Generate Thumbnail if not exists or if source is newer
                if not os.path.exists(thumb_path):
                    if orig_w > thumb_width:
                        thumb_h = int(orig_h * (thumb_width / orig_w))
                        thumb_img = img.resize((thumb_width, thumb_h), Image.Resampling.LANCZOS)
                        thumb_img.save(thumb_path, 'WEBP', quality=82, method=4)
                    else:
                        img.save(thumb_path, 'WEBP', quality=82)

                # Generate Medium if not exists or if source is newer
                if not os.path.exists(med_path):
                    if orig_w > med_width:
                        med_h = int(orig_h * (med_width / orig_w))
                        med_img = img.resize((med_width, med_h), Image.Resampling.LANCZOS)
                        med_img.save(med_path, 'WEBP', quality=85, method=4)
                    else:
                        img.save(med_path, 'WEBP', quality=85)

        except Exception as e:
            print(f"Error processing {filename}: {e}", file=sys.stderr)

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # 1. Scuba / Images_gallery
    scuba_src = os.path.join(base_dir, 'public', 'Images_gallery')
    scuba_thumb = os.path.join(base_dir, 'public', 'thumbnails', 'Images_gallery')
    scuba_med = os.path.join(base_dir, 'public', 'medium', 'Images_gallery')
    if os.path.exists(scuba_src):
        process_directory(scuba_src, scuba_thumb, scuba_med, thumb_width=720, med_width=1440)

    # 2. Newspapers
    news_src = os.path.join(base_dir, 'public', 'newspapers')
    news_thumb = os.path.join(base_dir, 'public', 'thumbnails', 'newspapers')
    news_med = os.path.join(base_dir, 'public', 'medium', 'newspapers')
    if os.path.exists(news_src):
        process_directory(news_src, news_thumb, news_med, thumb_width=640, med_width=1400)

    print("Image derivative generation complete!")
