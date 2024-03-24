import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { ShoppingCartContextProvider } from "./context/ShoppingCartContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterContext } from "./utils/utils_types";
import { UserContextProvider } from "./context/UserContext";


//react query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, //prevent  refetching immediately
    },
  },
});

const routerContext = {
  queryClient,
} satisfies RouterContext;

// Create a new router instance
const router = createRouter({
  routeTree,
  context: routerContext,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ShoppingCartContextProvider>
            <RouterProvider router={router} />
          </ShoppingCartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
