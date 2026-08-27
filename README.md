# RAI Hazard Intelligence Hub

Static site for the LabRAI org.

Live URL:

`https://labrai.github.io/rai-hazard-hub/`

- `/` portal
- `/research-notes/` paper notes

## Local dev

```bash
npm install
npm run dev
```

## Deployment

This repo is meant for GitHub Pages.
The GitHub Pages project path is `https://labrai.github.io/rai-hazard-hub/`.

## Optional page-view API

Set `VITE_PAGE_VIEW_API_BASE` to enable the visitor map on the portal.

## Split of responsibilities

### This repo

- Static pages and content
- Research Notes blog
- Portal navigation
- GitHub Pages deployment

### Self-hosted server

- FireEye / wildfire risk map
- Page-view tracking and geocoded visitor summaries
- Any backend that needs raw request IPs

The static site should never expose raw IP addresses.
