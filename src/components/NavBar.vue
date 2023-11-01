<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { apis } from '@/apis'
import { onMounted, ref, watch } from "vue"
import type { Category } from '@/model/category';
import { handleNetworkError } from '@/utils/request/RequestTools';
import { Watch } from '@element-plus/icons-vue';

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

const category_tabs = ref<Tab[]>([])

onMounted(async () => {
    const [err, data] = await apis.getCategoryList()
    if (err) handleNetworkError(err)
    if (!data || data?.category_list.length === 0) return
    // 将分类加入category_tabs
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
                    <div class="header-upload-entry">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="header-upload-entry__icon">
                            <path
                                d="M12.0824 10H14.1412C15.0508 10 15.7882 10.7374 15.7882 11.6471V12.8824C15.7882 13.792 15.0508 14.5294 14.1412 14.5294H3.84707C2.93743 14.5294 2.20001 13.792 2.20001 12.8824V11.6471C2.20001 10.7374 2.93743 10 3.84707 10H5.90589"
                                stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path d="M8.99413 11.2353L8.99413 3.82353" stroke="currentColor" stroke-width="1.7"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M12.0823 6.29413L8.9941 3.20589L5.90587 6.29413" stroke="currentColor"
                                stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <span class="text-black header-upload-entry__text">投稿</span>
                    </div>

                </div>
            </div>
        </div>

        <div class="container mx-auto mt-4">
            <div class="flex space-x-4">
                <RouterLink v-for="(tab, index) in tabs" :key="index"
                    :to="{ path: tab.path, query: tab.category ? { 'uuid': tab.category?.uuid } : {} }"
                    class="text-gray-300 hover:text-white">{{ tab.name }}</RouterLink>

                <!-- <a v-for="(tab, index) in category_tabs" :key="index+tabs.length"
                        :href="tab.path + (tab.category ? '?uuid=' + tab.category?.uuid : '')"
                        class="text-gray-300 hover:text-white">{{ tab.name }}</a> -->
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

  