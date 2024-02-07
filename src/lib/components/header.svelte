<script>
  import {browser} from '$app/environment';
  import {onMount} from 'svelte';

  let theme = 'lemonade';
  let textSize = 100;
  let maxSize = 150;
  let minSize = 90;
  let rootElement;

  onMount(() => {
    rootElement = document.querySelector(':root');

    if (browser) {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      theme = 'dark';
      rootElement
        .setAttribute('data-theme', theme);
    } else {
      theme = localStorage.getItem('theme') || 'lemonade';
      rootElement
        .setAttribute('data-theme', theme);
    }
  }
  });

  function handleIncrement(e) {
    e.preventDefault();
    e.stopPropagation();
    if (textSize > maxSize) return alert('Text size can not be more than 150%');
    textSize += 10;
    rootElement.style.setProperty('--text-size', textSize.toString() + '%');
  }

  function handleDecrement(e) {
    e.preventDefault();
    e.stopPropagation();
    if (textSize < minSize) return alert('Text size can not be less than 90%');
    textSize -= 10;
    rootElement.style.setProperty('--text-size', textSize.toString() + '%');
  }
  function handleReset(e) {
    e.preventDefault();
    e.stopPropagation();
    textSize = 100;
    rootElement.style.setProperty('--text-size', textSize.toString() + '%');
  }


  let themeOptions = [
    'light',
    'dark',
    'corporate',
    'retro',
    'dracula',
    'lemonade',
    'dim'
  ];
  function onChange(event) {
    theme = event.currentTarget.value;
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
</script>

<header class="text-base-content flex h-18 shadow-sm px-8">
  <nav class="navbar">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost">
          <span class="sr-only"> Menu Button </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            /></svg
          >
        </div>
        <ul
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 w-52"
        >
          <li><a href="/unicode-to-preeti">Unicode to Preeti</a></li>
          <li><a href="/preeti-to-unicode">Preeti to Unicode</a></li>
          <li><a href="/compress-image">Compress Image</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center hidden md:flex">
      <a href="/">
        <span title="just some tools" class="text-xl font-bold">JST</span>
        <span class="sr-only"> JST </span>
      </a>
    </div>

    <div class="navbar-end flex gap-4 align-center">
      <div class="  ">
        <button
          on:click={e => handleDecrement(e)}
          class="btn btn-xs tooltip tooltip-bottom"
          data-tip="Decrease Font Size"
          >A-
        </button>
        <button
          on:click={e => handleIncrement(e)}
          data-tip="Increase font size"
          class="btn btn-sm tooltip tooltip-bottom "
          >A+
        </button>
        <button
          on:click={e => handleReset(e)}
          class="btn btn-sm tooltip tooltip-bottom"
          data-tip="Reset"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-3 h-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
      <div class="dropdown ml-4">
        <div tabindex="0" role="button" class="btn m-1">
          Theme
          <svg
            width="12px"
            height="12px"
            class="h-2 w-2 fill-current opacity-60 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
            ><path
              d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
            ></path></svg
          >
        </div>
        <ul
          tabindex="-1"
          class="dropdown-content right-0 z-[1] p-2 shadow-2xl bg-base-300 w-52"
        >
          {#each themeOptions as theme}
            <li>
              <input
                type="radio"
                on:change={onChange}
                name="theme-dropdown"
                class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={theme}
                value={theme}
              />
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </nav>
</header>
