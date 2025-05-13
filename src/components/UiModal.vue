<template>
  <div>
    <div class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-40" />
    <div class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
      <div class="flex p-10 bg-white rounded flex-col items-center">
        <slot />
      </div>
    </div>
  </div>
</template>
