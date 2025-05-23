<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useStore } from '@/stores'
import { Hemisphere } from '@/types'

import Button from '@/components/BaseButton.vue'

const store = useStore()
const router = useRouter()

const selectedHemisphere = ref<Hemisphere | null>(null)
const selectedYear = ref<string | null>(null)

const hemisphereItems = [
  { title: 'Northern', value: Hemisphere.Northern },
  { title: 'Southern', value: Hemisphere.Southern },
]

const years: string[] = []
for (let year = 1978; year <= 2100; ++year) {
  years.push(year.toString())
}

function search() {
  if (!selectedHemisphere.value || !selectedYear.value) {
    return
  }

  if (!store.selectedHemisphere) {
    store.selectedHemisphere = selectedHemisphere.value
  }

  if (!store.selectedYears[0]) {
    store.selectedYears[0] = +selectedYear.value
  }

  router.push({ name: 'data-table' })
}
</script>

<template>
  <main class="main search">
    <div class="search__container container">
      <div class="search__content">
        <v-select
          v-model="selectedHemisphere"
          :items="hemisphereItems"
          label="Choose a hemisphere"
          variant="underlined"
          append-inner-icon="solar-globus"
          class="mb-5"
        ></v-select>
        <v-combobox
          v-model="selectedYear"
          :items="years"
          label="Choose a year"
          variant="underlined"
          append-inner-icon="fluent-calendar"
        ></v-combobox>
      </div>
      <div class="search__disclaimer">
        <v-icon class="disclaimer__icon" icon="exclamation" />
        <span class="disclaimer__text">
          The forecast was created by an AI model and should be used for
          reference purposes only
        </span>
      </div>
      <Button @click="search">Start</Button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

// .search {
//   &__container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     min-height: calc(100svh - vars.$header-height-desktop);
//     gap: 32px;
//     padding-top: 24px;
//     padding-bottom: 24px;

//     @media (max-width: 768px) {
//       min-height: calc(100svh - vars.$header-height-mobile);
//     }
//   }

//   &__content {
//     background: linear-gradient(-45deg, #c5c5c5, #fff);
//     border: 3px #6f6f6f solid;
//     border-radius: 20px;
//     padding: 60px;
//     color: vars.$dark-color;
//     max-width: 620px;
//     width: 100%;
//   }
// }

.search {
  background-image: url('/hero-image-2.webp');
  background-repeat: no-repeat;
  background-position: 60% 25%;
  background-size: 200% auto;

  @media (max-width: 768px) {
    background-position: 60% 30%;
    background-size: 250% auto;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100svh - vars.$header-height-desktop);
    gap: 32px;
    padding-top: 24px;
    padding-bottom: 24px;

    @media (max-width: 768px) {
      min-height: calc(100svh - vars.$header-height-mobile);
    }
  }

  &__content {
    background: linear-gradient(-45deg, #c5c5c5, #fff);
    border: 3px #6f6f6f solid;
    border-radius: 20px;
    padding: 60px;
    color: vars.$dark-color;
    max-width: 620px;
    width: 100%;
  }
}

.search__disclaimer {
  display: flex;
  align-items: flex-start;
  gap: 8px;

  .disclaimer__icon {
    font-size: 20px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .disclaimer__text {
    max-width: 365px;
    line-height: 1.4;
  }
}
</style>
