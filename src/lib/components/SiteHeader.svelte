<script lang="ts">
  import {
    BarsOutline,
    CloseOutline,
    ArrowUpRightFromSquareOutline,
  } from "flowbite-svelte-icons";
  import favicon from "$lib/assets/favicon.png";
  import { withBase } from "$lib/paths";

  let { active = "home" }: { active?: "home" | "research" } = $props();
  let menuOpen = $state(false);
  const links = [
    { label: "Home", href: withBase("/"), id: "home", external: false },
    {
      label: "Research Notes",
      href: withBase("/research-notes/"),
      id: "research",
      external: false,
    },
    {
      label: "FireEye",
      href: "https://rai-fire.com/",
      id: "fireeye",
      external: true,
    },
    {
      label: "PyHazards",
      href: "https://labrai.github.io/PyHazards/",
      id: "pyhazards",
      external: true,
    },
  ];
</script>

<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header">
  <div class="header-inner site-width">
    <a
      class="brand"
      href={withBase("/")}
      aria-label="RAI Hazard Intelligence home"
    >
      <img src={favicon} width="56" height="32" alt="RAI" />
      <span>Hazard Intelligence</span>
    </a>
    <button
      class="menu-toggle"
      type="button"
      aria-expanded={menuOpen}
      aria-controls="site-navigation"
      aria-label={menuOpen ? "Close navigation" : "Open navigation"}
      onclick={() => (menuOpen = !menuOpen)}
    >
      {#if menuOpen}<CloseOutline />{:else}<BarsOutline />{/if}
    </button>
    <nav
      id="site-navigation"
      class:open={menuOpen}
      aria-label="Main navigation"
    >
      {#each links as link}
        <a
          href={link.href}
          aria-current={active === link.id ? "page" : undefined}
          onclick={() => (menuOpen = false)}
        >
          {link.label}
          {#if link.external}<ArrowUpRightFromSquareOutline
              class="nav-external"
            />{/if}
        </a>
      {/each}
    </nav>
  </div>
</header>

<style>
  .site-header {
    border-bottom: 1px solid var(--line);
    background: #fff;
  }
  .header-inner {
    min-height: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 17px;
    color: var(--ink);
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
  }
  .brand img {
    object-fit: contain;
  }
  .brand span {
    border-left: 1px solid var(--line);
    padding-left: 17px;
  }
  nav {
    display: flex;
    align-items: stretch;
    gap: 30px;
    align-self: stretch;
  }
  nav a {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    position: relative;
    color: #62696a;
    font-size: 13px;
    font-weight: 500;
  }
  nav a:hover,
  nav a[aria-current] {
    color: var(--ink);
  }
  nav a[aria-current]::after {
    content: "";
    position: absolute;
    bottom: -1px;
    height: 2px;
    width: 100%;
    background: var(--accent);
  }
  :global(.nav-external) {
    width: 11px;
    height: 11px;
  }
  .menu-toggle {
    display: none;
    width: 40px;
    height: 40px;
    padding: 9px;
    border: 1px solid var(--line);
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
  }
  .skip-link {
    position: absolute;
    top: 8px;
    left: 16px;
    z-index: 20;
    transform: translateY(-160%);
    background: #fff;
    padding: 10px 16px;
    color: var(--ink);
  }
  .skip-link:focus {
    transform: translateY(0);
  }
  @media (max-width: 760px) {
    .header-inner {
      min-height: 68px;
      flex-wrap: wrap;
      gap: 0;
    }
    .brand {
      gap: 12px;
      font-size: 12px;
    }
    .brand span {
      padding-left: 12px;
    }
    .brand img {
      width: 46px;
      height: 28px;
    }
    .menu-toggle {
      display: inline-flex;
    }
    nav {
      display: none;
      width: 100%;
      padding-block: 8px 16px;
      gap: 0;
      flex-direction: column;
    }
    nav.open {
      display: flex;
    }
    nav a {
      min-height: 44px;
      justify-content: space-between;
      padding-inline: 10px;
    }
    nav a[aria-current] {
      background: var(--wash);
    }
    nav a[aria-current]::after {
      display: none;
    }
  }
</style>
