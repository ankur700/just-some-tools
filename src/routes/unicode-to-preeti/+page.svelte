<script>
  import {copy, clearContent} from '$lib/utils/utils.js';
  import {convertToPreeti} from 'nepali-text-conversion';
  import {onMount} from 'svelte';

  let unicode_text_two, legacy_text_two;

  onMount(() => {
    unicode_text_two = document.getElementById('unicode_text_two');
    legacy_text_two = document.getElementById('legacy_text_two');
  });

  function handleChange() {
   legacy_text_two.value = convertToPreeti(unicode_text_two.value);
  }
</script>

<svelte:head>
  <title>Nepali Unicode to Preeti Converter</title>
</svelte:head>

<form name="nepali" class=" flex flex-col gap-10">
  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button
      class="btn btn-glass font-bold py-2 px-4"
      on:click={e => copy(e, legacy_text_two)}
    >
      Copy Preeti
    </button>
    <button
      class="btn font-bold py-2 px-4 "
      on:click={e => clearContent(unicode_text_two, legacy_text_two)}
      >Clear
    </button>
  </div>
  <div class="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4">
    <textarea
      rows="20"
      placeholder="type in roman nepali or paste unicode text."
      id="unicode_text_two"
      name="unicodebox"
      on:keyup={() => handleChange()}
      class=" textarea_unicode textarea textarea-bordered textarea-lg w-full text-sm sm:text-md md:text-xl sm:leading-6"
    ></textarea>

    <textarea
      rows="20"
      id="legacy_text_two"
      name="ConvertedText"
      class=" textarea_unicode block textarea textarea-bordered textarea-lg w-full text-sm sm:text-md md:text-xl sm:leading-6"
    ></textarea>
  </div>
</form>
