<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useStore } from '@/stores'

import Button from '@/components/BaseButton.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

import { ForecastApiError, fetchForecast } from '@/api'
import {
  FIRST_YEAR,
  LAST_YEAR,
  parseYear,
  yearOptions as years,
} from '@/constants'
import { parseSelectionQuery, selectionToQuery } from '@/router/selection'

const store = useStore()
const route = useRoute()
const router = useRouter()

const menuItems = ['Table', 'Chart', '3D model'] as const
const menuToRouteMap: Record<(typeof menuItems)[number], string> = {
  Table: 'data-table',
  Chart: 'data-chart',
  '3D model': 'data-3d-model',
}

const selectedMenuItem = computed(() => {
  const name = route.name
  const foundItem = Object.entries(menuToRouteMap).find(
    ([, routeName]) => routeName === name,
  )
  return foundItem?.[0] as (typeof menuItems)[number] | undefined
})

const routeSelection = computed(() => parseSelectionQuery(route.query))
const selectedYear = ref<string | null>(null)
const dialogYearError = ref('')
const showDialog = ref(false)

const loading = ref(true)
const error = ref<string | null>(null)

function navigateToMenu(item: (typeof menuItems)[number]) {
  const routeName = menuToRouteMap[item]
  if (routeName) {
    router.push({ name: routeName, query: route.query })
  }
}

function addDialog() {
  const selection = routeSelection.value
  if (!selection) return

  const year = parseYear(selectedYear.value)

  if (year === null) {
    dialogYearError.value = `Enter a year between ${FIRST_YEAR} and ${LAST_YEAR}`
    return
  }

  if (selection.years.includes(year)) {
    dialogYearError.value = 'This year is already selected'
    return
  }

  dialogYearError.value = ''
  showDialog.value = false

  void router.replace({
    query: selectionToQuery({
      hemisphere: selection.hemisphere,
      years: [...selection.years, year].slice(0, 2),
    }),
  })
}

function closeDialog() {
  if (showDialog.value) {
    showDialog.value = false
  }
  dialogYearError.value = ''
}

function back() {
  router.push({ name: 'search' })
}

function toggleDialog() {
  showDialog.value = !showDialog.value
}

function preloadImages(imageUrls: string[]): Promise<void> {
  return new Promise((resolve) => {
    let loadedCount = 0
    const total = imageUrls.length

    if (total === 0) {
      resolve()
      return
    }

    imageUrls.forEach((url) => {
      const img = new Image()
      img.src = url

      img.onload = img.onerror = () => {
        loadedCount++
        if (loadedCount === total) {
          resolve()
        }
      }
    })
  })
}

function getLoadErrorMessage(err: unknown): string {
  if (err instanceof ForecastApiError && err.status === 404) {
    return 'No forecast data is available for the selected year and hemisphere. Please choose another year.'
  }

  if (err instanceof ForecastApiError && err.status === 422) {
    return `The selected year is not valid. Please choose a year between ${FIRST_YEAR} and ${LAST_YEAR}.`
  }

  if (!navigator.onLine) {
    return 'You appear to be offline. Check your connection and try again.'
  }

  return 'Could not load the forecast. The forecast service may be starting up, so please try again in a moment.'
}

async function load() {
  try {
    loading.value = true
    error.value = null

    const selectedYears = [...store.selectedYears]
    const hemisphere = store.selectedHemisphere

    if (!selectedYears.length || !hemisphere) {
      error.value =
        'No forecast selected. Go back and choose a hemisphere and year.'
      return
    }

    const temp = await Promise.all(
      selectedYears.map((year) => fetchForecast(year, hemisphere)),
    )

    store.fetchedYears = temp

    const imageUrls = store.fetchedYears.flat().map((item) => item.image)
    await preloadImages(imageUrls)
  } catch (err) {
    error.value = getLoadErrorMessage(err)
    console.error(err)
  } finally {
    loading.value = false
  }
}

function retry() {
  void load()
}

watch(
  () =>
    routeSelection.value
      ? `${routeSelection.value.hemisphere}:${routeSelection.value.years.join(',')}`
      : null,
  () => {
    const selection = routeSelection.value

    if (!selection) {
      if (String(route.name ?? '').startsWith('data-')) {
        void router.replace({ name: 'search' })
      }
      return
    }

    store.selectedHemisphere = selection.hemisphere
    store.selectedYears = selection.years
    void load()
  },
  { immediate: true },
)

