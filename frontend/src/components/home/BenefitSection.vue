<script setup lang="ts">
import BaseDescription from '@/components/BaseDescription.vue'
import BaseStart from '@/components/BaseStart.vue'

import { assetUrl } from '@/utils/assetUrl'
</script>

<template>
  <section class="benefit" id="information">
    <BaseStart :titles="['Information AI', 'What is the benefit of AI?']" />

    <div class="benefit__container container">
      <ul class="benefit__list">
        <li class="benefit__item">
          <div class="benefit__item-image-circle">
            <img
              :src="assetUrl('/icons/icons8-automation-100.png')"
              alt="Automation"
              class="benefit__item-image"
            />
          </div>
          <h3 class="benefit__item-title">Automation</h3>
          <p class="benefit__item-description">
            AI performs routine and repetitive tasks without human intervention.
          </p>
        </li>
        <li class="benefit__item">
          <div class="benefit__item-image-circle">
            <img
              :src="assetUrl('/icons/icons8-speedometer-100.png')"
              alt="Fast analysis"
              class="benefit__item-image"
            />
          </div>
          <h3 class="benefit__item-title">Fast analysis</h3>
          <p class="benefit__item-description">
            Artificial intelligence can process huge amounts of information.
          </p>
        </li>
        <li class="benefit__item">
          <div class="benefit__item-image-circle">
            <img
              :src="assetUrl('/icons/icons8-aim-100.png')"
              alt="Precision"
              class="benefit__item-image"
            />
          </div>
          <h3 class="benefit__item-title">Precision</h3>
          <p class="benefit__item-description">
            Minimizes human errors in calculations and forecasts.
          </p>
        </li>
        <li class="benefit__item">
          <div class="benefit__item-image-circle">
            <img
              :src="assetUrl('/icons/icons8-puzzle-100.png')"
              alt="Flexibility"
              class="benefit__item-image"
            />
          </div>
          <h3 class="benefit__item-title">Flexibility</h3>
          <p class="benefit__item-description">
            Used in various fields: from medicine to business.
          </p>
        </li>
      </ul>
    </div>

    <BaseDescription src="/benefit-image-2.svg" alt="AI">
      Artificial intelligence plays a key role in predicting glacier melting,
      helping scientists analyze vast amounts of climate data and make more
      accurate forecasts. Through machine learning and satellite image analysis,
      AI can track changes in the size and movement of glaciers in real time,
      allowing researchers to detect even the slightest variations that might be
      difficult for the human eye to notice.<br />Additionally, AI algorithms
      assist in modeling future climate scenarios, taking into account factors
      such as rising temperatures, precipitation levels, and greenhouse gas
      concentrations.
    </BaseDescription>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

.benefit__container {
  padding: 80px 0;
}

.benefit__list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(308px, 1fr));
  gap: 24px;
  list-style: none;
}

.benefit__item {
  padding: 32px 24px;
  text-align: center;

  &-image-circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #8cbae6;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 27px;
  }

  &-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  &-title {
    font-size: 36px;
    color: vars.$primary-color;
    font-weight: 600;
    margin-bottom: 15px;
  }

  &-description {
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
  }

  @media (min-width: 640px) {
    text-align: left;

    &-image-circle {
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
