"use client"

import { Sparkles, Calendar, Rocket } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function UpcomingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Animated Icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-24 h-24 mx-auto rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Coming Soon!
            </h1>
            <p className="text-xl md:text-2xl text-slate-400">
              We're working on something exciting
            </p>
          </div>

          {/* Description */}
          <div className="glass-effect rounded-2xl p-8 border-2 border-slate-700 bg-slate-900/50 backdrop-blur-sm">
            <p className="text-slate-300 leading-relaxed">
              This feature is currently under development. We're building something amazing that will help you
              navigate your learning journey even better. Stay tuned for updates!
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 mx-auto">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Planned Features</h3>
              <p className="text-sm text-slate-400">
                New functionality to enhance your roadmap experience
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 mx-auto">
                <Rocket className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Coming Updates</h3>
              <p className="text-sm text-slate-400">
                Continuous improvements based on your feedback
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="pt-8">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <div
                className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Building in progress...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
