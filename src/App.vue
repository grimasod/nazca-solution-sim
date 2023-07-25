<template>
  <!-- <div>
    <div class="flex justify-between items-center bg-gray-100 px-6 p-4">
      <div class="">
        <a href="http://nazcasolution.com" class="underline">&lt;- Back to nazcasolution.com</a>
      </div>
    </div> -->
  <div class="flex justify-center p-4 md:p-6">
    <div class="w-full max-w-screen-xl">
      <div id="menu" class="flex flex-col md:flex-row">
        <router-link :to="{ name: 'home' }" class="px-2 py-1 mb-1 bg-gray-100 md:bg-transparent md:m-0 md:px-5 md:py-2 md:rounded-t-lg lg:hover:bg-gray-100">
          Simulation
        </router-link>
        <router-link :to="{ name: getSelectionType }" class="px-2 py-1 mb-1 bg-gray-100 md:bg-transparent md:m-0 md:px-5 md:py-2 md:rounded-t-lg lg:hover:bg-gray-100">
          Ancient Sites / Impact Craters / Volcanoes
        </router-link>
        <router-link :to="{ name: 'radials' }" class="px-2 py-1 mb-1 bg-gray-100 md:bg-transparent md:m-0 md:px-5 md:py-2 md:rounded-t-lg lg:hover:bg-gray-100">
          Radial Centers
        </router-link>
      </div>
      <div id="submenu" class="bg-gray-100 flex px-3 w-full h-12 items-center">
        <router-link to="/" class="text-blue-500 hover:bg-blue-100 px-2 py-1 text-sm">
          &lt;- Back to Simulation
        </router-link>
      </div>
      <router-view class="py-6" />
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useSimulationStore } from '/src/stores/simulation'
import { useRadialCentersStore } from '/src/stores/radial-centers'
import { useTargetsStore } from '/src/stores/targets'

const simulationStore = useSimulationStore()
const { getSelectionType } = storeToRefs(simulationStore)

const radialCentersStore = useRadialCentersStore()
radialCentersStore.fetchRadialCenters()

const targetsStore = useTargetsStore()
targetsStore.fetchTargets()
</script>
