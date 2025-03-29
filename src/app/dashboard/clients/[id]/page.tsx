import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Mail, MessageSquare, Video, MapPin, Phone, User, DollarSign } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format, parseISO } from "date-fns"
import { api } from "@/lib/api-client"
import { AppError } from "@/utils/error-handler"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Client Details | Expert Dashboard",
  description: "View and manage client details",
}

interface ApiClientProfile {
  address: string;
  bio: string;
  city: string;
  country: string;
  phone: string;
  profile_image: string;
  state: string;
}

interface ApiAppointment {
  id: number;
  service_name: string;
  scheduled_time: string;
  end_time: string;
  status: "completed" | "canceled" | "scheduled";
  price: number;
}

interface ApiClientDetails {
  user_id: number;
  name: string;
  email: string;
  account_status: string;
  profile: ApiClientProfile;
  appointments: ApiAppointment[];
  first_appointment: string;
  last_appointment: string | null;
  next_appointment: string;
  total_appointments: string;
  total_spent: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: ApiClientDetails;
}

async function getClientDetails(clientId: string): Promise<ApiClientDetails | null> {
  try {
    const response = await api.fetch<ApiResponse>(`/experts/clients/${clientId}`, { auth: true });
    
    if (!response.success) {
      throw new AppError(response.message, "API_ERROR", 400);
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching client details:", error);
    return null;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400">
          Active Client
        </Badge>
      );
    case "inactive":
      return (
        <Badge variant="outline" className="bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400">
          Inactive Client
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400">
          {status}
        </Badge>
      );
  }
}

function getAppointmentStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400">
          Completed
        </Badge>
      );
    case "canceled":
      return (
        <Badge variant="outline" className="bg-rose-50 text-rose-700 hover:bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400">
          Canceled
        </Badge>
      );
    case "scheduled":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400">
          Scheduled
        </Badge>
      );
    default:
      return null;
  }
}

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  // const clientId = params.id;
  const { id: clientId } = await params;
  const client = await getClientDetails(clientId);
  
  if (!client) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Client Not Found</h1>
          <p className="text-muted-foreground">The client you're looking for doesn't exist or you don't have access.</p>
        </div>
      </div>
    );
  }

  // Calculate session stats
  const stats = {
    total: parseInt(client.total_appointments),
    completed: client.appointments.filter(a => a.status === "completed").length,
    upcoming: client.appointments.filter(a => a.status === "scheduled").length,
    canceled: client.appointments.filter(a => a.status === "canceled").length
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Client Details</h1>
          <p className="text-muted-foreground mt-1">View and manage client information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href={`mailto:${client.email}`}>
              <Mail className="h-4 w-4" />
              Email
            </a>
          </Button>
          <Button variant="default" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client Profile */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src={client.profile.profile_image} alt={client.name} />
                <AvatarFallback>
                  {client.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl font-medium">{client.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">{client.email}</p>
              
              {getStatusBadge(client.account_status)}
              
              <Separator className="my-6" />
              
              <div className="w-full space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{client.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{client.profile.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{client.profile.city}, {client.profile.state}, {client.profile.country}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="text-sm text-muted-foreground">Client Since</p>
                    <p className="font-medium">{client.first_appointment ? format(parseISO(client.first_appointment), "PPP") : "N/A"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="text-sm text-muted-foreground">Next Session</p>
                    <p className="font-medium">{client.next_appointment ? format(parseISO(client.next_appointment), "PPP 'at' p") : "None scheduled"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="font-medium">${client.total_spent}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Session Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Total</p>
                  <p className="text-2xl font-bold mt-1">{stats.total}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg text-center">
                  <p className="text-blue-700 dark:text-blue-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400 mt-1">{stats.completed}</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg text-center">
                  <p className="text-amber-700 dark:text-amber-400 text-sm">Upcoming</p>
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">{stats.upcoming}</p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-lg text-center">
                  <p className="text-rose-700 dark:text-rose-400 text-sm">Canceled</p>
                  <p className="text-2xl font-bold text-rose-700 dark:text-rose-400 mt-1">{stats.canceled}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs Content */}
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="sessions" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger 
                    value="sessions" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Sessions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="profile" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Profile
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="sessions" className="p-6">
                  <div className="space-y-6">
                    {client.appointments.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {client.appointments.map((appointment) => {
                            const startTime = parseISO(appointment.scheduled_time);
                            const endTime = parseISO(appointment.end_time);
                            const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
                            
                            return (
                              <TableRow key={appointment.id}>
                                <TableCell>{appointment.service_name}</TableCell>
                                <TableCell>
                                  <div className="flex flex-col">
                                    <span>{format(startTime, "PPP")}</span>
                                    <span className="text-muted-foreground text-sm">{format(startTime, "p")}</span>
                                  </div>
                                </TableCell>
                                <TableCell>{durationMinutes} minutes</TableCell>
                                <TableCell>${appointment.price}</TableCell>
                                <TableCell>{getAppointmentStatusBadge(appointment.status)}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No sessions found for this client.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="profile" className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Bio</h3>
                      <div className="p-4 rounded-lg border bg-muted/20">
                        <p className="text-sm">{client.profile.bio}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border bg-muted/20">
                          <div className="flex items-center gap-3 mb-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium">Full Name</p>
                          </div>
                          <p className="text-sm pl-7">{client.name}</p>
                        </div>
                        
                        <div className="p-4 rounded-lg border bg-muted/20">
                          <div className="flex items-center gap-3 mb-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium">Email</p>
                          </div>
                          <p className="text-sm pl-7">{client.email}</p>
                        </div>
                        
                        <div className="p-4 rounded-lg border bg-muted/20">
                          <div className="flex items-center gap-3 mb-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium">Phone</p>
                          </div>
                          <p className="text-sm pl-7">{client.profile.phone}</p>
                        </div>
                        
                        <div className="p-4 rounded-lg border bg-muted/20">
                          <div className="flex items-center gap-3 mb-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium">Address</p>
                          </div>
                          <p className="text-sm pl-7">{client.profile.address}</p>
                          <p className="text-sm pl-7">{client.profile.city}, {client.profile.state} {client.profile.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 