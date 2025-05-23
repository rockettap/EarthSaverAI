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
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 60px;
  min-height: calc(100svh - vars.$header-height-desktop);

  background-image: url('/hero-image-2.webp');
  background-repeat: no-repeat;
  background-position: 60% 25%;
  background-size: 200% auto;

  @media (max-width: 768px) {
    min-height: calc(100svh - vars.$header-height-mobile);
    background-position: 60% 30%;
    background-size: 250% auto;
  }
}

.hero__image {
  height: 250px;
}

.hero__title {
  font-size: clamp(3rem, 2.6479rem + 1.5023vw, 4rem);
  margin: 0.875rem 0;
}

.hero__description {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 32px;
}
</style>
