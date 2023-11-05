<script setup lang="ts">
import { RouterView } from 'vue-router'
import LNavBar from '@/components/NavBar.vue'
import LFooter from '@/components/PageFooter.vue';
</script>

<template class="bg-gray-100">
  <LNavBar />

  <div class="mb-10 min-h-screen">
    <RouterView />
  </div>

  <LFooter />
</template>

<style scoped></style>
