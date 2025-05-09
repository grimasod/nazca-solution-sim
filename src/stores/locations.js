import { defineStore } from 'pinia'
import { useFetchGoogleSheets } from '/src/composables/useFetchGoogleSheets'
import { useSimulationStore } from '/src/stores/simulation'

export const useLocationStore = defineStore('locations', {
  state: () => ({
    locations: [],
  }),
  actions: {
    async fetchLocations() {
      const simulationStore = useSimulationStore()
      const { fetchLocationData } = useFetchGoogleSheets()

      this.locations = []
      switch (simulationStore.selectionType) {
        case 'site': {
          this.locations = await fetchLocationData({
            spreadsheetId: '1lAii6V_KypVBlp4BtC60dcnJMMPb6WFgbGHv9HZ1rW4',
            type: 'site',
          })
          break
        }
        case 'impact-crater': {
          this.locations = await fetchLocationData({
            spreadsheetId: '1jwFGdXC-HUcsN94Ep6D_cgZjV43Gj0ZMSNobRYsqT0w',
            type: 'impact-crater',
          })

          break
        }
        case 'volcano': {
          this.locations = await fetchLocationData({
            spreadsheetId: '1v3KmRWtHdAd2PVYZszr9iPWcm8upBwaGyclq6K2quEw',
            type: 'volcano',
          })
          break
        }
      }
    },
  },
})
