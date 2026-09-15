# Portal Images with Shared Labels

Prepared September 15, 2026 from the existing approved illustrations. No new
image generation was used for this change. All three homepage images now share
a 34px charcoal label strip rendered as webpage text:

- Research notes
- FireEye / Wildfire forecast
- import pyhazards

The labels remain sharp at different screen sizes and stay fixed when the
artwork zooms on hover. The Python label retains monospace text and a blue
`import` keyword; the FireEye label retains the red slash.

## Image Preparation

| Asset              | Original source                                                 | Preparation                                                                                          |
| ------------------ | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Research Notes     | `../editorial-v4/research-notes-*.webp`                         | Existing files reused without editing                                                                |
| `fireeye-*.webp`   | `/home/shared/Hub_page/fireeye-forecast-v5/fireeye-refined.png` | Remove the upper 84px containing the generated title strip; keep the map and forecast timeline       |
| `pyhazards-*.webp` | `/home/shared/Hub_page/editorial-v4/pyhazards.png`              | Remove the upper 156px containing the generated code strip and small tabs; retain the hazard imagery |

The two cropped source regions measure 1536 x 940 and 1536 x 868 respectively.
Each is resized to widths 480, 960, and 1536 and encoded as WebP at quality 86.
Color and content are otherwise unchanged. The complete portal frame, including
the common label, keeps a 4:3 desktop and 3:2 mobile ratio. Artwork fills the
remaining space with `object-fit: cover`. PyHazards now uses a centered crop
because its code label is independent of the image; this keeps the storm center
visible on desktop. FireEye anchors its artwork to the bottom so its forecast
timeline remains fully visible in the shallower mobile frame.

Original generation provenance and exact prompts remain in
[`../editorial-v4/SOURCES.md`](../editorial-v4/SOURCES.md) and
[`../editorial-v5/SOURCES.md`](../editorial-v5/SOURCES.md). The images are
editorial illustrations, not application screenshots or real forecast results.

The complete previous published website is saved at Git tag
`hub-before-unified-image-labels-2026-09-15`, commit `f3e001d`. All original image
files remain in their versioned directories for rollback. Local comparison
screenshots and browser checks are saved under
`/home/shared/Hub_page/unified-labels-2026-09-15/`.
