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
            {{ getTypeIsSites ? 'Ancient Sites' : getTypeIsCraters ? 'Impact Craters' : getTypeIsVolcanoes ? 'Volcanoes' : 'All' }}
            <div>
              {{ getSelectionIsCustom ? 'Custom' : 'Standard' }} Set
              <span class="font-bold">({{ getActiveTargetList.length }} locations)</span>
            </div>
          </div>
          <div class="col-span-2">
            <router-link :to="{ name: getSelectionType }" class="inline-flex px-3 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              View / Edit Locations
            </router-link>
          </div>
          <div class="">
            Radials:
          </div>
          <div v-if="getSelectedRadialCenters" class="col-span-2">
            {{ getSelectedRadialCenters.length }} Centers
            [{{ getSelectedRadialCenters.map(rc => rc.greatCircles.length).join(', ') }}]
            <div>
              Simulation is using
              <span class="font-bold">
                {{ getRadialsIsRandom === 'fixed' ? 'fixed Radial Centers (same as Nazca)' : getRadialsIsRandom === 'random' ? 'randomly generated Radial Centers' : '' }}
              </span>
            </div>
          </div>
          <div class="col-span-2">
            <router-link :to="{ name: 'radials' }" class="inline-flex px-3 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              View / Edit Radials
            </router-link>
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
          <label for="bandwidth">Bandwidth</label>
          <div class="col-span-4">
            <div class="border rounded divide-x inline-flex">
              <input v-model.number="bandwidth" name="bandwidth" type="number" class="rounded-l px-3 py-2">
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
          @click="runSimulation"
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
          <span class="font-bold">Important!</span> Please keep the window open while the program is running, to avoid potential memory issues.
        </p>
      </div>
    </div>

    <h3 id="results" ref="resultsOutputRef" class="mb-4 text-4xl font-bold">
      Results
    </h3>
    <div v-if="results" class="grid grid-cols-10 gap-2 text-center text-xs pb-10 h-52">
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Nazca
        </h5>
        <p>{{ results.nazcaHits }}</p>
      </div>
      <div class="flex flex-col">
        <h5 class="uppercase pb-2">
          Sim Results
        </h5>
        <p>
          <textarea v-model="simHitTotalListText" class="max-w-full h-32 border rounded-sm border-gray-200" readonly />
        </p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Sum Total
        </h5>
        <p>{{ results.sumTotalHits }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Max
        </h5>
        <p>{{ results.maxHits }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Min
        </h5>
        <p>{{ results.minHits }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Mean
        </h5>
        <p>{{ results.mean }}</p>
      </div>
      <div class="flex flex-col">
        <h5 class="uppercase pb-2">
          Sum Sq Diff
        </h5>
        <p>{{ results.sumSqrDiff.toFixed(2) }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Variance
        </h5>
        <p>{{ results.variance.toFixed(2) }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Std Dev
        </h5>
        <p>{{ results.distribution ? results.distribution.standardDeviation.toFixed(2) : '' }}</p>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="uppercase pb-2">
          Probability
        </h5>
        <p>{{ results.probability.toFixed(8) }}</p>
      </div>
    </div>
    <div v-else class="h-52" />
    <div class="flex pb-10">
      <div class="w-1/2 pr-10">
        <GChart
          v-if="chartDataRaw"
          type="Histogram"
          :data="chartDataFormatted"
          :options="chartOptions"
          @ready="onChartReady"
        />
      </div>
      <div class="w-1/2 rounded bg-blue-100 text-blue-800 text-sm">
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

<script setup>
import { ref, computed, nextTick, toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { useUIStore } from '/src/stores/ui'
import { useRadialCentersStore } from '/src/stores/radial-centers'
import { useTargetsStore } from '/src/stores/targets'
import { GChart } from 'vue-google-charts'
import LatLon from 'geodesy/latlon-nvector-spherical.js'
import Gaussian from 'gaussian'

const uiStore = useUIStore()
const { getSelectionType, getSelectionIsCustom, getRadialsIsRandom, getTypeIsSites, getTypeIsCraters, getTypeIsVolcanoes, getRuns, getBandwidth } = storeToRefs(uiStore)

const radialCentersStore = useRadialCentersStore()
const { getSelectedRadialCenters } = storeToRefs(radialCentersStore)

const targetsStore = useTargetsStore()
const { getActiveTargetList } = storeToRefs(targetsStore)

const runs = computed({
  get() {
    return getRuns.value
  },
  set(val) {
    uiStore.setRuns(val)
  }
})
const bandwidth = computed({
  get() {
    return getBandwidth.value
  },
  set(val) {
    uiStore.setBandwidth(val)
  }
})

const resultsOutputRef = ref(null)
const isRunning = ref(false)

const results = ref(null)
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

const resetResults = () => {
  results.value = null
  chartDataRaw.value  = null
  chartDataFormatted.value  = null
}

const simHitTotalListText = computed(() => results ? results.value.simHitTotalList.join(', ') : '')

const runSimulation = async () => {
  await setRunning(true)
  await resetResults() // reset data from all calculations
  await nextTick()
  // run()
  setTimeout(run, 1)
}

const setRunning = async (status) => {
  isRunning.value = status
}

const run = async () => {

  const targets = getActiveTargetList.value.map(t => toRaw(t))

  if (targets.length > 0) {
    // await setRunning(true)
    // await resetResults() // reset data from all calculations
    // await nextTick()

    const numRuns = runs.value
    const dist = bandwidth.value / 2
    const distMeters = dist * 1000
    console.log(`sim is go... ${numRuns} runs at ${dist}km hit distance`)

    const radialCenters = toRaw(getSelectedRadialCenters.value)

    const isRadialsFixed = getRadialsIsRandom.value === 'fixed'

    const simHitTotalList = []

    // calculate the hits for Nazca RCs/GCs
    // const nazcaResults = getResults(radialCenters, targets, distMeters)
    // const nazcaHits = nazcaResults.totalHits
    // console.log('nazcaResults', nazcaResults)
    const nazcaHits = getResults(radialCenters, targets, distMeters)
    console.log('nazcaHits', nazcaHits)

    for (let i = 0; i < numRuns; i++) {
      // console.log(i)
      let simResults = {}
      const simRCs = []

      radialCenters.forEach((rc) => {
        simRCs.push({
          greatCircles: rc.greatCircles.map(() => ({ angle: rand_angle() })),
          latlon: isRadialsFixed
            ? new LatLon(rc.location.latitude, rc.location.longitude)
            : rc.name === 'rG'
              ? new LatLon(-simRCs[1].latlon.lat, Math.round((simRCs[1].latlon.lon > 0) ? simRCs[1].latlon.lon - 180 : simRCs[1].latlon.lon + 180), 3)
              : new LatLon(rand_lat(), rand_lon())
        })
      })
      // console.log(simRCs)
      // simResults = getResults(simRCs, targets, distMeters)
      //
      // simHitTotalList.push(simResults.totalHits)
      simHitTotalList.push(getResults(simRCs, targets, distMeters))
    }
    // find the min and max result and sumTotal of all results to get the mean
    const aggregates = simHitTotalList.reduce((prev, cur) => ({
      maxHits: Math.max(prev.maxHits, cur),
      minHits: prev.minHits === null ? cur : Math.min(prev.minHits, cur),
      sumTotalHits: prev.sumTotalHits += cur
    }), {
      maxHits: 0,
      minHits: null,
      sumTotalHits: 0
    })
    // console.log(aggregates)

    const mean = aggregates.sumTotalHits / numRuns

    // calcualte the sum of Square differences between each value and the mean
    const sumSqrDiff = simHitTotalList.reduce((prev, cur) => prev + Math.pow(cur - mean, 2), 0)
    // console.log(sumSqrDiff)

    // probability calculations
    const variance = sumSqrDiff / numRuns
    const distribution = variance > 0 ? new Gaussian(mean, variance) : null
    const probability = distribution ? 1 - distribution.cdf(nazcaHits) : 0

    results.value = {
      nazcaHits,
      simHitTotalList,
      ...aggregates,
      mean,
      sumSqrDiff,
      variance,
      distribution,
      probability
    }
    addChart()

    resultsOutputRef.value.scrollIntoView({ behavior: 'smooth' })
  }
  setRunning(false)
}

const getResults = (radialCenters, targets, distMeters) => {
  // console.log('getResults radialCenters', JSON.stringify(radialCenters))
  let totalHitCount = 0
  // const targetHitCount = {}
  // targets.forEach((target) => {
  //   // console.log('getResults targets target', target.name, JSON.stringify(target))
  //   if (!target.latlon) {
  //     throw new Error('latlon is Required')
  //   }
  //   // console.log(target)
  //   // TO DO - replace name with an id
  //   targetHitCount[target.name] = { hits: 0 }
  // })
  // TODO (if counting doubles, etc) why does the below change make it so much slower? (about 2 or 3 times longer)
  // const targetHitCount = targets.reduce((prev, cur) => ({ ...prev, [cur.name]: { hits: 0 } }), {})

  radialCenters.forEach((rc) => {
    // console.log('getResults radialCenters', rc.name, JSON.stringify(rc.latlon))
    if (!rc.latlon) {
      throw new Error('latlon is Required')
      // rc.latlon = new LatLon(rc.location.latitude, rc.location.longitude)
    }

    const hitTargets = {}

    // reset all the hit flags, so they can be counted again for this RC
    // targets.forEach((target) => {
    //   targetHitCount[target.name].isHitThisRC = false
    // })
    // console.log('targetHitCount', targetHitCount)

    rc.greatCircles.forEach((gc) => {
      // console.log('gc', gc)
      targets.forEach((target) => {
        // console.log('target', target)
        // console.log('targetHitCount[target.name].isHitThisRC', targetHitCount[target.name].isHitThisRC)
        // only if not already hit by a GC from this RC
        // if (!targetHitCount[target.name].isHitThisRC) {
        if (!hitTargets[target.name]) {
          // get shortest distance from the target to the GC which radiates from the RC at the given angle
          // console.log('crossTrackDistanceTo', target.latlon, rc.latlon, gc.angle)
          const distance = Math.abs(target.latlon.crossTrackDistanceTo(rc.latlon, gc.angle))
          // console.log('target.name, distance', target.name, distance)
          // console.log(distance <= dist)
          // console.log(target.latlon.crossTrackDistanceTo(rc.latlon, gc))
          // console.log(target.latlon)
          // console.log(rc.latlon)
          // console.log(gc)
          // distance = 1

          if (distance <= distMeters) {
            // console.log(target.name);
            // only increment once per RC
            // targetHitCount[target.name].isHitThisRC = true // flag the Target as hit, so it's not counted again
            hitTargets[target.name] = true // flag the Target as hit, so it's not counted again
            // totalHitCheck += 1 // increment the hit count for the Target
            // targetHitCount[target.name].hits += 1
            totalHitCount += 1
          }
        }
      })
    })
  })
  // return targets.reduce((prev, cur) => ({
  //   totalHits: prev.totalHits + targetHitCount[cur.name].hits,
  //   doubleHits: prev.doubleHits + (targetHitCount[cur.name].hits > 1 ? 1 : 0),
  //   tripleHits: prev.tripleHits + (targetHitCount[cur.name].hits > 2 ? 1 : 0),
  //   quadHits: prev.quadHits + (targetHitCount[cur.name].hits > 3 ? 1 : 0)
  // }), {
  //   totalHits: 0,
  //   doubleHits: 0,
  //   tripleHits: 0,
  //   quadHits: 0
  // })
  return totalHitCount
}

const rand_lat = () => {
  // "rand_lat" is a function to generate random latitude values, between
  // -90 and +90, with 2 decimal places
  return rand_3places(90, -90)
}
const rand_lon = () => {
  // "rand_lon" is a function to generate random longitude values, between
  // -180 and +180, with 2 decimal places
  return rand_3places(180, -180)
}
const rand_angle = () => {
  return rand_3places(360, 0)
}
const rand_3places = (pMax, pMin) => {
  // funtion to generate a random number betweem +pMax and -pMax
  // multpily pMax and pMin by 1000 to allow for 3 decimal places
  // add min1000 to allow for a final +/- pMax value
  // multiply by a random number between 0 and 1, and round the result, to get an integer between 0 and pMax X 1000 X 2 (inclusive)
  // subtract min1000 to get +/- value and divide by 1000 to get 3 deciaml places
  const max1000 = pMax * 1000
  const min1000 = pMin * 1000
  return (Math.round(Math.random() * (max1000 - min1000)) + min1000) / 1000
}

const addChart = () => {
  if (results.value) {
    chartDataRaw.value = results.value.simHitTotalList.reduce((prev, cur, i) => [...prev, [`run-${i+1}`, cur]], [['Run', 'Result']])
  }
}
const onChartReady = (chart, google) => {
  chartDataFormatted.value = google.visualization.arrayToDataTable(chartDataRaw.value)
}

</script>
