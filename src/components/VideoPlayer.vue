<template>
  <div class="video-player" v-if="index in indexInfo.indexs" v-show="index === indexInfo.index">
    <video ref="videoRef" class="video-player-video" @timeupdate="updateProgress">
      <source :src="props.video?.url" type="video/mp4" />
    </video>

    <div class="video-player-controls">
      <button class="video-player-control-btn" @click="togglePlay">
        {{ state.isPlaying ? "Pause" : "Play" }}
      </button>

      <div class="video-player-progress-bar">
        <div class="video-player-progress" :style="{ width: state.progress + '%' }"></div>
      </div>

      <div class="video-player-volume-bar">
        <button class="video-player-control-btn" @click="toggleVolume">
          Volume
        </button>
        <input type="range" v-if="state.isVolumeVisible" v-model="state.volume" min="0" max="1" step="0.1" />
      </div>
    </div>
    <div class="progress">
      <el-progress></el-progress>
    </div>
    <div class="video-controls">
      <div @click="togglePlay" class="video-player-control">
        <el-icon v-if="state.isPlaying" size="40">
          <VideoPause />
        </el-icon>
        <el-icon v-else size="40">
          <VideoPlay />
        </el-icon>
      </div>
      <div>
        {{ floor(videoRef?.currentTime) }}
        /
        {{ floor(videoRef?.duration) }}
      </div>
      <div>倍速</div>
      <div>音量</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VideoList } from "@/apis/video.ts";
import { reactive, ref } from "vue";
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'
import { floor } from '@/utils/format'
const props = defineProps<{
  video: VideoList
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
});

const videoRef = ref<HTMLVideoElement | null>(null);

const togglePlay = () => {
  if (!videoRef.value) return
  state.isPlaying = !state.isPlaying;
  if (state.isPlaying) {
    videoRef.value.play();
  } else {
    videoRef.value.pause();
  }
};

const toggleVolume = () => {
  state.isVolumeVisible = !state.isVolumeVisible;
};

const updateProgress = () => {
  if (!videoRef.value) return
  const video = videoRef.value;
  const progress = (video.currentTime / video.duration) * 100;
  state.progress = Math.floor(progress);
};
</script>

<style scoped>
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-player-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-player-controls {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-player-control {
  cursor: pointer;
}

.video-player-progress-bar {
  width: 60%;
  height: 5px;
  background-color: #ccc;
}

.video-player-progress {
  height: 100%;
  background-color: #f00;
}

.video-player-volume-bar {
  margin-left: 20px;
  position: relative;
}
</style>
