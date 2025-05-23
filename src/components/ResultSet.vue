<template>
  <div>
    <h5 class="pb-2">
      {{ results.simHitTotalList.length }} runs at {{ results.bandwidth }}km. {{ sameOrAbove }} sim
      results were {{ results.nazcaHits }} or higher.
    </h5>
    <div
      class="flex flex-col items-stretch gap-2 text-xs pb-10 order-3 lg:order-1 lg:grid lg:grid-cols-10 lg:text-center lg:h-52"
    >
      <div class="flex lg:items-center lg:flex-col">
        <h6 class="uppercase w-32 text-red-600 lg:w-auto lg:pb-2">Nazca</h6>
        <p class="text-red-600">{{ results.nazcaHits }}</p>
      </div>
      <div class="flex lg:items-center lg:flex-col">
        <h6 class="uppercase w-32 lg:w-auto lg:pb-2">Sim Results</h6>
        <textarea
          v-model="simHitTotalListText"
          class="grow max-w-full h-32 border rounded-sm border-gray-200"
          readonly
        />
      </div>
      <div class="flex lg:items-center lg:flex-col">
        <h6 class="uppercase w-32 lg:w-auto lg:pb-2">Sum Total</h6>
        <p>{{ results.sumTotalHits }}</p>
      </div>
      <div class="flex lg:items-center lg:flex-col">
        <h6 class="uppercase w-32 lg:w-auto lg:pb-2">Min / Max</h6>
        <p>{{ `${results.minHits} /  ${results.maxHits}` }}</p>
      </div>
      <div class="flex text-red-600 lg:items-center lg:flex-col">
        <h6 class="uppercase w-32 lg:w-auto lg:pb-2">Mean</h6>
        <p class="text-red-600">{{ formatToPlaces4Max(results.mean) }}</p>
      </div>
      <div class="flex lg:items-center lg:flex-col">
        <h6 class="uppercase w-32 lg:w-auto lg:pb-2">Sum Sq Diff</h6>
        <p>{{ formatToPlaces2Fixed(results.sumSqrDiff) }}</p>
      </div>
      <div class="flex lg:items-center lg:flex-col">
        <h6 class="uppercase w-32 lg:w-auto lg:pb-2">Variance</h6>
        <p>{{ formatToPlaces2Fixed(results.variance) }}</p>
      </div>
      <div class="flex lg:items-center lg:flex-col">
        <h6 class="uppercase w-32 lg:w-auto lg:pb-2">Std Dev</h6>
        <p>{{ formatToPlaces2Fixed(results.standardDeviation) }}</p>
      </div>
      <div class="flex lg:items-center lg:flex-col">
        <h6 class="uppercase w-32 text-red-600 font-bold lg:w-auto lg:pb-2">p-value</h6>
        <p class="text-red-600 font-bold">{{ formatToPlaces10Max(results.probability) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNumberFormatters } from '/src/composables'

const props = defineProps({
  results: {
    type: Object,
    required: true,
  },
})

const { formatToPlaces4Max, formatToPlaces2Fixed, formatToPlaces10Max } = useNumberFormatters()

const simHitTotalListText = computed(() =>
  props.results ? props.results.simHitTotalList.join(', ') : '',
)

const sameOrAbove = computed(() =>
  props.results
    ? props.results.simHitTotalList.filter((res) => res >= props.results.nazcaHits).length
    : '',
)
</script>
