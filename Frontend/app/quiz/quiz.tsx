"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  RotateCcw,
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
  Cloud,
  Eye,
  Trophy,
} from "lucide-react"
import { quizQuestions, calculateMatches, type QuizAnswer } from "@/lib/quiz-data"
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
  Cloud,
  Eye,
}

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)

  const currentQuestion = quizQuestions[currentIndex]
  const progress = (currentIndex / quizQuestions.length) * 100

  const handleAnswer = (liked: boolean) => {
    // Set swipe animation
    setSwipeDirection(liked ? "right" : "left")

    // Wait for animation
    setTimeout(() => {
      const newAnswers = [...answers, { questionId: currentQuestion.id, liked }]
      setAnswers(newAnswers)

      if (currentIndex < quizQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setSwipeDirection(null)
      } else {
        setShowResults(true)
      }
    }, 300)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setAnswers([])
    setShowResults(false)
    setSwipeDirection(null)
  }

  const matches = showResults ? calculateMatches(answers) : []
  const topMatches = matches.slice(0, 3).map((match) => {
    const path = careerPaths.find((p) => p.id === match.pathId)
    return { ...match, path }
  })

  if (showResults) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />

        {/* Results Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-purple-blue mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Your Top Career Matches</h1>
              <p className="text-xl text-muted-foreground text-balance">
                Based on your preferences, here are the career paths that suit you best
              </p>
            </div>

            <div className="space-y-6 mb-12">
              {topMatches.map((match, idx) => {
                if (!match.path) return null
                const Icon = iconMap[match.path.icon as keyof typeof iconMap]
                const medalColors = ["text-yellow-500", "text-gray-400", "text-orange-600"]

                return (
                  <Card
                    key={match.pathId}
                    className="glass-effect border-2 border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className={`text-4xl font-bold ${medalColors[idx]}`}>#{idx + 1}</div>
                          <Badge variant="secondary" className="text-xs">
                            {match.score.toFixed(0)}% match
                          </Badge>
                        </div>

                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${match.path.color} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <CardTitle className="text-2xl">{match.path.title}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {match.path.description}
                          </CardDescription>

                          {match.matchReasons.length > 0 && (
                            <div className="pt-2">
                              <div className="text-sm font-semibold mb-2">Why this matches you:</div>
                              <ul className="space-y-1">
                                {match.matchReasons.map((reason, rIdx) => (
                                  <li key={rIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-accent">•</span>
                                    <span>{reason}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="default" className="gradient-purple-blue text-white" asChild>
                          <Link href={`/paths/${match.pathId}`}>
                            View Full Roadmap
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href="/paths">Compare All Paths</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="outline" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </Button>
              <Button size="lg" className="gradient-purple-blue text-white" asChild>
                <Link href="/roadmap">
                  Create My Roadmap
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Quiz Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">
                Question {currentIndex + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <div className="relative min-h-[500px] flex items-center justify-center">
            <Card
              className={`glass-effect border-2 border-primary/20 w-full max-w-lg transition-all duration-300 ${
                swipeDirection === "right"
                  ? "translate-x-[150%] rotate-12 opacity-0"
                  : swipeDirection === "left"
                    ? "-translate-x-[150%] -rotate-12 opacity-0"
                    : "translate-x-0 rotate-0 opacity-100"
              }`}
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentQuestion.gradient} flex items-center justify-center mx-auto mb-6`}
                >
                  {(() => {
                    const Icon = iconMap[currentQuestion.icon as keyof typeof iconMap]
                    return <Icon className="w-10 h-10 text-white" />
                  })()}
                </div>
                <Badge variant="secondary" className="w-fit mx-auto mb-4 capitalize">
                  {currentQuestion.type}
                </Badge>
                <CardTitle className="text-2xl md:text-3xl text-balance leading-tight">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <CardDescription className="text-center text-base leading-relaxed">
                  {currentQuestion.description}
                </CardDescription>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-6 pt-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-20 h-20 rounded-full border-2 border-destructive/50 hover:bg-destructive/10 hover:border-destructive transition-all bg-transparent"
                    onClick={() => handleAnswer(false)}
                  >
                    <ThumbsDown className="w-8 h-8 text-destructive" />
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-20 h-20 rounded-full border-2 border-accent/50 hover:bg-accent/10 hover:border-accent transition-all bg-transparent"
                    onClick={() => handleAnswer(true)}
                  >
                    <ThumbsUp className="w-8 h-8 text-accent" />
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-2">
                    <ThumbsDown className="w-4 h-4 text-destructive" />
                    <span>Not for me</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-accent" />
                    <span>I like this</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Swipe through questions about your interests and preferences to find your ideal career path
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
