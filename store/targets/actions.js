const api = {
  all: '/api/targets/all',
  save: '/api/targets/save',
  delete: '/api/targets/delete'
}

const actions = {
  async fetchTargets ({ commit }) {
    commit('setTargets', [])
    const targetsResult = await this.$axios.$get(api.all)
    // console.log(targetsResult)
    commit('setTargets', targetsResult.targets.map(target => ({
      ...target,
      isUsedInSimCustom: target.isUsedInSim,
      isUsedInSimCustomAll: target.isUsedInSim
    })))
  },
  async selectCustomTargets ({ commit, getters, rootGetters }, { val, name }) {
    const isAll = await rootGetters['ui/getSelectionTypeIsAll']
    commit('setTargets', getters.getTargets.map(target => ({
      ...target,
      ...target.name !== name
        ? {}
        : isAll
          ? { isUsedInSimCustomAll: val }
          : { isUsedInSimCustom: val }
    })))
  },
  async selectManyCustomTargets ({ commit, getters, rootGetters }, { action }) {
    console.log('selectManyCustomTargets', action)
    const type = await rootGetters['ui/getSelectionType']
    const isAll = await rootGetters['ui/getSelectionTypeIsAll']
    const value = action === 'all' ? true : action === 'none' ? false : null
    console.log('selectManyCustomTargets', type, isAll, action)
    commit('setTargets', getters.getTargets.map(target => ({
      ...target,
      ...(!isAll && target.type !== type)
        ? {}
        : isAll
          ? { isUsedInSimCustomAll: value === null ? target.isUsedInSim : value }
          : { isUsedInSimCustom: value === null ? target.isUsedInSim : value }
    })))
  },
  async addTarget ({ commit, getters, rootGetters }, { target }) {
    const type = await rootGetters['ui/getSelectionType']
    commit('setTargets', [
      ...getters.getTargets,
      {
        name: target.name,
        location: {
          latitude: target.latitude,
          longitude: target.longitude
        },
        isUsedInSim: false,
        tags: ['User Added'],
        type,
        types: [],
        isUsedInSimCustom: true,
        isUsedInSimCustomAll: true
      }
    ])
  }
}

export default actions
