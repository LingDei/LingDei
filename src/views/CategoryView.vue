<script setup lang="ts">
import VideoCard from '@/components/VideoCard.vue';
import { onMounted, ref } from 'vue';
import type { Video } from '@/model/video';
import { apis } from '@/apis'
import { handleNetworkError } from '@/utils/request/RequestTools';

// 获取url参数
import { useRoute } from 'vue-router'
const route = useRoute()

// const refreshCount = ref(0);
const category_name = ref<string>('')
const videoList = ref<Video[]>([]);

async function refresh() {
  const categoryUUID = route.query.uuid as string
  console.log(categoryUUID)
  const [err, data] = await apis.getCategory(categoryUUID)
  if (err) handleNetworkError(err)
  console.log(data?.category)
  if (!data) return
  category_name.value = data?.category.name
}

onMounted(async () => {
  await refresh()
})

onBeforeUpdate(async () => {
  await refresh()
  console.log('refresh')
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
