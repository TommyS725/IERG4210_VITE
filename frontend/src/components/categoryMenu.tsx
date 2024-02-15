import { FC } from "react";
import { ALL_CATEGORIES } from "../models/category";
import { Link } from "@tanstack/react-router";

const CategoryMenu: FC = () => {
  return (
    <>
      <nav className={`m-2 `}>
        <p className=" font-semibold text-center">Category</p>
        <hr className=" m-1 border-t-2 border-t-blue-950" />
        <ul className=" overflow-auto max-h-[100vh]">
          {ALL_CATEGORIES.map((category, index) => {
            return (
              <li key={index} className=" p-2 ">
                <Link
                  to={"/categories/$ckey"}
                  params={(prev) => ({ ...prev, ckey: category.ckey })}
                  className="hover:bg-slate-500 
                  hover:bg-opacity-25 rounded-2xl 
                  font-mdeium
                  hover:underline underline-offset-2 p-2"
                >
                  {category.cname}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default CategoryMenu;
