<script lang="ts">
  import {
    ArrowRightOutline,
    ArrowUpRightFromSquareOutline,
  } from "flowbite-svelte-icons";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import PageViewMap from "$lib/components/sidebar/pageViewMap.svelte";
  import researchNotesImage from "$lib/assets/portal/editorial-v4/research-notes-1536.webp";
  import researchNotesSmall from "$lib/assets/portal/editorial-v4/research-notes-480.webp";
  import researchNotesMedium from "$lib/assets/portal/editorial-v4/research-notes-960.webp";
  import fireeyeImage from "$lib/assets/portal/editorial-v5/fireeye-forecast-1536.webp";
  import fireeyeSmall from "$lib/assets/portal/editorial-v5/fireeye-forecast-480.webp";
  import fireeyeMedium from "$lib/assets/portal/editorial-v5/fireeye-forecast-960.webp";
  import pyhazardsImage from "$lib/assets/portal/editorial-v4/pyhazards-1536.webp";
  import pyhazardsSmall from "$lib/assets/portal/editorial-v4/pyhazards-480.webp";
  import pyhazardsMedium from "$lib/assets/portal/editorial-v4/pyhazards-960.webp";
  import { withBase } from "$lib/paths";

  const entries = [
    {
      category: "Research articles",
      title: "Research Notes",
      description:
        "The questions, data, and findings behind our wildfire research.",
      href: withBase("/research-notes/"),
      action: "Explore the studies",
      external: false,
      image: researchNotesImage,
      small: researchNotesSmall,
      medium: researchNotesMedium,
      imagePosition: "70% center",
      alt: "A close view of an illustrated research journal, with wildfire imagery across one page and an article and map on the other.",
      color: "#356a57",
    },
    {
      category: "Interactive forecast map",
      title: "RAI FireEye",
      description:
        "Explore 12-48 hour wildfire risk forecasts alongside environmental data.",
      href: "https://rai-fire.com/",
      action: "Open FireEye",
      external: true,
      image: fireeyeImage,
      small: fireeyeSmall,
      medium: fireeyeMedium,
      imagePosition: "center",
      alt: "FireEye wildfire forecast map with colored risk cells over western U.S. terrain and a 12-to-48-hour forecast timeline.",
      color: "#ad4739",
    },
    {
      category: "Python library",
      title: "PyHazards",
      description:
        "A Python library for open datasets, models, benchmarks, and hazard workflows.",
      href: "https://labrai.github.io/PyHazards/",
      action: "Explore the documentation",
      external: true,
      image: pyhazardsImage,
      small: pyhazardsSmall,
      medium: pyhazardsMedium,
      imagePosition: "left center",
      alt: "The Python statement import pyhazards appears above closely joined wildfire, floodplain, and cyclone data imagery.",
      color: "#326f89",
    },
  ];
</script>

<svelte:head>
  <title>RAI Hazard Intelligence Hub</title>
  <meta
    name="description"
    content="Explore RAI wildfire research, the FireEye geospatial map, and open tools for hazard science."
  />
</svelte:head>

