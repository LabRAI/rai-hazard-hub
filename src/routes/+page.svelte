<script lang="ts">
	import PageViewMap from '$lib/components/sidebar/pageViewMap.svelte';
	import favicon from '$lib/assets/favicon.png';
	import fireeyeImage from '$lib/assets/portal/fireeye.png';
	import pyhazardsImage from '$lib/assets/portal/pyhazards.png';
	import researchNotesImage from '$lib/assets/portal/research-notes.png';
	import { withBase } from '$lib/paths';
	import {
		ArrowRightOutline,
		ArrowUpRightFromSquareOutline,
		BookOpenOutline,
		ChartLineUpOutline,
		FireOutline
	} from 'flowbite-svelte-icons';

	type PortalEntry = {
		title: string;
		kicker: string;
		description: string;
		href: string;
		action: string;
		external?: boolean;
		accent: 'green' | 'red' | 'blue';
		image: string;
		icon: typeof BookOpenOutline;
		items: string[];
	};

	type ContributorBlock = {
		title: string;
		kicker: string;
		text: string;
	};

	type FooterLink = {
		label: string;
		href: string;
		external?: boolean;
	};

	const entries: PortalEntry[] = [
		{
			title: 'Research Notes',
			kicker: 'Paper blog',
			description:
				'Readable paper notes on wildfire data, model evaluation, public benchmarks, and field use.',
			href: withBase('/research-notes/'),
			action: 'Read notes',
			accent: 'green',
			image: researchNotesImage,
			icon: BookOpenOutline,
			items: ['Paper summaries', 'Visual explainers', 'Source links']
		},
		{
			title: 'RAI FireEye',
			kicker: 'Operational map',
			description:
				'Explore wildfire layers, active fire context, FireWxFM forecasts, and geospatial intelligence.',
			href: 'https://rai-fire.com/',
			action: 'Open FireEye',
			external: true,
			accent: 'red',
			image: fireeyeImage,
			icon: FireOutline,
			items: ['Interactive map', 'Risk overlays', 'Forecast matching']
		},
		{
			title: 'PyHazards',
			kicker: 'Lab documentation',
			description:
				'Go to the RAI Lab documentation for hazard datasets, model adapters, and Python workflows.',
			href: 'https://labrai.github.io/PyHazards/',
			action: 'Open docs',
			external: true,
			accent: 'blue',
			image: pyhazardsImage,
			icon: ChartLineUpOutline,
			items: ['Datasets', 'Models', 'Quick start']
		}
	];

	const contributorBlocks: ContributorBlock[] = [
		{
			title: 'RAI Lab',
			kicker: 'Research home',
			text: 'Wildfire and hazard AI research, benchmark design, geospatial engineering, and public-facing tool development.'
		},
		{
			title: 'Paper Authors',
			kicker: 'Current notes',
			text: 'Yangshuang Xu, Yuyang Dai, Liling Chang, Qi Wang, Runyang Xu, Xueqi Cheng, and Yushun Dong.'
		},
		{
			title: 'Open Resources',
			kicker: 'Data and tools',
			text: 'FireEye, PyHazards, arXiv papers, and public environmental layers for weather, fuel, fire activity, and exposure.'
		}
	];

	const footerLinks: FooterLink[] = [
		{ label: 'Research Notes', href: withBase('/research-notes/') },
		{ label: 'RAI FireEye', href: 'https://rai-fire.com/', external: true },
		{ label: 'PyHazards', href: 'https://labrai.github.io/PyHazards/', external: true },
		{ label: 'Lab GitHub', href: 'https://github.com/LabRAI', external: true }
	];
</script>

<svelte:head>
	<title>RAI Hazard Intelligence Hub</title>
	<meta
		name="description"
		content="A three-part portal for research notes, RAI FireEye, and PyHazards documentation."
	/>
</svelte:head>

