<script setup lang="ts">
import { useFetch } from './composables/useFetch'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RACE_CATEGORIES } from './constants/raceCategories'
import { sortRacesAscending, filterExpiredRaces, hasRacesAtMinus60 } from './utils/raceUtils'
import RaceCard from './components/RaceCard.vue'

const { data: races, loading, error, fetchRaces } = useFetch()

const selectedTab = ref<'all' | 'greyhound' | 'harness' | 'horse'>('all')

// Sort and filter races
const sortedRaces = computed(() => sortRacesAscending(races.value))
const filteredRacesByCategory = computed(() => {
  switch (selectedTab.value) {
    case 'greyhound':
      return sortedRaces.value.filter(r => r.category_id === RACE_CATEGORIES.GREYHOUND.id)
    case 'harness':
      return sortedRaces.value.filter(r => r.category_id === RACE_CATEGORIES.HARNESS.id)
    case 'horse':
      return sortedRaces.value.filter(r => r.category_id === RACE_CATEGORIES.HORSE.id)
    default:
      return sortedRaces.value
  }
})
const filteredRaces = computed(() => filterExpiredRaces(filteredRacesByCategory.value).slice(0, 5))

// Refetch logic
let refreshInterval: number | null = null
onMounted(() => {
  refreshInterval = window.setInterval(() => {
    if (hasRacesAtMinus60(filteredRacesByCategory.value)) fetchRaces()
  }, 1000)
})
onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval)
})
</script>

<template>
  <div class="app">
    <div class="page-container">
      <h1 class="title">Next to Go Races</h1>
      <div class="tabs">
        <button
          class="tab-button"
          :class="{ active: selectedTab === 'all' }"
          @click="selectedTab = 'all'"
        >All Races</button>
        <button
          class="tab-button"
          :class="{ active: selectedTab === 'greyhound' }"
          @click="selectedTab = 'greyhound'"
        >Greyhound</button>
        <button
          class="tab-button"
          :class="{ active: selectedTab === 'harness' }"
          @click="selectedTab = 'harness'"
        >Harness</button>
        <button
          class="tab-button"
          :class="{ active: selectedTab === 'horse' }"
          @click="selectedTab = 'horse'"
        >Horse</button>
      </div>
      <div class="content">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          Loading races...
        </div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div class="races-container" v-else>
          <div v-if="filteredRaces.length === 0" class="no-races">No races available</div>
          <RaceCard 
            v-for="race in filteredRaces" 
            :key="race.race_id" 
            :race="race" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.page-container {
  width: calc(100vw - 24px);
  max-width: 1280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: 48px;
}

.tabs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  padding: 12px;
  border-bottom: 1px solid #000;
  margin-bottom: 12px;
  margin-top: 12px;
}

.tab-button {
  background: none;
  border: none;
  color: #151640;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  outline: none;
}

.tab-button:hover {
  background: rgba(21, 22, 64, 0.1);
  color: #2a2d5a;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(21, 22, 64, 0.2);
}

.tab-button.active,
.tab-button:focus {
  background: #151640;
  color: white;
  box-shadow: 0 2px 8px rgba(21, 22, 64, 0.3);
}

.tab-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(21, 22, 64, 0.3);
}

/* Ripple effect */
.tab-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.tab-button:active::before {
  width: 200px;
  height: 200px;
}

.tab-button:focus-visible {
  outline: 2px solid #151640;
  outline-offset: 2px;
}

.tab-button:focus:not(:focus-visible) {
  outline: none;
}

@media (max-width: 503px) {
  .tab-button {
    font-size: 14px;
    padding: 10px 20px;
  }

  .page-container {
    padding-top: 24px;
  }
}

@media (max-width: 442px) {
  .tab-button {
    font-size: 12px;
    padding: 8px 8px;
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

.races-container {
  width: 100%;
  max-width: 600px;
}

.no-races {
  color: #888;
  text-align: center;
  margin-top: 1rem;
  font-size: 16px;
  font-weight: 500;
}
</style>
