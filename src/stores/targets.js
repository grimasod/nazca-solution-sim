import { defineStore } from 'pinia'
import { useSimulationStore } from './simulation'
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
      const simulationStore = useSimulationStore()
      return simulationStore.getTypeIsAll ? this.getTargets : this.getTargetLists[simulationStore.getSelectionType]
    },
    getActiveTargetList () {
      const simulationStore = useSimulationStore()
      const selectionIsCustom = simulationStore.getSelectionIsCustom
      return this.getCurrentTargetList.filter(target =>
        (selectionIsCustom && (
          (simulationStore.getTypeIsAll && target.isUsedInSimCustomAll) ||
          (!simulationStore.getTypeIsAll && target.isUsedInSimCustom))
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
      const simulationStore = useSimulationStore()
      this.targets = this.getTargets.map(target => ({
        ...target,
        ...target.name !== name
          ? {}
          : simulationStore.getTypeIsAll
            ? { isUsedInSimCustomAll: val }
            : { isUsedInSimCustom: val }
      }))
    },
    async selectManyCustomTargets ({ action }) {
      // console.log('selectManyCustomTargets', action)
      const simulationStore = useSimulationStore()
      const value = action === 'all' ? true : action === 'none' ? false : null
      // console.log('selectManyCustomTargets', simulationStore.getSelectionType, simulationStore.getTypeIsAll, action)
      this.targets = this.getTargets.map(target => ({
        ...target,
        ...(!simulationStore.getTypeIsAll && target.type !== simulationStore.getSelectionType)
          ? {}
          : simulationStore.getTypeIsAll
            ? { isUsedInSimCustomAll: value === null ? target.isUsedInSim : value }
            : { isUsedInSimCustom: value === null ? target.isUsedInSim : value }
      }))
    },
    async addTarget ({ target }) {
      const simulationStore = useSimulationStore()
      this.targets.push({
        name: target.name,
        location: {
          latitude: target.latitude,
          longitude: target.longitude
        },
        latlon: new LatLon(target.location.latitude, target.location.longitude),
        isUsedInSim: false,
        tags: ['User Added'],
        type: simulationStore.getSelectionType,
        types: [],
        isUsedInSimCustom: true,
        isUsedInSimCustomAll: true
      })
    }
  }
})
