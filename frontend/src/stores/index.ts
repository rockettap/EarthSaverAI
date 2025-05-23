import { computed, ref } from 'vue'

import { type Forecast, type Hemisphere, monthNames } from '@/types'

import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const selectedHemisphere = ref<Hemisphere | null>(null)
  const selectedYears = ref<number[]>([])

  function addYear(year: number) {
    if (selectedYears.value.length < 2) {
      selectedYears.value.push(year)
    }
  }

  const fetchedYears = ref<Forecast[][]>([])

  function addFetchedYear(year: Forecast[]) {
    if (fetchedYears.value.length < 2) {
      fetchedYears.value.push(year)
    }
  }

  function clear() {
    selectedHemisphere.value = null
    selectedYears.value = []

    fetchedYears.value = []
  }

  const firstYearExtents = computed(() => {
    const firstYear = fetchedYears.value[0] || []
    return Array.from({ length: 12 }, (_, i) => {
      const monthData = firstYear.find((f) => f.month === i + 1)
      return monthData ? monthData.extent : null
    })
  })

  const secondYearExtents = computed(() => {
    const secondYear = fetchedYears.value[1] || []
    return Array.from({ length: 12 }, (_, i) => {
      const monthData = secondYear.find((f) => f.month === i + 1)
      return monthData ? monthData.extent : null
    })
  })

  const months = computed(() => {
    const result = {
      labels: monthNames,
      datasets: [
        {
          label: fetchedYears.value[0]?.[0]?.year.toString() ?? 'Unknown Year',
          data: firstYearExtents.value,
          fill: false,
          borderDash: [] as number[],
          borderColor: '#011332',
          backgroundColor: '#ffa068',
          borderCapStyle: 'round',
          pointBackgroundColor: '#ffa068',
          pointBorderWidth: 0,
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
        },
      ],
    }

    if (fetchedYears.value[1]?.[0]) {
      result.datasets.push({
        label: fetchedYears.value[1][0].year.toString(),
        data: secondYearExtents.value,
        fill: false,
        borderDash: [13, 13],
        borderColor: '#011332',
        backgroundColor: '#8cbae6',
        borderCapStyle: 'round',
        pointBackgroundColor: '#8cbae6',
        pointBorderWidth: 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      })
    }

    return result
  })

  return {
    selectedHemisphere,
    selectedYears,
    addYear,
    fetchedYears,
    addFetchedYear,
    clear,
    months,
  }
})
