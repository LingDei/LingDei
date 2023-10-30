import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')

  function setToken(newToken: string) {
    token.value = newToken
  }

  const username = computed(() => {
    return JSON.parse(atob(token.value.split('.')[1])).username
  })

  const isLogin = computed(() => {
    return token.value !== ''
  })

  return { token, isLogin, setToken, username }
},
  {
    persist: true
  })
