<script setup lang="ts">
import { computed, ref } from 'vue'

import { useStore } from '@/stores'

import { ImgComparisonSlider } from '@img-comparison-slider/vue'

const store = useStore()

const sliderValue = ref<number>(0)
// The web component shows a blue focus ring; skip it for pointer interaction
// but keep it when the slider is reached with the keyboard.
const pointerFocused = ref(false)

const maxSliderIndex = computed(() => {
  const lengths = store.fetchedYears
    .map((year) => year.length)
    .filter((length) => length > 0)
  if (!lengths.length) return 0
  return Math.min(...lengths) - 1
})
</script>

<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->

  <div style="display: flex; flex-direction: column; width: 100%">
    <div style="display: flex; justify-content: space-around">
      <h3
        style="
          font-size: 24px;
          padding: 12px clamp(20px, 5vw, 70px);
          border: 3px solid #011332;
          border-bottom: 0;
          font-weight: 600;
          margin: 0 10px 0 20px;
          text-align: center;
        "
        v-if="store.fetchedYears[0]?.[0]"
      >
        {{ store.fetchedYears[0][0].year.toString() }} year
      </h3>
      <h3
        style="
          font-size: 24px;
          padding: 12px clamp(20px, 5vw, 70px);
          border: 3px solid #011332;
          border-bottom: 0;
          font-weight: 600;
          margin: 0 20px 0 10px;
          text-align: center;
        "
        v-if="store.fetchedYears[1]?.[0]"
      >
        {{ store.fetchedYears[1][0].year.toString() }} year
      </h3>
    </div>
    <ImgComparisonSlider
      style="
        width: 100%;
        border: 3px solid #011332;
        height: 500px;
        --divider-color: #011332;
        --default-handle-color: #011332;
        --divider-width: 3px;
      "
      :class="{ 'comparison-slider--pointer': pointerFocused }"
      @pointerdown="pointerFocused = true"
      @keydown="pointerFocused = false"
      @blur="pointerFocused = false"
      v-if="store.fetchedYears[0]?.[0] && store.fetchedYears[1]?.[0]"
    >
      <img
        slot="first"
        style="width: 100%; height: 500px; object-fit: cover; display: block"
        :src="store.fetchedYears[0]?.[sliderValue]?.image"
      />
      <img
        slot="second"
        style="width: 100%; height: 500px; object-fit: cover; display: block"
        :src="store.fetchedYears[1]?.[sliderValue]?.image"
      />
    </ImgComparisonSlider>
    <img
      style="
        width: 100%;
        height: 500px;
        object-fit: cover;
        display: flex;
        border: 3px solid #011332;
      "
      :src="store.fetchedYears[0]?.[sliderValue]?.image"
      v-else-if="store.fetchedYears[0]?.[0]"
    />
    <v-slider
      v-model="sliderValue"
      :max="maxSliderIndex"
      show-ticks="always"
      step="1"
      tick-size="4"
      style="margin-top: 32px"
    ></v-slider>
  </div>
</template>

<style lang="scss" scoped>
:deep(.comparison-slider--pointer:focus) {
  outline: none;
}
</style>
