"use client"

import type React from "react"

import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import type { Project, ApiKey } from "@/types"

interface AddKeyModalProps {
  onClose: () => void
  onSave: (keyData: Partial<ApiKey>) => void
  projects: Project[]
  selectedProject: Project | null
}

export default function AddKeyModal({ onClose, onSave, projects, selectedProject }: AddKeyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    environment: "Production",
    keyValue: "",
    notes: "",
    rotationReminder: "90 days",
  })
  const [showKey, setShowKey] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "Key name is required"
    }

    if (!formData.service.trim()) {
      newErrors.service = "Service is required"
    }

    if (!formData.keyValue.trim()) {
      newErrors.keyValue = "Key value is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-gray-100">Add New API Key</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Key Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`input-field w-full ${errors.name ? "border-red-500" : ""}`}
                placeholder="e.g., Production Key"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Service *</label>
              <input
                type="text"
                value={formData.service}
                onChange={(e) => handleInputChange("service", e.target.value)}
                className={`input-field w-full ${errors.service ? "border-red-500" : ""}`}
                placeholder="e.g., OpenAI, AWS, Stripe"
              />
              {errors.service && <p className="mt-1 text-sm text-red-400">{errors.service}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Environment</label>
              <select
                value={formData.environment}
                onChange={(e) => handleInputChange("environment", e.target.value)}
                className="input-field w-full"
              >
                <option value="Development">Development</option>
                <option value="Staging">Staging</option>
                <option value="Production">Production</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Rotation Reminder</label>
              <select
                value={formData.rotationReminder}
                onChange={(e) => handleInputChange("rotationReminder", e.target.value)}
                className="input-field w-full"
              >
                <option value="None">None</option>
                <option value="30 days">30 days</option>
                <option value="60 days">60 days</option>
                <option value="90 days">90 days</option>
                <option value="180 days">180 days</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">API Key Value *</label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={formData.keyValue}
                onChange={(e) => handleInputChange("keyValue", e.target.value)}
                className={`input-field w-full pr-10 ${errors.keyValue ? "border-red-500" : ""}`}
                placeholder="Enter your API key"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.keyValue && <p className="mt-1 text-sm text-red-400">{errors.keyValue}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="input-field w-full h-24 resize-none"
              placeholder="Optional notes about this API key"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save API Key
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
