import{$ as o,o as x,c as h,C as v}from"./card-BdzXmr1G.js";const w=t=>`
<div class=" mx-2 pr-2 gap-2 flex-warp align-middle hidden group-[.open]:flex  ">
    <a href="/category/" class=" text-white text-lg font-medium flex-grow hover:underline"> ${h(t)}</a>
    <button  id="close-side-btn"  class="hover:bg-opacity-10 hover:bg-white  rounded-full p-1" >
        <img src="/close.svg" />
    </button>
</div>
<hr class=" border-b-[1px] mt-3 border-neutral-500 hidden group-[.open]:block"/>
<ul class="grid-cols-1 gap-4 p-4 hidden group-[.open]:grid">

</ul>
<button id="open-side-btn" class=" h-full hover:bg-opacity-10 hover:bg-white px-1  group-[.open]:hidden">
    <img src="/chevorn.svg" class=" size-8"  />
</button>
`;function M(t){const e=o("side-bar");if(!e){console.error("Sidebar not found");return}e.classList.add("open","group"),e.innerHTML=w(t);const n=o("close-side-btn");n.onclick=()=>{e.classList.remove("open")};const s=o("open-side-btn");s.onclick=()=>{e.classList.add("open")};const l=e.querySelector("ul");for(const a of x){const i=document.createElement("li");i.innerHTML=`
      <span class=" text-neutral-500 text-lg  mr-2 -ml-2">
        -
        </span>
        <a href="/${t}/${a.name}/" class="text-gray-300 text-lg font-medium hover:underline">${h(a.verb)} ${t}</a>
      `,l.appendChild(i)}}const y=`
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
`;function g(t,e){const n=o("requets-status");n||console.error("requets-status not found");const s=document.createElement("span");s.className=e?"text-green-500":"text-red-500",s.innerText=t,n.innerHTML=s.outerHTML}function L(t){return typeof t=="string"?t:JSON.stringify(t,null,2)}function u(t){const e=o("response-body");if(!e){console.error("response-body not found");return}const n=L(t);e.innerText=n}function m(t){const e=o("request-form"),n=o("status-card"),s=o("submit-btn");t?(e.classList.add("loading"),n.classList.add("loading"),s.disabled=!0):(e.classList.remove("loading"),n.classList.remove("loading"),s.disabled=!1)}function S(t,e={}){const n=o("request-form"),s=o("status-card"),l=o("submit-btn");if(!n){console.error("requet-form not found");return}if(!s){console.error("status-card not found");return}if(!l){console.error("submit-btn not found");return}s.classList.add("group","card"),s.innerHTML=y,n.onsubmit=async a=>{a.preventDefault();const{preCheck:i}=e;if(i&&!i(n))return;const b=new FormData(a.target);u("");let p=v.getAuthToken();if(!p){window.alert("Auth Not Set");return}m(!0),t(b,p).then(r=>{var f;const c=r.ok,d=r.status,C=r.statusText;return g(`${d} ${C}`,c),((f=r.headers.get("Content-Type"))==null?void 0:f.includes("application/json"))?r.json():r.text()}).then(u).catch(r=>{const c=r.name||"Unknown Error",d=r.message;g(c,!1),u(d)}).finally(()=>{m(!1)})}}export{S as a,M as s};
