<script lang="ts">
	import { convertToPreeti, convertToUnicode } from 'nepali-text-conversion';

	let PreetiText ="";
	let UnicodeText = "";
	let PreetiTextTwo ="";
	let UnicodeTextTwo = "";
  let selectedTab = "p2u";

	$: displayText = selectedTab == "p2u" ? " Unicode" : " Preeti";

	function handlePreetiToUnicode() {
		UnicodeText = convertToUnicode(PreetiText) || 'Invalid Preeti Text';
	}

  function handleUnicodeToPreeti() {
		PreetiTextTwo = convertToPreeti(UnicodeTextTwo);
	}

 function clearContent() {
	const textBoxes = document.querySelectorAll('textarea');
	textBoxes.forEach((textBox) => {
		textBox.value = '';
	});
}
 function copy() {
	navigator.clipboard.writeText(selectedTab == "u2p" ? PreetiText : UnicodeText);
}
</script>

<svelte:head>
	<title>Nepali Text Conversion</title>
</svelte:head>

<form name="nepali" class=" flex flex-col mx-auto max-w-5xl gap-10">
	<div class="mt-4 flex items-center justify-end gap-x-6">
		<button class="btn rounded px-4 py-2 font-bold" on:click={copy}
			>Copy {displayText}</button
		>
		<button
			class="btn rounded px-4 py-2 font-bold"
			on:click={() => clearContent()}>Clear</button
		>
	</div>
	<div role="tablist" class="tabs tabs-lifted tabs-lg">
		<input type="radio" bind:value={selectedTab} on:change={() => {selectedTab = "p2u"}} name="textConversion" checked={selectedTab == "p2u"} role="tab" class="tab w-content" aria-label="Preeti To Unicode" />
		<div role="tabpanel" class="tab-content rounded-box border-base-300 bg-base-100 p-6">
			<div class="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4">
				<textarea
					rows="15"
					placeholder="यहाँ प्रीती फन्ट टाइप गर्नुहोस"
					id="preeti_text"
					name="textToConvert"
					bind:value={PreetiText}
					on:keyup={handlePreetiToUnicode}
					class=" textarea_unicode sm:text-md textarea textarea-bordered textarea-lg w-full text-sm sm:leading-6 md:text-xl"
				></textarea>

				<textarea
					rows="15"
					bind:value={UnicodeText}
					id="unicode_text"
					name="ConvertedText"
					class=" textarea_unicode sm:text-md textarea textarea-bordered textarea-lg block w-full text-sm sm:leading-6 md:text-xl"
				></textarea>
			</div>
		</div>

		<input type="radio" bind:value={selectedTab} on:change={() => {selectedTab = "u2p"}} name="textConversion" role="tab" class="tab" aria-label="Unicode To Preeti" checked={selectedTab == "u2p"} />
		<div role="tabpanel" class="tab-content rounded-box border-base-300 bg-base-100 p-6">
			<div class="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4">
				<textarea
					rows="20"
					placeholder="type in roman nepali or paste unicode text."
					id="unicode_text_two"
					bind:value={UnicodeTextTwo}
					name="unicodebox"
					on:keyup={handleUnicodeToPreeti}
					class=" textarea_unicode sm:text-md textarea textarea-bordered textarea-lg w-full text-sm sm:leading-6 md:text-xl"
				></textarea>

				<textarea
					rows="20"
					bind:value={PreetiTextTwo}
					id="legacy_text_two"
					name="ConvertedText"
					class=" textarea_unicode sm:text-md textarea textarea-bordered textarea-lg block w-full text-sm sm:leading-6 md:text-xl"
				></textarea>
			</div>
		</div>
	</div>
</form>