<div class="hub-site hub-home">
  <SiteHeader />
  <main id="main-content">
    <section class="portal-intro site-width" aria-labelledby="portal-title">
      <p class="eyebrow">Wildfire & multi-hazard research</p>
      <h1 id="portal-title">RAI Hazard Intelligence Hub</h1>
      <p class="intro-description">
        Research, maps, and open tools for understanding a changing environment.
      </p>
    </section>

    <section class="destinations site-width" aria-label="Explore RAI resources">
      <div class="destination-grid">
        {#each entries as entry}
          <article class="destination" style={`--entry-color: ${entry.color}`}>
            <a class="destination-link" href={entry.href}>
              <div class="destination-image">
                <img
                  src={entry.image}
                  srcset={`${entry.small} 480w, ${entry.medium} 960w, ${entry.image} 1536w`}
                  sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) calc((100vw - 116px) / 3), (max-width: 1440px) calc((100vw - 128px) / 3), 438px"
                  style:object-position={entry.imagePosition}
                  alt={entry.alt}
                  width="1536"
                  height="1024"
                  fetchpriority="high"
                />
              </div>
              <div class="image-heading">
                <div>
                  <span class="image-category">{entry.category}</span>
                  <h2>{entry.title}</h2>
                </div>
                <span class="image-arrow" aria-hidden="true"
                  ><ArrowRightOutline /></span
                >
              </div>
              <div class="destination-copy">
                <p>{entry.description}</p>
                <span class="destination-action">
                  {entry.action}
                  {#if entry.external}<ArrowUpRightFromSquareOutline
                      class="small-icon"
                    />{:else}<ArrowRightOutline class="small-icon" />{/if}
                </span>
              </div>
            </a>
          </article>
        {/each}
      </div>
      <div class="image-caption">
        <details class="image-credits">
          <summary>Image credits</summary>
          <div class="credit-list">
            <p>AI-generated editorial illustrations for RAI Lab.</p>
            <p>Map details are illustrative.</p>
          </div>
        </details>
      </div>
    </section>
  </main>
  <SiteFooter>
    {#snippet audience()}<PageViewMap variant="hub" />{/snippet}
  </SiteFooter>
</div>

<style>
  .hub-home {
    --site-max-width: 1360px;
  }
  .portal-intro {
    padding-block: 42px 34px;
    text-align: center;
  }
  .portal-intro .eyebrow {
    color: var(--accent);
    margin-bottom: 10px;
  }
  h1 {
    font-size: 42px;
    line-height: 1.22;
    font-weight: 600;
    text-wrap: balance;
  }
  .intro-description {
    margin-top: 14px;
    color: var(--muted);
    font-size: 15px;
    white-space: nowrap;
  }
  .destination-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
  .destination {
    min-width: 0;
  }
  .destination-link {
    display: flex;
    height: 100%;
    flex-direction: column;
    color: var(--ink);
  }
  .destination-image {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border-radius: 5px;
    background: var(--wash);
  }
  .destination-image img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    transition: transform 450ms ease;
  }
  .image-heading {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    padding-top: 12px;
    color: var(--ink);
  }
  .image-category {
    font-size: 11px;
    font-weight: 500;
    color: #556661;
  }
  h2 {
    margin-top: 5px;
    font-size: 28px;
    font-weight: 600;
    line-height: 1.2;
  }
  .image-arrow {
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
    color: var(--entry-color);
    transition: transform 180ms ease;
  }
  .destination-copy {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 12px 0 0;
  }
  .destination-copy p {
    flex: 1;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.7;
    max-width: 355px;
  }
  .destination-action {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    color: var(--entry-color);
    font-size: 12px;
    font-weight: 600;
  }
  .destination-action :global(svg) {
    width: 13px;
    height: 13px;
  }
  .destination-link:hover img {
    transform: scale(1.025);
  }
  .destination-link:hover .image-arrow {
    transform: translateX(4px);
  }
  .destination-link:hover .destination-action {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .image-caption {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: flex-end;
    gap: 10px;
    border-top: 1px solid var(--line);
    margin-top: 28px;
    padding-block: 12px 18px;
    color: var(--muted);
    font-size: 10px;
  }
  .image-credits {
    text-align: right;
  }
  .image-credits summary {
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .credit-list {
    display: grid;
    gap: 4px;
    padding-top: 8px;
  }
  @media (max-width: 1100px) {
    .destination-grid {
      gap: 18px;
    }
    .image-arrow {
      display: none;
    }
    h2 {
      font-size: 20px;
    }
    h1 {
      font-size: 36px;
    }
    .destination-copy p {
      font-size: 13px;
    }
  }
  @media (max-width: 760px) {
    .intro-description {
      white-space: normal;
      text-wrap: balance;
    }
    h1 {
      font-size: 31px;
    }
  }
  @media (max-width: 700px) {
    .destination-image img {
      aspect-ratio: 3 / 2;
    }
    .portal-intro {
      padding-block: 30px 28px;
    }
    h1 {
      max-width: 440px;
      margin-inline: auto;
      font-size: 30px;
    }
    .intro-description {
      font-size: 14px;
      margin-top: 13px;
    }
    .destination-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    .image-arrow {
      display: block;
      width: 22px;
      height: 22px;
    }
    h2 {
      font-size: 24px;
    }
    .destination-copy {
      padding-top: 13px;
    }
    .destination-copy p {
      max-width: none;
      font-size: 14px;
    }
    .destination-action {
      margin-top: 8px;
    }
    .image-caption {
      padding-bottom: 18px;
    }
  }
</style>
