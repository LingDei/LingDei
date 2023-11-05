import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useVolumeStore = defineStore(
  'volume',
  () => {
    const volume = ref(50)
    const muted = ref(true)

    const changeVolume = (value: number) => {
      volume.value = value
      muted.value = false
    }

    const toggleMuted = () => {
      muted.value = !muted.value
    }

    return { volume, muted, toggleMuted, changeVolume }
  },
)
