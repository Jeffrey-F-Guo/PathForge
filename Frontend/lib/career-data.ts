export interface CareerPath {
  id: string
  title: string
  description: string
  icon: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  timeToJob: string
  avgSalary: string
  demandLevel: "High" | "Very High" | "Moderate"
  skills: string[]
  topCompanies: string[]
  dayToDay: string[]
  pros: string[]
  cons: string[]
  color: string
}

export interface RoadmapPhase {
  id: string
  title: string
  duration: string
  description: string
  skills: string[]
  resources: {
    title: string
    type: "course" | "book" | "project" | "practice" | "article"
    url?: string
    free: boolean
  }[]
  milestones: string[]
}

export interface DetailedCareerPath extends CareerPath {
  roadmap: RoadmapPhase[]
  prerequisites: string[]
  learningPath: string
  careerProgression: {
    level: string
    title: string
    salary: string
    years: string
  }[]
}

export const careerPaths: CareerPath[] = [
  {
    id: "full-stack",
    title: "Full-Stack Developer",
    description: "Build complete web applications from frontend to backend",
    icon: "Code",
    difficulty: "Beginner",
    timeToJob: "6-12 months",
    avgSalary: "$95k - $140k",
    demandLevel: "Very High",
    skills: ["React", "Node.js", "TypeScript", "SQL", "REST APIs", "Git"],
    topCompanies: ["Meta", "Google", "Stripe", "Vercel", "Shopify"],
    dayToDay: [
      "Build user interfaces with React/Next.js",
      "Design and implement REST APIs",
      "Work with databases and data models",
      "Collaborate with designers and PMs",
    ],
    pros: ["High demand", "Versatile skillset", "See your work come to life", "Remote-friendly"],
    cons: ["Broad knowledge required", "Fast-changing ecosystem", "Can feel overwhelming at first"],
    color: "from-primary to-accent",
  },
  {
    id: "frontend",
    title: "Frontend Engineer",
    description: "Create beautiful, responsive user interfaces",
    icon: "Palette",
    difficulty: "Beginner",
    timeToJob: "4-8 months",
    avgSalary: "$90k - $135k",
    demandLevel: "Very High",
    skills: ["React", "TypeScript", "CSS/Tailwind", "Next.js", "Accessibility", "Performance"],
    topCompanies: ["Airbnb", "Netflix", "Figma", "Vercel", "Shopify"],
    dayToDay: [
      "Implement pixel-perfect designs",
      "Optimize web performance",
      "Ensure accessibility standards",
      "Build reusable component libraries",
    ],
    pros: ["Visual feedback", "Creative work", "High demand", "Great for design-minded devs"],
    cons: ["Browser compatibility issues", "Design handoff challenges", "CSS can be tricky"],
    color: "from-accent to-chart-3",
  },
  {
    id: "backend",
    title: "Backend Engineer",
    description: "Build scalable APIs and server infrastructure",
    icon: "Server",
    difficulty: "Intermediate",
    timeToJob: "8-14 months",
    avgSalary: "$100k - $150k",
    demandLevel: "Very High",
    skills: ["Node.js/Python", "SQL/NoSQL", "System Design", "APIs", "Cloud (AWS/GCP)", "Docker"],
    topCompanies: ["Amazon", "Google", "Stripe", "Uber", "Databricks"],
    dayToDay: [
      "Design database schemas",
      "Build and optimize APIs",
      "Implement authentication systems",
      "Monitor system performance",
    ],
    pros: ["High pay", "Deep technical work", "Less UI churn", "Strong fundamentals"],
    cons: ["Less visual feedback", "Complex debugging", "On-call rotations"],
    color: "from-chart-3 to-chart-4",
  },
  {
    id: "ml-engineer",
    title: "ML Engineer",
    description: "Build and deploy machine learning systems",
    icon: "Brain",
    difficulty: "Advanced",
    timeToJob: "12-18 months",
    avgSalary: "$120k - $180k",
    demandLevel: "Very High",
    skills: ["Python", "TensorFlow/PyTorch", "Statistics", "SQL", "MLOps", "Cloud"],
    topCompanies: ["OpenAI", "Google", "Meta", "Tesla", "Anthropic"],
    dayToDay: [
      "Train and fine-tune models",
      "Build ML pipelines",
      "Deploy models to production",
      "Monitor model performance",
    ],
    pros: ["Cutting-edge tech", "Very high pay", "Intellectually stimulating", "High impact"],
    cons: ["Steep learning curve", "Requires math background", "Long training times", "Expensive compute"],
    color: "from-chart-4 to-chart-5",
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    description: "Automate infrastructure and deployment pipelines",
    icon: "Workflow",
    difficulty: "Intermediate",
    timeToJob: "10-16 months",
    avgSalary: "$105k - $155k",
    demandLevel: "High",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS/GCP", "Terraform", "Linux"],
    topCompanies: ["Amazon", "Google", "Netflix", "Datadog", "HashiCorp"],
    dayToDay: ["Manage cloud infrastructure", "Build CI/CD pipelines", "Monitor system health", "Automate deployments"],
    pros: ["High demand", "Good pay", "Automation focus", "Critical role"],
    cons: ["On-call duties", "High pressure", "Steep learning curve", "Lots of tools to learn"],
    color: "from-chart-5 to-primary",
  },
  {
    id: "mobile",
    title: "Mobile Developer",
    description: "Build native iOS and Android applications",
    icon: "Smartphone",
    difficulty: "Intermediate",
    timeToJob: "8-12 months",
    avgSalary: "$95k - $145k",
    demandLevel: "High",
    skills: ["React Native/Swift/Kotlin", "Mobile UI", "APIs", "App Store", "Performance", "Testing"],
    topCompanies: ["Apple", "Google", "Meta", "Uber", "Airbnb"],
    dayToDay: [
      "Build mobile interfaces",
      "Integrate with device APIs",
      "Optimize app performance",
      "Handle app store submissions",
    ],
    pros: ["Direct user impact", "Growing market", "Good pay", "Creative work"],
    cons: ["Platform fragmentation", "App store approval process", "Device testing complexity"],
    color: "from-primary via-accent to-chart-3",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    description: "Build data pipelines and warehouses",
    icon: "Database",
    difficulty: "Intermediate",
    timeToJob: "10-14 months",
    avgSalary: "$110k - $160k",
    demandLevel: "Very High",
    skills: ["SQL", "Python", "Spark", "Airflow", "Data Warehousing", "ETL"],
    topCompanies: ["Snowflake", "Databricks", "Amazon", "Google", "Uber"],
    dayToDay: ["Build ETL pipelines", "Design data warehouses", "Optimize query performance", "Ensure data quality"],
    pros: ["Very high demand", "Great pay", "Foundational role", "Job security"],
    cons: ["Can be repetitive", "Less creative", "Data quality issues", "Complex debugging"],
    color: "from-accent to-chart-4",
  },
  {
    id: "security",
    title: "Security Engineer",
    description: "Protect systems from vulnerabilities and attacks",
    icon: "Shield",
    difficulty: "Advanced",
    timeToJob: "12-18 months",
    avgSalary: "$115k - $170k",
    demandLevel: "Very High",
    skills: ["Network Security", "Cryptography", "Penetration Testing", "Compliance", "Python", "Cloud Security"],
    topCompanies: ["Google", "Meta", "Apple", "CrowdStrike", "Palo Alto Networks"],
    dayToDay: [
      "Conduct security audits",
      "Respond to incidents",
      "Implement security controls",
      "Educate teams on best practices",
    ],
    pros: ["Critical role", "High pay", "Job security", "Intellectually challenging"],
    cons: ["High stress", "On-call rotations", "Constant learning required", "Adversarial mindset"],
    color: "from-chart-3 to-chart-5",
  },
  {
    id: "game-dev",
    title: "Game Developer",
    description: "Create interactive gaming experiences",
    icon: "Gamepad2",
    difficulty: "Intermediate",
    timeToJob: "10-16 months",
    avgSalary: "$75k - $120k",
    demandLevel: "Moderate",
    skills: ["Unity/Unreal", "C#/C++", "3D Math", "Physics", "Game Design", "Optimization"],
    topCompanies: ["Epic Games", "Riot Games", "Valve", "Blizzard", "Unity"],
    dayToDay: [
      "Implement game mechanics",
      "Optimize performance",
      "Work with artists and designers",
      "Debug gameplay issues",
    ],
    pros: ["Creative work", "Passion-driven", "See your work played", "Unique challenges"],
    cons: ["Lower pay", "Crunch culture", "Competitive field", "Job instability"],
    color: "from-chart-4 to-accent",
  },
  {
    id: "embedded",
    title: "Embedded Engineer",
    description: "Program hardware and IoT devices",
    icon: "Cpu",
    difficulty: "Advanced",
    timeToJob: "12-18 months",
    avgSalary: "$100k - $150k",
    demandLevel: "High",
    skills: ["C/C++", "RTOS", "Hardware", "Protocols", "Debugging", "Low-level Programming"],
    topCompanies: ["Tesla", "Apple", "Intel", "NVIDIA", "SpaceX"],
    dayToDay: [
      "Write firmware for devices",
      "Debug hardware issues",
      "Optimize for constraints",
      "Work with hardware teams",
    ],
    pros: ["Unique skillset", "Good pay", "Tangible products", "Job security"],
    cons: ["Steep learning curve", "Hardware dependencies", "Slower iteration", "Niche field"],
    color: "from-chart-5 to-chart-3",
  },
  {
    id: "blockchain",
    title: "Blockchain Developer",
    description: "Build decentralized applications and smart contracts",
    icon: "Link",
    difficulty: "Advanced",
    timeToJob: "12-18 months",
    avgSalary: "$110k - $180k",
    demandLevel: "Moderate",
    skills: ["Solidity", "Web3.js", "Smart Contracts", "Cryptography", "DeFi", "Security"],
    topCompanies: ["Coinbase", "Consensys", "Chainlink", "Polygon", "Alchemy"],
    dayToDay: ["Write smart contracts", "Build dApps", "Audit contract security", "Integrate with blockchains"],
    pros: ["Cutting-edge tech", "Very high pay potential", "Remote-friendly", "Innovative space"],
    cons: ["Volatile industry", "Security critical", "Regulatory uncertainty", "Niche market"],
    color: "from-primary to-chart-5",
  },
  {
    id: "cloud-architect",
    title: "Cloud Architect",
    description: "Design scalable cloud infrastructure",
    icon: "Cloud",
    difficulty: "Advanced",
    timeToJob: "14-20 months",
    avgSalary: "$130k - $190k",
    demandLevel: "Very High",
    skills: ["AWS/GCP/Azure", "System Design", "Networking", "Security", "Cost Optimization", "Terraform"],
    topCompanies: ["Amazon", "Google", "Microsoft", "Snowflake", "Databricks"],
    dayToDay: [
      "Design cloud architectures",
      "Optimize costs and performance",
      "Ensure security compliance",
      "Mentor engineering teams",
    ],
    pros: ["Very high pay", "Strategic role", "High impact", "Job security"],
    cons: ["Requires experience", "High responsibility", "Constant learning", "Vendor lock-in challenges"],
    color: "from-accent via-chart-3 to-chart-5",
  },
]

