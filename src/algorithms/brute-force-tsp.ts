import permutations from 'just-permutations'

function bruteForceTSP() {
  permutations([1, 2, 3, 4]).forEach((permudation, index) => {
    const path = [0, ...permudation, 0]
    if (index % 2 === 0) return
  })
}
