import { defineStore } from 'pinia'

export const useSimulationStore = defineStore('simulation', {
  state: () => ({
    selectionType: 'site',
    selectionIsCustom: false,
    radialsIsRandom: 'random',
    singleGreatCircle: null,
    runs: 100,
    bandwidth: 30,
    isRunning: false,
    nazcaHits: 0,
    results: null
  }),
  getters: {
    getSelectionType: state => state.selectionType,
    getTypeIsSites () {
      return this.getSelectionType === 'site'
    },
    getTypeIsCraters () {
      return this.getSelectionType === 'impact-crater'
    },
    getTypeIsVolcanoes () {
      return this.getSelectionType === 'volcano'
    },
    getTypeIsAll () {
      return this.getSelectionType === 'all'
    },
    getSelectionIsCustom: state => state.selectionIsCustom,
    getRadialsIsRandom: state => state.radialsIsRandom,
    getSingleGreatCircle: state => state.singleGreatCircle,
    getRuns: state => state.runs,
    getBandwidth: state => state.bandwidth,
    getIsRunning: state => state.isRunning,
    getNazcaHits: state => state.nazcaHits,
    getResults: state => state.results
  },
  actions: {
    setSelectionType (selectionType) {
      this.selectionType = selectionType
    },
    setSelectionIsCustom (isCustom) {
      this.selectionIsCustom = isCustom
    },
    setRadialsIsRandom (isRandom) {
      this.radialsIsRandom = isRandom
    },
    setSingleGreatCircle (gc) {
      this.singleGreatCircle = gc
    },
    setRuns (runs) {
      this.runs = runs
    },
    setBandwidth (bandwidth) {
      this.bandwidth = bandwidth
    },
    setIsRunning (status) {
      this.isRunning = status
    },
    setNazcaHits (hits) {
      this.nazcaHits = hits
    },
    setResults (results) {
      this.results = results
    }
  }
})
