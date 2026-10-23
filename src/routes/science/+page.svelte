<script lang="ts">
  import {
    ArrowRightOutline,
    ArrowUpRightFromSquareOutline,
  } from "flowbite-svelte-icons";
  import ScienceHeader from "$lib/components/science/ScienceHeader.svelte";
  import ScienceFooter from "$lib/components/science/ScienceFooter.svelte";
  import HubFilm from "$lib/components/science/HubFilm.svelte";
  import ProductCard from "$lib/components/science/ProductCard.svelte";
  import {
    art,
    hubs,
    posters,
    scienceTitle,
    scienceDescription,
  } from "$lib/science/content";
  import { withBase } from "$lib/paths";
  const doors = [
    {
      title: "Research Notes",
      category: "Ideas & discoveries",
      description:
        "A closer look at the questions, evidence, and people behind the research.",
      href: withBase("/science/research-notes/"),
      action: "Read the research",
      image: art.notes,
    },
    {
      title: "Hazard Intelligence Hub",
      category: "AI for the environment",
      description:
        "Forecasting wildfire risk. Understanding hazards. Building resilience.",
      href: "#hazard",
      action: "Explore the hub",
      image: art.fireeye,
    },
    {
      title: "Health Intelligence Hub",
      category: "AI for human health",
      description:
        "Connecting clinical evidence and AI to advance health research.",
      href: "#health",
      action: "Explore the research",
      image: art.health,
    },
  ];
</script>

<svelte:head>
  <title>{scienceTitle} | RAI Lab</title>
  <meta name="description" content={scienceDescription} />
  <meta property="og:title" content={scienceTitle} />
  <meta property="og:description" content={scienceDescription} />
  <meta name="robots" content="noindex,follow" />
</svelte:head>

