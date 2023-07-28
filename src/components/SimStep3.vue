<template>
  <div class="flex flex-col pb-10 lg:flex-row-reverse">
    <div class="rounded bg-sky-50 text-sky-800 text-sm mb-4 lg:w-1/2 lg:m-0">
      <h4 class="px-4 py-2 bg-sky-600 text-white rounded-t w-full text-lg font-bold">
        Step 3
      </h4>
      <p class="p-4">
        Click the button and wait for the results
      </p>
      <p class="px-4 pb-4">
        <span class="font-bold">Important!</span> Please keep the window open while the program is running, to avoid potential memory issues.
      </p>
    </div>
    <div id="run" class="lg:pr-10 lg:w-1/2">
      <button
        class="w-full px-4 py-3 font-bold text-red-600 rounded border-2 border-red-600 hover:bg-red-600 hover:text-white"
        :disabled="getIsRunning"
        @click="emit('start')"
      >
        Run The Simulation and Statistical Calculations
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useSimulationStore } from '/src/stores/simulation'

const emit = defineEmits(['start'])

const simulationStore = useSimulationStore()
const { getIsRunning } = storeToRefs(simulationStore)
</script>
