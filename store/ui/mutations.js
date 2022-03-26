const mutations = {
  setSelectionType (state, selectionType) {
    state.selectionType = selectionType
  },
  setSelectionIsCustom (state, selectionIsCustom) {
    state.selectionIsCustom = selectionIsCustom
  },
  setRadialsIsRandom (state, isRandom) {
    state.radialsIsRandom = isRandom
  }
}

export default mutations
