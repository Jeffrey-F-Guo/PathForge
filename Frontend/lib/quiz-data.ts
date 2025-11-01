export interface QuizQuestion {
  id: string
  question: string
  description: string
  type: "preference" | "skill" | "interest" | "workstyle"
  icon: string
  gradient: string
}

export interface QuizAnswer {
  questionId: string
  liked: boolean
}

export interface CareerMatch {
  pathId: string
  score: number
  matchReasons: string[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Building beautiful user interfaces",
    description: "You love making things look good and creating smooth, delightful user experiences",
    type: "interest",
    icon: "Palette",
    gradient: "from-accent to-chart-3",
  },
  {
    id: "q2",
    question: "Working with data and databases",
    description: "You enjoy organizing information, writing queries, and building data pipelines",
    type: "interest",
    icon: "Database",
    gradient: "from-chart-3 to-chart-4",
  },
  {
    id: "q3",
    question: "Solving complex algorithms",
    description: "You get excited about optimization problems and finding elegant solutions",
    type: "skill",
    icon: "Brain",
    gradient: "from-chart-4 to-chart-5",
  },
  {
    id: "q4",
    question: "Seeing your work come to life visually",
    description: "You prefer immediate visual feedback and tangible results you can show others",
    type: "preference",
    icon: "Eye",
    gradient: "from-primary to-accent",
  },
  {
    id: "q5",
    question: "Working on infrastructure and automation",
    description: "You like building systems that make other developers' lives easier",
    type: "interest",
    icon: "Workflow",
    gradient: "from-chart-5 to-primary",
  },
  {
    id: "q6",
    question: "Deep technical problem-solving",
    description: "You enjoy diving deep into complex technical challenges that require focus",
    type: "workstyle",
    icon: "Code",
    gradient: "from-primary to-chart-4",
  },
  {
    id: "q7",
    question: "Building mobile apps",
    description: "You're interested in creating apps for iOS and Android that people use daily",
    type: "interest",
    icon: "Smartphone",
    gradient: "from-accent via-chart-3 to-primary",
  },
  {
    id: "q8",
    question: "Security and protecting systems",
    description: "You're fascinated by cybersecurity, vulnerabilities, and keeping systems safe",
    type: "interest",
    icon: "Shield",
    gradient: "from-chart-3 to-chart-5",
  },
  {
    id: "q9",
    question: "Machine learning and AI",
    description: "You're excited about training models and working with cutting-edge AI technology",
    type: "interest",
    icon: "Brain",
    gradient: "from-chart-4 to-accent",
  },
  {
    id: "q10",
    question: "Full-stack development",
    description: "You want to understand both frontend and backend to build complete applications",
    type: "preference",
    icon: "Code",
    gradient: "from-primary to-accent",
  },
  {
    id: "q11",
    question: "Working with hardware and IoT",
    description: "You're interested in programming physical devices and embedded systems",
    type: "interest",
    icon: "Cpu",
    gradient: "from-chart-5 to-chart-3",
  },
  {
    id: "q12",
    question: "Creative and design-focused work",
    description: "You have an eye for design and enjoy the creative aspects of development",
    type: "workstyle",
    icon: "Palette",
    gradient: "from-accent to-chart-3",
  },
  {
    id: "q13",
    question: "Building scalable backend systems",
    description: "You're interested in APIs, databases, and server-side architecture",
    type: "interest",
    icon: "Server",
    gradient: "from-chart-3 to-chart-4",
  },
  {
    id: "q14",
    question: "Game development",
    description: "You're passionate about creating interactive gaming experiences",
    type: "interest",
    icon: "Gamepad2",
    gradient: "from-chart-4 to-accent",
  },
  {
    id: "q15",
    question: "Cloud architecture and infrastructure",
    description: "You want to design and manage large-scale cloud systems",
    type: "interest",
    icon: "Cloud",
    gradient: "from-accent to-chart-5",
  },
]

