import React, { createContext, useContext, useState } from "react"

import axiosInstance from "../utils/axiosInstance"
import { signInSchema } from "../types/signInSchema"
import { signUpSchema } from "../types/signUpSchema"
import * as z from "zod"
import { User } from "../types/User"
import { useNavigate } from "react-router-dom"

type AuthContextType = {
  user: User | null
  signIn: (data: z.infer<typeof signInSchema>) => Promise<void>

  signUp: (data: z.infer<typeof signUpSchema>) => Promise<void>

  signOut: () => Promise<void>

  getUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

// Custom hook to use the AuthContext
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  const signIn = async (data: z.infer<typeof signInSchema>) => {
    const response = await axiosInstance.post("/users/sign-in", data, {
      withCredentials: true,
    })

    setUser(response.data)

    navigate("/profile")
  }

  const signUp = async (data: z.infer<typeof signUpSchema>) => {
    const response = await axiosInstance.post("/users/sign-up", data, {
      withCredentials: true,
    })

    setUser(response.data)

    navigate("/auth")
  }

  const getUser = async () => {
    const response = await axiosInstance.get("/users/profile", {
      withCredentials: true,
    })

    setUser(response.data)

    return response.data
  }

  const signOut = async () => {
    await axiosInstance.post("/users/logout")
    setUser(null)
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, getUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth, AuthContext, AuthProvider }
