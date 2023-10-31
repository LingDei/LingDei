<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { apis } from '@/apis'
import type { Category } from '@/model/category';
import { handleNetworkError } from '@/utils/request/RequestTools';

const categories = ref<Category[]>([])

onMounted(async () => {
    const [err, data] = await apis.getCategoryList()
    if (err) handleNetworkError(err)
    if (!data || data?.category_list.length === 0) return
    categories.value = data.category_list
})

</script>

<template>
    <!-- 导航栏 -->
    <nav class="p-4 text-white bg-gradient-to-r from-blue-900 to-blue-800">
        <div class="container flex items-center justify-between mx-auto">
            <!-- 引用assets下的logo.svg -->
            <img src="../assets/logo-white.svg" alt="logo" class="w-24 h-15" />

            <!-- <a href="#" class="text-3xl font-bold">灵嘚</a> -->

            <div class="flex items-center">
                <!-- 用户头像 -->
                <UserAvatar />
            </div>
        </div>

        <div class="container mx-auto mt-4">
            <div class="flex space-x-4">
                <RouterLink to="/" class="text-gray-300 hover:text-white">首页</RouterLink>
                <RouterLink to="/recommend" class="text-gray-300 hover:text-white">推荐</RouterLink>
                <RouterLink to="/follow" class="text-gray-300 hover:text-white">关注</RouterLink>
                <RouterLink v-for="category in categories" :key="category.uuid" :to="`/category?uuid=${category.uuid}`"
                    class="text-gray-300 hover:text-white">{{ category.name }}</RouterLink>
            </div>
        </div>
    </nav>
</template>
  

  