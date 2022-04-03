<template>
  <div>
    <h2 class="mb-1 text-lg font-bold">
      Radials
    </h2>
    <div class="flex">
      <div class="w-1/2 pr-2">
        <table v-if="radialCenters.length" class="">
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Location
              </th>
              <th>
                <div class="flex justify-between items-center">
                  <span>
                    Great Circles
                  </span>
                  <button
                    class="border rounded px-3 py-1"
                    :class="!isSingleGC ? 'bg-green-600 text-white' : 'bg-white'"
                    @click="setAllRadials()"
                  >
                    All
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rc in radialCenters" :key="rc.name">
              <td>
                {{ rc.name }}
              </td>
              <td>
                <div class="flex">
                  <div class="w-1/2 pr-4">
                    {{ rc.location.latitude }}
                  </div>
                  <div class="w-1/2">
                    {{ rc.location.longitude }}
                  </div>
                </div>
              </td>
              <td>
                <div>
                  Count: {{ rc.greatCircles.length }}
                </div>
                <ul class="text-xs rounded bg-white p-2">
                  <li v-for="gc in rc.greatCircles" :key="gc.angle" class="flex py-1 align-center">
                    <div class="w-32 pr-2">
                      {{ gc.name }} ({{ gc.angle }})
                    </div>
                    <div class="w-6">
                      <div :style="{ transform: 'rotate(' + gc.angle + 'deg)', 'transform-origin': '4px 8px' }">
                        &uarr;
                      </div>
                    </div>
                    <div>
                      <button
                        class="border rounded w-7 h-5"
                        :class="isSingleGC && (singleGC.rcName === rc.name) && (singleGC.gcName === gc.name) ? 'bg-green-600' : 'bg-white'"
                        @click="setSingleGreatCircle(rc.name, gc.name)"
                      />
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-1/2 pl-2">
        <div class="rounded bg-blue-100">
          <div class="rounded-t bg-blue-600 text-white px-4 py-3">
            Radial Centers Random Generation
          </div>
          <div class="px-4 py-3 text-sm text-blue-800">
            Click on the buttons below to select whether you want the radial centers to be:
            <ul class="mt-4">
              <li>
                Genertated randomly for each run of the simultion, as used in our experiment.
              </li>
              <!-- <li>
                Genertated randomly once and use for all simulation runs
              </li> -->
              <li>
                Fixed, the same locations as the Nazca map Radial Centers.
                Note that this is not part of the experiment, which requires random locations as well as random angles for the radials.
                This option is only provided to satisify curiosity.
              </li>
            </ul>
          </div>
        </div>
        <button
          class="mt-6 rounded px-5 py-3 border border-blue-600"
          :class="{ 'bg-blue-600 text-white': isRandom, 'text-blue-600': !isRandom }"
          @click="setRadialsIsRandom('random')"
        >
          Random Radial Centers (used in official experiment)
        </button>
        <!-- <button @click="setRadialsIsRandom('once')" class="" :class="{ '': !isOnce }">One time random Radial Centers</button> -->
        <button
          class="mt-6 rounded px-5 py-3 border border-blue-600"
          :class="{ 'bg-blue-600 text-white': isFixed, 'text-blue-600': !isFixed }"
          @click="setRadialsIsRandom('fixed')"
        >
          Fixed Radial Centers (not used in official experiment)
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Radials',
  computed: {
    ...mapGetters({
      radialCenters: 'radialCenters/getRadialCenters',
      radialsIsRandom: 'ui/getRadialsIsRandom',
      singleGC: 'ui/getSingleGreatCircle'
    }),
    isRandom () {
      return this.radialsIsRandom === 'random'
    },
    // isOnce () {
    //   return this.radialsIsRandom === 'once'
    // },
    isFixed () {
      return this.radialsIsRandom === 'fixed'
    },
    isSingleGC () {
      return this.singleGC !== null
    }
  },
  methods: {
    setRadialsIsRandom (type) {
      this.$store.dispatch('ui/setRadialsIsRandom', type)
    },
    setAllRadials () {
      this.$store.dispatch('ui/setSingleGreatCircle', null)
    },
    setSingleGreatCircle (rcName, gcName) {
      this.$store.dispatch('ui/setSingleGreatCircle', { rcName, gcName })
    }
  }
}
</script>
