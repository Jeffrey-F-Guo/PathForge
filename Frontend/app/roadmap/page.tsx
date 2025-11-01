"use client"

import { useState, useCallback } from "react"
import {
  ReactFlow,
  type Node,
  type Edge,
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { ChevronDown, Plus, Download, Share2, Sparkles, Check, Clock, Lock, Circle, Menu, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { defaultRoadmapNodes, calculateProgress, getNodesByStatus, type RoadmapNode } from "@/lib/roadmap-data"
import { AddResourceModal } from "@/components/add-resource-modal"

const ResourceNode = ({ data }: { data: RoadmapNode }) => {
  const getStatusColor = (status: RoadmapNode["status"]) => {
    switch (status) {
      case "completed":
        return "border-green-500 bg-green-500/10"
      case "in-progress":
        return "border-yellow-500 bg-yellow-500/10"
      case "available":
        return "border-blue-500 bg-blue-500/10"
      case "locked":
        return "border-slate-700 bg-slate-800/50 opacity-60"
    }
  }

  const getStatusIcon = (status: RoadmapNode["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-3 w-3 text-green-400" />
      case "in-progress":
        return <Clock className="h-3 w-3 text-yellow-400" />
      case "available":
        return <Circle className="h-3 w-3 text-blue-400" />
      case "locked":
        return <Lock className="h-3 w-3 text-slate-500" />
    }
  }

  return (
    <div className={`px-3 py-2 rounded-lg border-2 ${getStatusColor(data.status)} min-w-[140px] max-w-[180px]`}>
      <div className="flex items-start justify-between mb-1">
        {getStatusIcon(data.status)}
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
            data.type === "course"
              ? "bg-blue-500/20 text-blue-400"
              : data.type === "tutorial"
                ? "bg-purple-500/20 text-purple-400"
                : data.type === "project"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-orange-500/20 text-orange-400"
          }`}
        >
          {data.type}
        </span>
      </div>
      <h3 className="font-semibold text-slate-100 text-xs mb-0.5 line-clamp-2">{data.title}</h3>
      <p className="text-[10px] text-slate-400">{data.duration}</p>
    </div>
  )
}

const nodeTypes = {
  resource: ResourceNode,
}

export default function RoadmapPage() {
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>(defaultRoadmapNodes)
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null)
  const [currentPathway] = useState("Senior Software Engineer Path")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [canvasExpanded, setCanvasExpanded] = useState(false)

  const initialNodes: Node[] = roadmapNodes.map((node, index) => ({
    id: node.id,
    type: "resource",
    position: { x: (index % 4) * 200, y: Math.floor(index / 4) * 120 },
    data: node,
  }))

  const initialEdges: Edge[] = roadmapNodes.flatMap((node) =>
    node.prerequisites.map((prereqId) => ({
      id: `${prereqId}-${node.id}`,
      source: prereqId,
      target: node.id,
      type: "smoothstep",
      animated: node.status === "in-progress",
      style: { stroke: "#475569" },
    })),
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const progress = calculateProgress(roadmapNodes)
  const completedNodes = getNodesByStatus(roadmapNodes, "completed")
  const inProgressNodes = getNodesByStatus(roadmapNodes, "in-progress")
  const availableNodes = getNodesByStatus(roadmapNodes, "available")
  const lockedNodes = getNodesByStatus(roadmapNodes, "locked")

  const upNextNodes = availableNodes.slice(0, 8)
  const futureNodes = [...availableNodes.slice(8), ...lockedNodes]

  const handleNodeClick = (node: RoadmapNode) => {
    setSelectedNode(node)
  }

  const handleStatusChange = (nodeId: string, newStatus: RoadmapNode["status"]) => {
    setRoadmapNodes(
      roadmapNodes.map((node) =>
        node.id === nodeId
          ? { ...node, status: newStatus, progress: newStatus === "completed" ? 100 : node.progress }
          : node,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-slate-400">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">My Roadmap</h1>
          <Button variant="ghost" size="icon" className="text-slate-400">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">{currentPathway}</h2>
          <p className="text-sm text-slate-400">{progress.percentage}% Complete</p>
        </div>
        <div className="relative h-16 w-16">
          <svg className="transform -rotate-90" width="64" height="64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-slate-700"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress.percentage / 100)}`}
              className="text-blue-500 transition-all duration-500"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-100">
            {progress.percentage}%
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Current Status */}
        <div className="w-64 border-r border-slate-800 overflow-y-auto bg-slate-900/30">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Current Status</h3>

            {/* Completed Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Completed</span>
                <span className="text-xs text-slate-500">({completedNodes.length})</span>
              </div>
            </div>

            {/* In Progress Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">In Progress</span>
                <span className="text-xs text-slate-500">({inProgressNodes.length})</span>
              </div>
              <div className="space-y-2">
                {inProgressNodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    className={`w-full text-left p-2 rounded-lg hover:bg-slate-800 transition-colors ${
                      selectedNode?.id === node.id ? "bg-slate-800 border border-slate-700" : ""
                    }`}
                  >
                    <div className="text-sm font-medium text-slate-300 line-clamp-1">{node.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Up Next Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Up Next</span>
                <span className="text-xs text-slate-500">({upNextNodes.length})</span>
              </div>
            </div>

            {/* Future Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Future</span>
                <span className="text-xs text-slate-500">({futureNodes.length})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Resource Details */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-slate-800 p-4">
            <h3 className="text-sm font-semibold text-slate-300">Resource Details</h3>
          </div>

          {selectedNode ? (
            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-2">{selectedNode.title}</h2>
                <p className="text-sm text-slate-400">{selectedNode.description}</p>
              </div>

              <div className="flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedNode.status === "in-progress"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : selectedNode.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {selectedNode.status === "in-progress"
                    ? "In Progress"
                    : selectedNode.status === "completed"
                      ? "Completed"
                      : "Available"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedNode.type === "course"
                      ? "bg-blue-500/20 text-blue-400"
                      : selectedNode.type === "tutorial"
                        ? "bg-purple-500/20 text-purple-400"
                        : selectedNode.type === "project"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-orange-500/20 text-orange-400"
                  }`}
                >
                  {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Status</h4>
                <select
                  value={selectedNode.status}
                  onChange={(e) => handleStatusChange(selectedNode.id, e.target.value as RoadmapNode["status"])}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
                >
                  <option value="available">Available</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="locked">Locked</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-4">
              <div>
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 mx-auto">
                  <Circle className="h-8 w-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-300 mb-2">No resource selected</h3>
                <p className="text-sm text-slate-500">Click on a resource to view details</p>
              </div>
            </div>
          )}

          <div className="border-t border-slate-800">
            <button
              onClick={() => setCanvasExpanded(!canvasExpanded)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-900/50 transition-colors"
            >
              <h3 className="text-sm font-semibold text-slate-300">Interactive Roadmap Canvas</h3>
              <ChevronDown
                className={`h-4 w-4 text-slate-500 transition-transform ${canvasExpanded ? "rotate-180" : ""}`}
              />
            </button>

            {canvasExpanded && (
              <div className="h-96 bg-slate-950 border-t border-slate-800">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  fitView
                  className="bg-slate-950"
                  onNodeClick={(_, node) => {
                    const roadmapNode = roadmapNodes.find((n) => n.id === node.id)
                    if (roadmapNode) handleNodeClick(roadmapNode)
                  }}
                >
                  <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#334155" />
                  <Controls className="bg-slate-800 border-slate-700" />
                  <MiniMap
                    className="bg-slate-900 border border-slate-700"
                    nodeColor={(node) => {
                      const data = node.data as RoadmapNode
                      switch (data.status) {
                        case "completed":
                          return "#22c55e"
                        case "in-progress":
                          return "#eab308"
                        case "available":
                          return "#3b82f6"
                        default:
                          return "#475569"
                      }
                    }}
                  />
                </ReactFlow>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="flex items-center justify-around p-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs">Add</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-100 transition-colors">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs">AI Reorder</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-100 transition-colors">
            <Download className="h-5 w-5" />
            <span className="text-xs">Export</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-100 transition-colors">
            <Share2 className="h-5 w-5" />
            <span className="text-xs">Share</span>
          </button>
        </div>
      </div>

      <AddResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddResource={(id) => console.log("[v0] Adding resource:", id)}
        currentPathway={currentPathway}
      />
    </div>
  )
}
