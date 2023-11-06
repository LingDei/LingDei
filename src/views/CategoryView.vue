<script setup lang="ts">
import VideoCard from '@/components/VideoCard.vue'
import { onMounted, ref } from 'vue'
import type { Video } from '@/model/video'
import { apis } from '@/apis'
import { handleNetworkError } from '@/utils/request/RequestTools'

// 获取url参数
import { useRoute } from 'vue-router'
const route = useRoute()

const category_name = ref<string>('')
const videoList = ref<Video[]>([])
const page = ref(1)
const total = ref(0)

const pre_uuid = ref('')

async function getData() {
  const categoryUUID = route.params.id as string
  console.log(categoryUUID)
  const [err, data] = await apis.getCategory(categoryUUID)
  if (err) handleNetworkError(err)
  console.log(data?.category)
  if (!data) return
  category_name.value = data?.category.name

  videoList.value.length = 0
  const [err2, data2] = await apis.getVideoList(page.value, 9, categoryUUID)
  if (err2) handleNetworkError(err2)
  if (!data2 || data2?.video_list.length === 0) return
  videoList.value = data2.video_list
  total.value = data2.total
}

onMounted(async () => {
  await getData()
})

onUpdated(async () => {
  if (pre_uuid.value === (route.params.id as string)) return
  pre_uuid.value = route.params.id as string
  await getData()
})
</script>

<template>
  <div class="container mx-auto mt-8">
    <h1 class="mb-4 text-3xl font-semibold">{{ category_name }}</h1>
    <!-- 空列表提醒 -->
    <div v-if="videoList.length === 0" class="flex items-center justify-center text-gray-400">
      <el-empty description="该分类下暂无视频" />
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
