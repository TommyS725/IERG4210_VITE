import { ConnectionConfig } from "./connection_config"
import { $ } from "./utils"


type Fn = (formData:FormData,authToken:string) => Promise<Response>
type  Option ={
    preCheck?:(form:HTMLFormElement) => boolean
}


const statusCardHTML =`
            <p class=" font-semibold  text-lg">
                Status: 
                <span id="requets-status" class="group-[.loading]:hidden ml-2"><span class=" text-neutral-600">None</span></span>
                <svg aria-hidden="true" class="  hidden group-[.loading]:inline size-8 ml-2 text-slate-800 animate-spin fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </p>
            <div class="space-y-2 group-[.loading]:hidden   ">
                <p class=" font-semibold  text-lg">Response: </p>
                <pre id="response-body" class=" bg-neutral-700 text-white overflow-scroll shadow-md
                    font-medium p-4 rounded-lg max-h-[40vh] max-w-[80vw]">
                </pre>
            </div>
`




function handleStatus (message:string, ok:boolean){
    const statusCard = $("requets-status") as HTMLDivElement
    if(!statusCard){
        console.error("requets-status not found")
    }
    const span = document.createElement("span")
    span.className = ok ? "text-green-500" : "text-red-500"
    span.innerText = message
    statusCard.innerHTML = span.outerHTML
}

function convertData(data:any):string{
    if(typeof data === "string"){
        return data
    }
    return JSON.stringify(data,null,2)
}

function handleData(data:any){
    const responseBody = $("response-body") as HTMLDivElement
    if(!responseBody){
        console.error("response-body not found")
        return
    }
    const text = convertData(data)
    responseBody.innerText = text
}

function setLoading(loading:boolean){
    const form = $('request-form') as HTMLFormElement
    const statusCard = $("status-card") as HTMLDivElement
    const submitBtun = $("submit-btn") as HTMLButtonElement
    if(loading){
        form.classList.add("loading")
        statusCard.classList.add("loading")
        submitBtun.disabled = true
    }else{
        form.classList.remove("loading")
        statusCard.classList.remove("loading")
        submitBtun.disabled = false
    }
}


export function setUpFromRequest(fn:Fn,option:Option = {}){
    const form = $('request-form') as HTMLFormElement
    const statusCard = $("status-card") as HTMLDivElement
    const submitBtun = $("submit-btn") as HTMLButtonElement
    if(!form){
        console.error("requet-form not found")
        return
    }
    if(!statusCard){
        console.error("status-card not found")
        return
    }
    if(!submitBtun){
        console.error("submit-btn not found")
        return
    }
    statusCard.classList.add("group","card")
    statusCard.innerHTML = statusCardHTML
    form.onsubmit = async (e) => {
        e.preventDefault()
        const {preCheck} = option
        if(preCheck&&!preCheck(form)) return
       
        const formData = new FormData(e.target as HTMLFormElement)
        handleData("")
        let token = ConnectionConfig.getAuthToken()
        if(!token){
            window.alert("Auth Not Set")
            return
        }
        setLoading(true)
        fn(formData,token).then((res) => {
            const ok = res.ok
            const status = res.status
            const statusText = res.statusText
            handleStatus(`${status} ${statusText}`,ok)
            const isJSon = res.headers.get("Content-Type")?.includes("application/json")
            if(isJSon){
                return res.json()
            }
            return res.text()
        })
        .then(handleData)
        // .then(() => form.reset())
        .catch((err:any) => {
            const name= err.name as string || "Unknown Error"
            const message = err.message  as string
            handleStatus(name,false)
            handleData(message)
        })
        .finally(() => {
            setLoading(false)
            
        })
    }

}