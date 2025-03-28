"use client"

import { format } from "date-fns"
import {
  Calendar,
  Clock,
  MoreHorizontal,
  Video,
  ExternalLink,
  DollarSign,
  Clock4,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CalendarCheck,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { getUserAppointments, type Appointment } from "../actions"
import { toast } from "sonner"
import { Loading } from "@/components/ui/loading"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface AppointmentListProps {
  type: "upcoming" | "past" 
}

export function AppointmentList({ type }: AppointmentListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchAppointments() {
    try {
      const response = await getUserAppointments()
      if (response.success) {
        setAppointments(response.data)
      } else {
        toast.error(response.error || 'Failed to fetch appointments')
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const filteredAppointments = appointments.filter(appointment => {
    switch (type) {
      case "upcoming":
        return appointment.status === "pending" || appointment.status === "scheduled" || appointment.status === "confirmed"
      case "past":
        return appointment.status === "completed" || appointment.status === "cancelled"
      default:
        return false
    }
  })

  // Get status icon based on appointment status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "scheduled":
      case "confirmed":
        return <CalendarCheck className="h-4 w-4" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  // Get status badge variant based on appointment status
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "scheduled":
      case "confirmed":
        return "default"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="md:hidden">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="hidden md:block rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><Skeleton className="h-4 w-8" /></TableHead>
                <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                {type === "upcoming" && <TableHead><Skeleton className="h-4 w-16" /></TableHead>}
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  {type === "upcoming" && <TableCell><Skeleton className="h-8 w-20" /></TableCell>}
                  <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  if (filteredAppointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-muted/30 rounded-lg border border-dashed">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <Calendar className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">No appointments found</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {type === "upcoming" 
            ? "You don't have any upcoming sessions scheduled. Book a new session to get started with an expert."
            : "You haven't completed any sessions yet. Once you complete your first session, it will appear here."
          }
        </p>
        {type === "upcoming" && (
          <Button className="mt-6 gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            Book New Session
          </Button>
        )}
      </div>
    )
  }

  // Mobile view (card-based interface for small screens)
  const mobileView = (
    <div className="md:hidden space-y-4">
      {filteredAppointments.map((appointment) => (
        <Card key={appointment.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback className="bg-primary/10">
                    {appointment.expert.title.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{appointment.expert.title}</div>
                  <div className="text-sm text-muted-foreground">{appointment.expert.specialties[0]}</div>
                </div>
              </div>
              <Badge
                variant={getStatusVariant(appointment.status)}
                className="flex items-center gap-1 ml-2"
              >
                {getStatusIcon(appointment.status)}
                <span>{appointment.status}</span>
              </Badge>
            </div>
            
            <div className="space-y-3 mt-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(appointment.scheduled_time), "MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(appointment.scheduled_time), "h:mm a")}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock4 className="h-4 w-4" />
                  {appointment.service.duration}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {appointment.service.price}
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-muted/20 p-3 flex justify-between">
            <div className="text-xs text-muted-foreground">#{appointment.id}</div>
            <div className="flex gap-2">
              {type === "upcoming" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1 h-9"
                  asChild
                >
                  <a 
                    href={appointment.expert.google_meet_link} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Video className="h-3.5 w-3.5" />
                    Join
                  </a>
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  // Desktop view (table-based interface for larger screens)
  const desktopView = (
    <div className="hidden md:block rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>ID</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            {type === "upcoming" && <TableHead>Meeting</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div className="font-mono text-sm text-muted-foreground">
                  #{appointment.id}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-primary/10">
                        {appointment.expert.title.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{appointment.expert.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.expert.specialties[0]}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock4 className="h-3 w-3" />
                      {appointment.service.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {appointment.service.price}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{format(new Date(appointment.scheduled_time), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{format(new Date(appointment.scheduled_time), "h:mm a")}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={getStatusVariant(appointment.status)}
                  className="flex items-center gap-1"
                >
                  {getStatusIcon(appointment.status)}
                  <span>{appointment.status}</span>
                </Badge>
              </TableCell>
              {type === "upcoming" && (
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-1 shadow-sm hover:shadow"
                    asChild
                  >
                    <a 
                      href={appointment.expert.google_meet_link} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Video className="h-3.5 w-3.5" />
                      Join Meeting
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <>
      {mobileView}
      {desktopView}
    </>
  )
} 