import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Map, Target, BookOpen } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 gradient-purple-blue rounded-full blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 gradient-blue-cyan rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-muted-foreground">Trusted by 10,000+ CS students</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              Stop Guessing.
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-chart-3 bg-clip-text text-transparent">
                Start Building.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              The complete roadmap from CS student to engineer—curated by those who've been there
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="gradient-purple-blue text-white border-0 hover:opacity-90 transition-opacity group"
                asChild
              >
                <Link href="/paths">
                  Compare Career Paths
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 bg-transparent" asChild>
                <Link href="/quiz">Take the Quiz</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/resources">Browse Resources</Link>
              </Button>
            </div>

            {/* Hero Visual */}
            <div className="pt-12">
              <div className="relative mx-auto max-w-4xl">
                <div className="glass-effect rounded-2xl p-8 border-2 border-primary/20">
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="h-24 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">Interactive Roadmap Builder</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Value Prop 1 */}
            <Card className="glass-effect border-2 border-primary/20 p-8 hover:border-primary/40 transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-xl gradient-purple-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Map className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Clear Pathways</h3>
              <p className="text-muted-foreground leading-relaxed">
                See example journeys for every CS career. From ML engineer to full-stack developer, explore proven
                paths.
              </p>
            </Card>

            {/* Value Prop 2 */}
            <Card className="glass-effect border-2 border-accent/20 p-8 hover:border-accent/40 transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-xl gradient-blue-cyan flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Smart Recommendations</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI arranges resources in the right order. Learn prerequisites first, build projects that matter.
              </p>
            </Card>

            {/* Value Prop 3 */}
            <Card className="glass-effect border-2 border-chart-3/20 p-8 hover:border-chart-3/40 transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-xl gradient-pink-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Curated Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Only resources that actually work. Vetted by students who landed their dream roles.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="glass-effect rounded-2xl p-12 border-2 border-primary/20">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <div className="text-muted-foreground">Active Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-accent to-chart-3 bg-clip-text text-transparent mb-2">
                  500+
                </div>
                <div className="text-muted-foreground">Curated Resources</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-chart-3 to-chart-4 bg-clip-text text-transparent mb-2">
                  12
                </div>
                <div className="text-muted-foreground">Career Paths</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-chart-4 to-primary bg-clip-text text-transparent mb-2">
                  95%
                </div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to build your future?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Join thousands of CS students who are already on their path to success.
          </p>
          <Button
            size="lg"
            className="gradient-purple-blue text-white border-0 hover:opacity-90 transition-opacity"
            asChild
          >
            <Link href="/quiz">
              Get Started - It's Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
