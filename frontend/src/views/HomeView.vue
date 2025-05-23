<script setup lang="ts">
import Footer from '@/components/BaseFooter.vue'
import BenefitSection from '@/components/home/BenefitSection.vue'
// import ContactsSection from '@/components/home/ContactsSection.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import ImpactSection from '@/components/home/ImpactSection.vue'
import TeamsSection from '@/components/home/TeamsSection.vue'
</script>

<template>
  <main class="main" v-once>
    <HeroSection />

    <BenefitSection />

    <ImpactSection />

    <TeamsSection />

    <!-- <ContactsSection /> -->

    <Footer />
  </main>
</template>

<style lang="scss" scoped></style>
