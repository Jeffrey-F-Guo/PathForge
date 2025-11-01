"use client"

import { useState } from "react"
import { X, Search, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resources } from "@/lib/resource-data"

interface AddResourceModalProps {
  isOpen: boolean
  onClose: () => void
  onAddResource: (resourceId: string) => void
  currentPathway: string
}

export function AddResourceModal({ isOpen, onClose, onAddResource, currentPathway }: AddResourceModalProps) {
  const [activeTab, setActiveTab] = useState<"browse" | "recommended">("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [addedResources, setAddedResources] = useState<string[]>([])

  if (!isOpen) return null

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || resource.type === selectedType
    return matchesSearch && matchesType
  })

  const recommendedResources = resources.filter((r) => r.paths.includes(currentPathway)).slice(0, 8)

  const handleAddResource = (resourceId: string) => {
    onAddResource(resourceId)
    setAddedResources([...addedResources, resourceId])
    setTimeout(() => {
      setAddedResources(addedResources.filter((id) => id !== resourceId))
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[80vh] bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Add Resource</h2>
            <p className="text-sm text-slate-400 mt-1">Browse or get recommendations for your roadmap</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-slate-100">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 px-6 pt-4 border-b border-slate-700">
          <button
            onClick={() => setActiveTab("browse")}
            className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "browse"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            Browse Library
          </button>
          <button
            onClick={() => setActiveTab("recommended")}
            className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "recommended"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            Recommended for You
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "browse" ? (
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-900 border-slate-700 text-slate-100"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  {["all", "course", "tutorial", "project", "tool"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedType === type
                          ? "bg-blue-500 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resource Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-slate-900 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          resource.type === "course"
                            ? "bg-blue-500/20 text-blue-400"
                            : resource.type === "tutorial"
                              ? "bg-purple-500/20 text-purple-400"
                              : resource.type === "project"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-100 mb-1 line-clamp-1">{resource.title}</h3>
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{resource.duration}</span>
                      <Button
                        size="sm"
                        onClick={() => handleAddResource(resource.id)}
                        disabled={addedResources.includes(resource.id)}
                        className="h-7 text-xs"
                      >
                        {addedResources.includes(resource.id) ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-slate-400 mb-4">Based on your {currentPathway} pathway</p>

              <div className="space-y-3">
                {recommendedResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-slate-900 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              resource.type === "course"
                                ? "bg-blue-500/20 text-blue-400"
                                : resource.type === "tutorial"
                                  ? "bg-purple-500/20 text-purple-400"
                                  : resource.type === "project"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-orange-500/20 text-orange-400"
                            }`}
                          >
                            {resource.type}
                          </span>
                          <span className="text-xs text-slate-500">{resource.duration}</span>
                        </div>
                        <h3 className="font-semibold text-slate-100 mb-1">{resource.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">{resource.description}</p>
                        <p className="text-xs text-blue-400">Recommended: Essential for {currentPathway} path</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddResource(resource.id)}
                        disabled={addedResources.includes(resource.id)}
                        className="ml-4"
                      >
                        {addedResources.includes(resource.id) ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {addedResources.length > 0 && (
          <div className="p-4 border-t border-slate-700 bg-slate-900/50">
            <p className="text-sm text-green-400">
              Recently added: {addedResources.length} resource{addedResources.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
