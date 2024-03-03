import { createRootRouteWithContext,  Outlet } from '@tanstack/react-router'
import Header from '../components/header'
import { RouterContext } from '../utils/utils_types'

const contact_mail = "1155159019@link.cuhk.edu.hk" as const

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
    <div className=' flex flex-col min-h-screen justify-between'>
      <div>
      <Header/>
      <Outlet />

      </div>
      <footer className='grid grid-flow-col justify-around overflow-y-scroll  bg-gray-700 text-white h-[7vh] items-center font-mono  font-medium  cursor-default' >
       <div>IERG4210 Assignment Phase 3</div>
        <div>By: Shum Ching Chit </div>
        <div>SID: 1155159019</div>
        <div>Contact: <a href={"mailto:"+contact_mail} className=' underline  cursor-pointer'>{contact_mail}</a></div>
      </footer>

    </div>
    </>
  ),
})