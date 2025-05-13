<template>
  <div class="flex flex-col gap-6 pb-6 rounded border border-sky-600">
    <h4 class="px-4 py-2 bg-sky-600 text-white text-center rounded-t w-full text-lg font-bold">
      <slot name="title" />
    </h4>
    <div class="flex flex-col px-4 gap-6">
      <div class="p-4 rounded bg-sky-50 text-sky-800">
        <slot name="notes" />
      </div>
      <slot />
    </div>
  </div>
</template>
