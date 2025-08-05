"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, Lock, Bell } from "lucide-react"
import Header from "@/components/Header"

export default function SettingsPage() {
  const router = useRouter()
  const [email, setEmail] = useState("user@example.com")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [router])

  const validatePasswordForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password"
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEmailUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess("Email updated successfully")
    setTimeout(() => setSuccess(""), 3000)
  }

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePasswordForm()) {
      setSuccess("Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setTimeout(() => setSuccess(""), 3000)
    }
  }

  const handleNotificationUpdate = () => {
    setNotifications(!notifications)
    setSuccess("Notification preferences updated")
    setTimeout(() => setSuccess(""), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-100">Settings</h1>
        </div>

        {success && (
          <div className="bg-green-900/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        <div className="space-y-8">
          {/* Email Settings */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-100">Email Settings</h2>
            </div>

            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field w-full max-w-md"
                />
              </div>
              <button type="submit" className="btn-primary">
                Update Email
              </button>
            </form>
          </div>

          {/* Password Settings */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="h-6 w-6 text-red-400" />
              <h2 className="text-xl font-semibold text-gray-100">Change Password</h2>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`input-field w-full max-w-md ${errors.currentPassword ? "border-red-500" : ""}`}
                />
                {errors.currentPassword && <p className="mt-1 text-sm text-red-400">{errors.currentPassword}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`input-field w-full max-w-md ${errors.newPassword ? "border-red-500" : ""}`}
                />
                {errors.newPassword && <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`input-field w-full max-w-md ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" className="btn-primary">
                Update Password
              </button>
            </form>
          </div>

          {/* Notification Settings */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="h-6 w-6 text-green-400" />
              <h2 className="text-xl font-semibold text-gray-100">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-200">Key Rotation Reminders</h3>
                  <p className="text-sm text-gray-400">Get notified when it's time to rotate your API keys</p>
                </div>
                <button
                  onClick={handleNotificationUpdate}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    notifications ? "bg-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      notifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
