import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useVolumeStore = defineStore(
  'volume',
  () => {
    const volume = ref(50)
    const muted = ref(true)

    const changeVolume = (value: number) => {
      volume.value = value
    }

    const changeMuted = (value: boolean) => {
      muted.value = value
    }

    return { volume, muted, changeMuted, changeVolume }
  },
)
