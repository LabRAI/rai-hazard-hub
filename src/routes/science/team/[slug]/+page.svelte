<script lang="ts">
  import { ArrowUpRightFromSquareOutline } from "flowbite-svelte-icons";
  import ScienceHeader from "$lib/components/science/ScienceHeader.svelte";
  import ScienceFooter from "$lib/components/science/ScienceFooter.svelte";
  import { initials } from "$lib/science/content";
  import { withBase } from "$lib/paths";
  let { data } = $props();
</script>

<svelte:head
  ><title>{data.member.name} | RAI Lab</title><meta
    name="description"
    content={`${data.member.name}, ${data.member.role}, Responsible AI Lab at Florida State University.`}
  /><meta name="robots" content="noindex,follow" /></svelte:head
>
<ScienceHeader active="team" />
<main id="main-content" class="science-width profile-main">
  <a class="editorial-link" href={withBase("/science/team/")}>Our team</a>
  <article class="profile">
    <div class="portrait">
      {#if data.member.portrait}<img
          src={data.member.portrait}
          alt={data.member.name}
          width="480"
          height="560"
        />{:else}<span aria-hidden="true">{initials(data.member.name)}</span
        >{/if}
    </div>
    <div>
      <p class="section-kicker">Responsible AI Lab</p>
      <h1 class="editorial-title">{data.member.name}</h1>
      <p class="role">{data.member.role}</p>
      <p class="affiliation">Florida State University</p>
      {#if data.member.bio}<p class="bio">
          {data.member.bio}
        </p>{/if}{#if data.member.website}<a
          class="editorial-link website"
          href={data.member.website}
          >Personal website <ArrowUpRightFromSquareOutline /></a
        >{/if}
    </div>
  </article>
</main>
<ScienceFooter />

<style>
  .profile-main {
    padding-block: 30px 60px;
    min-height: 60vh;
  }
  .profile {
    display: grid;
    grid-template-columns: 260px minmax(0, 620px);
    gap: 50px;
    align-items: center;
    margin-top: 28px;
  }
  .portrait {
    aspect-ratio: 6 / 7;
    background: #edf1ed;
    display: grid;
    place-items: center;
    border-bottom: 4px solid #ceb888;
    overflow: hidden;
  }
  .portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .portrait span {
    font:
      80px/1 Georgia,
      serif;
    color: #782f40;
  }
  h1 {
    font-size: 47px;
    line-height: 1.2;
    margin-block: 10px 17px !important;
  }
  .role {
    font-size: 17px;
  }
  .affiliation {
    color: var(--muted);
    font-size: 14px;
    margin-top: 5px !important;
  }
  .bio {
    font-size: 14px;
    line-height: 1.85;
    margin-top: 24px !important;
    color: var(--muted);
  }
  .website {
    margin-top: 22px;
  }
  @media (max-width: 700px) {
    .profile {
      grid-template-columns: 1fr;
      gap: 27px;
    }
    .portrait {
      width: 180px;
    }
    h1 {
      font-size: 39px;
    }
  }
</style>
