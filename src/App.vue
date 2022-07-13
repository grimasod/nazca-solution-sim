<template>
  <div>
    <div class="flex justify-between items-center bg-gray-100 px-6 p-4">
      <div class="">
        <a href="http://nazcasolution.com" class="underline">&lt;- Back to nazcasolution.com</a>
      </div>
    </div>
    <div class="container p-6">
      <div id="menu" class="flex">
        <router-link :to="{ name: 'home' }" class="px-5 py-2 hover:bg-gray-100 rounded-t-lg">
          Simulation
        </router-link>
        <router-link :to="{ name: getSelectionType }" class="px-5 py-2 hover:bg-gray-100 ml-1 rounded-t-lg">
          Ancient Sites / Impact Craters / Volcanoes
        </router-link>
        <router-link :to="{ name: 'radials' }" class="px-5 py-2 hover:bg-gray-100 ml-1 rounded-t-lg">
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
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUIStore } from '/src/stores/ui'
import { useRadialCentersStore } from '/src/stores/radial-centers'
import { useTargetsStore } from '/src/stores/targets'

const uiStore = useUIStore()
const { getSelectionType } = storeToRefs(uiStore)

const radialCentersStore = useRadialCentersStore()
radialCentersStore.fetchRadialCenters()

const targetsStore = useTargetsStore()
targetsStore.fetchTargets()
</script>
