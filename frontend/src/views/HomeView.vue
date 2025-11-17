<script setup lang="ts">
import Footer from '@/components/BaseFooter.vue'
import BenefitSection from '@/components/home/BenefitSection.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import ImpactSection from '@/components/home/ImpactSection.vue'
</script>

<template>
  <main class="main" v-once>
    <HeroSection />

    <BenefitSection />

    <ImpactSection />

    <Footer />
  </main>
</template>

<style lang="scss" scoped></style>
