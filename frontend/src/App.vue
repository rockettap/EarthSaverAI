<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Header from '@/components/BaseHeader.vue'

const route = useRoute()

const isHomePage = computed(() => route.name === 'home')
</script>

<template>
  <Header :is-home-page="isHomePage" />
  <RouterView />
</template>
