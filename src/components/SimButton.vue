<template>
  <SimSection>
    <template #title>Start</template>
    <template #notes>
      <p>Click the button and wait for the results</p>
      <p>
        <span class="font-bold">Important!</span> Please keep the window open while the program is
        running, to avoid potential memory issues.
      </p>
    </template>
    <template #default>
      <div class="flex w-full lg:justify-center">
        <button
          class="w-full px-4 py-3 font-bold text-red-600 rounded border-2 border-red-600 hover:bg-red-600 hover:text-white lg:w-auto"
          :disabled="simulationStore.isRunning"
          @click="emit('start')"
        >
          Run The Simulation and Statistical Calculations
        </button>
      </div>
    </template>
  </SimSection>
</template>

<script setup>
import { useSimulationStore } from '/src/stores/simulation'
import SimSection from '/src/components/SimSection.vue'

const emit = defineEmits(['start'])

const simulationStore = useSimulationStore()
</script>
