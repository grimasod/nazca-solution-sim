<template>
  <div class="flex justify-center p-4 md:px-6 md:py-10">
    <div class="w-full max-w-screen-xl">
      <div
        v-if="uiStore.view"
        id="submenu"
        class="rounded bg-gray-100 flex px-2 mb-6 w-full h-12 items-center"
      >
        <button
          @click="uiStore.setView()"
          class="px-3 py-2 text-sky-800 underline decoration-sky-300 hover:decoration-sky-800"
        >
          &lt; Back to Simulation
        </button>
      </div>
      <ViewLocations v-if="uiStore.view === 'locations'" />
      <ViewRadials v-else-if="uiStore.view === 'radials'" />
      <ViewIndex v-else />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ViewIndex from './views/ViewIndex.vue'
import ViewLocations from './views/ViewLocations.vue'
import ViewRadials from './views/ViewRadials.vue'
import { useUiStore } from '/src/stores/ui'
import { useRadialCentersStore } from '/src/stores/radial-centers'
import { useLocationStore } from '/src/stores/locations'

const uiStore = useUiStore()
const radialCentersStore = useRadialCentersStore()
const locationStore = useLocationStore()

onMounted(() => {
  radialCentersStore.fetchRadialCenters()
  locationStore.fetchLocations()
})
</script>
