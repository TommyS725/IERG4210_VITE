import { $ } from "./utils";
import { tables, operations } from "./card";
import { capitalize } from "./utils";
import "../src/styles/sideBar.css";

const html = (table:string)=> `
<div class=" mx-2 pr-2 gap-2 flex-warp align-middle hidden group-[.open]:flex  ">
    <a href="/category/" class=" text-white text-lg font-medium flex-grow hover:underline"> ${capitalize(table)}</a>
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
`;

export function setUpSidebar(table: (typeof tables)[number]) {
  const sidebar = $("side-bar") as HTMLElement;
  if (!sidebar) {
    console.error("Sidebar not found");
    return;
  }
  sidebar.classList.add("open", "group");
  sidebar.innerHTML = html(table);
  const closeBtn = $("close-side-btn") as HTMLElement;
  closeBtn.onclick = () => {
    sidebar.classList.remove("open");
  };
  const openBtn = $("open-side-btn") as HTMLElement;
  openBtn.onclick = () => {
    sidebar.classList.add("open");
  };
  const ul = sidebar.querySelector("ul") as HTMLElement;
  for (const operation of operations) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class=" text-neutral-500 text-lg  mr-2 -ml-2">
        -
        </span>
        <a href="/${table}/${
      operation.name
    }/" class="text-gray-300 text-lg font-medium hover:underline">${capitalize(
      operation.verb
    )} ${table}</a>
      `;
    ul.appendChild(li);
  }
}
