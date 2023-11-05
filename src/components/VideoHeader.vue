<script setup lang="ts">
import type { Video } from '@/model/video';
import { apis } from '@/apis';
import { handleNetworkError } from '@/utils/request/RequestTools';
// import { formatTimestamp } from '@/utils/format';
import { useUserStore } from '@/stores/user';
import { ElMessage as message } from 'element-plus'
import type { Profile } from '@/model/profile';

const userSotre = useUserStore()

const props = defineProps({
    video: {
        type: Object as () => Video,
        required: true,
    },
});

const follow_status = ref(false)
const publisher_profile = ref<Profile>({} as Profile)

async function checkFollow() {
    const [err, data] = await apis.checkFollow(props.video.author_uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) return
    follow_status.value = data.status
}

async function getPublisherProfile() {
    const [err, data] = await apis.getProfile(props.video.author_uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) return
    publisher_profile.value = data.profile
}

async function refresh() {
    await checkFollow()
    await getPublisherProfile()
}

onMounted(async () => {
    refresh()
});

// 关注发布者
async function toggleFollow() {
    if (!userSotre.isLogin) {
        alert('请先登录')
        return
    }

    if (follow_status.value) {
        await unfollowPublisher()
    } else {
        await followPublisher()
    }

    follow_status.value = !follow_status.value
}

// 关注发布者
async function followPublisher() {
    const [err, data] = await apis.followUser(props.video.author_uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) return

    message({
      showClose: true,
      message: '关注成功',
      type: 'success'
    })
}

// 取消关注发布者
async function unfollowPublisher() {
    const [err, data] = await apis.unfollowUser(props.video.author_uuid)
    if (err) handleNetworkError(err)
    if (data?.code != 200) return
}
</script>

<template>
    <div class="p-4 mt-4 bg-white rounded-lg shadow-md">
        <h1 class="mt-2 mb-2 text-xl font-semibold text-gray-800">{{ video.name }}</h1>

        <!-- 发布者信息，各元素间设定间距 -->
        <div class="flex items-center">
            <!-- 发布者头像 -->
            <img :src="publisher_profile.avatar_url" alt="发布者头像" class="w-10 h-10 rounded-full" />
            <!-- 发布者昵称 -->
            <h2 class="ml-2 text-lg text-gray-800">{{ publisher_profile.nickname }}</h2>
            <!-- 关注按钮 -->
            <button @click="toggleFollow" class="px-4 py-2 ml-5 text-white bg-blue-500 rounded-md">
                {{ follow_status ? '取消关注' : '关注' }}
            </button>
        </div>


    </div>
</template>