<script lang="ts">
  import {
    BarsOutline,
    CloseOutline,
    ArrowUpRightFromSquareOutline,
  } from "flowbite-svelte-icons";
  import { withBase } from "$lib/paths";
  import { scienceTitle } from "$lib/science/content";
  import { page } from "$app/state";
  import rai from "$lib/assets/favicon.png";
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
        <a class="department" href="https://www.cs.fsu.edu/"
          >Department of Computer Science</a
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
  <div class="science-width lab-nav">
    <a
      class="lab-brand"
      href={withBase("/science/")}
      aria-label={`${scienceTitle} home`}
    >
      <img src={rai} alt="RAI" width="59" height="34" /><span
        >AI for Science</span
      >
    </a>
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
    <nav id="science-navigation" class:open={menuOpen} aria-label="Science hub">
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
</header>

<style>
  .university-bar {
    background: #782f40;
    color: #fff;
    border-bottom: 2px solid #ceb888;
  }
  .university-inner,
  .university-right,
  .lab-nav,
  .lab-brand {
    display: flex;
    align-items: center;
  }
  .university-inner {
    justify-content: space-between;
    min-height: 66px;
    gap: 20px;
  }
  .fsu-lockup {
    display: block;
    width: 194px;
    height: 53px;
    object-fit: contain;
  }
  .university-right {
    gap: 24px;
  }
  .department {
    font-size: 12px;
    color: #fff;
  }
  .university-menu {
    position: relative;
    z-index: 30;
  }
  summary {
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 9px;
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
  .lab-nav {
    min-height: 77px;
    justify-content: space-between;
    gap: 24px;
    border-bottom: 1px solid var(--line);
  }
  .lab-brand {
    gap: 18px;
    color: var(--ink);
  }
  .lab-brand img {
    object-fit: contain;
  }
  .lab-brand span {
    font-size: 14px;
    font-weight: 600;
    border-left: 1px solid var(--line);
    padding-left: 18px;
  }
  #science-navigation {
    display: flex;
    gap: 32px;
    align-self: stretch;
  }
  #science-navigation a {
    display: flex;
    align-items: center;
    position: relative;
    font-size: 13px;
    font-weight: 550;
    color: var(--muted);
  }
  #science-navigation a:hover,
  #science-navigation a[aria-current] {
    color: #782f40;
  }
  #science-navigation a[aria-current]::after {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    content: "";
    height: 2px;
    background: #782f40;
  }
  .mobile-toggle {
    display: none;
    width: 42px;
    height: 42px;
    padding: 9px;
    background: transparent;
    border: 1px solid var(--line);
    border-radius: 3px;
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
  @media (max-width: 700px) {
    .university-inner {
      min-height: 58px;
    }
    .fsu-lockup {
      width: 166px;
      height: 46px;
    }
    .department {
      display: none;
    }
    .lab-nav {
      min-height: 68px;
      flex-wrap: wrap;
      gap: 0;
    }
    .lab-brand img {
      width: 49px;
      height: 30px;
    }
    .lab-brand,
    .lab-brand span {
      gap: 12px;
      font-size: 13px;
    }
    .lab-brand span {
      padding-left: 12px;
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
    #science-navigation a[aria-current]::after {
      display: none;
    }
  }
</style>
