<script setup lang="ts">
defineProps<{
  isHomePage: boolean
}>()
</script>

<template>
  <header class="header">
    <div class="header__container container">
      <nav class="nav" v-if="isHomePage">
        <div class="nav__sub" style="margin-right: 12px">
          <a
            href="https://drive.google.com/file/d/1kJ77gAcohqSyZvovVUlOftC8TIb12hn4/view"
            class="nav__link"
            >Documentation</a
          >
          <a href="#information" class="nav__link">Information</a>
        </div>

        <div class="nav__welcome nav__welcome--hide">
          <RouterLink to="/" class="nav__link">Welcome</RouterLink>
        </div>

        <div class="nav__sub" style="margin-left: 12px">
          <a href="#team" class="nav__link">Team</a>
          <a href="#contacts" class="nav__link">Contacts</a>
        </div>
      </nav>
      <nav class="nav" v-else>
        <div class="nav__welcome">
          <RouterLink to="/" class="nav__link">
            EarthSaver<span class="highlighted-text">AI</span>
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

.header {
  background-color: #fdfdfd;
  position: relative;
}

.header__container {
  display: flex;
  height: vars.$header-height-desktop;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 992px) {
    overflow-x: auto;
    height: vars.$header-height-mobile;
  }
}

.nav {
  font-weight: 400;
  color: vars.$dark-color;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
}

.nav__sub {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, -7.5rem + 18.75vw, 9.375rem);
}

.nav__welcome {
  font-weight: 600;
  font-size: 36px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 992px) {
    &--hide {
      display: none;
    }
  }
}

.nav__link {
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.6;
  }
}
</style>
