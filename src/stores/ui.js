import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    selectionType: 'site',
    selectionIsCustom: false,
    radialsIsRandom: 'random',
    singleGreatCircle: null
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
    getSingleGreatCircle: state => state.singleGreatCircle
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
    }
  }
})
