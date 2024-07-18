<script lang="ts">
  import Icon from "@iconify/svelte";
  export let text: string;
</script>

<button
  class="btn btn-xs"
  on:click={async () => {
    try {
      const item = [
        new ClipboardItem({
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ];
      await navigator.clipboard.write(item);
    } catch (e) {
      console.log("Failed to copy text", e);
    }
  }}
  >{text}
  <Icon icon="lucide:copy" width="16" height="16" />
</button>
