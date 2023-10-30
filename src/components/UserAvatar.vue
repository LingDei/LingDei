<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();

</script>

<template>
    <!-- 用户头像 -->
    <div class="mr-4">
        <img :src="userStore.profile.avatar_url" alt="用户头像" class="w-10 h-10 rounded-full" />
    </div>
    <!-- 用户名和登录/注销按钮 -->
    <div v-if="!userStore.isLogin">
        <RouterLink to="/user/login" class="mr-2 text-gray-300 hover:text-white">登录</RouterLink>
        <RouterLink to="/user/register" class="text-gray-300 hover:text-white">注册</RouterLink>
    </div>

    <div v-else>
        <span class="mr-2 text-gray-300 hover:text-white">您好，{{ userStore.profile.nickname }}！</span>
        <button class="text-gray-300 hover:text-white" @click="userStore.logout">注销</button>
    </div>
</template>
  

  