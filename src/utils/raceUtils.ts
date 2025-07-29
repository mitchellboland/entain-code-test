import type { Race } from '../types/race'

export function sortRacesAscending(races: Race[]): Race[] {
  return races.sort((a, b) => {
    const timeA = a.advertised_start.seconds
    const timeB = b.advertised_start.seconds
    return timeA - timeB
  })
}

// Alternative version that returns top N races
export function getTopRacesAscending(races: Race[], count: number = 5): Race[] {
  return sortRacesAscending(races).slice(0, count)
}

// Filter out races that are more than 60 seconds past start time
export function filterExpiredRaces(races: Race[]): Race[] {
  const now = Math.floor(Date.now() / 1000)
  return races.filter(race => {
    const timeSinceStart = now - race.advertised_start.seconds
    return timeSinceStart < 60 // Keep races that started less than 60 seconds ago
  })
}

// Check if any race has just hit -60 seconds (exactly)
export function hasRacesAtMinus60(races: Race[]): boolean {
  const now = Math.floor(Date.now() / 1000)
  return races.some(race => {
    const timeSinceStart = now - race.advertised_start.seconds
    return timeSinceStart === 60 // Exactly 60 seconds past start
  })
}