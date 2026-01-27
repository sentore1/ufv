import shutil
import os

source = r"E:\UFV"
dest = r"e:\uvf\public"

for file in os.listdir(source):
    if file.endswith(('.jpg', '.webp', '.mp4')):
        shutil.copy2(os.path.join(source, file), os.path.join(dest, file))
        print(f"Copied: {file}")