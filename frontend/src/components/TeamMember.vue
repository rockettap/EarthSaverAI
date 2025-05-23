<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  name: string
  image: string
  role?: string
}>()

const defaultAvatar = '/EarthSaverAI/avatar-default.svg'
const avatarImg = ref<HTMLImageElement | null>(null)

function handleImageError() {
  if (avatarImg.value) {
    avatarImg.value.src = defaultAvatar
  }
}
</script>

<template>
  <li class="teams__item">
    <figure class="teams__item-figure">
      <img
        :src="image || defaultAvatar"
        :alt="name"
        class="teams__item-image"
        @error="handleImageError"
        ref="avatarImg"
      />
      <figcaption class="teams__item-caption">
        <strong class="teams__item-name">{{ name }}</strong>
        <br v-if="role" />
        <span v-if="role" class="teams__item-role">{{ role }}</span>
      </figcaption>
    </figure>
  </li>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

.teams__item {
  padding: 0 24px;
  display: flex;
  justify-content: center;
}

.teams__item-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.teams__item-image {
  width: 300px;
  height: 300px;
  border-radius: 50%;
}

.teams__item-caption {
  text-align: center;
  font-size: 32px;
  font-weight: 600;
}

.teams__item-name {
  background-color: #fff;
  color: vars.$dark-color;
  border-radius: 20px;
  padding: 12px;
  line-height: 1;
  display: inline-block;
  margin: 10px 0;
}

.teams__item-role {
  color: vars.$primary-color;
}
</style>
