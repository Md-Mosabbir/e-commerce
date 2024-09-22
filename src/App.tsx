import { Routes, Route } from "react-router-dom"
import Root from "./app/Root"
import Home from "./app/Home"
import Shop from "./app/Shop"
import ViewProduct from "./app/ViewProduct"
import ErrorPage from "./app/ErrorPage"
import Authentication from "./app/Authentication"
import VerifyUser from "./app/VerifyUser"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Profile from "./app/Profile"
import { Toaster } from "./components/ui/toaster"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./context/AuthContext"
import Checkout from "./app/Checkout"
import ViewOrder from "./app/ViewOrder"

export default function App() {
  const { getUser } = useAuth()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const query = useQuery({
    queryKey: ["users", "profile"],
    queryFn: getUser,
    retry: 2,
  })

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<ViewProduct />} />

          <Route path="/:username/verify" element={<VerifyUser />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoutes>
                <Checkout />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoutes>
                <ViewOrder />
              </ProtectedRoutes>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}
