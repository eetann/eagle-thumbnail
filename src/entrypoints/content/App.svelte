<script lang="ts">
  import { save } from "@/lib/saveEagle";
  let videoId = new URL(location.href).searchParams.get("v");
  const title =
    document.getElementsByName("title")[0]?.getAttribute("content") ?? "";

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

<div class="mb-6">
  <div class="card bg-base-100">
    {#if videoId}
      <figure>
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
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
</div>
