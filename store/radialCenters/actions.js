const api = {
  all: '/api/radial-centers/all',
  save: '/api/radial-centers/save',
  delete: '/api/radial-centers/delete'
}

const actions = {
  async fetchRadialCenters ({ commit, getters }) {
    commit('setRadialCenters', [])
    const radialCentersResult = await this.$axios.$get(api.all)
    // console.log(storesResult)
    commit('setRadialCenters', radialCentersResult.radialCenters)
  }
  // ,
  // async updateSettings ({ commit, getters }, { ecmsIncrementalId }) {
  //   const settingsResult = await this.$axios.$post(api.settingsSave, { ...getters.getSettings, ecmsIncrementalId })
  //   commit('setStores', settingsResult.settings)
  // },
  // async incrementEcmsId ({ dispatch, getters }, { ecmsIncrementalId }) {
  //   await dispatch('updateSettings', { ecmsIncrementalId: getters.getEcmsIncrementalId + 1 })
  // }
}

export default actions
