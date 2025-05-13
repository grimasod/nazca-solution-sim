<template>
  <SimSection>
    <template #title>Great Circle Width</template>
    <template #notes>
      <p>
        Enter the Great Circle Width. A higher value will result in more locations getting crossed,
        by both the Nazcal lines and the simultion lines.
      </p>
      <p>
        Multiple runs can be done by listing multiple bandwidths separated by a comma, like
        "30,35,40". In this case, the graph of results is not generated.
      </p>
    </template>
    <template #default>
      <div class="flex w-full lg:justify-center">
        <div class="border rounded divide-x inline-flex lg:flex">
          <input
            id="bandwidth"
            v-model="bandwidth"
            name="bandwidth"
            class="w-24 rounded-l px-3 py-2 lg:grow lg:w-auto"
          />
          <span class="bg-gray-100 px-3 py-2 text-gray-500"> km (width of great circles) </span>
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

const bandwidth = computed({
  get() {
    return simulationStore.bandwidth
  },
  set(val) {
    simulationStore.setBandwidth(val)
  },
})
</script>
