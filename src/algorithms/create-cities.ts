import { create2DMatrix } from '../utils/array'

export type CityCoordinate = {
  index: number
  x: number
  y: number
}

export function getRandomValue(maxValue: number, offset = 0) {
  // for example: 800 - 10 shifted 5
  return Math.floor(offset / 2 + Math.random() * (maxValue - offset))
}

export function createRandomCityCoordinates(
  numberOfRandomCities: number,
  maxXValue: number,
  maxYValue: number,
  offset = 0,
): CityCoordinate[] {
  return Array.from({ length: numberOfRandomCities }, (_, index) => ({
    index,
    x: getRandomValue(maxXValue, offset),
    y: getRandomValue(maxYValue, offset),
  }))
}

function calculateDistance(cityA: CityCoordinate, cityB: CityCoordinate) {
  const xDistance = cityA.x - cityB.x
  const yDistance = cityA.y - cityB.y
  return Math.sqrt(xDistance ** 2 + yDistance ** 2)
}

export function createCityDistancesAdjacencyMatrix(cityCoordinates: CityCoordinate[]) {
  const numberOfCities = cityCoordinates.length
  const cityDistancesAdjacencyMatrix = create2DMatrix(numberOfCities, numberOfCities, 0)

  for (let i = 0; i < numberOfCities; ++i) {
    for (let j = i + 1; j < numberOfCities; ++j) {
      if (i === j) continue
      if (cityDistancesAdjacencyMatrix[i][j] !== 0) continue
      const distance = calculateDistance(cityCoordinates[i], cityCoordinates[j])
      cityDistancesAdjacencyMatrix[i][j] = distance
      cityDistancesAdjacencyMatrix[j][i] = distance
    }
  }

  return cityDistancesAdjacencyMatrix
}
