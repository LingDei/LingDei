<script setup lang="ts">
import { ref } from 'vue';
import { apis } from '@/apis'
import { useUserStore } from '@/stores/user'
import { handleNetworkError } from '@/utils/request/RequestTools';
import router from '@/router';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const userStore = useUserStore()
const form = ref({
    nickname: '',
    email: '',
    avatar_url: '',
    bio: ''
})

async function submit() {
    const [err, data] = await apis.getProfile();
    if (err) handleNetworkError(err)
    if (data?.code !== 200) return

    console.log(data.code)
}



const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

</script>

<template>
    <div>
        <div class="p-8 mx-auto bg-white rounded shadow-md">
            <h1 class="mb-4 text-2xl font-semibold">个人资料</h1>
            <div>
                <!-- 头像上传区域 -->
                <div class="mb-6">
                    <label for="avatar" class="block mb-2 text-sm font-medium text-gray-600">头像</label>
                    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </div>

                <div class="mb-6">
                    <label for="nickname" class="block mb-2 text-sm font-medium text-gray-600">昵称</label>
                    <input type="text" v-model="form.nickname" id="nickname" name="nickname"
                        class="w-4/12 p-3 border rounded">
                </div>

                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-600">邮箱</label>
                    <input type="text" v-model="form.email" id="email" name="email" class="w-4/12 p-3 border rounded">
                </div>

                <div class="mb-6">
                    <label for="bio" class="block mb-2 text-sm font-medium text-gray-600">个人简介</label>
                    <textarea v-model="form.bio" id="bio" name="bio" rows="5" class="w-5/12 p-3 border rounded"></textarea>
                </div>

                <!-- 保存按钮 -->
                <div class="flex justify-center">
                    <button type="submit" @click="submit"
                        class="w-3/12 p-3 text-white bg-blue-500 rounded hover:bg-blue-600">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
  