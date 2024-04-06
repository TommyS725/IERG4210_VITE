<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import getApiUrl from '@/lib/getApiUrl'

const { profile } = useAuthStore()

const logoutUrl = getApiUrl('auth/logout')
</script>

<template>
  <header class="py-2 px-4 w-full bg-slate-800 flex justify-between shadow-lg overflow-x-auto">
    <div class="flex gap-1">
      <RouterLink
        :to="{ name: 'home' }"
        class="text-2xl text-white font-mono font-semibold hover:underline"
        >Admin Panel</RouterLink
      >
    </div>
    <div class="flex items-center space-x-4">
      <div v-if="profile" class="flex items-center space-x-4">
        <span class="text-white font-bold text-lg">{{ profile.username }}</span>
        <span class="text-white font-bold text-lg">{{ profile.email }}</span>
        <div class="space-x-2">
          <a
            href ="/"
            class="hover:font-bold hover:text-lg mx-1 text-white font-semibold text-base underline-offset-1 hover:underline"
            >Back</a
          >
          <span class="border-l-2" aria-hidden></span>
          <a
            :href="logoutUrl"
            class="hover:font-bold hover:text-lg text-white font-semibold text-base underline-offset-1 hover:underline"
            >Logout</a
          >

        </div>
      </div>
    </div>
  </header>
</template>
@/stores/auth
