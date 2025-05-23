<template>
  <div class="flex flex-col gap-10">
    <SimLocations />
    <SimRadials />
    <SimRuns />
    <SimBandWidth />
    <SimButton @start="startSimulation" />
    <SimResults />
    <ProgressIndicator
      :all-bandwidths="allBandwidths"
      :bandwidth-count="bandwidthCount"
      :percent-complete="blockRunCount"
      @cancel="cancelRequested = true"
    />
  </div>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import ProgressIndicator from '/src/components/ProgressIndicator.vue'
import SimLocations from '/src/components/SimLocations.vue'
import SimRadials from '/src/components/SimRadials.vue'
import SimRuns from '/src/components/SimRuns.vue'
import SimBandWidth from '/src/components/SimBandWidth.vue'
import SimButton from '/src/components/SimButton.vue'
import SimResults from '/src/components/SimResults.vue'
import { useRandomGenerators } from '/src/composables'
import { useSimulationStore } from '/src/stores/simulation'
import { useRadialCentersStore } from '/src/stores/radial-centers'
import { useLocationStore } from '/src/stores/locations'
import LatLon from 'geodesy/latlon-nvector-spherical.js'
import Gaussian from 'gaussian'

const simulationStore = useSimulationStore()

const radialCentersStore = useRadialCentersStore()

const locationStore = useLocationStore()

const setRunning = (status) => {
  simulationStore.setIsRunning(status)
}

const { randomLatitude, randomAngle } = useRandomGenerators()

const allBandwidths = ref([])
const bandwidthCount = ref(0)
const blockRunCount = ref(0)
const cancelRequested = ref(false)

let radialCenters = []
let locations = []
let runs = 0
// let allBandwidths = []
let blockSize = 0
let remainder = 0
let isRadialsFixed = false

let nazcaHits = 0
let simHitTotalList = []
let bandwidth = 0
let distMeters = 0
let remainderBlockIsDone = false

const startSimulation = () => {
  runs = Math.abs(Math.trunc(simulationStore.runs))
  radialCenters = toRaw(radialCentersStore.getSelectedRadialCenters)
  locations = locationStore.getSelectedLocations.map((t) => toRaw(t))
  if (locations.length > 0 && radialCenters.length > 0 && runs > 0) {
    setRunning(true)
    bandwidthCount.value = 0
    allBandwidths.value = simulationStore.bandwidth
      .split(',')
      .map((item) => Number(item))
      .filter((item) => !!item)
    // console.log(allBandwidths.value)
    blockSize = runs > 100 ? Math.trunc(runs / 100) : 0
    remainder = runs > 100 ? runs % 100 : runs
    isRadialsFixed = simulationStore.radialsIsRandom === 'fixed'
    cancelRequested.value = false
    simulationStore.setResults([])
    setTimeout(runSimulation, 1)
  }
}

const runSimulation = () => {
  bandwidth = allBandwidths.value[bandwidthCount.value]
  distMeters = (bandwidth / 2) * 1000
  nazcaHits = 0
  simHitTotalList = []
  blockRunCount.value = 0
  remainderBlockIsDone = false

  nazcaHits = calculateHits(radialCenters, locations, distMeters)

  doSimulationRun()
}

const doSimulationRun = () => {
  if (cancelRequested.value) {
    simulationStore.setResults([])
    setRunning(false)
    return
  }

  let runsThisBlock = 0

  if (blockSize > 0 && blockRunCount.value < 100) {
    runsThisBlock = blockSize
    blockRunCount.value++
  } else if (remainder > 0 && !remainderBlockIsDone) {
    runsThisBlock = remainder
    remainderBlockIsDone = true
  }
  // console.log('doSimulationRun runsThisBlock', runsThisBlock)

  if (runsThisBlock > 0) {
    for (let i = 0; i < runsThisBlock; i++) {
      const simRCs = []

      radialCenters.forEach((rc) => {
        simRCs.push({
          greatCircles: rc.greatCircles.map(() => ({ angle: randomAngle() })),
          latlon: isRadialsFixed
            ? new LatLon(rc.location.latitude, rc.location.longitude)
            : rc.name === 'rG'
              ? new LatLon(
                  -simRCs[1].latlon.lat,
                  Math.round(
                    simRCs[1].latlon.lon > 0
                      ? simRCs[1].latlon.lon - 180
                      : simRCs[1].latlon.lon + 180,
                  ),
                  3,
                )
              : new LatLon(randomLatitude(), randomLatitude()),
        })
      })
      simHitTotalList.push(calculateHits(simRCs, locations, distMeters))
    }
    setTimeout(doSimulationRun, 1)
  } else {
    endSimulation()
  }
}

