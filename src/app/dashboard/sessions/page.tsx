import { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { SessionList } from "./components/session-list"
import { SessionStats } from "./components/session-stats"

export const metadata: Metadata = {
  title: "Sessions | Dashboard",
  description: "View your completed sessions and recordings"
}

export default function SessionsPage() {
  return (
    <div className="container max-w-6xl py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Learning Journey</h1>
        <p className="text-sm text-muted-foreground">
          Track your progress and review past sessions
        </p>
      </div>

      <SessionStats />

      <Card>
        <SessionList />
      </Card>
    </div>
  )
} 