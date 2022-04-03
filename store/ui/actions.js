const actions = {
  setSelectionType ({ commit }, selectionType) {
    commit('setSelectionType', selectionType)
  },
  setSelectionIsCustom ({ commit }, isCustom) {
    commit('setSelectionIsCustom', isCustom)
  },
  setRadialsIsRandom ({ commit }, isRandom) {
    commit('setRadialsIsRandom', isRandom)
  },
  setSingleGreatCircle ({ commit }, gc) {
    commit('setSingleGreatCircle', gc)
  }
}

export default actions