<ScienceHeader />
<main id="main-content">
  <section class="science-width masthead" aria-labelledby="science-title">
    <p class="section-kicker">Responsible AI Lab · Florida State University</p>
    <h1 id="science-title" class="editorial-title">
      Super Intelligence<br /><span>for Science Research Hub</span>
    </h1>
    <p class="masthead-description">
      Research, platforms, and open tools for a world of scientific questions.
    </p>
  </section>

  <section
    id="research-hubs"
    class="science-width doorway-section"
    aria-label="Explore research notes and intelligence hubs"
  >
    <div class="doorway-grid">
      {#each doors as door, index}
        <article class="doorway">
          <a href={door.href}>
            <div class="doorway-art">
              <img
                src={door.image.src}
                srcset={door.image.srcset}
                sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1400px) calc((100vw - 128px) / 3), 424px"
                alt={door.image.alt}
                style:object-position={door.image.position}
                width="1536"
                height="1024"
                fetchpriority={index === 0 ? "high" : "auto"}
              />
            </div>
            <div class="doorway-copy">
              <p class="section-kicker">{door.category}</p>
              <h2 class="editorial-title">{door.title}</h2>
              <p class="doorway-description">{door.description}</p>
              <span class="doorway-action"
                >{door.action}<ArrowRightOutline /></span
              >
            </div>
          </a>
        </article>
      {/each}
    </div>
    <div class="directory-caption">
      <span>From research questions to usable tools.</span><span
        >Explore our intelligence hubs <span aria-hidden="true">↓</span></span
      >
    </div>
  </section>

  {#each hubs as hub, index}
    <section
      id={hub.id}
      class="hub-section"
      class:health-section={hub.id === "health"}
      aria-labelledby={`${hub.id}-title`}
    >
      <div class="science-width">
        <div class="hub-divider">
          <span class="hub-index">{String(index + 1).padStart(2, "0")}</span>
          <p class="section-kicker">{hub.eyebrow}</p>
          <span class="divider-line"></span>
        </div>
        <div class="hub-heading">
          <div>
            <h2 id={`${hub.id}-title`} class="editorial-title">{hub.name}</h2>
            <p>{hub.description}</p>
          </div>
          {#if hub.platformUrl}<a
              class="editorial-link"
              href={withBase(hub.platformUrl)}
              >Open {hub.name.replace(" Intelligence", "")}
              <ArrowRightOutline /></a
            >{:else}<span class="hub-status">Platform details forthcoming</span
            >{/if}
        </div>
        <HubFilm
          title={hub.filmTitle}
          description={hub.filmDescription}
          youtubeUrl={hub.youtubeUrl}
          poster={posters[hub.id]}
          theme={hub.id}
        />
        <div class="product-heading">
          <p class="section-kicker">Research & resources</p>
          <span
            >{hub.id === "health"
              ? "Explore the work behind the hub"
              : "Read. Explore. Build."}</span
          >
        </div>
        <div class="product-grid">
          {#each hub.products as product}<ProductCard {product} />{/each}
        </div>
      </div>
    </section>
  {/each}

  <section
    id="about"
    class="science-width about-section"
    aria-labelledby="about-title"
  >
    <div>
      <p class="section-kicker">About RAI</p>
      <h2 id="about-title" class="editorial-title">
        Responsible AI.<br />Scientific discovery.
      </h2>
    </div>
    <div class="about-copy">
      <p>
        We are the Responsible AI Lab at Florida State University. Our work
        brings trustworthy AI methods into scientific research, connecting
        evidence, models, and tools across disciplines.
      </p>
      <p>
        From environmental hazards to human health, these hubs bring our
        research together and make it easier to explore.
      </p>
      <div class="about-links">
        <a class="editorial-link" href={withBase("/science/team/")}
          >Meet our team <ArrowRightOutline /></a
        ><a class="editorial-link" href="https://github.com/LabRAI"
          >Explore our work <ArrowUpRightFromSquareOutline /></a
        >
      </div>
    </div>
  </section>
  <div class="science-width credits">
    <details>
      <summary>Image credits</summary>
      <p>
        Research Notes, FireEye, and PyHazards: AI-generated editorial
        illustrations for RAI Lab. Forecast details are illustrative. Health:
        anatomical brain model photograph from Unsplash. The wildfire photograph
        is from the existing Hazard Hub collection.
      </p>
    </details>
  </div>
</main>
<ScienceFooter />

<style>
  .masthead {
    text-align: center;
    padding-block: 38px 34px;
  }
  h1 {
    font-size: 52px;
    line-height: 1.1;
    margin-block: 13px 16px !important;
  }
  h1 span {
    color: #782f40;
  }
  .masthead-description {
    font-size: 14px;
    color: var(--muted);
  }
  .doorway-grid,
  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 26px;
  }
  .doorway {
    min-width: 0;
  }
  .doorway a {
    color: var(--ink);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .doorway-art {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #edf0ed;
  }
  .doorway-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }
  .doorway a:hover img {
    transform: scale(1.025);
  }
  .doorway-copy {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 20px;
  }
  .doorway h2 {
    font-size: 28px;
    line-height: 1.25;
    margin-block: 6px 10px !important;
  }
  .doorway-description {
    color: var(--muted);
    font-size: 13px;
    line-height: 1.7;
    max-width: 370px;
  }
  .doorway-action {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: 17px;
    margin-top: auto;
    font-size: 12px;
    font-weight: 600;
  }
  .doorway-action :global(svg) {
    width: 17px;
    height: 17px;
  }
  .doorway a:hover .doorway-action {
    color: #782f40;
  }
  .directory-caption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-top: 27px;
    padding-block: 17px;
    border-top: 1px solid var(--line);
    font-size: 11px;
    color: var(--muted);
  }
  .directory-caption span span {
    margin-left: 10px;
  }
  .hub-section {
    padding-block: 35px 46px;
  }
  .health-section {
    background: #f2f5f3;
    border-block: 1px solid var(--line);
  }
  .hub-divider {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
  }
  .hub-index {
    font:
      17px/1 Georgia,
      serif;
    color: #782f40;
  }
  .divider-line {
    height: 1px;
    background: #cdd5cf;
    flex: 1;
    margin-left: 14px;
  }
  .hub-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    margin-bottom: 25px;
  }
  .hub-heading h2 {
    font-size: 40px;
    line-height: 1.2;
  }
  .hub-heading p {
    font-size: 13px;
    color: var(--muted);
    max-width: 660px;
    margin-top: 10px !important;
  }
  .hub-heading .editorial-link {
    white-space: nowrap;
  }
  .hub-status {
    font-size: 11px;
    color: var(--muted);
    flex-shrink: 0;
  }
  .product-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-block: 25px 18px;
  }
  .product-heading span {
    font-size: 11px;
    color: var(--muted);
  }
  .about-section {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 90px;
    padding-block: 48px 36px;
  }
  .about-section h2 {
    font-size: 37px;
    line-height: 1.2;
    margin-top: 13px !important;
  }
  .about-copy p {
    font-size: 14px;
    line-height: 1.85;
    color: var(--muted);
    margin-bottom: 13px !important;
    max-width: 640px;
  }
  .about-links {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 28px;
    padding-top: 6px;
  }
  .credits {
    padding-block: 0 20px;
    font-size: 10px;
    color: var(--muted);
  }
  .credits summary {
    cursor: pointer;
    width: fit-content;
  }
  .credits p {
    max-width: 820px;
    margin-top: 8px !important;
  }
  @media (min-width: 1500px) {
    .masthead {
      padding-block: 40px 35px;
    }
  }
  @media (max-width: 1100px) {
    .doorway h2 {
      font-size: 24px;
    }
    .doorway-grid,
    .product-grid {
      gap: 20px;
    }
    .about-section {
      gap: 40px;
    }
    .hub-heading h2 {
      font-size: 35px;
    }
  }
  @media (max-width: 700px) {
    .masthead {
      padding-block: 30px 27px;
    }
    .masthead .section-kicker {
      font-size: 9px;
    }
    h1 {
      font-size: 35px;
      line-height: 1.12;
    }
    .masthead-description {
      font-size: 13px;
      max-width: 360px;
      margin-inline: auto !important;
    }
    .doorway-grid,
    .product-grid {
      grid-template-columns: 1fr;
      gap: 29px;
    }
    .doorway-art {
      aspect-ratio: 3 / 2;
    }
    .doorway-copy {
      padding-top: 16px;
    }
    .doorway h2 {
      font-size: 29px;
    }
    .doorway-action {
      padding-top: 12px;
    }
    .directory-caption {
      margin-top: 24px;
      align-items: flex-start;
      font-size: 10px;
    }
    .directory-caption > span:first-child {
      max-width: 130px;
    }
    .directory-caption > span:last-child {
      max-width: 140px;
      text-align: right;
    }
    .hub-section {
      padding-block: 30px 34px;
    }
    .hub-heading {
      flex-direction: column;
      align-items: flex-start;
      gap: 13px;
      margin-bottom: 20px;
    }
    .hub-heading h2 {
      font-size: 32px;
    }
    .hub-divider {
      margin-bottom: 16px;
    }
    .hub-divider .section-kicker {
      font-size: 10px;
    }
    .product-heading span {
      display: none;
    }
    .about-section {
      grid-template-columns: 1fr;
      gap: 23px;
      padding-block: 35px 28px;
    }
    .about-section h2 {
      font-size: 33px;
    }
  }
  @media (max-width: 380px) {
    h1 {
      font-size: 31px;
    }
    .doorway h2 {
      font-size: 26px;
    }
  }
</style>
