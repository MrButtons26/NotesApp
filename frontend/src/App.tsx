import { createBrowserRouter,RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import FaviconChange from "./utils/faviconChange";
import LoginPage from "./pages/LoginPage";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import NotesPage from "./pages/NotesPage";
const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path:'/login',
    Component:LoginPage
  },
  {
    path:'/notes',
    Component:NotesPage
  }
]);

const queryClient = new QueryClient()


function App() {
FaviconChange();
  return (
    <>
        <QueryClientProvider client={queryClient}>

       <RouterProvider router={router} />
       </QueryClientProvider>

    </>
  )
}

export default App
