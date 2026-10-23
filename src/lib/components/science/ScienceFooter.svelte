<script lang="ts">
  import {
    ArrowUpRightFromSquareOutline,
    GithubSolid,
  } from "flowbite-svelte-icons";
  import { withBase } from "$lib/paths";
</script>

<footer>
  <div class="lab-footer">
    <div class="science-width lab-inner">
      <div>
        <p class="small-label">Responsible AI Lab</p>
        <p class="footer-title">Science with purpose.</p>
        <p class="footer-copy">
          Florida State University · Tallahassee, Florida
        </p>
      </div>
      <nav aria-label="Lab resources">
        <a href={withBase("/science/team/")}>Our team</a>
        <a href="mailto:yushun.dong@fsu.edu"
          >Contact the lab <ArrowUpRightFromSquareOutline /></a
        >
        <a href="https://github.com/LabRAI"
          ><GithubSolid /> Open-source research</a
        >
      </nav>
    </div>
  </div>
  <div class="university-footer">
    <div class="science-width university-columns">
      <p>&copy; Florida State University<br />Tallahassee, FL 32306</p>
      <div>
        <a href="https://directory.fsu.edu/">FSU Directory Assistance</a><a
          href="https://fsu.edu/misc/comments.html">Questions or Comments</a
        >
      </div>
      <div>
        <a href="https://fsu.edu/misc/policy.html">Privacy Policy</a><a
          href="https://fsu.edu/misc/copyright.html">Copyright</a
        >
      </div>
      <nav aria-label="Florida State University social media">
        <a href="https://www.facebook.com/floridastate">Facebook</a><a
          href="https://instagram.com/floridastateuniversity/">Instagram</a
        ><a href="https://x.com/floridastate">X</a><a
          href="https://www.youtube.com/FloridaState">YouTube</a
        ><a href="https://www.linkedin.com/edu/school?id=18100">LinkedIn</a><a
          href="https://www.fsu.edu/socialmedia/">More FSU Social Media</a
        >
      </nav>
    </div>
  </div>
</footer>

<style>
  .lab-footer {
    background: #f2f4f3;
    border-top: 1px solid var(--line);
  }
  .lab-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
    padding-block: 35px;
  }
  .small-label {
    color: #782f40;
    font-size: 11px;
    font-weight: 650;
    text-transform: uppercase;
  }
  .footer-title {
    font-size: 30px;
    line-height: 1.4;
    font-stretch: 75%;
    font-weight: 450;
    margin-block: 4px 6px;
  }
  .footer-copy {
    font-size: 12px;
    color: var(--muted);
  }
  .lab-inner nav {
    display: grid;
    gap: 10px;
  }
  .lab-inner a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--ink);
    font-size: 13px;
  }
  a:hover {
    text-decoration: underline;
  }
  :global(.lab-footer svg) {
    width: 14px;
    height: 14px;
  }
  .university-footer {
    background: #782f40;
    color: white;
    border-top: 2px solid #ceb888;
  }
  .university-columns {
    display: grid;
    grid-template-columns: 1.15fr 1fr 0.8fr 1.2fr;
    gap: 30px;
    padding-block: 25px;
    font-size: 11px;
    line-height: 1.8;
  }
  .university-columns a {
    color: white;
    display: block;
    width: fit-content;
  }
  .university-columns nav {
    display: flex;
    gap: 4px 15px;
    flex-wrap: wrap;
    align-content: start;
  }
  @media (max-width: 700px) {
    .lab-inner {
      align-items: flex-start;
      flex-direction: column;
      gap: 22px;
    }
    .university-columns {
      grid-template-columns: 1fr 1fr;
      gap: 22px;
    }
  }
</style>
