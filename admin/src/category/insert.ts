import "../styles/global.css";
import "../styles/form.css"
import { setHeader } from "../header";
import { setUpSidebar } from "../sidbar";
import { setUpFromRequest } from "../request";
import { ConnectionConfig } from "../connection_config";


// const $ = document.getElementById.bind(document);


const fn = (formData: FormData,token:string) => {
    const url = ConnectionConfig.getAPI("categories");
    return fetch(url, {
        method: "post",
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

