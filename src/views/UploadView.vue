<script setup lang="ts">
import { apis } from '@/apis'
import type { Category } from '@/model/category';
import { handleNetworkError } from '@/utils/request/RequestTools';

// const handleSubmit = async (e: Event) => {
//     const form = e.target as HTMLFormElement
//     const formData = new FormData(form)
//     const [err, data] = await apis.uploadVideo(formData)
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(data)
// }

const categoryList = ref<Category[]>([])

onMounted(async () => {
    const [err, data] = await apis.getCategoryList()
    if (err) handleNetworkError(err)
    if (!data || data?.category_list.length === 0) return
    categoryList.value = data.category_list
})
</script>

<template>
    <div class="p-4 bg-gray-100">
        <div class="max-w-4xl p-8 mx-auto bg-white rounded shadow-lg">
            <h1 class="mb-4 text-2xl font-semibold">视频投稿</h1>
            <form>
                <div class="mb-4">
                    <label for="videoTitle" class="block text-gray-600">视频标题</label>
                    <input type="text" id="videoTitle" name="videoTitle"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200">
                </div>
                <div class="mb-4">
                    <label for="videoDescription" class="block text-gray-600">视频描述</label>
                    <textarea id="videoDescription" name="videoDescription"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"></textarea>
                </div>
                <div class="mb-4">
                    <label for="videoCategory" class="block text-gray-600">视频分类</label>
                    <div class="relative">
                        <select id="videoCategory" name="videoCategory"
                            class="w-full p-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring focus:ring-blue-200">
                            <option v-for="(category, index) in categoryList" :key="index" :value="category.uuid">{{
                                category.name }}</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 pointer-events-none">
                            <el-icon>
                                <el-icon-arrowDownBold />
                            </el-icon>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="videoFile" class="block text-gray-600">视频文件</label>
                    <el-upload class="upload-demo" drag
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
                        <el-icon class="el-icon--upload"><el-icon-upload-filled /></el-icon>
                        <div class="el-upload__text">
                            把视频拖到这里或者 <em>点击上传</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                最大支持4GB的mp4文件
                            </div>
                        </template>
                    </el-upload>
            </div>
            <div class="mb-4 text-center">
                <button type="submit" class="w-3/12 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">提交视频</button>
            </div>
        </form>
    </div>
</div></template>