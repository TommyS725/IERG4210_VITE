import { Category } from "../models/category";
import { Link, useSearch } from "@tanstack/react-router";
import { getAllCategories } from "../services/getCategories";
import { Loader2 } from "lucide-react";


const InnerMenu = ({
  categories,
  isError,
  isLoading,
  cid,
}: {
  categories?: Category[];
  isError: boolean;
  isLoading: boolean;
  cid?: string;
}) => {
  if (isLoading) {
    return(
    <div className=" mt-7 w-full flex justify-center ">
      <Loader2 className="size-10 animate-spin text-neutral-400" />
    </div>)
  }
  if (isError) {
    return <p>Something went wrong, please refresh.</p>;
  }

  return (
    <>
      {categories?.map((category, index) => {
        const isActive = cid === category.cid;
        const className = " font-mdeium "
          + "hover:underline underline-offset-2 p-2 rounded-lg "
          + (isActive ? "hover:bg-opacity-75 hover:text-neutral-600  bg-blue-500 font-semibold  ring-2 ring-blue-300" :
            " hover:bg-opacity-75 hover:bg-blue-500 hover:ring-2 ring-blue-300");
        return (
          <li key={index} className=" p-2 ">
            <Link
              to={"/"}
              search={(prev) => ({ ...prev, cid: category.cid })}
              className={className}
            >
              {category.name}
            </Link>
          </li>
        );
      })}
    </>
  );
};

const CategoryMenu = () => {
  const { data: categories, isError, isLoading, } = getAllCategories();
  const search = useSearch({
    strict: false,
  }) as { cid: string | undefined };
  const cid = search.cid;


  return (
    <>
      <nav className={`m-2 min-w-[20vw] max-w-[33vw] overflow-y-scroll `}>
        <p className=" font-semibold text-center">Category</p>
        <hr className=" mx-1 mt-1 border-t-2 border-t-blue-950" />
        <ul className=" overflow-auto max-h-[100vh] mt-4">
          <InnerMenu
            categories={categories}
            isError={isError}
            isLoading={isLoading}
            cid={cid}
          />
        </ul>
      </nav>
    </>
  );
};

export default CategoryMenu;
