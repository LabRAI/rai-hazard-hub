<script lang="ts">
  import {
    ArrowRightOutline,
    ArrowUpRightFromSquareOutline,
  } from "flowbite-svelte-icons";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import PageViewMap from "$lib/components/sidebar/pageViewMap.svelte";
  import researchNotesImage from "$lib/assets/portal/research-notes.png";
  import fireeyeImage from "$lib/assets/portal/fireeye.png";
  import pyhazardsImage from "$lib/assets/portal/pyhazards.png";
  import { withBase } from "$lib/paths";

  const entries = [
    {
      number: "01",
      category: "The research",
      title: "Research Notes",
      description:
        "The questions, data, and findings behind our wildfire research.",
      href: withBase("/research-notes/"),
      action: "Explore the studies",
      external: false,
      image: researchNotesImage,
      alt: "A research notebook and wildfire analysis papers with maps, charts, and data visualizations.",
      color: "#356a57",
      kind: "research",
      cueLabel: "Papers / figures",
      cueDetail: "02 studies · notes",
    },
    {
      number: "02",
      category: "The platform",
      title: "RAI FireEye",
      description:
        "An interactive wildfire intelligence platform for observations, layers, and forecasts.",
      href: "https://rai-fire.com/",
      action: "Open FireEye",
      external: true,
      image: fireeyeImage,
      alt: "A stylized wildfire intelligence map with environmental layers, fire detections, and forecast controls.",
      color: "#ad4739",
      kind: "map",
      cueLabel: "Live map / layers",
      cueDetail: "Risk · fire · weather",
    },
    {
      number: "03",
      category: "The library",
      title: "PyHazards",
      description:
        "A Python library for open datasets, models, benchmarks, and hazard workflows.",
      href: "https://labrai.github.io/PyHazards/",
      action: "Explore the documentation",
      external: true,
      image: pyhazardsImage,
      alt: "A hazard library shield connected to wildfire, flood, earthquake, and tropical cyclone data modules.",
      color: "#326f89",
      kind: "library",
      cueLabel: "Library / docs + API",
      cueDetail: "Datasets · models",
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

<div class="hub-site">
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
                  alt={entry.alt}
                  width="1536"
                  height="1024"
                  fetchpriority="high"
                />
                <span class="entry-number" aria-hidden="true"
                  >{entry.number}</span
                >
                <div class="image-heading">
                  <span>{entry.category}</span>
                  <h2>{entry.title}</h2>
                  <div class={`destination-cue destination-cue--${entry.kind}`}>
                    <span class="cue-mark" aria-hidden="true"></span>
                    <span>{entry.cueLabel}</span>
                    <i aria-hidden="true"></i>
                    <small>{entry.cueDetail}</small>
                  </div>
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
        <p>Earth, observed. <span>Land, fire, and atmosphere.</span></p>
        <details class="image-credits">
          <summary>Image credits</summary>
          <div class="credit-list">
            <a
              href="https://images.nasa.gov/details/GSFC_20171208_Archive_e000235"
              >Sierra Nevada: NASA / Landsat 5, October 2008</a
            >
            <a
              href="https://science.nasa.gov/earth/earth-observatory/camp-fire-rages-in-california-144225/"
              >Camp Fire: NASA Earth Observatory / USGS, November 2018</a
            >
            <a href="https://images.nasa.gov/details/iss056e162187"
              >Hurricane Florence: NASA / ISS, September 2018</a
            >
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
    aspect-ratio: 1.13;
    isolation: isolate;
    overflow: hidden;
    border-radius: 5px;
    background: #e8edeb;
  }
  .destination-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 450ms ease;
  }
  .destination-image::after {
    position: absolute;
    inset: 64% 0 0;
    content: "";
    background: linear-gradient(transparent, rgb(13 23 20 / 78%));
    pointer-events: none;
    z-index: 1;
  }
  .destination-cue {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 13px;
    color: rgb(255 255 255 / 94%);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1.3;
    text-transform: uppercase;
  }
  .cue-mark {
    display: block;
    position: relative;
    width: 17px;
    height: 17px;
    flex: 0 0 auto;
    border: 1px solid rgb(255 255 255 / 72%);
    border-radius: 50%;
    background: rgb(255 255 255 / 10%);
  }
  .cue-mark::before,
  .cue-mark::after {
    position: absolute;
    content: "";
  }
  .destination-cue--research .cue-mark::before {
    inset: 4px 3px;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
  .destination-cue--research .cue-mark::after {
    top: 7px;
    right: 3px;
    left: 3px;
    border-top: 1px solid #fff;
  }
  .destination-cue--map .cue-mark::before {
    top: 4px;
    left: 4px;
    width: 7px;
    height: 7px;
    border: 1px solid #fff;
    border-radius: 50%;
  }
  .destination-cue--map .cue-mark::after {
    right: 3px;
    bottom: 4px;
    width: 6px;
    border-top: 1px solid #fff;
    transform: rotate(-45deg);
  }
  .destination-cue--library .cue-mark::before {
    inset: 4px 3px;
    border: 1px solid #fff;
    border-radius: 1px;
  }
  .destination-cue--library .cue-mark::after {
    top: 7px;
    right: 5px;
    left: 5px;
    border-top: 1px solid #fff;
  }
  .destination-cue small {
    color: rgb(255 255 255 / 68%);
    font-size: 9px;
    line-height: 1.25;
  }
  .destination-cue i {
    width: 22px;
    border-top: 1px solid rgb(255 255 255 / 48%);
  }
  .entry-number {
    position: absolute;
    z-index: 3;
    top: 20px;
    left: 24px;
    color: #fff;
    font-size: 12px;
    text-shadow: 0 1px 5px #000;
  }
  .image-heading {
    position: absolute;
    bottom: 26px;
    left: 26px;
    right: 42px;
    z-index: 3;
    color: #fff;
  }
  .image-heading > span {
    font-size: 11px;
    font-weight: 500;
    opacity: 0.87;
  }
  h2 {
    margin-top: 5px;
    font-size: 28px;
    font-weight: 600;
    line-height: 1.2;
  }
  .image-arrow {
    position: absolute;
    z-index: 3;
    right: 25px;
    bottom: 30px;
    width: 27px;
    height: 27px;
    color: #fff;
    transition: transform 180ms ease;
  }
  .destination-copy {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 19px 2px 0;
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
    justify-content: space-between;
    gap: 10px;
    border-top: 1px solid var(--line);
    margin-top: 28px;
    padding-block: 15px 22px;
    color: var(--muted);
    font-size: 10px;
  }
  .image-caption p {
    color: #4c5655;
  }
  .image-caption p span {
    margin-left: 8px;
    color: #737b79;
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
  .credit-list a:hover {
    color: var(--accent);
  }
  @media (max-width: 1100px) {
    .destination-grid {
      gap: 18px;
    }
    .destination-image {
      aspect-ratio: 0.95;
    }
    .image-heading {
      left: 20px;
      right: 34px;
    }
    .image-arrow {
      right: 18px;
      width: 21px;
    }
    h2 {
      font-size: 23px;
    }
    .destination-cue i {
      width: 12px;
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
    .destination-image {
      aspect-ratio: 1.6;
    }
    .image-heading {
      bottom: 21px;
      left: 23px;
    }
    h2 {
      font-size: 26px;
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
