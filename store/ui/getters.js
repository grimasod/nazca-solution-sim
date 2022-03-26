const getters = {
  getSelectionType: state => state.selectionType,
  getSelectionTypeIsAll: (state, getters) => getters.getSelectionType === 'all',
  getSelectionIsCustom: state => state.selectionIsCustom,
  getRadialsIsRandom: state => state.radialsIsRandom
}

export default getters
