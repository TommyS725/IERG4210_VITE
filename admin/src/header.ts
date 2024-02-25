import "./styles/header.css";
import { ConnectionConfig } from "./connection_config";
import { $ } from "./utils";

export function setHeader() {
  const header = $("header");
  if (!header) {
    console.error("Header not found");
    return;
  }
  const { host, hostSet } = ConnectionConfig.getTargetHost();
  const auth = ConnectionConfig.getAuth();
  const authStatus = auth ?? "(Not Set)";
  const hostText = host + (hostSet ? "" : " (Default)");
  const buttonClass =
    "font-semibold text-white px-2 py-[0.3rem] bg-opacity-10   rounded-xl hover:text-opacity-50 hover:bg-gray-500";
  const authClass = auth ? "auth-set" : "auth-unset";
  const hostClass = hostSet ? "host-set" : "host-unset";
  const headerClass = "py-2  px-4 w-full bg-slate-800 flex justify-between shadow-lg overflow-x-scroll ".split(" ").filter(Boolean);
  const headerHtml = `
    <div class=" flex gap-1">
        <a href="/" class="text-2xl text-white  font-mono hover:underline ">Admin</a>
    </div>
    <div class="flex items-center  space-x-4 ">
        <button id="host-btn" class="${buttonClass} ">
            Host:
            <span id="target-host" class="${hostClass}">${hostText}</span>
        </button>

        <button id="auth-btn" class="${buttonClass} ">
            Auth: 
            <span id="auth-status" class="${authClass}">${authStatus}</span>
        </button>
    </div>
  `;
  header.classList.add(...headerClass);
  header.innerHTML = headerHtml;

  $("host-btn")?.addEventListener("click", () => warper(ConnectionConfig.askForHost));
  $("auth-btn")?.addEventListener("click", () => warper(ConnectionConfig.askForAuth));
}

function warper(fn: () => void) {
  fn();
  setHeader();
}


