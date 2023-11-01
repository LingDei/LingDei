<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="text-center">
            <h1 class="text-3xl text-indigo-600">404</h1>
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">页面不见啦~</h1>
            <p class="mt-6 text-base leading-7 text-gray-600">您访问的页面不存在，可能是因为您输入的网址不正确，或者该页面已被删除。</p>

            <!-- 倒计时 -->
            <div class="mt-6 text-base leading-7 text-gray-600">
                <span>将在 {{ count }} 秒后跳转到首页</span>
            </div>
        </div>
</div>
</template>

<script setup lang="ts">
// 3秒后跳转到首页
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const count = ref(3)
const router = useRouter()

onMounted(() => {
    setTimeout(() => {
        router.push('/')
    }, 3000)

    setInterval(() => {
        count.value--
    }, 1000)
})
</script>