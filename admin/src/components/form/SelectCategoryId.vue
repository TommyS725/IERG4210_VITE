<script setup lang="ts">
import getApiUrl from '@/lib/getApiUrl'
import { categorySchema, type Category } from '@/types/db'
import { computed, ref } from 'vue'

type Props = {
  required: boolean
}

const { required } = defineProps<Props>()

const isLoading = ref(false)
const errorText = ref('')
const disabled = computed(() => isLoading.value || errorText.value !== '')
const categories = ref<Category[]>([])
const frontText = computed(() => {
  if (isLoading.value) return 'Loading...'
  if (errorText.value !== '') return errorText.value
  return 'Select Category'
})

isLoading.value = true
const url = getApiUrl('categories')
// console.log('url:', url)
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    categories.value = categorySchema.array().parse(data)
  })
  .catch((error: any) => {
    errorText.value = (error.name as string) ?? 'Unknown Error'
  })
  .finally(() => {
    isLoading.value = false
  })
</script>

<template>
  <div>
    <label for="cid">Category ID (cid)</label>
    <select
      name="cid"
      :required="required"
      oninvalid="this.setCustomValidity('Category ID is required.')"
      oninput="this.setCustomValidity('')"
      :disabled="disabled"
    >
      <option value="" hidden>{{ frontText }}</option>
      <option v-for="category in categories" :key="category.cid" :value="category.cid">
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
@import '@/assets/input.css';
select {
  width: 90%;
  border-bottom: 2px solid rgb(115, 115, 115, 0.3);
  padding: 4px;
  font-weight: 600;
}

select:disabled {
  color: var(--color-neutral-200);
}
select:hover {
  width: 95%;
  border-color: rgb(2 132 199);
  transition: all 200ms;
}
select:focus {
  width: 100%;
  border-color: rgb(3 105 161);
  transition: all 200ms;
}
</style>
