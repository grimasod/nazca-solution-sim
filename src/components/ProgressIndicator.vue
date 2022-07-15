<template>
  <div v-if="getIsRunning">
    <div class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-40" />
    <div class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
     <div class="flex px-20 py-10 bg-white rounded flex flex-col items-center">
        Running...
        <!-- <div class="w-40 border h-6 mt-4 flex items-stretch">
          <div class="bg-blue-600" :style="indicatorStyle" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSimulationStore } from '/src/stores/simulation'

const simulationStore = useSimulationStore()
const { getIsRunning, getRuns } = storeToRefs(simulationStore)

const props = defineProps({
  completeRuns: {
    type: Number,
    default: 0
  }
})

const indicatorStyle = computed(() => `width:${(Math.round(props.completeRuns / getRuns.value * 100))}%`)

</script>
