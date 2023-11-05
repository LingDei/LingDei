import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Profile } from '@/model/profile'
import { apis } from '@/apis'
import { handleNetworkError } from '@/utils/request/RequestTools'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const profile = ref<Profile>({
    id: '',
    nickname: '',
    email: '',
    avatar_url: 'https://bucket.lingdei.doyi.online/avatars/default.png'
  })
  const fan_count = ref(0)

  async function refreshProfile() {
    const [err, data] = await apis.getMyProfile()
    if (err) handleNetworkError(err)
    if (!data) return
    profile.value = data.profile
  }

  async function refreshFanCount() {
    const [err, data] = await apis.getFanCount()
    if (err) handleNetworkError(err)
    if (!data) return
    fan_count.value = data.count
  }
  
  async function setToken(newToken: string) {
    token.value = newToken

    // 获取用户信息
    refreshProfile()

    // 获取粉丝数量
    refreshFanCount()
  }

  const username = computed(() => {
    return JSON.parse(atob(token.value.split('.')[1])).username
  })

  const isLogin = computed(() => {
    return token.value !== ''
  })

  const logout = () => {
    token.value = ''
    profile.value = {
      id: '',
      nickname: '',
      email: '',
      avatar_url: 'https://bucket.lingdei.doyi.online/avatars/default.png'
    }
  }

  return { token, isLogin, setToken, username, profile, logout, fan_count, refreshProfile, refreshFanCount }
},
  {
    persist: true
  })
