<template>
  <div class="flex pb-10">
    <div class="w-1/2 pr-10">
      <h3 id="settings" class="mb-4 text-4xl font-bold">
        Settings
      </h3>
      <div class="grid grid-cols-5 gap-4">
        <label for="runs">Runs</label>
        <div class="col-span-4">
          <div class="border rounded divide-x inline-flex">
            <input v-model.number="runs" name="runs" type="number" class="rounded-l px-3 py-2">
            <span class="bg-gray-100 px-3 py-2 text-gray-500">
              iterations of the simulation
            </span>
          </div>
        </div>
        <label for="bandwidth">Bandwidth</label>
        <div class="col-span-4">
          <div class="border rounded divide-x inline-flex">
            <input v-model.number="bandwidth" name="bandwidth" type="number" class="rounded-l px-3 py-2">
            <span class="bg-gray-100 px-3 py-2 text-gray-500">
              km (width of great circles)
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/2 rounded bg-blue-100 text-blue-800 text-sm">
      <h4 class="px-4 py-2 bg-blue-600 text-white rounded-t w-full text-lg font-bold">
        Step 2
      </h4>
      <p class="p-4">
        Choose how many times the simulation will run. A higher number give results of significance, but takes longer:
        <ul>
          <li>100 = Scattered results. Only useful for testing.</li>
          <li>1,000 = The results start to cluster. Takes about 20 seconds on a comptuer.</li>
          <li>10,000 = Good for demonstration. Takes several minutes on a desktop computer.</li>
          <li>100,000 = Used for actual expirement. Takes time, 10s of minutes. Be aware!</li>
        </ul>
      </p>
      <p class="px-4 pb-4">
        Choose the Bandwidth. A higher value will result in more locations getting crossed, by both the Nazcal lines and the simultion lines.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSimulationStore } from '/src/stores/simulation'

const simulationStore = useSimulationStore()
const { getRuns, getBandwidth } = storeToRefs(simulationStore)

const runs = computed({
  get() {
    return getRuns.value
  },
  set(val) {
    simulationStore.setRuns(val)
  }
})
const bandwidth = computed({
  get() {
    return getBandwidth.value
  },
  set(val) {
    simulationStore.setBandwidth(val)
  }
})

</script>
