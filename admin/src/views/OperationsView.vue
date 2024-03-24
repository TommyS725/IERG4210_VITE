<script setup lang="ts">
import ActionGroup from '@/components/ActionGroup.vue'
import NavBar from '@/components/NavBar.vue'
import NotFound from '@/components/NotFound.vue'
import { capitalize, setTitle } from '@/lib/utils'
import { Tables, tableSchema, type Table } from '@/types/db'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tableName = ref<Table|null>(null)
const tableFound = ref(false)

const handleRouteParam = () => {
  const parsing = tableSchema.safeParse(route.params.table)
  if (!parsing.success){
    setTitle('Admin - Not Found')
    tableFound.value = false
    return
  }
  tableFound.value = true
  tableName.value = parsing.data
  setTitle('Admin - ' + capitalize(parsing.data) + ' Operations')
}

watch(() => route.params.table, handleRouteParam, { immediate: true })
</script>

<template>
  <main class="m-8">
    <section v-if="tableFound" class="w-fulll m-auto grid gap-4">
      <div>
        <NavBar :title="capitalize(tableName as Table) + ' Operations'" />
        <hr class="border-t-4 my-3 border-black" />
        <ActionGroup :table="tableName as Table " />
      </div>
    </section>
    <NotFound v-else />
  </main>
</template>
