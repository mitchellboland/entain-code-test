import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useFetch } from './useFetch'
import { mockRaces } from '../tests/mocks/mockRaces'

// Mock fetch globally
const mockFetch = vi.fn()
Object.defineProperty(globalThis, 'fetch', {
  value: mockFetch,
  writable: true
})

describe('useFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns reactive refs for data, loading, and error', () => {
    const { data, loading, error, fetchRaces } = useFetch()

    expect(data).toBeDefined()
    expect(loading).toBeDefined()
    expect(error).toBeDefined()
    expect(fetchRaces).toBeDefined()
    expect(typeof fetchRaces).toBe('function')
  })

  it('initializes with default values', () => {
    const { data, loading, error } = useFetch()

    expect(data.value).toEqual([])
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it('successfully fetches and transforms race data', async () => {
    // Mock successful API response
    const mockApiResponse = {
      data: {
        next_to_go_ids: ['1', '2', '3'],
        race_summaries: {
          '1': mockRaces[0],
          '2': mockRaces[1],
          '3': mockRaces[2]
        }
      }
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    })

    const { data, loading, error, fetchRaces } = useFetch()

    // Call fetchRaces
    await fetchRaces()

    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(data.value).toEqual([mockRaces[0], mockRaces[1], mockRaces[2]])
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10',
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  })

  it('handles HTTP error responses', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    })

    const { data, loading, error, fetchRaces } = useFetch()

    await fetchRaces()

    expect(loading.value).toBe(false)
    expect(error.value).toBe('HTTP error! status: 500')
    expect(data.value).toEqual([])
  })

  it('handles network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const { data, loading, error, fetchRaces } = useFetch()

    await fetchRaces()

    expect(loading.value).toBe(false)
    expect(error.value).toBe('Network error')
    expect(data.value).toEqual([])
  })

  it('handles non-Error exceptions', async () => {
    mockFetch.mockRejectedValueOnce('String error')

    const { data, loading, error, fetchRaces } = useFetch()

    await fetchRaces()

    expect(loading.value).toBe(false)
    expect(error.value).toBe('An error occurred')
    expect(data.value).toEqual([])
  })

  it('sets loading state correctly during fetch', async () => {
    let resolveFetch: (value: any) => void
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve
    })

    mockFetch.mockReturnValueOnce(fetchPromise)

    const { loading, fetchRaces } = useFetch()

    // Start the fetch
    const fetchPromise2 = fetchRaces()

    // Check loading is true during fetch
    expect(loading.value).toBe(true)

    // Resolve the fetch
    resolveFetch!({
      ok: true,
      json: () => Promise.resolve({
        data: {
          next_to_go_ids: [],
          race_summaries: {}
        }
      })
    })

    await fetchPromise2

    // Check loading is false after fetch
    expect(loading.value).toBe(false)
  })

  it('clears error when starting a new fetch', async () => {
    // First, set an error
    mockFetch.mockRejectedValueOnce(new Error('First error'))

    const { error, fetchRaces } = useFetch()

    await fetchRaces()
    expect(error.value).toBe('First error')

    // Then start a new fetch
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        data: {
          next_to_go_ids: [],
          race_summaries: {}
        }
      })
    })

    await fetchRaces()

    expect(error.value).toBe(null)
  })

  it('transforms empty API response correctly', async () => {
    const mockApiResponse = {
      data: {
        next_to_go_ids: [],
        race_summaries: {}
      }
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    })

    const { data, loading, error, fetchRaces } = useFetch()

    await fetchRaces()

    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(data.value).toEqual([])
  })
}) 