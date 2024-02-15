import { useEffect } from "react";

const BASE_TITLE = "Shopping.com"


export function appendTitle(postpend:string[],seperator:string = " - "){
    let called = false
    return function(){
        const title = document.querySelector('title');
        if(called||!title) return
        called = true
        if(!postpend.length) return
        title.textContent = [BASE_TITLE, ... postpend].join(seperator)
        return
    }
}


export function useEditTitle(postpend:string[],seperator:string = " - "){
    const editTite = appendTitle(postpend,seperator)
    useEffect(()=>{
        editTite()
    },[])
}