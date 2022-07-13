import { defineStore } from 'pinia'
import { useUIStore } from './ui'
import data from '/src/assets/json/radial-centers.json'
import LatLon from 'geodesy/latlon-nvector-spherical.js'

export const useRadialCentersStore = defineStore('radial-centers', {
  state: () => ({
    radialCenters: []
  }),
  getters: {
    getRadialCenters: state => state.radialCenters,
    getSelectedRadialCenters () {
      const uiStore = useUIStore()
      const singleGreatCircle = uiStore.getSingleGreatCircle
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
