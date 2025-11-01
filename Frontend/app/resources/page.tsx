"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  BookOpen,
  FileText,
  Video,
  Lightbulb,
  Wrench,
  Code,
  ExternalLink,
  Star,
  Clock,
  Filter,
  ArrowRight,
} from "lucide-react"
import { resources } from "@/lib/resource-data"
import { careerPaths } from "@/lib/career-data"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const typeIcons = {
  course: BookOpen,
  book: FileText,
  article: FileText,
  video: Video,
  project: Lightbulb,
  tool: Wrench,
  documentation: Code,
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showFreeOnly, setShowFreeOnly] = useState(false)

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Type filter
      const matchesType = selectedType === "all" || resource.type === selectedType

      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty

      // Category filter
      const matchesCategory = selectedCategory === "all" || resource.category.includes(selectedCategory)

      // Free filter
      const matchesFree = !showFreeOnly || resource.free

      return matchesSearch && matchesType && matchesDifficulty && matchesCategory && matchesFree
    })
  }, [searchQuery, selectedType, selectedDifficulty, selectedCategory, showFreeOnly])

  const featuredResources = resources.filter((r) => r.featured)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              Curated{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Learning Resources
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl text-balance leading-relaxed">
              Hand-picked courses, books, and tools vetted by students who landed their dream roles.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search resources, tags, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Type Filter */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Type</label>
                <Tabs value={selectedType} onValueChange={setSelectedType}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="all" className="text-xs">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="course" className="text-xs">
                      Courses
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Difficulty Filter */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Difficulty</label>
                <Tabs value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="all" className="text-xs">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="Beginner" className="text-xs">
                      Beginner
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Career Path</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="all">All Paths</option>
                  {careerPaths.map((path) => (
                    <option key={path.id} value={path.id}>
                      {path.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Free Only Toggle */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Price</label>
                <Button
                  variant={showFreeOnly ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setShowFreeOnly(!showFreeOnly)}
                >
                  {showFreeOnly ? "Free Only" : "All Resources"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {searchQuery === "" &&
        selectedType === "all" &&
        selectedDifficulty === "all" &&
        selectedCategory === "all" &&
        !showFreeOnly && (
          <section className="py-12 px-4 border-t border-border/40">
            <div className="container mx-auto max-w-7xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Featured Resources</h2>
                <p className="text-muted-foreground">Top picks recommended by our community</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.slice(0, 6).map((resource) => {
                  const TypeIcon = typeIcons[resource.type]

                  return (
                    <Card
                      key={resource.id}
                      className="glass-effect border-2 border-primary/20 hover:border-primary/40 transition-all hover:-translate-y-1 group"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <TypeIcon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-medium">{resource.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl leading-tight">{resource.title}</CardTitle>
                        <CardDescription className="leading-relaxed">{resource.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {resource.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {resource.difficulty}
                          </Badge>
                          {resource.free && (
                            <Badge variant="outline" className="text-xs border-accent/50 text-accent">
                              Free
                            </Badge>
                          )}
                        </div>

                        {resource.duration && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{resource.duration}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5">
                          {resource.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Button variant="outline" className="w-full group-hover:bg-primary/10 bg-transparent" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            View Resource
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>
        )}

      {/* All Resources */}
      <section className="py-12 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {filteredResources.length} Resource{filteredResources.length !== 1 ? "s" : ""}
            </h2>
            <p className="text-muted-foreground">
              {searchQuery ? `Results for "${searchQuery}"` : "Browse all curated resources for your learning journey"}
            </p>
          </div>

          {filteredResources.length === 0 ? (
            <Card className="glass-effect border-2 border-border/40 p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedType("all")
                    setSelectedDifficulty("all")
                    setSelectedCategory("all")
                    setShowFreeOnly(false)
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                const TypeIcon = typeIcons[resource.type]

                return (
                  <Card
                    key={resource.id}
                    className="glass-effect border-2 border-border/40 hover:border-primary/40 transition-all hover:-translate-y-1 group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-chart-3 flex items-center justify-center">
                          <TypeIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                          <span className="font-medium">{resource.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed line-clamp-2">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {resource.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {resource.difficulty}
                        </Badge>
                        {resource.free && (
                          <Badge variant="outline" className="text-xs border-accent/50 text-accent">
                            Free
                          </Badge>
                        )}
                      </div>

                      {resource.duration && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{resource.duration}</span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-primary/10 bg-transparent"
                        asChild
                      >
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          View Resource
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to start learning?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Create your personalized roadmap and get resource recommendations tailored to your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gradient-purple-blue text-white" asChild>
              <Link href="/roadmap">
                Create My Roadmap
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/quiz">Take Career Quiz</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
