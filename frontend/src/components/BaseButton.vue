<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  to?: RouteLocationRaw
  variant?: 'large' | 'compact' | 'outlined'
  color?: 'blue'
}>()

const classes = computed(() => [
  'btn',
  `btn--${props.variant || 'large'}`,
  props.color ? `btn--color-${props.color}` : '',
  !props.to && props.variant === 'outlined' ? 'btn--outlined' : '',
])
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes">
    <slot />
  </RouterLink>
  <button v-else :class="classes">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

.btn {
  display: inline-flex;
  justify-content: center;
  border-radius: 20px;
  background: vars.$primary-gradient;
  color: #fff;
  font-weight: 600;

  &--large {
    padding: 27px 47px;
    font-size: 38px;
  }

  &--compact {
    padding: 16px 47px;
    font-size: 20px;
  }

  &--color-blue {
    background: #8cbae6;
  }
}
</style>
