<template>
  <div class="flex flex-col items-start">
    <div class="flex divide-x border rounded">
      <NuxtLink
        :to="routesFromTypes['site']"
        class="rounded-l px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': isSitesActive }"
      >
        Ancient Sites
      </NuxtLink>
      <NuxtLink
        :to="routesFromTypes['crater']"
        class="px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': isCratersActive }"
      >
        Impact Craters
      </NuxtLink>
      <NuxtLink
        :to="routesFromTypes['volcano']"
        class="px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': isVolcanoesActive }"
      >
        Volcanoes
      </NuxtLink>
      <NuxtLink
        :to="routesFromTypes['all']"
        class="rounded-r px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': isAllActive }"
      >
        All
      </NuxtLink>
    </div>
    <div class="my-6 flex divide-x border rounded">
      <button
        class="rounded-l px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': !selectionIsCustom }"
        @click="setIsCustom(false)"
      >
        Standard set
      </button>
      <button
        class="rounded-r px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': selectionIsCustom }"
        @click="setIsCustom(true)"
      >
        Custom selection
      </button>
      <!-- <div class="">
        <button class="" @click="$emit('targets-custom-select-all')">Select All</button>
        <button class="" @click="$emit('targets-custom-select-none')">Select None</button>
        <button class="" @click="$emit('targets-custom-select-standard')">Reset to Standard</button>
      </div> -->
    </div>
    <target-list />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TargetList from '~/components/TargetList.vue'

export default {
  name: 'Targets',
  components: {
    TargetList
  },
  async fetch () {
    await this.setActiveTargets(this.typesFromRoutes[this.$route.params.targets || 'ancient-sites'] || 'site')
  },
  computed: {
    ...mapGetters({
      selectionType: 'ui/getSelectionType',
      selectionIsCustom: 'ui/getSelectionIsCustom',
      routesFromTypes: 'ui/getRoutesFromTypes',
      typesFromRoutes: 'ui/getTypesFromRoutes'
    }),
    isSitesActive () {
      return this.selectionType === 'site'
    },
    isCratersActive () {
      return this.selectionType === 'crater'
    },
    isVolcanoesActive () {
      return this.selectionType === 'volcano'
    },
    isAllActive () {
      return this.selectionType === 'all'
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    async setActiveTargets (type) {
      console.log('setActiveTargets', type)
      await this.$store.dispatch('ui/setSelectionType', type)
    },
    async setIsCustom (val) {
      await this.$store.dispatch('ui/setSelectionIsCustom', val)
    }
  }
}
</script>
