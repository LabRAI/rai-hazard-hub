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
    news,
    posters,
    scienceTitle,
    scienceDescription,
  } from "$lib/science/content";
  import { withBase } from "$lib/paths";
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
      Super Intelligence<br /><span>for Research Hub at FSU</span>
    </h1>
    <p class="masthead-description">
      Research, platforms, and open tools for a world of scientific questions.
    </p>
  </section>

  <div class="science-width frontpage-grid">
    <section class="news-section" aria-labelledby="news-title">
      <div class="frontpage-heading">
        <h2 id="news-title" class="editorial-title">News</h2>
        <a class="editorial-link" href={withBase("/science/research-notes/")}
          >Research Notes <ArrowRightOutline /></a
        >
      </div>
      <div class="news-grid">
        {#each news as story}
          <article class="news-story">
            <a class="story-link" href={withBase(story.href)}>
              <div class="frontpage-art">
                <img
                  src={story.image}
                  alt={story.alt}
                  width="1672"
                  height="941"
                />
              </div>
              <div class="story-copy">
                <div class="story-meta">
                  <span>{story.category}</span>
                  <time datetime={story.datetime}>{story.date}</time>
                </div>
                <h3 class="editorial-title">{story.title}</h3>
                <p class="story-description">{story.description}</p>
                <span class="story-action"
                  >Read the story <ArrowRightOutline /></span
                >
              </div>
            </a>
          </article>
        {/each}
      </div>
    </section>

    <section class="trending-section" aria-labelledby="trending-title">
      <div class="frontpage-heading">
        <h2 id="trending-title" class="editorial-title">Trending Product</h2>
      </div>
      <article class="featured-product">
        <a class="story-link" href="https://rai-fire.com/">
          <div class="frontpage-art">
            <img
              src={art.fireeye.src}
              srcset={art.fireeye.srcset}
              sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1000px) calc((100vw - 112px) / 2), (max-width: 1400px) calc((100vw - 128px) / 3), 424px"
              alt={art.fireeye.alt}
              style:object-position={art.fireeye.position}
              width="1536"
              height="1024"
              fetchpriority="high"
            />
          </div>
          <div class="story-copy">
            <p class="story-meta">Interactive wildfire forecasting</p>
            <h3 class="editorial-title">RAI FireEye</h3>
            <p class="story-description">
              Explore wildfire risk forecasts alongside weather and
              environmental conditions on an interactive map.
            </p>
            <span class="story-action"
              >Explore FireEye <ArrowUpRightFromSquareOutline /></span
            >
          </div>
        </a>
      </article>
    </section>
  </div>

  <section id="research-hubs" aria-label="Research hubs">
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
              >{:else}<span class="hub-status"
                >Platform details forthcoming</span
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
  </section>

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
    padding-block: 30px 28px;
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
  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 26px;
  }
  .frontpage-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 26px;
    padding-bottom: 30px;
    border-bottom: 1px solid var(--line);
  }
  .frontpage-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px 20px;
    min-height: 48px;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #782f40;
  }
  .frontpage-heading h2 {
    font-size: 28px;
    line-height: 1.2;
  }
  .frontpage-heading .editorial-link {
    font-size: 12px;
  }
  .news-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 26px;
  }
  .news-section,
  .trending-section {
    min-width: 0;
  }
  .news-section {
    grid-column: span 2;
  }
  .trending-section {
    display: flex;
    flex-direction: column;
  }
  .featured-product {
    flex: 1;
  }
  .story-link {
    color: var(--ink);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .frontpage-art {
    aspect-ratio: 3 / 2;
    overflow: hidden;
    background: #faf9f6;
  }
  .frontpage-art img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.35s ease;
  }
  .story-link:hover img {
    transform: scale(1.025);
  }
  .story-copy {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 17px;
  }
  .story-meta {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4px 10px;
    color: #782f40;
    font-size: 11px;
    font-weight: 550;
    line-height: 1.5;
  }
  .story-meta time {
    color: var(--muted);
    font-weight: 400;
  }
  .story-copy h3 {
    font-size: 25px;
    line-height: 1.25;
    margin-block: 9px 12px !important;
  }
  .featured-product h3 {
    font-size: 32px;
  }
  .story-description {
    color: var(--muted);
    font-size: 13px;
    line-height: 1.7;
  }
  .story-action {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: 17px;
    margin-top: auto;
    font-size: 12px;
    font-weight: 600;
  }
  .story-action :global(svg) {
    width: 17px;
    height: 17px;
  }
  .story-link:hover .story-action,
  .story-link:hover h3 {
    color: #782f40;
  }
  .story-link:focus-visible {
    outline: 2px solid #782f40;
    outline-offset: 5px;
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
      padding-block: 32px 29px;
    }
  }
  @media (max-width: 1100px) {
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
  @media (min-width: 701px) and (max-width: 1000px) {
    .frontpage-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .news-grid {
      grid-template-columns: 1fr;
      gap: 22px;
    }
    .news-section {
      grid-column: auto;
    }
    .news-story + .news-story {
      padding-top: 22px;
      border-top: 1px solid var(--line);
    }
    .news-story .story-link {
      display: grid;
      grid-template-columns: 96px minmax(0, 1fr);
      gap: 14px;
      align-items: start;
    }
    .news-story .frontpage-art {
      aspect-ratio: 1;
    }
    .news-story .story-copy {
      padding-top: 0;
    }
    .news-story h3 {
      font-size: 22px;
    }
    .frontpage-heading h2 {
      font-size: 25px;
    }
  }
  @media (max-width: 700px) {
    .news-section {
      grid-column: auto;
    }
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
    .frontpage-grid,
    .product-grid {
      grid-template-columns: 1fr;
      gap: 29px;
    }
    .frontpage-heading {
      margin-bottom: 16px;
    }
    .story-copy h3 {
      font-size: 23px;
    }
    .featured-product h3 {
      font-size: 30px;
    }
    .news-grid {
      gap: 20px;
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
  }
  @media (max-width: 500px) {
    .news-grid {
      grid-template-columns: 1fr;
    }
    .news-story + .news-story {
      padding-top: 20px;
      border-top: 1px solid var(--line);
    }
    .news-story .story-link {
      display: grid;
      grid-template-columns: 88px minmax(0, 1fr);
      gap: 14px;
      align-items: start;
    }
    .news-story .frontpage-art {
      aspect-ratio: 1;
    }
    .news-story .story-copy {
      padding-top: 0;
    }
    .news-story h3 {
      font-size: 21px;
    }
    .news-story .story-action {
      padding-top: 10px;
    }
  }
</style>