onUnmounted(() => {
  store.clear()
})
</script>

<template>
  <LoadingOverlay :show="loading" />

  <div class="dialog-overlay" v-show="showDialog" @click="closeDialog">
    <div class="dialog" @click.stop>
      <div class="dialog__content">
        <v-combobox
          v-model="selectedYear"
          :items="years"
          label="Choose a year"
          variant="underlined"
          append-inner-icon="fluent-calendar"
          :error-messages="dialogYearError"
          @update:model-value="dialogYearError = ''"
        ></v-combobox>
        <div class="dialog__actions">
          <Button @click="closeDialog" variant="compact" color="blue">
            Close
          </Button>
          <Button @click="addDialog" variant="compact">Add</Button>
        </div>
      </div>
    </div>
  </div>

  <main class="main">
    <div class="test__container container">
      <ul class="test__select-menu" v-if="!error">
        <li
          v-for="item in menuItems"
          :key="item"
          class="test__select-item"
          :class="{ 'test__select-item--active': selectedMenuItem === item }"
          @click="navigateToMenu(item)"
        >
          <h2 class="test__select-title">{{ item }}</h2>
        </li>
      </ul>
      <div class="test__content">
        <h1 v-if="error" role="alert">{{ error }}</h1>
        <RouterView v-if="!error" />
      </div>
      <div class="test__actions">
        <button v-if="error" @click="retry" class="test__button">Retry</button>
        <button
          @click="back"
          class="test__button"
          :class="{ 'test__button--secondary': error }"
        >
          Back
        </button>
        <button
          @click="toggleDialog"
          v-if="!error && store.fetchedYears.length !== 2"
          class="test__button test__button--secondary"
        >
          Compare
        </button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

.test {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100svh - vars.$header-height-desktop);
    padding-top: 24px;
    padding-bottom: 24px;

    @media (max-width: 992px) {
      min-height: calc(100svh - vars.$header-height-mobile);
    }
  }
}

.test {
  &__select-menu {
    display: flex;
    list-style: none;
    justify-content: center;
    gap: clamp(1rem, 0.384rem + 2.629vw, 2.75rem);
    padding: 0 20px;
    height: 66px;
  }

  &__select-item {
    background: linear-gradient(#fff 90%, #f5f5f5 100%);
    padding: 5px clamp(0.938rem, -1.994rem + 9.159vw, 6.25rem);
    border-radius: 20px 20px 0 0;
    display: flex;
    justify-content: center;
    align-self: flex-end;
    transition:
      box-shadow 0.2s ease-in-out,
      padding-top 0.2s ease-in-out,
      padding-bottom 0.2s ease-in-out;
    cursor: pointer;

    &--active {
      padding: 15px clamp(0.938rem, -1.994rem + 9.159vw, 6.25rem);
      box-shadow: 0 0 15px vars.$primary-color;
    }
  }

  &__select-title {
    color: vars.$dark-color;
    font-size: clamp(0.875rem, 0.6549rem + 0.939vw, 1.5rem);
    text-align: center;
    text-wrap: nowrap;
  }
}

.test__content {
  padding: 32px;
  border-radius: 20px;
  width: 100%;
  max-width: 1080px;
  background-color: #fff;
  color: vars.$dark-color;
  margin-bottom: 24px;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
}

.test__actions {
  display: flex;
  gap: 24px 120px;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1080px;
}

.test__button {
  display: inline-block;
  width: 100%;
  max-width: 320px;
  padding: 14px 28px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 34px;
  text-align: center;
  background: vars.$primary-color;
  color: vars.$dark-color;

  &--secondary {
    background: transparent;
    border: 2.5px solid vars.$primary-color;
    color: vars.$primary-color;
  }
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 98;
}

.dialog {
  border: none;
  border-radius: 20px;
  margin: 24px;
  padding: 48px;
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  color: vars.$dark-color;
}

.dialog__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dialog__actions {
  display: flex;
  justify-content: space-evenly;
  gap: 16px;
}
</style>