const endSimulation = () => {
  // console.log('endSimulation runs:', simHitTotalList.length)
  const aggregates = simHitTotalList.reduce(
    (prev, cur) => ({
      maxHits: Math.max(prev.maxHits, cur),
      minHits: prev.minHits === null ? cur : Math.min(prev.minHits, cur),
      sumTotalHits: (prev.sumTotalHits += cur),
    }),
    {
      maxHits: 0,
      minHits: null,
      sumTotalHits: 0,
    },
  )
  // console.log(aggregates)

  const mean = aggregates.sumTotalHits / runs

  // calcualte the sum of Square differences between each value and the mean
  const sumSqrDiff = simHitTotalList.reduce((prev, cur) => prev + Math.pow(cur - mean, 2), 0)
  // console.log(sumSqrDiff)

  // probability calculations
  const variance = sumSqrDiff / runs
  const distribution = variance > 0 ? new Gaussian(mean, variance) : null
  const probability = distribution ? 1 - distribution.cdf(nazcaHits) : 0

  // const sameOrAbove = simHitTotalList.filter(res => res >= nazcaHits)
  // console.log('sameOrAbove', sameOrAbove.length)

  simulationStore.addResults({
    bandwidth,
    nazcaHits,
    simHitTotalList: [...simHitTotalList],
    ...aggregates,
    mean,
    sumSqrDiff,
    variance,
    standardDeviation: distribution.standardDeviation,
    probability,
  })
  if (bandwidthCount.value + 1 < allBandwidths.value.length) {
    bandwidthCount.value++
    setTimeout(runSimulation, 1)
  } else {
    setRunning(false)
  }
}

const calculateHits = (radialCenters, locations, distMeters) => {
  // console.log('calculateHits radialCenters, locations, distMeters', radialCenters, locations, distMeters)
  let totalHitCount = 0
  // const locationHitCount = {}
  // locations.forEach((location) => {
  //   // console.log('calculateHits locations location', location.name, JSON.stringify(location))
  //   if (!location.latlon) {
  //     throw new Error('latlon is Required')
  //   }
  //   // console.log(location)
  //   // TO DO - replace name with an id
  //   locationHitCount[location.name] = { hits: 0 }
  // })
  // TODO (if counting doubles, etc) why does the below change make it so much slower? (about 2 or 3 times longer)
  // const locationHitCount = locations.reduce((prev, cur) => ({ ...prev, [cur.name]: { hits: 0 } }), {})

  radialCenters.forEach((rc) => {
    // console.log('calculateHits radialCenters', rc.name, JSON.stringify(rc.latlon))
    if (!rc.latlon) {
      throw new Error('latlon is Required')
      // rc.latlon = new LatLon(rc.location.latitude, rc.location.longitude)
    }

    const hitTargets = {}

    // reset all the hit flags, so they can be counted again for this RC
    locations.forEach((location) => {
      // locationHitCount[location.name].isHitThisRC = false
      hitTargets[location.name] = false
    })
    // console.log('locationHitCount', locationHitCount)

    rc.greatCircles.forEach((gc) => {
      // console.log('gc', gc)
      locations.forEach((location) => {
        // console.log('location', location)
        // console.log('locationHitCount[location.name].isHitThisRC', locationHitCount[location.name].isHitThisRC)
        // only if not already hit by a GC from this RC
        // if (!locationHitCount[location.name].isHitThisRC) {
        if (!hitTargets[location.name]) {
          // get shortest distance from the location to the GC which radiates from the RC at the given angle
          // console.log('crossTrackDistanceTo', location.latlon, rc.latlon, gc.angle)
          const distance = Math.abs(location.latlon.crossTrackDistanceTo(rc.latlon, gc.angle))
          // console.log('location.name, distance', location.name, distance)
          // console.log(distance <= dist)
          // console.log(location.latlon.crossTrackDistanceTo(rc.latlon, gc))
          // console.log(location.latlon)
          // console.log(rc.latlon)
          // console.log(gc)
          // distance = 1

          if (distance <= distMeters) {
            // console.log(location.name);
            // only increment once per RC
            // locationHitCount[location.name].isHitThisRC = true // flag the Target as hit, so it's not counted again
            hitTargets[location.name] = true // flag the Target as hit, so it's not counted again
            // totalHitCheck += 1 // increment the hit count for the Target
            // locationHitCount[location.name].hits += 1
            totalHitCount += 1
          }
        }
      })
    })
  })
  // return locations.reduce((prev, cur) => ({
  //   totalHits: prev.totalHits + locationHitCount[cur.name].hits,
  //   doubleHits: prev.doubleHits + (locationHitCount[cur.name].hits > 1 ? 1 : 0),
  //   tripleHits: prev.tripleHits + (locationHitCount[cur.name].hits > 2 ? 1 : 0),
  //   quadHits: prev.quadHits + (locationHitCount[cur.name].hits > 3 ? 1 : 0)
  // }), {
  //   totalHits: 0,
  //   doubleHits: 0,
  //   tripleHits: 0,
  //   quadHits: 0
  // })
  return totalHitCount
}
</script>
