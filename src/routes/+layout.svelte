<script lang="ts">
  import { page } from '$app/stores'

  import { goto } from '$app/navigation'
  import '@unocss/reset/tailwind.css'
  import { fade } from 'svelte/transition'
  import 'virtual:uno.css'
  import { capitalize } from '../utils/string'

  export const pageURLs = ['/', '/001--questions', '/002--brute-force-animation']

  const getPageIndex = (url: string | null) => {
    if (url === null) return null
    const indexOfURL = pageURLs.indexOf(url)
    console.assert(indexOfURL !== -1, `URL ${url} is not in pageURLs`)
    return indexOfURL === -1 ? null : indexOfURL
  }

  const getPageURL = (index: number | null, next: number) => {
    if (index === null) return null
    return pageURLs[index + next] ?? null
  }

  const getPageName = (url: string) => {
    if (url === '/') return 'Home'
    // url format: /001--questions
    const [, name] = url.split('--')
    return capitalize(name).replaceAll('-', ' ')
  }

  $: currentURL = $page.route.id
  $: pageIndex = getPageIndex($page.route.id)
  $: isFirstPage = pageIndex === 0
  $: isLastPage = pageIndex === pageURLs.length - 1
  $: isPreviousPage = !isFirstPage && pageIndex !== null
  $: isNextPage = !isLastPage && pageIndex !== null

  const gotoNextPage = async () => {
    const nextPageURL = getPageURL(pageIndex, 1)
    if (nextPageURL !== null) await goto(nextPageURL)
  }
  const gotoPreviousPage = async () => {
    const previousPageURL = getPageURL(pageIndex, -1)
    if (previousPageURL !== null) await goto(previousPageURL)
  }
</script>

<div class="cols grid h-full grid-cols-[20ch_1fr]">
  <nav class="flex flex-col gap-2 bg-black p-2">
    {#each pageURLs as slide}
      <a href={slide} class="hover:text-slate-300">
        {getPageName(slide)}
      </a>
    {/each}
  </nav>
  <main class="grid grid-rows-[1fr_auto] gap-4 bg-blue-950 p-4">
    <div class="grid">
      {#key currentURL}
        <div in:fade>
          <slot />
        </div>
      {/key}
    </div>
    <div class="flex">
      {#if isPreviousPage}
        <button
          class="
          rounded bg-blue-500 px-4 py-2 shadow-lg
        hover:bg-blue-400 hover:text-slate-50 hover:shadow-none
          disabled:opacity-75 disabled:shadow-none
        "
          on:click={gotoPreviousPage}
        >
          Previous
        </button>
      {/if}
      {#if isNextPage}
        <button
          class="
          ml-auto rounded bg-blue-500 px-4 py-2 shadow-lg
          hover:bg-blue-400 hover:text-slate-50 hover:shadow-none
          disabled:opacity-75 disabled:shadow-none
        "
          on:click={gotoNextPage}
        >
          Next
        </button>
      {/if}
    </div>
  </main>
</div>

<style uno:preflights uno:safelist global>
</style>
