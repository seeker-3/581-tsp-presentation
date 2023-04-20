export function create2DMatrix<TValue>(
  length1: number,
  length2: number,
  fillValue: TValue,
): TValue[][] {
  return Array.from({ length: length1 }, () => Array(length2).fill(fillValue))
}
