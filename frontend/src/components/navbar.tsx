import { FC } from "react";
import { Link } from "@tanstack/react-router";

type NavItem = {
  name: string;
  path: string;
  active?: boolean;
};

type NavBarProps = {
  navItems: NavItem[];
};

const NavBar: FC<NavBarProps> = ({ navItems }) => {
  return (
    <>
      <nav className="flex flex-row gap-2 mx-4  mt-2  text-gray-500 ">
        {navItems.map((item, index) => {
            const activeSet = item.active !== undefined 
            const defaultClass = "[&.active]:font-bold [&.active]:text-gray-800"
            const forcedClass = item.active ? "font-bold text-gray-800":""
          return (
            <span key={index}>
              <Link
                to={item.path}
                className={`${activeSet?forcedClass:defaultClass} hover:font-black hover:underline hover:text-black `}
              >
                {item.name}
              </Link>
              {index !== navItems.length - 1 && (
                <span className=" mx-1 text-md text-gray-700 font-semibold">
                  {">"}
                </span>
              )}
            </span>
          );
        })}
      </nav>
      <hr className=" border-t-blue-950 mx-2 mt-1 mb-2  border-t-2" />
    </>
  );
};

export default NavBar;
