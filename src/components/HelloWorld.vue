<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <v-card-text class="text-center">
    <h1 class="text-h4 mb-4">{{ msg }}</h1>

    <v-card class="pa-4 mb-4">
      <v-btn 
        color="primary" 
        size="large" 
        @click="count++"
        class="mb-2"
      >
        count is {{ count }}
      </v-btn>
      <p class="text-body-2">
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </v-card>

    <v-divider class="my-4"></v-divider>

    <div class="text-body-2">
      <p class="mb-2">
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
          >create-vue</a
        >, the official Vue + Vite starter
      </p>
      <p class="mb-2">
        Learn more about IDE Support for Vue in the
        <a
          href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
          target="_blank"
          >Vue Docs Scaling up Guide</a
        >.
      </p>
      <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
    </div>
  </v-card-text>
</template>
