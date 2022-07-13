import { defineStore } from 'pinia'
import { useUIStore } from './ui'
import data from '/src/assets/json/targets.json'
import LatLon from 'geodesy/latlon-nvector-spherical.js'

export const useTargetsStore = defineStore('targets', {
  state: () => ({
    targets: []
  }),
  getters: {
    getTargets: state => state.targets,
    getTargetLists () {
      return {
        site: this.getTargets.filter(target => target.type === 'site'),
        'impact-crater': this.getTargets.filter(target => target.type === 'impact-crater'),
        volcano: this.getTargets.filter(target => target.type === 'volcano')
      }
    },
    getCurrentTargetList () {
      const uiStore = useUIStore()
      return uiStore.getTypeIsAll ? this.getTargets : this.getTargetLists[uiStore.getSelectionType]
    },
    getActiveTargetList () {
      const uiStore = useUIStore()
      const selectionIsCustom = uiStore.getSelectionIsCustom
      return this.getCurrentTargetList.filter(target =>
        (selectionIsCustom && (
          (uiStore.getTypeIsAll && target.isUsedInSimCustomAll) ||
          (!uiStore.getTypeIsAll && target.isUsedInSimCustom))
        ) ||
        (!selectionIsCustom && target.isUsedInSim))
    }
  },
  actions: {
    fetchTargets () {
      this.targets = data.targets.map(target => ({
        ...target,
        isUsedInSimCustom: target.isUsedInSim,
        isUsedInSimCustomAll: target.isUsedInSim,
        latlon: new LatLon(target.location.latitude, target.location.longitude)
      }))
    },
    async selectCustomTargets ({ val, name }) {
      const uiStore = useUIStore()
      this.targets = this.getTargets.map(target => ({
        ...target,
        ...target.name !== name
          ? {}
          : uiStore.getTypeIsAll
            ? { isUsedInSimCustomAll: val }
            : { isUsedInSimCustom: val }
      }))
    },
    async selectManyCustomTargets ({ action }) {
      // console.log('selectManyCustomTargets', action)
      const uiStore = useUIStore()
      const value = action === 'all' ? true : action === 'none' ? false : null
      // console.log('selectManyCustomTargets', uiStore.getSelectionType, uiStore.getTypeIsAll, action)
      this.targets = this.getTargets.map(target => ({
        ...target,
        ...(!uiStore.getTypeIsAll && target.type !== uiStore.getSelectionType)
          ? {}
          : uiStore.getTypeIsAll
            ? { isUsedInSimCustomAll: value === null ? target.isUsedInSim : value }
            : { isUsedInSimCustom: value === null ? target.isUsedInSim : value }
      }))
    },
    async addTarget ({ target }) {
      const uiStore = useUIStore()
      this.targets.push({
        name: target.name,
        location: {
          latitude: target.latitude,
          longitude: target.longitude
        },
        latlon: new LatLon(target.location.latitude, target.location.longitude),
        isUsedInSim: false,
        tags: ['User Added'],
        type: uiStore.getSelectionType,
        types: [],
        isUsedInSimCustom: true,
        isUsedInSimCustomAll: true
      })
    }
  }
})
