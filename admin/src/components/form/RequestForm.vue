<script setup lang="ts">
import { getCsrfToken } from '@/lib/utils'

type Props = {
  onSubmit: (e: Event) => void
  isLoading: boolean
}

const { onSubmit, isLoading } = defineProps<Props>()
const csrfToken = getCsrfToken()

</script>

<template>
  <form @submit.prevent="($event) => onSubmit($event)" class="card group grid gap-8">
    <slot />
    <input type="hidden" name="csrf" :value="csrfToken" />
    <button
      :class="`place-self-end mr-4 p-3   text-xl
               bg-orange-400 rounded-lg text-white font-semibold shadow-xl
                hover:opacity-50 hover:bg-orange-600 
                ${isLoading ? 'bg-neutral-400 cursor-wait' : ''} `"
    >
      <span :class="`inline  font-semibold ${isLoading ? 'text-neutral-200' : ''}`">Submit</span>
    </button>
  </form>
</template>

<style scoped>
@import '@/assets/card.css';
</style>
