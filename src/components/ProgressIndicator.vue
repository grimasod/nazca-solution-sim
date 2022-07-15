<template>
  <div v-if="getIsRunning">
    <div class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-40" />
    <div class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
     <div class="flex p-10 bg-white rounded flex flex-col items-center">
        Running...
        <div class="w-56 border h-6 mt-4 mb-8 flex items-stretch">
          <div class="bg-blue-600" :style="indicatorStyle" />
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSimulationStore } from '/src/stores/simulation'

const simulationStore = useSimulationStore()
const { getIsRunning, getRuns } = storeToRefs(simulationStore)

const props = defineProps({
  percentComplete: {
    type: Number,
    default: 0
  }
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

watch(() => getIsRunning.value, () => {
  if (getIsRunning.value) {
    canceled.value = false
    confirmed.value = false
  }
})

const indicatorStyle = computed(() => `width:${props.percentComplete}%`)

</script>
