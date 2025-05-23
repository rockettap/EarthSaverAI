<script setup lang="ts">
import BaseStart from '@/components/BaseStart.vue'
import TeamMember from '@/components/TeamMember.vue'

const teamMembers = [
  { name: 'Oleg Voichur', image: '/avatar-1.png' },
  {
    name: 'Vitalii Alekseiko',
    image: '/avatar-2.png',
    role: 'Team Leader',
  },
  { name: 'Valeriia Shvaiko', image: '/avatar-3.png' },
  { name: 'Juliia Ilchyshyna', image: '/avatar-4.png' },
  { name: 'Yuliia Holosniak', image: '/avatar-5.png' },
  { name: 'Myshchak Oleksandr', image: '/avatar-6.png' },
]
</script>

<template>
  <section class="teams" id="teams">
    <BaseStart :titles="['Teams', 'Teams name']" description="Teams slang" />

    <div class="teams__container container">
      <ul class="teams__list">
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

.teams__container {
  padding: 72px 0;
}

.teams__list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(410.66px, 1fr));
  gap: 64px 24px;
  list-style: none;
}
</style>
