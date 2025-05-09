import { defineStore } from 'pinia'
import { useLocationStore } from '/src/stores/locations'

export const useSimulationStore = defineStore('simulation', {
  state: () => ({
    selectionType: 'site',
    selectionIsCustom: false,
    radialsIsRandom: 'random',
    singleGreatCircle: null,
    runs: 100,
    bandwidth: '30',
    isRunning: false,
    // nazcaHits: 0,
    results: [],
  }),
  getters: {
    getTypeIsSites() {
      return this.selectionType === 'site'
    },
    getTypeIsCraters() {
      return this.selectionType === 'impact-crater'
    },
    getTypeIsVolcanoes() {
      return this.selectionType === 'volcano'
    },
    getTypeIsAll() {
      return this.selectionType === 'all'
    },
  },
  actions: {
    setSelectionType(selectionType) {
      const locationStore = useLocationStore()
      this.selectionType = selectionType
      locationStore.fetchLocations()
    },
    setSelectionIsCustom(isCustom) {
      this.selectionIsCustom = isCustom
    },
    setRadialsIsRandom(isRandom) {
      this.radialsIsRandom = isRandom
    },
    setSingleGreatCircle(gc) {
      this.singleGreatCircle = gc
    },
    setRuns(runs) {
      this.runs = runs
    },
    setBandwidth(bandwidth) {
      this.bandwidth = bandwidth
    },
    setIsRunning(status) {
      this.isRunning = status
    },
    // setNazcaHits (hits) {
    //   this.nazcaHits = hits
    // },
    setResults(results) {
      this.results = results
    },
    addResults(resultSet) {
      this.results.push(resultSet)
    },
  },
})
