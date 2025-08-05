"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, LogOut, User, ChevronDown } from "lucide-react"

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  const handleSettings = () => {
    router.push("/settings")
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-400">KeyVault</h1>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <div className="bg-blue-600 p-2 rounded-full">
              <User className="h-4 w-4 text-white" />
            </div>
            <span>Account</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
              <button
                onClick={handleSettings}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
