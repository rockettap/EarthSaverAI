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
  border-radius: 1.25rem;
  background: vars.$primary-gradient;
  color: #fff;
  font-weight: 600;

  &--large {
    padding: clamp(1.0546875rem, 0.818rem + 1.029vw, 1.6875rem)
      clamp(1.8359375rem, 1.424rem + 1.7912vw, 2.9375rem);
    font-size: clamp(1.484375rem, 1.1513rem + 1.4482vw, 2.375rem);
  }

  &--compact {
    padding: clamp(0.625rem, 0.4848rem + 0.6098vw, 1rem)
      clamp(1.8359375rem, 1.424rem + 1.7912vw, 2.9375rem);
    font-size: clamp(0.875rem, 0.7348rem + 0.6098vw, 1.25rem);
  }

  &--color-blue {
    background: #8cbae6;
  }
}
</style>
