<script setup lang="ts">
import type { Video } from '@/model/video';
import router from '@/router';

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
    <div class="flex items-center p-2 bg-gray-200 rounded-md" @click="handleClick">
        <img class="object-cover w-16 h-16 rounded" :src="video.thumbnail_url" alt="视频缩略图">
        <p class="ml-4">{{ video.name }}</p>
    </div>
</template>
