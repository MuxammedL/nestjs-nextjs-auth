'use client'
import React, { useState } from 'react';
import { Shield, Zap, Globe, ArrowRight, Menu, X, BarChart3 } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  const handleRegisterRedirect = () => {
    window.location.href = '/register';
  };

  const handleDashboardRedirect = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                SecureApp
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">Features</a>
              <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">About</a>
              <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact</a>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLoginRedirect}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleRegisterRedirect}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
                <button
                  onClick={handleDashboardRedirect}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  Dashboard
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-xl border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-cyan-400">Features</a>
              <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-cyan-400">About</a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-cyan-400">Contact</a>
              <button
                onClick={handleLoginRedirect}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400"
              >
                Login
              </button>
              <button
                onClick={handleRegisterRedirect}
                className="block w-full text-left px-3 py-2 text-cyan-400"
              >
                Get Started
              </button>
              <button
                onClick={handleDashboardRedirect}
                className="block w-full text-left px-3 py-2 text-green-400"
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Secure Authentication
              <br />
              Made Simple
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience lightning-fast authentication with enterprise-grade security.
              Built with Next.js and NestJS for maximum performance and reliability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRegisterRedirect}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/25"
              >
                Get Started Free
                <ArrowRight className="inline ml-2 h-5 w-5" />
              </button>
              <button
                onClick={handleLoginRedirect}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Sign In
              </button>
              <button
                onClick={handleDashboardRedirect}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-green-500/25"
              >
                <BarChart3 className="inline mr-2 h-5 w-5" />
                Test Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose SecureApp?</h2>
            <p className="text-xl text-gray-300">Built with modern technologies for maximum security and performance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
              <Shield className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">Enterprise Security</h3>
              <p className="text-gray-300">Advanced encryption and security protocols to protect your data with military-grade security.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-300">Optimized performance with Next.js and NestJS for instant authentication and smooth user experience.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105">
              <Globe className="h-12 w-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">Global Scale</h3>
              <p className="text-gray-300">Distributed architecture that scales globally with 99.9% uptime and worldwide CDN support.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}