<script lang="ts">
  import {
    BarsOutline,
    CloseOutline,
    ArrowUpRightFromSquareOutline,
    EnvelopeOutline,
  } from "flowbite-svelte-icons";
  import { withBase } from "$lib/paths";
  import { scienceTitle } from "$lib/science/content";
  import { page } from "$app/state";
  let { active = "hubs" }: { active?: "hubs" | "team" | "about" } = $props();
  let menuOpen = $state(false);
  const selected = $derived(
    active !== "team" && page.url.hash === "#about" ? "about" : active,
  );
  const links = [
    {
      id: "hubs",
      label: "Research Hubs",
      href: withBase("/science/#research-hubs"),
    },
    { id: "team", label: "Our Team", href: withBase("/science/team/") },
    { id: "about", label: "About RAI", href: withBase("/science/#about") },
  ];
  const university = [
    ["Academics", "https://fsu.edu/academics/"],
    ["Admissions", "https://admissions.fsu.edu/"],
    ["Research", "https://research.fsu.edu/"],
    ["Faculty", "https://faculty.fsu.edu/"],
    ["Students", "https://fsu.edu/students/"],
    ["Veterans", "https://veterans.fsu.edu/"],
    ["Support FSU", "https://fsu.edu/support-fsu/"],
  ];
  const anniversary = new Date().getUTCFullYear() === 2026;
</script>

<a class="skip-link" href="#main-content">Skip to main content</a>
<header>
  <div class="university-bar">
    <div class="science-width university-inner">
      <a href="https://www.fsu.edu/" aria-label="Florida State University home">
        <img
          class="fsu-lockup"
          src={withBase(
            anniversary
              ? "/brand/fsu/FSU175-logo-horizontal-on-garnet.svg"
              : "/brand/fsu/fsu-lockup-gold.svg",
          )}
          alt={anniversary
            ? "Florida State University, 175 years"
            : "Florida State University"}
          width="194"
          height="53"
        />
      </a>
      <div class="university-right">
        <a
          class="utility-link"
          href="mailto:yushun.dong@fsu.edu"
          aria-label="Contact the lab"
          title="Contact the lab"><EnvelopeOutline /></a
        >
        <details class="university-menu">
          <summary
            aria-label="Florida State University navigation"
            title="University navigation"><BarsOutline /></summary
          >
          <nav aria-label="Florida State University">
            {#each university as [label, href]}<a {href}
                >{label}<ArrowUpRightFromSquareOutline /></a
              >{/each}
          </nav>
        </details>
      </div>
    </div>
  </div>
  <div class="identity-band">
    <a
      class="science-width site-brand"
      href={withBase("/science/")}
      aria-label={`${scienceTitle} home`}
    >
      {scienceTitle}
    </a>
  </div>
  <div class="navigation-band">
    <div class="science-width lab-nav">
      <button
        class="mobile-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-controls="science-navigation"
        aria-expanded={menuOpen}
        onclick={() => (menuOpen = !menuOpen)}
      >
        {#if menuOpen}<CloseOutline />{:else}<BarsOutline />{/if}
      </button>
      <nav
        id="science-navigation"
        class:open={menuOpen}
        aria-label="Science hub"
      >
        {#each links as link}<a
            href={link.href}
            aria-current={selected === link.id
              ? link.id === "team"
                ? "page"
                : "location"
              : undefined}
            onclick={() => (menuOpen = false)}>{link.label}</a
          >{/each}
      </nav>
    </div>
  </div>
</header>

<style>
  .university-bar {
    background: #782f40;
    color: #fff;
  }
  .university-inner,
  .university-right,
  .lab-nav {
    display: flex;
    align-items: center;
  }
  .university-inner {
    justify-content: space-between;
    min-height: 76px;
    gap: 20px;
  }
  .fsu-lockup {
    display: block;
    width: 160px;
    height: 44px;
    object-fit: contain;
  }
  .university-right {
    gap: 10px;
  }
  .utility-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: #fff;
  }
  .utility-link :global(svg),
  summary :global(svg) {
    width: 17px;
    height: 17px;
  }
  .utility-link:hover,
  summary:hover {
    background: #602332;
  }
  .university-menu {
    position: relative;
    z-index: 30;
  }
  summary {
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  .university-menu nav {
    position: absolute;
    top: 45px;
    right: 0;
    width: 240px;
    padding: 10px;
    background: #782f40;
    border: 1px solid #ceb888;
    box-shadow: 0 10px 24px #0002;
  }
  .university-menu a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 42px;
    padding: 10px;
    font-size: 13px;
    color: white;
  }
  .university-menu a:hover {
    background: #602332;
  }
  .university-menu a :global(svg) {
    width: 13px;
    height: 13px;
  }
  .identity-band {
    background: #fff;
    padding-block: 13px 12px;
  }
  .site-brand {
    display: block;
    text-align: center;
    color: var(--ink);
    font-size: 38px;
    font-weight: 700;
    font-stretch: 100%;
    line-height: 1.2;
    text-transform: uppercase;
    text-wrap: balance;
  }
  .navigation-band {
    background: #fff;
    border-block: 1px solid #eeeeed;
  }
  .lab-nav {
    min-height: 48px;
    justify-content: center;
  }
  #science-navigation {
    display: flex;
    justify-content: center;
    gap: 3px;
    align-self: stretch;
  }
  #science-navigation a {
    display: flex;
    align-items: center;
    position: relative;
    padding: 14px 20px;
    font-size: 13.6px;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
    color: var(--ink);
  }
  #science-navigation a:hover,
  #science-navigation a[aria-current] {
    color: var(--ink);
    background: #e8e8e8;
  }
  .mobile-toggle {
    display: none;
    width: 42px;
    height: 42px;
    padding: 9px;
    background: transparent;
    border: 0;
  }
  .skip-link {
    position: absolute;
    top: -100px;
    left: 20px;
    z-index: 50;
    background: white;
    color: #782f40;
    padding: 12px 18px;
  }
  .skip-link:focus {
    top: 10px;
  }
  @media (max-width: 1100px) {
    .site-brand {
      font-size: 30px;
    }
  }
  @media (max-width: 700px) {
    .university-inner {
      min-height: 58px;
    }
    .fsu-lockup {
      width: 140px;
      height: 39px;
    }
    .identity-band {
      padding-block: 15px;
    }
    .site-brand {
      font-size: 24px;
      line-height: 1.3;
    }
    .lab-nav {
      min-height: 46px;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 0;
    }
    .mobile-toggle {
      display: inline-flex;
      cursor: pointer;
    }
    #science-navigation {
      display: none;
      width: 100%;
      padding: 10px 0 18px;
      flex-direction: column;
      gap: 0;
    }
    #science-navigation.open {
      display: flex;
    }
    #science-navigation a {
      min-height: 44px;
      padding: 10px;
    }
    #science-navigation a[aria-current] {
      background: var(--wash);
    }
  }
</style>
