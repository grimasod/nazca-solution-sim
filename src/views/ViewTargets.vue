<template>
  <div class="flex flex-col items-start">
    <div class="flex flex-col w-full divide-y border rounded md:w-auto md:flex-row md:divide-y-0 md:divide-x">
      <router-link
        :to="{ name: 'site' }"
        class="rounded-t px-4 py-2 md:rounded-t-none md:rounded-l"
        :class="{ 'border-sky-600 bg-sky-600 text-white': getTypeIsSites }"
      >
        Ancient Sites
      </router-link>
      <router-link
        :to="{ name: 'impact-crater' }"
        class="px-4 py-2"
        :class="{ 'border-sky-600 bg-sky-600 text-white': getTypeIsCraters }"
      >
        Impact Craters
      </router-link>
      <router-link
        :to="{ name: 'volcano' }"
        class="px-4 py-2"
        :class="{ 'border-sky-600 bg-sky-600 text-white': getTypeIsVolcanoes }"
      >
        Volcanoes
      </router-link>
      <router-link
        :to="{ name: 'all' }"
        class="rounded-b px-4 py-2 md:rounded-b-none md:rounded-r"
        :class="{ 'border-sky-600 bg-sky-600 text-white': getTypeIsAll }"
      >
        All
      </router-link>
    </div>
    <div class="my-6 flex flex-col w-full divide-y border rounded md:w-auto md:flex-row md:divide-y-0 md:divide-x">
      <button
        class="rounded-t px-4 py-2 md:rounded-t-none md:rounded-l"
        :class="{ 'border-sky-600 bg-sky-600 text-white': !getSelectionIsCustom }"
        @click="setIsCustom(false)"
      >
        Standard set
      </button>
      <button
        class="rounded-b px-4 py-2 md:rounded-b-none md:rounded-r"
        :class="{ 'border-sky-600 bg-sky-600 text-white': getSelectionIsCustom }"
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
import { watch } from 'vue'
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
