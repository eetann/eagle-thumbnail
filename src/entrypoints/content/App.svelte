<script lang="ts">
  import { save } from "@/lib/saveEagle";
  let videoId = new URL(location.href).searchParams.get("v");
  const title =
    document.getElementsByName("title")[0]?.getAttribute("content") ?? "";

  let errMsg = "";

  async function onclick() {
    try {
      errMsg = "";
      await save(
        title,
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        location.href,
      );
    } catch (e) {
      /* handle error */
      errMsg = e as string;
    }
  }
</script>

<div class="mb-6">
  <div class="card bg-base-100">
    {#if videoId}
      <figure>
        <img
          id="eagleThumbnailImage"
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
        />
      </figure>

      <div class="card-body">
        {#if errMsg !== ""}
          <p>{errMsg}</p>
        {/if}
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
