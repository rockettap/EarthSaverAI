<script setup lang="ts">
import { computed, ref } from 'vue'

import { useStore } from '@/stores'

import { ImgComparisonSlider } from '@img-comparison-slider/vue'

const store = useStore()

const sliderValue = ref<number>(0)

const maxSliderIndex = computed(() => {
  const years = store.fetchedYears
  if (!years || years.length < 1) return 0
  const lengths = years.map((year) => year.length)
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
        v-if="store.fetchedYears[0]"
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
        v-if="store.fetchedYears[1]"
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
      "
      v-if="store.fetchedYears[0] && store.fetchedYears[1]"
    >
      <img
        slot="first"
        style="width: 100%; height: 500px; object-fit: cover; display: block"
        :src="store.fetchedYears[0][sliderValue].image"
      />
      <img
        slot="second"
        style="width: 100%; height: 500px; object-fit: cover; display: block"
        :src="store.fetchedYears[1][sliderValue].image"
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
      :src="store.fetchedYears[0][sliderValue].image"
      v-else
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

<style lang="scss" scoped></style>
