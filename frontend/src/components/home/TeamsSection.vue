<script setup lang="ts">
import BaseStart from '@/components/BaseStart.vue'
import TeamMember from '@/components/TeamMember.vue'

const teamMembers = [
  { name: 'Oleg Voichur', image: '/EarthSaverAI/avatar-1.webp' },
  {
    name: 'Vitalii Alekseiko',
    image: '/EarthSaverAI/avatar-2.webp',
    role: 'Team Leader',
  },
  { name: 'Valeriia Shvaiko', image: '/EarthSaverAI/avatar-3.webp' },
  { name: 'Juliia Ilchyshyna', image: '/EarthSaverAI/avatar-4.webp' },
  { name: 'Yuliia Holosniak', image: '/EarthSaverAI/avatar-5.webp' },
  { name: 'Oleksandr Myshchak', image: '/EarthSaverAI/avatar-6.webp' },
]
</script>

<template>
  <section class="team" id="team">
    <BaseStart
      :titles="['Team', 'EarthSaverAI']"
      description="EarthSaverAI — Making Climate Forecasting Transparent and Accessible 🌡 🧊"
    />

    <div class="team__container container">
      <ul class="team__list">
        <TeamMember
          v-for="(member, index) in teamMembers"
          :key="index"
          :name="member.name"
          :image="member.image"
          :role="member.role"
        />
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/vars';

.team__container {
  padding: 72px 0;
}

.team__list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(410.66px, 1fr));
  gap: 64px 24px;
  list-style: none;
}
</style>
