<script setup lang="ts">
import VideoCard from '@/components/VideoCard.vue';
import { ref } from 'vue';
import type { Video } from '@/model/video';

const videos = ref<Video[]>([
  {
    id: '1',
    title: 'Vue 3 Composition API',
    cover: 'https://via.placeholder.com/400x300',
    description: 'Vue 3 Composition API',
    views: "100",
    date: '2023-10-27',
  },
  {
    id: '2',
    title: 'Vue 3 Composition API',
    cover: 'https://via.placeholder.com/400x300',
    description: 'Vue 3 Composition API',
    views: "100",
    date: '2023-10-27',
  },
  {
    id: '3',
    title: 'Vue 3 Composition API',
    cover: 'https://via.placeholder.com/400x300',
    description: 'Vue 3 Composition API',
    views: "100",
    date: '2023-10-27',
  },
  {
    id: '4',
    title: 'Vue 3 Composition API',
    cover: 'https://via.placeholder.com/400x300',
    description: 'Vue 3 Composition API',
    views: "100",
    date: '2023-10-27',
  },
  {
    id: '5',
    title: 'Vue 3 Composition API',
    cover: 'https://via.placeholder.com/400x300',
    description: 'Vue 3 Composition API',
    views: "100",
    date: '2023-10-27',
  },
  {
    id: '6',
    title: 'Vue 3 Composition API',
    cover: 'https://via.placeholder.com/400x300',
    description: 'Vue 3 Composition API',
    views: "100",
    date: '2023-10-27',
  },
  {
    id: '7',
    title: 'Vue 3 Composition API',
    cover: 'https://via.placeholder.com/400x300',
    description: 'Vue 3 Composition API',
    views: "100",
    date: '2023-10-27',
  },
  {
    id: '8',
    title: 'Vue 3 Composition API',
    cover: 'https://via.placeholder.com/400x300',
    description: 'Vue 3 Composition API',
    views: "100",
    date: '2023-10-27',
  }
]);

// onMounted(async () => {
//     const response = await fetch('http://localhost:3000/videos');
//     videos.value = await response.json();
// });



</script>

<template>
    <div class="container mx-auto mt-8">
      <h1 class="mb-4 text-3xl font-semibold">热门视频</h1>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- 视频卡片 -->
        <VideoCard
          v-for="video in videos"
          :key="video.id"
          :video="video"
        />
        


      
      </div>
    </div>
</template>

<style>

</style>