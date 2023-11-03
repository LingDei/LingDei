<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { apis } from '@/apis'
import { onMounted, ref } from "vue"
import type { Category } from '@/model/category';
import { handleNetworkError } from '@/utils/request/RequestTools';
import router from '@/router';

interface Tab {
    type: string // default or category
    name: string
    path: string
    category?: Category
}

const tabs = ref<Tab[]>([
    { type: 'default', name: '首页', path: '/' },
    { type: 'default', name: '推荐', path: '/recommend' },
    { type: 'default', name: '关注', path: '/follow' },
])

onMounted(async () => {
    const [err, data] = await apis.getCategoryList()
    if (err) handleNetworkError(err)
    if (!data || data?.category_list.length === 0) return
    // 将分类加入tabs
    data.category_list.forEach((category: Category) => {
        tabs.value.push({
            type: 'category',
            name: category.name,
            path: `/category`,
            category: category
        })
    })
})

</script>

<template>
    <!-- 导航栏 -->
    <nav class="p-4 text-white bg-gradient-to-r from-blue-900 to-blue-800">
        <div class="container flex items-center justify-between mx-auto">
            <!-- Logo -->
            <img src="../assets/logo-white.svg" alt="logo" class="w-24 h-15" />

            <div class="flex items-center">
                <div class="flex items-center">
                    <!-- 用户头像 -->
                    <UserAvatar />
                </div>

                <!-- 顶部操作icon -->
                <div>
                    <!-- 投稿按钮 -->
                    <div class="header-upload-entry" @click="router.push({name:'upload'})">
                        <img src="@/assets/svgs/upload-icon.svg" alt="upload" class="header-upload-entry__icon" />
                        <span class="text-black header-upload-entry__text">投稿</span>
                    </div>

                </div>
            </div>
        </div>

        <div class="container mx-auto mt-4">
            <div class="flex space-x-4">
                <RouterLink v-for="(tab, index) in tabs" :key="index"
                    :to="{ path: tab.type != 'category' ? tab.path : tab.path + '/' + tab.category?.uuid }"
                    class="text-gray-300 hover:text-white">{{ tab.name }}</RouterLink>
            </div>
        </div>
    </nav>
</template>

<style>
.header-upload-entry {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 32px;
    width: 80px;
    border-radius: 16px;
    background-color: #fff;
    cursor: pointer;
    @apply font-normal;
}

.header-upload-entry__icon {
    width: 18px;
    height: 18px;
    color: #1a1a1a;
    @apply m-1;
}
</style>

  