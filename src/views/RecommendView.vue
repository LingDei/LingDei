<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import { onMounted, ref, computed, onBeforeUnmount } from 'vue'
// @ts-ignore TODO: 配置了include还是无法解析
import { apis } from '@/apis'
import { handleNetworkError } from '@/utils/request/RequestTools'
import type { Video } from '@/model/video'

const videoList = ref<Video[]>([])
const index = ref(0)

onMounted(async () => {
  const [err, data] = await apis.getRecommendVideoList()
  if (err) handleNetworkError(err)
  if (!data || data?.video_list.length === 0) return
  videoList.value = data.video_list

  // 键盘上下键事件监听
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      up()
    } else if (e.key === 'ArrowDown') {
      down()
    }
  });
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', () => { })
})

const indexInfo = computed(() => ({
  index: index.value,
  indexs: [index.value - 1, index.value, index.value + 1]
}))

function up() {
  if (index.value === 0) {
    ElMessage.info('当前视频已经是第一条啦，请往下刷')
    return
  }
  index.value--
}

function down() {
  if (index.value === videoList.value.length - 1) {
    ElMessage.info('当前视频已经是第一条啦，请往下刷或者刷新')
    return
  }
  index.value++
}

</script>

<template>
  <main class="main">
    <div class="videoList">
      <div v-for="(video, i) in videoList" :key="video.url">
        <div v-if="indexInfo.indexs.includes(i)" v-show="i === indexInfo.index">
          <div class="relative mt-4 mb-3 bg-white rounded-lg rounded-t-lg shadow-md aspect-ratio-16/9">
            <VideoPlayer :video="video" :playable-video="i === indexInfo.index">
            </VideoPlayer>
          </div>
          <VideoBar :video_uuid="video.uuid"></VideoBar>
        </div>
      </div>
    </div>
    <div class="switchVideo">
      <el-icon size="20" @click="up" class="up">
        <el-icon-arrowUpBold />
      </el-icon>
      <el-icon size="20" @click="down" class="down">
        <el-icon-arrowDownBold />
      </el-icon>
    </div>
  </main>
</template>

<style lang="less" scoped>
.main {
  position: relative;
}

.videoList {
  margin: 0 auto;
  width: 60%;
  height: 90%;
  min-height: 400px;
}

.switchVideo {
  position: absolute;
  top: 40%;
  right: 14%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 30%;
  height: 100px;
  width: 60px;
  background-color: black;
}

.up,
.down {
  cursor: pointer;
}
</style>