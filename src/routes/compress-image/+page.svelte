<script lang="ts">
	import { compressImage, readableBytes } from '$lib/utils/utils.js';
	import { onMount } from 'svelte';

	let quality = 80;
	let blobUrl = '';
	let filename = '';
	let MIME_TYPE = '';
	let MAX_WIDTH = 640;
	let MAX_HEIGHT = 360;
	let selectedSize = 'Medium 1280x720';
	let uploadedImageInput;
	let uploadedImageFile: File;
	$: originalImageSize = 6840000;
	$: compressedImageSize = 312150;
	$: compressionRatio = Math.floor(originalImageSize / compressedImageSize);

	onMount(() => {
		uploadedImageInput = document.getElementById('upload');
	});

	function handleSizeChange(e: Event) {
		console.log(e.target);
		selectedSize = e.target?.value;
		switch (selectedSize) {
			case 'Large 1920x1080':
				MAX_WIDTH = 1920;
				MAX_HEIGHT = 1080;
				break;
			case 'Medium 1280x720':
				MAX_WIDTH = 1280;
				MAX_HEIGHT = 720;
				break;
			case 'Small 640x360':
				MAX_WIDTH = 640;
				MAX_HEIGHT = 360;
				break;
			default:
				MAX_WIDTH = 1280;
				MAX_HEIGHT = 720;
				break;
		}
	}

	function handleCompress() {
		compressImage(
			MAX_WIDTH,
			MAX_HEIGHT,
			quality,
			uploadedImageFile,
			MIME_TYPE,
			originalImageSize,
			compressedImageSize,
			compressionRatio,
			filename
		);
	}

	function handleInput(e: Event) {
		const originalImage = document.getElementById('originalImage');
		const [file] = e.target?.files;
		uploadedImageFile = file;
		blobUrl = URL.createObjectURL(file);
		// storing the original image
		MIME_TYPE = file.type;
		filename = file.name;
		filename = filename.replace('.', '_compressed.');
		originalImage?.setAttribute('src', blobUrl);
	}
</script>

<svelte:head>
	<title>Compress or Resize images</title>
</svelte:head>

<section>
	<div id="container" class="relative mx-auto flex min-h-[50vh] w-full flex-col p-4 2xl:max-w-7xl">
		<!-- Starts component -->
		<div class="diff mx-auto aspect-[16/9] max-w-4xl">
			<span class="badge badge-md absolute bottom-0 right-0 z-10 w-24 rounded-none bg-base-200 p-2"
				>Orignal</span
			>
			<span class="badge badge-md absolute bottom-0 left-0 z-10 w-24 rounded-none bg-base-200 p-2"
				>Compressed</span
			>
			<div class="diff-item-1">
				<img id="originalImage" src="/images/demo.jpg" alt="Before compression" />
			</div>
			<div class="diff-item-2">
				<img id="compressedImage" src="/images/compressed.jpeg" alt="After compression" />
			</div>
			<div class="diff-resizer"></div>
		</div>

		<span class="mx-auto p-2 text-sm"
			>Original - {readableBytes(originalImageSize)} | Compressed - {readableBytes(
				compressedImageSize
			)} | compression ratio: {compressionRatio}:1</span
		>
	</div>
	<div class="controls flex items-center justify-center gap-4">
		<div class="flex flex-col">
			<select
				on:change={(e) => handleSizeChange(e)}
				name="size"
				id="size"
				bind:value={selectedSize}
				class="select select-bordered w-full max-w-[200px]"
			>
				<option>Large 1920x1080</option>
				<option selected>Medium 1280x720</option>
				<option>Small 640x360</option>
			</select>
		</div>
		<div class=" ">
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
		</div>
		<input
			id="upload"
			type="file"
			class=" file-input file-input-bordered w-full max-w-xs flex-1"
			accept="image/.png, image/.jpg, image/.jpeg"
			on:change={(e) => handleInput(e)}
		/>

		<button class="w-xs btn" id="uploadButton" on:click={() => handleCompress()}> Compress </button>
	</div>
</section>
