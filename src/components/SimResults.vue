<template>
  <div class="flex flex-col">
    <h3 id="results" ref="resultsOutputRef" class="mb-4 text-4xl font-bold order-0">
      Results
    </h3>
    <div class="flex flex-col pb-10 order-1 lg:order-2 lg:flex-row-reverse">
      <div class="rounded bg-blue-100 text-blue-800 text-sm mb-4 lg:w-1/2 lg:m-0">
        <h4 class="px-4 py-2 bg-blue-600 text-white rounded-t w-full text-lg font-bold">
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
    <div class="flex flex-col items-stretch gap-2 text-xs pb-10 order-3 lg:order-1 lg:grid lg:grid-cols-10 lg:text-center">
      <template v-if="getResults">
        <div class="flex lg:items-center lg:h-52 lg:flex-col">
          <h5 class="uppercase w-32 w-full lg:w-auto lg:pb-2">
            Nazca
          </h5>
          <p>{{ getNazcaHits }}</p>
        </div>
        <div class="flex lg:items-center lg:flex-col">
          <h5 class="uppercase w-32 lg:w-auto lg:pb-2">
            Sim Results
          </h5>
          <p class="grow flex">
            <textarea v-model="simHitTotalListText" class="grow max-w-full h-32 border rounded-sm border-gray-200" readonly />
          </p>
        </div>
        <div class="flex lg:items-center lg:flex-col">
          <h5 class="uppercase w-32 lg:w-auto lg:pb-2">
            Sum Total
          </h5>
          <p>{{ getResults.sumTotalHits }}</p>
        </div>
        <div class="flex lg:items-center lg:flex-col">
          <h5 class="uppercase w-32 lg:w-auto lg:pb-2">
            Max
          </h5>
          <p>{{ getResults.maxHits }}</p>
        </div>
        <div class="flex lg:items-center lg:flex-col">
          <h5 class="uppercase w-32 lg:w-auto lg:pb-2">
            Min
          </h5>
          <p>{{ getResults.minHits }}</p>
        </div>
        <div class="flex lg:items-center lg:flex-col">
          <h5 class="uppercase w-32 lg:w-auto lg:pb-2">
            Mean
          </h5>
          <p>{{ getResults.mean }}</p>
        </div>
        <div class="flex lg:items-center lg:flex-col">
          <h5 class="uppercase w-32 lg:w-auto lg:pb-2">
            Sum Sq Diff
          </h5>
          <p>{{ getResults.sumSqrDiff.toFixed(2) }}</p>
        </div>
        <div class="flex lg:items-center lg:flex-col">
          <h5 class="uppercase w-32 lg:w-auto lg:pb-2">
            Variance
          </h5>
          <p>{{ getResults.variance.toFixed(2) }}</p>
        </div>
        <div class="flex lg:items-center lg:flex-col">
          <h5 class="uppercase w-32 lg:w-auto lg:pb-2">
            Std Dev
          </h5>
          <p>{{ getResults.distribution ? getResults.distribution.standardDeviation.toFixed(2) : '' }}</p>
        </div>
        <div class="flex lg:items-center lg:flex-col">
          <h5 class="uppercase w-32 lg:w-auto lg:pb-2">
            Probability
          </h5>
          <p>{{ getResults.probability.toFixed(8) }}</p>
        </div>
      </template>
      <div v-else class="lg:h-52" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { GChart } from 'vue-google-charts'
import { useSimulationStore } from '/src/stores/simulation'

const simulationStore = useSimulationStore()
const { getNazcaHits, getResults } = storeToRefs(simulationStore)

const simHitTotalListText = computed(() => getResults.value ? getResults.value.simHitTotalList.join(', ') : '')

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
watch(() => getResults.value, () => {
  if (getResults.value) {
    chartDataRaw.value = getResults.value.simHitTotalList.reduce((prev, cur, i) => [...prev, [`run-${i+1}`, cur]], [['Run', 'Result']])
    resultsOutputRef.value.scrollIntoView({ behavior: 'smooth' })
  } else {
    chartDataRaw.value = null
  }
})

</script>
