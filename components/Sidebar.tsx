"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Folder } from "lucide-react"
import type { Project } from "@/types"

interface SidebarProps {
  projects: Project[]
  selectedProject: Project | null
  onSelectProject: (project: Project) => void
  onCreateProject: (name: string) => void
}

export default function Sidebar({ projects, selectedProject, onSelectProject, onCreateProject }: SidebarProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim())
      setNewProjectName("")
      setIsCreating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateProject()
    } else if (e.key === "Escape") {
      setIsCreating(false)
      setNewProjectName("")
    }
  }

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">Projects</h2>

        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`sidebar-item ${selectedProject?.id === project.id ? "active" : ""}`}
            >
              <div className="flex items-center space-x-3">
                <Folder className="h-5 w-5" />
                <span className="truncate">{project.name}</span>
              </div>
              <span className="text-sm bg-gray-600 px-2 py-1 rounded-full">{project.keyCount}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          {isCreating ? (
            <div className="space-y-2">
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Project name"
                className="input-field w-full text-sm"
                autoFocus
              />
              <div className="flex space-x-2">
                <button onClick={handleCreateProject} className="btn-primary text-sm py-1 px-3 flex-1">
                  Create
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false)
                    setNewProjectName("")
                  }}
                  className="btn-secondary text-sm py-1 px-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center space-x-2 w-full p-3 text-blue-400 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <Plus className="h-5 w-5" />
              <span>New Project</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
