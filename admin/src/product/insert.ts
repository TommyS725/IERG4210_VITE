import "../styles/global.css";
import "../styles/form.css"
import { setHeader } from "../header";
import { setUpSidebar } from "../sidbar";
import { setUpFromRequest } from "../request";
import { ConnectionConfig } from "../connection_config";
import {setUpDropImage,fileError} from "../drop-image"
import { $ } from "../utils";

// const $ = document.getElementById.bind(document);


const fn = (formData: FormData,token:string) => {
    const url = ConnectionConfig.getAPI("products");
    return fetch(url, {
        method: "post",
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
    const value = textarea?.value;
    if(!value||!value.match(textarea_pattern)){
        textarea.setCustomValidity("Product description is required and must contain at least one letter.");
        return false;
    }
    const file = input.files?.[0];
    const image = file instanceof File ? file : undefined;
    const error = fileError(image);
    if(error){
        imageError.innerText = error;
        imageError.classList.add("active");
        return false;
    }
    return true;
}

main();

function main() {
    setHeader();
    // setUpSidebar("product");
    setUpSidebar("product")
    setUpFromRequest(fn,{preCheck});
    setUpDropImage();
}

