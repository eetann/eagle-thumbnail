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
  let noticeApiToken = "";

  onMount(async () => {
    typingApiToken = await getApiToken();
    savedApiToken = typingApiToken;
  });

  async function onclick() {
    try {
      await setApiToken(typingApiToken);
      savedApiToken = typingApiToken;
      noticeApiToken = "API Token Saved!";
      setTimeout(() => {
        noticeApiToken = "";
      }, 3000);
    } catch (e) {
      /* handle error */
      console.log(e);
    }
  }
</script>

<div class="mx-6 w-96">
  <div class="space-y-4">
    <label for="" class=" form-control w-full max-w-lg"
      ><div class="label">
        <span class="label-text">API Token</span>
        {#if savedApiToken !== typingApiToken}
          <span class="label-text-alt">
            <div class="badge badge-primary">unsaved</div>
          </span>
        {/if}
      </div>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-lg"
        bind:value={typingApiToken}
      />
    </label>
    <button
      on:click={onclick}
      class={saveButton({
        state: savedApiToken === typingApiToken ? "saved" : "unsaved",
      })}>Button</button
    >
  </div>
  <!-- toast -->
  {#if noticeApiToken !== ""}
    <div class="toast toast-top toast-end" in:fly={{ y: -20 }}>
      <div class="alert alert-success">
        <span>{noticeApiToken}</span>
      </div>
    </div>
  {/if}
</div>
