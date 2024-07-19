<script lang="ts">
  import {
    PATTERN_CHANNEL_NAME,
    PATTERN_VIDEO_TITLE,
    eagleItemTemplateStorage,
    parseEagleItemTemplate,
  } from "@/lib/options";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import TextCanCopy from "./TextCanCopy.svelte";
  let title = "";
  let annotation = "";
  let firstTitle = "";
  let firstAnnotation = "";
  $: unSaved = title !== firstTitle || annotation !== firstAnnotation;
  let isSaving = false;

  let noticeSaved = "";
  let errorMessage = "";

  onMount(async () => {
    ({ title, annotation } = await eagleItemTemplateStorage.getValue());
    firstTitle = title;
    firstAnnotation = annotation;
  });

  async function onclick() {
    if (isSaving) return; // 複数回クリックの禁止
    isSaving = true;

    try {
      errorMessage = "";
      errorMessage = parseEagleItemTemplate({ title, annotation });
      if (errorMessage === "") {
        await eagleItemTemplateStorage.setValue({ title, annotation });
        noticeSaved = "Saved!";
        firstTitle = title;
        firstAnnotation = annotation;
        setTimeout(() => {
          noticeSaved = "";
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isSaving = false;
    }
  }
</script>

<div class="mx-6 w-96">
  <h1 class="text-3xl mb-6">Thumbnail To Eagle</h1>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <span class="text-xl">Template</span>
    </div>
    <div class="text-base flex flex-col gap-2">
      <p>
        This is a template for text that is automatically entered when saving to
        Eagle.
      </p>
      <p>The following two will be replaced.</p>
      <ul class="list-disc pl-6">
        <li>
          <TextCanCopy text={PATTERN_VIDEO_TITLE} /> = the title of the video
        </li>
        <li>
          <TextCanCopy text={PATTERN_CHANNEL_NAME} /> = the channel name
        </li>
      </ul>
    </div>
    <label for="" class=" form-control w-full max-w-lg">
      <!-- タイトル -->
      <div class="label">
        <span class="label-text">Title</span>
      </div>
      <input
        bind:value={title}
        type="text"
        class="input input-bordered max-w-lg"
      />
      <!-- アノテーション -->
      <div class="label">
        <span class="label-text">Annotation</span>
      </div>
      <textarea bind:value={annotation} class="textarea textarea-bordered h-24"
      ></textarea>
      <div class="label">
        <span class="label-text-alt text-warning">
          Annotation is written to the clipboard. Paste it yourself.
        </span>
      </div>
    </label>
    {#if errorMessage}
      <p class="text-error text-base">{errorMessage}</p>
    {/if}
    <!-- ボタン -->
    <div class="indicator">
      {#if unSaved}
        <span class="indicator-item badge badge-primary">unsaved</span>
      {/if}
      <button on:click={onclick} class="btn">Button</button>
    </div>
  </div>
  <!-- toast -->
  {#if noticeSaved !== ""}
    <div class="toast toast-top toast-start" in:fly={{ y: -20 }}>
      <div class="alert alert-success text-base">
        <span>{noticeSaved}</span>
      </div>
    </div>
  {/if}
</div>
