<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import canopy from '$lib/assets/layerImages/canopy_cover.png';
	import drought from '$lib/assets/layerImages/drought.png';
	import fireIntensity from '$lib/assets/layerImages/fireIntensity.png';
	import forestCarbon from '$lib/assets/layerImages/ForestCarbon.png';
	import landcover from '$lib/assets/layerImages/LandcoverImg.png';
	import population from '$lib/assets/layerImages/US_Population.png';
	import prelimPreds from '$lib/assets/layerImages/prelimPreds.png';
	import publicFire from '$lib/assets/layerImages/FLPublic.png';
	import wui from '$lib/assets/layerImages/us_wui.png';
	import researchNotesHero from '$lib/assets/researchNotes/research-notes-hero.png';
	import wildfireFmCard from '$lib/assets/researchNotes/wildfire-fm-card.png';
	import wildfireFmMatching from '$lib/assets/researchNotes/wildfire-fm-matching.png';
	import wildfireIaCard from '$lib/assets/researchNotes/wildfire-ia-card.png';
	import wildfireIaSources from '$lib/assets/researchNotes/wildfire-ia-sources.png';
	import { withBase } from '$lib/paths';
	import {
		ArrowLeftOutline,
		ArrowRightOutline,
		ArrowUpRightFromSquareOutline,
		BookOpenOutline,
		CalendarWeekOutline,
		CheckCircleOutline,
		DatabaseOutline,
		FileImageOutline,
		FilePdfOutline,
		FireOutline,
		GithubSolid,
		GlobeOutline,
		LayersOutline
	} from 'flowbite-svelte-icons';

	type VisualTile = {
		label: string;
		image: string;
	};

	type PaperNote = {
		title: string;
		shortTitle: string;
		date: string;
		arxivId: string;
		category: string;
		authors: string;
		pdfHref: string;
		artifactHref: string;
		artifactLabel: string;
		theme: 'red' | 'blue';
		image: string;
		imageAlt: string;
		detailImage: string;
		detailLabel: string;
		summary: string;
		question: string;
		takeaways: string[];
		visuals: VisualTile[];
	};

	const papers: PaperNote[] = [
		{
			title: 'Does Your Wildfire Prediction Model Actually Work, or Just Score Well?',
			shortTitle: 'Wildfire-FM and fixed-contract evaluation',
			date: 'May 2026',
			arxivId: '2605.18911',
			category: 'Foundation model',
			authors: 'Yangshuang Xu, Yuyang Dai, Liling Chang, Qi Wang, Yushun Dong',
			pdfHref: 'https://arxiv.org/pdf/2605.18911',
			artifactHref: 'https://huggingface.co/RAI-Lab/Wildfire-FM',
			artifactLabel: 'Model assets',
			theme: 'red',
			image: wildfireFmCard,
			imageAlt:
				'Wildfire-FM diagram showing weather, fire, vegetation, and topography inputs flowing into a backbone and evaluation panels',
			detailImage: wildfireFmMatching,
			detailLabel: 'Matching rules',
			summary:
				'This paper introduces Wildfire-FM, a wildfire-specific foundation model trained with weather, active-fire observations, topography, vegetation, and static environmental data. The blog story is really about trust: evaluation choices can make a model look useful, fragile, or misleading unless the task contract is fixed up front.',
			question:
				'When a wildfire model scores well, is it learning the fire problem, or benefiting from the way we matched, scored, and selected the prediction?',
			takeaways: [
				'Wildfire transfer results change when matching rules change, even when the output is held fixed.',
				'Head-selection metrics can reward ranking quality while missing the decision threshold that operators care about.',
				'Fixed contracts make comparisons easier to audit across occupancy, spread, retrieval, and regression tasks.'
			],
			visuals: [
				{ label: 'Active fire', image: fireIntensity },
				{ label: 'Forecast grid', image: prelimPreds },
				{ label: 'Vegetation', image: canopy },
				{ label: 'Fire-prone scope', image: landcover }
			]
		},
		{
			title:
				'A Nationwide Benchmark for Wildfire Initial Attack Failure Prediction with Public Environmental Data',
			shortTitle: 'Wildfire IA public-data benchmark',
			date: 'June 2026',
			arxivId: '2606.15529',
			category: 'Benchmark',
			authors: 'Runyang Xu, Xueqi Cheng, Yushun Dong',
			pdfHref: 'https://arxiv.org/pdf/2606.15529',
			artifactHref: 'https://github.com/LabRAI/WildfireIA',
			artifactLabel: 'Code and cache',
			theme: 'blue',
			image: wildfireIaCard,
			imageAlt:
				'Wildfire IA diagram showing public data sources, a United States event map, discovery-time panels, and risk outputs',
			detailImage: wildfireIaSources,
			detailLabel: 'Source alignment',
			summary:
				'This paper turns initial attack failure into a reproducible national benchmark. It aligns 38,128 naturally caused FPA-FOD events with public discovery-time signals from FIRMS/VIIRS, gridMET, LANDFIRE, OpenStreetMap, and WorldPop, while excluding outcome-derived clues that would leak the answer.',
			question:
				'How far can public information available at discovery time go in flagging fires that may escape early control?',
			takeaways: [
				'Public discovery-time data contains useful early-risk signal, but it does not fully determine suppression outcome.',
				'FIRMS/VIIRS is the least redundant source under full input; fuel is the strongest static fallback signal.',
				'The benchmark fixes event units, labels, time splits, forbidden features, and metrics before comparing models.'
			],
			visuals: [
				{ label: 'Fire reports', image: publicFire },
				{ label: 'Weather', image: drought },
				{ label: 'Fuel', image: landcover },
				{ label: 'Population', image: population }
			]
		}
	];

	const gallery = [
		{
			title: 'Weather before ignition',
			image: drought,
			text: 'Recent weather and fire-danger context without turning the page into a formula sheet.'
		},
		{
			title: 'Fuel and vegetation',
			image: landcover,
			text: 'Static landscape signals that help explain why two events can diverge quickly.'
		},
		{
			title: 'Active-fire evidence',
			image: fireIntensity,
			text: 'Thermal detections as useful evidence, not the whole benchmark definition.'
		},
		{
			title: 'Community exposure',
			image: wui,
			text: 'A bridge from model output to planning questions about people and built areas.'
		},
		{
			title: 'Canopy structure',
			image: canopy,
			text: 'A readable visual cue for fuel continuity and environmental context.'
		},
		{
			title: 'Carbon and recovery',
			image: forestCarbon,
			text: 'Longer-horizon questions that sit beside immediate prediction work.'
		}
	];
