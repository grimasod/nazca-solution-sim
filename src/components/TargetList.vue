<template>
  <div class="w-full">
    <!-- <button @click="getTargetList" class="button is-danger">Reload Data</button> -->
    <div v-if="getCurrentTargetList.length">
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
            <th v-if="getSelectionIsCustom">
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
          <tr v-for="(target, id) in getCurrentTargetList" :key="id">
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
            <td v-if="getSelectionIsCustom">
              <div class="text-xs inline-flex border rounded divide-x">
                <button
                  class="rounded-l px-3 py-1"
                  :class="(getTypeIsAll && target.isUsedInSimCustomAll) || (!getTypeIsAll && target.isUsedInSimCustom) ? 'bg-green-600 text-white' : 'bg-white'"
                  @click="targetsCustomSelect(true, target.name)"
                >
                  Yes
                </button>
                <button
                  class="rounded-r px-3 py-1"
                  :class="(getTypeIsAll && !target.isUsedInSimCustomAll) || (!getTypeIsAll && !target.isUsedInSimCustom) ? 'bg-red-600 text-white' : 'bg-white'"
                  @click="targetsCustomSelect(false, target.name)"
                >
                  No
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-if="getSelectionIsCustom && !getTypeIsAll">
            <td>
              <label for="newTargetName" class="flex flex-col">
                Name
                <input
                  v-model.trim="newTarget.name"
                  name="newTargetName"
                  type="text"
                  class="border rounded-l px-2 py-1"
                >
              </label>
            </td>
            <td>
              <label for="newTargetLat" class="flex flex-col pb-2">
                Latitude
                <input
                  v-model.number="newTarget.latitude"
                  name="newTargetLat"
                  type="number"
                  class="border rounded-l px-2 py-1"
                >
              </label>
              <label for="newTargetLon" class="flex flex-col">
                Longitude
                <input
                  v-model.number="newTarget.longitude"
                  name="newTargetLon"
                  type="number"
                  class="border rounded-l px-2 py-1"
                >
              </label>
            </td>
            <td colspan="2">
              <ul class="is-size-7 has-text-danger">
                <li v-for="error in errors" :key="error">
                  {{ error }}
                </li>
              </ul>
            </td>
            <td>
              <button
                class="border px-2 py-1 rounded border-green-600 text-green-600 focus:bg-green-600 focus:text-white"
                @click="addNewTarget"
              >
                Add new location
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUIStore } from '/src/stores/ui'
import { useTargetsStore } from '/src/stores/targets'

const newTarget = ref({
  name: '',
  latitude: null,
  longitude: null
})
const errors = ref([])

const uiStore = useUIStore()
const { getSelectionIsCustom, getTypeIsAll } = storeToRefs(uiStore)

const targetsStore = useTargetsStore()
const { getCurrentTargetList } = storeToRefs(targetsStore)

const targetsCustomSelect = (val, name) => {
  targetsStore.selectCustomTargets({ val, name })
}

const targetsCustomSelectMany = (action) => {
  targetsStore.selectManyCustomTargets({ action })
}

const addNewTarget = () => {
  errors.value = []
  if (!newTarget.value.name) {
    errors.value.push('Name is required')
  }
  if (newTarget.value.latitude === '' || newTarget.value.latitude === null) {
    errors.value.push('Latitude is required')
  } else if (Number(newTarget.value.latitude) < -90 || Number(newTarget.value.latitude) > 90) {
    errors.value.push('Latitude must be between -90 and 90')
  }
  if (newTarget.value.longitude === '' || newTarget.value.longitude === null) {
    errors.value.push('Longitude is required')
  } else if (Number(newTarget.value.longitude) < -180 || Number(newTarget.value.longitude) > 180) {
    errors.value.push('Longitude must be between -180 and 180')
  }
  if (errors.value.length === 0) {
    const target = { ...newTarget.value }
    targetsStore.addTarget({ target })
    newTarget.value.name = ''
    newTarget.value.latitude = null
    newTarget.value.longitude = null
  }
}
</script>
