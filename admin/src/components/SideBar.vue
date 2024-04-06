<script setup lang="ts">
import { capitalize } from '@/lib/utils'
import IconClose from './icons/IconClose.vue'
import IconOpenSideBar from './icons/IconOpenSideBar.vue'
import type { Table } from '@/types/db'
import { computed, ref } from 'vue'
import { operations } from '@/types/operations'

type Props = {
  table: Table
}

const { table } = defineProps<Props>()
const isOpen = ref(true)
const navClass = computed(() => 'side-bar group ' + (isOpen.value ? 'open' : ''))
</script>

<template>
  <nav :class="navClass">
    <div class="mx-2 pr-2 gap-2 flex-warp align-middle hidden group-[.open]:flex">
      <RouterLink
        :to="{ name: 'operations', params: { table: table } }"
        class="text-white text-lg font-medium flex-grow hover:underline"
      >
        {{ capitalize(table) }}
      </RouterLink>
      <button id="close-side-btn" class="hover:opacity-40" @click="isOpen = false">
        <IconClose />
      </button>
    </div>
    <hr class="border-b-[1px] mt-3 border-neutral-500 hidden group-[.open]:block" />
    <ul class="grid-cols-1 gap-4 p-4 hidden group-[.open]:grid">
      <li v-for="operation in operations" :key="'sidebar-' + table + '-' + operation.type">
        <span class="text-neutral-500 text-lg mr-2 -ml-2"> - </span>
        <RouterLink
          :to="{ name: `${table}-${operation.type}` }"
          class="text-gray-300 text-lg font-medium hover:underline"
        >
          {{ capitalize(operation.verb) + ' ' + table }}
        </RouterLink>
      </li>
    </ul>
    <button
      id="open-side-btn"
      @click="isOpen = true"
      class="h-full hover:bg-opacity-10 hover:bg-white px-1 group-[.open]:hidden"
    >
      <IconOpenSideBar />
    </button>
  </nav>
</template>

<style scoped>
.side-bar {
  min-height: 100vh;
  background-color: rgb(38 38 38);
  overflow-x: auto;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  color: white;
  border-right-width: 2px;
  border-color: rgb(115 115 115);
}

.side-bar.open {
  padding-top: 1.5rem;
  min-width: 15%;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
</style>
