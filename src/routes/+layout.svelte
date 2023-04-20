<script lang="ts">
  import { page } from '$app/stores'

  console.log($page.route.id)

  import { goto } from '$app/navigation'
  import '@unocss/reset/tailwind.css'
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

  // $: currentURL = $page.route.id
  $: pageIndex = getPageIndex($page.route.id)
  $: isFirstPage = pageIndex === 0
  $: isLastPage = pageIndex === pageURLs.length - 1
  $: previousButtonIsDisabled = isFirstPage || pageIndex === null
  $: nextButtonIsDisabled = isLastPage || pageIndex === null
  $: console.dir({
    pageIndex,
    isFirstPage,
    isLastPage,
    previousButtonIsDisabled,
    nextButtonIsDisabled,
  })

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
      <a href={slide} class="">
        {getPageName(slide)}
      </a>
    {/each}
  </nav>
  <main class="grid grid-rows-[1fr_auto] bg-blue-950 p-4">
    <div>
      <slot />
    </div>
    <div class="flex justify-between">
      <button
        class="
          rounded bg-blue-500 px-4 py-2 shadow-lg
          hover:shadow-none
          disabled:opacity-75 disabled:shadow-none
        "
        disabled={previousButtonIsDisabled}
        on:click={gotoPreviousPage}
      >
        Previous
      </button>
      <button
        class="
          rounded bg-blue-500 px-4 py-2 shadow-lg
          hover:shadow-none
          disabled:opacity-75 disabled:shadow-none
        "
        disabled={nextButtonIsDisabled}
        on:click={gotoNextPage}
      >
        Next
      </button>
    </div>
  </main>
</div>

<style uno:preflights uno:safelist global>
</style>

