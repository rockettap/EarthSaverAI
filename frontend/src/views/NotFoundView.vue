<script setup lang="ts"></script>

<template>
  <div>
    <h1>404 Not Found</h1>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

div {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100svh - vars.$header-height-desktop);
  padding: 24px;

  @media (max-width: 768px) {
    min-height: calc(100svh - vars.$header-height-mobile);
  }
}
</style>