export const detailedCareerPaths: Record<string, DetailedCareerPath> = {
  "full-stack": {
    ...careerPaths[0],
    prerequisites: ["Basic programming knowledge", "Understanding of how websites work", "Problem-solving mindset"],
    learningPath:
      "Start with frontend fundamentals, then add backend skills, and finally integrate them into full applications.",
    careerProgression: [
      { level: "Junior", title: "Junior Full-Stack Developer", salary: "$70k - $95k", years: "0-2" },
      { level: "Mid", title: "Full-Stack Developer", salary: "$95k - $140k", years: "2-5" },
      { level: "Senior", title: "Senior Full-Stack Engineer", salary: "$140k - $180k", years: "5-8" },
      { level: "Lead", title: "Staff/Principal Engineer", salary: "$180k - $250k+", years: "8+" },
    ],
    roadmap: [
      {
        id: "phase-1",
        title: "Frontend Fundamentals",
        duration: "2-3 months",
        description: "Master HTML, CSS, and JavaScript to build interactive user interfaces",
        skills: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design", "Git"],
        resources: [
          { title: "freeCodeCamp Responsive Web Design", type: "course", free: true },
          { title: "JavaScript.info", type: "course", free: true },
          { title: "Build a Portfolio Website", type: "project", free: true },
          { title: "CSS Tricks", type: "article", free: true },
        ],
        milestones: [
          "Build 3 responsive landing pages",
          "Complete JavaScript fundamentals course",
          "Create an interactive calculator",
          "Deploy projects to GitHub Pages",
        ],
      },
      {
        id: "phase-2",
        title: "React & Modern Frontend",
        duration: "2-3 months",
        description: "Learn React and modern frontend tooling to build complex applications",
        skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "State Management"],
        resources: [
          { title: "React Official Tutorial", type: "course", free: true },
          { title: "TypeScript Handbook", type: "course", free: true },
          { title: "Build a Todo App with React", type: "project", free: true },
          { title: "Next.js Documentation", type: "course", free: true },
        ],
        milestones: [
          "Build 2 React applications",
          "Learn TypeScript basics",
          "Create a multi-page Next.js app",
          "Implement client-side routing",
        ],
      },
      {
        id: "phase-3",
        title: "Backend Basics",
        duration: "2-3 months",
        description: "Learn server-side programming, databases, and API development",
        skills: ["Node.js", "Express", "SQL", "PostgreSQL", "REST APIs", "Authentication"],
        resources: [
          { title: "Node.js Documentation", type: "course", free: true },
          { title: "PostgreSQL Tutorial", type: "course", free: true },
          { title: "Build a REST API", type: "project", free: true },
          { title: "JWT Authentication Guide", type: "article", free: true },
        ],
        milestones: [
          "Build a CRUD API",
          "Design a database schema",
          "Implement user authentication",
          "Deploy API to production",
        ],
      },
      {
        id: "phase-4",
        title: "Full-Stack Integration",
        duration: "2-3 months",
        description: "Connect frontend and backend to build complete applications",
        skills: ["API Integration", "Server Actions", "Database ORMs", "Deployment", "Testing"],
        resources: [
          { title: "Full-Stack Next.js Course", type: "course", free: false },
          { title: "Build a Social Media Clone", type: "project", free: true },
          { title: "Vercel Deployment Guide", type: "article", free: true },
          { title: "Testing with Jest", type: "course", free: true },
        ],
        milestones: [
          "Build 2 full-stack projects",
          "Implement real-time features",
          "Deploy to production",
          "Write integration tests",
        ],
      },
      {
        id: "phase-5",
        title: "Job Prep & Portfolio",
        duration: "1-2 months",
        description: "Polish your portfolio, practice interviews, and start applying",
        skills: ["System Design", "Algorithms", "Interview Prep", "Portfolio Building", "Networking"],
        resources: [
          { title: "LeetCode Easy/Medium", type: "practice", free: true },
          { title: "System Design Primer", type: "course", free: true },
          { title: "Build 3 Portfolio Projects", type: "project", free: true },
          { title: "Mock Interviews", type: "practice", free: false },
        ],
        milestones: [
          "Complete 50 LeetCode problems",
          "Build impressive portfolio",
          "Practice system design",
          "Apply to 50+ companies",
        ],
      },
    ],
  },
  // Add more detailed paths as needed - for now we'll use the full-stack as the template
}

