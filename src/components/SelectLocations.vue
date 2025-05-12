<template>
  <div class="flex">
    <div
      class="flex flex-col divide-y border rounded md:w-auto md:flex-row md:divide-y-0 md:divide-x"
    >
      <button
        class="rounded-t px-4 py-2 md:rounded-r-none md:rounded-l"
        :class="{ 'border-sky-600 bg-sky-600 text-white': simulationStore.getTypeIsSites }"
        @click="setActiveTargets('site')"
      >
        Ancient Sites
      </button>
      <button
        class="px-4 py-2"
        :class="{ 'border-sky-600 bg-sky-600 text-white': simulationStore.getTypeIsCraters }"
        @click="setActiveTargets('impact-crater')"
      >
        Impact Craters
      </button>
      <button
        class="px-4 py-2 md:rounded-r"
        :class="{ 'border-sky-600 bg-sky-600 text-white': simulationStore.getTypeIsVolcanoes }"
        @click="setActiveTargets('volcano')"
      >
        Volcanoes
      </button>
      <!-- <button
        class="px-4 py-2"
        :class="{ 'border-sky-600 bg-sky-600 text-white': simulationStore.selectionIsCustom }"
        @click="setIsCustom(true)"
      >
        Custom
      </button> -->
    </div>
  </div>
</template>

<script setup>
import { useSimulationStore } from '/src/stores/simulation'

const simulationStore = useSimulationStore()

const setActiveTargets = (type) => {
  if (
    ['site', 'impact-crater', 'volcano'].includes(type) &&
    type !== simulationStore.selectionType
  ) {
    // console.log('setActiveTargets', type)
    simulationStore.setSelectionType(type)
    // simulationStore.setSelectionIsCustom(false)
  }
}

// const setIsCustom = (val) => {
//   simulationStore.setSelectionType(null)
//   simulationStore.setSelectionIsCustom(val)
// }
</script>
