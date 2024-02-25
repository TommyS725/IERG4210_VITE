import "../styles/global.css";
import "../styles/form.css"
import { setHeader } from "../header";
import { setUpSidebar } from "../sidbar";
import { setUpFromRequest } from "../request";
import { ConnectionConfig } from "../connection_config";



const fn = (formData: FormData,token:string) => {
    const pid = formData.get("pid");
    if(pid === null){
        return Promise.reject("pid not found");
    }
    const url = ConnectionConfig.getAPI(`products/${pid}`);
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
    setUpSidebar("product");
    setUpFromRequest(fn);
}

