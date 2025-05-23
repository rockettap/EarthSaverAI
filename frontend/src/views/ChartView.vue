<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { useStore } from '@/stores'

import {
  CategoryScale,
  Chart,
  type ChartType,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

const store = useStore()

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
)

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

Chart.defaults.font.family = "'Montserrat', sans-serif"
Chart.defaults.color = '#000'

onMounted(() => {
  if (!chartCanvas.value) return
  createChart()
})

const createChart = () => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'line' as ChartType,
      data: store.months,
      options: {
        interaction: {
          mode: 'index',
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        elements: {
          point: {
            radius: 6.5,
            hoverRadius: 6.5,
            hitRadius: 0,
          },
        },
      },
    })
  }
}

watch(
  () => store.months,
  () => {
    if (chartInstance) {
      chartInstance.data = store.months
      chartInstance.update()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style scoped>
div {
  position: relative;
  width: 100%;
  height: 400px;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
