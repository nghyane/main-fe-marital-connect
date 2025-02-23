import { Card } from "@/components/ui/card"
import { Clock, Star, Video, TrendingUp } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3 shrink-0">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

const stats = [
  {
    title: "Total Hours",
    value: "24.5",
    description: "Across 12 sessions",
    icon: Clock,
  },
  {
    title: "Upcoming",
    value: "3",
    description: "Sessions scheduled",
    icon: Video,
  },
  {
    title: "Average Rating",
    value: "4.8",
    description: "From 10 reviews",
    icon: Star,
  },
  {
    title: "Growth Score",
    value: "85%",
    description: "Based on milestones",
    icon: TrendingUp,
  },
] 