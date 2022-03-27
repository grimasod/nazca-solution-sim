const getters = {
  getRadialCenters: state => state.radialCenters,
  getSelectedRadialCenters: (state, getters, rootState, rootGetters) => {
    const singleRadial = rootGetters['ui/getSingleRadial']
    return singleRadial
      ? getters.getRadialCenters.filter(radial => radial.name === singleRadial.name).map(radial => ({
        ...radial,
        angles: radial.angles.filter(angle => angle === singleRadial.angle)
      }))
      : getters.getRadialCenters
  }
}

export default getters
