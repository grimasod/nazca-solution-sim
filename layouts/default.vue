<template>
  <div>
    <div class="flex justify-between items-center bg-gray-100 px-6 p-4">
      <div class="">
        <a href="http://nazcasolution.com" class="underline">&lt;- Back to nazcasolution.com</a>
      </div>
      <!-- <div class="">
        <button class="px-4 py-2 bg-bray-300 border border-white" @click="doLogin">
          Admin
        </button>
      </div> -->
    </div>
    <div class="container p-6">
      <div id="menu" class="flex">
        <NuxtLink to="/" class="px-5 py-2 hover:bg-gray-100 rounded-t-lg">
          Simulation
        </NuxtLink>
        <NuxtLink :to="locationsRoute" class="px-5 py-2 hover:bg-gray-100 ml-1 rounded-t-lg">
          Ancient Sites / Impact Craters / Volcanoes
        </NuxtLink>
        <NuxtLink to="/radials" class="px-5 py-2 hover:bg-gray-100 ml-1 rounded-t-lg">
          Radial Centers
        </NuxtLink>
      </div>
      <div id="submenu" class="bg-gray-100 flex px-3 w-full h-12 items-center">
        <NuxtLink to="/" class="text-blue-500 hover:bg-blue-100 px-2 py-1 text-sm">
          &lt;- Back to Simulation
        </NuxtLink>
      </div>
      <Nuxt class="py-6" />
    </div>
    <!-- <div class="" :class="isLoginOpen ? '' : ''">
      <div class="" />
      <div class="">
        <div class="pb-2">
          <button class="" @click="cancelLogin">
            X
          </button>
        </div>
        <section class="">
          <div id="" />
        </section>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isLoginOpen: false,
      auth: {}
    }
  },
  computed: {
    ...mapGetters({
      locationsRoute: 'ui/getLocationsRoute',
      typesFromRoutes: 'ui/getTypesFromRoutes'
    })
  },
  created () {
    this.getRadialList()
    this.getTargetList()
  },
  methods: {
    getRadialList () {
      this.$store.dispatch('radialCenters/fetchRadialCenters')
    },
    getTargetList (targetType) {
      this.$store.dispatch('targets/fetchTargets')
    }
    // ,
    // async doLogin () {
    //   // this.isLoginOpen = true
    //   // await this.$fire.authReady()
    //   // const provider = new this.$fireModule.auth.GoogleAuthProvider()
    //   // this.$fireModule.auth().signInWithRedirect(provider)
    //   // this.$fireModule.auth
    //   // this.$fire.auth
    // },
    // cancelLogin () {
    //   this.isLoginOpen = false
    // }
  }
}
</script>
