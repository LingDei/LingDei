<script setup lang="ts">
import { usePlyrVue, PlyrVue } from "plyr-vue";
// import type { PlyrVueOptions, PlyrVueInstance } from "plyr-vue";
import "plyr-vue/dist/plyr-vue.css";
import { useRoute } from 'vue-router'
import { apis } from '@/apis'
import type { Video } from '@/model/video';
import { handleNetworkError } from '@/utils/request/RequestTools';

const route = useRoute()
const video = ref<Video>({} as Video)

const [registerVideoPlayer, videoPlayerInstance] = usePlyrVue({
    loop: { active: true },
});

onMounted(async () => {
    const id = route.params.id;
    console.log(id)

    const [err, data] = await apis.getVideo(id as string)
    if (err) handleNetworkError(err)
    if (!data || !data?.video) return
    video.value = data.video
    console.log(video.value)
    
    initVideoPlayer();
});

const initVideoPlayer = () => {
    videoPlayerInstance.value.source = {
        type: "video",
        title: "",
        sources: [
            {
                src: video.value.url,
                type: "video/mp4",
            },
        ],
        poster: video.value.thumbnail_url,
    };
    videoPlayerInstance.value.play();
};

</script>


<template>
    <div class="font-sans bg-gray-100">
        <div class="flex justify-center">
            <div class="w-full md:w-3/4 lg:w-2/3">
                <!-- 视频标题 -->
                <div class="p-4 mt-4 bg-white rounded-lg shadow-md">
                    <h1 class="mt-2 mb-2 text-xl font-semibold text-gray-800">{{ video.name }}</h1>
                </div>

                <!-- 视频播放器 -->
                <div class="relative mt-4 mb-6 bg-white rounded-lg shadow-md">
                    <div class="rounded-t-lg aspect-ratio-16/9">
                        <plyr-vue @register="registerVideoPlayer" />
                        <!-- <plyr-vue @register="registerVideoPlayer" ref="plyr">
                                <video controls playsinline :poster="video.thumbnail_url">
                                    <source :src="video.url" type="video/mp4" />
                                </video>
                            </plyr-vue> -->
                    </div>
                </div>

                <!-- 操作按钮 -->
                <div class="p-4 bg-white rounded-lg shadow-md">
                    <div class="flex items-center space-x-4">
                        <button class="flex items-center text-gray-500">
                            <img src="@/assets/svgs/thumb-icon.svg" alt="点赞" class="w-6 h-6" />
                            <span class="ml-2">点赞</span>
                        </button>
                        <button class="flex items-center text-gray-500">
                            <img src="@/assets/svgs/star-icon.svg" alt="收藏" class="w-6 h-6" />
                            <span class="ml-2">收藏</span>
                        </button>
                        <button class="flex items-center text-gray-500">
                            <img src="@/assets/svgs/share-icon.svg" alt="分享" class="w-6 h-6" />
                            <span class="ml-2">分享</span>
                        </button>
                    </div>
                </div>

                <!-- 评论区 -->
                <div class="p-4 mt-4 mb-4 rounded-lg shadow-md mb-bg-white">
                    <h2 class="mb-4 text-lg font-semibold text-gray-800">用户评论</h2>
                    <!-- Individual Comments -->
                    <div class="space-y-4">
                        <!-- Comment 1 -->
                        <div class="flex space-x-2">
                            <img src="https://bucket.lingdei.doyi.online/avatars/default.png" alt="User Avatar"
                                class="w-10 h-10 rounded-full">
                            <div>
                                <h3 class="font-semibold text-gray-800">用户名</h3>
                                <p class="text-gray-600">这是一条用户评论。</p>
                            </div>
                        </div>
                        <!-- Comment 2 -->
                        <div class="flex space-x-2">
                            <img src="https://bucket.lingdei.doyi.online/avatars/default.png" alt="User Avatar"
                                class="w-10 h-10 rounded-full">
                            <div>
                                <h3 class="font-semibold text-gray-800">另一个用户</h3>
                                <p class="text-gray-600">这是另一条用户评论。</p>
                            </div>
                        </div>
                    </div>
                    <!-- Comment Input -->
                    <div class="mt-4">
                        <input type="text" placeholder="添加评论..." class="w-full p-2 border border-gray-300 rounded">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

