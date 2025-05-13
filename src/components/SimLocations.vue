<template>
  <SimSection>
    <template #title>Locations</template>
    <template #notes>
      <div class="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <p class="">Choose "Ancient Sites", "Impact Craters", or "Volcanoes".</p>
        <button
          @click="uiStore.setView('locations')"
          class="inline-flex text-sky-800 underline decoration-sky-300 hover:decoration-sky-800"
        >
          View Locations
        </button>
      </div>
    </template>
    <template #default>
      <div class="flex w-full lg:justify-center">
        <SelectLocations />
      </div>
    </template>
  </SimSection>
</template>

<script setup>
import { useUiStore } from '/src/stores/ui'
import SelectLocations from '/src/components/SelectLocations.vue'
import SimSection from '/src/components/SimSection.vue'

const uiStore = useUiStore()
</script>
