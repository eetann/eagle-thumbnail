<script lang="ts">
  import { fly } from "svelte/transition";
  import { getApiToken, setApiToken } from "@/lib/saveEagle";
  import { onMount } from "svelte";
  import { tv } from "tailwind-variants";
  const saveButton = tv({
    base: "btn",
    variants: {
      state: {
        saved: "",
        unsaved: "btn-primary",
      },
    },
  });
  let typingApiToken = "";
  let savedApiToken = "";
  let noticeSaved = "";

  onMount(async () => {
    typingApiToken = await getApiToken();
    savedApiToken = typingApiToken;
  });

  async function onclick() {
    try {
      await setApiToken(typingApiToken);
      savedApiToken = typingApiToken;
      noticeSaved = "Saved!";
      setTimeout(() => {
        noticeSaved = "";
      }, 3000);
    } catch (e) {
      /* handle error */
      console.log(e);
    }
  }
</script>

<div class="mx-6 w-96">
  <div class="space-y-4">
    <label for="" class=" form-control w-full max-w-lg">
      <!-- タイトル -->
      <div class="label">
        <span class="label-text">Title</span>
      </div>
      <textarea class="textarea textarea-bordered h-24" placeholder="Title Here"
      ></textarea>
      <!-- メモ -->
      <div class="label">
        <span class="label-text">Memo</span>
      </div>
      <textarea class="textarea textarea-bordered h-24" placeholder="Memo Here"
      ></textarea>
    </label>
    <button
      on:click={onclick}
      class={saveButton({
        state: savedApiToken === typingApiToken ? "saved" : "unsaved",
      })}>Button</button
    >
  </div>
  <!-- toast -->
  {#if noticeSaved !== ""}
    <div class="toast toast-top toast-end" in:fly={{ y: -20 }}>
      <div class="alert alert-success">
        <span>{noticeSaved}</span>
      </div>
    </div>
  {/if}
</div>
