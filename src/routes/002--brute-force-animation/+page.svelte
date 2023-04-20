<script lang="ts">
  import { Line, SVG, type Svg } from '@svgdotjs/svg.js'
  import { onMount } from 'svelte'
  import {
    createCityDistancesAdjacencyMatrix,
    createRandomCityCoordinates,
  } from '../../algorithms/create-cities'
  import * as config from '../../draw/canvas-config'
  import { drawCityCoordinates } from '../../draw/draw-cities'
  import { promisifyRunner } from '../../draw/utils'

  const cityCoordinates = createRandomCityCoordinates(
    10,
    config.CANVAS_WIDTH,
    config.CANVAS_HEIGHT,
    config.CIRCLE_RADIUS,
  )
  const cityDistancesAdjacencyMatrix = createCityDistancesAdjacencyMatrix(cityCoordinates)

  const getRandomValue = () => {
    const offset = config.CIRCLE_RADIUS / 2
    return Math.floor(offset + Math.random() * (config.CANVAS_WIDTH - config.CIRCLE_RADIUS))
  }

  const randomCityCoordinates = Array.from(
    { length: 25 },
    () => [getRandomValue(), getRandomValue()] as const,
  )

  let svg: Svg | null = null

  let isPlaying = false

  onMount(() => {
    svg = SVG().addTo('#canvas').size(config.CANVAS_WIDTH, config.CANVAS_HEIGHT)
    drawCityCoordinates(svg, cityCoordinates)
  })

  const drawGraph = async () => {
    if (svg === null) throw new Error('svg was not mounted')
    isPlaying = true

    for (let i = 0; i < randomCityCoordinates.length; ++i) {
      let nearestCityDistance = Infinity
      let nearestCityLine: Line | null = null
      for (let j = 0; j < randomCityCoordinates.length; ++j) {
        if (i === j) continue

        const [x1, y1] = randomCityCoordinates[i]
        const [x2, y2] = randomCityCoordinates[j]
        const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

        if (distance >= nearestCityDistance) continue
        nearestCityDistance = distance

        if (nearestCityLine !== null) nearestCityLine.remove()

        nearestCityLine = svg.line(x1, y1, x2, y2).stroke({
          color: config.FILL_COLOR_BEFORE_ANIMATION,
          width: 3,
        })

        const runner = nearestCityLine.animate(config.ANIMATION_SPEED).attr({
          stroke: config.FILL_COLOR_AFTER_ANIMATION,
        })

        await promisifyRunner(runner)
      }
    }
    isPlaying = false
  }
</script>

<button on:click={drawGraph}>{!isPlaying ? 'Play' : 'Restart'}</button>
<div style="--width: {config.CANVAS_WIDTH}px" id="canvas" />

<style>
  #canvas {
    margin: 0 auto;
    width: var(--width);
    border: 0.01rem solid white;
  }
</style>
