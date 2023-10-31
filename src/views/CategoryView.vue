<script setup lang="ts">
import VideoCard from '@/components/VideoCard.vue';
import { onMounted, ref } from 'vue';
import type { Video } from '@/model/video';
import { apis } from '@/apis'
import { handleNetworkError } from '@/utils/request/RequestTools';

// 获取url参数
import { useRoute } from 'vue-router'
const route = useRoute()

const category_name = ref<string>('')
const videoList = ref<Video[]>([]);

// onMounted(async () => {
//   console.log(categoryUUID)
  
//   const [err, data] = await apis.getCategory(categoryUUID)
//   if (err) handleNetworkError(err)
//   console.log(data?.category)
// })

onBeforeUpdate(async () => {
  const categoryUUID = route.query.uuid as string
  const [err, data] = await apis.getCategory(categoryUUID)
  if (err) handleNetworkError(err)
  console.log(data?.category)
  if (!data) return
  category_name.value = data?.category.name
})

</script>

<template>
  <div class="container mx-auto mt-8">
    <h1 class="mb-4 text-3xl font-semibold">{{ category_name }}</h1>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <!-- 视频卡片 -->
      <VideoCard v-for="video in videoList" :key="video.uuid" :video="video" />
    </div>
  </div>
</template>

<style></style>
