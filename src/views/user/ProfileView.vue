<script setup lang="ts">
import { ref } from 'vue';
import { apis } from '@/apis'
import { useUserStore } from '@/stores/user'
import { handleNetworkError, handleRequestError } from '@/utils/request/RequestTools';
import router from '@/router';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import type { Profile } from '@/model/profile';

const userStore = useUserStore()
const form = ref<Profile>({} as Profile)

onMounted(() => {
  init()
})

async function init() {
  const [err, data] = await apis.getProfile();
  if (err) handleNetworkError(err)
  if (data?.code !== 200) {
    handleRequestError(data)
    return
  }
  form.value = data.profile
}

async function submit() {
  console.log(form.value)
  const [err, data] = await apis.updateProfile(form.value.nickname, form.value.email);
  if (err) handleNetworkError(err)
  if (data?.code !== 200) return
  ElMessage.success('更新成功')
  router.go(0);
}

const imageUrl = ref('')

async function uploadAvatar(e: any) {
  const file = e.file
  const [err, data] = await apis.uploadAvatar(file)
  if (err) handleNetworkError(err)
  if (data?.code !== 200) return
  ElMessage.success('上传成功')
  return data.msg
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/jpg') {
    ElMessage.error('头像必须是 JPG/JEPG/PNG 格式！')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像不能超过2MB！')
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
          <el-upload class="avatar-uploader" :http-request="uploadAvatar"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </div>

        <div class="mb-6">
          <label for="nickname" class="block mb-2 text-sm font-medium text-gray-600">昵称</label>
          <input type="text" v-model="form.nickname" id="nickname" name="nickname" class="w-4/12 p-3 border rounded">
        </div>

        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-600">邮箱</label>
          <input type="text" v-model="form.email" id="email" name="email" class="w-4/12 p-3 border rounded">
        </div>

        <!-- <div class="mb-6">
          <label for="bio" class="block mb-2 text-sm font-medium text-gray-600">个人简介</label>
          <textarea v-model="form.bio" id="bio" name="bio" rows="5" class="w-5/12 p-3 border rounded"></textarea>
        </div> -->

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
  