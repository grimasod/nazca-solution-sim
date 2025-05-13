<template>
  <SimSection>
    <template #title>Results</template>
    <template #notes>
      <div class="flex flex-col gap-4">
        <ul>
          <li>
            <span class="uppercase font-bold">Nazca</span> The number of locations that the Nazca
            lines transect at the specified Grat Circle Width
          </li>
          <li>
            <span class="uppercase font-bold">Sim Results</span> The list of reults of the
            simulation, one for each run. These can be copied and pasted into a statistics
            calculator to verify the calculations.
          </li>
          <li>
            <span class="uppercase font-bold">p-value</span>
            Using the list of simulation results, this is the probability of results from the random
            data being as extreme or more extreme than the data actually observed for the Nazca
            lines. For example a value of <em>0.01</em> is the same as saying
            <em>One in a hundred</em>.
          </li>
        </ul>
        <p class="font-semibold">
          Anything less than 0.001 (1 in 1000) for any Great Circle width should be considered
          sufficient proof that the Nazca lines do actually represent a map.
        </p>
      </div>
    </template>
    <template #default>
      <div v-if="simulationStore.results.length > 0" class="flex w-full lg:justify-center">
        <ResultSet
          v-for="(resultsSet, resultsSet_index) in simulationStore.results"
          :key="resultsSet_index"
          :results="resultsSet"
        />
      </div>
      <a />
    </template>
  </SimSection>
  <SimSection>
    <template #title>Result Graph</template>
    <template #notes>
      <div ref="resultsOutputRef" class="flex flex-col gap-4">
        <p>The graph plots all the simulation results:</p>
        <ul>
          <li>A higher column shows that more simulation runs gave that particular result.</li>
          <li>
            By comparing the Nazca result, we get a visual indication of how likely it could occur
            randomly.
          </li>
          <li>
            The further to the right, the less likely it is to be by chance and more likely to be by
            design.
          </li>
        </ul>
        <p>
          Ideally a bell-shaped curve is displayed, indicating normal probability distribution,
          which we are assuming in our probaility caclulations.
        </p>
      </div>
    </template>
    <template #default>
      <GChart
        v-if="chartDataRaw"
        type="Histogram"
        :data="chartDataFormatted"
        :options="chartOptions"
        @ready="onChartReady"
      />
    </template>
  </SimSection>
</template>

<script setup>
import { ref, watch } from 'vue'
import ResultSet from '/src/components/ResultSet.vue'
import { GChart } from 'vue-google-charts'
import { useSimulationStore } from '/src/stores/simulation'
import SimSection from '/src/components/SimSection.vue'

const simulationStore = useSimulationStore()

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
    maxNumBuckets: 500,
  },
}
const onChartReady = (_chart, google) => {
  chartDataFormatted.value = google.visualization.arrayToDataTable(chartDataRaw.value)
}

watch(
  () => simulationStore.isRunning,
  () => {
    if (simulationStore.isRunning) {
      chartDataRaw.value = null
    } else {
      if (simulationStore.results.length > 0) {
        resultsOutputRef.value.scrollIntoView({ behavior: 'smooth' })
      }
      chartDataRaw.value =
        simulationStore.results.length === 1
          ? simulationStore.results[0].simHitTotalList.reduce(
              (prev, cur, i) => [...prev, [`run-${i + 1}`, cur]],
              [['Run', 'Result']],
            )
          : null
    }
  },
)
</script>
