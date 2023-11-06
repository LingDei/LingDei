<script setup lang="ts">
import { apis } from '@/apis'
import type { Video, VideoStatus } from '@/model/video';
import { handleNetworkError, handleRequestError } from '@/utils/request/RequestTools';
import { Icon } from '@iconify/vue';
import { useUserStore } from '@/stores/user';
import { ElMessage as message } from 'element-plus'

const userStore = useUserStore()
const video = ref<Video>({} as Video)
const video_status = ref<VideoStatus>({} as VideoStatus)

// 增加视频播放量
async function addVideoViews() {
    const [err, data] = await apis.addVideoViews(video.value.uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) return
}

const props = defineProps({
    video_uuid: {
        type: String,
        required: true,
    },
});

onMounted(async () => {
    const [err, data] = await apis.getVideo(props.video_uuid)
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
        message({
            showClose: false,
            message: '点赞成功',
            type: 'success'
        })
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
    } else {
        // 收藏
        const [err, data] = await apis.addCollect(video.value.uuid)
        if (err) handleNetworkError(err)
        if (data?.code != 200) {
            handleRequestError(data)
            return
        }
        video_status.value.be_collected = true
        message({
            showClose: false,
            message: '收藏成功',
            type: 'success'
        })
    }
}

const shareData = ref({
    title: '',
    url: '',
})

// 分享
function shareVideo() {
    // 弹出分享框，展示视频链接
    const url = window.location.href
    const title = video.value.name
    shareData.value = {
        title,
        url,
    }
}

// 复制链接
function copyURL() {
    const input = document.createElement('input')
    input.value = shareData.value.url
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    message({
        showClose: false,
        message: '复制成功',
        type: 'success'
    })
    
}

</script>


<template>
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

            <el-popover placement="bottom" :title="video.name" :width="420" trigger="click">
                <template #reference>
                    <button class="flex items-center text-gray-500" @click="shareVideo">
                        <Icon icon="uil:share" class="w-6 h-6" />
                        <span class="ml-2">分享</span>
                    </button>
                </template>

                <div class="flex">
                    <input class="w-10/12 mt-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-md"
                        :value="shareData.url" readonly />
                    <button class="mt-2 ml-2 text-gray-500 border rounded-md" @click="copyURL">
                        <span class="ml-3 mr-3">复制</span>
                    </button>
                </div>

            </el-popover>
        </div>
    </div>
</template>
 