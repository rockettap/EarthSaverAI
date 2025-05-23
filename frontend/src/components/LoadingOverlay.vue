<template>
  <Transition name="fade">
    <div v-if="show" class="loading-overlay">
      <img src="/loader.svg" alt="Loading..." class="spinner" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<style scoped lang="scss">
@use 'sass:color';
@use '@/assets/vars';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
  transition-delay: 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at center, #8cbae626 2%, vars.$dark-color 36%),
    vars.$dark-color;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  z-index: 99;
}

.spinner {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
