<script lang="ts">
  import { save } from "@/lib/saveEagle";
  import { getLargestImage } from "@/lib/getImage";
  import { sendMessage } from "@/lib/message";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let videoId = "";
  let title = "";
  let imageURL = "";
  let previousURL = location.href;

  async function updateVideoInfo() {
    const urlParams = new URL(location.href).searchParams;
    videoId = urlParams.get("v") ?? "";
    title = document.title;
    imageURL = await getLargestImage(videoId);
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
    });
    return () => observer.disconnect();
  });

  async function onclick() {
    if (videoId === "" || title === "" || imageURL === "") {
      return;
    }
    try {
      await save(title, imageURL, videoId);
    } catch (e) {
      console.log("Failed to save to Eagle", e);
    }
  }
</script>

<div class="mb-6">
  <div class="card bg-base-100 card-compact">
    {#if imageURL}
      <figure class="pt-4 px-4">
        <img id="eagleThumbnailImage" src={imageURL} alt={title} />
      </figure>

      <div class="card-body">
        <div class="card-actions justify-between">
          <button
            on:click={() => {
              sendMessage("openOptionsPage", undefined);
            }}
            class="btn btn-lg text-[12px]"
          >
            <Icon icon="lucide:settings" width="16" height="16" />
            Edit Template</button
          >
          <div class="tooltip before:text-lg" data-tip="Save to Eagle">
            <button
              on:click={onclick}
              class="btn btn-lg btn-primary text-[14px]">Save</button
            >
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
