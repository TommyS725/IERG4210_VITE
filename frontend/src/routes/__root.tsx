import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import Header from '../components/header'
import { RouterContext } from '../utils/utils_types'
import Footer from '../components/footer'





export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <div className=' flex flex-col min-h-screen justify-between overscroll-none'>
        <div>
          <Header />
          <Outlet />

        </div>
        <Footer />

      </div>
    </>
  ),
  notFoundComponent: () => <div className=' flex flex-col min-h-screen justify-between overscroll-none'>
    <div>
      <Header />
      <div className="m-8 flex justify-center align-middle items-center">
        <h1 className="text-4xl font-bold">404 Not Found</h1>
      </div>
    </div>
    <Footer />
  </div>
})


