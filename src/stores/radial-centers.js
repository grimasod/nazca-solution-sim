import { defineStore } from 'pinia'
import { useSimulationStore } from './simulation'
import { useFetchGoogleSheets } from '/src/composables/useFetchGoogleSheets'

export const useRadialCentersStore = defineStore('radial-centers', {
  state: () => ({
    radialCenters: [],
  }),
  getters: {
    getSelectedRadialCenters() {
      const simulationStore = useSimulationStore()
      const singleGreatCircle = simulationStore.singleGreatCircle
      return singleGreatCircle
        ? this.radialCenters
            .filter((radial) => radial.name === singleGreatCircle.rcName)
            .map((radial) => ({
              ...radial,
              greatCircles: radial.greatCircles.filter(
                (gc) => gc.name === singleGreatCircle.gcName,
              ),
            }))
        : this.radialCenters
    },
  },
  actions: {
    async fetchRadialCenters() {
      const { fetchRCData } = useFetchGoogleSheets()
      this.radialCenters = await fetchRCData({
        spreadsheetId: import.meta.env.VITE_RC_SHEET_ID,
        sheetName: import.meta.env.VITE_RC_SHEET_NAME,
      })
    },
  },
})
