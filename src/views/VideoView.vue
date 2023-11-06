<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import { useRoute } from 'vue-router'
import { apis } from '@/apis'
import type { Video, VideoStatus } from '@/model/video';
import { handleNetworkError, handleRequestError } from '@/utils/request/RequestTools';
import { Icon } from '@iconify/vue';
import { useUserStore } from '@/stores/user';
import VideoBar from '@/components/VideoBar.vue';

const userStore = useUserStore()
const route = useRoute()
const video = ref<Video>({} as Video)
const video_status = ref<VideoStatus>({} as VideoStatus)

// 增加视频播放量
async function addVideoViews() {
    const [err, data] = await apis.addVideoViews(video.value.uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) return
}

onMounted(async () => {
    const id = route.params.id;
    console.log(id)

    const [err, data] = await apis.getVideo(id as string)
    if (err) handleNetworkError(err)
    if (!data || !data?.video) return
    video.value = data.video
    console.log(video.value)

    addVideoViews();

    if (!userStore.isLogin) return
    checkLike();
    checkCollect();
});

// 检查是否被点赞
async function checkLike() {
    const [err, data] = await apis.checkLike(video.value.uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) {
        video_status.value.be_liked = false
        return
    }
    video_status.value.be_liked = data.status
}

// 检查是否被收藏
async function checkCollect() {
    const [err, data] = await apis.checkCollect(video.value.uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) {
        video_status.value.be_collected = false
        return
    }
    video_status.value.be_collected = data.status
}

</script>


<template>
    <div class="font-sans bg-gray-100">
        <div class="flex justify-center">
            <div class="w-full md:w-3/4 lg:w-2/3">
                <!-- 视频标题 -->
                <VideoHeader v-if="Object.keys(video).length > 0" :video="video"></VideoHeader>

                <!-- 视频播放器 -->
                <div class="relative mt-4 mb-3 bg-white rounded-lg shadow-md">
                    <div class="rounded-t-lg aspect-ratio-16/9">
                        <VideoPlayer v-if="Object.keys(video).length > 0" :video="video" :playable-video="true">
                        </VideoPlayer>
                        <el-empty v-else></el-empty>
                    </div>
                </div>

                <!-- 操作按钮 -->
                <VideoBar v-if="Object.keys(video).length > 0" :video_uuid="video.uuid"></VideoBar>

                <!-- 评论区 -->
                <CommentCard v-if="Object.keys(video).length > 0" :video_uuid="video.uuid"></CommentCard>
            </div>
        </div>
    </div>
</template>
