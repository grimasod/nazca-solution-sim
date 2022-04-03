import LatLon from 'geodesy/latlon-nvector-spherical.js'
import Gaussian from 'gaussian'

export default {
  data () {
    return {
      runs: 100,
      bandwidth: 30,
      nazcaHits: 0,
      isRunning: false,
      simHitTotalList: [],
      sumTotalHits: 0,
      maxHits: 0,
      minHits: 0,
      mean: 0,
      sumSqrDiff: 0,
      variance: 0,
      distribution: 0,
      probability: 0
    }
  },
  computed: {
    distMeters () {
      return this.dist * 1000
    },
    dist () {
      return this.bandwidth / 2
    }
  },
  methods: {
    runSimulation () {
      this.doReset() // reset data from all calculations
      console.log('sim is go... ' + this.runs + ' at ' + this.dist)

      if (this.simTargetList.length > 0 && this.runs > 1) {
        // calculate the hits for Nazca RCs/GCs
        this.nazcaResults = this.getResults(this.simRadialCenters)
        this.nazcaHits = this.nazcaResults.totalHits
        console.log(this.nazcaResults)

        for (let i = 0; i < this.runs; i++) {
          let simResults = {}
          const simRCs = []

          this.simRadialCenters.forEach((rc) => {
            const simGCs = []
            let simLatLon

            if (this.radialsIsRandom === 'fixed') {
              simLatLon = new LatLon(rc.location.latitude, rc.location.longitude)
            } else if (rc.name === 'rG') {
              simLatLon = new LatLon(-simRCs[1].latlon.lat, Math.round((simRCs[1].latlon.lon > 0) ? simRCs[1].latlon.lon - 180 : simRCs[1].latlon.lon + 180), 3)
            } else {
              simLatLon = new LatLon(this.rand_lat(), this.rand_lon())
            }

            rc.greatCircles.forEach(() => {
              simGCs.push({ angle: this.rand_angle() })
            })

            simRCs.push({
              greatCircles: simGCs,
              latlon: simLatLon
            })
          })
          // console.log(simRCs);
          simResults = this.getResults(simRCs)

          this.simHitTotalList.push(simResults.totalHits)
        }
        // loop through the results and find the min and max result
        // and populte the graph data
        this.simHitTotalList.forEach((runResult) => {
          this.maxHits = Math.max(this.maxHits, runResult)
          this.minHits = (this.minHits < 0) ? runResult : Math.min(this.minHits, runResult)
          this.sumTotalHits += runResult
          // if (aGraph[runResult] == null) {
          //   aGraph[runResult] = 1;
          // } else {
          //   aGraph[runResult] += 1;
          // }
        })

        this.mean = this.sumTotalHits / this.runs

        // calcualte the sum of Square differences between each value and the mean
        this.simHitTotalList.forEach((runResult) => {
          this.sumSqrDiff += Math.pow(runResult - this.mean, 2)
        })

        // probability calculations
        this.variance = this.sumSqrDiff / this.runs
        if (this.variance > 0) {
          this.distribution = new Gaussian(this.mean, this.variance)
          this.probability = 1 - this.distribution.cdf(this.nazcaResults.totalHits)
        }

        console.log(this.probability)

        this.drawChart()
      }
      this.setRunning(false)
      this.$router.push('/#results')
    },
    doReset () {
      this.nazcaHits = 0
      this.simHitTotalList = []
      this.sumTotalHits = 0
      this.maxHits = 0
      this.minHits = -1
      this.mean = 0
      this.sumSqrDiff = 0
      this.variance = 0
      this.distribution = 0
      this.probability = 0
    },
    getResults (radialCenters) {
      let results = {}
      const targetHits = []
      let totalHits = 0
      let doubleHits = 0
      let tripleHits = 0
      let quadHits = 0
      const targetHitCount = []
      // let isHitThisRC = []
      let distance = 0
      // let d = 0

      this.simTargetList.forEach((target) => {
        if (!target.latlon) {
          try {
            target.latlon = new LatLon(target.location.latitude, target.location.longitude)
          } catch (e) {
            console.log(e, target.location.latitude, target.location.longitude)
          }
        }
        // console.log(target)
        // TO DO - replace name with an id
        targetHitCount[target.name] = {
          isHitThisRC: false,
          hits: 0
        }
        // if (p_getAllHits) {
        //   targetHits[k] = {
        //     'mainIndex': target.mainIndex,
        //     'closest': -1,
        //     'hits': []
        //   }
        // }
      })

      radialCenters.forEach((rc) => {
        if (!rc.latlon) {
          rc.latlon = new LatLon(rc.location.latitude, rc.location.longitude)
        }

        // reset all the hit flags, so they can be counted again for this RC
        this.simTargetList.forEach((target) => {
          targetHitCount[target.name].isHitThisRC = false
        })

        rc.greatCircles.forEach((gc) => {
          this.simTargetList.forEach((target) => {
            if (!targetHitCount[target.name].isHitThisRC) { // || p_getAllHits
              // get shortest distance from the target to the GC which radiates from the RC at the given angle
              distance = Math.abs(target.latlon.crossTrackDistanceTo(rc.latlon, gc.angle))
              // console.log(target.name)
              // console.log(distance)
              // console.log(distance <= this.dist)
              // console.log(target.latlon.crossTrackDistanceTo(rc.latlon, gc))
              // console.log(target.latlon)
              // console.log(rc.latlon)
              // console.log(gc)
              // distance = 1

              if (distance <= this.distMeters) {
                // console.log(target.name);

                // only increment hit count if not already hit by a GC from this RC
                if (!targetHitCount[target.name].isHitThisRC) {
                  targetHitCount[target.name].isHitThisRC = true // flag the Target as hit, so it's not counted again
                  // totalHitCheck += 1 // increment the hit count for the Target
                  targetHitCount[target.name].hits += 1
                }
              }
            }
          })
        })
      })
      // console.log(targetHitCount)
      this.simTargetList.forEach((target) => {
        totalHits += targetHitCount[target.name].hits
        if (targetHitCount[target.name].hits > 1) {
          doubleHits += 1
          if (targetHitCount[target.name].hits > 2) {
            tripleHits += 1
            if (targetHitCount[target.name].hits > 3) {
              quadHits += 1
            }
          }
        }
      })

      results = {
        totalHits,
        doubleHits,
        tripleHits,
        quadHits,
        targets: targetHits
      }

      return results
    },
    rand_lat () {
      // "rand_lat" is a function to generate random latitude values, between
      // -90 and +90, with 2 decimal places
      return this.rand_3places(90, -90)
    },
    rand_lon () {
      // "rand_lon" is a function to generate random longitude values, between
      // -180 and +180, with 2 decimal places
      return this.rand_3places(180, -180)
    },
    rand_angle () {
      return this.rand_3places(360, 0)
    },
    rand_3places (pMax, pMin) {
      // funtion to generate a random number betweem +pMax and -pMax
      // multpily pMax and pMin by 1000 to allow for 3 decimal places
      // add min1000 to allow for a final +/- pMax value
      // multiply by a random number between 0 and 1, and round the result, to get an integer between 0 and pMax X 1000 X 2 (inclusive)
      // subtract min1000 to get +/- value and divide by 1000 to get 3 deciaml places
      const max1000 = pMax * 1000
      const min1000 = pMin * 1000
      return (Math.round(Math.random() * (max1000 - min1000)) + min1000) / 1000
    }
  }

}
