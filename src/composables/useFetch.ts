import { ref, onMounted } from 'vue'
import type { Race, ApiResponse } from '../types/race'

export function useFetch() {
  const data = ref<Race[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchRaces = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10', {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse = await response.json()

      // Transform the API response to a flat array of races
      const races = result.data.next_to_go_ids.map(id => result.data.race_summaries[id])
      data.value = races

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  // Auto-fetch on mount
  onMounted(() => {
    fetchRaces()
  })

  return {
    data,
    loading,
    error,
    fetchRaces
  }
} 