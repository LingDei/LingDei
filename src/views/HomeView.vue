<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import { onMounted } from 'vue'
// @ts-ignore TODO: 配置了include还是无法解析
import { apis } from '@/apis'

onMounted(async () => {
  const data = await apis.getVideoList()
  console.log(data);
  
})
</script>

<template>
  <main>
    <div class="videoList">
      <VideoPlayer videoUrl=""></VideoPlayer>
    </div>
  </main>
</template>

<style lang="less">
  .videoList {
    margin: 0 auto;
    width: 80%;
    height: 90%;
    min-height: 400px;
  }
</style>
