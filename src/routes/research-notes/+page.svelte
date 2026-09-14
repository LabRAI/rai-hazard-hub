<script lang="ts">
  import {
    ArrowRightOutline,
    ArrowUpRightFromSquareOutline,
    CloseOutline,
    ExpandOutline,
    FilePdfOutline,
  } from "flowbite-svelte-icons";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import wildfireFm from "$lib/assets/editorial/wildfire-fm-card.webp";
  import wildfireFmMatching from "$lib/assets/editorial/wildfire-fm-matching.webp";
  import wildfireIa from "$lib/assets/editorial/wildfire-ia-card.webp";
  import wildfireIaSources from "$lib/assets/editorial/wildfire-ia-sources.webp";

  type Figure = { image: string; alt: string; caption: string };
  let selectedFigure: Figure | null = $state(null);
  let figureDialog: HTMLDialogElement;
  function openFigure(figure: Figure) {
    selectedFigure = figure;
    figureDialog.showModal();
  }

  const papers = [
    {
      id: "wildfire-fm",
      number: "01",
      shortTitle: "Wildfire-FM",
      category: "Models & evaluation",
      title:
        "Does Your Wildfire Prediction Model Actually Work, or Just Score Well?",
      date: "May 2026",
      datetime: "2026-05",
      arxivId: "2605.18911",
      authors: "Yangshuang Xu, Yuyang Dai, Liling Chang, Qi Wang, Yushun Dong",
      pdfHref: "https://arxiv.org/pdf/2605.18911",
      resourceHref: "https://huggingface.co/RAI-Lab/Wildfire-FM",
      resourceLabel: "Model release",
      summary:
        "A wildfire model can earn a strong score and still fall short when the rules of evaluation change. Wildfire-FM brings weather, active-fire observations, terrain, and vegetation into a shared model, then asks what its predictions really tell us.",
      takeaways: [
        "The same forecast can receive different scores depending on how predicted and observed fires are matched.",
        "Ranking fires well does not guarantee reliable decisions at a chosen alert threshold.",
        "Keeping the data, tasks, and scoring rules fixed makes model comparisons more meaningful.",
      ],
      figure: {
        image: wildfireFm,
        alt: "Study illustration of environmental inputs flowing into Wildfire-FM and three different matching rules for evaluation.",
        caption:
          "Wildfire-FM connects environmental observations with a shared model and multiple evaluation tasks.",
      },
      detail: {
        image: wildfireFmMatching,
        alt: "Study illustration comparing exact, tolerated, and union matches between forecast and observed fire locations.",
        caption: "The same forecast, different scores",
      },
      detailText:
        "A small shift in where or when a fire is predicted can change whether it counts as a correct forecast. Matching rules make that distinction explicit.",
      color: "#a64639",
    },
    {
      id: "wildfire-ia",
      number: "02",
      shortTitle: "Wildfire Initial Attack",
      category: "Data & benchmarks",
      title:
        "A Nationwide Benchmark for Wildfire Initial Attack Failure Prediction with Public Environmental Data",
      date: "June 2026",
      datetime: "2026-06",
      arxivId: "2606.15529",
      authors: "Runyang Xu, Xueqi Cheng, Yushun Dong",
      pdfHref: "https://arxiv.org/pdf/2606.15529",
      resourceHref: "https://github.com/LabRAI/WildfireIA",
      resourceLabel: "Code & data",
      summary:
        "Which fires are likely to escape early control? This study brings together 38,128 naturally caused fires and public environmental data to examine what can be learned at the moment a fire is discovered, before the outcome is known.",
      takeaways: [
        "Public observations offer useful early warning signals, but cannot fully explain the outcome of suppression.",
        "Satellite fire detections add distinct information; fuel provides a strong signal when other observations are missing.",
        "The benchmark fixes event definitions and time splits, and excludes information learned only after the fire.",
      ],
      figure: {
        image: wildfireIa,
        alt: "Study illustration of the national Wildfire IA benchmark, showing public data sources, mapped events, and discovery-time risk.",
        caption:
          "Public data describes conditions at discovery time, before a fire escapes initial control.",
      },
      detail: {
        image: wildfireIaSources,
        alt: "Study illustration aligning fire reports, satellite detections, weather, fuels, roads, and population.",
        caption: "What was known when the fire began",
      },
      detailText:
        "FPA-FOD events are aligned with FIRMS/VIIRS, gridMET, LANDFIRE, OpenStreetMap, and WorldPop to build a consistent picture of each fire.",
      color: "#376a80",
    },
  ];
