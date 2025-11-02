"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react"
import { careerPaths } from "@/lib/career-data"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

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

export default function PathsPage() {
  const [selectedPaths, setSelectedPaths] = useState<string[]>([])
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all")

  const togglePathSelection = (pathId: string) => {
    if (selectedPaths.includes(pathId)) {
      setSelectedPaths(selectedPaths.filter((id) => id !== pathId))
    } else if (selectedPaths.length < 3) {
      setSelectedPaths([...selectedPaths, pathId])
    }
  }

  const filteredPaths =
    filterDifficulty === "all"
      ? careerPaths
      : careerPaths.filter((path) => path.difficulty.toLowerCase() === filterDifficulty)

  const selectedPathsData = careerPaths.filter((path) => selectedPaths.includes(path.id))

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 container mx-auto max-w-7xl">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>

        <div className="space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">
            Explore{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              12 Career Paths
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl text-balance leading-relaxed">
            Compare salaries, skills, and day-to-day work. Select up to 3 paths to see them side-by-side.
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filterDifficulty} onValueChange={setFilterDifficulty} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Paths</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Selection Info */}
        {selectedPaths.length > 0 && (
          <div className="glass-effect rounded-lg p-4 mb-8 border-2 border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">
                  {selectedPaths.length} path{selectedPaths.length > 1 ? "s" : ""} selected
                </span>
                <span className="text-xs text-muted-foreground">(max 3)</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedPaths([])}>
                Clear Selection
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Career Paths Grid */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map((path) => {
              const Icon = iconMap[path.icon as keyof typeof iconMap]
              const isSelected = selectedPaths.includes(path.id)

              return (
                <Card
                  key={path.id}
                  className={`glass-effect border-2 transition-all cursor-pointer hover:-translate-y-1 ${
                    isSelected ? "border-primary/60 ring-4 ring-primary/20" : "border-border/40 hover:border-primary/40"
                  }`}
                  onClick={() => togglePathSelection(path.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {isSelected && <CheckCircle2 className="w-6 h-6 text-primary" />}
                    </div>
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{path.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          Time to Job
                        </div>
                        <div className="text-sm font-medium">{path.timeToJob}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <DollarSign className="w-3.5 h-3.5" />
                          Avg Salary
                        </div>
                        <div className="text-sm font-medium">{path.avgSalary}</div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {path.difficulty}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          path.demandLevel === "Very High"
                            ? "border-accent/50 text-accent"
                            : "border-chart-4/50 text-chart-4"
                        }`}
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {path.demandLevel} Demand
                      </Badge>
                    </div>

                    {/* Top Skills */}
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Key Skills</div>
                      <div className="flex flex-wrap gap-1.5">
                        {path.skills.slice(0, 4).map((skill) => (
                          <span key={skill} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
                            {skill}
                          </span>
                        ))}
                        {path.skills.length > 4 && (
                          <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                            +{path.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePathSelection(path.id)
                      }}
                    >
                      {isSelected ? "Selected" : "Select to Compare"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      {selectedPathsData.length > 0 && (
        <section className="py-12 px-4 border-t border-border/40">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Side-by-Side Comparison</h2>
              <p className="text-muted-foreground">Compare the paths you selected to make an informed decision</p>
            </div>

            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: `repeat(${selectedPathsData.length}, minmax(0, 1fr))` }}
            >
              {selectedPathsData.map((path) => {
                const Icon = iconMap[path.icon as keyof typeof iconMap]

                return (
                  <Card key={path.id} className="glass-effect border-2 border-primary/20">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Overview Stats */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Difficulty</span>
                          <Badge variant="secondary">{path.difficulty}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time to Job</span>
                          <span className="font-medium">{path.timeToJob}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Salary Range</span>
                          <span className="font-medium">{path.avgSalary}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Demand</span>
                          <Badge
                            variant="outline"
                            className={
                              path.demandLevel === "Very High"
                                ? "border-accent/50 text-accent"
                                : "border-chart-4/50 text-chart-4"
                            }
                          >
                            {path.demandLevel}
                          </Badge>
                        </div>
                      </div>

                      <div className="border-t border-border/40 pt-4">
                        <h4 className="text-sm font-semibold mb-3">Required Skills</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {path.skills.map((skill) => (
                            <span key={skill} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-border/40 pt-4">
                        <h4 className="text-sm font-semibold mb-3">Day-to-Day Work</h4>
                        <ul className="space-y-2">
                          {path.dayToDay.map((item, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-border/40 pt-4">
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                          Pros
                        </h4>
                        <ul className="space-y-2">
                          {path.pros.map((pro, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-accent mt-1">+</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-border/40 pt-4">
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-destructive" />
                          Cons
                        </h4>
                        <ul className="space-y-2">
                          {path.cons.map((con, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-destructive mt-1">−</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-border/40 pt-4">
                        <h4 className="text-sm font-semibold mb-3">Top Companies</h4>
                        <div className="flex flex-wrap gap-2">
                          {path.topCompanies.map((company) => (
                            <Badge key={company} variant="outline" className="text-xs">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full gradient-purple-blue text-white" asChild>
                        <Link href={`/paths/${path.id}`}>
                          View Full Roadmap
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Not sure which path is right for you?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Take our 5-minute quiz to get personalized recommendations based on your interests and goals.
          </p>
          <Button size="lg" className="gradient-purple-blue text-white" asChild>
            <Link href="/quiz">
              Take the Career Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
