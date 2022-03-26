<template>
  <div class="w-full">
    <!-- <button @click="getTargetList" class="button is-danger">Reload Data</button> -->
    <div v-if="targets.length">
      <table class="">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Location
            </th>
            <th>
              Tags
            </th>
            <th>
              Standard Set
            </th>
            <th v-if="isCustom">
              <div>Custom Selection</div>
              <div class="flex flex-wrap items-center text-sm">
                <button
                  class="border px-2 py-1 mr-1 mt-1 rounded border-green-600 text-green-600 focus:bg-green-600 focus:text-white"
                  @click="targetsCustomSelectMany('all')"
                >
                  All
                </button>
                <button
                  class="border px-2 py-1 mr-1 mt-1 rounded border-red-600 text-red-600 focus:bg-red-600 focus:text-white"
                  @click="targetsCustomSelectMany('none')"
                >
                  None
                </button>
                <button
                  class="border px-2 py-1 mt-1 rounded border-blue-600 text-blue-600 focus:bg-blue-600 focus:text-white"
                  @click="targetsCustomSelectMany('reset')"
                >
                  Standard set
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(target, id) in targets" :key="id">
            <td>
              {{ target.name }}
            </td>
            <td>
              <a
                :href="target.link ? target.link : `https://www.google.com/maps/search/?api=1&query=${target.location.latitude}%2C${target.location.longitude}`"
                target="_blank"
                class="text-blue-900 underline"
              >
                {{ target.location.latitude }}, {{ target.location.longitude }}
              </a>
            </td>
            <td>
              <span v-for="(tag, tagId) in target.tags" :key="tagId" class="text-xs rounded bg-gray-100 p-1 mr-1">
                {{ tag }}
              </span>
            </td>
            <td>
              {{ target.isUsedInSim ? 'Yes' : 'No' }}
            </td>
            <td v-if="isCustom">
              <div class="text-xs inline-flex border rounded divide-x">
                <button
                  class="rounded-l px-3 py-1"
                  :class="(isAll && target.isUsedInSimCustomAll) || (!isAll && target.isUsedInSimCustom) ? 'bg-green-600 text-white' : 'bg-white'"
                  @click="targetsCustomSelect(true, target.name)"
                >
                  Yes
                </button>
                <button
                  class="rounded-r px-3 py-1"
                  :class="(isAll && !target.isUsedInSimCustomAll) || (!isAll && !target.isUsedInSimCustom) ? 'bg-red-600 text-white' : 'bg-white'"
                  @click="targetsCustomSelect(false, target.name)"
                >
                  No
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-if="isCustom && !isAll">
            <td>
              <label for="newTargetName">Name</label>
              <input
                v-model.trim="newTarget.name"
                name="newTargetName"
                type="text"
                class=""
              >
            </td>
            <td>
              <div class="">
                <div class="">
                  <label for="newTargetLat">Latitude</label>
                  <input
                    v-model.number="newTarget.latitude"
                    name="newTargetLat"
                    type="number"
                    class=""
                  >
                </div>
                <div class="">
                  <label for="newTargetLon">Longitude</label>
                  <input
                    v-model.number="newTarget.longitude"
                    name="newTargetLon"
                    type="number"
                    class=""
                  >
                </div>
              </div>
            </td>
            <td colspan="2">
              <ul class="is-size-7 has-text-danger">
                <li v-for="error in errors" :key="error">
                  {{ error }}
                </li>
              </ul>
            </td>
            <td>
              <div class="">
                <button
                  class=""
                  @click="addNewTarget"
                >
                  Add new location
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TargetList',
  data () {
    return {
      newTarget: {
        name: '',
        latitude: null,
        longitude: null
      },
      errors: []
    }
  },
  computed: {
    ...mapGetters({
      targets: 'targets/getCurrentTargetList',
      isCustom: 'ui/getSelectionIsCustom',
      isAll: 'ui/getSelectionTypeIsAll'
    })
  },
  methods: {
    targetsCustomSelect (val, name) {
      this.$store.dispatch('targets/selectCustomTargets', { val, name })
    },
    targetsCustomSelectMany (action) {
      this.$store.dispatch('targets/selectManyCustomTargets', { action })
    },
    addNewTarget () {
      this.errors = []
      if (!this.newTarget.name) {
        this.errors.push('Name is required')
      }
      if (this.newTarget.latitude === '' || this.newTarget.latitude === null) {
        this.errors.push('Latitude is required')
      } else if (Number(this.newTarget.latitude) < -90 || Number(this.newTarget.latitude) > 90) {
        this.errors.push('Latitude must be between -90 and 90')
      }
      if (this.newTarget.longitude === '' || this.newTarget.longitude === null) {
        this.errors.push('Longitude is required')
      } else if (Number(this.newTarget.longitude) < -180 || Number(this.newTarget.longitude) > 180) {
        this.errors.push('Longitude must be between -180 and 180')
      }
      if (this.errors.length === 0) {
        const target = { ...this.newTarget }
        this.$store.dispatch('targets/addTarget', { target })
        this.newTarget.name = ''
        this.newTarget.latitude = null
        this.newTarget.longitude = null
      }
    }
  }
}
</script>
