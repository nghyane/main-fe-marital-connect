import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CalendarDays, 
  ArrowRight, 
  Clock, 
  Users, 
  CalendarRange,
  TrendingUp,
  Star,
  MessageSquare,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { getProfile } from "@/app/actions/user"
import { WelcomeHeader } from "./components/welcome-header"
import { ExpertStats } from "./components/expert-stats"
import { DashboardStats } from "./components/dashboard-stats"
import { redirect } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

// Sample data for expert dashboard
// In a real application, this would come from an API
const recentClients = [
  {
    id: 1,
    name: "Lisa Tanaka",
    email: "lisa.tanaka@example.com",
    lastSession: new Date("2024-03-15"),
    nextSession: new Date("2024-04-01"),
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Lisa",
    sessions: 4
  },
  {
    id: 2,
    name: "Marcus Chen",
    email: "marcus.chen@example.com",
    lastSession: new Date("2024-03-10"),
    nextSession: new Date("2024-03-30"),
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Marcus",
    sessions: 6
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    lastSession: new Date("2024-03-18"),
    nextSession: new Date("2024-04-03"),
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Robert",
    sessions: 1
  },
]

const upcomingSessions = [
  {
    id: "1",
    client: {
      name: "Lisa Tanaka",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Lisa",
    },
    date: new Date("2024-04-01T14:00:00"),
    duration: 60,
    status: "scheduled",
    meetingUrl: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    client: {
      name: "Marcus Chen",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Marcus",
    },
    date: new Date("2024-03-30T10:30:00"),
    duration: 45,
    status: "scheduled",
    meetingUrl: "https://meet.google.com/xyz-abcd-efg",
  },
]

export default async function DashboardPage() {
  const userData = await getProfile();
  const user = userData.data;

  // Render appropriate dashboard based on user role
  if (user.role.name === 'expert') {
    return (
      <div className="space-y-6">
        <WelcomeHeader 
          name={user.name} 
        />

        <ExpertStats />
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-6">
          <Card className="col-span-full lg:col-span-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
                <p className="text-sm text-muted-foreground">
                  Your scheduled counseling sessions
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="mt-4 sm:mt-0">
                <Link href="/dashboard/appointments" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="divide-y">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={session.client.avatar} />
                      <AvatarFallback>
                        {session.client.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{session.client.name}</span>
                        <Badge variant="secondary">{session.status}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{format(session.date, "MMM d, yyyy")}</span>
                        <Clock className="ml-2 h-4 w-4" />
                        <span>{format(session.date, "h:mm a")}</span>
                      </div>
                    </div>
                  </div>
                  {session.status === "scheduled" && (
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a 
                        href={session.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CalendarDays className="h-4 w-4" />
                        Join
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-1 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Your most recently active clients</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentClients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback>
                            {client.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div className="font-medium">{client.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {client.sessions} sessions
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard/clients">View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 text-sm">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/clients" className="gap-2">
                    <Users className="h-4 w-4" />
                    Manage Clients
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common expert tasks</CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <Button className="w-full justify-start gap-2" asChild>
                  <Link href="/dashboard/appointments/schedule">
                    <CalendarRange className="h-4 w-4" />
                    Schedule Session
                  </Link>
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline" asChild>
                  <Link href="/dashboard/messages">
                    <MessageSquare className="h-4 w-4" />
                    Message Clients
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }
  
  // Regular user dashboard
  return (
    <div className="space-y-6">
      <WelcomeHeader 
        name={user.name} 
      />

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
          <div className="divide-y">
            {upcomingSessions.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">No upcoming sessions</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/">Browse Experts</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {/* Upcoming sessions would be mapped here */}
              </div>
            )}
          </div>
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
