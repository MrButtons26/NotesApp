import { createBrowserRouter,RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import FaviconChange from "./utils/faviconChange";
const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
]);



function App() {
FaviconChange();
  return (
    <>
       <RouterProvider router={router} />

    </>
  )
}

export default App
