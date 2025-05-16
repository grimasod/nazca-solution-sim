import { defineStore } from 'pinia'
import { useFetchGoogleSheets } from '/src/composables/useFetchGoogleSheets'
import { useSimulationStore } from '/src/stores/simulation'

export const useLocationStore = defineStore('locations', {
  state: () => ({
    locations: {
      site: [],
      'impact-crater': [],
      volcano: [],
    },
  }),
  getters: {
    getSelectedLocations() {
      const simulationStore = useSimulationStore()
      return this.locations[simulationStore.selectionType]
    },
  },
  actions: {
    async fetchLocations() {
      if (this.getSelectedLocations.length === 0) {
        const simulationStore = useSimulationStore()
        const { fetchLocationData } = useFetchGoogleSheets()
        switch (simulationStore.selectionType) {
          case 'site': {
            this.locations.site = await fetchLocationData({
              spreadsheetId: import.meta.env.VITE_SITE_SHEET_ID,
              sheetName: import.meta.env.VITE_SITE_SHEET_NAME,
              type: 'site',
            })
            break
          }
          case 'impact-crater': {
            this.locations['impact-crater'] = await fetchLocationData({
              spreadsheetId: import.meta.env.VITE_IC_SHEET_ID,
              sheetName: import.meta.env.VITE_IC_SHEET_NAME,
              type: 'impact-crater',
            })

            break
          }
          case 'volcano': {
            this.locations.volcano = await fetchLocationData({
              spreadsheetId: import.meta.env.VITE_VOLCANO_SHEET_ID,
              sheetName: import.meta.env.VITE_VOLCANO_SHEET_NAME,
              type: 'volcano',
            })
            break
          }
        }
      }
    },
  },
})
