<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  startTime: number // Unix timestamp in seconds
}

const props = defineProps<Props>()

const timeLeft = ref(0)
let interval: number | null = null

const formatTime = (seconds: number): string => {
  if (seconds >= 0) {
    // Positive time - countdown format
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}m ${remainingSeconds}s`
    } else {
      return `${seconds}s`
    }
  } else {
    // Negative time - past start time
    const absSeconds = Math.abs(seconds)
    return `-${absSeconds}s`
  }
}

const updateTime = () => {
  const now = Math.floor(Date.now() / 1000)
  timeLeft.value = props.startTime - now
}

onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<template>
  <span class="countdown-timer" :class="{ 'past-start': timeLeft < 0 }">
    {{ formatTime(timeLeft) }}
  </span>
</template>

<style scoped>
.countdown-timer {
  font-weight: 500;
  color: #151640;
}

/* Change number to be red */
.countdown-timer.past-start {
  color: #ff4444;
}
</style> 