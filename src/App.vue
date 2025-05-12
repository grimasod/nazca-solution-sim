<template>
  <div class="flex justify-center p-4 md:p-6">
    <div class="w-full max-w-screen-xl">
      <div id="submenu" class="bg-gray-100 flex px-2 w-full h-12 items-center">
        <router-link to="/" class="px-3 py-2 text-sky-800 underline hover:text-sky-600">
          &lt; Back to Simulation
        </router-link>
      </div>
      <router-view class="py-6" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRadialCentersStore } from '/src/stores/radial-centers'
import { useLocationStore } from '/src/stores/locations'

const radialCentersStore = useRadialCentersStore()

const locationStore = useLocationStore()

onMounted(() => {
  radialCentersStore.fetchRadialCenters()
  locationStore.fetchLocations()
})
</script>
