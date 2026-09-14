<script lang="ts">
  import {
    ArrowRightOutline,
    ArrowUpRightFromSquareOutline,
  } from "flowbite-svelte-icons";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import PageViewMap from "$lib/components/sidebar/pageViewMap.svelte";
  import terrain from "$lib/assets/editorial/terrain-1440.webp";
  import terrainSmall from "$lib/assets/editorial/terrain-480.webp";
  import terrainMedium from "$lib/assets/editorial/terrain-960.webp";
  import wildfire from "$lib/assets/editorial/wildfire-1440.webp";
  import wildfireSmall from "$lib/assets/editorial/wildfire-480.webp";
  import wildfireMedium from "$lib/assets/editorial/wildfire-960.webp";
  import hurricane from "$lib/assets/editorial/hurricane-1440.webp";
  import hurricaneSmall from "$lib/assets/editorial/hurricane-480.webp";
  import hurricaneMedium from "$lib/assets/editorial/hurricane-960.webp";
  import wildfireFmPreview from "$lib/assets/editorial/wildfire-fm-card.webp";
  import fireeyeInterface from "$lib/assets/editorial/fireeye-interface.webp";
  import pyhazardsDocs from "$lib/assets/editorial/pyhazards-docs.webp";
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
      image: terrain,
      small: terrainSmall,
      medium: terrainMedium,
      alt: "Forested valleys and granite peaks in Sequoia National Park, observed by Landsat 5.",
      color: "#356a57",
      kind: "research",
      preview: wildfireFmPreview,
      previewAlt:
        "Wildfire-FM paper figure with environmental inputs, a model backbone, and evaluation panels.",
      previewLabel: "Paper / figures",
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
      image: wildfire,
      small: wildfireSmall,
      medium: wildfireMedium,
      alt: "Smoke and infrared fire signatures from the 2018 Camp Fire, observed by Landsat 8.",
      color: "#ad4739",
      kind: "map",
      preview: fireeyeInterface,
      previewAlt:
        "RAI FireEye interface showing a wildfire risk map, layers, and forecast controls.",
      previewLabel: "Platform / map layers",
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
      image: hurricane,
      small: hurricaneSmall,
      medium: hurricaneMedium,
      alt: "The eye and spiral cloud bands of Hurricane Florence, photographed from the International Space Station in 2018.",
      color: "#326f89",
      kind: "library",
      preview: pyhazardsDocs,
      previewAlt:
        "PyHazards documentation interface showing a navigation sidebar and API content.",
      previewLabel: "Library / docs + API",
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
                  srcset={`${entry.small} 480w, ${entry.medium} 960w, ${entry.image} 1440w`}
                  sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1328px) calc((100vw - 128px) / 3), 400px"
                  alt={entry.alt}
                  width="1440"
                  height="960"
                  fetchpriority="high"
                />
                <div
                  class={`destination-preview destination-preview--${entry.kind}`}
                >
                  <img
                    src={entry.preview}
                    alt={entry.previewAlt}
                    loading="lazy"
                  />
                  <span class="preview-label">{entry.previewLabel}</span>
                </div>
                <span class="entry-number" aria-hidden="true"
                  >{entry.number}</span
                >
                <div class="image-heading">
                  <span>{entry.category}</span>
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
  .destination-preview {
    position: absolute;
    z-index: 2;
    top: 18px;
    right: 18px;
    left: 18px;
    height: 57%;
    overflow: hidden;
    border: 1px solid rgb(255 255 255 / 88%);
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 10px 24px rgb(9 22 18 / 22%);
  }
  .destination-preview > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top left;
  }
  .preview-label {
    position: absolute;
    top: 9px;
    right: 9px;
    border: 1px solid rgb(255 255 255 / 78%);
    border-radius: 3px;
    background: rgb(255 255 255 / 92%);
    padding: 5px 7px;
    color: #273330;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    box-shadow: 0 3px 8px rgb(18 30 26 / 12%);
  }
  .destination-preview--map .preview-label {
    color: #91372e;
  }
  .destination-preview--library .preview-label {
    color: #2c647c;
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
    right: 66px;
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
      right: 45px;
    }
    .image-arrow {
      right: 18px;
      width: 21px;
    }
    h2 {
      font-size: 23px;
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
