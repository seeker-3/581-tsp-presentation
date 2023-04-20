<script lang="ts">
  import { page } from '$app/stores'

  import { goto } from '$app/navigation'
  import '@unocss/reset/tailwind.css'
  import { fade } from 'svelte/transition'
  import 'virtual:uno.css'
  import { ExternalLink, GitHub } from '../icons'
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

<div class="cols grid h-full grid-cols-[22ch_1fr]">
  <nav class="grid grid-rows-[1fr_auto] bg-black p-4 pb-10">
    <div class="flex flex-col gap-3">
      {#each pageURLs as slide}
        <a href={slide} class="hover:text-slate-400">
          {getPageName(slide)}
        </a>
      {/each}
    </div>
    <a
      rel="external"
      href="https://github.com/seeker-3/581-tsp-presentation"
      target="_blank"
      class="
      flex items-center justify-center gap-2
      hover:fill-slate-400 hover:text-slate-400
      "
    >
      <GitHub />
      <span>View source</span>
      <ExternalLink />
    </a>
  </nav>
  <main class="grid grid-rows-[1fr_auto] gap-4 bg-blue-950 p-4">
    <div class="grid">
      {#key currentURL}
        <div in:fade={{ duration: 750 }}>
          <slot />
        </div>
      {/key}
    </div>
    <div class="flex">
      {#if isPreviousPage}
        <button
          class="
            rounded bg-purple-900 px-4 py-2 shadow-lg
          hover:bg-fuchsia-950 hover:text-slate-50 hover:shadow-none
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
            ml-auto rounded bg-purple-900 px-4 py-2 shadow-lg
          hover:bg-fuchsia-950 hover:text-slate-50 hover:shadow-none
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
