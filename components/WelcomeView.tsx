import { Key, Shield, Zap } from "lucide-react"

export default function WelcomeView() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="bg-blue-600 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Key className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-100 mb-4">Welcome to KeyVault</h1>
          <p className="text-xl text-gray-400 mb-8">Securely manage your API keys and credentials in one place</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <Shield className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-200 mb-2">Secure Storage</h3>
            <p className="text-gray-400 text-sm">Your API keys are encrypted and stored securely</p>
          </div>

          <div className="card text-center">
            <Zap className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-200 mb-2">Easy Access</h3>
            <p className="text-gray-400 text-sm">Quickly find and manage keys across projects</p>
          </div>

          <div className="card text-center">
            <Key className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-200 mb-2">Export Ready</h3>
            <p className="text-gray-400 text-sm">Generate .env files for your applications</p>
          </div>
        </div>

        <div className="text-gray-400">
          <p>Select a project from the sidebar or create a new one to get started</p>
        </div>
      </div>
    </div>
  )
}
