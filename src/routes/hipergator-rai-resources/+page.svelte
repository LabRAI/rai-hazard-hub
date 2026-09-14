<script lang="ts">
  import { onMount } from "svelte";
  import {
    ApiKeyOutline,
    ArrowLeftOutline,
    ArrowRightOutline,
    ArrowUpRightFromSquareOutline,
    CheckCircleOutline,
    ClipboardCheckOutline,
    ClipboardOutline,
    ClockOutline,
    GithubSolid,
    LockOutline,
    MailBoxOutline,
    ServerOutline,
    ShieldCheckOutline,
    TerminalOutline,
    UserAddOutline,
    UserCircleOutline,
  } from "flowbite-svelte-icons";
  import favicon from "$lib/assets/favicon.png";
  import { withBase } from "$lib/paths";

  type ChecklistItem = {
    key: string;
    label: string;
  };

  type FlowNode = {
    title: string;
    detail: string;
    icon: typeof UserCircleOutline;
    tone: "green" | "coral" | "blue" | "gold";
  };

  const requestUrl =
    "https://it.ufl.edu/rc/get-started/request-hipergator-account/";
  const supportUrl = "https://support.rc.ufl.edu/";
  const sectionIds = [
    "overview",
    "identity",
    "prepare",
    "ssh-key",
    "submit",
    "after",
    "existing",
    "faq",
    "references",
  ];

  const navItems = [
    { id: "overview", label: "Quick path" },
    { id: "identity", label: "Choose your identity" },
    { id: "prepare", label: "Prepare first" },
    { id: "ssh-key", label: "SSH public key" },
    { id: "submit", label: "Submit the request" },
    { id: "after", label: "After approval" },
    { id: "existing", label: "Already have an account?" },
    { id: "faq", label: "FAQ" },
    { id: "references", label: "Official references" },
  ];

  const flowNodes: FlowNode[] = [
    {
      title: "Identity",
      detail: "your institution",
      icon: UserCircleOutline,
      tone: "green",
    },
    {
      title: "Public key",
      detail: "SSH .pub file",
      icon: ApiKeyOutline,
      tone: "coral",
    },
    {
      title: "Sponsor",
      detail: "RAI Lab approval",
      icon: UserAddOutline,
      tone: "blue",
    },
    {
      title: "HiPerGator",
      detail: "group access",
      icon: ServerOutline,
      tone: "gold",
    },
  ];

  const checklist: ChecklistItem[] = [
    {
      key: "email",
      label:
        "Your institutional email: FSU email for FSU users, or your home-institution email for external users",
    },
    {
      key: "organization",
      label:
        "Your actual organization, not automatically Florida State University",
    },
    {
      key: "sponsor",
      label:
        "The exact RAI Lab faculty sponsor and sponsored group; confirm both before applying",
    },
    {
      key: "project",
      label: "A short description of the project or work that needs access",
    },
    {
      key: "key",
      label: "An SSH public key file, such as ~/.ssh/id_ed25519_hipergator.pub",
    },
  ];

  let checks: Record<string, boolean> = {};
  let activeSection = "overview";
  let copiedTarget = "";
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  $: completedChecks = checklist.filter(({ key }) => checks[key]).length;
  $: checkProgress = Math.round((completedChecks / checklist.length) * 100);

  onMount(() => {
    let savedChecks: string | null = null;
    try {
      savedChecks = localStorage.getItem("rai-resource-guide-checklist");
    } catch {
      savedChecks = null;
    }
    if (savedChecks) {
      try {
        checks = JSON.parse(savedChecks) as Record<string, boolean>;
      } catch {
        checks = {};
      }
    }

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) activeSection = visible.target.id;
      },
      { rootMargin: "-12% 0px -65% 0px", threshold: [0.1, 0.3, 0.6] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  });

  function setCheck(key: string, checked: boolean) {
    checks = { ...checks, [key]: checked };
    try {
      localStorage.setItem(
        "rai-resource-guide-checklist",
        JSON.stringify(checks),
      );
    } catch {
      // Checklist state still works for the current session when storage is blocked.
    }
  }

  async function copyCode(id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    const text = target.textContent?.trim() ?? "";
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      copiedTarget = id;
      if (copyTimer) clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (copiedTarget = ""), 1600);
    } catch {
      copiedTarget = "";
    }
  }
</script>

<svelte:head>
  <title>Request RAI Lab Resources | HiPerGator Guide</title>
  <meta
    name="description"
    content="A practical guide for requesting HiPerGator access to RAI Lab sponsored resources."
  />
</svelte:head>

