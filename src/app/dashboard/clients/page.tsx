import { Metadata } from "next"
import { Shell } from "@/components/shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Search, 
  User, 
  Mail, 
  Calendar, 
  MoreHorizontal, 
  Filter, 
  ArrowUpDown, 
  MessageSquare,
  UserPlus
} from "lucide-react"
import { getProfile } from "@/app/actions/user"
import { redirect } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"

export const metadata: Metadata = {
  title: "Client Management | Expert Dashboard",
  description: "View and manage your counseling clients"
}

// Sample client data - in a real application, this would come from an API
const clients = [
  {
    id: 1,
    name: "Lisa Tanaka",
    email: "lisa.tanaka@example.com",
    lastSession: new Date("2024-03-15"),
    nextSession: new Date("2024-04-01"),
    status: "active",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Lisa",
    joinedDate: "Feb 2024",
    sessions: 4
  },
  {
    id: 2,
    name: "Marcus Chen",
    email: "marcus.chen@example.com",
    lastSession: new Date("2024-03-10"),
    nextSession: new Date("2024-03-30"),
    status: "active",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Marcus",
    joinedDate: "Jan 2024",
    sessions: 6
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    lastSession: new Date("2024-02-28"),
    nextSession: null,
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Priya",
    joinedDate: "Dec 2023",
    sessions: 2
  },
  {
    id: 4,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    lastSession: new Date("2024-03-18"),
    nextSession: new Date("2024-04-03"),
    status: "active",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Robert",
    joinedDate: "Mar 2024",
    sessions: 1
  },
  {
    id: 5,
    name: "Sophie Martinez",
    email: "sophie.martinez@example.com",
    lastSession: new Date("2024-01-15"),
    nextSession: null,
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sophie",
    joinedDate: "Nov 2023",
    sessions: 8
  }
]

export default async function ClientsPage() {
  const userData = await getProfile();
  const user = userData.data;
  
  // Redirect to dashboard if not an expert
  if (user.role.name !== 'expert') {
    redirect('/dashboard');
  }

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Client Management</h1>
            <p className="text-sm text-muted-foreground">
              View and manage your current and past clients
            </p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add New Client
          </Button>
        </div>

        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clients..."
                  className="pl-8 w-[200px] md:w-[260px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            <Card>
              <CardHeader className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Client List</CardTitle>
                  <CardDescription>{clients.length} total clients</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b">
                  <div className="grid grid-cols-12 gap-2 px-6 py-3 text-sm text-muted-foreground font-medium">
                    <div className="col-span-5 md:col-span-4 flex items-center gap-1">
                      <span>Client</span>
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                    <div className="col-span-3 hidden md:flex items-center gap-1">
                      <span>Status</span>
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                    <div className="col-span-4 md:col-span-3 flex items-center gap-1">
                      <span>Last Session</span>
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                    <div className="col-span-3 md:col-span-2 flex items-center gap-1 justify-end">
                      <span>Actions</span>
                    </div>
                  </div>
                </div>
                <div className="divide-y">
                  {clients.map((client) => (
                    <div key={client.id} className="grid grid-cols-12 gap-2 px-6 py-4 hover:bg-muted/50 transition-colors">
                      <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback>
                            {client.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-muted-foreground hidden md:block">{client.email}</div>
                        </div>
                      </div>
                      <div className="col-span-3 hidden md:flex items-center">
                        <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                          {client.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="col-span-4 md:col-span-3 flex items-center">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{client.lastSession ? format(client.lastSession, "MMM d, yyyy") : "No sessions"}</span>
                          </div>
                          {client.nextSession && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Next: {format(client.nextSession, "MMM d, yyyy")}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <a href={`mailto:${client.email}`} title="Email">
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" title="Message">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Schedule Session</DropdownMenuItem>
                            <DropdownMenuItem>View History</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Remove Client
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
                <div>
                  Showing {clients.length} of {clients.length} clients
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">Active Clients</h3>
                  <p className="text-sm text-muted-foreground">
                    View all your currently active clients.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">Inactive Clients</h3>
                  <p className="text-sm text-muted-foreground">
                    View all your past and inactive clients.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Client Engagement</CardTitle>
              <CardDescription>Total sessions per client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clients
                  .sort((a, b) => b.sessions - a.sessions)
                  .slice(0, 3)
                  .map((client) => (
                    <div key={client.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback>
                            {client.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium">{client.name}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline">{client.sessions} sessions</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest client interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clients
                  .filter(client => client.lastSession)
                  .sort((a, b) => b.lastSession!.getTime() - a.lastSession!.getTime())
                  .slice(0, 3)
                  .map((client) => (
                    <div key={client.id} className="flex items-start gap-2">
                      <Avatar className="h-8 w-8 mt-0.5">
                        <AvatarImage src={client.avatar} />
                        <AvatarFallback>
                          {client.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{client.name}</div>
                        <p className="text-xs text-muted-foreground">
                          Last session on {format(client.lastSession!, "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Status</CardTitle>
              <CardDescription>Active vs. inactive clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Active</div>
                  <div className="mt-1 text-2xl font-bold">
                    {clients.filter(client => client.status === 'active').length}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {Math.round(clients.filter(client => client.status === 'active').length / clients.length * 100)}% of clients
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Inactive</div>
                  <div className="mt-1 text-2xl font-bold">
                    {clients.filter(client => client.status === 'inactive').length}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {Math.round(clients.filter(client => client.status === 'inactive').length / clients.length * 100)}% of clients
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  )
} 