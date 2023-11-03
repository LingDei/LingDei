<script setup lang="ts">
import { apis } from '@/apis'
import type { Category } from '@/model/category';
import { handleNetworkError } from '@/utils/request/RequestTools';
import { uploadFile } from '@/utils/request/upload';
import type { UploadInstance } from 'element-plus'
import router from '@/router';

const categoryList = ref<Category[]>([])

onMounted(async () => {
    init()
})

const uploadRef = ref<UploadInstance>()
const allow_upload = ref(true)
const uploadProgress = ref(0)
const uploadComplete = computed(() => uploadProgress.value == 100)

function uploadProgressChange(e: any) {
    uploadProgress.value = Math.round(e * 100) / 100
}

const upload_token = ref('')

async function init() {
    // 获取分类列表
    const [err, data] = await apis.getCategoryList()
    if (err) handleNetworkError(err)
    if (!data || data?.category_list.length === 0) return
    categoryList.value = data.category_list

    // 获取上传token
    const [err2, data2] = await apis.getUploadToken();
    if (err2) handleNetworkError(err2)
    if (!data2 || !data2?.upload_token) return
    upload_token.value = data2.upload_token
    form.value.uuid = data2.video_uuid
}

async function uploadVideo(e: any) {
    allow_upload.value = false
    await uploadFile(upload_token.value, form.value.uuid, e.file, uploadProgressChange)
}

const form = ref({
    uuid: '',
    name: '',
    category_uuid: ''
})

async function submit() {
    const [err, data] = await apis.addVideo(form.value.uuid, form.value.name, form.value.category_uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) {
        ElMessage.error('投稿失败')
        return
    }
    console.log(data)

    // 弹出提示
    ElMessage.success('视频上传成功')

    // 跳转到视频详情页
    setTimeout(() => {
        router.push({
            name: 'video', params: { id: form.value.uuid }
        })
    }, 2000)
}

function cancelUpload() {
    allow_upload.value = true
}

function clearFile() {
    uploadRef.value?.clearFiles()
}

async function completeUpload(e: any) {
    console.log("success")
    console.log(e)
}
</script>

<template>
    <div class="p-4 bg-gray-100">
        <div class="max-w-4xl p-8 mx-auto bg-white rounded shadow-lg">
            <h1 class="mb-4 text-2xl font-semibold">视频投稿</h1>
            <div>
                <div class="mb-4">
                    <label for="videoTitle" class="block text-gray-600">视频标题</label>
                    <input v-model="form.name" type="text" id="videoTitle" name="videoTitle"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" />
                </div>
                <div class="mb-4">
                    <label for="videoDescription" class="block text-gray-600">视频描述</label>
                    <textarea id="videoDescription" name="videoDescription"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"></textarea>
                </div>
                <div class="mb-4">
                    <label for="videoCategory" class="block text-gray-600">视频分类</label>
                    <div class="relative">
                        <select v-model="form.category_uuid" id="videoCategory" name="videoCategory"
                            class="w-full p-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring focus:ring-blue-200">
                            <option v-for="(category, index) in categoryList" :key="index" :value="category.uuid">
                                {{ category.name }}
                            </option>
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
                    <el-upload ref="uploadRef" class="upload-demo" drag :http-request="uploadVideo" :limit="1" accept=".mp4"
                        :disabled="!allow_upload" :show-file-list="false" :on-success="completeUpload"
                        :on-exceed="clearFile" :before-upload="clearFile">
                        <div v-if="allow_upload"> <el-icon class="el-icon--upload"><el-icon-film /></el-icon>
                            <div class="el-upload__text">
                                把视频拖到这里或者 <em>点击上传</em>
                            </div>
                        </div>

                        <el-progress v-else :width="100" type="circle" :percentage="uploadProgress"
                            :status="uploadComplete ? 'success' : ''" />

                        <template #tip>
                            <div class="el-upload__tip">
                                最大支持4GB的mp4文件
                            </div>
                        </template>
                    </el-upload>
                </div>
                <div class="mb-4 text-center">
                    <button @click="cancelUpload" class="w-3/12 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        v-if="!allow_upload">取消上传</button>
                </div>
                <div class="mb-4 text-center">
                    <button @click="submit"
                        class="w-3/12 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">提交视频</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