</script>

<svelte:head>
	<title>Paper Notes | RAI Hazard Intelligence</title>
	<meta
		name="description"
		content="Plain-language paper notes for RAI wildfire AI research, with visual summaries and arXiv links."
	/>
</svelte:head>

<main class="notes-page">
	<header class="notes-header">
		<a class="brand" href={withBase('/')} aria-label="Back to portal">
			<img src={favicon} alt="RAI Lab" />
			<span>RAI Hazard Intelligence</span>
		</a>

		<nav class="notes-nav" aria-label="Research notes links">
			<a href={withBase('/')}><ArrowLeftOutline class="nav-icon" /> Portal</a>
			<a href="https://rai-fire.com/">FireEye</a>
			<a href="https://labrai.github.io/PyHazards/">PyHazards</a>
		</nav>
	</header>

	<div class="notes-layout">
		<div class="notes-main">
			<section class="notes-intro" aria-labelledby="notes-title">
				<p class="eyebrow">Paper notes</p>
				<h1 id="notes-title">Research Notes</h1>
				<p>
					Plain-language entries for RAI wildfire AI papers. Each note keeps the math in the
					paper, and brings forward the problem, the data, the evaluation choice, and the
					practical takeaway.
				</p>
			</section>

			<section class="paper-list" aria-label="Paper notes">
				<div class="section-heading">
					<p class="eyebrow">Featured papers</p>
					<h2>Readable research entries</h2>
				</div>

				{#each papers as paper}
					<article class={`paper-card paper-card--${paper.theme}`}>
						<div class="paper-media">
							<div class="paper-image-frame">
								<img src={paper.image} alt={paper.imageAlt} />
							</div>

							<div class="visual-grid" aria-label={`${paper.shortTitle} visual details`}>
								<figure class="detail-figure">
									<img src={paper.detailImage} alt={`${paper.detailLabel} visual`} />
									<figcaption>{paper.detailLabel}</figcaption>
								</figure>

								{#each paper.visuals as visual}
									<figure>
										<img src={visual.image} alt={`${visual.label} visual`} />
										<figcaption>{visual.label}</figcaption>
									</figure>
								{/each}
							</div>
						</div>

						<div class="paper-copy">
							<div class="meta-row">
								<span><CalendarWeekOutline class="meta-icon" /> {paper.date}</span>
								<span>{paper.category}</span>
							</div>

							<h3>{paper.title}</h3>
							<p class="authors">{paper.authors}</p>
							<p>{paper.summary}</p>

							<div class="question-box">
								<FireOutline class="question-icon" />
								<div>
									<span>Main question</span>
									<p>{paper.question}</p>
								</div>
							</div>

							<ul class="takeaways">
								{#each paper.takeaways as takeaway}
									<li><CheckCircleOutline class="check-icon" /> {takeaway}</li>
								{/each}
							</ul>

							<div class="paper-actions">
								<a href={paper.pdfHref} target="_blank" rel="noreferrer">
									<FilePdfOutline class="action-icon" />
									Read PDF
								</a>
								<a href={paper.artifactHref} target="_blank" rel="noreferrer">
									{#if paper.artifactHref.includes('github.com')}
										<GithubSolid class="action-icon" />
									{:else}
										<DatabaseOutline class="action-icon" />
									{/if}
									{paper.artifactLabel}
									<ArrowUpRightFromSquareOutline class="action-icon action-icon--small" />
								</a>
							</div>
						</div>
					</article>
				{/each}
			</section>

			<section class="gallery-section" aria-label="Visual idea gallery">
				<div class="section-heading">
					<p class="eyebrow">Visual wall</p>
					<h2>Image-heavy reading cues</h2>
				</div>

				<div class="gallery-grid">
					{#each gallery as item}
						<article class="gallery-item">
							<img src={item.image} alt={`${item.title} visual`} />
							<div>
								<h3>{item.title}</h3>
								<p>{item.text}</p>
							</div>
						</article>
					{/each}
				</div>
			</section>

			<section class="prompt-panel" aria-label="Image generation briefs">
				<FileImageOutline class="prompt-icon" />
				<div>
					<p class="eyebrow">Visual archive</p>
					<h2>Paper figures are now folded into the notes</h2>
					<p>
						The page uses the strongest uploaded figures for the two current entries, with
						supporting environmental layers kept as quick visual cues for skimming.
					</p>
				</div>
				<a href={withBase('/')}>
					Back to hub
					<ArrowRightOutline class="inline-icon" />
				</a>
			</section>
		</div>

		<aside class="notes-rail" aria-label="Research note visual summary">
			<div class="hero-showcase">
				<img
					src={researchNotesHero}
					alt="Layered wildfire AI research visual with satellite fire detections, weather, land cover, and evaluation charts"
				/>
			</div>
			<div class="hero-note">
				<FileImageOutline class="hero-icon" />
				<div>
					<span>Visual-first summaries</span>
					<strong>2 papers ready, more can drop in cleanly</strong>
				</div>
			</div>

			<div class="hero-strip" aria-label="Paper note highlights">
				<article>
					<BookOpenOutline class="strip-icon strip-icon--red" />
					<div>
						<h2>Blog, not lecture notes</h2>
						<p>Short summaries, decision context, and links back to the full technical papers.</p>
					</div>
				</article>

				<article>
					<LayersOutline class="strip-icon" />
					<div>
						<h2>Data-first visuals</h2>
						<p>Images foreground weather, fuel, active fire, population, and evaluation artifacts.</p>
					</div>
				</article>

				<article>
					<GlobeOutline class="strip-icon strip-icon--green" />
					<div>
						<h2>Reusable format</h2>
						<p>
							Each future paper can follow the same summary, question, takeaway, and image pattern.
						</p>
					</div>
				</article>
			</div>
		</aside>
	</div>
</main>

<style>
	:global(body) {
		background: #f4f7f8;
	}

	.notes-page {
		min-height: 100dvh;
		color: #17221f;
		background:
			linear-gradient(180deg, rgb(255 255 255 / 92%), rgb(244 247 248 / 98%)),
			repeating-linear-gradient(90deg, rgb(41 109 152 / 7%) 0 1px, transparent 1px 96px);
		font-family: Montserrat, Jura, sans-serif;
	}

	.notes-header {
		display: flex;
		min-height: 76px;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding: 18px 44px;
		border-bottom: 1px solid rgb(23 34 31 / 12%);
		background: rgb(255 255 255 / 88%);
		backdrop-filter: blur(18px);
	}

	.brand,
	.notes-nav,
	.notes-nav a,
	.paper-actions a,
	.prompt-panel a {
		display: inline-flex;
		align-items: center;
	}

	.brand {
		gap: 12px;
		color: #17221f;
		font-size: 1rem;
		font-weight: 700;
		text-decoration: none;
	}

	.brand img {
		width: 54px;
		height: 32px;
		object-fit: contain;
	}

	.notes-nav {
		gap: 6px;
	}

	.notes-nav a {
		min-height: 38px;
		gap: 7px;
		padding: 10px 14px;
		border-radius: 6px;
		color: #344541;
		font-size: 0.92rem;
		font-weight: 650;
		text-decoration: none;
	}

	.notes-nav a:hover,
	.prompt-panel a:hover {
		background: #e6eef0;
		color: #0c2e28;
	}

	.notes-layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(300px, 360px);
		gap: 24px;
		align-items: start;
		max-width: 1440px;
		margin: 0 auto;
		padding: 26px 44px 52px;
	}

	.notes-main {
		display: grid;
		gap: 18px;
		min-width: 0;
	}

	.notes-intro {
		max-width: 790px;
		padding-top: 8px;
	}

	.eyebrow {
		margin: 0 0 10px;
		color: #286a5a;
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0;
	}

	h1,
	h2,
	h3,
	p {
		margin-top: 0;
	}

	h1 {
		margin-bottom: 18px;
		font-size: 3.45rem;
		line-height: 1.04;
		font-weight: 800;
	}

	.notes-intro p:last-child {
		max-width: 700px;
		margin-bottom: 0;
		color: #536360;
		font-size: 1.08rem;
		line-height: 1.7;
	}

	.notes-rail {
		position: sticky;
		top: 16px;
		display: grid;
		gap: 10px;
		min-width: 0;
		align-self: start;
	}

	.hero-showcase {
		overflow: hidden;
		border-radius: 8px;
		background: #ffffff;
		box-shadow: 0 18px 42px rgb(23 34 31 / 14%);
	}

	.hero-showcase img {
		width: 100%;
		aspect-ratio: 1.52;
		object-fit: cover;
		display: block;
	}

	.hero-note {
		display: grid;
		grid-template-columns: 34px minmax(0, 1fr);
		gap: 12px;
		align-items: center;
		border-left: 5px solid #bd3b2f;
		background: #ffffff;
		padding: 12px 14px;
		box-shadow: 0 18px 42px rgb(23 34 31 / 10%);
	}

	:global(.hero-icon) {
		width: 30px;
		height: 30px;
		color: #bd3b2f;
	}

	.hero-note span {
		display: block;
		margin-bottom: 3px;
		color: #536360;
		font-size: 0.82rem;
		font-weight: 700;
	}

	.hero-note strong {
		font-size: 1rem;
		line-height: 1.25;
	}

	.hero-strip {
		display: grid;
		overflow: hidden;
		border: 1px solid rgb(23 34 31 / 12%);
		border-radius: 8px;
		background: #ffffff;
		box-shadow: 0 12px 28px rgb(23 34 31 / 8%);
	}

	.hero-strip article {
		display: grid;
		grid-template-columns: 30px minmax(0, 1fr);
		gap: 12px;
		align-items: start;
		border-bottom: 1px solid rgb(23 34 31 / 10%);
		padding: 13px 14px;
	}

	.hero-strip article:last-child {
		border-bottom: 0;
	}

	:global(.strip-icon),
	:global(.prompt-icon) {
		width: 30px;
		height: 30px;
		color: #296d98;
	}

	:global(.strip-icon--red) {
		color: #bd3b2f;
	}

	:global(.strip-icon--green) {
		color: #286a5a;
	}

	.section-heading h2,
	.prompt-panel h2 {
		margin-bottom: 6px;
		font-size: 1.32rem;
		line-height: 1.2;
		font-weight: 800;
	}

	.hero-strip p,
	.prompt-panel p {
		margin-bottom: 0;
		color: #536360;
		font-size: 0.92rem;
		line-height: 1.55;
	}

	.paper-list,
	.gallery-section {
		display: grid;
		gap: 14px;
		padding: 0;
	}

	.paper-card {
		display: grid;
		grid-template-columns: minmax(240px, 0.58fr) minmax(0, 1fr);
		overflow: hidden;
		border: 1px solid rgb(23 34 31 / 12%);
		border-radius: 8px;
		background: #ffffff;
		box-shadow: 0 18px 40px rgb(23 34 31 / 10%);
	}

	.paper-media {
		display: grid;
		grid-template-rows: auto auto;
		gap: 8px;
		align-content: start;
		background: #edf3f2;
		padding: 14px;
	}

	.paper-card--red .paper-media {
		background: #f7eeee;
	}

	.paper-card--blue .paper-media {
		background: #edf3f7;
	}

	.paper-image-frame {
		overflow: hidden;
		border-radius: 8px;
		background: #ffffff;
		box-shadow: 0 18px 40px rgb(23 34 31 / 14%);
	}

	.paper-image-frame img {
		width: 100%;
		aspect-ratio: 2.08;
		object-fit: cover;
		display: block;
	}

	.visual-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 7px;
	}

	.visual-grid figure {
		display: grid;
		gap: 6px;
		margin: 0;
	}

	.visual-grid img {
		width: 100%;
		aspect-ratio: 1.24;
		object-fit: cover;
		border-radius: 7px;
		background: #ffffff;
		box-shadow: inset 0 0 0 1px rgb(23 34 31 / 8%);
	}

	.detail-figure {
		grid-column: span 2;
	}

	.detail-figure img {
		aspect-ratio: 1.72;
	}

	.visual-grid figcaption {
		color: #344541;
		font-size: 0.84rem;
		font-weight: 750;
	}

	.paper-copy {
		display: grid;
		align-content: start;
		padding: 20px 22px;
	}

	.meta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 12px;
		color: #286a5a;
		font-size: 0.8rem;
		font-weight: 800;
	}

	.meta-row span {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: 28px;
		border-radius: 6px;
		background: #eaf2f0;
		padding: 6px 8px;
	}

	.paper-card--red .meta-row span {
		color: #8c2b24;
		background: #fae9e7;
	}

	.paper-card--blue .meta-row span {
		color: #1f638d;
		background: #e8f2f7;
	}

	:global(.meta-icon),
	:global(.check-icon),
	:global(.action-icon),
	:global(.inline-icon),
	:global(.question-icon),
	:global(.nav-icon) {
		flex: 0 0 auto;
	}

	:global(.meta-icon) {
		width: 14px;
		height: 14px;
	}

	.paper-copy h3 {
		margin-bottom: 8px;
		font-size: 1.52rem;
		line-height: 1.15;
		font-weight: 800;
	}

	.authors {
		margin-bottom: 12px;
		color: #286a5a;
		font-size: 0.92rem;
		font-weight: 750;
		line-height: 1.45;
	}

	.paper-copy > p:not(.authors),
	.question-box p,
	.gallery-item p {
		margin-bottom: 0;
		color: #536360;
		font-size: 0.98rem;
		line-height: 1.66;
	}

	.question-box {
		display: grid;
		grid-template-columns: 34px minmax(0, 1fr);
		gap: 12px;
		margin-top: 14px;
		border-left: 4px solid #bd3b2f;
		background: #fbf5f4;
		padding: 14px 16px;
	}

	.paper-card--blue .question-box {
		border-left-color: #296d98;
		background: #f1f7fa;
	}

	:global(.question-icon) {
		width: 24px;
		height: 24px;
		color: #bd3b2f;
	}

	.paper-card--blue :global(.question-icon) {
		color: #296d98;
	}

	.question-box span {
		display: block;
		margin-bottom: 4px;
		color: #17221f;
		font-size: 0.82rem;
		font-weight: 800;
		text-transform: uppercase;
	}

	.takeaways {
		display: grid;
		gap: 8px;
		margin: 14px 0 0;
		padding: 0;
		list-style: none;
	}

	.takeaways li {
		display: grid;
		grid-template-columns: 18px minmax(0, 1fr);
		gap: 10px;
		color: #344541;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	:global(.check-icon) {
		width: 18px;
		height: 18px;
		color: #286a5a;
	}

	.paper-card--red :global(.check-icon) {
		color: #bd3b2f;
	}

	.paper-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 16px;
		padding-top: 0;
	}

	.paper-actions a,
	.prompt-panel a {
		min-height: 42px;
		gap: 8px;
		border: 1px solid rgb(23 34 31 / 12%);
		border-radius: 6px;
		background: #ffffff;
		padding: 10px 13px;
		color: #17221f;
		font-size: 0.92rem;
		font-weight: 800;
		text-decoration: none;
	}

	.paper-actions a:hover {
		border-color: rgb(23 34 31 / 26%);
		background: #f3f7f7;
	}

	:global(.action-icon) {
		width: 18px;
		height: 18px;
	}

	:global(.action-icon--small),
	:global(.inline-icon),
	:global(.nav-icon) {
		width: 15px;
		height: 15px;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}

	.gallery-item {
		display: grid;
		grid-template-columns: 68px minmax(0, 1fr);
		gap: 12px;
		align-items: center;
		border: 1px solid rgb(23 34 31 / 12%);
		border-radius: 8px;
		background: #ffffff;
		padding: 14px;
	}

	.gallery-item img {
		width: 62px;
		height: 62px;
		object-fit: cover;
		border-radius: 7px;
	}

	.gallery-item h3 {
		margin-bottom: 6px;
		font-size: 0.98rem;
		line-height: 1.2;
		font-weight: 800;
	}

	.gallery-item p {
		font-size: 0.88rem;
		line-height: 1.55;
	}

	.prompt-panel {
		display: grid;
		grid-template-columns: 42px minmax(0, 1fr) auto;
		gap: 18px;
		align-items: center;
		border: 1px solid rgb(23 34 31 / 12%);
		border-left: 5px solid #286a5a;
		border-radius: 8px;
		background: #ffffff;
		padding: 18px 20px;
		box-shadow: 0 16px 34px rgb(23 34 31 / 8%);
	}

	@media (max-width: 1060px) {
		.notes-header,
		.notes-layout {
			padding-right: 24px;
			padding-left: 24px;
		}

		.notes-layout,
		.paper-card,
		.prompt-panel {
			grid-template-columns: 1fr;
		}

		.notes-rail {
			position: static;
			grid-row: 1;
			grid-template-columns: minmax(0, 1fr) minmax(280px, 0.78fr);
			align-items: start;
		}

		.gallery-grid {
			grid-template-columns: 1fr;
		}

		h1 {
			font-size: 2.7rem;
		}
	}

	@media (max-width: 640px) {
		.notes-header {
			min-height: auto;
			flex-direction: column;
			align-items: flex-start;
			gap: 14px;
			padding-top: 16px;
			padding-bottom: 14px;
		}

		.notes-nav {
			width: 100%;
			justify-content: space-between;
		}

		.notes-nav a {
			padding-right: 8px;
			padding-left: 8px;
			font-size: 0.86rem;
		}

		.notes-layout {
			padding-top: 24px;
			padding-bottom: 36px;
		}

		.notes-main {
			gap: 16px;
		}

		h1 {
			font-size: 2.24rem;
		}

		.notes-intro p:last-child {
			font-size: 1rem;
		}

		.notes-rail {
			grid-template-columns: 1fr;
		}

		.hero-showcase img {
			aspect-ratio: 1.45;
		}

		.hero-strip article {
			grid-template-columns: 26px minmax(0, 1fr);
			gap: 10px;
			padding: 12px 13px;
		}

		.hero-note {
			grid-template-columns: 30px minmax(0, 1fr);
		}

		.paper-media,
		.paper-copy {
			padding: 18px;
		}

		.paper-copy h3 {
			font-size: 1.45rem;
		}

		.paper-image-frame img {
			aspect-ratio: 1.72;
		}

		.visual-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.detail-figure {
			grid-column: 1 / -1;
		}

		.visual-grid img {
			aspect-ratio: 1.18;
		}

		.detail-figure img {
			aspect-ratio: 1.55;
		}

		.question-box {
			grid-template-columns: 1fr;
		}

		.gallery-item {
			grid-template-columns: 70px minmax(0, 1fr);
			gap: 12px;
			padding: 16px;
		}

		.gallery-item img {
			width: 62px;
			height: 62px;
		}

		.prompt-panel {
			align-items: start;
		}
	}
</style>
