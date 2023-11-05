<script setup lang="ts">import { apis } from '@/apis';
import type { Collect } from '@/model/collect';
import { handleNetworkError } from '@/utils/request/RequestTools';

const collect_list = ref<Collect[]>([]);

async function init() {
    const [err, data] = await apis.getCollectList();
    if (err) handleNetworkError(err)
    if (data?.code !== 200) return
    collect_list.value = data.collect_list
}

onMounted(() => {
    init()
})

async function deleteCollect(collect: Collect) {
    const [err, data] = await apis.deleteCollect(collect.video_uuid);
    if (err) handleNetworkError(err)
    if (data?.code !== 200) return
    collect_list.value = collect_list.value.filter(item => item.uuid !== collect.uuid)
}

</script>

<template>
    <div class="p-4 bg-white rounded-md shadow-md">
        <h2 class="mb-4 text-lg font-bold">我的收藏</h2>
        <div class="grid grid-cols-2 gap-4">
            <VideoSmallCard v-for="collect in collect_list" :key="collect.uuid" :video="collect.video" :ButtonClick="() => deleteCollect(collect)"></VideoSmallCard>
        </div>
    </div>
</template>