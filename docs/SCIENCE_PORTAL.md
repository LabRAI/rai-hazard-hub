# Super Intelligence for Research Hub at FSU

An additional version of the RAI portal, implemented on 2026-10-22.

## Pages and boundaries

- `/science/`: News and Trending Product, followed by Hazard and Health
  Intelligence Hubs. News leads to Research Notes; RAI FireEye is the featured
  product. The `#research-hubs` anchor targets the domain sections, not News.
- Each intelligence hub has a wide research-film area followed by resources;
  Research Notes is always the first resource.
- `/science/team/`: automatically generated lab directory.
- `/science/team/<slug>/`: automatically generated personal profile.
- `/science/research-notes/`: the approved articles with the science header/footer.
- The original `/` and `/research-notes/` presentation, visitor-map behavior,
  FireEye backend, assistant model, and PyHazards site remain unchanged. The
  shared Research Notes component only gains an optional navigation variant.
- Header navigation is Research Hubs / Our Team / About RAI.
- The preview is intentionally `noindex,follow`. Remove that directive only
  after approving the new site and its content for indexing.

The Health platform URL and both videos have not been supplied. Their config
values remain `null`. No fake destinations, example films, or inert play buttons
are shown. EpiGraph is an actual public research project, not a substitute URL
for the unconfirmed Health platform. Health Research Notes are explicitly pending.

## Homepage editorial content

Edit `news` in `src/lib/science/content.ts` to update the homepage stories.
Keep entries newest first and link each one to a real article. The initial two
stories summarize the existing June and May 2026 papers; the dates are paper
dates, not invented publication announcements.

Trending Product currently features RAI FireEye. It is an editorial selection,
not an analytics-based ranking; no traffic or popularity figures are claimed.

## Add or remove team members

Create a folder using lowercase ASCII first-name-last-name:

```text
src/content/team/yuyang-dai/
  profile.json
  photo.webp
```

`photo.webp` is optional; `photo.jpg`, `photo.jpeg`, and `photo.png` also work.
Keep exactly one photo. A reasonably tight head-and-shoulders portrait around
600 x 700 px works well. The website imports the photo locally, optimizes cache
names through Vite, and matches it to the profile in the same folder. Missing
photos use initials, never an invented person or a broken image.

Minimal `profile.json`:

```json
{
  "name": "Yuyang Dai",
  "role": "PhD student · Computer Science",
  "order": 60,
  "website": "https://yuyang0915.github.io/",
  "source": "https://yushundong.github.io/students/",
  "active": true
}
```

Optional `bio` is plain text. Lower `order` appears earlier; equal values are
sorted by name. The directory and personal page require no component changes.
Set `active` to `false` to hide the member, or delete their entire folder.
Commit and push to rebuild GitHub Pages; adding a file on the server alone does
not update the published static site. There is no server-side upload endpoint
and no execution of member-supplied HTML.
All content files are public build inputs. `active: false` controls display; it
is not access control. Do not put private member information in this directory.

The initial nine profiles are transcribed from the lab's public member list,
accessed on 2026-10-22. Roles and personal links are not inferred from paper
authorship. Photos are intentionally absent until supplied by the lab.

## Add YouTube films

Edit `src/content/science/hubs.json` and set `youtubeUrl` on the relevant hub
to its actual HTTPS YouTube link. Normal `watch?v=`, `youtu.be`, `shorts`,
`live`, and `embed` URLs work. `null` keeps the research poster and the honest
"Film forthcoming" state. Video IDs and origins are validated.

The iframe uses `youtube-nocookie.com` and is created only after a click. There
is no remote thumbnail request and no automatic video playback on page load.
The close button removes the iframe and returns focus to the play button.

## Connect Health and extend the hubs

Set Health's `platformUrl` and its Health Platform product's `href` to the
verified destination. Set the first Health product's `href` only after real
notes exist; do not link it to the unrelated wildfire notes. Update the
associated action labels at the same time.

The hub data lives in `src/content/science/hubs.json`. The main sections are
rendered from this array, in order. New domains use the same film/resource
layout. Supply their poster in `posters` in `src/lib/science/content.ts`;
product artwork keys are defined in `art`. Keep Research Notes first.

## Design basis and sources

