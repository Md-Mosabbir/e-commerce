import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Root from "./app/Root"
import Home from "./app/Home"
import Shop from "./app/Shop"
import ViewProduct from "./app/ViewProduct"
import ErrorPage from "./app/ErrorPage"

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ViewProduct />} />
      </Route>,
    ),
  )
  return <RouterProvider router={router} />
}
