<script lang="ts">
  import { save } from "@/lib/saveEagle";
  let videoId = new URL(location.href).searchParams.get("v");

  let errMsg = "";

  async function onclick() {
    try {
      errMsg = "";
      await save();
    } catch (e) {
      /* handle error */
      errMsg = e as string;
    }
  }
</script>

<main id="app" class="my-4" data-theme="dim">
  <div class="card bg-base-100">
    {#if videoId}
      <figure>
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="サムネイル"
        />
      </figure>

      <div class="card-body">
        {#if errMsg !== ""}
          <p>{errMsg}</p>
        {/if}
        <div class="card-actions justify-end">
          <button on:click={onclick} class="btn btn-md btn-primary">Save</button
          >
        </div>
      </div>
    {/if}
  </div>
  <button on:click={onclick} class="btn btn-lg btn-primary">Save</button>
</main>

<style>
  #app {
    font-size: 16px;
  }
</style>
