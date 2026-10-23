<script lang="ts">
  import {
    PlaySolid,
    CloseOutline,
    ArrowUpRightFromSquareOutline,
  } from "flowbite-svelte-icons";
  import { tick } from "svelte";
  import { youtubeId } from "$lib/science/youtube.js";
  let {
    title,
    description,
    youtubeUrl,
    poster,
    theme = "hazard",
  }: {
    title: string;
    description: string;
    youtubeUrl: string | null;
    poster?: string;
    theme?: string;
  } = $props();
  const video = $derived(youtubeId(youtubeUrl));
  let playing = $state(false);
  let playButton = $state<HTMLButtonElement>();
  let closeButton = $state<HTMLButtonElement>();
  async function start() {
    playing = true;
    await tick();
    closeButton?.focus();
  }
  async function stop() {
    playing = false;
    await tick();
    playButton?.focus();
  }
</script>

<div class="hub-film" class:health={theme === "health"}>
  {#if playing && video}
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${video}?autoplay=1&rel=0`}
      {title}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowfullscreen
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
    <button
      bind:this={closeButton}
      class="close-film"
      type="button"
      aria-label="Close video"
      title="Close video"
      onclick={stop}><CloseOutline /></button
    >
  {:else}
    {#if poster}<img
        class="film-poster"
        src={poster}
        alt=""
        loading="lazy"
        width="1800"
        height="1013"
      />{/if}
    <div class="film-shade"></div>
    <div class="film-heading">
      <span class="film-label">Research in focus</span><span class="film-status"
        >{video ? "Research film" : "Film forthcoming"}</span
      >
    </div>
    {#if video}<button
        bind:this={playButton}
        class="play-film"
        type="button"
        aria-label={`Play ${title}`}
        title={`Play ${title}`}
        onclick={start}><PlaySolid /></button
      >{/if}
    <div class="film-copy">
      <h3>{title}</h3>
      <p>{description}</p>
      {#if video && youtubeUrl}<a href={youtubeUrl}
          >Watch on YouTube <ArrowUpRightFromSquareOutline /></a
        >{/if}
    </div>
  {/if}
</div>

<style>
  .hub-film {
    position: relative;
    width: 100%;
    min-width: 0;
    isolation: isolate;
    aspect-ratio: 2.8;
    background: #253b38;
    color: #fff;
    overflow: hidden;
  }
  .film-poster,
  .film-shade,
  iframe {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
  }
  .film-poster {
    object-fit: cover;
    object-position: center 48%;
    z-index: -2;
  }
  .health .film-poster {
    object-position: 76% center;
  }
  .film-shade {
    z-index: -1;
    background: linear-gradient(
      90deg,
      #111e1ae8 0%,
      #111e1a9e 35%,
      #111e1a15 68%
    );
  }
  .health .film-shade {
    background: linear-gradient(
      90deg,
      #141e27ee 0%,
      #141e2799 36%,
      #141e2700 70%
    );
  }
  .film-heading {
    position: absolute;
    inset: 24px 30px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .film-label {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 650;
  }
  .film-status {
    font-size: 11px;
    padding: 4px 9px;
    background: #14221bd4;
    color: #fff;
    border: 1px solid #ffffff52;
  }
  .film-copy {
    position: absolute;
    bottom: 34px;
    left: 34px;
    max-width: 480px;
    width: calc(100% - 68px);
  }
  h3 {
    font-size: 38px;
    line-height: 1.15;
    text-wrap: balance;
  }
  p {
    max-width: 380px;
    margin-top: 14px !important;
    color: #f1f3f0;
    font-size: 13px;
    line-height: 1.7;
  }
  a {
    display: inline-flex;
    color: #fff;
    gap: 8px;
    align-items: center;
    font-size: 12px;
    margin-top: 12px;
  }
  a :global(svg) {
    width: 12px;
    height: 12px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #fff;
    color: #782f40;
    border: none;
  }
  .play-film {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 68px;
    height: 68px;
    border-radius: 50%;
  }
  .play-film :global(svg) {
    width: 26px;
    height: 26px;
    margin-left: 4px;
  }
  .close-film {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
    padding: 9px;
    border-radius: 3px;
  }
  iframe {
    border: none;
  }
  @media (max-width: 1000px) {
    .hub-film {
      aspect-ratio: 2.3;
    }
    h3 {
      font-size: 31px;
    }
    .film-copy {
      max-width: 420px;
      bottom: 25px;
    }
  }
  @media (max-width: 700px) {
    .hub-film {
      aspect-ratio: 4 / 3;
      min-height: 300px;
    }
    .film-heading {
      inset: 16px 18px auto;
    }
    .film-copy {
      left: 20px;
      bottom: 22px;
      width: calc(100% - 40px);
    }
    h3 {
      font-size: 28px;
      max-width: 310px;
    }
    p {
      font-size: 12px;
      max-width: 290px;
    }
    .film-shade,
    .health .film-shade {
      background: linear-gradient(0deg, #122222ed, #12222210 95%);
    }
    .play-film {
      left: auto;
      right: 20px;
      top: 62px;
      transform: none;
      width: 48px;
      height: 48px;
    }
  }
</style>
