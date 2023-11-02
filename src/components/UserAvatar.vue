<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();
</script>


<template>
    <!-- 用户头像 -->
    <!-- 用户头像容器 -->
    <div class="relative inline-block mr-4">
        <!-- 用户头像 -->
        <img :src="userStore.profile.avatar_url" alt="用户头像" class="w-10 h-10 rounded-full hover-zoom" />

        <!-- 下拉菜单 -->
        <div class="absolute left-0 hidden w-40 p-2 text-black bg-white border rounded-lg shadow-md top-12 hover-menu">
            <!-- 菜单内容 -->
            <div>
                <div v-if="userStore.isLogin">
                    <!-- 已登录 -->
                    <RouterLink :to="{ name: 'center' }" class="block p-2 rounded hover:bg-gray-200">个人中心</RouterLink>
                    <a href="#" class="block p-2 rounded hover:bg-gray-200" @click="userStore.logout">注销</a>
                </div>
                <div v-else>
                    <!-- 未登录 -->
                    <RouterLink :to="{ name: 'login' }" class="block p-2 rounded hover:bg-gray-200">登录</RouterLink>
                    <RouterLink :to="{ name: 'register' }" class="block p-2 rounded hover:bg-gray-200">注册</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
  

<style scoped>
.hover-zoom {
    /* 添加过渡效果，使放大平滑 */
    transition: transform 0.2s;
}

.hover-zoom:hover {
    /* 鼠标悬浮时放大到1.2倍大小，向下移动 */
    transform: scale(1.5) translateY(10px);
}

/* 下拉菜单样式 */
.hover-menu {
    display: none;
    position: absolute;
    z-index: 1;
    /* 根据需要调整下拉菜单的样式，比如背景颜色、边框、内边距等 */
}

/* 鼠标悬浮在用户头像容器时显示下拉菜单 */
.relative:hover .hover-menu {
    display: block;
}
</style>
