"use client"

import { useState, useEffect } from "react"
import {
  Shield,
  Key,
  Zap,
  Lock,
  Users,
  Download,
  ArrowRight,
  CheckCircle,
  Star,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your API keys are encrypted with AES-256 encryption and stored securely in the cloud.",
    },
    {
      icon: Key,
      title: "Organized Management",
      description: "Group keys by projects, environments, and services for easy organization and access.",
    },
    {
      icon: Zap,
      title: "Quick Access",
      description: "Find and copy your API keys instantly with our intuitive search and filtering system.",
    },
    {
      icon: Download,
      title: "Export Ready",
      description: "Generate .env files for your projects with a single click. Perfect for deployment workflows.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share keys securely with your team members and control access permissions.",
    },
    {
      icon: Lock,
      title: "Rotation Reminders",
      description: "Never forget to rotate your keys with automated reminders and expiration tracking.",
    },
  ]

  const benefits = [
    "Eliminate API key exposure in your codebase",
    "Reduce security incidents by 90%",
    "Save 2+ hours per week on key management",
    "Streamline your deployment process",
    "Maintain compliance with security standards",
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer at TechCorp",
      content:
        "KeyVault has completely transformed how we manage our API keys. No more scattered keys in different files!",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      role: "DevOps Engineer at StartupXYZ",
      content: "The export feature is a game-changer. We can deploy to any environment with confidence.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Security Lead at DataFlow",
      content: "Finally, a solution that makes API key management both secure and developer-friendly.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Key className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-400">KeyVault</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">
                Features
              </a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors duration-200">
                Benefits
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors duration-200">
                Testimonials
              </a>
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors duration-200">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-800 border-t border-gray-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-white">
                  Features
                </a>
                <a href="#benefits" className="block px-3 py-2 text-gray-300 hover:text-white">
                  Benefits
                </a>
                <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-white">
                  Testimonials
                </a>
                <Link href="/login" className="block px-3 py-2 text-gray-300 hover:text-white">
                  Sign In
                </Link>
                <Link href="/register" className="block px-3 py-2 text-blue-400 hover:text-blue-300">
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Secure API Key
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {" "}
                  Management
                </span>
                <br />
                for Developers
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Stop hardcoding API keys in your projects. KeyVault provides enterprise-grade security for storing,
                organizing, and managing all your API credentials in one secure location.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="btn-primary text-lg px-8 py-4 flex items-center justify-center group">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link href="/login" className="btn-secondary text-lg px-8 py-4 flex items-center justify-center">
                  Sign In
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Free forever plan</span>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
                  <div className="bg-gray-800 rounded-lg p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Production Keys</h3>
                      <span className="bg-green-500 text-green-100 px-2 py-1 rounded text-xs">3 keys</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                        <div>
                          <div className="font-medium">OpenAI API Key</div>
                          <div className="text-sm text-gray-400">sk-****...cdef</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Key className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                        <div>
                          <div className="font-medium">Stripe Secret Key</div>
                          <div className="text-sm text-gray-400">sk_live_****...xyz</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Key className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-blue-600 p-3 rounded-full shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to manage API keys
              <span className="text-blue-400"> securely</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From individual developers to enterprise teams, KeyVault provides the tools you need to keep your API
              credentials safe and organized.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`card hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-blue-600/10 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why developers choose
                <span className="text-blue-400"> KeyVault</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of developers who have already secured their API keys and streamlined their development
                workflow.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center group">
                  Start Securing Your Keys
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Security Dashboard</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-green-400">All keys secure</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-400">24</div>
                      <div className="text-sm text-gray-400">API Keys</div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-400">100%</div>
                      <div className="text-sm text-gray-400">Encrypted</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Security Score</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full w-[95%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Trusted by developers
              <span className="text-blue-400"> worldwide</span>
            </h2>
            <p className="text-xl text-gray-300">See what our users have to say about KeyVault</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card hover:bg-gray-700/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-100">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to secure your API keys?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who trust KeyVault with their most sensitive credentials. Start your free
            account today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center group"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link href="/login" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center">
              Sign In to Your Account
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            No credit card required • Free forever plan • Enterprise options available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Key className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-blue-400">KeyVault</span>
              </div>
              <p className="text-gray-400">Secure API key management for modern developers and teams.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-200 mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-white transition-colors duration-200">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-200 mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-200 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    API
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KeyVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
