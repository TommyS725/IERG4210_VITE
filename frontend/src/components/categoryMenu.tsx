import { Category } from "../models/category";
import { Link } from "@tanstack/react-router";
import { getAllCategories } from "../services/getCategories";


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
    return <p>Loading...</p>;
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
              {category.name }
            </Link>
          </li>
        );
      })}
    </>
  );
};

const CategoryMenu = (props:{cid?:string}) => {
  const { data: categories, isError, isLoading, } = getAllCategories();
  const {cid} = props;
  return (
    <>
      <nav className={`m-2 `}>
        <p className=" font-semibold text-center">Category</p>
        <hr className=" mx-1 mt-1 border-t-2 border-t-blue-950"  />
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