export function getDetailedPath(pathId: string): DetailedCareerPath {
  if (detailedCareerPaths[pathId]) {
    return detailedCareerPaths[pathId]
  }

  // Fallback: create a basic detailed path from the career path data
  const basicPath = careerPaths.find((p) => p.id === pathId)
  if (!basicPath) {
    throw new Error(`Path ${pathId} not found`)
  }

  return {
    ...basicPath,
    prerequisites: ["Basic programming knowledge", "Problem-solving skills", "Dedication to learning"],
    learningPath: "Follow a structured learning path from fundamentals to advanced topics.",
    careerProgression: [
      { level: "Junior", title: `Junior ${basicPath.title}`, salary: "$70k - $95k", years: "0-2" },
      { level: "Mid", title: basicPath.title, salary: basicPath.avgSalary, years: "2-5" },
      { level: "Senior", title: `Senior ${basicPath.title}`, salary: "$140k - $180k", years: "5-8" },
      { level: "Lead", title: "Staff/Principal Engineer", salary: "$180k - $250k+", years: "8+" },
    ],
    roadmap: [
      {
        id: "phase-1",
        title: "Fundamentals",
        duration: "2-3 months",
        description: "Learn the core concepts and foundational skills",
        skills: basicPath.skills.slice(0, 3),
        resources: [
          { title: "Online Course", type: "course", free: true },
          { title: "Practice Projects", type: "project", free: true },
        ],
        milestones: ["Complete fundamentals course", "Build first project"],
      },
      {
        id: "phase-2",
        title: "Intermediate Skills",
        duration: "3-4 months",
        description: "Develop practical skills and build real projects",
        skills: basicPath.skills.slice(3),
        resources: [
          { title: "Advanced Course", type: "course", free: false },
          { title: "Build Portfolio Projects", type: "project", free: true },
        ],
        milestones: ["Build 3 portfolio projects", "Learn advanced concepts"],
      },
      {
        id: "phase-3",
        title: "Job Preparation",
        duration: "1-2 months",
        description: "Prepare for interviews and start applying",
        skills: ["Interview Prep", "System Design", "Portfolio"],
        resources: [
          { title: "Interview Practice", type: "practice", free: true },
          { title: "System Design Course", type: "course", free: true },
        ],
        milestones: ["Complete interview prep", "Apply to companies"],
      },
    ],
  }
}
