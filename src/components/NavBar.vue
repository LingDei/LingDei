<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { apis } from '@/apis'
import type { Category } from '@/model/category';
import { handleNetworkError } from '@/utils/request/RequestTools';

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
                <!-- 用户头像 -->
                <UserAvatar />
            </div>
        </div>

        <div class="container mx-auto mt-4">
            <div class="flex space-x-4">
                <!-- 强制页面刷新 -->
                <RouterLink v-for="(tab, index) in tabs" :key="index"
                    :to="{ path: tab.path, query: tab.category ? { 'uuid': tab.category?.uuid } : {} }" class="text-gray-300 hover:text-white"
                    exact>{{ tab.name }}</RouterLink>
            </div>
        </div>
    </nav>
</template>

<style></style>

  