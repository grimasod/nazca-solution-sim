<template>
  <div class="flex flex-col items-start">
    <div class="flex divide-x border rounded">
      <button
        class="rounded-l px-4 py-2"
        :class="{ 'border-blue-600 bg-blue-600 text-white': isSitesActive }"
        @click="setActiveTargets('site')"
      >
        Ancient Sites
      </button>
      <button
        class="px-4 py-2"
        :class="{ 'bg-blue-600 text-white': isCratersActive }"
        @click="setActiveTargets('crater')"
      >
        Impact Craters
      </button>
      <button
        class="px-4 py-2"
        :class="{ 'bg-blue-600 text-white': isVolcanoesActive }"
        @click="setActiveTargets('volcano')"
      >
        Volcanoes
      </button>
      <button
        class="rounded-r px-4 py-2"
        :class="{ 'bg-blue-600 text-white': isAllActive }"
        @click="setActiveTargets('all')"
      >
        All
      </button>
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
  computed: {
    ...mapGetters({
      selectionType: 'ui/getSelectionType',
      selectionIsCustom: 'ui/getSelectionIsCustom'
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
  methods: {
    setActiveTargets (type) {
      this.$store.dispatch('ui/setSelectionType', type)
    },
    setIsCustom (val) {
      this.$store.dispatch('ui/setSelectionIsCustom', val)
    }
  }
}
</script>
