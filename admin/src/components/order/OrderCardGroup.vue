<script setup lang="ts">
import type { CustomTable } from '@/types/db'
import CustomActionCard from '../CustomActionCard.vue'
import type { CustomOperationType } from '@/types/operations'

const table = 'order' satisfies CustomTable

const operations = [{ type: 'view', verb: 'view' }] satisfies {
  type: CustomOperationType
  verb: string
}[]
</script>

<template>
  <div class="container flex-wrap flex my-4 gap-12">
    <CustomActionCard
      v-for="operation in operations"
      :key="table + '-' + operation.type"
      :table="table"
      :operation="operation"
    />
  </div>
</template>
