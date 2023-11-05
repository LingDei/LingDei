<template>
  <div class="video-player">
    <video ref="videoRef" class="video-player-video" @timeupdate="updateProgress" @durationchange="durationchange"
      @canplay="canplay" :muted="volumeStore.muted">
      <source :src="props.video?.url" type="video/mp4" />
    </video>

    <div class="progress" @mouseenter="showProgress" @mouseleave="closeProgress">
      <el-progress :percentage="state.progress" :show-text="false" v-if="showProgressDrag"></el-progress>
      <el-slider v-model="currentTime" @change="(v) => changeProgress(v as number)" :format-tooltip="formatTooltip"
        :min="0" :max="duration" @mousedown="isChangeProgress = true" @mouseup="isChangeProgress = false"
        v-else></el-slider>
    </div>
    <div class="container items-center justify-between mx-auto video-player-controls">

      <div class="video-player-controls-left">
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
                <el-dropdown-item v-for="speed in speeds" :key="speed" class="speedItem" :command="speed">
                  {{ speed }}x
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <div class="barrage-input">
        <el-input v-model="barrageContent" class="input"></el-input>
        <button @click="sendBarrage" class="h-8 px-4 ml-1 text-base text-white bg-blue-500 rounded-md">
          发送弹幕
        </button>
      </div>


      <div class="video-player-controls-right">
        <div>
          <div class="video-player-volume-bar" @mouseenter="showVolumeSlider" @mouseleave="closeVolumeSlider">
            <div @click="volumeStore.toggleMuted">
              <img class="w-7" v-if="!volumeStore.muted" src="@/assets/svgs/volume-icon.svg" alt="volume" />
              <img class="w-7" v-else src="@/assets/svgs/mute-icon.svg" alt="volume" />
            </div>

            <div class="video-player-volume-slider" @mouseenter="showVolumeSlider"
              :style="{ display: volumeSliderDisplay }">
              <el-slider v-model="volumeStore.volume" vertical height="80px" @input="(v) => changeVolume(v as number)" />
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="video-player-barrage">
      <span v-for="item in barrage" :key="item.uuid" style="">
        {{ item.content }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Video } from '@/model/video'
import { reactive, ref, watch } from 'vue'
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'

import { formatTime } from '@/utils/format'
import { speeds } from '@/constants/videoPlayer'
import { useVolumeStore } from '@/stores/volume'
import { ElMessage as message } from 'element-plus'

import { apis } from '@/apis'
import { handleNetworkError } from '@/utils/request/RequestTools'
import type { Barrage } from '@/model/barrage'

const props = defineProps<{
  video: Video,
  playableVideo: boolean
}>()

const state = reactive({
  isPlaying: false,
  progress: 0,
  speed: ''
})

const videoRef = ref<HTMLVideoElement | null>(null)
const currentTime = ref(0)
const duration = ref(0)
const volumeSliderDisplay = ref('none')
const timer = ref()
const showProgressDrag = ref(true)
const isChangeProgress = ref(false)
const barrage = ref<Barrage[]>([])
const barrageContent = ref('')
const barragePosition = ref()

// const progress = computed({ get: () => state.progress * duration.value / 100, set: (v) => v })

const volumeStore = useVolumeStore()

function durationchange(e: Event) {
  // @ts-ignore todo, video.target的类型暂时未知
  duration.value = e.target.duration
}

function canplay() {
  if (props.playableVideo && videoRef.value) {
    togglePlay()
  }
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

const toggleSpeed = (speed: string) => {
  if (!videoRef.value) return
  videoRef.value.playbackRate = +speed
  state.speed = speed + 'x'
}

function showVolumeSlider() {
  if (timer.value) {
    clearTimeout(timer.value)
  }
  volumeSliderDisplay.value = 'block'
}

function closeVolumeSlider() {
  if (timer.value) {
    clearTimeout(timer.value)
  }
  timer.value = setTimeout(() => {
    volumeSliderDisplay.value = 'none'
  }, 500);
}

function changeVolume(value: number) {
  if (videoRef.value) {
    videoRef.value.volume = value * 0.01
    volumeStore.changeVolume(value)
  }
}

const updateProgress = () => {
  if (!videoRef.value || isChangeProgress.value) return
  const video = videoRef.value
  const progress = (video.currentTime / video.duration) * 100
  state.progress = progress
  currentTime.value = videoRef.value.currentTime
}

const changeProgress = (value: number) => {
  if (!videoRef.value) return
  value = Math.floor(value)
  currentTime.value = value
  videoRef.value.currentTime = value
  state.progress = value / (duration.value)
  togglePlay()
}

function formatTooltip(v: number) {
  return formatTime(v)
}

function showProgress() {
  if (volumeSliderDisplay.value !== 'block') {
    showProgressDrag.value = false
  }
}

function closeProgress() {
  setTimeout(() => {
    showProgressDrag.value = true
  }, 1000);
}

async function sendBarrage() {
  const [err, data] = await apis.addBarrage(props.video.uuid, barrageContent.value, Math.round(currentTime.value))
  barrageContent.value = ''
  if (err) handleNetworkError(err)
  if (data?.code != 200) {
    ElMessage.error({ message: '发送失败' })
    return
  }
  ElMessage.success({ message: '发送成功' })
}

const getRandomColor = () => {
  var color = "#";
  for (var i = 0; i < 6; i++)
    color += parseInt(Math.random() * 16 + '').toString(16);
  return color;
};

const moveDanmus = () => {
  for (let i = 0; i < barrage.value.length; i++) {
    const danmu = barrage.value[i];
    danmu.right += 2; // Adjust the speed of the danmu here
    if (danmu.right > window.innerWidth) {
      danmu.right = -200; // Reset the position if danmu goes beyond the window
    }
  }
};

// Call moveDanmus every 16 milliseconds (adjust the interval for smoother animation if needed)
setInterval(moveDanmus, 16);

watch(props, () => {
  if (videoRef.value === null) return

  if (props.playableVideo === false && state.isPlaying) {
    videoRef.value.pause()
    state.isPlaying = false
  }
  if (props.playableVideo === true && !state.isPlaying) {
    videoRef.value.play()
    state.isPlaying = true
  }
})

onMounted(() => {
  if (volumeStore.muted) {
    message({
      showClose: true,
      message: '当前为静音，请手动打开音量~',
      type: 'warning'
    })
  }
})

watch(currentTime, async () => {
  if (Math.floor(currentTime.value) % 10 === 0) {
    const [err, data] = await apis.getBarrageList(props.video.uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) return
    barrage.value = data.barrage_list
    barrage.value.forEach((item) => {
      item.top = 0
      item.right = 0
      item
    })
  }
})
</script>

<style lang="less" scoped>
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: #606266;
}

.video-player-video {
  width: 100%;
  height: 100%;
  max-height: 770px;
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

.video-player-volume-slider {
  display: none;
  position: absolute;
  padding: 10px 0;
  top: -136px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #8a7e7e;

  &:hover {
    display: block;
  }
}

.video-player-volume-muted {
  display: flex;
  gap: 10px;
}

.video-player-controls-left {
  display: flex;
  align-items: center;
  gap: 20px;
  @apply ml-2;
}

.video-player-controls-right {
  display: flex;
  align-items: center;
  gap: 20px;
  @apply mr-5;
}

.barrage-input {
  display: flex;
  gap: 10px;

  .input {
    width: 300px;
  }
}

.video-player-barrage {
  position: absolute;
  top: 0;
  z-index: 1001;
  height: 300px;
  width: 100%;
}
</style>
