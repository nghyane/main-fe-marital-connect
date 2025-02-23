import { Card } from "@/components/ui/card"
import { DashboardStats } from "./components/dashboard-stats"
import { RecentAppointments } from "./components/recent-appointments"
import { Button } from "@/components/ui/button"
import { CalendarDays, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Welcome back, John
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Here's an overview of your mentoring journey
        </p>
      </div>

      <DashboardStats />
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-6">
        <Card className="col-span-full lg:col-span-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
              <p className="text-sm text-muted-foreground">
                Your scheduled mentoring sessions
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-4 sm:mt-0">
              <Link href="/dashboard/appointments" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <RecentAppointments />
        </Card>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:col-span-2">
          <Card>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 shrink-0">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Need Guidance?</h3>
                  <p className="text-sm text-muted-foreground">
                    Book a session with our expert mentors
                  </p>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="/">Browse Experts</Link>
              </Button>
            </div>
          </Card>

          <Card>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3 shrink-0">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Session History</h3>
                  <p className="text-sm text-muted-foreground">
                    Review your past mentoring sessions
                  </p>
                </div>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/dashboard/appointments?tab=past">View History</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