<main class="access-page">
  <header class="access-header">
    <div class="access-header-inner">
      <a
        class="brand"
        href={withBase("/")}
        aria-label="Back to RAI Hazard Intelligence Hub"
      >
        <img src={favicon} alt="RAI Lab" />
        <span>RAI Hazard Intelligence</span>
      </a>

      <nav class="access-nav" aria-label="Page links">
        <a href={withBase("/")}><ArrowLeftOutline class="nav-icon" /> Hub</a>
        <a href={withBase("/research-notes/")}>Research Notes</a>
        <a
          href="https://labrai.github.io/PyHazards/"
          target="_blank"
          rel="noreferrer">PyHazards</a
        >
      </nav>
    </div>
  </header>

  <section class="access-hero" aria-labelledby="access-title">
    <div class="access-hero-inner">
      <div class="hero-copy">
        <p class="eyebrow">RAI Lab resource guide</p>
        <h1 id="access-title">
          Request HiPerGator access with the right details in hand.
        </h1>
        <p class="hero-lead">
          Use this guide when your work is supported by RAI Lab resources.
          Confirm your identity path, sponsor, and sponsored group before
          opening the official request form.
        </p>
        <div class="hero-actions" aria-label="Primary actions">
          <a
            class="button button-primary"
            href={requestUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ClipboardCheckOutline class="button-icon" /> Open request page
            <ArrowUpRightFromSquareOutline
              class="button-icon button-icon-small"
            />
          </a>
          <a class="button button-quiet" href="#prepare">
            <CheckCircleOutline class="button-icon" /> Start the checklist
          </a>
        </div>
        <p class="hero-footnote">
          <ClockOutline class="inline-icon" /> Reviewed September 8, 2026. Official
          UFRC documentation controls if procedures change.
        </p>
      </div>

      <div
        class="workflow-art"
        aria-label="Identity, public key, sponsor, and HiPerGator group access workflow"
      >
        <div class="workflow-art-head">
          <span>ACCESS PATH</span>
          <span class="workflow-status"
            ><span class="status-dot"></span> RAI LAB</span
          >
        </div>
        <div class="workflow-track">
          {#each flowNodes as node, index}
            <div class={"workflow-node workflow-node--" + node.tone}>
              <span class="node-icon"
                ><svelte:component this={node.icon} /></span
              >
              <strong>{node.title}</strong>
              <span>{node.detail}</span>
            </div>
            {#if index < flowNodes.length - 1}
              <span class="track-line" aria-hidden="true"></span>
            {/if}
          {/each}
        </div>
        <div class="workflow-art-foot">
          <span
            ><ShieldCheckOutline class="inline-icon" /> least-privilege access</span
          >
          <span>01 / 04</span>
        </div>
      </div>
    </div>
  </section>

  <div class="access-shell">
    <aside class="side-nav" aria-label="Guide navigation">
      <div class="side-nav-label">On this page</div>
      {#each navItems as item}
        <a class:active={activeSection === item.id} href={"#" + item.id}
          >{item.label}</a
        >
      {/each}
      <a
        class="side-nav-cta"
        href={requestUrl}
        target="_blank"
        rel="noreferrer"
      >
        Open official form <ArrowUpRightFromSquareOutline
          class="side-nav-icon"
        />
      </a>
    </aside>

    <div class="access-content">
      <section id="overview" class="content-band content-band-first">
        <div class="section-heading">
          <p class="eyebrow">Quick path</p>
          <h2>Five moves from preparation to access</h2>
          <p>
            The account request and the RAI Lab resource membership are
            connected, but they are not the same record.
          </p>
        </div>

        <div class="flow-grid" aria-label="HiPerGator account request steps">
          <article class="step-card">
            <span class="step-number">01</span>
            <h3>Confirm sponsor</h3>
            <p>
              Ask your RAI Lab faculty lead or resource manager for the exact
              sponsor and sponsored group.
            </p>
          </article>
          <article class="step-card">
            <span class="step-number">02</span>
            <h3>Create a key pair</h3>
            <p>
              Generate an SSH key pair locally and keep the private key on your
              own device.
            </p>
          </article>
          <article class="step-card">
            <span class="step-number">03</span>
            <h3>Choose identity</h3>
            <p>
              Use your own institution's credentials and institutional email in
              the official request path.
            </p>
          </article>
          <article class="step-card">
            <span class="step-number">04</span>
            <h3>Submit and verify</h3>
            <p>
              Complete the form, confirm the email, accept the terms, and wait
              for sponsor approval.
            </p>
          </article>
          <article class="step-card">
            <span class="step-number">05</span>
            <h3>Test a small job</h3>
            <p>
              Verify your account, group, storage path, and login before
              launching a large workload.
            </p>
          </article>
        </div>

        <div class="notice notice-coral">
          <strong>Do not guess the group name.</strong> A sponsor, group, and allocation
          are related but distinct. Confirm the exact values with the RAI Lab resource
          manager before applying.
        </div>
      </section>

      <section id="identity" class="content-band">
        <div class="section-heading">
          <p class="eyebrow">Choose your identity</p>
          <h2>Use credentials that belong to you</h2>
          <p>
            Your login identity and your RAI Lab resource sponsor are different
            things. Choose the path that matches your actual institution.
          </p>
        </div>

        <div class="path-grid">
          <article class="path-card path-card--recommended">
            <div class="path-card-top">
              <UserCircleOutline class="path-icon" /><span class="path-tag"
                >Recommended for FSU</span
              >
            </div>
            <h3>FSU student or staff</h3>
            <p>
              Select <strong>Federated Account Request</strong>, choose Florida
              State University, and authenticate with your FSU credentials and
              FSU email.
            </p>
          </article>
          <article class="path-card">
            <div class="path-card-top">
              <UserAddOutline class="path-icon path-icon--blue" /><span
                class="path-tag">Federated</span
              >
            </div>
            <h3>Another federated institution</h3>
            <p>
              If your home institution appears in the <a
                href="https://docs.rc.ufl.edu/access/federated_liaisons/"
                target="_blank"
                rel="noreferrer">UFRC liaison list</a
              >, select it and use that institution's credentials and email.
            </p>
          </article>
          <article class="path-card">
            <div class="path-card-top">
              <LockOutline class="path-icon path-icon--coral" /><span
                class="path-tag">Confirm first</span
              >
            </div>
            <h3>External, no federation</h3>
            <p>
              Ask your FSU faculty sponsor to confirm the official
              affiliate-account or GatorLink path. Never invent an FSU identity
              or use someone else's credentials.
            </p>
          </article>
        </div>

        <div class="notice notice-blue">
          <strong>Identity is not sponsorship.</strong> An external student may use
          a home-institution identity while an FSU faculty sponsor authorizes access
          to RAI Lab resources.
        </div>
      </section>

      <section id="prepare" class="content-band">
        <div class="section-heading heading-with-progress">
          <div>
            <p class="eyebrow">Before applying</p>
            <h2>Have these details ready</h2>
          </div>
          <div
            class="progress-block"
            aria-label={completedChecks +
              " of " +
              checklist.length +
              " checklist items complete"}
          >
            <strong>{completedChecks}<span>/{checklist.length}</span></strong>
            <div class="progress-bar">
              <span style={"width: " + checkProgress + "%"}></span>
            </div>
            <small>ready to apply</small>
          </div>
        </div>

        <div class="checklist" aria-label="Pre-application checklist">
          {#each checklist as item}
            <label class:checked={checks[item.key]}>
              <input
                type="checkbox"
                checked={checks[item.key] ?? false}
                onchange={(event) =>
                  setCheck(
                    item.key,
                    (event.currentTarget as HTMLInputElement).checked,
                  )}
              />
              <span>{item.label}</span>
              {#if checks[item.key]}
                <CheckCircleOutline class="checkmark" />
              {/if}
            </label>
          {/each}
        </div>
        <p class="section-tail">
          If the sponsor or group is unclear, pause and ask the RAI Lab resource
          manager. A request under the wrong sponsor or institution can delay
          account creation and group access.
        </p>
      </section>

      <section id="ssh-key" class="content-band">
        <div class="section-heading">
          <p class="eyebrow">SSH public key</p>
          <h2>Create the key before opening the form</h2>
          <p>
            Upload or paste the file ending in <code>.pub</code>. The private
            key should never leave your device.
          </p>
        </div>

        <div class="code-grid">
          <article class="code-card">
            <div class="code-header">
              <h3>Linux or macOS</h3>
              <button
                class="copy-button"
                type="button"
                onclick={() => copyCode("unix-key")}
                ><ClipboardOutline class="copy-icon" />
                {copiedTarget === "unix-key" ? "Copied" : "Copy"}</button
              >
            </div>
            <pre><code id="unix-key"
                >ssh-keygen -t ed25519 -C "your_institutional_email" -f ~/.ssh/id_ed25519_hipergator
cat ~/.ssh/id_ed25519_hipergator.pub</code
              ></pre>
          </article>
          <article class="code-card">
            <div class="code-header">
              <h3>Windows PowerShell</h3>
              <button
                class="copy-button"
                type="button"
                onclick={() => copyCode("windows-key")}
                ><ClipboardOutline class="copy-icon" />
                {copiedTarget === "windows-key" ? "Copied" : "Copy"}</button
              >
            </div>
            <pre><code id="windows-key"
                >ssh-keygen -t ed25519 -C "your_institutional_email" -f $env:USERPROFILE/.ssh/id_ed25519_hipergator
type $env:USERPROFILE/.ssh/id_ed25519_hipergator.pub</code
              ></pre>
          </article>
        </div>

        <div class="key-safety">
          <LockOutline class="inline-icon" /><span
            ><strong>Keep this distinction clear:</strong>
            <code>id_ed25519_hipergator.pub</code>
            is public. The file without <code>.pub</code> is private and must stay
            private.</span
          >
        </div>
      </section>

      <section id="submit" class="content-band">
        <div class="section-heading">
          <p class="eyebrow">Submit the request</p>
          <h2>Follow the official form in one browser session</h2>
          <p>
            Use one complete request with consistent identity, sponsor, project,
            and public-key information.
          </p>
        </div>

        <ol class="timeline">
          <li>
            <span class="timeline-number">1</span>
            <div>
              Open <a href={requestUrl} target="_blank" rel="noreferrer"
                >Request HiPerGator Account</a
              >.
            </div>
          </li>
          <li>
            <span class="timeline-number">2</span>
            <div>
              Choose <strong>Federated Account Request</strong>. Select Florida
              State University for FSU users; otherwise select your home
              institution if it is listed.
            </div>
          </li>
          <li>
            <span class="timeline-number">3</span>
            <div>
              Enter your legal name, institutional email, actual organization,
              confirmed sponsor, and project details.
            </div>
          </li>
          <li>
            <span class="timeline-number">4</span>
            <div>
              Paste or upload the public key as directed. Do not upload the
              private key.
            </div>
          </li>
          <li>
            <span class="timeline-number">5</span>
            <div>
              Finish the form in the same browser session. If it resets, contact <a
                href={supportUrl}
                target="_blank"
                rel="noreferrer">UFRC Support</a
              > instead of creating conflicting requests.
            </div>
          </li>
          <li>
            <span class="timeline-number">6</span>
            <div>
              Open the confirmation email, accept the terms and conditions, and
              complete any remaining verification step.
            </div>
          </li>
          <li>
            <span class="timeline-number">7</span>
            <div>
              Wait for sponsor approval. UFRC documentation says account
              creation commonly takes two to three business days after approval.
            </div>
          </li>
        </ol>

        <article class="code-card code-card--template">
          <div class="code-header">
            <h3>Comments template</h3>
            <button
              class="copy-button"
              type="button"
              onclick={() => copyCode("comment-template")}
              ><ClipboardOutline class="copy-icon" />
              {copiedTarget === "comment-template" ? "Copied" : "Copy"}</button
            >
          </div>
          <pre><code id="comment-template"
              >I am a [FSU student/staff member OR student/researcher at HOME INSTITUTION] working with Professor [FULL NAME] in the RAI Lab. I am requesting HiPerGator access for [PROJECT OR PURPOSE] using the RAI Lab sponsored resources. My institutional email is [EMAIL]. Please associate my account with the appropriate sponsored group after sponsor approval.</code
            ></pre>
        </article>
        <p class="section-tail">
          Replace every bracketed field before submitting. External students
          should keep their home institution and institutional email in the
          form.
        </p>
      </section>

      <section id="after" class="content-band">
        <div class="section-heading">
          <p class="eyebrow">After approval</p>
          <h2>Verify the account before starting a large job</h2>
          <p>
            Complete required onboarding, then test an interactive login and a
            small job so the access path is easy to diagnose.
          </p>
        </div>

        <article class="code-card code-card--login">
          <div class="code-header">
            <h3>SSH login</h3>
            <button
              class="copy-button"
              type="button"
              onclick={() => copyCode("ssh-login")}
              ><ClipboardOutline class="copy-icon" />
              {copiedTarget === "ssh-login" ? "Copied" : "Copy"}</button
            >
          </div>
          <pre><code id="ssh-login"
              >ssh -i ~/.ssh/id_ed25519_hipergator YOUR_HIPERGATOR_USERNAME@hpg.rc.ufl.edu</code
            ></pre>
        </article>

        <div class="info-grid">
          <article class="info-card">
            <ServerOutline class="info-icon info-icon--green" />
            <h3>Username</h3>
            <p>
              Use the HiPerGator username in your account email. It may differ
              from the local part of your institutional email.
            </p>
          </article>
          <article class="info-card">
            <LockOutline class="info-icon info-icon--coral" />
            <h3>Network access</h3>
            <p>
              Follow current UFRC network guidance. Federated SSH access may
              require eduVPN before connecting.
            </p>
          </article>
          <article class="info-card">
            <TerminalOutline class="info-icon info-icon--blue" />
            <h3>Allocation check</h3>
            <p>
              Confirm your default group, Slurm account, storage path, and the
              RAI Lab allocation you are expected to use.
            </p>
          </article>
        </div>
      </section>

      <section id="existing" class="content-band">
        <div class="section-heading">
          <p class="eyebrow">Existing account</p>
          <h2>Do not submit a second account request</h2>
        </div>
        <p>
          If you already have a HiPerGator account, ask the RAI Lab resource
          manager whether your existing username should be added to the relevant
          group or allocation. If a UFRC ticket is needed, include your
          HiPerGator username, institutional email, home institution if
          applicable, faculty sponsor, requested group, and a short project
          description.
        </p>
        <div class="notice notice-gold">
          <strong>Membership is a separate workflow.</strong> A group-membership request
          is different from an account request. Keep the existing account and use
          the support workflow for membership or allocation changes.
        </div>
      </section>

      <section id="faq" class="content-band">
        <div class="section-heading">
          <p class="eyebrow">FAQ</p>
          <h2>Common questions</h2>
        </div>
        <div class="faq-list">
          <details>
            <summary>What if the sponsor is not listed?</summary>
            <p>
              Do not select an unrelated sponsor. Confirm that the faculty
              sponsor has an active HiPerGator group and ask the RAI Lab
              resource manager or UFRC Support for the correct path.
            </p>
          </details>
          <details>
            <summary>What if the confirmation email never arrives?</summary>
            <p>
              Check spam or junk folders first. If it is still missing, contact
              UFRC Support with your name, institutional email, submission time,
              and sponsor.
            </p>
          </details>
          <details>
            <summary>Can I request access to a second group later?</summary>
            <p>
              Yes, when the additional group is approved. Keep the existing
              account and request the additional membership through the
              responsible manager or UFRC Support.
            </p>
          </details>
          <details>
            <summary>Can an external student use this guide?</summary>
            <p>
              Yes, if an FSU faculty sponsor confirms the work and the student
              follows the identity path for their home institution. Resource
              access is never automatic.
            </p>
          </details>
        </div>
      </section>

      <section id="references" class="content-band content-band-last">
        <div class="section-heading">
          <p class="eyebrow">Official references</p>
          <h2>Use UFRC documentation for current policy</h2>
          <p>
            This guide explains the RAI Lab context. The official UFRC pages
            control when requirements or procedures change.
          </p>
        </div>
        <div class="reference-grid">
          <a href={requestUrl} target="_blank" rel="noreferrer"
            ><ClipboardCheckOutline class="reference-icon" /> Request HiPerGator Account
            <ArrowUpRightFromSquareOutline class="reference-arrow" /></a
          >
          <a
            href="https://docs.rc.ufl.edu/access/federated_request/"
            target="_blank"
            rel="noreferrer"
            ><UserAddOutline class="reference-icon" /> Federated Account Request <ArrowUpRightFromSquareOutline
              class="reference-arrow"
            /></a
          >
          <a
            href="https://docs.rc.ufl.edu/access/federated_liaisons/"
            target="_blank"
            rel="noreferrer"
            ><MailBoxOutline class="reference-icon" /> Federated Account Liaisons
            <ArrowUpRightFromSquareOutline class="reference-arrow" /></a
          >
          <a
            href="https://docs.rc.ufl.edu/quickstart/zero_hipergator/"
            target="_blank"
            rel="noreferrer"
            ><ArrowRightOutline class="reference-icon" /> From Zero to HiPerGator
            <ArrowUpRightFromSquareOutline class="reference-arrow" /></a
          >
          <a
            href="https://docs.rc.ufl.edu/interfaces/terminal/"
            target="_blank"
            rel="noreferrer"
            ><TerminalOutline class="reference-icon" /> Connecting with SSH <ArrowUpRightFromSquareOutline
              class="reference-arrow"
            /></a
          >
          <a
            href="https://docs.rc.ufl.edu/access/ssh_keys/"
            target="_blank"
            rel="noreferrer"
            ><ApiKeyOutline class="reference-icon" /> Using SSH Keys <ArrowUpRightFromSquareOutline
              class="reference-arrow"
            /></a
          >
          <a href={supportUrl} target="_blank" rel="noreferrer"
            ><ShieldCheckOutline class="reference-icon" /> UFRC Support <ArrowUpRightFromSquareOutline
              class="reference-arrow"
            /></a
          >
          <a href="https://github.com/LabRAI" target="_blank" rel="noreferrer"
            ><GithubSolid class="reference-icon" /> RAI Lab GitHub <ArrowUpRightFromSquareOutline
              class="reference-arrow"
            /></a
          >
        </div>
      </section>
    </div>
  </div>

  <footer class="access-footer">
    <div class="access-footer-inner">
      <span>RAI Lab resource guide</span>
      <span
        >Official UFRC documentation takes precedence when procedures change.</span
      >
      <a href={withBase("/")}
        >Back to hub <ArrowRightOutline class="inline-icon" /></a
      >
    </div>
  </footer>
</main>

<style>
  :global(body) {
    background: #f4f7f6;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  .access-page {
    --ink: #17221f;
    --muted: #5b6965;
    --line: #d7e1de;
    --surface: #ffffff;
    --green: #286a5a;
    --deep-green: #103a31;
    --coral: #bd4b3d;
    --blue: #296d98;
    --gold: #a16d14;
    min-height: 100dvh;
    color: var(--ink);
    background: #f4f7f6;
    font-family: Montserrat, Jura, sans-serif;
    font-size: 16px;
    line-height: 1.6;
  }

  .access-page * {
    box-sizing: border-box;
  }

  .access-page a {
    color: var(--blue);
    text-underline-offset: 0.18em;
  }

  .access-page a:hover,
  .access-page a:focus-visible {
    color: var(--coral);
  }

  .access-header {
    border-bottom: 1px solid rgb(23 34 31 / 12%);
    background: #ffffff;
  }

  .access-header-inner,
  .access-hero-inner,
  .access-shell,
  .access-footer-inner {
    width: min(1240px, calc(100% - 88px));
    margin: 0 auto;
  }

  .access-header-inner {
    display: flex;
    min-height: 76px;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .brand,
  .access-nav a,
  .button,
  .hero-footnote,
  .workflow-status,
  .workflow-art-foot,
  .path-card-top,
  .key-safety,
  .reference-grid a,
  .access-footer-inner,
  .side-nav-cta {
    display: inline-flex;
    align-items: center;
  }

  .brand {
    gap: 12px;
    color: var(--ink);
    font-size: 1rem;
    font-weight: 750;
    text-decoration: none;
  }

  .brand img {
    width: 54px;
    height: 32px;
    object-fit: contain;
  }

  .access-nav {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .access-nav a {
    min-height: 38px;
    gap: 7px;
    padding: 9px 12px;
    border-radius: 6px;
    color: #40514c;
    font-size: 0.88rem;
    font-weight: 700;
    text-decoration: none;
  }

  .access-nav a:hover {
    background: #e8f0ee;
    color: var(--deep-green);
  }

  .access-page :global(.nav-icon),
  .access-page :global(.inline-icon) {
    width: 16px;
    height: 16px;
    flex: 0 0 auto;
  }

  .access-hero {
    background: var(--deep-green);
    color: #ffffff;
  }

  .access-hero-inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(430px, 0.86fr);
    gap: 64px;
    align-items: center;
    min-height: 535px;
    padding-top: 62px;
    padding-bottom: 62px;
  }

  .hero-copy {
    max-width: 680px;
  }

  .eyebrow {
    margin: 0 0 10px;
    color: var(--green);
    font-size: 0.75rem;
    font-weight: 850;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .hero-copy .eyebrow {
    color: #a6d5c7;
  }

  h1,
  h2,
  h3,
  p {
    margin-top: 0;
  }

  h1,
  h2,
  h3 {
    letter-spacing: 0;
    line-height: 1.15;
  }

  h1 {
    max-width: 690px;
    margin-bottom: 20px;
    font-size: 3.65rem;
    font-weight: 820;
    line-height: 1.04;
  }

  .hero-lead {
    max-width: 610px;
    margin-bottom: 0;
    color: #d6e8e2;
    font-size: 1.1rem;
    line-height: 1.7;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
  }

  .button {
    min-height: 46px;
    justify-content: center;
    gap: 8px;
    padding: 11px 15px;
    border: 1px solid transparent;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 800;
    text-decoration: none;
  }

  .button-primary {
    background: #ffffff;
    color: var(--deep-green) !important;
  }

  .button-primary:hover {
    background: #e8f3ef;
  }

  .button-quiet {
    border-color: rgb(255 255 255 / 34%);
    color: #ffffff !important;
  }

  .button-quiet:hover {
    border-color: #ffffff;
    background: rgb(255 255 255 / 10%);
  }

  .access-page :global(.button-icon) {
    width: 18px;
    height: 18px;
    flex: 0 0 auto;
  }

  .access-page :global(.button-icon-small) {
    width: 14px;
    height: 14px;
  }

  .hero-footnote {
    gap: 7px;
    margin-top: 22px;
    color: #a6c6bd;
    font-size: 0.8rem;
  }

  .workflow-art {
    min-height: 332px;
    padding: 20px;
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 8px;
    background: #f8fbfa;
    color: var(--ink);
    box-shadow: 0 22px 55px rgb(2 27 21 / 30%);
  }

  .workflow-art-head,
  .workflow-art-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: #6a7b76;
    font-size: 0.68rem;
    font-weight: 850;
    letter-spacing: 0.08em;
  }

  .workflow-status {
    gap: 7px;
    color: var(--green);
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #55a77f;
  }

  .workflow-track {
    display: flex;
    align-items: flex-start;
    margin: 54px 0 58px;
  }

  .workflow-node {
    display: grid;
    position: relative;
    z-index: 1;
    flex: 1 1 0;
    justify-items: center;
    gap: 8px;
    text-align: center;
  }

  .node-icon {
    display: grid;
    width: 60px;
    height: 60px;
    place-items: center;
    border: 1px solid currentColor;
    border-radius: 50%;
    background: #ffffff;
  }

  .node-icon :global(svg) {
    width: 26px;
    height: 26px;
  }

  .workflow-node strong {
    font-size: 0.82rem;
    line-height: 1.1;
  }

  .workflow-node > span:last-child {
    max-width: 82px;
    color: #6a7b76;
    font-size: 0.7rem;
    line-height: 1.3;
  }

  .workflow-node--green {
    color: var(--green);
  }

  .workflow-node--coral {
    color: var(--coral);
  }

  .workflow-node--blue {
    color: var(--blue);
  }

  .workflow-node--gold {
    color: var(--gold);
  }

  .track-line {
    flex: 1 1 0;
    margin-top: 30px;
    height: 1px;
    background: #c9d8d3;
  }

  .workflow-art-foot {
    padding-top: 13px;
    border-top: 1px solid #dce7e3;
    letter-spacing: 0;
  }

  .workflow-art-foot span:first-child {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #4d7669;
  }

  .access-shell {
    display: grid;
    grid-template-columns: 214px minmax(0, 1fr);
    gap: 52px;
    align-items: start;
    padding-top: 32px;
    padding-bottom: 62px;
  }

  .side-nav {
    position: sticky;
    top: 18px;
    display: grid;
    gap: 2px;
    align-self: start;
    padding: 10px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: #ffffff;
  }

  .side-nav-label {
    padding: 5px 10px 11px;
    color: #70807b;
    font-size: 0.68rem;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .side-nav a {
    display: block;
    padding: 8px 10px;
    border-radius: 5px;
    color: var(--muted);
    font-size: 0.81rem;
    font-weight: 700;
    line-height: 1.35;
    text-decoration: none;
  }

  .side-nav a:hover,
  .side-nav a.active {
    background: #eaf2ef;
    color: var(--deep-green);
  }

  .side-nav .side-nav-cta {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    margin-top: 10px;
    border-top: 1px solid var(--line);
    border-radius: 0;
    padding: 14px 10px 4px;
    color: var(--coral);
    font-size: 0.76rem;
  }

  .side-nav-cta:hover {
    background: transparent !important;
    color: var(--deep-green) !important;
  }

  .access-page :global(.side-nav-icon) {
    width: 14px;
    height: 14px;
  }

  .access-content {
    min-width: 0;
  }

  .content-band {
    padding: 40px 0;
    border-bottom: 1px solid var(--line);
    scroll-margin-top: 18px;
  }

  .content-band-first {
    padding-top: 4px;
  }

  .content-band-last {
    border-bottom: 0;
  }

  .section-heading {
    max-width: 780px;
    margin-bottom: 22px;
  }

  .section-heading h2 {
    margin-bottom: 7px;
    font-size: 1.75rem;
    font-weight: 820;
  }

  .section-heading p:last-child,
  .section-tail,
  .content-band > p {
    color: var(--muted);
  }

  .section-heading p:last-child {
    margin-bottom: 0;
    font-size: 0.96rem;
    line-height: 1.65;
  }

  .flow-grid,
  .path-grid,
  .info-grid,
  .reference-grid {
    display: grid;
    gap: 12px;
  }

  .flow-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .path-grid,
  .info-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .step-card,
  .path-card,
  .info-card {
    min-width: 0;
    border: 1px solid var(--line);
    border-radius: 7px;
    background: var(--surface);
  }

  .step-card {
    min-height: 184px;
    padding: 16px;
  }

  .step-number {
    display: grid;
    width: 31px;
    height: 31px;
    margin-bottom: 17px;
    place-items: center;
    border-radius: 50%;
    background: var(--green);
    color: #ffffff;
    font-size: 0.72rem;
    font-weight: 850;
  }

  .step-card:nth-child(2) .step-number {
    background: var(--coral);
  }

  .step-card:nth-child(3) .step-number {
    background: var(--blue);
  }

  .step-card:nth-child(4) .step-number {
    background: var(--gold);
  }

  .step-card h3,
  .path-card h3,
  .info-card h3 {
    margin-bottom: 8px;
    font-size: 0.98rem;
    font-weight: 820;
  }

  .step-card p,
  .path-card p,
  .info-card p {
    margin-bottom: 0;
    color: var(--muted);
    font-size: 0.85rem;
    line-height: 1.55;
  }

  .notice {
    margin-top: 16px;
    padding: 13px 15px;
    border-left: 4px solid var(--green);
    background: #eaf3f0;
    color: #31584e;
    font-size: 0.88rem;
    line-height: 1.55;
  }

  .notice strong {
    color: var(--ink);
  }

  .notice-coral {
    border-left-color: var(--coral);
    background: #fbefec;
    color: #6b3a32;
  }

  .notice-blue {
    border-left-color: var(--blue);
    background: #edf5f9;
    color: #315d73;
  }

  .notice-gold {
    border-left-color: var(--gold);
    background: #fbf5e8;
    color: #705722;
  }

  .path-card {
    padding: 17px;
  }

  .path-card--recommended {
    border-color: rgb(40 106 90 / 48%);
    box-shadow: inset 0 4px 0 var(--green);
  }

  .path-card-top {
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 19px;
  }

  .access-page :global(.path-icon) {
    width: 26px;
    height: 26px;
    color: var(--green);
  }

  .access-page :global(.path-icon--blue) {
    color: var(--blue);
  }

  .access-page :global(.path-icon--coral) {
    color: var(--coral);
  }

  .path-tag {
    padding: 5px 7px;
    border-radius: 4px;
    background: #edf4f1;
    color: var(--green);
    font-size: 0.66rem;
    font-weight: 850;
    text-transform: uppercase;
  }

  .path-card:nth-child(2) .path-tag {
    background: #edf5f9;
    color: var(--blue);
  }

  .path-card:nth-child(3) .path-tag {
    background: #fbefec;
    color: var(--coral);
  }

  .heading-with-progress {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 24px;
  }

  .progress-block {
    display: grid;
    min-width: 132px;
    justify-items: end;
    gap: 5px;
  }

  .progress-block strong {
    color: var(--green);
    font-size: 1.3rem;
    line-height: 1;
  }

  .progress-block strong span {
    color: #8c9b97;
    font-size: 0.85rem;
  }

  .progress-block small {
    color: #70807b;
    font-size: 0.68rem;
    font-weight: 750;
  }

  .progress-bar {
    width: 132px;
    height: 5px;
    overflow: hidden;
    border-radius: 999px;
    background: #dfe9e5;
  }

  .progress-bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--green);
    transition: width 180ms ease;
  }

  .checklist {
    display: grid;
    gap: 8px;
  }

  .checklist label {
    display: grid;
    grid-template-columns: 22px minmax(0, 1fr) 22px;
    gap: 11px;
    min-height: 52px;
    align-items: center;
    padding: 11px 13px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #ffffff;
    color: var(--ink);
    cursor: pointer;
    font-size: 0.88rem;
  }

  .checklist label.checked {
    border-color: rgb(40 106 90 / 34%);
    background: #f0f7f4;
  }

  .checklist input {
    width: 17px;
    height: 17px;
    margin: 0;
    accent-color: var(--green);
  }

  .checklist label span {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .access-page :global(.checkmark) {
    width: 19px;
    height: 19px;
    color: var(--green);
  }

  .section-tail {
    margin: 16px 0 0;
    font-size: 0.88rem;
    line-height: 1.6;
  }

  code {
    border-radius: 3px;
    background: #eaf0ee;
    padding: 2px 4px;
    color: #254a40;
    font-family:
      "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.88em;
  }

  .code-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .code-card {
    min-width: 0;
    overflow: hidden;
    border: 1px solid #314b47;
    border-radius: 7px;
    background: #172c2a;
    color: #eff9f5;
  }

  .code-card--template,
  .code-card--login {
    margin-top: 18px;
  }

  .code-header {
    display: flex;
    min-height: 51px;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 11px 13px;
    border-bottom: 1px solid rgb(255 255 255 / 13%);
  }

  .code-header h3 {
    margin: 0;
    color: #ffffff;
    font-size: 0.88rem;
  }

  .copy-button {
    display: inline-flex;
    min-height: 32px;
    align-items: center;
    gap: 6px;
    padding: 6px 9px;
    border: 1px solid rgb(255 255 255 / 30%);
    border-radius: 5px;
    background: rgb(255 255 255 / 8%);
    color: #ffffff;
    cursor: pointer;
    font: inherit;
    font-size: 0.75rem;
    font-weight: 800;
  }

  .copy-button:hover {
    background: rgb(255 255 255 / 17%);
  }

  .access-page :global(.copy-icon) {
    width: 15px;
    height: 15px;
  }

  pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;
  }

  pre code {
    display: block;
    min-width: max-content;
    border-radius: 0;
    background: transparent;
    padding: 0;
    color: #e3f2ed;
    font-size: 0.82rem;
    line-height: 1.7;
  }

  .key-safety {
    gap: 9px;
    margin-top: 13px;
    color: var(--muted);
    font-size: 0.84rem;
  }

  .key-safety :global(.inline-icon) {
    color: var(--coral);
  }

  .key-safety code {
    overflow-wrap: anywhere;
  }

  .timeline {
    display: grid;
    position: relative;
    gap: 14px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .timeline::before {
    position: absolute;
    top: 19px;
    bottom: 19px;
    left: 15px;
    width: 1px;
    background: #ceddd8;
    content: "";
  }

  .timeline li {
    display: grid;
    grid-template-columns: 31px minmax(0, 1fr);
    position: relative;
    gap: 12px;
    align-items: start;
    color: var(--muted);
    font-size: 0.91rem;
    line-height: 1.6;
  }

  .timeline-number {
    display: grid;
    z-index: 1;
    width: 31px;
    height: 31px;
    place-items: center;
    border: 1px solid #cbdcd6;
    border-radius: 50%;
    background: #f4f7f6;
    color: var(--green);
    font-size: 0.73rem;
    font-weight: 850;
  }

  .timeline li div {
    padding-top: 3px;
  }

  .info-grid {
    margin-top: 12px;
  }

  .info-card {
    padding: 17px;
  }

  .access-page :global(.info-icon) {
    width: 27px;
    height: 27px;
    margin-bottom: 17px;
  }

  .access-page :global(.info-icon--green) {
    color: var(--green);
  }

  .access-page :global(.info-icon--coral) {
    color: var(--coral);
  }

  .access-page :global(.info-icon--blue) {
    color: var(--blue);
  }

  .faq-list {
    display: grid;
    gap: 8px;
  }

  details {
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #ffffff;
  }

  summary {
    min-height: 50px;
    padding: 13px 15px;
    cursor: pointer;
    font-size: 0.92rem;
    font-weight: 800;
  }

  details p {
    margin: 0;
    padding: 0 15px 15px;
    color: var(--muted);
    font-size: 0.87rem;
    line-height: 1.6;
  }

  .reference-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .reference-grid a {
    min-height: 50px;
    gap: 9px;
    padding: 12px 13px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #ffffff;
    color: var(--ink);
    font-size: 0.84rem;
    font-weight: 750;
    text-decoration: none;
  }

  .reference-grid a:hover {
    border-color: rgb(40 106 90 / 40%);
    background: #eef5f2;
    color: var(--deep-green);
  }

  .access-page :global(.reference-icon) {
    width: 19px;
    height: 19px;
    flex: 0 0 auto;
    color: var(--green);
  }

  .access-page :global(.reference-arrow) {
    width: 14px;
    height: 14px;
    flex: 0 0 auto;
    margin-left: auto;
    color: #7b8c87;
  }

  .access-footer {
    border-top: 1px solid var(--line);
    background: #ffffff;
  }

  .access-footer-inner {
    min-height: 66px;
    justify-content: space-between;
    gap: 18px;
    color: #697873;
    font-size: 0.78rem;
  }

  .access-footer-inner > span:first-child {
    color: var(--ink);
    font-weight: 800;
  }

  .access-footer-inner a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--green);
    font-weight: 800;
    text-decoration: none;
  }

  .access-page :focus-visible {
    outline: 3px solid rgb(250 70 22 / 42%);
    outline-offset: 3px;
  }

  @media (max-width: 1120px) {
    .access-header-inner,
    .access-hero-inner,
    .access-shell,
    .access-footer-inner {
      width: min(100% - 48px, 1240px);
    }

    .access-hero-inner {
      gap: 34px;
      grid-template-columns: minmax(0, 1fr) minmax(370px, 0.85fr);
    }

    .access-shell {
      gap: 30px;
      grid-template-columns: 190px minmax(0, 1fr);
    }

    h1 {
      font-size: 3.15rem;
    }

    .flow-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 860px) {
    .access-hero-inner {
      grid-template-columns: 1fr;
      min-height: 0;
      padding-top: 48px;
      padding-bottom: 48px;
    }

    .workflow-art {
      max-width: 700px;
    }

    .access-shell {
      grid-template-columns: 1fr;
    }

    .side-nav {
      position: static;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .side-nav-label {
      grid-column: 1 / -1;
    }

    .side-nav .side-nav-cta {
      grid-column: 1 / -1;
      margin-top: 4px;
    }
  }

  @media (max-width: 680px) {
    .access-header-inner,
    .access-hero-inner,
    .access-shell,
    .access-footer-inner {
      width: min(100% - 28px, 1240px);
    }

    .access-header-inner {
      min-height: auto;
      align-items: flex-start;
      flex-direction: column;
      gap: 12px;
      padding-top: 15px;
      padding-bottom: 13px;
    }

    .access-nav {
      width: 100%;
      justify-content: space-between;
      overflow-x: auto;
    }

    .access-nav a {
      flex: 0 0 auto;
      padding-right: 7px;
      padding-left: 7px;
      font-size: 0.76rem;
    }

    .access-hero-inner {
      padding-top: 38px;
      padding-bottom: 38px;
    }

    h1 {
      font-size: 2.3rem;
    }

    .hero-lead {
      font-size: 0.98rem;
    }

    .hero-actions,
    .button {
      width: 100%;
    }

    .hero-footnote {
      align-items: flex-start;
      font-size: 0.73rem;
    }

    .workflow-art {
      min-height: 0;
      padding: 15px;
    }

    .workflow-track {
      margin: 42px 0 44px;
    }

    .node-icon {
      width: 44px;
      height: 44px;
    }

    .node-icon :global(svg) {
      width: 20px;
      height: 20px;
    }

    .workflow-node strong {
      font-size: 0.67rem;
    }

    .workflow-node > span:last-child {
      display: none;
    }

    .flow-grid,
    .path-grid,
    .info-grid,
    .code-grid,
    .reference-grid {
      grid-template-columns: 1fr;
    }

    .side-nav {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .content-band {
      padding: 30px 0;
    }

    .content-band-first {
      padding-top: 0;
    }

    .section-heading h2 {
      font-size: 1.45rem;
    }

    .heading-with-progress {
      align-items: start;
      flex-direction: column;
      gap: 14px;
    }

    .progress-block {
      width: 100%;
      justify-items: start;
    }

    .checklist label {
      grid-template-columns: 22px minmax(0, 1fr) 19px;
      font-size: 0.83rem;
    }

    .timeline li {
      font-size: 0.86rem;
    }

    .access-footer-inner {
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
      padding-top: 16px;
      padding-bottom: 16px;
    }
  }
</style>
