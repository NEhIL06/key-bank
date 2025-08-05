"use client"

import { useState } from "react"
import { X, Eye, EyeOff, Copy, Calendar, Shield } from "lucide-react"
import type { ApiKey } from "@/types"

interface KeyModalProps {
  apiKey: ApiKey
  onClose: () => void
}

export default function KeyModal({ apiKey, onClose }: KeyModalProps) {
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-gray-100">API Key Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Key Name</label>
              <div className="bg-gray-700 p-3 rounded-lg text-gray-100">{apiKey.name}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Service</label>
              <div className="bg-gray-700 p-3 rounded-lg">
                <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-sm">{apiKey.service}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Environment</label>
              <div className="bg-gray-700 p-3 rounded-lg">
                <span className="bg-gray-600 text-gray-200 px-2 py-1 rounded text-sm">{apiKey.environment}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Created Date
              </label>
              <div className="bg-gray-700 p-3 rounded-lg text-gray-100">{apiKey.createdAt}</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Shield className="inline h-4 w-4 mr-1" />
              API Key Value
            </label>
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <code className="text-green-400 font-mono text-sm break-all">
                  {showKey ? apiKey.keyValue : apiKey.maskedValue}
                </code>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="p-2 text-gray-400 hover:text-gray-200 transition-colors duration-200"
                    title={showKey ? "Hide key" : "Show key"}
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(apiKey.keyValue)}
                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {copied && <div className="text-green-400 text-sm mt-2">✓ Copied to clipboard</div>}
            </div>
          </div>

          {apiKey.notes && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
              <div className="bg-gray-700 p-3 rounded-lg text-gray-100">{apiKey.notes}</div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Rotation Reminder</label>
            <div className="bg-gray-700 p-3 rounded-lg text-gray-100">{apiKey.rotationReminder}</div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
          <button className="btn-primary">Edit Key</button>
        </div>
      </div>
    </div>
  )
}
