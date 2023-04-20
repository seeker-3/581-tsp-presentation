import { Circle, type Svg } from '@svgdotjs/svg.js'
import type { CityCoordinate } from '../algorithms/create-cities'
import * as config from './canvas-config'

export function drawCityCoordinates(svg: Svg, cityCoordinates: CityCoordinate[]) {
  if (svg === null) throw new Error('svg was not mounted')

  // delete all children
  svg.clear()

  for (const { x, y } of cityCoordinates) {
    new Circle()
      .size(config.CIRCLE_RADIUS, config.CIRCLE_RADIUS)
      .center(x, y)
      .addTo(svg)
      .fill(config.FILL_COLOR_BEFORE_ANIMATION)

    // const runner = circle.animate(1).attr({ fill: config.FILL_COLOR_BEFORE_ANIMATION })

    // await promisifyRunner(runner)
  }
}
