"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { authService, type User } from "@/lib/auth"
import { databaseService } from "@/lib/database"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<void>
  logout: () => Promise<void>
  updateEmail: (email: string, password: string) => Promise<void>
  updatePassword: (newPassword: string, oldPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        // Ensure customer exists in MongoDB
        await ensureCustomerExists(currentUser)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const ensureCustomerExists = async (user: User) => {
    try {
      let customer = await databaseService.getCustomerByAppwriteId(user.$id)
      if (!customer) {
        customer = await databaseService.createCustomer(user.$id, user.email, user.name || "User")
      }
    } catch (error) {
      console.error("Failed to ensure customer exists:", error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password)
      setUser(user)
      await ensureCustomerExists(user)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const register = async (email: string, password: string, name?: string) => {
    try {
      const user = await authService.createAccount(email, password, name)
      // Auto-login after registration
      await login(email, password)
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
      throw error
    }
  }

  const updateEmail = async (email: string, password: string) => {
    try {
      const updatedUser = await authService.updateEmail(email, password)
      setUser(updatedUser)
    } catch (error) {
      console.error("Email update failed:", error)
      throw error
    }
  }

  const updatePassword = async (newPassword: string, oldPassword: string) => {
    try {
      const updatedUser = await authService.updatePassword(newPassword, oldPassword)
      setUser(updatedUser)
    } catch (error) {
      console.error("Password update failed:", error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateEmail,
    updatePassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
