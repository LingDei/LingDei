<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();

</script>

<template>
    <!-- 导航栏 -->
    <nav class="p-4 text-white bg-gradient-to-r from-blue-900 to-purple-900">
        <div class="container flex items-center justify-between mx-auto">
            <a href="#" class="text-3xl font-bold">灵嘚</a>

            <div class="flex items-center">
                <!-- 用户头像 -->
                <div class="mr-4">
                    <img :src="userStore.profile.avatar_url" alt="用户头像" class="w-10 h-10 rounded-full" />
                </div>
                <!-- 用户名和登录/注销按钮 -->
                <div>
                    <RouterLink to="/user/login" class="mr-2 text-gray-300 hover:text-white">登录</RouterLink>
                    <RouterLink to="/user/register" class="text-gray-300 hover:text-white">注册</RouterLink>
                </div>
            </div>
        </div>

        <div class="container mx-auto mt-4">
            <div class="flex space-x-4">
                <RouterLink to="/" class="text-gray-300 hover:text-white">首页</RouterLink>
                <RouterLink to="/recommend" class="text-gray-300 hover:text-white">推荐</RouterLink>
                <RouterLink to="/follow" class="text-gray-300 hover:text-white">关注</RouterLink>
            </div>
        </div>
    </nav>
</template>
  

  