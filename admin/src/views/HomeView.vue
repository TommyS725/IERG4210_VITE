<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ActionGroup from '@/components/ActionGroup.vue'
import type { Table } from '@/types/db'
import { capitalize, setTitle } from '@/lib/utils'

const tablesToShow = ['category', 'product'] satisfies Table[]
setTitle('Admin - Home')
</script>

<template>
  <main class="m-8">
    <section class="w-fulll m-auto grid gap-4">
      <div v-for="table in tablesToShow" :key="table + '-group'">
        <RouterLink class="ml-2 text-3xl font-semibold hover:underline" :to="{name:'operations', params:{table:table}}">
          {{ capitalize(table) }}
        </RouterLink>
        <hr class="border-t-4 my-3 border-black" />
        <ActionGroup :table />
      </div>
    </section>
  </main>
</template>
