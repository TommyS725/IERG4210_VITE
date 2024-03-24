<script setup lang="ts">
import IconRmoveImage from '@/components/icons/IconRmoveImage.vue'
import IconUploadImage from '@/components/icons/IconUploadImage.vue'
import { computed, ref } from 'vue'
import { fileError } from '@/lib/imageUpload'

const errorText = defineModel('imageError', {
  default: '',
  required: true
})
const backgroundImage = ref('')
const uploaded = computed(() => backgroundImage.value !== '')
const errorActive = computed(() => errorText.value !== '')

const input = ref<HTMLInputElement | null>(null)

function handleImageUpload() {
  const inputEle = input.value
  if (!inputEle) return
  const files = inputEle.files
  const file = files ? files[0] : null
  if (!file) return
  errorText.value = ''
  const detectedError = fileError(file)
  if (detectedError) {
    errorText.value = detectedError
    inputEle.value = ''
    inputEle.files = null
    return
  }
  const imageLink = URL.createObjectURL(file)
  backgroundImage.value = `url(${imageLink})`
}

function handleImageRemove() {
  const inputEle = input.value
  if (!inputEle) return
  inputEle.value = ''
  inputEle.files = null
  backgroundImage.value = ''
  errorText.value = ''
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  const inputEle = input.value
  if (!inputEle) return
  const files = e.dataTransfer?.files
  if (!files) return
  inputEle.files = files
  handleImageUpload()
}
</script>

<template>
  <div class="grid gap-6">
    <label
      for="image-input"
      id="drop-area"
      @dragover="handleDragOver"
      @drop="handleDrop"
      :class="`group/image ${uploaded ? 'uploaded' : ''}`"
    >
      <input
        id="image-input"
        name="image"
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        @change="handleImageUpload"
        ref="input"
        hidden
      />
      <div class="grid justify-center group-[.uploaded]/image:invisible">
        <IconUploadImage className="block justify-self-center group-hover/image:animate-bounce" />
        <p>Drag and drop or click to upload image</p>
        <p class="text-sm">Accept jpg/png/gif max-size:5mb</p>
      </div>
      <div class="cover"></div>
    </label>
    <p id="image-error" :class="errorActive ? 'active' : ''">{{ errorText }}</p>
    <button
      type="button"
      id="rm-image-btn"
      :class="uploaded ? 'uploaded' : ''"
      :disabled="!uploaded"
      @click="handleImageRemove"
    >
      <IconRmoveImage />
      <span>Remove Image</span>
    </button>
  </div>
</template>

<style scoped>
#drop-area {
  background-image: v-bind('backgroundImage');
  border: 2px dashed #ccc;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  padding: 30px;
  font-size: 20px;
  color: #ccc;
  text-align: center;
  cursor: pointer;
  position: relative;
  grid-column: 1;
  justify-content: center;
  align-items: center;
  z-index: 0;
}

#drop-area:hover {
  border-color: #444444;
  transition: border-color 300ms;
}

#drop-area .cover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.3;
  border-radius: 20px;
  z-index: 1;
}

#drop-area.uploaded {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  padding: 10 10 10 10;
}

#drop-area .cover:hover {
  background: gray;
}

#rm-image-btn {
  display: none;
}

#rm-image-btn.uploaded {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
  font-weight: bold;
  color: #ff3636;
  padding: 8px 8px 8px 8px;
  margin-top: -10px;
  place-self: start;
  border-radius: 10px;
}

#rm-image-btn:hover {
  background: rgb(209, 209, 209);
  opacity: 0.5;
}

#image-error {
  color: #ff3636;
  margin-top: -10px;
  margin-left: 2%;
  display: none;
}

#image-error.active {
  display: block;
}
</style>
