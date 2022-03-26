const getters = {
  getSelectionType: state => state.selectionType,
  getSelectionTypeIsAll: (state, getters) => getters.getSelectionType === 'all',
  getSelectionIsCustom: state => state.selectionIsCustom,
  getRadialsIsRandom: state => state.radialsIsRandom,
  getRouteTypeMap: state => state.routeTypeMap,
  getRoutesFromTypes: (state, getters) => getters.getRouteTypeMap.reduce((prev, curr) => ({ ...prev, [curr.type]: curr.route }), {}),
  getTypesFromRoutes: (state, getters) => getters.getRouteTypeMap.reduce((prev, curr) => ({ ...prev, [curr.route]: curr.type }), {}),
  getLocationsRoute: (state, getters) => getters.getRoutesFromTypes[getters.getSelectionType]
}

export default getters
