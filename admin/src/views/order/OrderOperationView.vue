<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { capitalize, setTitle } from '@/lib/utils'
import OrderCardGroup from '@/components/order/OrderCardGroup.vue'

const tableName = 'order'
setTitle('Admin - ' + capitalize(tableName) + ' Operations')
</script>

<template>
  <main class="m-8">
    <section class="w-fulll m-auto grid gap-4">
      <div>
        <NavBar :title="capitalize(tableName) + ' Operations'" />
        <hr class="border-t-4 my-3 border-black" />
        <OrderCardGroup />
      </div>
    </section>
  </main>
</template>
