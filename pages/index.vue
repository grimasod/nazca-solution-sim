<template>
  <div class="">
    <div class="flex pb-10">
      <div class="w-1/2 pr-10">
        <h3 id="data" class="mb-4 text-4xl font-bold">
          Data
        </h3>
        <div class="grid grid-cols-5 gap-4">
          <div class="">
            Locations:
          </div>
          <div class="col-span-2">
            {{ isSitesActive ? 'Ancient Sites' : isCratersActive ? 'Impact Craters' : isVolcanoesActive ? 'Volcanoes' : 'All' }}
            <div>
              {{ selectionIsCustom ? 'Custom' : 'Standard' }} Set
              <span class="font-bold">({{ simTargetList.length }} locations)</span>
            </div>
          </div>
          <div class="col-span-2">
            <NuxtLink :to="locationsRoute" class="inline-flex px-3 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              View / Edit Locations
            </NuxtLink>
          </div>
          <div class="">
            Radials:
          </div>
          <div v-if="simRadialCenters" class="col-span-2">
            {{ simRadialCenters.length }} Centers
            [{{ simRadialCenters.map(rc => rc.angles.length).join(', ') }}]
            <div>
              Simulation is using
              <span class="font-bold">
                {{ radialsIsRandom === 'fixed' ? 'fixed Radial Centers (same as Nazca)' : radialsIsRandom === 'random' ? 'randomly generated Radial Centers' : '' }}
              </span>
            </div>
          </div>
          <div class="col-span-2">
            <NuxtLink to="/radials" class="inline-flex px-3 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              View / Edit Radials
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="w-1/2 rounded bg-blue-100 text-blue-800 text-sm">
        <h4 class="px-4 py-2 bg-blue-600 text-white rounded-t w-full text-lg font-bold">
          Step 1
        </h4>
        <p class="p-4">
          Click on "View / Edit Locations" to select which group of loactions to run the experiment on.
          Choose "Ancient Sites", "Impact Craters", "Volcanoes", or "All".
          You can also choose whether use the "Standard" set of locations that were used in the experiement, or you can customize the list and even add your own.
        </p>
        <p class="px-4 pb-4">
          Click on "View / Edit Radials" to see the list of Radial Centers and their respective radials that form the Nazca map.
          There is an option to use the same radials centers in the simulation, instead of randomly generated ones.
          However, this is not part of the official experiment.
        </p>
      </div>
    </div>
    <div class="flex pb-10">
      <div class="w-1/2 pr-10">
        <h3 id="settings" class="mb-4 text-4xl font-bold">
          Settings
        </h3>
        <div class="grid grid-cols-5 gap-4">
          <label for="runs">Runs</label>
          <div class="col-span-4">
            <div class="border rounded divide-x inline-flex">
              <input v-model.number="runs" name="runs" type="number" class="rounded-l px-3 py-2">
              <span class="bg-gray-100 px-3 py-2 text-gray-500">
                iterations of the simulation
              </span>
            </div>
          </div>
          <label for="runs">Bandwidth</label>
          <div class="col-span-4">
            <div class="border rounded divide-x inline-flex">
              <input v-model.number="bandwidth" name="runs" type="number" class="rounded-l px-3 py-2">
              <span class="bg-gray-100 px-3 py-2 text-gray-500">
                km (width of great circles)
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 rounded bg-blue-100 text-blue-800 text-sm">
        <h4 class="px-4 py-2 bg-blue-600 text-white rounded-t w-full text-lg font-bold">
          Step 2
        </h4>
        <p class="p-4">
          Choose how many times the simulation will run. A higher number give results of significance, but takes longer:
          <ul>
            <li>100 = Scattered results. Only useful for testing.</li>
            <li>1,000 = The results start to cluster. Takes about 20 seconds on a comptuer.</li>
            <li>10,000 = Good for demonstration. Takes several minutes on a desktop computer.</li>
            <li>100,000 = Used for actual expirement. Takes time, 10s of minutes. Be aware!</li>
          </ul>
        </p>
        <p class="px-4 pb-4">
          Choose the Bandwidth. A higher value will result in more locations getting crossed, by both the Nazcal lines and the simultion lines.
        </p>
      </div>
    </div>
    <div class="flex pb-10">
      <div id="run" class="w-1/2 pr-10">
        <button
          class="px-4 py-3 font-bold text-red-600 rounded border-2 border-red-600 hover:bg-red-600 hover:text-white"
          :disabled="isRunning"
          @click="run"
        >
          Run The Simulation and Statistical Calculations
        </button>
      </div>
      <div class="w-1/2 rounded bg-blue-100 text-blue-800 text-sm">
        <h4 class="px-4 py-2 bg-blue-600 text-white rounded-t w-full text-lg font-bold">
          Step 3
        </h4>
        <p class="p-4">
          Click the button and wait for the results
        </p>
        <p class="px-4 pb-4">
          Important! Please keep the window open while the program is running, to avoid potential memory issues.
        </p>
      </div>
    </div>

    <h3 id="results" class="mb-4 text-4xl font-bold">
      Results
    </h3>
    <div class="grid grid-cols-10 gap-2 text-center text-xs pb-10">
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Nazca
        </h5>
        <p>{{ nazcaHits }}</p>
      </div>
      <div class="flex flex-col">
        <h5 class="uppercase pb-2">
          Sim Results
        </h5>
        <p>
          <textarea v-model="getSimHitTotalListText" class="max-w-full h-32 border rounded-sm border-gray-200" readonly />
        </p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Sum Total
        </h5>
        <p>{{ sumTotalHits }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Max
        </h5>
        <p>{{ maxHits }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Min
        </h5>
        <p>{{ minHits }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Mean
        </h5>
        <p>{{ mean }}</p>
      </div>
      <div class="flex flex-col">
        <h5 class="uppercase pb-2">
          Sum Sq Diff
        </h5>
        <p>{{ sumSqrDiff.toFixed(2) }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Variance
        </h5>
        <p>{{ variance.toFixed(2) }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Std Dev
        </h5>
        <p>{{ (distribution.standardDeviation) ? distribution.standardDeviation.toFixed(2) : '' }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Probability
        </h5>
        <p>{{ probability.toFixed(8) }}</p>
      </div>
    </div>
    <div class="flex pb-10">
      <div class="w-1/2 pr-10">
        <GChart
          v-show="simHitTotalList.length > 0 && !isRunning"
          type="Histogram"
          @ready="onChartReady"
        />
      </div>
      <div class="w-1/2 rounded bg-blue-100 text-blue-800 text-sm">
        <h4 class="px-4 py-2 bg-blue-600 text-white rounded-t w-full text-lg font-bold">
          The Results
        </h4>
        <p class="p-4">
          <ul>
            <li>
              <strong>NAZCA</strong> The number of selected locations that the Nazca lines transect at the specified Bandwidth
            </li>
            <li>
              <strong>SIM RESULTS</strong> The list of reults of the simultion, one for each run. These can be copied and pasted into a statistics calculator to verify the calculations.
            </li>
            <li>
              <strong>PROBABILITY</strong>
              Using the list of simulation results, this is the probability that the Nazca lines result could occur randomly.
              For example a value of <em>0.01</em> is the same as saying <em>One in a hundred</em>.
            </li>
          </ul>
        </p>
        <p class="px-4 pb-4">
          The graph plots all the simulation results:
          <ul>
            <li>
              A higher column shows that more simulation runs gave that particulr result.
            </li>
            <li>
              By comparing the Nazca result, we get a visual indication of how likely it could occur randomly.
            </li>
            <li>
              The further to the right, the less likely it is to be by chance and more likely to be by design.
            </li>
          </ul>
          Ideally a bell-shaped curve is displayed, indicating normal probability distribution, which we are assuming in our probaility caclulations.
        </p>
      </div>
    </div>
    <div class="" :class="{ 'hidden': !isRunning}">
      <div class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-40" />
      <div class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
        <div class="flex px-40 py-10 bg-white rounded">
          Running...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GChart } from 'vue-google-charts'
import Simulation from '~/mixins/simulation'

export default {
  name: 'Sim',
  components: {
    GChart
  },
  mixins: [
    Simulation
  ],
  data () {
    return {
      chart: {},
      google: {}
    }
  },
  computed: {
    ...mapGetters({
      simRadialCenters: 'radialCenters/getSelectedRadialCenters',
      simTargetList: 'targets/getActiveTargetList',
      selectionType: 'ui/getSelectionType',
      selectionIsCustom: 'ui/getSelectionIsCustom',
      radialsIsRandom: 'ui/getRadialsIsRandom',
      locationsRoute: 'ui/getLocationsRoute'
    }),
    isSitesActive () {
      return this.selectionType === 'site'
    },
    isCratersActive () {
      return this.selectionType === 'crater'
    },
    isVolcanoesActive () {
      return this.selectionType === 'volcano'
    },
    isAllActive () {
      return this.selectionType === 'all'
    },
    isStandardSet () {
      return !this.selectionIsCustom
    },
    getSimHitTotalListText () {
      return this.simHitTotalList.join(', ')
    }
  },
  methods: {
    async run () {
      await this.setRunning(true)
      setTimeout(this.runSimulation, 500)
    },
    setRunning (state) {
      this.isRunning = state
    },
    onChartReady (chart, google) {
      this.chart = chart
      this.google = google
    },
    drawChart () {
      const options = {
        title: 'Frequency of result',
        legend: { position: 'none' },
        // colors: ['#4285F4'],
        chartArea: { width: 401 },
        // hAxis: {
        //   ticks: [55,60,65,70,75,80,85,90,95,100,105,110,115,120]
        // },
        bar: { gap: 0 },
        histogram: {
          bucketSize: 1,
          maxNumBuckets: 500
        }
      }
      const rawData = [['Run', 'Result']]
      this.simHitTotalList.forEach((result, index) => {
        rawData.push(['run-' + index, result])
      })
      // console.log(rawData);
      const chartData = this.google.visualization.arrayToDataTable(rawData)
      // console.log(chartData)
      this.chart.draw(chartData, options)
    }
  }

}
</script>
