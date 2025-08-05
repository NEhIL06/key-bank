/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { account } from "./appwrite"
import { ID } from "appwrite"

export interface User {
  $id: string
  email: string
  name: string
  emailVerification: boolean
  prefs: Record<string, any>
}

export class AuthService {
  async createAccount(email: string, password: string, name?: string): Promise<User> {
    try {
      const user = await account.create(ID.unique(), email, password, name)
      return user as User
    } catch (error) {
      console.error("Account creation failed:", error)
      throw error
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      await account.createSession(email, password)
      const user = await account.get()
      return user as User
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      await account.deleteSession("current")
    } catch (error) {
      console.error("Logout failed:", error)
      throw error
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await account.get()
      return user as User
    } catch (error) {
      return null
    }
  }

  async updateEmail(email: string, password: string): Promise<User> {
    try {
      const user = await account.updateEmail(email, password)
      return user as User
    } catch (error) {
      console.error("Email update failed:", error)
      throw error
    }
  }

  async updatePassword(newPassword: string, oldPassword: string): Promise<User> {
    try {
      const user = await account.updatePassword(newPassword, oldPassword)
      return user as User
    } catch (error) {
      console.error("Password update failed:", error)
      throw error
    }
  }
}

export const authService = new AuthService()
