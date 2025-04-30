import { defineStore } from 'pinia'
import { useSimulationStore } from './simulation'
import LatLon from 'geodesy/latlon-nvector-spherical.js'
import { useFetchGoogleSheets } from '/src/composables/useFetchGoogleSheets'

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
    async fetchTargets() {
      const { fetchTargetData } = useFetchGoogleSheets()
      this.targets = [
        ...(await fetchTargetData({
          spreadsheetId: '1lAii6V_KypVBlp4BtC60dcnJMMPb6WFgbGHv9HZ1rW4',
          type: 'site',
        })),
        ...(await fetchTargetData({
          spreadsheetId: '1jwFGdXC-HUcsN94Ep6D_cgZjV43Gj0ZMSNobRYsqT0w',
          type: 'impact-crater',
        })),
        ...(await fetchTargetData({
          spreadsheetId: '1v3KmRWtHdAd2PVYZszr9iPWcm8upBwaGyclq6K2quEw',
          type: 'volcano',
        })),
      ]
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
