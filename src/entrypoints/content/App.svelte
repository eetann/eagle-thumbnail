<script lang="ts">
  import { save } from "@/lib/saveEagle";
  let videoId = new URL(location.href).searchParams.get("v");
  let title =
    document.getElementsByName("title")[0]?.getAttribute("content") ?? "";
  let previousURL = location.href;

  // YouTubeはSPA = 別の動画に移ってもリロードされないため手動でURLの変更を検知する
  // browser.tabsはcontentだと使えない
  const observer = new MutationObserver(() => {
    const nowURL = location.href;
    if (previousURL === nowURL) {
      return;
    }
    console.log("EagleThumbnail detect CHANGE!");
    videoId = new URL(location.href).searchParams.get("v");
    title =
      document.getElementsByName("title")[0]?.getAttribute("content") ?? "";
  });
  observer.observe(document.head, {
    childList: true,
    attributes: true,
    attributeFilter: ["href"],
  });

  async function onclick() {
    try {
      await save(
        title,
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        location.href,
      );
    } catch (e) {
      console.log(e);
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
