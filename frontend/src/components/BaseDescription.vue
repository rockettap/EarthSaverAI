<script setup lang="ts">
interface Props {
  src: string
  alt?: string
}

const { alt = 'Image' } = defineProps<Props>()
</script>

<template>
  <div class="section-description">
    <div class="section-description__container container">
      <img :src="src" :alt="alt" class="section-description__image" />
      <p class="section-description__description">
        <slot />
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

.section-description {
  background-color: #fff;
  color: #000;
  padding: 40px 0;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;

  &__container {
    display: flex;
  }

  &__image {
    height: 176px;
    align-self: center;
    margin-right: 40px;
  }
}
</style>
