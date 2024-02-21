import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import {  ShoppingCartContextProvider } from './context/ShoppingCartContext'

import { QueryClient, QueryClientProvider } from 'react-query'



// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

//react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 , //prevent  refetching immediately
    },
  },
})

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      <ShoppingCartContextProvider >
        <RouterProvider router={router} />
      </ShoppingCartContextProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}