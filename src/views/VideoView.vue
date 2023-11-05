<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import { useRoute } from 'vue-router'
import { apis } from '@/apis'
import type { Video, VideoStatus } from '@/model/video';
import { handleNetworkError, handleRequestError } from '@/utils/request/RequestTools';
import { Icon } from '@iconify/vue';
import { useUserStore } from '@/stores/user';

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

// 点赞
async function toggleLike() {
    // 检查目前的点赞状态
    if (video_status.value.be_liked) {
        // 取消点赞
        const [err, data] = await apis.deleteLike(video.value.uuid)
        if (err) handleNetworkError(err)
        if (data?.code != 200) {
            handleRequestError(data)
            return
        }
        video_status.value.be_liked = false
    } else {
        // 点赞
        const [err, data] = await apis.addLike(video.value.uuid)
        if (err) handleNetworkError(err)
        if (data?.code != 200) {
            handleRequestError(data)
            return
        }
        video_status.value.be_liked = true
    }
}

// 收藏
async function toggleCollect() {
    // 检查目前的收藏状态
    if (video_status.value.be_collected) {
        // 取消收藏
        const [err, data] = await apis.deleteCollect(video.value.uuid)
        if (err) handleNetworkError(err)
        if (data?.code != 200) {
            handleRequestError(data)
            return
        }
        video_status.value.be_collected = false
        console.log(data)
    } else {
        // 收藏
        const [err, data] = await apis.addCollect(video.value.uuid)
        if (err) handleNetworkError(err)
        if (data?.code != 200) {
            handleRequestError(data)
            return
        }
        video_status.value.be_collected = true
        console.log(data)
    }
}

// 分享
function shareVideo() {
    // 弹出分享框，展示视频链接
    const url = window.location.href
    const title = video.value.name
    const shareData = {
        title: title,
        url: url,
    }

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    } else {
        console.log('navigator.share not supported')
    }
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
                <div class="p-4 bg-white rounded-lg shadow-md">
                    <div class="flex items-center space-x-4">
                        <button class="flex items-center text-gray-500" @click="toggleLike">
                            <Icon :icon="video_status.be_liked ? 'mdi:thumb-up' : 'mdi:thumb-up-outline'"
                                :color="video_status.be_liked ? '#00aeec' : ''" class="w-6 h-6" />
                            <span class="ml-2">点赞</span>
                        </button>
                        <button class="flex items-center text-gray-500" @click="toggleCollect">
                            <Icon :icon="video_status.be_collected ? 'mdi:star' : 'mdi:star-outline'"
                                :color="video_status.be_collected ? '#00aeec' : ''" class="w-6 h-6" />
                            <span class="ml-2">收藏</span>
                        </button>
                        <button class="flex items-center text-gray-500" @click="shareVideo">
                            <Icon icon="uil:share" class="w-6 h-6" />
                            <span class="ml-2">分享</span>
                        </button>
                    </div>
                </div>

                <!-- 评论区 -->
                <CommentCard v-if="Object.keys(video).length > 0" :video_uuid="video.uuid"></CommentCard>
            </div>
        </div>
    </div>
</template>

<style>
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>