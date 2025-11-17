<script setup lang="ts">
import Button from '@/components/BaseButton.vue'
</script>

<template>
  <section class="hero">
    <div class="hero__container container">
      <img src="/hero-image-1.png" alt="Planet" class="hero__image" />
      <h1 class="hero__title">
        EarthSaver<span class="highlighted-text">AI</span>
      </h1>
      <p class="hero__description">Find out the forecast of melting glaciers</p>
      <Button :to="{ name: 'search' }">Get started</Button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

.hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 60px;
  min-height: calc(100svh - vars.$header-height-desktop);

  background-image: url('/hero-image-2.webp');
  background-repeat: no-repeat;
  background-position: center 50%;
  background-size: cover;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px);
    z-index: 0;
  }

  @media (max-width: 992px) {
    min-height: calc(100svh - vars.$header-height-mobile);
    background-position: center top;
    background-size: cover;
  }

  &__container {
    position: relative;
    z-index: 1;
  }
}

.hero__image {
  height: 250px;
  max-width: 100%;
}

.hero__title {
  font-size: clamp(2.5rem, 1.939rem + 2.439vw, 4rem);
  margin: 0.875rem 0;
}

.hero__description {
  font-size: clamp(1rem, 0.9533rem + 0.2033vw, 1.125rem);
  font-weight: 600;
  margin-bottom: 2rem;
}

.highlighted-text {
  color: vars.$primary-color;
}
</style>
