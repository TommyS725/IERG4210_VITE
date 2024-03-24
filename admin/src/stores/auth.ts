import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Profile } from '@/types/profile'

export const useAuthStore = defineStore('auth', () => {
  const profile = ref<Profile | null>(null)
  const isLoading = ref(false)
  const authorized = computed(() => profile?.value?.admin === true)
  const startLoading = () => {
    isLoading.value = true
  }
  const stopLoading = () => {
    isLoading.value = false
  }
  const setProfile = (data: Profile) => {
    profile.value = data
  }
  return { profile, isLoading, authorized, startLoading, stopLoading, setProfile }
})
