<script setup lang="ts">
import CountdownTimer from './CountdownTimer.vue'
import type { Race } from '../types/race'

interface Props {
  race: Race
}

defineProps<Props>()
</script>

<template>
  <div class="race-card">
    <span class="race-info">{{ race.meeting_name }} - R{{ race.race_number }}</span>
    <CountdownTimer :start-time="race.advertised_start.seconds" />
  </div>
</template>

<style scoped>
.race-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  transition: box-shadow 0.2s ease;
}

.race-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.race-info {
  font-weight: 500;
  color: #151640;
}

.race-card:last-child {
  margin-bottom: 0;
}
</style> 