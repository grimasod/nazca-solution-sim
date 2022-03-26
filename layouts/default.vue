<template>
  <div>
    <div class="flex justify-between items-center bg-gray-100 px-6 p-4">
      <div class="">
        <a href="http://nazcasolution.com" class="underline">&lt;- Back to nazcasolution.com</a>
      </div>
      <div class="">
        <button class="px-4 py-2 bg-bray-300 border border-white" @click="doLogin">
          Admin
        </button>
      </div>
    </div>
    <div class="container p-6">
      <div id="menu" class="flex">
        <NuxtLink to="/" class="px-5 py-2 hover:bg-gray-100 rounded-t-lg">
          Simulation
        </NuxtLink>
        <NuxtLink to="/targets" class="px-5 py-2 hover:bg-gray-100 ml-1 rounded-t-lg">
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

export default {
  data () {
    return {
      isLoginOpen: false,
      auth: {}
    }
  },
  // async mounted () {
  //   await this.$fire.authReady()
  //   this.$fireModule.auth()
  //     .getRedirectResult()
  //     .then((result) => {
  //       if (result.credential) {
  //         /** @type {firebase.auth.OAuthCredential} */
  //         this.auth.credential = result.credential
  //         // This gives you a Google Access Token. You can use it to access the Google API.
  //         this.auth.token = this.auth.credential.accessToken
  //         // ...
  //       }
  //       // The signed-in user info.
  //       this.auth.user = result.user
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       console.log('Login error:', error.code, error.message)
  //       // var errorCode = error.code;
  //       // var errorMessage = error.message;
  //       // The email of the user's account used.
  //       // var email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       this.auth.credential = error.credential
  //       // ...
  //     })
  // },,
  created () {
    this.getRadialList()
    this.getTargetList()
  },
  methods: {
    getRadialList () {
      console.log('loading radials...')
      this.$store.dispatch('radialCenters/fetchRadialCenters')
    },
    getTargetList (targetType) {
      console.log('loading targets...')
      this.$store.dispatch('targets/fetchTargets')
    },
    async doLogin () {
      // this.isLoginOpen = true
      // await this.$fire.authReady()
      // const provider = new this.$fireModule.auth.GoogleAuthProvider()
      // this.$fireModule.auth().signInWithRedirect(provider)
      // this.$fireModule.auth
      // this.$fire.auth
    },
    cancelLogin () {
      this.isLoginOpen = false
    }
  }
}
</script>
