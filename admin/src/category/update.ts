import "../styles/global.css";
import "../styles/form.css"
import { setHeader } from "../header";
import { setUpSidebar } from "../sidbar";
import { setUpFromRequest } from "../request";
import { ConnectionConfig } from "../connection_config";
import { setUpCategoryList } from "../category-list";



const fn = (formData: FormData,token:string) => {
    const cid = formData.get("cid");
    if(cid === null){
        return Promise.reject("cid not found");
    }
    const url = ConnectionConfig.getAPI(`categories/${cid}`);
    return fetch(url, {
        method: "PUT",
        body: formData,
        headers:{
            "Authorization":`Basic ${token}`
        }
    });
}
main();

function main() {
    setUpCategoryList();
    setHeader();
    setUpSidebar("category");
    setUpFromRequest(fn);
}

