<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { apis } from '@/apis'
import { onMounted, ref } from "vue"
import type { Category } from '@/model/category';
import { handleNetworkError } from '@/utils/request/RequestTools';
import { ElMessage as message } from 'element-plus'
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

const search_query = ref('')

const search = () => {
    if (!search_query.value) {
        message.error('请输入搜索关键字')
        return
    }

    // 跳转到搜索页面，强制刷新
    window.location.href = `/search?keyword=${search_query.value}`
}

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
                <!-- 搜索框 -->
                <div class="flex items-center mr-10">
                    <input type="text" v-model="search_query" placeholder="搜索"
                        class="p-2 text-gray-800 bg-gray-200 rounded-lg" />
                    <button @click="search" class="p-2 ml-2 text-gray-800 bg-gray-100 rounded-lg w-18">搜索</button>
                </div>

                <div class="flex items-center">
                    <!-- 用户头像 -->
                    <UserAvatar />
                </div>

                <!-- 顶部操作icon -->
                <div>
                    <!-- 投稿按钮 -->
                    <div class="header-upload-entry" @click="router.push({ name: 'upload' })">
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

  