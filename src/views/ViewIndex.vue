<template>
  <div class="">
    <SimStep1 />
    <SimStep2 />
    <SimStep3 @start="startSimulation" />
    <SimResults />
    <ProgressIndicator :complete-runs="runCount" />
  </div>
</template>

<script setup>
import { ref, computed, nextTick, toRaw } from 'vue'
import ProgressIndicator from '/src/components/ProgressIndicator.vue'
import SimStep1 from '/src/components/SimStep1.vue'
import SimStep2 from '/src/components/SimStep2.vue'
import SimStep3 from '/src/components/SimStep3.vue'
import SimResults from '/src/components/SimResults.vue'
import { useRandomGenerators } from '/src/composables'
import { storeToRefs } from 'pinia'
import { useSimulationStore } from '/src/stores/simulation'
import { useRadialCentersStore } from '/src/stores/radial-centers'
import { useTargetsStore } from '/src/stores/targets'
import LatLon from 'geodesy/latlon-nvector-spherical.js'
import Gaussian from 'gaussian'

const simulationStore = useSimulationStore()
const { getRadialsIsRandom, getRuns, getBandwidth, getNazcaHits } = storeToRefs(simulationStore)

const radialCentersStore = useRadialCentersStore()
const { getSelectedRadialCenters } = storeToRefs(radialCentersStore)

const targetsStore = useTargetsStore()
const { getActiveTargetList } = storeToRefs(targetsStore)

const setRunning = (status) => {
  simulationStore.setIsRunning(status)
}

const { randomLatitude, randomLongitude, randomAngle } = useRandomGenerators()

let runCount = 0
let simHitTotalList = []
let radialCenters = []
let targets = []
let distMeters = 0
let isRadialsFixed = false

const startSimulation = () => {
  setRunning(true)
  const dist = getBandwidth.value / 2
  distMeters = dist * 1000
  radialCenters = toRaw(getSelectedRadialCenters.value)
  targets = getActiveTargetList.value.map(t => toRaw(t))
  isRadialsFixed = getRadialsIsRandom.value === 'fixed'
  simHitTotalList = []
  runCount = 0
  simulationStore.setNazcaHits(0)
  simulationStore.setResults(null)
  console.log(`sim is go... ${getRuns.value} runs at ${dist}km hit distance`)
  setTimeout(runSimulation, 1)
}

const runSimulation = () => {
  if (targets.length > 0) {
    const nazcaHits = calculateHits(radialCenters, targets, distMeters)
    simulationStore.setNazcaHits(nazcaHits)
    console.log('nazcaHits', nazcaHits)

    // setTimeout(doSimulationRun, 1)
    for (let i = 0; i < getRuns.value; i++) {
      // console.log(i)
      let simResults = {}
      const simRCs = []

      radialCenters.forEach((rc) => {
        simRCs.push({
          greatCircles: rc.greatCircles.map(() => ({ angle: randomAngle() })),
          latlon: isRadialsFixed
            ? new LatLon(rc.location.latitude, rc.location.longitude)
            : rc.name === 'rG'
              ? new LatLon(-simRCs[1].latlon.lat, Math.round((simRCs[1].latlon.lon > 0) ? simRCs[1].latlon.lon - 180 : simRCs[1].latlon.lon + 180), 3)
              : new LatLon(randomLatitude(), randomLatitude())
        })
      })
      simHitTotalList.push(calculateHits(simRCs, targets, distMeters))
    }

    endSimulation()

  } else {
    setRunning(false)
  }
}

// const doSimulationRun = () => {
//   // console.log('doSimulationRun')
//   runCount++
//   if (runCount <= getRuns.value) {
//     const simRCs = []
//
//     radialCenters.forEach((rc) => {
//       simRCs.push({
//         greatCircles: rc.greatCircles.map(() => ({ angle: randomAngle() })),
//         latlon: isRadialsFixed
//           ? new LatLon(rc.location.latitude, rc.location.longitude)
//           : rc.name === 'rG'
//             ? new LatLon(-simRCs[1].latlon.lat, Math.round((simRCs[1].latlon.lon > 0) ? simRCs[1].latlon.lon - 180 : simRCs[1].latlon.lon + 180), 3)
//             : new LatLon(randomLatitude(), randomLatitude())
//       })
//     })
//     simHitTotalList.push(calculateHits(simRCs, targets, distMeters))
// // TODO divide by 100 runs
//     setTimeout(doSimulationRun, 1)
//   } else {
//     endSimulation()
//   }
// }

const endSimulation = () => {
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

  const mean = aggregates.sumTotalHits / getRuns.value

  // calcualte the sum of Square differences between each value and the mean
  const sumSqrDiff = simHitTotalList.reduce((prev, cur) => prev + Math.pow(cur - mean, 2), 0)
  // console.log(sumSqrDiff)

  // probability calculations
  const variance = sumSqrDiff / getRuns.value
  const distribution = variance > 0 ? new Gaussian(mean, variance) : null
  const probability = distribution ? 1 - distribution.cdf(getNazcaHits.value) : 0

  simulationStore.setResults({
    simHitTotalList,
    ...aggregates,
    mean,
    sumSqrDiff,
    variance,
    distribution,
    probability
  })
  setRunning(false)
}

const calculateHits = (radialCenters, targets, distMeters) => {
  // console.log('calculateHits radialCenters, targets, distMeters', radialCenters, targets, distMeters)
  let totalHitCount = 0
  // const targetHitCount = {}
  // targets.forEach((target) => {
  //   // console.log('calculateHits targets target', target.name, JSON.stringify(target))
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
    // console.log('calculateHits radialCenters', rc.name, JSON.stringify(rc.latlon))
    if (!rc.latlon) {
      throw new Error('latlon is Required')
      // rc.latlon = new LatLon(rc.location.latitude, rc.location.longitude)
    }

    const hitTargets = {}

    // reset all the hit flags, so they can be counted again for this RC
    targets.forEach((target) => {
      // targetHitCount[target.name].isHitThisRC = false
      hitTargets[target.name] = false
    })
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
</script>