<main class="portal-page">
	<header class="portal-header">
		<a class="brand" href={withBase('/')} aria-label="Open RAI FireEye">
			<img src={favicon} alt="RAI Lab" />
			<span>RAI Hazard Intelligence</span>
		</a>

		<nav class="portal-nav" aria-label="Primary links">
			<a href={withBase('/research-notes/')}>Notes</a>
			<a href="https://rai-fire.com/">FireEye</a>
			<a href="https://labrai.github.io/PyHazards/">PyHazards</a>
		</nav>
	</header>

	<section class="portal-hero" aria-labelledby="portal-title">
		<div class="portal-copy">
			<p class="eyebrow">Wildfire and multi-hazard AI resources</p>
			<h1 id="portal-title">RAI Hazard Intelligence Hub</h1>
			<p>
				One quiet front door for readable paper notes, the FireEye map, and the PyHazards lab
				documentation.
			</p>
		</div>
	</section>

	<section class="entry-grid" aria-label="Site destinations">
		{#each entries as entry}
			<a class={`entry-card entry-card--${entry.accent}`} href={entry.href}>
				<div class="entry-media" aria-hidden="true">
					<img src={entry.image} alt="" />
					<svelte:component this={entry.icon} class="entry-icon" />
				</div>

				<div class="entry-body">
					<span class="entry-kicker">{entry.kicker}</span>
					<h2>{entry.title}</h2>
					<p>{entry.description}</p>
				</div>

				<ul class="entry-list" aria-label={`${entry.title} highlights`}>
					{#each entry.items as item}
						<li>{item}</li>
					{/each}
				</ul>

				<span class="entry-action">
					{entry.action}
					{#if entry.external}
						<ArrowUpRightFromSquareOutline class="action-icon" />
					{:else}
						<ArrowRightOutline class="action-icon" />
					{/if}
				</span>
			</a>
		{/each}
	</section>

	<footer class="contributors-section" aria-labelledby="contributors-title">
		<div class="footer-bank">
			<div class="contributors-copy">
				<div class="section-heading">
					<p class="eyebrow">Contributors</p>
					<h2 id="contributors-title">People, Papers, and Open Tools</h2>
					<p>
						This hub ties together RAI Lab research notes, live wildfire intelligence, and reusable
						hazard AI documentation.
					</p>
				</div>

				<div class="contributor-grid">
					{#each contributorBlocks as block}
						<article class="contributor-card">
							<span>{block.kicker}</span>
							<h3>{block.title}</h3>
							<p>{block.text}</p>
						</article>
					{/each}
				</div>
			</div>

			<PageViewMap variant="hub" />
		</div>

		<div class="footer-bar">
			<p>RAI Hazard Intelligence Hub</p>
			<nav aria-label="Footer links">
				{#each footerLinks as link}
					<a
						href={link.href}
						target={link.external ? '_blank' : undefined}
						rel={link.external ? 'noreferrer' : undefined}
					>
						{link.label}
						{#if link.external}
							<ArrowUpRightFromSquareOutline class="footer-link-icon" />
						{:else}
							<ArrowRightOutline class="footer-link-icon" />
						{/if}
					</a>
				{/each}
			</nav>
		</div>
	</footer>
</main>

<style>
	:global(body) {
		background: #f3f6f7;
	}

	.portal-page {
		min-height: 100dvh;
		color: #182321;
		background:
			linear-gradient(180deg, rgb(255 255 255 / 86%), rgb(243 246 247 / 94%)),
			repeating-linear-gradient(90deg, rgb(31 79 67 / 8%) 0 1px, transparent 1px 88px);
		font-family: Montserrat, Jura, sans-serif;
	}

	.portal-header {
		display: flex;
		min-height: 76px;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding: 18px 44px;
		border-bottom: 1px solid rgb(24 35 33 / 12%);
		background: rgb(255 255 255 / 88%);
		backdrop-filter: blur(18px);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		color: #182321;
		font-size: 1rem;
		font-weight: 700;
		text-decoration: none;
	}

	.brand img {
		width: 54px;
		height: 32px;
		object-fit: contain;
	}

	.portal-nav {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.portal-nav a {
		min-height: 38px;
		padding: 10px 14px;
		border-radius: 6px;
		color: #344541;
		font-size: 0.92rem;
		font-weight: 650;
		text-decoration: none;
	}

	.portal-nav a:hover {
		background: #e6eef0;
		color: #0c2e28;
	}

	.portal-hero {
		display: flex;
		justify-content: center;
		padding: 34px 44px 24px;
		text-align: center;
	}

	.portal-copy {
		max-width: 980px;
	}

	.eyebrow,
	.entry-kicker {
		margin: 0;
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
		margin-bottom: 16px;
		font-size: 3.5rem;
		line-height: 1.02;
		font-weight: 800;
	}

	.portal-copy p:last-child {
		margin-bottom: 0;
		color: #536360;
		font-size: 1.08rem;
		line-height: 1.7;
		white-space: nowrap;
	}

	.entry-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 18px;
		padding: 0 44px 30px;
	}

	.entry-card {
		display: grid;
		min-height: 500px;
		grid-template-rows: 220px auto minmax(58px, auto) 54px;
		overflow: hidden;
		border: 1px solid rgb(24 35 33 / 12%);
		border-radius: 8px;
		background: #ffffff;
		color: #182321;
		text-decoration: none;
		box-shadow: 0 18px 40px rgb(24 35 33 / 10%);
		transition:
			transform 160ms ease,
			box-shadow 160ms ease,
			border-color 160ms ease;
	}

	.entry-card:hover {
		transform: translateY(-4px);
		border-color: rgb(24 35 33 / 24%);
		box-shadow: 0 24px 56px rgb(24 35 33 / 16%);
	}

	.entry-media {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: linear-gradient(135deg, rgb(24 35 33 / 8%), rgb(255 255 255 / 40%)), #edf3f2;
	}

	.entry-card--red .entry-media {
		background: linear-gradient(135deg, rgb(189 59 47 / 16%), rgb(255 255 255 / 46%)), #f7eeee;
	}

	.entry-card--blue .entry-media {
		background: linear-gradient(135deg, rgb(41 109 152 / 16%), rgb(255 255 255 / 46%)), #edf3f7;
	}

	.entry-media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		transition: transform 180ms ease;
	}

	.entry-card:hover .entry-media img {
		transform: scale(1.035);
	}

	.entry-media::after {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 54%, rgb(24 35 33 / 14%));
		content: '';
	}

	:global(.entry-icon) {
		position: absolute;
		right: 20px;
		bottom: 20px;
		z-index: 1;
		width: 44px;
		height: 44px;
		border: 1px solid rgb(255 255 255 / 72%);
		border-radius: 8px;
		background: rgb(255 255 255 / 86%);
		padding: 10px;
		color: #286a5a;
		box-shadow: 0 14px 30px rgb(24 35 33 / 18%);
		backdrop-filter: blur(12px);
	}

	.entry-card--red :global(.entry-icon) {
		color: #bd3b2f;
	}

	.entry-card--blue :global(.entry-icon) {
		color: #296d98;
	}

	.entry-body {
		padding: 24px 24px 8px;
	}

	.entry-body h2 {
		margin: 8px 0 12px;
		font-size: 2rem;
		line-height: 1.08;
		font-weight: 800;
	}

	.entry-body p {
		margin-bottom: 0;
		color: #536360;
		font-size: 1rem;
		line-height: 1.65;
	}

	.entry-list {
		display: grid;
		align-content: end;
		gap: 6px;
		margin: 0;
		padding: 8px 24px 20px;
		color: #31403d;
		font-size: 0.92rem;
		font-weight: 650;
		list-style: none;
	}

	.entry-list li {
		position: relative;
		padding-left: 16px;
	}

	.entry-list li::before {
		position: absolute;
		top: 0.64em;
		left: 0;
		width: 6px;
		height: 6px;
		border-radius: 99px;
		background: #286a5a;
		content: '';
	}

	.entry-card--red .entry-list li::before {
		background: #bd3b2f;
	}

	.entry-card--blue .entry-list li::before {
		background: #296d98;
	}

	.entry-action {
		display: flex;
		min-height: 54px;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid rgb(24 35 33 / 10%);
		padding: 0 22px 0 24px;
		color: #182321;
		font-size: 0.96rem;
		font-weight: 800;
	}

	:global(.action-icon) {
		width: 20px;
		height: 20px;
	}

	.contributors-section {
		padding: 0 44px 34px;
	}

	.footer-bank {
		--footer-top-bank-height: 122px;

		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(420px, 1fr);
		gap: 14px;
		align-items: stretch;
	}

	.contributors-copy {
		display: grid;
		grid-template-rows: minmax(var(--footer-top-bank-height), auto) minmax(0, 1fr);
		gap: 12px;
		min-width: 0;
		height: 100%;
	}

	.section-heading {
		max-width: 760px;
		margin-bottom: 4px;
		border: 1px solid rgb(24 35 33 / 12%);
		border-left: 5px solid #286a5a;
		border-radius: 8px;
		background: #ffffff;
		padding: 18px 20px;
		box-shadow: 0 14px 28px rgb(24 35 33 / 7%);
	}

	.section-heading h2 {
		margin: 4px 0 8px;
		font-size: 1.42rem;
		line-height: 1.12;
		font-weight: 800;
	}

	.section-heading p:last-child {
		margin-bottom: 0;
		color: #536360;
		font-size: 1rem;
		line-height: 1.65;
	}

	.contributor-grid {
		display: grid;
		grid-template-rows: repeat(3, minmax(0, 1fr));
		gap: 10px;
		min-height: 0;
	}

	.contributor-card {
		display: grid;
		grid-template-columns: minmax(116px, 0.34fr) minmax(0, 1fr);
		column-gap: 14px;
		row-gap: 6px;
		align-content: start;
		border: 1px solid rgb(24 35 33 / 12%);
		border-radius: 8px;
		background: #ffffff;
		padding: 16px 18px;
		box-shadow: 0 16px 34px rgb(24 35 33 / 8%);
	}

	.contributor-card span {
		color: #286a5a;
		font-size: 0.76rem;
		font-weight: 800;
		text-transform: uppercase;
	}

	.contributor-card h3 {
		margin-bottom: 0;
		font-size: 1.08rem;
		line-height: 1.2;
		font-weight: 800;
	}

	.contributor-card p {
		grid-column: 2;
		grid-row: 1 / span 2;
		margin-bottom: 0;
		color: #536360;
		font-size: 0.9rem;
		line-height: 1.48;
	}

	.footer-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18px;
		margin-top: 12px;
		border: 1px solid rgb(24 35 33 / 12%);
		border-left: 5px solid #286a5a;
		border-radius: 8px;
		background: #ffffff;
		padding: 14px 18px;
		box-shadow: 0 14px 28px rgb(24 35 33 / 7%);
	}

	.footer-bar p {
		margin-bottom: 0;
		color: #182321;
		font-size: 0.96rem;
		font-weight: 800;
	}

	.footer-bar nav {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		justify-content: flex-end;
	}

	.footer-bar a {
		display: inline-flex;
		min-height: 38px;
		align-items: center;
		gap: 7px;
		border: 1px solid rgb(24 35 33 / 12%);
		border-radius: 6px;
		background: #ffffff;
		padding: 9px 11px;
		color: #182321;
		font-size: 0.84rem;
		font-weight: 800;
		text-decoration: none;
	}

	.footer-bar a:hover {
		background: #e6eef0;
	}

	:global(.footer-link-icon) {
		width: 15px;
		height: 15px;
		flex: 0 0 auto;
	}

	.footer-bank :global(.visitor-map-panel--hub) {
		grid-template-rows: minmax(var(--footer-top-bank-height), auto) minmax(0, 1fr);
		grid-template-columns: 1fr;
		gap: 10px;
		height: 100%;
	}

	.footer-bank :global(.visitor-map-copy) {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 12px;
		align-items: center;
		padding: 14px 16px;
	}

	.footer-bank :global(.visitor-map-copy > :first-child) {
		min-width: 0;
	}

	.footer-bank :global(.visitor-stat-grid) {
		grid-template-columns: repeat(3, 74px);
		gap: 7px;
		align-self: center;
	}

	.footer-bank :global(.visitor-map-copy h2) {
		margin-bottom: 6px;
		font-size: 1.3rem;
	}

	.footer-bank :global(.visitor-map-copy p) {
		font-size: 0.86rem;
		line-height: 1.42;
	}

	.footer-bank :global(.visitor-eyebrow) {
		margin-bottom: 6px;
		font-size: 0.7rem;
	}

	.footer-bank :global(.visitor-stat-grid div) {
		gap: 3px;
		border-left-width: 3px;
		padding: 9px 8px;
	}

	.footer-bank :global(.visitor-stat-grid strong) {
		font-size: 1.05rem;
	}

	.footer-bank :global(.visitor-stat-grid span) {
		font-size: 0.6rem;
		line-height: 1.15;
	}

	.footer-bank :global(.visitor-map-card) {
		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto;
		min-height: 0;
	}

	.footer-bank :global(.visitor-map-panel--hub .visitor-map) {
		height: 14.25rem;
	}

	.footer-bank :global(.visitor-map-card-header) {
		min-height: 44px;
		padding: 9px 14px;
	}

	.footer-bank :global(.visitor-map-card-header strong) {
		font-size: 0.9rem;
	}

	.footer-bank :global(.visitor-total-pill) {
		padding: 6px 8px;
	}

	.footer-bank :global(.visitor-location-list) {
		grid-template-columns: repeat(5, minmax(0, 1fr));
	}

	.footer-bank :global(.visitor-location-list div) {
		padding: 8px 10px;
		border-bottom: 0;
		border-right: 1px solid rgb(24 35 33 / 10%);
	}

	.footer-bank :global(.visitor-location-list span) {
		font-size: 0.78rem;
	}

	.footer-bank :global(.visitor-location-list strong) {
		font-size: 0.68rem;
	}

	@media (max-width: 980px) {
		.portal-header,
		.portal-hero,
		.entry-grid,
		.contributors-section {
			padding-right: 24px;
			padding-left: 24px;
		}

		.portal-hero {
			padding-top: 34px;
		}

		h1 {
			font-size: 2.7rem;
		}

		.entry-grid {
			grid-template-columns: 1fr;
		}

		.contributor-grid {
			grid-template-columns: 1fr;
		}

		.footer-bank {
			--footer-top-bank-height: auto;

			grid-template-columns: 1fr;
		}

		.footer-bar {
			align-items: flex-start;
			flex-direction: column;
		}

		.footer-bar nav {
			justify-content: flex-start;
		}

		.entry-card {
			min-height: 360px;
			grid-template-columns: 260px minmax(0, 1fr);
			grid-template-rows: auto auto 58px;
		}

		.entry-media {
			grid-row: 1 / 4;
			min-height: 100%;
		}

		.entry-list {
			align-content: start;
		}

		.entry-action {
			grid-column: 2;
		}
	}

	@media (max-width: 640px) {
		.portal-header {
			min-height: auto;
			flex-direction: column;
			align-items: flex-start;
			gap: 14px;
			padding-top: 16px;
			padding-bottom: 14px;
		}

		.portal-nav {
			width: 100%;
			justify-content: space-between;
		}

		.portal-nav a {
			padding-right: 8px;
			padding-left: 8px;
			font-size: 0.86rem;
		}

		.portal-hero {
			padding-top: 28px;
		}

		h1 {
			font-size: 2.25rem;
		}

		.portal-copy p:last-child {
			font-size: 0.53rem;
		}

		.entry-card {
			grid-template-columns: 1fr;
			grid-template-rows: 210px auto minmax(64px, auto) 58px;
		}

		.entry-media {
			grid-row: auto;
		}

		.entry-media img {
			width: 100%;
			height: 100%;
		}

		.entry-body {
			padding: 24px 22px 8px;
		}

		.entry-body h2 {
			font-size: 1.65rem;
		}

		.entry-list {
			padding: 10px 22px 22px;
		}

		.entry-action {
			grid-column: auto;
			padding-right: 20px;
			padding-left: 22px;
		}

		.section-heading h2 {
			font-size: 1.6rem;
		}

		.footer-bank :global(.visitor-map-copy) {
			grid-template-columns: 1fr;
		}

		.footer-bank :global(.visitor-stat-grid) {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.footer-bank :global(.visitor-map-panel--hub .visitor-map) {
			height: 12rem;
		}

		.footer-bank :global(.visitor-location-list) {
			grid-template-columns: 1fr;
		}

		.footer-bank :global(.visitor-location-list div) {
			border-right: 0;
		}
	}
</style>
