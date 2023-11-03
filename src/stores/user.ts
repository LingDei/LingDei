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


  async function setToken(newToken: string) {
    token.value = newToken

    // 获取用户信息
    const [err, data] = await apis.getProfile()
    if (err) handleNetworkError(err)
    if (!data) return
    profile.value = data.profile
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

  return { token, isLogin, setToken, username, profile, logout }
},
  {
    persist: true
  })
