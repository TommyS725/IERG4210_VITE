import "../styles/global.css";
import "../styles/form.css"
import { setHeader } from "../header";
import { setUpSidebar } from "../sidbar";
import { setUpFromRequest } from "../request";
import { ConnectionConfig } from "../connection_config";
import {setUpDropImage,fileError} from "../drop-image"
import { $ } from "../utils";
import { setUpCategoryList } from "../category-list";

// const $ = document.getElementById.bind(document);


const fn = (formData: FormData,token:string) => {
    const pid = formData.get("pid");
    if(!pid){
        throw new Error("Product id is required")
    }
    const url = ConnectionConfig.getAPI(`products/${pid}`);
    return fetch(url, {
        method: "put",
        body: formData,
        headers:{
            "Authorization":`Basic ${token}`
        }
    });
}

const textarea_pattern = "(?=.*[A-Za-z])";

const preCheck = (form:HTMLFormElement) => {
    const textarea = form.querySelector("textarea") as HTMLTextAreaElement;
    const input = $("image-input") as HTMLInputElement
    const imageError = $("image-error") as HTMLParagraphElement;
    if(!textarea){
        console.error("textarea not found");
        return false;
    }
    if(!input){
        console.error("image-input not found");
        return false;
    }
    if(!imageError){
        console.error("image-error not found");
        return false;
    }
    imageError.classList.remove("active");
    imageError.innerText = "";
    let value:string|undefined = textarea.value;
    if (!value||value.trim().length===0) {
        //to prevent empty string
        value = undefined
    }
    if(value&&!value.match(textarea_pattern)){
        textarea.setCustomValidity("Product description must contain at least one letter.");
        return false;
    }
    const file = input.files?.[0];
    const image = file instanceof File ? file : undefined;
    const error = fileError(image,false);
    if(error){
        imageError.innerText = error;
        imageError.classList.add("active");
        return false;
    }
    return true;
}

main();

function main() {
    setUpCategoryList();
    setHeader();
    setUpSidebar("product")
    setUpFromRequest(fn,{preCheck});
    setUpDropImage();
}

