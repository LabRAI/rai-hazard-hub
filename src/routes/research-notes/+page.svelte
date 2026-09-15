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
  let selectedFigure: (Figure & { studyTitle: string }) | null = $state(null);
  let figureDialog: HTMLDialogElement;
  function openFigure(figure: Figure, studyTitle: string) {
    selectedFigure = { ...figure, studyTitle };
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

<div class="hub-site research-site">
  <SiteHeader active="research" />
  <main id="main-content">
    <section class="notes-intro site-width" aria-labelledby="notes-title">
      <div class="notes-masthead">
        <div>
          <p class="eyebrow">From the lab</p>
          <h1 id="notes-title">Research Notes</h1>
        </div>
        <p class="notes-description">
          A closer look at the science behind wildfire prediction.
        </p>
      </div>
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
            <div class="study-meta">
              <p class="study-label">
                <span class="study-number">{paper.number}</span>
                {paper.shortTitle}
              </p>
              <div class="study-context">
                <span>{paper.category}</span><time datetime={paper.datetime}
                  >{paper.date}</time
                >
              </div>
            </div>
            <div class="study-introduction">
              <header class="study-heading">
                <h2 id={`${paper.id}-title`}>{paper.title}</h2>
                <p class="authors">{paper.authors}</p>
              </header>
              <div class="study-body">
                <p class="study-summary">{paper.summary}</p>
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
            </div>

            <figure class="main-figure">
              <button
                type="button"
                class="figure-button"
                onclick={() => openFigure(paper.figure, paper.shortTitle)}
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
              <figcaption>{paper.figure.caption}</figcaption>
            </figure>

            <figure class="detail-figure">
              <button
                type="button"
                class="figure-button"
                onclick={() => openFigure(paper.detail, paper.shortTitle)}
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

            <div class="findings">
              <h3>Key findings</h3>
              <ul>
                {#each paper.takeaways as takeaway}<li>{takeaway}</li>{/each}
              </ul>
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
    aria-labelledby="figure-study-title"
    aria-describedby="figure-caption"
    onclose={() => (selectedFigure = null)}
  >
    <div class="figure-toolbar">
      <p id="figure-study-title">{selectedFigure?.studyTitle}</p>
      <form method="dialog">
        <button
          class="close-figure"
          aria-label="Close figure"
          title="Close figure"><CloseOutline /></button
        >
      </form>
    </div>
    {#if selectedFigure}
      <figure>
        <img src={selectedFigure.image} alt={selectedFigure.alt} />
        <figcaption id="figure-caption">{selectedFigure.caption}</figcaption>
      </figure>
    {/if}
  </dialog>
</div>

<style>
  .research-site {
    --site-max-width: 1360px;
    --reading-font: Georgia, "Times New Roman", serif;
  }
  .notes-intro {
    padding-block: 36px 0;
  }
  .notes-masthead {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px 48px;
  }
  .notes-intro .eyebrow {
    color: var(--accent);
    margin-bottom: 9px;
  }
  h1 {
    font-size: 46px;
    font-weight: 600;
    line-height: 1.2;
  }
  .notes-description {
    max-width: 340px;
    padding-bottom: 3px;
    font-size: 15px;
    line-height: 1.7;
    color: var(--muted);
  }
  .study-index {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-top: 24px;
    padding-block: 14px;
    border-top: 1px solid var(--ink);
    border-bottom: 1px solid var(--line);
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
    padding-block: 28px 34px;
  }
  .study-section.alternate {
    background: #f5f7f8;
    border-block: 1px solid var(--line);
  }
  .study {
    display: grid;
    grid-template-columns: 1.08fr 1fr;
    grid-template-areas: "meta meta" "overview introduction" "detail findings";
    gap: 22px 48px;
    scroll-margin-top: 24px;
  }
  .study-introduction {
    grid-area: introduction;
    align-self: center;
    min-width: 0;
  }
  .study-meta {
    grid-area: meta;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px 24px;
    font-size: 11px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--line);
  }
  .study-label {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    font-weight: 600;
  }
  .study-number {
    color: var(--study-color);
    font-size: 11px;
    font-variant-numeric: tabular-nums;
  }
  .study-context {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
  }
  .study-context > span {
    color: var(--study-color);
    font-weight: 600;
  }
  .study-meta time {
    color: var(--muted);
    padding-left: 16px;
    border-left: 1px solid #cdd2cf;
  }
  .study-heading h2 {
    font-family: var(--reading-font);
    font-size: 31px;
    font-weight: 400;
    line-height: 1.25;
    text-wrap: pretty;
  }
  .authors {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.7;
    margin-top: 12px;
  }
  .main-figure {
    grid-area: overview;
    min-width: 0;
  }
  .figure-button {
    position: relative;
    display: block;
    width: 100%;
    border: 0;
    border-radius: 5px;
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
    border-radius: 5px;
  }
  .expand-icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 30px;
    height: 30px;
    padding: 6px;
    color: var(--ink);
    background: rgb(255 255 255 / 94%);
    border: 1px solid #dce1df;
    border-radius: 3px;
    transition: background 150ms ease;
  }
  .figure-button:hover .expand-icon {
    background: #fff;
    border-color: var(--study-color);
    color: var(--study-color);
  }
  .main-figure > figcaption {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.7;
    padding-top: 10px;
  }
  .detail-figure {
    grid-area: detail;
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 24px;
    align-items: center;
    padding-top: 20px;
    border-top: 1px solid var(--line);
  }
  .detail-figure .figure-button {
    aspect-ratio: 1;
  }
  .detail-figure h3 {
    font-family: var(--reading-font);
    font-size: 20px;
    font-weight: 400;
    line-height: 1.35;
    margin-bottom: 8px;
  }
  .detail-figure p {
    color: var(--muted);
    font-size: 13px;
    line-height: 1.8;
  }
  .study-body {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding-top: 18px;
  }
  .study-summary {
    color: #475250;
    font-size: 15px;
    line-height: 1.8;
  }
  .findings {
    grid-area: findings;
    border-top: 1px solid var(--line);
    padding-top: 20px;
  }
  .findings h3 {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
  }
  .findings ul {
    display: grid;
    gap: 9px;
    margin: 12px 0 0;
    padding-left: 16px;
    list-style: disc;
  }
  .findings li {
    padding-left: 4px;
    color: #56615f;
    font-size: 14px;
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
    padding-top: 22px;
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
    margin-top: 10px;
  }
  .research-bridge {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding-block: 28px;
  }
  .research-bridge .eyebrow {
    color: var(--muted);
    margin-bottom: 5px;
  }
  .research-bridge h2 {
    font-family: var(--reading-font);
    font-size: 25px;
    font-weight: 400;
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
    padding: 0;
    border: 1px solid var(--line);
    border-radius: 6px;
    color: var(--ink);
    background: #fff;
  }
  .figure-dialog::backdrop {
    background: rgb(20 26 25 / 75%);
  }
  :global(body:has(.figure-dialog[open])) {
    overflow: hidden;
  }
  .figure-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-height: 58px;
    padding: 10px 18px;
    border-bottom: 1px solid var(--line);
    font-size: 13px;
    font-weight: 600;
  }
  .figure-dialog figure {
    padding: 20px;
  }
  .figure-dialog img {
    display: block;
    width: 100%;
    height: auto;
    max-height: calc(100dvh - 165px);
    object-fit: contain;
  }
  .figure-dialog figcaption {
    font-size: 13px;
    margin-top: 14px;
    color: var(--muted);
    text-align: center;
  }
  .close-figure {
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
  .close-figure:hover {
    background: var(--wash);
  }
  @media (max-width: 1000px) {
    .study {
      grid-template-areas: "meta meta" "heading heading" "overview body" "detail findings";
      column-gap: 30px;
    }
    .study-introduction {
      display: contents;
    }
    .study-heading {
      grid-area: heading;
    }
    .study-body {
      grid-area: body;
      padding-top: 0;
    }
    .study-heading h2 {
      font-size: 26px;
    }
    .authors {
      font-size: 11px;
    }
    .detail-figure {
      grid-template-columns: 150px 1fr;
      gap: 18px;
    }
    .detail-figure h3 {
      font-size: 18px;
    }
    .detail-figure p {
      font-size: 12px;
    }
    .study-summary {
      font-size: 14px;
    }
    .findings li {
      font-size: 13px;
    }
  }
  @media (max-width: 800px) {
    .notes-description {
      max-width: 260px;
      font-size: 14px;
    }
    h1 {
      font-size: 38px;
    }
    .study {
      grid-template-columns: 1fr;
      grid-template-areas: "meta" "heading" "overview" "body" "detail" "findings";
      gap: 22px;
    }
    .study-meta {
      margin-bottom: 0;
    }
    .study-heading h2 {
      max-width: 640px;
      font-size: 30px;
    }
    .study-summary {
      font-size: 14px;
    }
    .findings li {
      font-size: 13px;
    }
    .detail-figure {
      grid-template-columns: 180px 1fr;
    }
    .research-bridge {
      align-items: flex-start;
      flex-direction: column;
    }
  }
  @media (max-width: 600px) {
    .notes-intro {
      padding-top: 26px;
    }
    .notes-masthead {
      align-items: flex-start;
      flex-direction: column;
      gap: 12px;
    }
    h1 {
      font-size: 36px;
    }
    .notes-description {
      max-width: 340px;
      padding-bottom: 0;
      font-size: 14px;
    }
    .study-index {
      align-items: stretch;
      gap: 12px;
      margin-top: 20px;
    }
    .study-index a {
      gap: 7px;
      font-size: 11px;
    }
    .study-index a :global(svg) {
      display: none;
    }
    .study-section {
      padding-block: 24px 30px;
    }
    .study-context {
      font-size: 10px;
    }
    .study-meta {
      align-items: flex-start;
      flex-direction: column;
      gap: 6px;
      padding-bottom: 12px;
    }
    .study-heading h2 {
      font-size: 28px;
    }
    .detail-figure {
      grid-template-columns: 132px 1fr;
      gap: 16px;
    }
    .detail-figure h3 {
      font-size: 18px;
    }
    .detail-figure p {
      font-size: 12px;
      line-height: 1.7;
    }
    .research-bridge h2 {
      font-size: 23px;
    }
    .bridge-links {
      gap: 14px;
    }
    .figure-dialog {
      width: calc(100% - 20px);
    }
    .figure-dialog figure {
      padding: 14px 10px;
    }
    .figure-toolbar {
      padding-inline: 12px;
    }
  }
</style>
