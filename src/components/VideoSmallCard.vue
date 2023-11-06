<script setup lang="ts">
import type { Video } from '@/model/video';
import router from '@/router';
import { Close } from '@element-plus/icons-vue';

const props = defineProps({
    video: {
        type: Object as () => Video,
        required: true,
    },
    ButtonClick: {
        type: Function as () => any,
        required: true,
    },
});

const handleClick = () => {
    router.push({ name: 'video', params: { id: props.video.uuid } });
};
</script>

<template>
    <div class="flex items-center p-2 bg-gray-200 rounded-md">
        <img class="object-cover w-16 h-16 rounded" :src="video.thumbnail_url" alt="视频缩略图" @click="handleClick">
        <p class="ml-4" @click="handleClick">{{ video.name }}</p>
        <el-button class="ml-auto" type="warning" size="small" :icon="Close" @click="ButtonClick"></el-button>
    </div>
</template>
