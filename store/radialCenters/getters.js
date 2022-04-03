const getters = {
  getRadialCenters: state => state.radialCenters,
  getSelectedRadialCenters: (state, getters, rootState, rootGetters) => {
    const singleGreatCircle = rootGetters['ui/getSingleGreatCircle']
    return singleGreatCircle
      ? getters.getRadialCenters.filter(radial => radial.name === singleGreatCircle.rcName).map(radial => ({
        ...radial,
        greatCircles: radial.greatCircles.filter(gc => gc.name === singleGreatCircle.gcName)
      }))
      : getters.getRadialCenters
  }
}

export default getters
