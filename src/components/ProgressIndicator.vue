<template>
  <UiModal v-if="simulationStore.isRunning">
    Running {{ bandwidthCount + 1 }} of {{ allBandwidths.length }} at
    {{ allBandwidths[bandwidthCount] }}km
    <div class="w-56 border h-6 mt-4 mb-8 flex items-stretch">
      <div class="bg-sky-600" :style="indicatorStyle" />
    </div>
    <button
      v-if="!canceled"
      class="p-1 w-40 rounded border border-gray-200 bg-gray-50 hover:bg-gray-100"
      @click="doCancel"
    >
      Cancel
    </button>
    <button
      v-else
      class="p-1 w-40 rounded border text-red-600 border-red-600 bg-gray-50 hover:bg-gray-100 disabled:text-gray-300 disabled:bg-gray-100 disabled:border-gray-200"
      :disabled="confirmed"
      @click="doConfirm"
    >
      Sure?
    </button>
  </UiModal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useSimulationStore } from '/src/stores/simulation'
import UiModal from '/src/components/UiModal.vue'

const simulationStore = useSimulationStore()

const props = defineProps({
  allBandwidths: {
    type: Array,
    default: () => [],
  },
  bandwidthCount: {
    type: Number,
    default: 0,
  },
  percentComplete: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['cancel'])

const canceled = ref(false)
const confirmed = ref(false)

const doCancel = () => {
  canceled.value = true
}
const doConfirm = () => {
  confirmed.value = true
  emit('cancel')
}

watch(
  () => simulationStore.isRunning,
  () => {
    if (simulationStore.isRunning) {
      canceled.value = false
      confirmed.value = false
    }
  },
)

const indicatorStyle = computed(() => `width:${props.percentComplete}%`)
</script>
