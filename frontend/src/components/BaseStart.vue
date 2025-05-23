<script setup lang="ts">
defineProps<{
  titles: [string, string?]
  description?: string
}>()
</script>

<template>
  <div class="section-start-simple">
    <div class="section-start-simple__container container">
      <h3 class="section-start-simple__title">{{ titles[0] }}</h3>
    </div>
  </div>

  <div class="section-start-detailed" v-if="titles[1]">
    <div class="section-start-detailed__container container">
      <h2 class="section-start-detailed__title">{{ titles[1] }}</h2>
      <p class="section-start-detailed__description" v-if="description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

.section-start-simple {
  padding: 14px 0;
  background-color: vars.$section-background-light-color;

  &__title {
    padding-left: 40px;
    position: relative;
    font-size: 40px;
    font-weight: 500;
    color: vars.$dark-color;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 26px;
      height: 26px;
      transform: translateY(-50%);
      background: vars.$dark-gradient;
      border-radius: 50%;
    }
  }
}

.section-start-detailed {
  display: flex;
  justify-content: center;
  padding: 50px 0;
  background-color: #fff;

  &__title {
    display: inline-block;
    padding: 21px 96px;
    font-size: clamp(30px, 5vw, 44px);
    font-weight: 600;
    text-align: center;
    background: vars.$secondary-gradient;
    border-radius: 20px;
  }

  &__description {
    color: vars.$dark-color;
    margin-top: 32px;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
