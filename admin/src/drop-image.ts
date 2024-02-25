import "./styles/drop-image.css"
import { $ } from "./utils"


const acceptedTypes = ["image/png","image/jpg","image/jpeg","image/gif"] 
const maxFileSize = 1024 * 1024 * 5 // 5MB

type Config = {
    input:HTMLInputElement
    dropArea:HTMLLabelElement
    rmBtn:HTMLButtonElement
    imageError:HTMLParagraphElement

}


export function fileError(file?:File,required:boolean = true){
    if(!required&&!file){
        return null
    }
    if(!file){
        return "Product image is required."
    }
    const {type,size} = file
    if(!acceptedTypes.includes(type)){
        return "Only png, jpg, gif files are allowed."
    }
    if(size>maxFileSize){
        return "File size is too large, limit is 5MB"
    }
    return null
}




function handleImageUpload(config:Config){
    const {input,dropArea,rmBtn:btn,imageError} = config
    imageError.classList.remove("active")
    const file = input.files?.[0]
    if(!file){
        return
    }
    const error = fileError(file)
    if(error){
        imageError.innerText = error
        imageError.classList.add("active")
        return
    }
    const imageLink = URL.createObjectURL(file)
    dropArea.style.backgroundImage = `url(${imageLink})`
    dropArea.classList.add("uploaded")
    btn.classList.add("uploaded")
    btn.disabled = false

}

function handleImageRemove(config:Config){
    const {input,dropArea,rmBtn:btn,imageError} = config
    input.value = ""
    input.files = null
    dropArea.style.backgroundImage = ""
    dropArea.classList.remove("uploaded")
    btn.classList.remove("uploaded")
    btn.disabled = true
    imageError.classList.remove("active")
}




export function setUpDropImage() {
    const input = $("image-input") as HTMLInputElement
    const dropArea = $("drop-area") as HTMLLabelElement
    const rmBtn = $("rm-image-btn") as HTMLButtonElement
    const imageError = $("image-error") as HTMLParagraphElement
    if(!input){
        console.error("image-input not found")
        return
    }
    if(!dropArea){
        console.error("drop-area not found")
        return
    }
    if(!rmBtn){
        console.error("rm-image-btn not found")
        return
    }
    if(!imageError){
        console.error("image-error not found")
        return
    }

    const elements = {
        input,
        dropArea,
        rmBtn,
        imageError
    }

    input.onchange = () => {
        handleImageUpload(elements)
    }

    rmBtn.onclick = () => {
        handleImageRemove(elements)
    }

    dropArea.ondragover = (e) => {
        e.preventDefault()
    }

    dropArea.ondrop = (e) => {
        e.preventDefault()
        const files = e.dataTransfer?.files
        if(files){
            input.files = e.dataTransfer.files
            handleImageUpload(elements)
        }
    }

}