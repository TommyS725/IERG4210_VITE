<script setup lang="ts">
import type { CustomTable } from '@/types/db'
import { capitalize } from '@/lib/utils'
import type { CustomOperationType } from '@/types/operations'
import OperationIcon from './OperationIcon.vue'

type Props = {
  operation: {
    type: CustomOperationType
    verb: string
  }
  table: CustomTable
}

const { table, operation } = defineProps<Props>()

const { verb, type } = operation
</script>

<template>
  <RouterLink :to="`/${table}/${type}`">
    <div class="card group">
      <OperationIcon :type="type" />
      <p
        class="action font-bold font-sans text-2xl group-hover:underline group-hover:scale-105 transition-transform"
      >
        {{ capitalize(verb) }} {{ capitalize(table) }}
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
@import '@/assets/card.css';

.card {
  text-align: center;
  background-color: white;
  cursor: pointer;
  display: grid;
  gap: 8px;
  place-items: center;
  @apply transition-all;
}

.card:hover {
  border-color: rgb(30 41 59);
  background-color: rgb(59, 130, 246, 0.2);
  @apply ring-slate-800;
  @apply ring-4;
}
</style>
