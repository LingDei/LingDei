<script setup lang="ts">
import { RouterView } from 'vue-router'
import LNavBar from '@/components/NavBar.vue'
</script>

<template>
  <LNavBar />
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
