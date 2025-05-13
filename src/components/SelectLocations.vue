<template>
  <div
    class="flex flex-col divide-y border rounded w-full max-w-full lg:w-auto lg:flex-row lg:divide-y-0 lg:divide-x"
  >
    <button
      class="rounded-t px-4 py-2 lg:rounded-r-none lg:rounded-l lg:min-w-64"
      :class="{ 'border-sky-600 bg-sky-600 text-white': simulationStore.getTypeIsSites }"
      @click="setActiveTargets('site')"
    >
      Ancient Sites
      <span v-if="simulationStore.getTypeIsSites">
        ({{ locationStore.getSelectedLocations.length }} locations)
      </span>
    </button>
    <button
      class="px-4 py-2 lg:min-w-64"
      :class="{ 'border-sky-600 bg-sky-600 text-white': simulationStore.getTypeIsCraters }"
      @click="setActiveTargets('impact-crater')"
    >
      Impact Craters
      <span v-if="simulationStore.getTypeIsCraters">
        ({{ locationStore.getSelectedLocations.length }} locations)
      </span>
    </button>
    <button
      class="px-4 py-2 lg:rounded-r lg:min-w-64"
      :class="{ 'border-sky-600 bg-sky-600 text-white': simulationStore.getTypeIsVolcanoes }"
      @click="setActiveTargets('volcano')"
    >
      Volcanoes
      <span v-if="simulationStore.getTypeIsVolcanoes">
        ({{ locationStore.getSelectedLocations.length }} locations)
      </span>
    </button>
    <!-- <button
        class="px-4 py-2 lg:rounded-r lg:min-w-64"
        :class="{ 'border-sky-600 bg-sky-600 text-white': simulationStore.selectionIsCustom }"
        @click="setIsCustom(true)"
      >
        Custom
      </button> -->
  </div>
</template>

<script setup>
import { useSimulationStore } from '/src/stores/simulation'
import { useLocationStore } from '/src/stores/locations'

const simulationStore = useSimulationStore()
const locationStore = useLocationStore()

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
