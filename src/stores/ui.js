import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    view: '',
  }),
  actions: {
    setView(newView) {
      this.view = newView
    },
  },
})
