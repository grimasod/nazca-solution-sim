<template>
  <div>
    <h2 class="mb-1 text-lg font-bold">Radials</h2>
    <div class="flex flex-col lg:flex-row-reverse">
      <div class="flex flex-col items-start gap-6 pb-10 lg:w-1/2 lg:pl-10">
        <div class="rounded bg-sky-50">
          <div class="rounded-t bg-sky-600 text-white px-4 py-3">
            Radial Centers Random Generation
          </div>
          <div class="px-4 py-3 text-sm text-sky-800">
            Click on the buttons below to select whether you want the radial centers to be:
            <ul class="mt-4">
              <li>Genertated randomly for each run of the simultion, as used in our experiment.</li>
              <!-- <li>
                Genertated randomly once and use for all simulation runs
              </li> -->
              <li>
                Fixed, the same locations as the Nazca map Radial Centers. Note that this is not
                part of the experiment, which requires random locations as well as random angles for
                the radials. This option is only provided to satisify curiosity.
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col divide-y border rounded w-full max-w-full">
          <button
            class="rounded-t px-4 py-2"
            :class="{ 'border-sky-600 bg-sky-600 text-white': isRandom }"
            @click="setRadialsIsRandom('random')"
          >
            Random Radial Centers (used in official experiment)
          </button>
          <!-- <button @click="setRadialsIsRandom('once')" class="" :class="{ '': !isOnce }">One time random Radial Centers</button> -->
          <button
            class="rounded-b px-4 py-2"
            :class="{ 'border-sky-600 bg-sky-600 text-white': !isRandom }"
            @click="setRadialsIsRandom('fixed')"
          >
            Fixed Radial Centers (not used in official experiment)
          </button>
        </div>
      </div>
      <div class="lg:w-1/2 lg:pr-10">
        <table v-if="radialCentersStore.radialCenters.length" class="w-full text-xs lg:text-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Great Circles</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rc in radialCentersStore.radialCenters" :key="rc.name">
              <td>
                {{ rc.name }}
              </td>
              <td>
                <div class="flex">
                  <div class="w-1/2 pr-4">
                    {{ rc.location.latitude }}
                  </div>
                  <div class="w-1/2">
                    {{ rc.location.longitude }}
                  </div>
                </div>
              </td>
              <td>
                <div>Count: {{ rc.greatCircles.length }}</div>
                <ul class="text-xs rounded bg-white p-2">
                  <li v-for="gc in rc.greatCircles" :key="gc.angle" class="flex py-1 align-center">
                    <div class="w-32 pr-2">{{ gc.name }} ({{ gc.angle }})</div>
                    <div class="w-6">
                      <div
                        :style="{
                          transform: 'rotate(' + gc.angle + 'deg)',
                          'transform-origin': '4px 8px',
                        }"
                      >
                        &uarr;
                      </div>
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSimulationStore } from '/src/stores/simulation'
import { useRadialCentersStore } from '/src/stores/radial-centers'

const simulationStore = useSimulationStore()
const isRandom = computed(() => simulationStore.radialsIsRandom === 'random')

const radialCentersStore = useRadialCentersStore()

const setRadialsIsRandom = (type) => {
  simulationStore.setRadialsIsRandom(type)
}
</script>
