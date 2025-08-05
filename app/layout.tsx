import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/contexts/AuthContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KeyVault - Secure API Key Management for Developers",
  description:
    "Securely store, organize, and manage your API keys with enterprise-grade encryption. Perfect for developers and teams who need reliable API credential management.",
  keywords: "API key management, secure storage, developer tools, API security, credential management",
  authors: [{ name: "KeyVault Team" }],
  openGraph: {
    title: "KeyVault - Secure API Key Management",
    description: "Enterprise-grade API key management for modern developers",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
