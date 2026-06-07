Place source portfolio images in this folder structure.

Supported source formats:
- `.heic`
- `.heif`
- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.avif`

Recommended category folders:
- `glam`
- `editorial&creative`
- `retro - pin up`
- `bridal`
- `soft glam`
- `mature skin`

How it works:
- Source images stay in this folder.
- Running `npm run convert:images` inside `frontend` converts `.heic` and `.heif` files to `.webp`.
- Browser-friendly files are written to `frontend/public/generated/images`.
- The portfolio reads from the generated manifest, not directly from this source folder.
