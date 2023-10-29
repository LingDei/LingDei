<script setup lang="ts">
import VideoCard from '@/components/VideoCard.vue';
import { onMounted, ref } from 'vue';
import type { Video } from '@/model/video';
import { apis } from '@/apis'
import { handleNetworkError } from '@/utils/request/RequestTools';

const videoList = ref<Video[]>([]);

onMounted(async () => {
  const [err, data] = await apis.getVideoList()
  if (err) handleNetworkError(err)
  if (!data || data?.video_list.length === 0) return
  videoList.value = data.video_list
})

</script>

<template>
    <div class="container mx-auto mt-8">
      <h1 class="mb-4 text-3xl font-semibold">热门视频</h1>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- 视频卡片 -->
        <VideoCard
          v-for="video in videoList"
          :key="video.uuid"
          :video="video"
        />
      
      </div>
    </div>
</template>

<style>

</style>
