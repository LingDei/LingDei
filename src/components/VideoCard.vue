<script setup lang="ts">
import type { Video } from '@/model/video';

defineProps({
    video: {
        type: Object as () => Video,
        required: true,
    },
});
</script>

<template>
    <div class="overflow-hidden bg-white rounded-lg shadow-md">
        <img :src="video.cover" :alt="video.title" class="object-cover w-full h-48" />
        <div class="p-4">
            <h2 class="text-xl font-semibold">{{ video.title }}</h2>
            <p class="text-gray-600">{{ video.description }}</p>
            <div class="mt-4">
                <span class="text-gray-500">观看次数: {{ video.views }}</span>
                <span class="ml-4 text-gray-500">发布日期: {{ video.date }}</span>
            </div>
        </div>
    </div>
</template>
