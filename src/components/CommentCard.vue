<script setup lang="ts">
import type { Comment } from '@/model/comment';
import { apis } from '@/apis';
import { handleNetworkError } from '@/utils/request/RequestTools';
import { formatTimestamp } from '@/utils/format';
import { useUserStore } from '@/stores/user';

const userSotre = useUserStore()

const props = defineProps({
    video_uuid: {
        type: String,
        required: true,
    },
})

const commentList = ref<Comment[]>([] as Comment[])

const form = ref({
    content: '',
})

async function refresh() {
    console.log(props.video_uuid)
    const [err, data] = await apis.getCommentList(props.video_uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) return
    commentList.value = data.comment_list
    console.log(data)
}

onMounted(async () => {
    refresh()
});

async function submit() {
    const [err, data] = await apis.addComment(props.video_uuid, form.value.content)
    if (err) handleNetworkError(err)
    if (data?.code != 200) return
    console.log(data)

    // 刷新评论列表
    refresh();
    form.value.content = ''
}

async function deleteComment(uuid: string) {
    const [err, data] = await apis.deleteComment(uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) return
    console.log(data)

    // 刷新评论列表
    refresh();
}

</script>

<template>
    <div class="p-4 mt-4 mb-4 bg-white rounded-lg shadow-md">
        <h2 class="mb-4 text-lg font-semibold text-gray-800">用户评论</h2>
        <!-- Individual Comments -->
        <div class="space-y-4">
            <!-- Comment，要求显示评论用户的头像，昵称，评论内容和评论时间 -->
            <div class="flex space-x-2" v-for="comment in commentList" :key="comment.uuid">
                <img :src="comment.profile.avatar_url ? comment.profile.avatar_url : 'https://bucket.lingdei.doyi.online/avatars/default.png'"
                    class="w-10 h-10 rounded-full">
                <div>
                    <h3 class="font-semibold text-gray-800">{{ comment.profile.nickname }}</h3>
                    <p class="text-gray-600">{{ comment.content }}</p>

                    <div class="flex space-x-2">
                        <p class="mt-1 text-xs text-gray-400">{{ formatTimestamp(comment.timestamp) }}</p>
                        <div class="mt-1 text-xs text-gray-400" v-if="comment.user_uuid == userSotre.profile.id">
                            <el-popconfirm title="确认删除？" confirmButtonText="确认" cancelButtonText="取消"
                                @confirm="deleteComment(comment.uuid)">
                                <template #reference>
                                    <button class="text-blue-500 hover:text-blue-400 focus:outline-none">删除</button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- 评论发送栏，要求提交按钮在输入框的最右边 -->
        <div class="mt-4">
            <div class="flex items-center justify-between">
                <input type="text" placeholder="添加评论..." class="w-full p-2 mr-2 border border-gray-300 rounded"
                    v-model="form.content" />
                <button
                    class="w-20 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
                    @click="submit">提交</button>
            </div>
        </div>
    </div>
</template>