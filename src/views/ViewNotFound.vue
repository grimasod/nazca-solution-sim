<template>
  <div
    id="main-header"
    class="w-full pb-4 flex flex-col after:content-none after:border-b after:border-soft_navy after:w-24 after:mx-auto after:pt-4 lg:after:pt-8"
    data-testid="header"
  >
    <div class="w-full py-4">
      <LogoBlack class="mx-auto h-[38px] w-auto" />
    </div>
  </div>
  <div class="grow flex flex-col items-center mx-auto px-4 py-8" data-testid="404">
    <h1 class="font-bold my-12">404 {{ t('Page Not Found') }}</h1>
    <router-link :to="{ name: 'home' }" class="underline">
      Home
    </router-link>
  </div>
</template>
