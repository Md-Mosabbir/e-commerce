import React from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user, getUser } = useAuth()

  const query = useQuery({
    queryKey: ["users", "profile"],
    queryFn: getUser,
    retry: 2,
  })

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to={"/auth"} />
  }

  return <> {children} </>
}
export default ProtectedRoutes
