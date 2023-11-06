<script setup lang="ts">
import VideoCard from '@/components/VideoCard.vue';
import { onMounted, ref } from 'vue';
import type { Video } from '@/model/video';
import { apis } from '@/apis'
import { handleNetworkError } from '@/utils/request/RequestTools';
import { useRoute } from 'vue-router'

const route = useRoute()
const videoList = ref<Video[]>([]);
const page = ref(1)
const total = ref(0)

async function getData(){
  const keyword = route.query.keyword;
  console.log(keyword)
  const [err, data] = await apis.searchVideo(keyword as string)
  if (err) handleNetworkError(err)
  if (!data || data?.video_list.length === 0) return
  videoList.value = data.video_list
  total.value = data.total
}

onMounted(async () => {
  getData()
})

</script>

<template>
  <div class="container mx-auto mt-8">
    <h1 class="mb-4 text-3xl font-semibold">“{{ route.query.keyword }}” 的搜索结果</h1>
    <!-- 空列表提醒 -->
    <div v-if="videoList.length === 0" class="flex items-center justify-center text-gray-400">
      <el-empty description="无搜索结果" />
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <!-- 视频卡片 -->
      <VideoCard v-for="video in videoList" :key="video.uuid" :video="video" />
    </div>
    <div class="page">
      <el-pagination
        v-model:current-page="page"
        :page-size="9"
        background
        layout="prev, pager, next"
        @update:current-page="getData"
        :total="total"
      />
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}
</style>
