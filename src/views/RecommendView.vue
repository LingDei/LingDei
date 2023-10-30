<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import { onMounted, ref, computed } from 'vue'
// @ts-ignore TODO: 配置了include还是无法解析
import { apis } from '@/apis'
import { handleNetworkError } from '@/utils/request/RequestTools'
import type { Video } from '@/model/video';

const videoList = ref<Video[]>([])
const index = ref(0)

onMounted(async () => {
  const [err, data] = await apis.getVideoList()
  if (err) handleNetworkError(err)
  if (!data || data?.video_list.length === 0) return
  videoList.value = data.video_list
})

const indexInfo = computed(() => ({
  index: index.value,
  indexs:[index.value - 1, index.value, index.value + 1],
}))
</script>

<template>
  <main>
    <div class="videoList">
      <div v-for="(video, i) in videoList" :key="video.url">
        <VideoPlayer :video="video" :index="i" :indexInfo="indexInfo"></VideoPlayer>
      </div>
    </div>
  </main>
</template>

<style lang="less">
.videoList {
  margin: 0 auto;
  width: 60%;
  height: 90%;
  min-height: 400px;
}
</style>
