<script setup lang="ts">import { apis } from '@/apis';
import type { Like } from '@/model/like';
import { handleNetworkError } from '@/utils/request/RequestTools';

const likes = ref<Like[]>([]);

async function init() {
    const [err, data] = await apis.getLikeList();
    if (err) handleNetworkError(err)
    if (data?.code !== 200) return
    likes.value = data.like_list
}

onMounted(() => {
    init()
})

</script>

<template>
    <div class="p-4 bg-white rounded-md shadow-md">
        <h2 class="mb-4 text-lg font-bold">我的收藏</h2>
        <div class="grid grid-cols-2 gap-4">
            <VideoSmallCard v-for="like in likes" :key="like.uuid" :video="like.video"></VideoSmallCard>
        </div>
    </div>
</template>