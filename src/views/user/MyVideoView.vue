<script setup lang="ts">import { apis } from '@/apis';
import type { Video } from '@/model/video';
import { handleNetworkError } from '@/utils/request/RequestTools';


const videos = ref<Video[]>([]);
            

async function init() {
    const [err, data] = await apis.getVideoList();
    if (err) handleNetworkError(err)
    if (data?.code !== 200) return
    videos.value = data.video_list
}

onMounted(() => {
    init()
})

</script>

<template>
    <div class="p-4 bg-white rounded-md shadow-md">
        <h2 class="mb-4 text-lg font-bold">我的视频</h2>
        <div class="grid grid-cols-2 gap-4">
            <VideoSmallCard v-for="video in videos" :key="video.uuid" :video="video"></VideoSmallCard>
        </div>
    </div>
</template>