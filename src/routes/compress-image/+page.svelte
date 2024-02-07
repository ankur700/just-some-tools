<script lang="ts">
  import {onMount} from 'svelte';
  import {compressImage, displayInfo} from '$lib/utils/utils.js';
  import Loading from '$lib/components/loading.svelte';
  let blobUrl = '',
    filename = '',
    compressedImageSrc = '';
  let MIME_TYPE = 'image/jpeg';
  let width = 640,
    height = 360,
    quality = 80;
  let originalWidth, originalHeight, selectedSize = 'Select Size';
  $: setloading = false;
  $: downloadLink = compressedImageSrc ? compressedImageSrc : null;

  onMount(() => {
    const originalSize = document.getElementById('originalSize');
    const originalImage = document.getElementById('originalImage');
    const compressedSize = document.getElementById('compressedSize');

    const image = new Image();
    image.src = originalImage.getAttribute('src');
    image.onload = () => {
      URL.revokeObjectURL(image.src);
      originalWidth = image.naturalWidth;
      originalHeight = image.naturalHeight;
    };
    originalSize.innerText = `Size: 6.84MB`;
    compressedSize.innerText = `Size: 312.13 KB`;

  });

  function handleSizeChange(e) {
    selectedSize = e.target.value;
    switch (selectedSize) {
      case 'Large':
        width = 1920;
        height = 1080;
        break;
      case 'Medium':
        width = 1280;
        height = 720;
        break;
      case 'Small':
        width = 640;
        height = 360;
        break;
      default:
        width = 640;
        height = 360;
        break;
    }
  }

  function handleCompress() {
    setloading = true;
    compressImage(width, height, quality, blobUrl, MIME_TYPE);
    setTimeout(() => {
      setloading = false;
      compressedImageSrc = document.getElementById('compressedImage').getAttribute('src');
    }, 1500);
  }

  function handleInput(e) {
    const originalImage = document.getElementById('originalImage');
    const originalSize = document.getElementById('originalSize');
    const [file] = e.target.files;
    const image = new Image();
    MIME_TYPE = file.type;
    filename = file.name;
    filename = filename.replace('.', '_compressed.');
    // storing the original image
    blobUrl = URL.createObjectURL(file);
    image.src = blobUrl;

    image.onload = () => {
      URL.revokeObjectURL(image.src);
      originalWidth = image.naturalWidth;
      originalHeight = image.naturalHeight;
    }
    displayInfo(file, originalSize);
    originalImage.setAttribute('src', blobUrl);
    compressedImageSrc = '';
  }
</script>

<svelte:head>
  <title>Compress or Resize images</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-10 text-center">
  Resizing and compressing images using javascript
</h1>
<div class="flex flex-col gap-10 align-center">
  <div class="grid grid-cols-2 gap-6">
    <div class=" flex flex-col gap-4">
      <figure
        class="rounded-lg w-full backdrop-blur bg-opacity-80 shadow-xl bg-base-100"
      >
        <img
          id="originalImage"
          src="/images/demo.jpg"
          alt="raw"
          class=" rounded-lg w-full align-middle border-none"
          crossorigin="anonymous"
        />
      </figure>
      <div class="flex flex-wrap justify-center mt-4 gap-4">
        <span class="badge p-3 badge-lg badge-primary font-semibold">
          Original </span
        >
        <span class="badge p-3 badge-lg badge-neutral"
          >Width: {(originalWidth || '0') + ' px'}</span
        >
        <span class="badge p-3 badge-lg badge-neutral"
          >Height: {(originalHeight || '0') + ' px'}</span
        >
        <span class="badge p-3 badge-lg badge-neutral" id="originalSize"></span>
      </div>
    </div>

    <div class=" flex flex-col gap-4 justify-center align-center">
      {#if setloading}
        <div
          class="rounded-lg flex justify-center align-center h-full backdrop-blur bg-opacity-80 shadow-xl bg-base-100"
        >
          <Loading />
        </div>{/if}
      <figure
        class={' rounded-lg w-full h-full backdrop-blur bg-opacity-80 shadow-xl bg-base-100' +
          (setloading ? ' hidden' : '')}
      >
        <img
          id="compressedImage"
          src="/images/compressed.jpeg"
          alt="compressed"
          class="rounded-lg w-full align-middle border-none"
          crossorigin="anonymous"
        />
      </figure>
      <div class="flex flex-wrap mt-4 justify-center gap-4">
        <span class="badge badge-lg p-3 badge-secondary font-semibold">
          Processed
        </span>
        <span class="badge badge-lg p-3 badge-neutral"
          >Width: {(width || '0') + ' px'}</span
        >
        <span class="badge badge-lg p-3 badge-neutral"
          >Height: {(height || '0') + ' px'}</span
        >
        <span class="badge badge-lg p-3 badge-neutral" id="compressedSize"
        ></span>
      </div>
    </div>
  </div>

  <div class="controls flex gap-8 items-center">
    <div class="flex flex-col">
      <select
        on:change={e => handleSizeChange(e)}
        name="size"
        id="size"
        bind:value={selectedSize}
        class="select select-bordered w-full max-w-xs"
      >
        <option disabled selected>Select Size</option>
        <option>Large</option>
        <option>Medium</option>
        <option>Small</option>
      </select>
      <div class="flex gap-4">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Width</span>
            <span class="label-text-alt">in px</span>
          </div>
          <input
            type="text"
            name="width"
            value={width}
            class="input input-bordered w-full max-w-xs"
          />
        </label>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Height</span>
            <span class="label-text-alt">in px</span>
          </div>
          <input
            type="text"
            name="height"
            value={height}
            class="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
    </div>

    <div class="mx-auto flex-1 max-w-2xl">
      <label for="qualityRange">Quality: {quality}</label>
      <input
        type="range"
        min="0"
        max="100"
        bind:value={quality}
        name="qualityRange"
        id="qualityRange"
        class="range range-xs"
        step="10"
      />
      <div class="w-full flex justify-between text-xs px-2">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
    </div>
  </div>
  <div class="w-full flex gap-10 lg:gap-20 justify-center">
    <input
      id="upload"
      type="file"
      class=" flex-1 file-input file-input-bordered w-full max-w-lg"
      accept="image/*"
      on:change={e => handleInput(e)}
    />
    <button
      class="btn w-64"
      id="uploadButton"
      disabled={setloading}
      on:click={() => handleCompress()}
    >
      {#if setloading}
        <span class="loading loading-ring loading-lg"></span>
      {:else}
        Compress
      {/if}
    </button>
    {#if downloadLink}
      <a
        id="download"
        class="btn"
        title="download"
        aria-label="download"
        href={downloadLink}
        download={filename || 'compressed.' + MIME_TYPE}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </a>
    {/if}
  </div>
</div>
