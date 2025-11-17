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
      <img :src="`${src}`" :alt="alt" class="section-description__image" />
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
  padding: 2.5rem 0;
  font-size: clamp(1rem, 0.8598rem + 0.6098vw, 1.375rem);
  font-weight: 600;
  line-height: 1.4;
  text-align: justify;

  &__container {
    display: flex;
  }

  &__image {
    height: 11rem;
    align-self: center;
    margin-right: 2.5rem;

    @media (max-width: 992px) {
      display: none;
    }
  }
}
</style>
