const getters = {
  getTargets: state => state.targets,
  getTargetLists: (state, getters) => ({
    site: getters.getTargets.filter(target => target.type === 'site'),
    crater: getters.getTargets.filter(target => target.type === 'impact-crater'),
    volcano: getters.getTargets.filter(target => target.type === 'volcano')
  }),
  getCurrentTargetList: (state, getters, rootState, rootGetters) => {
    const type = rootGetters['ui/getSelectionType']
    const isAll = rootGetters['ui/getSelectionTypeIsAll']
    return isAll ? getters.getTargets : getters.getTargetLists[type]
  },
  getActiveTargetList: (state, getters, rootState, rootGetters) => {
    const isAll = rootGetters['ui/getSelectionTypeIsAll']
    const selectionIsCustom = rootGetters['ui/getSelectionIsCustom']
    return getters.getCurrentTargetList.filter(target =>
      (selectionIsCustom && (
        (isAll && target.isUsedInSimCustomAll) ||
        (!isAll && target.isUsedInSimCustom))
      ) ||
      (!selectionIsCustom && target.isUsedInSim))
  }
}

export default getters
