<script lang="ts">
  import {
    eagleItemTemplateStorage,
    parseEagleItemTemplate,
  } from "@/lib/options";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
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
  let title = "";
  let annotation = "";
  let firstTitle = "";
  let firstAnnotation = "";
  $: unSaved = title !== firstTitle || annotation !== firstAnnotation;
  let noticeSaved = "";
  let errorMessage = "";

  onMount(async () => {
    ({ title, annotation } = await eagleItemTemplateStorage.getValue());
    firstTitle = title;
    firstAnnotation = annotation;
  });

  async function onclick() {
    try {
      errorMessage = "";
      errorMessage = await parseEagleItemTemplate({ title, annotation });
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
    }
  }
</script>

<div class="mx-6 w-96">
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <span class="text-xl">Eagle Item Template</span>
      {#if unSaved}
        <span class="label-text-alt">
          <div class="badge badge-primary">unsaved</div>
        </span>
      {/if}
    </div>
    <!-- TODO: コピーボタンの設置 -->
    <!-- TODO: 説明の設置 -->
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
    </label>
    {#if errorMessage}
      <p class="text-error text-base">{errorMessage}</p>
    {/if}
    <div></div>
    <button
      on:click={onclick}
      class={saveButton({
        state: unSaved ? "unsaved" : "saved",
      })}>Button</button
    >
  </div>
  <!-- toast -->
  {#if noticeSaved !== ""}
    <div class="toast toast-top toast-start" in:fly={{ y: -20 }}>
      <div class="alert alert-success">
        <span>{noticeSaved}</span>
      </div>
    </div>
  {/if}
</div>
