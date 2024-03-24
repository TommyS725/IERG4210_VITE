import { Loader2, User2 } from "lucide-react";
import { useUser } from "../context/UserContext";
import { API_URL } from "../services/core";
import { Link } from "@tanstack/react-router";
import Button from "./Button";

const iconSize = 28;


function ListSeparator() {
  return <hr className=" my-1 border-neutral-500" />;
}


function ActionList() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;


  const isAdmin = !!user?.admin

  return (
    <nav className="hidden group-hover/profile:absolute group-hover/profile:block
    p-3 px-6 bg-slate-900 text-white rounded-lg shadow-xl top-9 right-0 text-nowrap 
    min-w-32
    ">
      <ul className="">
        {user && <li className=" overflow-auto" >{`Email: ${user.email}`}</li>}
        {user && <ListSeparator />}
        {
          isAdmin && <>
            <li>
              <Button isLink>
                <a href="/admin/">Admin Panel</a>
              </Button>
            </li>
            <ListSeparator />
          </>
        }
        {user && <li>
          <Button isLink>
            <Link to="/change-password">Chnage Password</Link>
          </Button>
        </li>}
        {user && <ListSeparator />}
        <li >
          <Button isLink>
          {user ? <a href={`${API_URL}auth/logout`}>Logout</a>
            : <Link to="/login">Login</Link>}
          </Button>
        </li>
      </ul>
    </nav>
  );
}


export default function UserProfile() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loader2 size={iconSize} color="gray" className="animate-spin" />
  }


  return (
    <div className="relative group/profile">

      <div className=" text-white flex flex-wrap p-2 space-x-1 hover:opacity-55 hover:bg-slate-600 rounded-lg">
        <User2 size={iconSize} color="white" />
        <div className=" font-medium text-lg">
          {user ? user.username : "Guest"}
        </div>
      </div>
      <ActionList />
    </div>
  );
}
