<script setup lang="ts">
import { apis } from '@/apis'
import type { Collect } from '@/model/collect'
import { handleNetworkError } from '@/utils/request/RequestTools'

const collect_list = ref<Collect[]>([])
const page = ref(1)
const total = ref(0)

async function getData() {
  const [err, data] = await apis.getCollectList()
  if (err) handleNetworkError(err)
  if (data?.code !== 200) return
  collect_list.value = data.collect_list
  total.value = data.total
}

onMounted(() => {
  getData()
})

async function deleteCollect(collect: Collect) {
  const [err, data] = await apis.deleteCollect(collect.video_uuid)
  if (err) handleNetworkError(err)
  if (data?.code !== 200) return
  collect_list.value = collect_list.value.filter((item) => item.uuid !== collect.uuid)
}
</script>

<template>
  <div class="p-4 bg-white rounded-md shadow-md" style="min-height: 60vh">
    <h2 class="mb-4 text-lg font-bold">我的收藏</h2>
    <ElEmpty v-if="!collect_list.length" description="暂无收藏"></ElEmpty>
    <div class="grid grid-cols-2 gap-4">
      <VideoSmallCard
        v-for="collect in collect_list"
        :key="collect.uuid"
        :video="collect.video"
        :ButtonClick="() => deleteCollect(collect)"
      ></VideoSmallCard>
    </div>
  </div>
  <div class="page">
    <el-pagination
      v-model:current-page="page"
      :page-size="9"
      background
      layout="prev, pager, next"
      @update:current-page="getData"
      :total="total"
    />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}
</style>
