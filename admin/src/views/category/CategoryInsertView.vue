<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import StatusCard from '@/components/form/StatusCard.vue'
import RequestForm from '@/components/form/RequestForm.vue'
import useRequest from '@/lib/useRequest'
import { setTitle } from '@/lib/utils'

const { statusName, message, isLoading, ok, onSubmit } = useRequest({
  path: 'categories',
  method: 'POST'
})
setTitle('Admin - Add Category')
</script>

<template>
  <main class="flex flex-row gap-4">
    <SideBar table="category" />
    <section class="flex-grow mx-auto grid gap-4 mt-8 mr-8 self-start">
      <div>
        <NavBar title="Add New Category" />
        <hr class="border-t-4 mt-3 mb-4 border-black" />
        <div class="mx-[10%] space-y-4">
          <RequestForm :is-loading="isLoading" :on-submit="onSubmit">
            <div>
              <label for="name">Category Name</label>
              <input
                type="text"
                name="name"
                required
                pattern="^(?=.*[a-zA-Z])[^\n\t]+$"
                oninvalid="this.setCustomValidity('Category name is required and must contain at least one letter.')"
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
