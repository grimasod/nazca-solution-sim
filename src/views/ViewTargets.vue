<template>
  <div class="flex flex-col items-start">
    <div class="flex divide-x border rounded">
      <router-link
        :to="{ name: 'site' }"
        class="rounded-l px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': getTypeIsSites }"
      >
        Ancient Sites
      </router-link>
      <router-link
        :to="{ name: 'impact-crater' }"
        class="px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': getTypeIsCraters }"
      >
        Impact Craters
      </router-link>
      <router-link
        :to="{ name: 'volcano' }"
        class="px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': getTypeIsVolcanoes }"
      >
        Volcanoes
      </router-link>
      <router-link
        :to="{ name: 'all' }"
        class="rounded-r px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': getTypeIsAll }"
      >
        All
      </router-link>
    </div>
    <div class="my-6 flex divide-x border rounded">
      <button
        class="rounded-l px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': !getSelectionIsCustom }"
        @click="setIsCustom(false)"
      >
        Standard set
      </button>
      <button
        class="rounded-r px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': getSelectionIsCustom }"
        @click="setIsCustom(true)"
      >
        Custom selection
      </button>
      <!-- <div class="">
        <button class="" @click="$emit('targets-custom-select-all')">Select All</button>
        <button class="" @click="$emit('targets-custom-select-none')">Select None</button>
        <button class="" @click="$emit('targets-custom-select-standard')">Reset to Standard</button>
      </div> -->
    </div>
    <target-list />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSimulationStore } from '/src/stores/simulation'
import TargetList from '/src/components/TargetList.vue'

const simulationStore = useSimulationStore()
const { getSelectionType, getSelectionIsCustom, getTypeIsSites, getTypeIsCraters, getTypeIsVolcanoes, getTypeIsAll } = storeToRefs(simulationStore)

const route = useRoute()

const setActiveTargets = () => {
  if (['site', 'impact-crater', 'volcano', 'all'].includes(route.name) && (route.name !== getSelectionType.value)) {
    // console.log('setActiveTargets', route.name ||'site')
    simulationStore.setSelectionType(route.name || 'site')
  }
}
setActiveTargets()
watch(() => route.name, setActiveTargets)

const setIsCustom = (val) => {
  simulationStore.setSelectionIsCustom(val)
}

</script>
