<template>
  <div class="flex flex-col pb-10 lg:flex-row-reverse">
    <div class="rounded bg-sky-50 text-sky-800 text-sm mb-4 lg:w-1/2 lg:m-0">
      <h4 class="px-4 py-2 bg-sky-600 text-white rounded-t w-full text-lg font-bold">
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
    <div class="lg:pr-10 lg:w-1/2">
      <h3 id="settings" class="mb-4 text-4xl font-bold">
        Settings
      </h3>
      <div class="flex flex-col gap-4">
        <label for="runs" class="flex flex-col gap-4 md:flex-row">
          <span class="md:w-24 md:shrink-0">
            Runs
          </span>
          <div class="md:grow">
            <div class="border rounded divide-x inline-flex lg:flex">
              <input id="runs" v-model.number="runs" name="runs" type="number" class="w-24 rounded-l px-3 py-2 lg:grow lg:w-auto">
              <span class="bg-gray-100 px-3 py-2 text-gray-500">
                iterations of the simulation
              </span>
            </div>
          </div>
        </label>
        <label for="bandwidth" class="flex flex-col gap-4 md:flex-row">
          <span class="md:w-24 md:shrink-0">
            Bandwidth
          </span>
          <div class="md:grow">
            <div class="border rounded divide-x inline-flex lg:flex">
              <input id="bandwidth" v-model="bandwidth" name="bandwidth" class="w-24 rounded-l px-3 py-2 lg:grow lg:w-auto">
              <span class="bg-gray-100 px-3 py-2 text-gray-500">
                km (width of great circles)
              </span>
            </div>
          </div>
        </label>
      </div>
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
