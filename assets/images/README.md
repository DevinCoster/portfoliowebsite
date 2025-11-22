<!--
README for images folder.
-->
# Images folder guide

- Structure:
  - assets/images/originals/        -> keep master/original files (lossless, high-res)
  - assets/images/optimized/        -> production-ready images (webp/avif/jpg/png)
  - assets/images/gifs/             -> small gifs or placeholders (use sparingly)
  - assets/images/video-fallbacks/  -> mp4/webm versions of animated content

- Naming:
  - kebab-case, include size or intent: hero-1920.jpg, avatar-128.png, logo.svg
  - add @2x or -2x only if not using srcset (prefer responsive srcset instead)

- Formats:
  - Static: avif -> webp -> jpeg/png (fallback order)
  - Animated: prefer mp4/webm for long animations; use gif only for tiny short loops

- Best practices:
  - Export several widths (e.g. 320, 640, 1024, 1600) and serve with srcset/sizes
  - Add width and height attributes or use CSS aspect-ratio to prevent layout shift
  - Lazy-load offscreen images: <img loading="lazy" ...>
  - Keep originals in "originals" and only check-in optimized versions to reduce repo size
  - Document large files and consider storing very large assets in a CDN or cloud bucket

- Example folder layout:
  - assets/images/
    - originals/
    - optimized/
    - gifs/
    - video-fallbacks/

