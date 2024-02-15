import { createFileRoute, useNavigate} from "@tanstack/react-router";
import { ALL_CATEGORIES } from "../models/category";
import NavBar from "../components/navbar";
import CategoryMenu from "../components/categoryMenu";
import { useEditTitle } from "../utils/title";


export const Route = createFileRoute('/categories/$ckey')({
    component: CategoryPage,
})



function CategoryPage(){
    const navigate  = useNavigate({from:"/categories/$ckey"});
    const {ckey} = Route.useParams();
    const category = ALL_CATEGORIES.find(c=>c.ckey === ckey);
    if(!category){
        navigate({to:'/',replace:true});
        return
    }
    const {cname} = category;
    useEditTitle([cname]);
    return <>
        <main className={`flex py-1 gap-4 bg-transparent`}>
        <section className=" min-w-max">
          <CategoryMenu />
        </section>
        <section className="  overflow-y-auto max-h-[110vh]  grow ">
        <NavBar navItems={[{name:'Home',path:'/'},{name:cname,path:`/categories/${ckey}`}]}/>
        </section>
      </main>
    </>
}
