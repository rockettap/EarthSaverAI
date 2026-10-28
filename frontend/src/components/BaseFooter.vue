<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer" id="contacts">
    <p>{{ currentYear }} © EarthSaverAI</p>
    <p>
      E-mail:
      <a href="mailto:ecomindinnovators@ukr.net">ecomindinnovators@ukr.net</a>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 24px;
  background-color: #f5f5f5;
  font-size: 14px;
  color: #333;
}

.footer a {
  color: #0077cc;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
