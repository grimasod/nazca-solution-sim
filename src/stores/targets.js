import { defineStore } from 'pinia'
import { useSimulationStore } from './simulation'
import data from '/src/assets/json/targets.json'
import LatLon from 'geodesy/latlon-nvector-spherical.js'

export const useTargetsStore = defineStore('targets', {
  state: () => ({
    targets: [],
  }),
  getters: {
    getTargetLists() {
      return {
        site: this.targets.filter((target) => target.type === 'site'),
        'impact-crater': this.targets.filter((target) => target.type === 'impact-crater'),
        volcano: this.targets.filter((target) => target.type === 'volcano'),
      }
    },
    getCurrentTargetList() {
      const simulationStore = useSimulationStore()
      return simulationStore.getTypeIsAll
        ? this.targets
        : this.getTargetLists[simulationStore.selectionType]
    },
    getActiveTargetList() {
      const simulationStore = useSimulationStore()
      const selectionIsCustom = simulationStore.selectionIsCustom
      return this.getCurrentTargetList.filter(
        (target) =>
          (selectionIsCustom &&
            ((simulationStore.getTypeIsAll && target.isUsedInSimCustomAll) ||
              (!simulationStore.getTypeIsAll && target.isUsedInSimCustom))) ||
          (!selectionIsCustom && target.isUsedInSim),
      )
    },
  },
  actions: {
    fetchTargets() {
      this.targets = data.targets.map((target) => ({
        ...target,
        isUsedInSimCustom: target.isUsedInSim,
        isUsedInSimCustomAll: target.isUsedInSim,
        latlon: new LatLon(target.location.latitude, target.location.longitude),
      }))
    },
    async selectCustomTargets({ val, name }) {
      const simulationStore = useSimulationStore()
      this.targets = this.targets.map((target) => ({
        ...target,
        ...(target.name !== name
          ? {}
          : simulationStore.getTypeIsAll
            ? { isUsedInSimCustomAll: val }
            : { isUsedInSimCustom: val }),
      }))
    },
    async selectManyCustomTargets({ action }) {
      // console.log('selectManyCustomTargets', action)
      const simulationStore = useSimulationStore()
      const value = action === 'all' ? true : action === 'none' ? false : null
      // console.log('selectManyCustomTargets', simulationStore.selectionType, simulationStore.getTypeIsAll, action)
      this.targets = this.targets.map((target) => ({
        ...target,
        ...(!simulationStore.getTypeIsAll && target.type !== simulationStore.selectionType
          ? {}
          : simulationStore.getTypeIsAll
            ? { isUsedInSimCustomAll: value === null ? target.isUsedInSim : value }
            : { isUsedInSimCustom: value === null ? target.isUsedInSim : value }),
      }))
    },
    async addTarget({ target }) {
      const simulationStore = useSimulationStore()
      this.targets.push({
        name: target.name,
        location: {
          latitude: target.latitude,
          longitude: target.longitude,
        },
        latlon: new LatLon(target.latitude, target.longitude),
        isUsedInSim: false,
        tags: ['User Added'],
        type: simulationStore.selectionType,
        types: [],
        isUsedInSimCustom: true,
        isUsedInSimCustomAll: true,
      })
    },
  },
})