- FSU web style guide: https://brand.fsu.edu/web
- Downloaded official template: https://brand.fsu.edu/sites/g/files/upcbnu4656/files/brand/webstyle-code/strata-3.3.15.zip
- Original source HTML is archived under `docs/reference/fsu-strata-3.3.15/`.
- Original FSU wordmark files are preserved under `static/brand/fsu/`.
- The official guide specifies the 175-year variation through December 31, 2026.
  `ScienceHeader` chooses that lockup in 2026 and the regular lockup otherwise.
- Garnet utility bar, official mark, university menu, separate masthead/site
  navigation, wide content strata, and university footer content follow the
  downloaded template. They are adapted into scoped Svelte components, without
  introducing legacy jQuery, Bootstrap globals, tracking scripts, or a new CMS.
- This is a lab prototype based on the official template, not a claim of FSU
  compliance certification. Institutional sign-off remains a publishing decision.
- Lab identity and membership: https://yushundong.github.io/students/
- Lab organization: https://github.com/LabRAI
- Public Health research: https://labrai.github.io/EpiGraph/
- Original portal image provenance remains in the editorial-v4/v5 SOURCES files.
- Brain photograph: https://images.unsplash.com/photo-1559757148-5c350d0d3c56
  Used under the Unsplash license, https://unsplash.com/license; resized to
  local 480/960/1800 px WebP assets. It depicts an anatomical model, not a
  screenshot of the unreleased Health platform.

## Checks and publication

```sh
npm run check
npm run test:science
BASE_PATH=/rai-hazard-hub npm run build
```

`npm run build` first validates hub data, profile fields, URL formats, duplicate
names, portrait filenames, and Research Notes ordering. The Pages workflow also
runs type checks and content tests before uploading.

For a separate local preview:

```sh
npm run dev -- --port 5180 --strictPort
```

Open `http://localhost:5180/science/`; forward port 5180 in a remote workspace.
The Pages preview path is `https://labrai.github.io/rai-hazard-hub/science/`.

## Rollback

Baseline tag: `hub-before-science-portal-2026-10-22` at `aebd1bb`.
The science preview before the News/Trending revision is also preserved as
`science-before-news-trending-c0aab89` at `c0aab89`.
The original site is preserved in place, so visitors can continue using it.
Reverting the science-portal commit removes the added version; do not reset
unrelated later work or alter the separately hosted FireEye server.

## Naming-policy scope

This change only adds static portal content and build validation. No model,
tokenizer, inference service, or runtime dependency is changed. Source and
build-output checks cover this repo's new text files; they do not constitute a
server-wide policy audit. Existing residuals documented in the lab policy are
outside this change.

## Verification record (2026-10-22)

- Svelte/TypeScript: zero errors and zero warnings.
- Content tests: six passing tests for videos, destinations, profile metadata,
  photo naming, hub order, and checked-in content.
- Production build: passes with the real `/rai-hazard-hub` base path.
- Chromium: 320, 390, 700, 820, 1024, 1440, and 1920 px viewports pass with no horizontal
  overflow, missing images, overlapping film labels, or browser runtime errors.
- Verified the team directory, all nine profile routes, the original routes,
  and the new Research Notes route; Research Notes is first in both hub rows.
- Video behavior tested with an isolated intercepted fixture: no iframe before
  a click, privacy-origin iframe on play, removal on close, and focus restoration.
  No test video URL is stored in production content.
- Axe checks for WCAG 2 A/AA and 2.1 AA report no violations on the new portal,
  team, and Research Notes pages at 1440 and 390 px. Automated checks are not
  a claim of full accessibility certification.
- Naming check: 112 source/documentation/build text files scanned, no matches.
- Review screenshots are saved in `/home/shared/Hub_page/science-preview-2026-10-22/`.

### News / Trending Product revision

- The visible heading, page metadata, and home-link accessible label use
  **Super Intelligence for Research Hub at FSU**.
- Desktop News contains two illustrated stories; Trending Product features
  FireEye. The artwork aligns across the row and preserves the full images.
- Story links target the corresponding Research Notes articles. Research Hubs
  navigation targets the lower Hazard and Health sections.
- The original Hazard homepage, notes content, team data, and hub product order
  are unchanged.
- Browser checks cover the official title, dates, news anchors, FireEye link,
  navigation, responsive image alignment, and existing profile routes. Axe
  checks cover the revised homepage at 1440 and 390 px.