// Scoring algorithm to match answers to career paths
export function calculateMatches(answers: QuizAnswer[]): CareerMatch[] {
  const pathScores: Record<string, { score: number; reasons: string[] }> = {
    "full-stack": { score: 0, reasons: [] },
    frontend: { score: 0, reasons: [] },
    backend: { score: 0, reasons: [] },
    "ml-engineer": { score: 0, reasons: [] },
    devops: { score: 0, reasons: [] },
    mobile: { score: 0, reasons: [] },
    "data-engineer": { score: 0, reasons: [] },
    security: { score: 0, reasons: [] },
    "game-dev": { score: 0, reasons: [] },
    embedded: { score: 0, reasons: [] },
    blockchain: { score: 0, reasons: [] },
    "cloud-architect": { score: 0, reasons: [] },
  }

  answers.forEach((answer) => {
    const question = quizQuestions.find((q) => q.id === answer.questionId)
    if (!question) return

    const weight = answer.liked ? 1 : -0.5

    // Map questions to career paths
    switch (answer.questionId) {
      case "q1": // UI
        if (answer.liked) {
          pathScores.frontend.score += weight * 3
          pathScores.frontend.reasons.push("You love building beautiful interfaces")
          pathScores["full-stack"].score += weight * 2
          pathScores.mobile.score += weight * 2
        }
        break
      case "q2": // Data/DB
        if (answer.liked) {
          pathScores["data-engineer"].score += weight * 3
          pathScores["data-engineer"].reasons.push("You enjoy working with data")
          pathScores.backend.score += weight * 2
          pathScores["full-stack"].score += weight * 1
        }
        break
      case "q3": // Algorithms
        if (answer.liked) {
          pathScores["ml-engineer"].score += weight * 2
          pathScores.backend.score += weight * 2
          pathScores["ml-engineer"].reasons.push("You excel at complex problem-solving")
        }
        break
      case "q4": // Visual feedback
        if (answer.liked) {
          pathScores.frontend.score += weight * 3
          pathScores.frontend.reasons.push("You prefer visual, tangible results")
          pathScores["game-dev"].score += weight * 2
          pathScores.mobile.score += weight * 2
        }
        break
      case "q5": // Infrastructure
        if (answer.liked) {
          pathScores.devops.score += weight * 3
          pathScores.devops.reasons.push("You're passionate about automation")
          pathScores["cloud-architect"].score += weight * 2
        }
        break
      case "q6": // Deep technical
        if (answer.liked) {
          pathScores.backend.score += weight * 2
          pathScores.backend.reasons.push("You enjoy deep technical challenges")
          pathScores.embedded.score += weight * 2
          pathScores.security.score += weight * 2
        }
        break
      case "q7": // Mobile
        if (answer.liked) {
          pathScores.mobile.score += weight * 3
          pathScores.mobile.reasons.push("You want to build mobile applications")
        }
        break
      case "q8": // Security
        if (answer.liked) {
          pathScores.security.score += weight * 3
          pathScores.security.reasons.push("You're interested in cybersecurity")
        }
        break
      case "q9": // ML/AI
        if (answer.liked) {
          pathScores["ml-engineer"].score += weight * 3
          pathScores["ml-engineer"].reasons.push("You're excited about AI and machine learning")
        }
        break
      case "q10": // Full-stack
        if (answer.liked) {
          pathScores["full-stack"].score += weight * 3
          pathScores["full-stack"].reasons.push("You want to build complete applications")
        }
        break
      case "q11": // Hardware/IoT
        if (answer.liked) {
          pathScores.embedded.score += weight * 3
          pathScores.embedded.reasons.push("You're interested in hardware programming")
        }
        break
      case "q12": // Creative/Design
        if (answer.liked) {
          pathScores.frontend.score += weight * 2
          pathScores["game-dev"].score += weight * 2
          pathScores["game-dev"].reasons.push("You value creative work")
        }
        break
      case "q13": // Backend
        if (answer.liked) {
          pathScores.backend.score += weight * 3
          pathScores.backend.reasons.push("You're interested in backend systems")
          pathScores["full-stack"].score += weight * 2
        }
        break
      case "q14": // Game dev
        if (answer.liked) {
          pathScores["game-dev"].score += weight * 3
          pathScores["game-dev"].reasons.push("You're passionate about game development")
        }
        break
      case "q15": // Cloud
        if (answer.liked) {
          pathScores["cloud-architect"].score += weight * 3
          pathScores["cloud-architect"].reasons.push("You want to design cloud infrastructure")
          pathScores.devops.score += weight * 2
        }
        break
    }
  })

  // Convert to array and sort by score
  const matches: CareerMatch[] = Object.entries(pathScores)
    .map(([pathId, data]) => ({
      pathId,
      score: Math.max(0, data.score), // Don't allow negative scores
      matchReasons: data.reasons.slice(0, 3), // Top 3 reasons
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5) // Top 5 matches

  return matches
}
