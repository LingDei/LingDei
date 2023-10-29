<script setup lang="ts">
import { RouterView } from 'vue-router'
import LNavBar from './components/NavBar.vue'
import LFooter from './components/PageFooter.vue';
</script>

<template>
  <LNavBar />

  <RouterView />

  <LFooter />
</template>

<style scoped>

</style>
