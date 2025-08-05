"use client"

import { useState, useEffect } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import ProjectView from "@/components/ProjectView"
import WelcomeView from "@/components/WelcomeView"
import KeyModal from "@/components/KeyModal"
import AddKeyModal from "@/components/AddKeyModal"
import { useAuth } from "@/contexts/AuthContext"
import { databaseService } from "@/lib/database"
import type { Project, ApiKey, Customer } from "@/lib/database"
import { ObjectId } from "mongodb"

export default function Dashboard() {
  const { user } = useAuth()
  const [selectedProject, setSelectedProject] = useState<(Project & { keyCount: number }) | null>(null)
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null)
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false)
  const [isAddKeyModalOpen, setIsAddKeyModalOpen] = useState(false)
  const [projects, setProjects] = useState<(Project & { keyCount: number })[]>([])
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    try {
      if (!user) return

      // Get customer data
      const customerData = await databaseService.getCustomerByAppwriteId(user.$id)
      if (customerData) {
        setCustomer(customerData)

        // Load projects with key counts
        const projectsData = await databaseService.getProjectsWithKeyCounts(customerData._id!)
        setProjects(projectsData)
      }
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewKey = async (keyId: string) => {
    try {
      const key = await databaseService.getApiKeyById(new ObjectId(keyId))
      if (key) {
        setSelectedKey(key)
        setIsKeyModalOpen(true)
      }
    } catch (error) {
      console.error("Failed to load key:", error)
    }
  }

  const handleAddKey = () => {
    setIsAddKeyModalOpen(true)
  }

  const handleDeleteKey = async (keyId: string) => {
    try {
      await databaseService.deleteApiKey(new ObjectId(keyId))
      // Reload data to update counts
      await loadData()

      // Update selected project if it exists
      if (selectedProject && customer) {
        const updatedProject = await databaseService.getProjectsWithKeyCounts(customer._id!)
        const updated = updatedProject.find((p) => p._id?.toString() === selectedProject._id?.toString())
        if (updated) {
          setSelectedProject(updated)
        }
      }
    } catch (error) {
      console.error("Failed to delete key:", error)
    }
  }

  const handleSaveKey = async (keyData: {
    name: string
    service: string
    environment: "development" | "staging" | "production"
    keyValue: string
    notes?: string
    rotationReminder?: "30" | "60" | "90" | "180" | "none"
  }) => {
    try {
      if (!selectedProject || !customer) return

      await databaseService.createApiKey(selectedProject._id!, customer._id!, keyData)

      // Reload data
      await loadData()

      // Update selected project
      const updatedProjects = await databaseService.getProjectsWithKeyCounts(customer._id!)
      const updated = updatedProjects.find((p) => p._id?.toString() === selectedProject._id?.toString())
      if (updated) {
        setSelectedProject(updated)
      }

      setIsAddKeyModalOpen(false)
    } catch (error) {
      console.error("Failed to save key:", error)
    }
  }

  const handleCreateProject = async (projectName: string) => {
    try {
      if (!customer) return

      await databaseService.createProject(customer._id!, projectName)
      await loadData()
    } catch (error) {
      console.error("Failed to create project:", error)
    }
  }

  const handleSelectProject = async (project: Project & { keyCount: number }) => {
    setSelectedProject(project)
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="flex">
          <Sidebar
            projects={projects}
            selectedProject={selectedProject}
            onSelectProject={handleSelectProject}
            onCreateProject={handleCreateProject}
          />
          <main className="flex-1 p-6">
            {selectedProject ? (
              <ProjectView
                project={selectedProject}
                onViewKey={handleViewKey}
                onAddKey={handleAddKey}
                onDeleteKey={handleDeleteKey}
              />
            ) : (
              <WelcomeView />
            )}
          </main>
        </div>

        {isKeyModalOpen && selectedKey && <KeyModal apiKey={selectedKey} onClose={() => setIsKeyModalOpen(false)} />}

        {isAddKeyModalOpen && (
          <AddKeyModal
            onClose={() => setIsAddKeyModalOpen(false)}
            onSave={handleSaveKey}
            projects={projects}
            selectedProject={selectedProject}
          />
        )}
      </div>
    </ProtectedRoute>
  )
}
