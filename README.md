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
a publication for Research Notes, geographic layers for FireEye, and Python data
modules for PyHazards. Titles sit below the artwork. Research Notes presents the
two studies with expandable illustrations.
The shared header and footer live in `src/lib/components/SiteHeader.svelte` and
`src/lib/components/SiteFooter.svelte`.

Portal image provenance and generation prompts are documented in
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
