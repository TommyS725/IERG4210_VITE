<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import StatusCard from '@/components/form/StatusCard.vue'
import RequestForm from '@/components/form/RequestForm.vue'
import useRequest from '@/lib/useRequest'
import { setTitle } from '@/lib/utils'
import { z } from 'zod'

setTitle('Admin - Remove Product')

const { statusName, message, isLoading, ok, onSubmit } = useRequest({
  path: 'products',
  method:'DELETE',
  pathParams: (data) => {
    const parsing = z.string().safeParse(data.get('pid'))
    return parsing.success ? parsing.data : ''
  }
})


</script>

<template>
  <main class="flex flex-row gap-4">
    <SideBar table="product" />
    <section class="flex-grow mx-auto grid gap-4 mt-8 mr-8 self-start">
      <div>
        <NavBar title="Remove Existing Product" />
        <hr class="border-t-4 mt-3 mb-4 border-black" />
        <div class="mx-[10%] space-y-4">
          <RequestForm :is-loading="isLoading" @submit="($event) => onSubmit($event)">
            <div>
              <label for="pid">Product ID (pid)</label>
              <input
                type="text"
                name="pid"
                required
                pattern="^(?=.*[a-zA-Z])[^\n\t]+$"
                oninvalid="this.setCustomValidity('pid is required and must contain at least one letter.')"
                oninput="this.setCustomValidity('')"
              />
            </div>
          </RequestForm>

          <StatusCard :status="statusName" :message="message" :is-loading="isLoading" :ok="ok" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import '@/assets/input.css';
</style>
