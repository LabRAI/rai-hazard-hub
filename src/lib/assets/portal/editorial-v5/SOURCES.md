# FireEye Forecast Illustration

Created September 15, 2026 through the user-selected
[GPT Image Playground](https://image.suqis.com/). This is newly generated
editorial artwork, not a screenshot, published forecast, or observed incident.
The geographic features and risk cells are illustrative.

The composition follows a browser review of [RAI FireEye](https://rai-fire.com/):
the national FireWx-FM risk map, 12/24/36/48-hour forecast controls, environmental
overlays, and geographic zoom. Forecast probability cells replace the previous
burning landscape, and the title and timeline identify the destination as an
interactive forecasting platform. A western U.S. map is used as an illustrative
regional view; the real platform covers the contiguous United States.

The existing PyHazards artwork was supplied only as a reference for its natural
terrain texture, close framing, and restrained charcoal title strip. Research
Notes and PyHazards retain their `editorial-v4` images.
After checking the first generation at the actual portal size, a second image
edit enlarged only the title and timeline cues. The selected source is
`fireeye-refined.png`; the first generation is also retained for comparison.

## Files

- `fireeye-forecast-{480,960,1536}.webp`: responsive full-image derivatives,
  WebP quality 86, preserving the entire 3:2 source composition.
- `fireeye-forecast.prompt.txt`: exact submitted prompt, including the
  reference-image instruction.
- `fireeye-forecast.generation.json`: non-secret generation response metadata.
- `fireeye-forecast-refinement.prompt.txt`: exact typography-refinement prompt.
- `fireeye-forecast-refinement.generation.json`: final image response metadata.

The site uses a centered 4:3 crop on desktop and the full 3:2 image on mobile.
The generated title and all four timeline labels are inside both crops.
No screenshot or additional HTML text is composited into the artwork.

The selected model was `gpt-image-2`, requested at 1536 x 1024 and high quality.
The provider's model catalog identified its owner as OpenAI; the generation
response identified the model as `gpt-image-2-codex`. This records the provider's
metadata, not an independent audit of its upstream infrastructure. Only that
explicitly selected image model was allowed; no local inference or alternative
model fallback was used. API credentials are excluded from project artifacts.

Original PNG, platform screenshots, research notes, and generation files:
`/home/shared/Hub_page/fireeye-forecast-v5/`.

## Rollback

The full previously published website, including Research Notes, is preserved
at the remote tag `hub-before-fireeye-forecast-art-2026-09-15` (commit `52c4c88`).
The earlier image files remain intact in `../editorial-v4/`.
A complete archive of the tracked site is also retained at
`/home/shared/Hub_page/hub-before-fireeye-forecast-art-2026-09-15.tar.gz`.