</script>

<svelte:head>
  <title>Research Notes | RAI Hazard Intelligence</title>
  <meta
    name="description"
    content="A closer look at RAI wildfire research: what the studies ask, what they find, and why it matters. Read the papers and explore the accompanying resources."
  />
</svelte:head>

<div class="hub-site">
  <SiteHeader active="research" />
  <main id="main-content">
    <section class="notes-intro site-width" aria-labelledby="notes-title">
      <p class="eyebrow">From the lab</p>
      <h1 id="notes-title">Research Notes</h1>
      <p>A closer look at the science behind wildfire prediction.</p>
      <nav class="study-index" aria-label="Jump to a study">
        {#each papers as paper}
          <a href={`#${paper.id}`}
            ><span>{paper.number}</span>
            {paper.shortTitle}
            <ArrowRightOutline class="small-icon" /></a
          >
        {/each}
      </nav>
    </section>

    <div class="paper-list">
      {#each papers as paper, index}
        <section
          class="study-section"
          class:alternate={index % 2 === 1}
          style={`--study-color: ${paper.color}`}
        >
          <article
            class="study site-width"
            id={paper.id}
            aria-labelledby={`${paper.id}-title`}
          >
            <header class="study-heading">
              <div class="study-meta">
                <span>{paper.category}</span><time datetime={paper.datetime}
                  >{paper.date}</time
                >
              </div>
              <h2 id={`${paper.id}-title`}>{paper.title}</h2>
              <p class="authors">{paper.authors}</p>
            </header>

            <div class="study-visuals">
              <figure class="main-figure">
                <button
                  type="button"
                  class="figure-button"
                  onclick={() => openFigure(paper.figure)}
                  aria-label={`Enlarge ${paper.shortTitle} overview`}
                  title="Enlarge figure"
                >
                  <img
                    src={paper.figure.image}
                    alt={paper.figure.alt}
                    width="1672"
                    height="941"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <span class="expand-icon"><ExpandOutline /></span>
                </button>
                <figcaption>
                  <span>Study illustration</span>
                  {paper.figure.caption}
                </figcaption>
              </figure>
              <figure class="detail-figure">
                <button
                  type="button"
                  class="figure-button"
                  onclick={() => openFigure(paper.detail)}
                  aria-label={`Enlarge ${paper.detail.caption}`}
                  title="Enlarge figure"
                >
                  <img
                    src={paper.detail.image}
                    alt={paper.detail.alt}
                    width="1254"
                    height="1254"
                    loading="lazy"
                  />
                  <span class="expand-icon"><ExpandOutline /></span>
                </button>
                <figcaption>
                  <h3>{paper.detail.caption}</h3>
                  <p>{paper.detailText}</p>
                </figcaption>
              </figure>
            </div>

            <div class="study-body">
              <p class="study-summary">{paper.summary}</p>
              <div class="findings">
                <h3>What the study shows</h3>
                <ul>
                  {#each paper.takeaways as takeaway}<li>{takeaway}</li>{/each}
                </ul>
              </div>
              <div class="paper-actions">
                <a
                  class="paper-link"
                  href={paper.pdfHref}
                  target="_blank"
                  rel="noreferrer"
                  ><FilePdfOutline class="small-icon" /> Read the paper <ArrowUpRightFromSquareOutline
                    class="small-icon external-icon"
                  /></a
                >
                <a
                  class="text-link"
                  href={paper.resourceHref}
                  target="_blank"
                  rel="noreferrer"
                  >{paper.resourceLabel}<ArrowUpRightFromSquareOutline
                    class="small-icon external-icon"
                  /></a
                >
              </div>
              <p class="paper-id">arXiv: {paper.arxivId}</p>
            </div>
          </article>
        </section>
      {/each}
    </div>

    <section
      class="research-bridge site-width"
      aria-label="Explore related resources"
    >
      <div>
        <p class="eyebrow">Beyond the papers</p>
        <h2>Explore the data in context.</h2>
      </div>
      <div class="bridge-links">
        <a class="text-link" href="https://rai-fire.com/"
          >Open FireEye <ArrowUpRightFromSquareOutline class="small-icon" /></a
        >
        <a class="text-link" href="https://labrai.github.io/PyHazards/"
          >PyHazards documentation <ArrowUpRightFromSquareOutline
            class="small-icon"
          /></a
        >
      </div>
    </section>
  </main>
  <SiteFooter />

  <dialog
    bind:this={figureDialog}
    class="figure-dialog"
    aria-label="Research illustration"
    onclose={() => (selectedFigure = null)}
  >
    <form method="dialog">
      <button
        class="close-figure"
        aria-label="Close figure"
        title="Close figure"><CloseOutline /></button
      >
    </form>
    {#if selectedFigure}
      <figure>
        <img src={selectedFigure.image} alt={selectedFigure.alt} />
        <figcaption>{selectedFigure.caption}</figcaption>
      </figure>
    {/if}
  </dialog>
</div>

<style>
  .notes-intro {
    padding-block: 42px 0;
    text-align: center;
  }
  .notes-intro .eyebrow {
    color: var(--accent);
    margin-bottom: 9px;
  }
  h1 {
    font-size: 42px;
    font-weight: 600;
    line-height: 1.2;
  }
  .notes-intro > p:last-of-type {
    margin-top: 14px;
    font-size: 15px;
    color: var(--muted);
  }
  .study-index {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-top: 27px;
    padding-block: 17px;
    border-block: 1px solid var(--line);
  }
  .study-index a {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: var(--ink);
    font-size: 12px;
  }
  .study-index a > span {
    color: #8a908c;
    font-size: 10px;
  }
  .study-index a :global(svg) {
    width: 13px;
    height: 13px;
  }
  .study-index a:hover {
    color: var(--accent);
  }
  .study-section {
    padding-block: 38px 42px;
  }
  .study-section.alternate {
    background: #f6f7f6;
    border-block: 1px solid var(--line);
  }
  .study {
    display: grid;
    grid-template-columns: 1.06fr 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: "visuals heading" "visuals body";
    column-gap: 48px;
    scroll-margin-top: 24px;
  }
  .study-heading {
    grid-area: heading;
  }
  .study-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    font-size: 11px;
    margin-bottom: 13px;
  }
  .study-meta > span {
    color: var(--study-color);
    font-weight: 600;
  }
  .study-meta time {
    color: var(--muted);
    padding-left: 16px;
    border-left: 1px solid #cdd2cf;
  }
  .study-heading h2 {
    font-size: 26px;
    font-weight: 600;
    line-height: 1.3;
    text-wrap: pretty;
  }
  .authors {
    color: var(--muted);
    font-size: 11px;
    line-height: 1.7;
    margin-top: 12px;
  }
  .study-visuals {
    grid-area: visuals;
    min-width: 0;
  }
  .figure-button {
    position: relative;
    display: block;
    width: 100%;
    border: 0;
    background: transparent;
    padding: 0;
    cursor: zoom-in;
  }
  .main-figure .figure-button {
    aspect-ratio: 1672 / 941;
  }
  .figure-button img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 3px;
  }
  .expand-icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 30px;
    height: 30px;
    padding: 6px;
    color: #424a48;
    background: rgb(255 255 255 / 94%);
    border: 1px solid #dce1df;
    border-radius: 3px;
    transition: background 150ms ease;
  }
  .figure-button:hover .expand-icon {
    background: #e9efec;
  }
  .main-figure > figcaption {
    color: var(--muted);
    font-size: 11px;
    line-height: 1.7;
    padding-top: 10px;
  }
  .main-figure > figcaption > span {
    font-weight: 600;
    color: #48514e;
    margin-right: 6px;
  }
  .detail-figure {
    display: grid;
    grid-template-columns: 170px 1fr;
    gap: 22px;
    align-items: center;
    margin-top: 23px;
    padding-top: 22px;
    border-top: 1px solid var(--line);
  }
  .detail-figure .figure-button {
    aspect-ratio: 1;
  }
  .detail-figure h3 {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 8px;
  }
  .detail-figure p {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.8;
  }
  .study-body {
    grid-area: body;
    padding-top: 18px;
  }
  .study-summary {
    color: #525c5a;
    font-size: 14px;
    line-height: 1.85;
  }
  .findings {
    margin-top: 22px;
    border-top: 1px solid var(--line);
    padding-top: 19px;
  }
  .findings h3 {
    font-size: 13px;
    font-weight: 600;
  }
  .findings ul {
    display: grid;
    gap: 10px;
    margin: 12px 0 0;
    padding-left: 16px;
    list-style: disc;
  }
  .findings li {
    padding-left: 4px;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.75;
  }
  .findings li::marker {
    color: var(--study-color);
    font-size: 9px;
  }
  .paper-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px 23px;
    margin-top: 23px;
  }
  .paper-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 10px 14px;
    border: 1px solid var(--study-color);
    border-radius: 4px;
    background: var(--study-color);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    transition: filter 150ms ease;
  }
  .paper-link:hover {
    filter: brightness(0.9);
  }
  .paper-actions .text-link {
    color: var(--study-color);
    font-size: 12px;
  }
  .paper-actions :global(.external-icon) {
    width: 12px;
    height: 12px;
  }
  .paper-id {
    color: #727a78;
    font-size: 10px;
    margin-top: 12px;
  }
  .research-bridge {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding-block: 30px;
  }
  .research-bridge .eyebrow {
    color: var(--muted);
    margin-bottom: 5px;
  }
  .research-bridge h2 {
    font-size: 22px;
    font-weight: 500;
    line-height: 1.4;
  }
  .bridge-links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
  }
  .bridge-links a {
    font-size: 12px;
  }
  .figure-dialog {
    position: fixed;
    margin: auto;
    width: min(1180px, calc(100% - 40px));
    max-height: calc(100dvh - 40px);
    padding: 48px 24px 22px;
    border: 1px solid var(--line);
    border-radius: 6px;
    color: var(--ink);
    background: #fff;
  }
  .figure-dialog::backdrop {
    background: rgb(20 26 25 / 75%);
  }
  .figure-dialog img {
    width: 100%;
    height: auto;
    max-height: calc(100dvh - 165px);
    object-fit: contain;
  }
  .figure-dialog figcaption {
    font-size: 13px;
    margin-top: 14px;
    text-align: center;
  }
  .close-figure {
    position: absolute;
    right: 10px;
    top: 8px;
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    padding: 7px;
    border-radius: 3px;
    border: 1px solid var(--line);
    background: #fff;
    cursor: pointer;
  }
  @media (max-width: 1000px) {
    .study {
      grid-template-areas: "heading heading" "visuals body";
      gap: 24px 30px;
    }
    .study-body {
      padding-top: 0;
    }
    .study-heading h2 {
      font-size: 23px;
    }
    .detail-figure {
      grid-template-columns: 120px 1fr;
      gap: 15px;
    }
    .study-summary {
      font-size: 13px;
    }
    .findings li {
      font-size: 12px;
    }
  }
  @media (max-width: 800px) {
    .study {
      grid-template-columns: 1fr;
      grid-template-areas: "heading" "visuals" "body";
      gap: 22px;
    }
    .study-heading h2 {
      max-width: 640px;
      font-size: 26px;
    }
    .study-body {
      padding-top: 0;
    }
    .study-summary {
      font-size: 14px;
    }
    .findings li {
      font-size: 13px;
    }
    .detail-figure {
      grid-template-columns: 140px 1fr;
    }
    .research-bridge {
      align-items: flex-start;
      flex-direction: column;
    }
  }
  @media (max-width: 500px) {
    .notes-intro {
      padding-top: 30px;
    }
    h1 {
      font-size: 32px;
    }
    .notes-intro > p:last-of-type {
      font-size: 14px;
      text-wrap: balance;
    }
    .study-index {
      align-items: stretch;
      gap: 12px;
    }
    .study-index a {
      gap: 7px;
      font-size: 11px;
    }
    .study-index a :global(svg) {
      display: none;
    }
    .study-section {
      padding-block: 28px 32px;
    }
    .study-heading h2 {
      font-size: 24px;
    }
    .detail-figure {
      grid-template-columns: 112px 1fr;
      gap: 16px;
    }
    .detail-figure h3 {
      font-size: 13px;
    }
    .detail-figure p {
      font-size: 11px;
      line-height: 1.7;
    }
    .research-bridge h2 {
      font-size: 20px;
    }
    .bridge-links {
      gap: 14px;
    }
    .figure-dialog {
      width: calc(100% - 20px);
      padding: 45px 10px 18px;
    }
  }
</style>
