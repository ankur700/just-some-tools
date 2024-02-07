<script>
  import {onMount} from 'svelte';
  import {copy, clearContent} from '$lib/utils/utils.js';
  import { convertToUnicode} from 'nepali-text-conversion';

  let PreetiText, UnicodeText;
  onMount(() => {
    PreetiText = document.getElementById('preeti_text');
    UnicodeText = document.getElementById('unicode_text');
  });
  function handleChange() {
    UnicodeText.value = convertToUnicode(PreetiText.value);
  }
</script>

<svelte:head>
  <title>Nepali Preeti to Unicode Converter</title>
</svelte:head>

<form name="nepali" class=" flex flex-col gap-10">
  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button
      class="btn font-bold py-2 px-4 rounded"
      on:click={e => copy(e, UnicodeText)}>Copy Unicode</button
    >
    <button
      class="btn font-bold py-2 px-4 rounded"
      on:click={() => clearContent(PreetiText, UnicodeText)}>Clear</button
    >
  </div>
  <div class="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4">
    <textarea
      rows="20"
      placeholder="यहाँ प्रीती फन्ट टाइप गर्नुहोस"
      id="preeti_text"
      name="textToConvert"
      on:keyup={() => handleChange()}
      class=" textarea_unicode textarea textarea-bordered textarea-lg w-full text-sm sm:text-md md:text-xl sm:leading-6"
    ></textarea>

    <textarea
      rows="20"
      id="unicode_text"
      name="ConvertedText"
      class=" textarea_unicode block textarea textarea-bordered textarea-lg w-full text-sm sm:text-md md:text-xl sm:leading-6"
    ></textarea>
  </div>
</form>
