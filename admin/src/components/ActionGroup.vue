<script setup lang="ts">
import ActionCard from './ActionCard.vue'
import type { Table } from '@/types/db'
import { operations } from '@/types/operations'

type Props = {
  table: Table
}

const { table } = defineProps<Props>()
</script>

<template>
  <div class="container flex-wrap flex my-4 gap-12">
    <ActionCard
      v-for="operation in operations"
      :key="table + '-' + operation.type"
      :table="table"
      :operationType="operation.type"
    />
  </div>
</template>
