import { defineStore } from 'pinia'
import { useSimulationStore } from './simulation'
import data from '/src/assets/json/radial-centers.json'
import LatLon from 'geodesy/latlon-nvector-spherical.js'

export const useRadialCentersStore = defineStore('radial-centers', {
  state: () => ({
    radialCenters: []
  }),
  getters: {
    getRadialCenters: state => state.radialCenters,
    getSelectedRadialCenters () {
      const simulationStore = useSimulationStore()
      const singleGreatCircle = simulationStore.getSingleGreatCircle
      return singleGreatCircle
        ? this.getRadialCenters.filter(radial => radial.name === singleGreatCircle.rcName).map(radial => ({
          ...radial,
          greatCircles: radial.greatCircles.filter(gc => gc.name === singleGreatCircle.gcName)
        }))
        : this.getRadialCenters
    }
  },
  actions: {
    fetchRadialCenters () {
      this.radialCenters = data.radialCenters.map(rc => ({
        ...rc,
        latlon: new LatLon(rc.location.latitude, rc.location.longitude)
      }))
    }
  }
})
