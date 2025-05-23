<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from '@/stores'
import { type Forecast, monthNames } from '@/types'

const store = useStore()

function getMonthName(monthNumber: number) {
  return monthNames[monthNumber - 1] || 'Unknown'
}

const displayedMonths = computed(() => {
  const monthsSet = new Set<number>()
  store.fetchedYears.forEach((yearData) => {
    yearData.forEach((entry) => {
      monthsSet.add(entry.month)
    })
  })
  return Array.from(monthsSet).sort((a, b) => a - b)
})

function findMonthData(yearData: Forecast[], month: number) {
  return yearData.find((entry) => entry.month === month)
}
</script>

<template>
  <table v-if="store.fetchedYears.length > 0">
    <thead>
      <tr>
        <th>Month</th>
        <th>
          Extent
          <span class="highlighted-text">
            {{ store.fetchedYears[0][0]?.year }} year
          </span>
        </th>
        <th v-if="store.fetchedYears.length > 1">
          Extent
          <span class="highlighted-text">
            {{ store.fetchedYears[1][0]?.year }} year
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="month in displayedMonths" :key="month">
        <th>{{ getMonthName(month) }}</th>
        <td>
          {{
            findMonthData(store.fetchedYears[0], month)?.extent?.toFixed(1) ||
            '—'
          }}
        </td>
        <td v-if="store.fetchedYears.length > 1">
          {{
            findMonthData(store.fetchedYears[1], month)?.extent?.toFixed(1) ||
            '—'
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

table {
  border-collapse: collapse;

  thead th {
    font-weight: 600;
  }

  tbody th {
    font-weight: 500;
  }

  td,
  th {
    border: 2px solid vars.$dark-color;
    text-align: center;
    padding: 8px 16px;
  }
}
</style>
