/* eslint-disable react-refresh/only-export-components */
import {
    ReactNode,
    createContext,
    useContext,
  } from "react";
import { UserProfile } from "../models/userProfile";
import { useProfileQuery } from "../services/getProfile";

  
  

  
  export type UserContextType = {
    user?: UserProfile | null;
    isLoading: boolean;
  };
  
  type UserProviderProps = {
    children: ReactNode;
  };
  
  const UserContext = createContext<UserContextType | null>(null);
  

  
  
  
  export function UserContextProvider({
    children,
  }: UserProviderProps) {
    const {data,isLoading} = useProfileQuery();
  
    return (
      <UserContext.Provider value={
        {
            user: data,
            isLoading: isLoading,
        }
      }>
        {children}
      </UserContext.Provider>
    );
  }
  
  export const useUser = () => {
    const context = useContext(UserContext);
    if (context == undefined) {
      throw new Error(
        "useUser must be used within a UserContextProvider"
      );
    }
    return context;
  };
  