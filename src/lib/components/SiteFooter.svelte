<script lang="ts">
  import {
    ArrowRightOutline,
    ArrowUpRightFromSquareOutline,
    GithubSolid,
    ServerOutline,
  } from "flowbite-svelte-icons";
  import type { Snippet } from "svelte";
  import { withBase } from "$lib/paths";

  let { audience }: { audience?: Snippet } = $props();
</script>

<footer class="site-footer">
  <div class="site-width">
    <div class="footer-main" class:with-audience={!!audience}>
      <div class="lab-column">
        <p class="eyebrow">Developed by</p>
        <a class="lab-name" href="https://github.com/LabRAI"
          >RAI Lab <ArrowUpRightFromSquareOutline class="small-icon" /></a
        >
        <p class="lab-description">
          Research and open tools for understanding wildfire and a changing
          environment.
        </p>
        <a class="text-link github-link" href="https://github.com/LabRAI"
          ><GithubSolid class="small-icon" /> Lab GitHub</a
        >
      </div>
      <div class="contributor-column">
        <p class="eyebrow">Research contributors</p>
        <p class="names">
          Yangshuang Xu, Yuyang Dai, Liling Chang, Qi Wang, Runyang Xu, Xueqi
          Cheng, and Yushun Dong.
        </p>
        <a class="text-link" href={withBase("/research-notes/")}
          >Publications & resources <ArrowRightOutline class="small-icon" /></a
        >
      </div>
      {#if audience}{@render audience()}{/if}
    </div>
    <div class="footer-bottom">
      <span>RAI Hazard Intelligence Hub</span>
      <a class="text-link" href={withBase("/hipergator-rai-resources/")}
        ><ServerOutline class="small-icon" /> Lab resources
        <span class="resource-label">/ HiPerGator access</span
        ><ArrowRightOutline class="small-icon" /></a
      >
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background: var(--wash);
    border-top: 1px solid var(--line);
  }
  .footer-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 72px;
    padding-block: 32px 28px;
  }
  .footer-main.with-audience {
    grid-template-columns: 1fr 1.2fr 250px;
    column-gap: 56px;
  }
  .eyebrow {
    color: var(--muted);
    margin-bottom: 11px;
  }
  .lab-name {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: var(--ink);
    font-size: 23px;
    font-weight: 650;
    line-height: 1.2;
  }
  .lab-name :global(svg) {
    color: var(--muted);
    width: 13px;
  }
  .lab-description,
  .names {
    max-width: 370px;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.85;
  }
  .lab-description {
    margin-top: 9px;
  }
  .names {
    margin-top: 16px;
    margin-bottom: 12px;
  }
  .github-link {
    margin-top: 10px;
  }
  .footer-main .text-link {
    font-size: 12px;
  }
  .footer-bottom {
    min-height: 63px;
    padding-block: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px 24px;
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-size: 11px;
  }
  .footer-bottom .text-link {
    font-size: 11px;
    color: var(--ink);
  }
  .resource-label {
    color: var(--muted);
    font-weight: 400;
  }
  @media (max-width: 1000px) {
    .footer-main.with-audience {
      grid-template-columns: 1fr 1fr 220px;
      column-gap: 28px;
    }
  }
  @media (max-width: 760px) {
    .footer-main,
    .footer-main.with-audience {
      grid-template-columns: 1fr 1fr;
      gap: 26px;
    }
    .footer-main :global(.visitor-map-panel--hub) {
      grid-column: 1 / -1;
      max-width: 300px;
      width: 100%;
    }
  }
  @media (max-width: 450px) {
    .footer-main,
    .footer-main.with-audience {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .names {
      margin-top: 0;
    }
    .footer-bottom {
      align-items: flex-start;
      flex-direction: column;
    }
    .resource-label {
      display: none;
    }
  }
</style>
