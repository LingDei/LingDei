<script setup lang="ts">
import { apis } from '@/apis'
import type { Video } from '@/model/video'
import { handleNetworkError } from '@/utils/request/RequestTools'

const videos = ref<Video[]>([])
const page = ref(1)
const total = ref(0)

async function getData() {
  const [err, data] = await apis.getMyVideoList()
  if (err) handleNetworkError(err)
  if (data?.code !== 200) return
  videos.value = data.video_list
  total.value = data.total
}

onMounted(() => {
  getData()
})

async function deleteVideo(video: Video) {
  const [err, data] = await apis.deleteVideo(video.uuid)
  if (err) handleNetworkError(err)
  if (data?.code !== 200) return
  videos.value = videos.value.filter((item) => item.uuid !== video.uuid)
}
</script>

<template>
  <div class="p-4 bg-white rounded-md shadow-md" style="min-height: 60vh">
    <h2 class="mb-4 text-lg font-bold">我的视频</h2>
    <ElEmpty v-if="!videos.length" description="暂无视频"></ElEmpty>
    <div class="grid grid-cols-2 gap-4 min-h-[50%]">
      <VideoSmallCard
        v-for="video in videos"
        :key="video.uuid"
        :video="video"
        :ButtonClick="() => deleteVideo(video)"
      ></VideoSmallCard>
    </div>
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
</template>

<style scoped>
.page {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}
</style>
