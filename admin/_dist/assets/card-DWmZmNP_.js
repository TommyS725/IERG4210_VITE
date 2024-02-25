(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const b="http://localhost:3000",v="v1";class a{static setTargetHost(t){localStorage.setItem("tartget-host",t)}static setAuth(t,s){localStorage.setItem("username",t),localStorage.setItem("password",s)}static getTargetHost(){const t=localStorage.getItem("tartget-host");return{host:t||b,hostSet:!!t}}static getAPI(t){return t.startsWith("/")&&(t=t.slice(1)),`${a.getTargetHost().host}/api/${v}/${t}`}static getAuthToken(){const t=a.getAuth();return t?btoa(t):null}static getAuth(){const t=localStorage.getItem("username"),s=localStorage.getItem("password");return!t||!s?null:`${t}:${s}`}static clearAuth(){localStorage.removeItem("username"),localStorage.removeItem("password")}static clearTargetHost(){localStorage.removeItem("tartget-host")}static askForHost(){let t=prompt("Enter the target host");return t&&t.endsWith("/")&&(t=t.slice(0,-1)),!t||t===""?(a.clearTargetHost(),null):(a.setTargetHost(t),t)}static askForAuth(){const t=prompt("Enter the username");if(!t||t==="")return a.clearAuth(),null;const s=prompt("Enter the password");return!s||s===""?(a.clearAuth(),null):(a.setAuth(t,s),`${t}:${s}`)}}function h(e){return e.charAt(0).toUpperCase()+e.slice(1)}const l=document.getElementById.bind(document);function $(){var u,d;const e=l("header");if(!e){console.error("Header not found");return}const{host:t,hostSet:s}=a.getTargetHost(),n=a.getAuth(),r=n??"(Not Set)",o=t+(s?"":" (Default)"),c="font-semibold text-white px-2 py-[0.3rem] bg-opacity-10   rounded-xl hover:text-opacity-50 hover:bg-gray-500",i=n?"auth-set":"auth-unset",m=s?"host-set":"host-unset",g="py-2  px-4 w-full bg-slate-800 flex justify-between shadow-lg overflow-x-scroll ".split(" ").filter(Boolean),f=`
    <div class=" flex gap-1">
        <a href="/" class="text-2xl text-white  font-mono hover:underline ">Admin</a>
    </div>
    <div class="flex items-center  space-x-4 ">
        <button id="host-btn" class="${c} ">
            Host:
            <span id="target-host" class="${m}">${o}</span>
        </button>

        <button id="auth-btn" class="${c} ">
            Auth: 
            <span id="auth-status" class="${i}">${r}</span>
        </button>
    </div>
  `;e.classList.add(...g),e.innerHTML=f,(u=l("host-btn"))==null||u.addEventListener("click",()=>p(a.askForHost)),(d=l("auth-btn"))==null||d.addEventListener("click",()=>p(a.askForAuth))}function p(e){e(),$()}const x=[{name:"insert",verb:"Add",alt:e=>`Add a new ${e} in the database.`},{name:"update",verb:"Update",alt:e=>`Update an existing ${e} in the database.`},{name:"delete",verb:"Remove",alt:e=>`Remove an existing ${e} from the database.`}];function w(e){const t=l(`${e}-ops`);if(!t){console.error(`Div with id ${e}-ops not found`);return}for(const s of x){const n=A(e,s);t.appendChild(n)}}function A(e,t){const{name:s,verb:n,alt:r}=t,o=document.createElement("a"),i=`card text-center bg-white  
    group cursor-pointer hover:bg-opacity-20 hover:bg-blue-500 grid place-items-center
    ring-slate-800 hover:ring-4 hover:border-slate-800 transition-all`.replace(/\n/g," ").split(" ").filter(Boolean);return o.classList.add(...i),o.href=`/${e}/${s}/`,o.innerHTML=`

        <img
        class="size-24 group-hover:scale-105 transition-transform"
        src="/${s}.svg"
        alt="${r(e)}"
        />
        <p class="font-semibold font-sans text-xl 
        group-hover:underline  group-hover:scale-105 transition-transform">
        ${h(n)} ${h(e)}
        </p>
    `,o}export{l as $,a as C,w as a,h as c,x as o,$ as s};
