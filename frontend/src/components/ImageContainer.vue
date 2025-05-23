<script setup lang="ts">
import { computed } from 'vue'

type SplitProps = {
  imageLeftUrl: string
  imageRightUrl: string
  imageFullUrl?: never
}

type FullProps = {
  imageFullUrl: string
  imageLeftUrl?: never
  imageRightUrl?: never
}

const props = defineProps<SplitProps | FullProps>()

const isSplit =
  props.imageLeftUrl !== undefined && props.imageRightUrl !== undefined

const bgImageLeft = computed(() => `url('/EarthSaverAI${props.imageLeftUrl}')`)
const bgImageRight = computed(
  () => `url('/EarthSaverAI${props.imageRightUrl}')`,
)
const bgImageFull = computed(() => `url('/EarthSaverAI${props.imageFullUrl}')`)
</script>

<template>
  <figure>
    <div class="split-container">
      <div
        v-if="isSplit"
        class="image-half image-left"
        :style="{ backgroundImage: bgImageLeft }"
      />
      <div
        v-if="isSplit"
        class="image-half image-right"
        :style="{ backgroundImage: bgImageRight }"
      />
      <div
        v-else
        class="image-half image-full"
        :style="{ backgroundImage: bgImageFull }"
      />
    </div>
    <figcaption>
      <slot />
    </figcaption>
  </figure>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

figure {
  display: flex;
  flex-direction: column;
  align-items: center;
}

figcaption {
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
  color: vars.$dark-color;
  padding: 7px 14px;
  font-weight: 600;
  border-radius: 0 0 10px 10px;
  width: 80%;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
}

.split-container {
  width: 100%;
  height: 425px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  border: 6px solid vars.$dark-color;
}

.image-half {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.image-full {
  background-image: v-bind(bgImageFull);
}

.image-left {
  background-image: v-bind(bgImageLeft);
  clip-path: polygon(0 0, 62% 0, 22% 100%, 0% 100%);
}

.image-right {
  background-image: v-bind(bgImageRight);
  clip-path: polygon(63% 0, 100% 0, 100% 100%, 23% 100%);
}
</style>
