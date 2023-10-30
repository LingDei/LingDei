<script setup lang="ts">
import { ref } from 'vue';
import { apis } from '@/apis'
import { handleNetworkError } from '@/utils/request/RequestTools';
import { ElMessage as message } from 'element-plus'
import router from '@/router';

const form = ref({
    username: '',
    password: ''
})

async function submit() {
    const [err, data] = await apis.register(form.value.username, form.value.password);
    if (err) handleNetworkError(err)
    if (data?.code !== 200) {
        message({
            showClose: true,
            message: "注册失败",
            type: 'error'
        })
        return
    }

    // 跳转到登录页
    router.push({ name: 'login' })
}

</script>

<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="p-8 bg-white rounded shadow-md w-96">
            <h1 class="mb-4 text-2xl font-semibold">用户注册</h1>
            <div>
                <div class="mb-6">
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-600">用户名</label>
                    <input type="text" v-model="form.username" id="username" name="username"
                        class="w-full p-3 border rounded">
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-600">密码</label>
                    <input type="password" v-model="form.password" id="password" name="password"
                        class="w-full p-3 border rounded">
                </div>
                <button type="submit" @click="submit"
                    class="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600">注册</button>
            </div>
            <div class="mt-4">
                <button @click="router.push({name: 'login'})" class="w-full p-3 text-white bg-green-500 rounded hover:bg-green-600">登录</button>
            </div>
        </div>
    </div>
</template>
  
<style></style>
  