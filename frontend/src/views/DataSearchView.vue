<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useStore } from '@/stores'
import { Hemisphere } from '@/types'

import Button from '@/components/BaseButton.vue'

import {
  FIRST_YEAR,
  LAST_YEAR,
  parseYear,
  yearOptions as years,
} from '@/constants'
import { selectionToQuery } from '@/router/selection'

const store = useStore()
const router = useRouter()

const selectedHemisphere = ref<Hemisphere | null>(null)
const selectedYear = ref<string | null>(null)
const hemisphereError = ref('')
const yearError = ref('')

const hemisphereItems = [
  { title: 'Northern', value: Hemisphere.Northern },
  { title: 'Southern', value: Hemisphere.Southern },
]

function search() {
  hemisphereError.value = selectedHemisphere.value ? '' : 'Choose a hemisphere'
  const year = parseYear(selectedYear.value)
  yearError.value =
    year === null ? `Choose a year between ${FIRST_YEAR} and ${LAST_YEAR}` : ''

  if (!selectedHemisphere.value || year === null) return

  selectedYear.value = year.toString()
  store.selectedHemisphere = selectedHemisphere.value
  store.selectedYears = [year]
  store.fetchedYears = []

  router.push({
    name: 'data-table',
    query: selectionToQuery({
      hemisphere: selectedHemisphere.value,
      years: [year],
    }),
  })
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
          :error-messages="hemisphereError"
          @update:model-value="hemisphereError = ''"
        ></v-select>
        <v-combobox
          v-model="selectedYear"
          :items="years"
          label="Choose a year"
          variant="underlined"
          append-inner-icon="fluent-calendar"
          :error-messages="yearError"
          @update:model-value="yearError = ''"
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

.search {
  position: relative;
  background-image: url('/hero-image-2.webp');
  background-repeat: no-repeat;
  background-position: center 50%;
  background-size: cover;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px);
    z-index: 0;
  }

  @media (max-width: 992px) {
    background-position: center top;
    background-size: cover;
  }

  &__container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100svh - vars.$header-height-desktop);
    gap: 32px;
    padding: 0 24px;

    @media (max-width: 992px) {
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
