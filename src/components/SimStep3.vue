<template>
  <div class="flex pb-10">
    <div id="run" class="w-1/2 pr-10">
      <button
        class="px-4 py-3 font-bold text-red-600 rounded border-2 border-red-600 hover:bg-red-600 hover:text-white"
        :disabled="getIsRunning"
        @click="emit('start')"
      >
        Run The Simulation and Statistical Calculations
      </button>
    </div>
    <div class="w-1/2 rounded bg-blue-100 text-blue-800 text-sm">
      <h4 class="px-4 py-2 bg-blue-600 text-white rounded-t w-full text-lg font-bold">
        Step 3
      </h4>
      <p class="p-4">
        Click the button and wait for the results
      </p>
      <p class="px-4 pb-4">
        <span class="font-bold">Important!</span> Please keep the window open while the program is running, to avoid potential memory issues.
      </p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUIStore } from '/src/stores/ui'

const emit = defineEmits(['start'])

const uiStore = useUIStore()
const { getIsRunning } = storeToRefs(uiStore)
</script>
