"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Code,
  Palette,
  Server,
  Brain,
  Workflow,
  Smartphone,
  Database,
  Shield,
  Gamepad2,
  Cpu,
  LinkIcon,
  Cloud,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  BookOpen,
  FileText,
  Lightbulb,
  Target,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import { getDetailedPath } from "@/lib/career-data"

const iconMap = {
  Code,
  Palette,
  Server,
  Brain,
  Workflow,
  Smartphone,
  Database,
  Shield,
  Gamepad2,
  Cpu,
  Link: LinkIcon,
  Cloud,
}

const resourceTypeIcons = {
  course: BookOpen,
  book: FileText,
  project: Lightbulb,
  practice: Target,
  article: FileText,
}

export default async function PathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const path = getDetailedPath(id)
  const Icon = iconMap[path.icon as keyof typeof iconMap]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-purple-blue flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">PathForge</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/paths" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Career Paths
            </Link>
            <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </Link>
            <Link href="/quiz" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Take Quiz
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="/roadmap">My Roadmap</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        {/* Background gradient */}
        <div
          className={`absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br ${path.color} rounded-full blur-3xl opacity-20`}
        />

        <div className="container mx-auto max-w-7xl relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/paths">
              <ArrowLeft className="w-4 h-4" />
              Back to All Paths
            </Link>
          </Button>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            {/* Main Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl font-bold text-balance">{path.title}</h1>
                  <p className="text-xl text-muted-foreground text-balance leading-relaxed">{path.description}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {path.difficulty}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-sm px-3 py-1 ${
                    path.demandLevel === "Very High" ? "border-accent/50 text-accent" : "border-chart-4/50 text-chart-4"
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                  {path.demandLevel} Demand
                </Badge>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="glass-effect border-2 border-border/40">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Time to Job</span>
                    </div>
                    <div className="text-2xl font-bold">{path.timeToJob}</div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-2 border-border/40">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="w-5 h-5 text-accent" />
                      <span className="text-sm text-muted-foreground">Avg Salary</span>
                    </div>
                    <div className="text-2xl font-bold">{path.avgSalary}</div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-2 border-border/40">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="w-5 h-5 text-chart-3" />
                      <span className="text-sm text-muted-foreground">Skills</span>
                    </div>
                    <div className="text-2xl font-bold">{path.skills.length}</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card className="glass-effect border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {path.prerequisites.map((prereq, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-effect border-2 border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg">Top Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {path.topCompanies.map((company) => (
                      <Badge key={company} variant="outline" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full gradient-purple-blue text-white" size="lg" asChild>
                <Link href="/roadmap">
                  Start This Path
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Overview */}
      <section className="py-12 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3">Learning Path</h2>
            <p className="text-lg text-muted-foreground text-balance">{path.learningPath}</p>
          </div>

          {/* Roadmap Timeline */}
          <div className="space-y-8">
            {path.roadmap.map((phase, idx) => (
              <div key={phase.id} className="relative">
                {/* Timeline connector */}
                {idx < path.roadmap.length - 1 && (
                  <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent opacity-30" />
                )}

                <Card className="glass-effect border-2 border-primary/20 hover:border-primary/40 transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      {/* Phase number badge */}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center shrink-0`}
                      >
                        <span className="text-xl font-bold text-white">{idx + 1}</span>
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <CardTitle className="text-2xl">{phase.title}</CardTitle>
                          <Badge variant="secondary" className="text-sm">
                            <Clock className="w-3.5 h-3.5 mr-1.5" />
                            {phase.duration}
                          </Badge>
                        </div>
                        <CardDescription className="text-base leading-relaxed">{phase.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Skills to Learn */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Skills You'll Learn</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-sm px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Recommended Resources</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {phase.resources.map((resource, rIdx) => {
                          const ResourceIcon = resourceTypeIcons[resource.type]
                          return (
                            <div
                              key={rIdx}
                              className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/40 hover:border-primary/40 transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                <ResourceIcon className="w-4 h-4 text-accent" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <span className="text-sm font-medium leading-tight">{resource.title}</span>
                                  {resource.free && (
                                    <Badge variant="outline" className="text-xs shrink-0 border-accent/50 text-accent">
                                      Free
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground capitalize">{resource.type}</span>
                              </div>
                              {resource.url && <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Milestones */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Phase Milestones</h4>
                      <div className="space-y-2">
                        {phase.milestones.map((milestone, mIdx) => (
                          <div key={mIdx} className="flex items-start gap-3 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{milestone}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Progression */}
      <section className="py-12 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3">Career Progression</h2>
            <p className="text-lg text-muted-foreground">Typical career trajectory and salary growth over time</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {path.careerProgression.map((level, idx) => (
              <Card key={level.level} className="glass-effect border-2 border-border/40 relative overflow-hidden">
                {/* Progress indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-chart-3">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${((idx + 1) / path.careerProgression.length) * 100}%` }}
                  />
                </div>

                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    {level.years} years
                  </Badge>
                  <CardTitle className="text-xl">{level.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <DollarSign className="w-4 h-4" />
                      <span>Salary Range</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">{level.salary}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="py-12 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-effect border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                  Pros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {path.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-accent text-xl mt-0.5">+</span>
                      <span className="text-muted-foreground leading-relaxed">{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-effect border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Target className="w-6 h-6 text-destructive" />
                  Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {path.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-destructive text-xl mt-0.5">−</span>
                      <span className="text-muted-foreground leading-relaxed">{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to start your journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Create your personalized roadmap and track your progress toward becoming a {path.title}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gradient-purple-blue text-white" asChild>
              <Link href="/roadmap">
                Create My Roadmap
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/paths">
                <ArrowLeft className="w-4 h-4" />
                Compare Other Paths
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
