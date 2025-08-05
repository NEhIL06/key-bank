"use client"

import { useState } from "react"
import { Plus, Eye, Edit, Trash2, Download, Copy } from "lucide-react"
import type { Project, ApiKey } from "@/types"

interface ProjectViewProps {
  project: Project
  onViewKey: (key: ApiKey) => void
  onAddKey: () => void
  onDeleteKey: (keyId: string) => void
}

export default function ProjectView({ project, onViewKey, onAddKey, onDeleteKey }: ProjectViewProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const handleDelete = (keyId: string) => {
    if (deleteConfirm === keyId) {
      onDeleteKey(keyId)
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(keyId)
      setTimeout(() => setDeleteConfirm(null), 3000)
    }
  }

  const handleExportEnv = () => {
    const envContent = project.keys.map((key) => `${key.service.toUpperCase()}_API_KEY=${key.keyValue}`).join("\n")

    const blob = new Blob([envContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${project.name.toLowerCase().replace(/\s+/g, "-")}.env`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">{project.name}</h1>
          <p className="text-gray-400 mt-1">{project.keyCount} API keys</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportEnv}
            className="btn-secondary flex items-center space-x-2"
            disabled={project.keys.length === 0}
          >
            <Download className="h-4 w-4" />
            <span>Export .env</span>
          </button>
          <button onClick={onAddKey} className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Key</span>
          </button>
        </div>
      </div>

      {project.keys.length === 0 ? (
        <div className="card text-center py-12">
          <div className="bg-gray-700 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-200 mb-2">No API keys yet</h3>
          <p className="text-gray-400 mb-4">Add your first API key to get started</p>
          <button onClick={onAddKey} className="btn-primary">
            Add API Key
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {project.keys.map((key) => (
            <div key={key.id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-lg font-semibold text-gray-200">{key.name}</h3>
                    <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-sm">{key.service}</span>
                    <span className="bg-gray-600 text-gray-200 px-2 py-1 rounded text-sm">{key.environment}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Key: {key.maskedValue}</span>
                    <span>Created: {key.createdAt}</span>
                    <button
                      onClick={() => copyToClipboard(key.keyValue)}
                      className="flex items-center space-x-1 text-blue-400 hover:text-blue-300"
                    >
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                  {key.notes && <p className="text-gray-400 text-sm mt-2">{key.notes}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onViewKey(key)}
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded transition-colors duration-200"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded transition-colors duration-200"
                    title="Edit key"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(key.id)}
                    className={`p-2 rounded transition-colors duration-200 ${
                      deleteConfirm === key.id
                        ? "text-red-400 bg-red-900/20"
                        : "text-gray-400 hover:text-red-400 hover:bg-gray-700"
                    }`}
                    title={deleteConfirm === key.id ? "Click again to confirm" : "Delete key"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
