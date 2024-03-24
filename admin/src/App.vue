<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import InitProfile from './components/InitProfile.vue'
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
</script>

<template>
  <HeaderBar v-if="authStore.authorized" />
  <RouterView v-if="authStore.authorized" />
  <InitProfile v-else />
</template>

