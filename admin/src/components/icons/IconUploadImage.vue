<script setup lang="ts">
const { className } = defineProps<{ className?: string }>()

const finalClass = `lucide lucide-image-up ${className}`
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="128"
    height="128"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#809ee5"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="finalClass"
  >
    <path
      d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"
    />
    <path d="m14 19.5 3-3 3 3" />
    <path d="M17 22v-5.5" />
    <circle cx="9" cy="9" r="2" />
  </svg>
</template>
