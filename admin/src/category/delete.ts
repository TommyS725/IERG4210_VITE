import "../styles/global.css";
import "../styles/form.css"
import { setHeader } from "../header";
import { setUpSidebar } from "../sidbar";
import { setUpFromRequest } from "../request";
import { ConnectionConfig } from "../connection_config";



const fn = (formData: FormData,token:string) => {
    const cid = formData.get("cid");
    if(cid === null){
        return Promise.reject("cid not found");
    }
    const url = ConnectionConfig.getAPI(`categories/${cid}`);
    return fetch(url, {
        method: "DELETE",
        body: formData,
        headers:{
            "Authorization":`Basic ${token}`
        }
    });
}
main();

function main() {
    setHeader();
    setUpSidebar("category");
    setUpFromRequest(fn);
}

