<script setup lang="ts">
import { ref } from 'vue';
import { apis } from '@/apis'
import { onMounted } from 'vue';
import { handleNetworkError } from '@/utils/request/RequestTools';
import type { Profile } from '@/model/profile';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const profile = ref<Profile>();

interface Tab {
    name: string
    title: string
}

const tabs = ref<Tab[]>([
    { title: '我的视频', name: 'my_video' },
    { title: '我的收藏', name: 'my_star' },
    { title: '个人资料', name: 'profile' },
])

async function getFanCount() {
    const [err, data] = await apis.getFanCount();
    if (err) handleNetworkError(err)
    if (data?.code !== 200) return
    userStore.fan_count = data.count
    console.log(data)
}

async function init() {
    const [err, data] = await apis.getProfile();
    if (err) handleNetworkError(err)
    if (data?.code !== 200) return
    profile.value = data.profile

    getFanCount()
}

onMounted(() => {
    init()
})

</script>

<template>
    <div class="bg-gray-100">
        <div class="container p-4 mx-auto">
            <!-- 渐变背景 -->
            <div class="px-4 py-8 mb-8 bg-blue-500 rounded-lg shadow-md">
                <!-- 靠左侧1/3位置 -->
                <div class="flex items-center ml-5">
                    <img class="w-20 h-20 mr-4 rounded-full"
                        :src="profile?.avatar_url ? profile?.avatar_url : 'https://bucket.lingdei.doyi.online/avatars/default.png'"
                        alt="头像">
                    <div>
                        <h2 class="mb-2 text-2xl font-bold text-white">{{ profile?.nickname }}</h2>
                        <p class="text-gray-100">{{ profile?.email }}</p>
                    </div>

                    <!-- 粉丝数 -->
                    <div class="flex items-center ml-auto mr-5">
                        <p class="mr-2 text-xl font-bold text-white">{{ userStore.fan_count }}</p>
                        <p class="text-gray-100">粉丝</p>
                    </div>
                </div>
            </div>

            <!-- Tab 栏 -->
            <div class="flex items-center mb-8">
                <RouterLink v-for="(tab, index) in tabs" :key="index" :to="{ name: tab.name }"
                    class="px-4 py-2 text-sm font-medium text-gray-700 rounded hover:bg-gray-200">{{ tab.title }}
                </RouterLink>
            </div>

            <!-- Tab 内容 -->
            <RouterView></RouterView>

        </div>
    </div>
</template>
  
<style></style>
  