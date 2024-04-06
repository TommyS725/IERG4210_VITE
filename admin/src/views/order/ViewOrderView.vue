<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'

import ItemListPopUp from '@/components/order/ItemListPopUp.vue'
import NouncePopUp from '@/components/order/NouncePopUp.vue'
import { fetchOrders } from '@/lib/order/fetchOrders'
import { setTitle, range } from '@/lib/utils'
import { type AdminOrder } from '@/types/order'

import { computed, ref } from 'vue'

setTitle('Admin - View Orders')

const pageSize = 10
const page = ref(0)
const hasNext = ref(true)
const isFteching = ref(false)
const data = ref<AdminOrder[]>([])

const pageLength = computed(() => Math.ceil(data.value.length / pageSize))

const currentPageData = computed(() =>
  data.value.slice(page.value * pageSize, (page.value + 1) * pageSize)
)

const fetchData = async () => {
  if (isFteching.value) return
  isFteching.value = true
  let continueFetching = false
  try {
    const content = await fetchOrders(data.value.length, pageSize)
    data.value = data.value.concat(content.data)
    hasNext.value = content.hasNext
    continueFetching = content.hasNext
  } catch (error) {
    console.error(error)
  } finally {
    isFteching.value = false
  }
  const isLast = page.value === pageLength.value - 1
  if (isLast && continueFetching) {
    await fetchData()
  }
}

const refresh = async () => {
  if (isFteching.value) return
  data.value = []
  page.value = 0
  hasNext.value = true
  await fetchData()
}

const nextPage = async () => {
  const currentPage = page.value
  const isLast = currentPage === pageLength.value - 1
  if (isLast) return
  page.value = currentPage + 1
  const goingToLast = currentPage === pageLength.value - 2
  if (goingToLast && hasNext.value) {
    console.log('fetching next page')
    await fetchData()
  }
}

const prevPage = () => {
  const currentPage = page.value
  if (currentPage === 0) return
  page.value = currentPage - 1
}

fetchData()
</script>

<template>
  <section class="flex-grow grid gap-4 mt-8 mx-8 self-start">
    <div>
      <NavBar title="View Orders" />
      <hr class="border-t-4 mt-3 mb-4 border-black" />
      <div class="grid items-center mx-2">
        <table class="table-auto">
          <thead>
            <tr>
              <th class="pl-4">#</th>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Payment Status</th>
              <th>Total Amount (USD)</th>
              <th>Details</th>
              <th>Nounce</th>
              <th>Order At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in currentPageData" :key="'main-table-' + index">
              <td class="pl-4">{{ index + 1 + page * pageSize }}</td>
              <td class="text-balance">{{ order.UUID }}</td>
              <td>{{ order.username }}</td>
              <td>{{ order.orderDetails !== null ? 'Approved' : 'Pending' }}</td>
              <td v-if="order.orderDetailsObj !== null">
                {{ order.orderDetailsObj.purchase_units[0].amount.value }}
              </td>
              <td class="italic" v-else>N/A</td>
              <td v-if="order.orderDetailsObj">
                <ItemListPopUp
                  :items="order.orderDetailsObj.purchase_units[0].items"
                  :amount="order.orderDetailsObj.purchase_units[0].amount"
                />
              </td>
              <td class="italic" v-else>N/A</td>
              <td v-if="order.orderDetails !== null">
                <NouncePopUp
                  :salt="order.salt"
                  :digest="order.digest"
                  :orderDetails="order.orderDetails"
                />
              </td>
              <td class="italic" v-else>N/A</td>
              <td>
                {{ order.createdAt.toLocaleString().slice(0, 17).replace(',', ' ') }}
              </td>
            </tr>

            <tr
              v-for="num in range(currentPageData.length + 1, pageSize + 1)"
              :key="'pending-' + num"
            >
              <td class="pl-4">{{ num + page * pageSize }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-between mt-4 mx-2">
          <div class="flex flex-row flex-wrap space-x-4 items-center">
            <div
              v-if="isFteching"
              class="text-lg font-bold bg-blue-300 p-2 rounded-lg text-neutral-700 border-neutral-300 border-2 shadow-md cursor-wait"
            >
              Status: Fetching...
            </div>
            <div
              v-else
              class="text-lg font-bold bg-green-300 p-2 rounded-lg text-neutral-700 border-neutral-300 border-2 shadow-md cursor-default"
            >
              Status: Ready
            </div>
            <button
              @click="refresh"
              :disabled="isFteching"
              class="text-lg font-bold bg-blue-950 p-3 rounded-lg text-neutral-200 border-neutral-300 border-2 shadow-md disabled:opacity-40 hover:opacity-80"
            >
              Refresh Data
            </button>
          </div>
          <div class="flex flex-row flex-wrap space-x-4 items-center">
            <button @click="prevPage" :disabled="page === 0" class="pageBtn">Prev</button>
            <p class="text-lg font-bold">{{ page + 1 }}/{{ pageLength }}</p>
            <button @click="nextPage" :disabled="page === pageLength - 1" class="pageBtn">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
table {
  width: 100%;
  @apply border-y-2 border-neutral-900;
}
th,
td {
  @apply text-center;
}

th {
  @apply text-white h-12 bg-slate-700 text-lg font-bold;
}

td {
  @apply overflow-x-auto h-10 border-y text-slate-900 font-medium  border-neutral-400;
}

tr:hover {
  @apply bg-slate-300;
}

.pageBtn {
  @apply bg-slate-600 text-white text-base font-bold px-4 py-2 rounded-lg disabled:opacity-40 hover:opacity-80;
}
</style>
