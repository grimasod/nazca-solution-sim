<template>
  <SimSection>
    <template #title>Radials</template>
    <template #notes>
      <div class="flex lg:justify-end">
        <button
          @click="uiStore.setView('radials')"
          class="inline-flex text-sky-800 underline decoration-sky-300 hover:decoration-sky-800"
        >
          View Radials
        </button>
      </div>
    </template>
    <template #default>
      <div class="flex w-full lg:justify-center">
        <span v-if="radialCentersStore.getSelectedRadialCenters" class="font-bold">
          {{ radialCentersStore.getSelectedRadialCenters.length }} Radial Centers [{{
            radialCentersStore.getSelectedRadialCenters
              .map((rc) => rc.greatCircles.length)
              .join(', ')
          }}]
        </span>
      </div>
    </template>
  </SimSection>
</template>

<script setup>
import { useUiStore } from '/src/stores/ui'
import SimSection from '/src/components/SimSection.vue'
import { useRadialCentersStore } from '/src/stores/radial-centers'

const uiStore = useUiStore()
const radialCentersStore = useRadialCentersStore()
</script>
