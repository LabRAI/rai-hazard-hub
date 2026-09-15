# RAI Hazard Intelligence Hub

Static site for the LabRAI org.

Live URL:

`https://labrai.github.io/rai-hazard-hub/`

- `/` portal
- `/research-notes/` research notes
- `/hipergator-rai-resources/` RAI Lab HiPerGator access guide

## Local dev

```bash
npm install
npm run dev -- --port 5175
```

Open `http://localhost:5175/`. When using a remote workspace, forward port 5175.

## Design and imagery

The portal uses three coordinated editorial illustrations with close framing:
a publication for Research Notes, a forecast map for FireEye, and Python data
modules for PyHazards. Titles sit below the artwork. Research Notes presents the
two studies with expandable illustrations.
The homepage and Research Notes share a 1360px maximum content width. The homepage
uses 4:3 image frames on desktop and 3:2 frames on mobile, with individual crop
positions to preserve each subject. All three frames have equal-height charcoal
labels rendered as webpage text; the embedded title strips are removed from
the FireEye and PyHazards image derivatives. Research Notes pairs serif article
titles with Inter body text, a study overview beside the introduction, and a
supporting illustration beside the key findings. Tablet and mobile layouts
rearrange these elements for reading, and all four figures open in accessible
dialogs with their study names and captions.
The shared header and footer live in `src/lib/components/SiteHeader.svelte` and
`src/lib/components/SiteFooter.svelte`.

The shared-label image preparation and rollback point are documented in
[`src/lib/assets/portal/unified-labels/SOURCES.md`](src/lib/assets/portal/unified-labels/SOURCES.md).
The FireEye illustration uses geographic probability cells and 12/24/36/48-hour
timeline cues based on the actual platform.
Its provenance and exact generation prompt are documented in
[`src/lib/assets/portal/editorial-v5/SOURCES.md`](src/lib/assets/portal/editorial-v5/SOURCES.md).
Research Notes and PyHazards portal image sources are documented in
[`src/lib/assets/portal/editorial-v4/SOURCES.md`](src/lib/assets/portal/editorial-v4/SOURCES.md).
Research illustrations and archived photographs are documented in
[`src/lib/assets/editorial/SOURCES.md`](src/lib/assets/editorial/SOURCES.md).
Original uploaded images remain in `src/lib/assets/portal/` and
`src/lib/assets/researchNotes/`. Inter is served locally with its font license.

Run `npm run check` and `npm run build` before publishing. For a local check of
GitHub Pages paths, use `BASE_PATH=/rai-hazard-hub npm run build`.

## Deployment

This repo is meant for GitHub Pages.
The GitHub Pages project path is `https://labrai.github.io/rai-hazard-hub/`.

## Optional page-view API

Set `VITE_PAGE_VIEW_API_BASE` to enable the visitor map on the portal.

## Split of responsibilities

### This repo

- Static pages and content
- Research Notes page
- Portal navigation
- GitHub Pages deployment

### Server-side services

- FireEye / wildfire risk map
- Page-view tracking and geocoded visitor summaries
- Any backend that needs raw request IPs

These services run outside GitHub Pages because they require server-side processing. The
static site should never expose raw IP addresses.
