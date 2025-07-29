import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { sortRacesAscending, getTopRacesAscending, filterExpiredRaces, hasRacesAtMinus60 } from './raceUtils'
import { mockRaces } from '../tests/mocks/mockRaces'

const now = 1700000000 // fixed timestamp for deterministic tests

function makeRacesWithTimes(times: number[]): any[] {
  return times.map((seconds: number, i: number) => ({
    ...mockRaces[0],
    race_id: String(i + 1),
    advertised_start: { seconds },
  }))
}

describe('raceUtils', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(now * 1000)
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('sortRacesAscending sorts races by advertised_start.seconds ascending', () => {
    const races = makeRacesWithTimes([now + 100, now + 50, now + 200])
    const sorted = sortRacesAscending([...races])
    expect(sorted.map(r => r.advertised_start.seconds)).toEqual([now + 50, now + 100, now + 200])
  })

  it('getTopRacesAscending returns top N sorted races', () => {
    const races = makeRacesWithTimes([now + 100, now + 50, now + 200, now + 10, now + 300, now + 20])
    const top3 = getTopRacesAscending([...races], 3)
    expect(top3.map(r => r.advertised_start.seconds)).toEqual([now + 10, now + 20, now + 50])
    // Default count is 5
    const top5 = getTopRacesAscending([...races])
    expect(top5.map(r => r.advertised_start.seconds)).toEqual([now + 10, now + 20, now + 50, now + 100, now + 200])
  })

  it('filterExpiredRaces filters out races more than 60s past start', () => {
    // Race 1: started 30s ago (should be kept)
    // Race 2: started 59s ago (should be kept)
    // Race 3: started 60s ago (should be filtered)
    // Race 4: starts in 10s (should be kept)
    const races = makeRacesWithTimes([
      now - 30, // 30s ago
      now - 59, // 59s ago
      now - 60, // 60s ago
      now + 10, // in 10s
    ])
    const filtered = filterExpiredRaces(races)
    expect(filtered.map(r => r.advertised_start.seconds)).toEqual([now - 30, now - 59, now + 10])
  })

  it('hasRacesAtMinus60 returns true if any race is exactly 60s past start', () => {
    // Race 1: started 60s ago (should trigger)
    // Race 2: started 30s ago
    // Race 3: starts in 10s
    const races = makeRacesWithTimes([
      now - 60,
      now - 30,
      now + 10,
    ])
    expect(hasRacesAtMinus60(races)).toBe(true)
  })

  it('hasRacesAtMinus60 returns false if no race is exactly 60s past start', () => {
    // Race 1: started 61s ago
    // Race 2: started 59s ago
    // Race 3: starts in 10s
    const races = makeRacesWithTimes([
      now - 61,
      now - 59,
      now + 10,
    ])
    expect(hasRacesAtMinus60(races)).toBe(false)
  })
}) 