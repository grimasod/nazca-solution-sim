<template>
  <div class="flex flex-col">
    <h3 id="results" ref="resultsOutputRef" class="mb-4 text-4xl font-bold order-0">
      Results
    </h3>
    <div class="flex flex-col pb-10 order-1 lg:order-2 lg:flex-row-reverse">
      <div class="rounded bg-sky-50 text-sky-800 text-sm mb-4 lg:w-1/2 lg:m-0">
        <h4 class="px-4 py-2 bg-sky-600 text-white rounded-t w-full text-lg font-bold">
          The Results
        </h4>
        <div class="p-4">
          <ul>
            <li>
              <strong>NAZCA</strong> The number of selected locations that the Nazca lines transect at the specified Bandwidth
            </li>
            <li>
              <strong>SIM RESULTS</strong> The list of reults of the simulation, one for each run. These can be copied and pasted into a statistics calculator to verify the calculations.
            </li>
            <li>
              <strong>PROBABILITY</strong>
              Using the list of simulation results, this is the probability that the Nazca lines result could occur randomly.
              For example a value of <em>0.01</em> is the same as saying <em>One in a hundred</em>.
            </li>
          </ul>
        </div>
        <div class="px-4 pb-4 font-semibold">
          Anything less than 0.001 (ie 1 in anything over 1000) for any bandwidth should be considered sufficient proof that the Nazca lines do actually represent a map.
        </div>
        <div class="px-4">
          The graph plots all the simulation results:
          <ul>
            <li>
              A higher column shows that more simulation runs gave that particular result.
            </li>
            <li>
              By comparing the Nazca result, we get a visual indication of how likely it could occur randomly.
            </li>
            <li>
              The further to the right, the less likely it is to be by chance and more likely to be by design.
            </li>
          </ul>
          <p class="py-4">
            Ideally a bell-shaped curve is displayed, indicating normal probability distribution, which we are assuming in our probaility caclulations.
          </p>
        </div>
      </div>
      <div class="w-full lg:w-1/2 lg:pr-10">
        <GChart
          v-if="chartDataRaw"
          type="Histogram"
          :data="chartDataFormatted"
          :options="chartOptions"
          @ready="onChartReady"
        />
      </div>
    </div>
    <div v-if="getResults.length > 0" class="">
      <ResultSet v-for="(resultsSet, resultsSet_index) in getResults" :key="resultsSet_index" :results="resultsSet" />
    </div>
    <div v-else class="lg:h-52" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ResultSet from '/src/components/ResultSet.vue'
import { storeToRefs } from 'pinia'
import { GChart } from 'vue-google-charts'
import { useSimulationStore } from '/src/stores/simulation'

const simulationStore = useSimulationStore()
const { getIsRunning, getResults } = storeToRefs(simulationStore)

// const simHitTotalListText = computed(() => getResults.value ? getResults.value.simHitTotalList.join(', ') : '')

const resultsOutputRef = ref(null)

const chartDataRaw = ref(null)
const chartDataFormatted = ref(null)
const chartOptions = {
  title: 'Frequency of result',
  legend: { position: 'none' },
  chartArea: { width: 401 },
  bar: { gap: 0 },
  histogram: {
    bucketSize: 1,
    maxNumBuckets: 500
  }
}
const onChartReady = (chart, google) => {
  chartDataFormatted.value = google.visualization.arrayToDataTable(chartDataRaw.value)
}


watch(() => getIsRunning.value, () => {
  if (!getIsRunning.value) {
    // console.log('getResults.value.length', getResults.value.length)
    if (getResults.value.length > 0) {
      resultsOutputRef.value.scrollIntoView({ behavior: 'smooth' })
    }
    chartDataRaw.value = getResults.value.length === 1 ? getResults.value[0].simHitTotalList.reduce((prev, cur, i) => [...prev, [`run-${i+1}`, cur]], [['Run', 'Result']]) : null
  }
})

</script>
