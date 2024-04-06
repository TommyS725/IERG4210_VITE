<script setup lang="ts">
import PopUp from '@/components/PopUp.vue'
import { ref } from 'vue'
import IconClose from '../icons/IconClose.vue'

const props = defineProps<{
  salt: string
  digest: string
  orderDetails: string
}>()

const openPopUp = ref(false)

const togglePopUp = () => {
  openPopUp.value = !openPopUp.value
}
</script>

<template>
  <div>
    <button class="font-medium hover:underline text-blue-950" @click="togglePopUp">Check</button>
    <PopUp v-if="openPopUp">
      <div class="flex">
        <div class="flex-grow"></div>
        <button @click="togglePopUp" class="hover:opacity-40">
          <IconClose />
        </button>
      </div>
      <p class="text-xl mb-6 font-medium">Order Nounce</p>

      <div class="grid grid-cols-5 gap-y-2">
        <p>Salt</p>
        <p class="col-span-4">{{ props.salt }}</p>
        <p>Digest</p>
        <p class="col-span-4">{{ props.digest }}</p>
        <p>Order Details Text</p>
        <p class="col-span-4 bg-neutral-700 rounded-lg p-2 text-balance max-h-[40vh] overflow-auto">
          {{ props.orderDetails }}
        </p>
      </div>

      <button @click="togglePopUp" class="hover:underline text-lg mt-4 hover:opacity-40">
        Close
      </button>
    </PopUp>
  </div>
</template>

<style scoped></style>
