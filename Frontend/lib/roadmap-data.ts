export interface RoadmapNode {
  id: string
  title: string
  type: "course" | "tutorial" | "project" | "tool"
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  status: "completed" | "in-progress" | "available" | "locked"
  description: string
  prerequisites: string[]
  pathways: string[]
  phase: string
  url?: string
  progress?: number
}

export const defaultRoadmapNodes: RoadmapNode[] = [
  // Foundation Phase (Months 1-6)
  {
    id: "python-basics",
    title: "Python Fundamentals",
    type: "course",
    duration: "20 hours",
    difficulty: "beginner",
    status: "completed",
    description: "Learn Python syntax, data structures, and basic programming concepts.",
    prerequisites: [],
    pathways: ["ML Engineer", "Data Scientist", "Backend Developer"],
    phase: "Months 1-6: Foundation",
    url: "https://python.org",
  },
  {
    id: "git-github",
    title: "Git & GitHub",
    type: "tutorial",
    duration: "5 hours",
    difficulty: "beginner",
    status: "completed",
    description: "Version control basics and collaborative development.",
    prerequisites: [],
    pathways: ["All Paths"],
    phase: "Months 1-6: Foundation",
    url: "https://github.com",
  },
  {
    id: "data-structures",
    title: "Data Structures & Algorithms",
    type: "course",
    duration: "40 hours",
    difficulty: "intermediate",
    status: "in-progress",
    description: "Essential CS fundamentals for technical interviews.",
    prerequisites: ["python-basics"],
    pathways: ["All Paths"],
    phase: "Months 1-6: Foundation",
    progress: 65,
  },
  {
    id: "sql-basics",
    title: "SQL Fundamentals",
    type: "course",
    duration: "15 hours",
    difficulty: "beginner",
    status: "in-progress",
    description: "Database querying and data manipulation.",
    prerequisites: ["python-basics"],
    pathways: ["ML Engineer", "Data Engineer", "Backend Developer"],
    phase: "Months 1-6: Foundation",
    progress: 30,
  },
  {
    id: "linux-cli",
    title: "Linux Command Line",
    type: "tutorial",
    duration: "8 hours",
    difficulty: "beginner",
    status: "in-progress",
    description: "Navigate and manage systems using the terminal.",
    prerequisites: [],
    pathways: ["DevOps", "Backend Developer", "ML Engineer"],
    phase: "Months 1-6: Foundation",
    progress: 80,
  },

  // Core Skills Phase (Months 7-12)
  {
    id: "numpy-pandas",
    title: "NumPy & Pandas",
    type: "course",
    duration: "25 hours",
    difficulty: "intermediate",
    status: "available",
    description: "Data manipulation and analysis with Python libraries.",
    prerequisites: ["python-basics", "sql-basics"],
    pathways: ["ML Engineer", "Data Scientist", "Data Engineer"],
    phase: "Months 7-12: Core Skills",
  },
  {
    id: "ml-basics",
    title: "Machine Learning Basics",
    type: "course",
    duration: "50 hours",
    difficulty: "intermediate",
    status: "available",
    description: "Introduction to supervised and unsupervised learning.",
    prerequisites: ["numpy-pandas", "data-structures"],
    pathways: ["ML Engineer", "Data Scientist"],
    phase: "Months 7-12: Core Skills",
  },
  {
    id: "deep-learning",
    title: "Deep Learning Fundamentals",
    type: "course",
    duration: "60 hours",
    difficulty: "advanced",
    status: "locked",
    description: "Neural networks, CNNs, RNNs, and transformers.",
    prerequisites: ["ml-basics"],
    pathways: ["ML Engineer", "Data Scientist"],
    phase: "Months 7-12: Core Skills",
  },
  {
    id: "ml-project-1",
    title: "Build a Classifier",
    type: "project",
    duration: "30 hours",
    difficulty: "intermediate",
    status: "locked",
    description: "End-to-end ML project: data collection to deployment.",
    prerequisites: ["ml-basics"],
    pathways: ["ML Engineer", "Data Scientist"],
    phase: "Months 7-12: Core Skills",
  },

  // Advanced Phase (Months 13-18)
  {
    id: "pytorch-tensorflow",
    title: "PyTorch or TensorFlow",
    type: "course",
    duration: "40 hours",
    difficulty: "advanced",
    status: "locked",
    description: "Deep learning frameworks for production models.",
    prerequisites: ["deep-learning"],
    pathways: ["ML Engineer"],
    phase: "Months 13-18: Advanced",
  },
  {
    id: "mlops",
    title: "MLOps & Model Deployment",
    type: "course",
    duration: "35 hours",
    difficulty: "advanced",
    status: "locked",
    description: "Deploy, monitor, and maintain ML models in production.",
    prerequisites: ["ml-project-1", "linux-cli"],
    pathways: ["ML Engineer"],
    phase: "Months 13-18: Advanced",
  },
  {
    id: "capstone-project",
    title: "Capstone ML Project",
    type: "project",
    duration: "80 hours",
    difficulty: "advanced",
    status: "locked",
    description: "Full-stack ML application with deployment.",
    prerequisites: ["pytorch-tensorflow", "mlops"],
    pathways: ["ML Engineer"],
    phase: "Months 13-18: Advanced",
  },
]

export function getNodesByStatus(nodes: RoadmapNode[], status: RoadmapNode["status"]) {
  return nodes.filter((node) => node.status === status)
}

export function calculateProgress(nodes: RoadmapNode[]) {
  const completed = nodes.filter((n) => n.status === "completed").length
  const inProgress = nodes.filter((n) => n.status === "in-progress").length
  const total = nodes.length

  // Count in-progress as partial completion based on progress percentage
  const inProgressWeight = nodes
    .filter((n) => n.status === "in-progress")
    .reduce((sum, n) => sum + (n.progress || 0) / 100, 0)

  const totalCompleted = completed + inProgressWeight
  const percentage = Math.round((totalCompleted / total) * 100)

  return {
    completed,
    inProgress,
    total,
    percentage,
  }
}
