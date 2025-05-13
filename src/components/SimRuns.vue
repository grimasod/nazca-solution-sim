<template>
  <SimSection>
    <template #title>Runs</template>
    <template #notes>
      <p>
        Choose how many times the simulation will run. A higher number gives results of
        significance, but takes longer:
      </p>
      <ul>
        <li>100 = Scattered results. Only useful for testing.</li>
        <li>1,000 = The results start to cluster. Takes about 20 seconds.</li>
        <li>10,000 = Good for demonstration. Takes several minutes.</li>
        <li>100,000 = Used for actual expirement. Takes time, 10s of minutes. Beware!</li>
      </ul>
    </template>
    <template #default>
      <div class="flex w-full lg:justify-center">
        <div class="border border-red-600 rounded divide-x divide-red-600 inline-flex lg:flex">
          <input
            id="runs"
            v-model.number="runs"
            name="runs"
            type="number"
            class="w-24 rounded-l px-3 py-2 lg:grow lg:w-auto"
          />
          <span class="bg-gray-100 px-3 py-2 text-red-600"> iterations of the simulation </span>
        </div>
      </div>
    </template>
  </SimSection>
</template>

<script setup>
import { computed } from 'vue'
import { useSimulationStore } from '/src/stores/simulation'
import SimSection from '/src/components/SimSection.vue'

const simulationStore = useSimulationStore()

const runs = computed({
  get() {
    return simulationStore.runs
  },
  set(val) {
    simulationStore.setRuns(val)
  },
})
</script>
