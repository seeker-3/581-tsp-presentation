import type { Runner } from '@svgdotjs/svg.js'

export const promisifyRunner = (runner: Runner) => {
  return new Promise((resolve) => {
    runner.after(resolve)
  })
}
