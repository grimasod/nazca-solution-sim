<template>
  <div class="grow flex flex-col items-center mx-auto px-4 py-8" data-testid="404">
    <h1 class="font-bold my-12">404 Page Not Found</h1>
    <router-link :to="{ name: 'home' }" class="underline">
      Home
    </router-link>
  </div>
</template>
