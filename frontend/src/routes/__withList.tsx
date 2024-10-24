import { Outlet, createFileRoute } from '@tanstack/react-router'
import CategoryMenu from '../components/categoryMenu'

export const Route = createFileRoute('/__withList')({
  component: () => <>
  <main className={`flex flex-row  gap-4 bg-transparent`}>
    <section className=" min-w-max">
      <CategoryMenu />
    </section>
    <section className=" overflow-y-scroll  overscroll-auto   max-h-[110vh]  grow  ">
          <Outlet />
    </section>
  </main>
</>
})