<template>
  <div class="flex flex-col items-start">
    <div class="w-full max-w-full">
      <!-- <button @click="getTargetList" class="button is-danger">Reload Data</button> -->
      <div v-if="locationStore.getSelectedLocations.length" class="max-w-full text-xs lg:text-sm">
        <table class="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(target, id) in locationStore.getSelectedLocations" :key="id">
              <td>
                {{ target.name }}
              </td>
              <td>
                <a
                  :href="
                    target.link
                      ? target.link
                      : `https://www.google.com/maps/search/?api=1&query=${target.location.latitude}%2C${target.location.longitude}`
                  "
                  target="_blank"
                  class="text-sky-900 underline"
                >
                  {{ target.location.latitude }}, {{ target.location.longitude }}
                </a>
              </td>
              <td>
                <span
                  v-for="(tag, tagId) in target.tags"
                  :key="tagId"
                  class="text-xs rounded bg-gray-100 p-1 mr-1"
                >
                  {{ tag }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLocationStore } from '/src/stores/locations'

const locationStore = useLocationStore()
</script>
