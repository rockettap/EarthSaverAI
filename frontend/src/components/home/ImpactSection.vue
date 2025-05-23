<script setup lang="ts">
import BaseDescription from '@/components/BaseDescription.vue'
import BaseStart from '@/components/BaseStart.vue'
import ImageContainer from '@/components/ImageContainer.vue'
</script>

<template>
  <section class="impact">
    <BaseStart
      :titles="[
        'Information about climate issues',
        'Impact of melting glaciers',
      ]"
    />

    <div class="impact__container container">
      <article class="impact__article">
        <h2 class="impact__article-title">Measurement of animals</h2>
        <div class="impact__row">
          <ImageContainer
            image-left-url="/impact-image-2.webp"
            image-right-url="/impact-image-1.webp"
            class="impact__col impact__col--image"
          >
            Polar bears and penguins
          </ImageContainer>
          <p class="impact__col impact__col--text">
            Global warming and glacier melting are causing the extinction of
            many animal species.
            <span class="highlighted-text">Polar bears</span> are losing ice,
            making hunting difficult.
            <span class="highlighted-text">Walruses</span> suffer from the
            disappearance of ice platforms.
            <span class="highlighted-text">Penguins</span> (especially emperor
            penguins) are losing breeding grounds.
            <span class="highlighted-text">Seals and fish</span> are forced to
            migrate, disrupting food chains. Changes in the ocean and climate
            also affect lesser-known species like
            <span class="highlighted-text">krill</span>, which is a key part of
            many marine animals' diets. Without action to reduce greenhouse gas
            emissions, these species could disappear.
          </p>
        </div>
      </article>

      <article class="impact__article">
        <h2 class="impact__article-title">Rising sea levels</h2>
        <div class="impact__row">
          <ImageContainer
            image-full-url="/impact-image-3.webp"
            class="impact__col impact__col--image"
          >
            Glacier breakup
          </ImageContainer>
          <p class="impact__col impact__col--text">
            One of the biggest environmental threats caused by
            <span class="highlighted-text">glacier melting</span> and
            <span class="highlighted-text">global warming</span>. It leads to
            <span class="highlighted-text">flooding of cities</span>,
            <span class="highlighted-text">coastal erosion</span>, and
            <span class="highlighted-text">saltwater contamination</span> of
            freshwater, endangering water supply.
            <span class="highlighted-text">Hurricanes</span> and
            <span class="highlighted-text">storms</span> also become stronger,
            destroying infrastructure. Without action, millions of people may
            lose their homes.
          </p>
        </div>
      </article>

      <article class="impact__article">
        <h2 class="impact__article-title">Impact on people and the economy</h2>
        <div class="impact__row">
          <ImageContainer
            image-full-url="/impact-image-4.webp"
            class="impact__col impact__col--image"
          >
            City flooding
          </ImageContainer>
          <p class="impact__col impact__col--text">
            <span class="highlighted-text">Global warming</span> and
            <span class="highlighted-text">glacier melting</span> lead to
            <span class="highlighted-text">city flooding</span>, forcing
            millions of people to become
            <span class="highlighted-text">climate refugees</span>.
            <span class="highlighted-text">Agriculture</span> suffers from
            <span class="highlighted-text">droughts</span>,
            <span class="highlighted-text">temperature changes</span>, and
            <span class="highlighted-text">water shortages</span>, reducing crop
            yields and increasing food prices.
            <span class="highlighted-text">Fishing</span> declines due to the
            destruction of marine ecosystems, and
            <span class="highlighted-text">tourism</span> suffers as natural
            areas are lost. The rise in natural disasters causes massive
            economic damage, making infrastructure recovery difficult and
            increasing government expenses.
          </p>
        </div>
      </article>
    </div>

    <BaseDescription src="/dark-hero-image.webp" alt="Planet">
      Global warming is caused by increasing greenhouse gas emissions, leading
      to a rise in global temperatures. One of the main consequences is glacier
      melting, which results in sea level rise. This causes coastal flooding,
      shoreline erosion, and the mixing of fresh and saltwater, threatening
      drinking water supplies. Additionally, climate change has led to more
      frequent extreme weather events — droughts, hurricanes, storms, and
      wildfires. These disasters destroy infrastructure, cause economic damage,
      and force millions of people to become climate refugees.
    </BaseDescription>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

.impact {
  &__row {
    display: grid;
    grid-template-columns: 17fr 13fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 896px) {
      grid-template-columns: 1fr;
    }
  }

  &__col {
    width: 100%;

    &--text {
      align-self: flex-start;
      font-size: 1.5rem;
      line-height: 1.875rem;
      font-weight: 600;
      margin-top: 0.375rem;

      @media (max-width: 896px) {
        text-align: center;
      }
    }
  }
}

.impact__container {
  padding-bottom: 58px;
}

.impact__article-title {
  margin: 58px auto;
  padding-left: 40px;
  width: fit-content;
  position: relative;
  font-size: 40px;
  font-weight: 600;
  text-decoration: underline;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 26px;
    height: 26px;
    transform: translateY(-50%);
    background-color: vars.$primary-color;
    border-radius: 50%;
  }
}
</style>
