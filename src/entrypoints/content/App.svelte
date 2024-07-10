<script lang="ts">
  import { save } from "@/lib/saveEagle";
  import { onMount } from "svelte";

  let videoId = "";
  let title = "";
  let previousURL = location.href;

  function updateVideoInfo() {
    const urlParams = new URL(location.href).searchParams;
    videoId = urlParams.get("v") ?? "";
    title = document.title;
  }

  onMount(() => {
    updateVideoInfo();

    // YouTubeはSPA = 別の動画に移ってもリロードされないため手動でURLの変更を検知する
    // browser.tabsはcontentだと使えない
    const observer = new MutationObserver(() => {
      const nowURL = location.href;
      if (previousURL !== nowURL) {
        updateVideoInfo();
      }
    });
    observer.observe(document.getElementsByTagName("title")[0], {
      childList: true,
      attributes: true,
      attributeFilter: ["href"],
    });
    return () => observer.disconnect();
  });

  async function onclick() {
    if (videoId === "" || title === "") {
      return;
    }
    try {
      await save(
        title,
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        location.href,
      );
    } catch (e) {
      console.log("Failed to save to Eagle", e);
    }
  }
</script>

<div class="mb-6">
  <div class="card bg-base-100 card-compact">
    {#if videoId}
      <figure>
        <img
          id="eagleThumbnailImage"
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
        />
      </figure>

      <div class="card-body">
        <div class="card-actions justify-end">
          <div class="tooltip before:text-lg" data-tip="Save to Eagle">
            <button on:click={onclick} class="btn btn-lg btn-primary"
              >Save</button
            >
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
