<script setup lang="ts">
type Props = {
  title: string
}

const { title } = defineProps<Props>()
</script>

<template>
  <div class="ml-2 items-center flex flex-warp gap-3">
    <RouterLink :to="{name:'home'}" class="text-2xl text-neutral-600 font-semibold hover:underline"
      >Home
    </RouterLink>
    <span class="text-4xl text-neutral-900 font-medium"> > </span>
    <span class="text-3xl font-semibold">{{ title }}</span>
  </div>
</template>
