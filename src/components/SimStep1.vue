<template>
  <div class="flex flex-col pb-10 lg:flex-row-reverse">
    <div class="rounded bg-sky-50 text-sky-800 text-sm mb-4 lg:w-1/2 lg:m-0">
      <h4 class="px-4 py-2 bg-sky-600 text-white rounded-t w-full text-lg font-bold">Step 1</h4>
      <p class="p-4">
        Click on "View / Edit Locations" to select which group of loactions to run the experiment
        on. Choose "Ancient Sites", "Impact Craters", "Volcanoes", or "All". You can also choose
        whether use the "Standard" set of locations that were used in the experiement, or you can
        customize the list and even add your own.
      </p>
      <p class="px-4 pb-4">
        Click on "View / Edit Radials" to see the list of Radial Centers and their respective
        radials that form the Nazca map. There is an option to use the same radials centers in the
        simulation, instead of randomly generated ones. However, this is not part of the official
        experiment.
      </p>
    </div>
    <div class="lg:pr-10 lg:w-1/2">
      <h3 id="data" class="mb-4 text-4xl font-bold">Data</h3>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="md:w-24 md:shrink-0">Locations:</div>
          <div class="md:grow">
            {{
              simulationStore.getTypeIsSites
                ? 'Ancient Sites'
                : simulationStore.getTypeIsCraters
                  ? 'Impact Craters'
                  : simulationStore.getTypeIsVolcanoes
                    ? 'Volcanoes'
                    : 'All'
            }}
            <div>
              {{ simulationStore.selectionIsCustom ? 'Custom' : 'Standard' }} Set
              <span class="font-bold"
                >({{ targetsStore.getActiveTargetList.length }} locations)</span
              >
            </div>
          </div>
          <div class="md:w-52 md:shrink-0">
            <router-link
              :to="{ name: simulationStore.selectionType }"
              class="inline-flex px-3 py-2 rounded border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white"
            >
              View / Edit Locations
            </router-link>
          </div>
        </div>
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="md:w-24 md:shrink-0">Radials:</div>
          <div v-if="radialCentersStore.getSelectedRadialCenters" class="md:grow">
            {{ radialCentersStore.getSelectedRadialCenters.length }} Centers [{{
              radialCentersStore.getSelectedRadialCenters
                .map((rc) => rc.greatCircles.length)
                .join(', ')
            }}]
            <div>
              Simulation is using
              <span class="font-bold">
                {{
                  simulationStore.radialsIsRandom === 'fixed'
                    ? 'fixed Radial Centers (same as Nazca)'
                    : simulationStore.radialsIsRandom === 'random'
                      ? 'randomly generated Radial Centers'
                      : ''
                }}
              </span>
            </div>
          </div>
          <div class="md:w-52 md:shrink-0">
            <router-link
              :to="{ name: 'radials' }"
              class="inline-flex px-3 py-2 rounded border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white"
            >
              View / Edit Radials
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSimulationStore } from '/src/stores/simulation'
import { useRadialCentersStore } from '/src/stores/radial-centers'
import { useTargetsStore } from '/src/stores/targets'

const simulationStore = useSimulationStore()
const radialCentersStore = useRadialCentersStore()
const targetsStore = useTargetsStore()
</script>
