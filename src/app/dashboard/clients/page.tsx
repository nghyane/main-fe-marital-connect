import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MoreHorizontal, 
  MessageSquare,
  Mail,
  UserPlus
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { format } from "date-fns"
import { api } from "@/lib/api-client"
import { AppError } from "@/utils/error-handler"

export const metadata: Metadata = {
  title: "Client Management | Expert Dashboard",
  description: "View and manage your counseling clients"
}

interface ApiClient {
  user_id: number;
  name: string;
  email: string;
  account_status: string;
  last_appointment: string | null;
  next_appointment: string | null;
  next_appointment_status: string | null;
  appointment_count: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: ApiClient[];
}

interface Client {
  id: string;
  name: string;
  email: string;
  status: string;
  profileImage: string;
  lastSession: string | null;
  nextSession: string | null;
  nextSessionStatus?: string | null;
  totalSessions: number;
}

async function getClients(): Promise<Client[]> {
  try {
    const response = await api.fetch<ApiResponse>("/experts/clients", { auth: true });

    if (!response.success) {
      throw new AppError(response.message, "API_ERROR", 400);
    }

    return response.data.map((client) => ({
      id: client.user_id.toString(),
      name: client.name,
      email: client.email,
      status: client.account_status,
      profileImage: `https://api.dicebear.com/7.x/lorelei/svg?seed=${client.user_id}`,
      lastSession: client.last_appointment ? format(new Date(client.last_appointment), "yyyy-MM-dd") : null,
      nextSession: client.next_appointment ? format(new Date(client.next_appointment), "yyyy-MM-dd") : null,
      nextSessionStatus: client.next_appointment_status,
      totalSessions: parseInt(client.appointment_count, 10)
    }));
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}

export default async function ClientsPage() {
  const clients = await getClients();

  // Get client status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400">
            Inactive
          </Badge>
        )
      case "new":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400">
            New
          </Badge>
        )
      default:
        return null
    }
  }

  // Get appointment status badge
  const getAppointmentStatusBadge = (status: string | null | undefined) => {
    if (!status) return null;
    
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400">
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="ml-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-950/30 dark:text-red-400">
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  // Calculate stats
  const activeClients = clients.filter(client => client.status === "active").length;
  const newClients = clients.filter(client => client.status === "new").length;
  const activeClientPercentage = clients.length > 0 
    ? Math.round((activeClients / clients.length) * 100) 
    : 0;

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Clients</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your counseling clients
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Client
        </Button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search clients..."
            className="pl-8 bg-background"
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      {/* Client stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">
              All registered clients
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeClients}
            </div>
            <p className="text-xs text-muted-foreground">
              {activeClientPercentage}% of total clients
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {newClients}
            </div>
            <p className="text-xs text-muted-foreground">
              Recently registered clients
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Clients table */}
      <Card className="overflow-hidden">
        {clients.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No clients found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Session</TableHead>
                <TableHead>Next Session</TableHead>
                <TableHead>Total Sessions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={client.profileImage} alt={client.name} />
                        <AvatarFallback>
                          {client.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">{client.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell>{client.lastSession || "-"}</TableCell>
                  <TableCell>
                    {client.nextSession ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{client.nextSession}</span>
                        {getAppointmentStatusBadge(client.nextSessionStatus)}
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{client.totalSessions}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/clients/${client.id}`}>
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Link>
                      </Button>
                    
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
} 