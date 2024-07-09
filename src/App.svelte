<script lang="ts">
  // import svelteLogo from './assets/svelte.svg'
  // import viteLogo from './assets/vite.svg'
  // import Counter from './lib/Counter.svelte'
  import gmFetch from "@sec-ant/gm-fetch";

  function handleMousemove(event: MouseEvent) {
    m.x = event.clientX;
    m.y = event.clientY;
  }

  async function fetchCommentHTML(link: string) {
    const response = await gmFetch(link);

    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    let comments = doc.querySelector(".Layout-main");

    return comments;
  }

  const body = document.body;
  const notifications = document.querySelectorAll(
    ".Box-body ul .notification-list-item-link",
  );

  let hoveringNotification = $state(false);
  let activeHTML = $state("");
  let timeoutInstance = $state(0);
  let m = $state({ x: 0, y: 0 });

  body.addEventListener("mousemove", handleMousemove);

  notifications.forEach((notification) => {
    notification.addEventListener("mouseenter", async (a) => {
      hoveringNotification = true;
      const target = a.target as HTMLAnchorElement;
      const targetLink = target.href;
      if (!targetLink) return;

      timeoutInstance = setTimeout(async () => {
        const comments = await fetchCommentHTML(targetLink);
        if (comments) {
          activeHTML = comments.innerHTML;
        }
      }, 200);
    });

    notification.addEventListener("mouseleave", () => {
      hoveringNotification = false;
      clearTimeout(timeoutInstance);
      activeHTML = "";
    });
  });
</script>

{#if hoveringNotification}
  {#if activeHTML}
    <div
      class="w-[800px] h-screen flex flex-col-reverse backdrop-blur"
      style="position:absolute;top:{m.y-200}px;left:{m.x+20}px;">
      {@html activeHTML}
    </div>
  {/if}
{/if}

<!-- <main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main> -->

<style>
  /* .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  } */
</style>
