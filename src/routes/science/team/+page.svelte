<script lang="ts">
  import { ArrowRightOutline } from "flowbite-svelte-icons";
  import ScienceHeader from "$lib/components/science/ScienceHeader.svelte";
  import ScienceFooter from "$lib/components/science/ScienceFooter.svelte";
  import { team, initials, scienceTitle } from "$lib/science/content";
  import { withBase } from "$lib/paths";
</script>

<svelte:head
  ><title>Our Team | {scienceTitle}</title><meta
    name="description"
    content="Meet the people at the Responsible AI Lab, Florida State University."
  /><meta name="robots" content="noindex,follow" /></svelte:head
>
<ScienceHeader active="team" />
<main id="main-content" class="science-width">
  <div class="team-intro">
    <a class="editorial-link" href={withBase("/science/")}>AI for Science</a>
    <p class="section-kicker">Responsible AI Lab · Florida State University</p>
    <h1 class="editorial-title">Our Team</h1>
    <p class="intro-description">
      The people behind the questions, the research, and the tools.
    </p>
  </div>
  <section class="team-grid" aria-label="Lab members">
    {#each team as member}
      <article>
        <a class="person" href={withBase(`/science/team/${member.slug}/`)}>
          <div class="portrait">
            {#if member.portrait}<img
                src={member.portrait}
                alt={member.name}
                width="320"
                height="320"
                loading="lazy"
              />{:else}<span aria-hidden="true">{initials(member.name)}</span
              >{/if}
          </div>
          <div class="person-copy">
            <h2>{member.name}</h2>
            <p>{member.role}</p>
            <span class="person-link">Profile <ArrowRightOutline /></span>
          </div>
        </a>
      </article>
    {/each}
  </section>
  <div class="team-contact">
    <div>
      <h2 class="editorial-title">Ideas grow through collaboration.</h2>
      <p>Connect with our lab about research and opportunities.</p>
    </div>
    <a class="editorial-link" href="mailto:yushun.dong@fsu.edu"
      >Contact RAI <ArrowRightOutline /></a
    >
  </div>
</main>
<ScienceFooter />

<style>
  .team-intro {
    padding-block: 32px 35px;
  }
  .team-intro > a {
    font-size: 12px;
    margin-bottom: 25px;
  }
  h1 {
    font-size: 56px;
    line-height: 1.2;
    margin-block: 10px 15px !important;
  }
  .intro-description {
    font-size: 15px;
    color: var(--muted);
  }
  .team-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0 28px;
  }
  .person {
    display: flex;
    min-height: 172px;
    align-items: center;
    gap: 19px;
    padding-block: 24px;
    border-top: 1px solid var(--line);
    color: var(--ink);
  }
  .portrait {
    width: 90px;
    height: 108px;
    background: #eef1ed;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-bottom: 3px solid #ceb888;
    overflow: hidden;
  }
  .portrait span {
    font:
      32px/1 Georgia,
      serif;
    color: #782f40;
  }
  .portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .person-copy {
    min-width: 0;
  }
  h2 {
    font:
      24px/1.2 Georgia,
      serif;
  }
  .person-copy p {
    font-size: 11px;
    line-height: 1.7;
    color: var(--muted);
    margin-top: 7px !important;
  }
  .person-link {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 11px;
    color: #782f40;
    margin-top: 12px;
  }
  .person-link :global(svg) {
    width: 14px;
    height: 14px;
  }
  .person:hover h2 {
    color: #782f40;
  }
  .team-contact {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    padding-block: 32px 40px;
    margin-top: 20px;
    border-top: 1px solid var(--line);
  }
  .team-contact h2 {
    font-size: 29px;
  }
  .team-contact p {
    font-size: 13px;
    color: var(--muted);
    margin-top: 8px !important;
  }
  @media (max-width: 1100px) {
    .team-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 700px) {
    h1 {
      font-size: 43px;
    }
    .team-grid {
      grid-template-columns: 1fr;
    }
    .team-contact {
      align-items: flex-start;
      flex-direction: column;
    }
    .team-intro {
      padding-bottom: 28px;
    }
    .person {
      min-height: 148px;
    }
  }
</style>
