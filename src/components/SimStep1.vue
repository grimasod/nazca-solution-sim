<template>
  <div class="flex flex-col gap-4 pb-10">
    <h4 class="px-4 py-2 bg-sky-600 text-white text-center rounded w-full text-lg font-bold">
      Step 1: Data
    </h4>
    <div class="rounded bg-sky-50 text-sky-800">
      <p class="p-4">Choose "Ancient Sites", "Impact Craters", or "Volcanoes".</p>
      <p class="px-4 pb-4">Click on "View Locations" to inspect the list.</p>
    </div>
    <div class="flex flex-col gap-4 xl:flex-row">
      <div class="xl:flex xl:w-24 xl:shrink-0 xl:items-center">
        <span class="font-bold">Locations:</span>
      </div>
      <div class="xl:grow">
        <SelectLocations />
      </div>
      <div class="pr-3">
        <router-link
          :to="{ name: simulationStore.selectionType }"
          class="inline-flex py-2 text-sky-800 underline hover:text-sky-600"
        >
          View Locations
        </router-link>
      </div>
    </div>
    <div class="rounded bg-sky-50 text-sky-800">
      <p class="p-4">
        Click on "View Radials" to inspect the Radial Centers and their respective radials that form
        the Nazca map.
      </p>
    </div>
    <div class="flex flex-col gap-4 xl:flex-row">
      <div class="xl:flex xl:w-24 xl:shrink-0 xl:items-center">
        <span class="font-bold">Radials:</span>
      </div>
      <div class="xl:flex xl:grow xl:items-center">
        <span v-if="radialCentersStore.getSelectedRadialCenters">
          {{ radialCentersStore.getSelectedRadialCenters.length }} Centers [{{
            radialCentersStore.getSelectedRadialCenters
              .map((rc) => rc.greatCircles.length)
              .join(', ')
          }}]
        </span>
      </div>
      <div class="pr-3">
        <router-link
          :to="{ name: 'radials' }"
          class="inline-flex py-2 text-sky-800 underline hover:text-sky-600"
        >
          View Radials
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSimulationStore } from '/src/stores/simulation'
import { useRadialCentersStore } from '/src/stores/radial-centers'
import SelectLocations from '/src/components/SelectLocations.vue'

const simulationStore = useSimulationStore()
const radialCentersStore = useRadialCentersStore()
</script>
