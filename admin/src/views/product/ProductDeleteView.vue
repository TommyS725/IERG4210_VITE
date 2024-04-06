<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import StatusCard from '@/components/form/StatusCard.vue'
import RequestForm from '@/components/form/RequestForm.vue'
import useRequest from '@/lib/useRequest'
import { setTitle } from '@/lib/utils'
import { z } from 'zod'
import { ref } from 'vue'

setTitle('Admin - Remove Product')

const deleteByName = ref(true)

const activeClass = 'border-b-2  border-blue-500 text-blue-500 px-10 pb-1 font-extrabold  '

const inactiveClass = 'border-b-2 border-neutral-600 px-10 pb-1  font-bold text-neutral-600 hover:text-black hover:border-black'



const { statusName, message, isLoading, ok, onSubmit } = useRequest({
  path: 'products',
  method:'DELETE',
  pathParams: (data) => {
    const field = deleteByName.value ? 'name' : 'pid'
    const parsing = z.string().safeParse(data.get(field))
    const fieldValue = parsing.success ? parsing.data : ''
    const prepend = deleteByName.value ? 'name/' : ''
    return `${prepend}${fieldValue}`
  },
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
            <div class=" flex flex-wrap justify-around text-lg  mb-2">
              <button type="button"
              :class="deleteByName? activeClass: inactiveClass"
              @click="deleteByName = true"
              >
                By Product name
              </button>
              <button type="button"
              :class="deleteByName? inactiveClass: activeClass"
              @click="deleteByName = false"

              >
                By Product ID (pid)
              </button>
            </div>
            <div v-if="deleteByName===true">
              <label for="name">Product Name</label>
              <input
                type="text"
                name="name"
                :required = "deleteByName"
                pattern="^(?=.*[a-zA-Z])[^\n\t]+$"
                oninvalid="this.setCustomValidity('Name is required and must contain at least one letter.')"
                oninput="this.setCustomValidity('')"
              />
            </div>
            <div v-else>
              <label for="pid">Product ID (pid)</label>
              <input
                type="text"
                name="pid"
                :required = "!deleteByName"
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
