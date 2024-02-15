import { createRootRoute,  Outlet } from '@tanstack/react-router'
import Header from '../components/header'

const contact_mail = "1155159019@link.cuhk.edu.hk" as const

export const Route = createRootRoute({
  component: () => (
    <>
    <div className=' flex flex-col min-h-screen justify-between'>
      <div>
      <Header/>
      <Outlet />

      </div>
      <footer className=' flex justify-around bg-gray-700 text-white h-[7vh] items-center font-mono  font-medium  cursor-default' >
       <span>IERG4210 Assignment Phase 1</span>
        <span>By: Shum Ching Chit </span>
        <span>SID:1155159019</span>
        <span>Contact: <a href={"mailto:"+contact_mail} className=' underline  cursor-pointer'>{contact_mail}</a></span>
      </footer>

    </div>
    </>
  ),
})