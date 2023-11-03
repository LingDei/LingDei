<template>
  <div
    class="video-player"
    v-if="indexInfo.indexs.includes(index)"
    v-show="index === indexInfo.index"
  >
    <video
      ref="videoRef"
      class="video-player-video"
      @timeupdate="updateProgress"
      @durationchange="durationchange"
      @canplay="canplay"
      autoplay="true"
      muted="true"
    >
      <source :src="props.video?.url" type="video/mp4" />
    </video>

    <div class="progress">
      <el-progress></el-progress>
    </div>
    <div class="video-player-controls">
      <div @click="togglePlay" class="video-player-control">
        <el-icon v-if="state.isPlaying" size="40">
          <VideoPause />
        </el-icon>
        <el-icon v-else size="40">
          <VideoPlay />
        </el-icon>
      </div>
      <div>
        {{ formatTime(currentTime) }}
        /
        {{ formatTime(duration) }}
      </div>
      <div class="speed">
        <el-dropdown @command="toggleSpeed">
          <span class="">
            {{ state.speed || '倍速' }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="speed in speeds"
                :key="speed"
                class="speedItem"
                :command="speed"
              >
                {{ speed }}x
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <div class="video-player-volume-bar">
          <button class="video-player-control-btn" @click="toggleVolume">Volume</button>
          <input
            type="range"
            v-if="state.isVolumeVisible"
            v-model="state.volume"
            min="0"
            max="1"
            step="0.1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Video } from '@/model/video'
import { reactive, ref } from 'vue'
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'

import { formatTime } from '@/utils/format'
import { speeds } from '@/constants/videoPlayer'

const props = defineProps<{
  video: Video
  index: number
  indexInfo: {
    index: number
    indexs: number[]
  }
}>()

const state = reactive({
  isPlaying: false,
  progress: 0,
  isVolumeVisible: false,
  volume: 0.5,
  speed: ''
})

const videoRef = ref<HTMLVideoElement | null>(null)
const playerLoading = ref(false)
const currentTime = ref(0)
const duration = ref(0)

function durationchange(e: Event) {
  // @ts-ignore todo, video.target的类型暂时未知
  duration.value = e.target.duration
}

function canplay() {
  state.isPlaying = true
}

const togglePlay = () => {
  if (!videoRef.value) return
  state.isPlaying = !state.isPlaying
  if (state.isPlaying) {
    videoRef.value.play()
  } else {
    videoRef.value.pause()
  }
}

const toggleVolume = () => {
  state.isVolumeVisible = !state.isVolumeVisible
}

const toggleSpeed = (speed: string) => {
  if (!videoRef.value) return
  videoRef.value.playbackRate = +speed
  state.speed = speed + 'x'
}

const updateProgress = () => {
  if (!videoRef.value) return
  const video = videoRef.value
  const progress = (video.currentTime / video.duration) * 100
  state.progress = Math.floor(progress)
  currentTime.value = videoRef.value.currentTime
}
</script>

<style lang="less" scoped>
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 20px;
}

.video-player-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-player-controls {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 50px;

  .video-player-control {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}

.speed {
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
  }

  .speedItem {
    font-size: 20px;
  }
}

.video-player-progress {
  height: 100%;
  background-color: #f00;
}

.video-player-volume-bar {
  position: relative;
}
</style>
