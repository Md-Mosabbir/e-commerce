import React, { createContext, useContext, useState } from "react"

import axiosInstance from "../utils/axiosInstance"
import { signInSchema } from "../types/signInSchema"
import { editUserSchema, signUpSchema } from "../types/signUpSchema"
import * as z from "zod"
import { User } from "../types/User"
import { useNavigate } from "react-router-dom"

type AuthContextType = {
  user: User | null
  signIn: (data: z.infer<typeof signInSchema>) => Promise<void>

  signUp: (data: z.infer<typeof signUpSchema>) => Promise<void>

  signOut: () => Promise<void>

  editUser: (data: z.infer<typeof editUserSchema>) => Promise<void>

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
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    setUser(response.data)

    navigate("/auth")
  }

  const editUser = async (data: z.infer<typeof editUserSchema>) => {
    const response = await axiosInstance.post("/users/edit", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    console.log("Edit User", data)

    setUser(response.data)

    navigate("/profile")
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
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, getUser, editUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth, AuthContext, AuthProvider }
