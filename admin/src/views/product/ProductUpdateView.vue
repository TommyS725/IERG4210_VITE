<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import StatusCard from '@/components/form/StatusCard.vue'
import RequestForm from '@/components/form/RequestForm.vue'
import useRequest from '@/lib/useRequest'
import SelectCategoryId from '@/components/form/SelectCategoryId.vue'
import ImageField from '@/components/form/ImageField.vue'
import { z } from 'zod'
import { setTitle } from '@/lib/utils'
import { ref } from 'vue'
import { fileError } from '@/lib/imageUpload'
import { descriptionPattern } from '@/lib/patterns'
import { isFile } from '@/lib/imageUpload'

setTitle('Admin - Update Product')
const textArea = ref<HTMLTextAreaElement | null>(null)
const imageError = ref<string>('')
const descriptionError = ref<string>('')

const { statusName, message, isLoading, ok, onSubmit } = useRequest({
  path: 'products',
  method: 'PUT',
  pathParams: (data) => {
    const parsing = z.string().safeParse(data.get('pid'))
    return parsing.success ? parsing.data : ''
  },
  preProcess: (formData) => {
    descriptionError.value = ''
    imageError.value = ''
    const imageFile = formData.get('image')
    const image = imageFile instanceof File ? imageFile : undefined
    const hasImage = isFile(image)
    if (!hasImage) {
      formData.delete('image')
    } else {
      const detectedError = fileError(image)
      if (detectedError) {
        imageError.value = detectedError
        return false
      }
    }

    const description =
      typeof formData.get('description') === 'string' ? (formData.get('description') as string) : ''
    if (description.trim().length === 0) {
      formData.set('description', '')
    } else if (description.match(descriptionPattern) === null) {
      textArea.value?.focus()
      textArea.value?.setCustomValidity(
        'Product description is required and must contain at least one letter.'
      )
      return false
    }

    const updatename = formData.get('name')
    const updateCid = formData.get('cid')
    const updatePrice = formData.get('price')
    const updateInventory = formData.get('inventory')
    const updateImage = formData.get('image')
    const UpdateDescription = formData.get('description')
    const hasUpdate =
      updatename || updateCid || updatePrice || updateInventory || updateImage || UpdateDescription
    if (!hasUpdate) {
      alert('No update detected')
      return false
    }
    return formData
  }
})
</script>

<template>
  <main class="flex flex-row gap-4">
    <SideBar table="product" />
    <section class="flex-grow mx-auto grid gap-4 mt-8 mr-8 self-start">
      <div>
        <NavBar title="Update Existing Product" />
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
            <div>
              <label for="name">Product Name</label>
              <input
                type="text"
                name="name"
                pattern="^(?=.*[a-zA-Z])[^\n\t]+$"
                oninvalid="this.setCustomValidity('Product name is required and must contain at least one letter.')"
                oninput="this.setCustomValidity('')"
              />
            </div>
            <SelectCategoryId :required="false" />
            <div>
              <label for="price">Price</label>
              <div>
                <span class="text-lg font-semibold">$</span>
                <input
                  name="price"
                  placeholder="0.00"
                  class="dollar"
                  type="number"
                  min="1"
                  step="0.01"
                  pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                  oninvalid="this.setCustomValidity('Price is required, >0 and can only contain numbers and at most two decimal places.')"
                  oninput="this.setCustomValidity('')"
                />
              </div>
            </div>
            <div>
              <label for="description">Description</label>
              <textarea
                name="description"
                placeholder="This product is..."
                rows="1"
                onfocus="this.rows='8'"
                onblur="this.rows='1'"
                oninvalid="this.setCustomValidity('Product description is required and must contain at least one letter.')"
                oninput="this.setCustomValidity('')"
                ref="textArea"
              ></textarea>
              <p class="text-red-500 text-sm">{{ descriptionError }}</p>
            </div>
            <div>
              <label for="inventory">Inventory</label>
              <input
                name="inventory"
                type="number"
                placeholder="0"
                min="0"
                pattern="^(?=.*[0-9])([0-9]*)$"
                oninvalid="this.setCustomValidity('Inventory is required and can only contain integers.')"
                oninput="this.setCustomValidity('')"
              />
            </div>
            <ImageField v-model:imageError="imageError" />
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
