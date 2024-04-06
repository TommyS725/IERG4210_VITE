/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router'
import { useUser } from '../context/UserContext'
import { Loader2 } from 'lucide-react'


export const Route = createFileRoute("/__protected")({
  component: () => {
    const {isLoading,user} = useUser()
    if(isLoading){
      return <main className='w-full min-h-[75vh] grid justify-center items-center'>
        <Loader2   className="animate-spin  size-60 place-self-center " />
      </main>
    }
    if(!user){
      return <Navigate to="/login" />
    }
    return <Outlet />
  }
})