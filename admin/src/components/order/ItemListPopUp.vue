<script setup lang="ts">
import { type OrderDetail } from '@/types/order'
import PopUp from '@/components/PopUp.vue'
import { ref } from 'vue'
import IconClose from '../icons/IconClose.vue'

type ItemList = OrderDetail['purchase_units'][number]['items']
type Amount = OrderDetail['purchase_units'][number]['amount']

const props = defineProps<{
  items: ItemList
  amount: Amount
}>()

const openPopUp = ref(false)

const togglePopUp = () => {
  openPopUp.value = !openPopUp.value
}
</script>

<template>
  <div>
    <button class="font-medium hover:underline text-blue-900" @click="togglePopUp">
      View Items
    </button>
    <PopUp v-if="openPopUp">
      <div class="flex">
        <div class="flex-grow"></div>
        <button @click="togglePopUp" class="hover:opacity-40">
          <IconClose />
        </button>
      </div>
      <p class="text-xl mb-2 font-medium">Order Details</p>
      <table class="">
        <thead>
          <tr class="h-8 border-b-2 border-b-slate-100">
            <th>#</th>
            <th>Item Name</th>
            <th class="text-center">Quantity</th>
            <th class="text-center">Price ({{ amount.currency_code }})</th>
          </tr>
        </thead>
        <tbody y>
          <tr v-for="(item, index) in $props.items" :key="'itemList-' + index" class="h-10 text-lg">
            <td class="">{{ index + 1 }}</td>
            <td class="overflow-x-auto">{{ item.name }}</td>
            <td class="text-center">{{ item.quantity }}</td>
            <td class="text-center">{{ item.unit_amount.value }}</td>
          </tr>
        </tbody>
      </table>
      <p class="text-end mr-4 text-xl mt-4 font-medium">Total: {{ amount.value }}</p>
      <button @click="togglePopUp" class="hover:underline text-lg mt-1 hover:opacity-40">
        Close
      </button>
    </PopUp>
  </div>
</template>

<style scoped>
th,
td {
  @apply p-3;
}

td {
  @apply border-b border-slate-300;
}

th {
  @apply text-center text-lg font-bold;
}
</style>
