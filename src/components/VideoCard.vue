<script setup lang="ts">
import type { Video } from '@/model/video';
import router from '@/router';
import { formatTimestamp } from '@/utils/format';

const props = defineProps({
    video: {
        type: Object as () => Video,
        required: true,
    },
});

const handleClick = () => {
    router.push({ name: 'video', params: { id: props.video.uuid } });
};
</script>

<template>
    <div class="overflow-hidden bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg" @click="handleClick">
        <img :src="video.thumbnail_url" :alt="video.name" class="object-cover w-full h-48" />
        <div class="p-4">
            <!-- 使内容在一行展示 -->
            <h2 class="text-xl font-semibold truncate">{{ video.name }}</h2>
            <!-- <p class="text-gray-600">{{ video.description }}</p> -->
            <div class="mt-4">
                <span class="text-gray-500">观看次数: {{ video.views }}</span>
                <span class="ml-4 text-gray-500">发布日期: {{ formatTimestamp(video.timestamp) }}</span>
            </div>
        </div>
    </div>
</template>
