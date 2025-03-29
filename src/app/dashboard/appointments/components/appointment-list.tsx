"use client"

import { format } from "date-fns"
import {
  Calendar,
  Clock,
  Video,
  ExternalLink,
  DollarSign,
  Clock4,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CalendarCheck,
  XIcon,
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
import { getUserAppointments, cancelAppointment, type Appointment } from "../actions"
import { toast } from "sonner"
import { Loading } from "@/components/ui/loading"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface AppointmentListProps {
  type: "upcoming" | "past" 
}

export function AppointmentList({ type }: AppointmentListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null)

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

  const handleCancelAppointment = async () => {
    if (!appointmentToCancel) return

    try {
      const response = await cancelAppointment(appointmentToCancel.id)
      if (response.success) {
        toast.success('Appointment canceled successfully')
        // Refresh appointments list
        fetchAppointments()
      } else {
        toast.error(response.error || 'Failed to cancel appointment')
      }
    } catch (error) {
      console.error('Error canceling appointment:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setAppointmentToCancel(null)
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    switch (type) {
      case "upcoming":
        return appointment.status === "pending" || appointment.status === "scheduled" || appointment.status === "confirmed"
      case "past":
        return appointment.status === "completed" || appointment.status === "canceled"
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
      case "canceled":
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
      case "canceled":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Get status color based on appointment status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-amber-500 bg-amber-50 dark:bg-amber-950/30"
      case "scheduled":
      case "confirmed":
        return "text-blue-500 bg-blue-50 dark:bg-blue-950/30"
      case "completed":
        return "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
      case "canceled":
        return "text-rose-500 bg-rose-50 dark:bg-rose-950/30"
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-900/30"
    }
  }

  // Get readable status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "scheduled":
        return "Scheduled"
      case "confirmed":
        return "Confirmed"
      case "completed":
        return "Completed"
      case "canceled":
        return "Canceled"
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  // Check if appointment can be canceled
  const canCancel = (status: string) => {
    return status === "pending" || status === "scheduled" || status === "confirmed"
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="md:hidden">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="mb-4 overflow-hidden border-none shadow-md">
              <div className="h-2 bg-gradient-to-r from-primary/70 to-primary/30"></div>
              <CardContent className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="space-y-3 mt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="hidden md:block rounded-md border border-border/40 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                {type === "upcoming" && <TableHead><Skeleton className="h-4 w-16" /></TableHead>}
                {type === "upcoming" && <TableHead><Skeleton className="h-4 w-16" /></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((i) => (
                <TableRow key={i} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
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
                  {type === "upcoming" && <TableCell><Skeleton className="h-8 w-20" /></TableCell>}
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
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-gradient-to-b from-muted/50 to-background rounded-xl border border-dashed border-muted">
        <div className="rounded-full bg-primary/10 p-4 mb-5 ring-4 ring-primary/5">
          <Calendar className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          No appointments found
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {type === "upcoming" 
            ? "You don't have any upcoming sessions scheduled. Book a new session to get started with an expert."
            : "You haven't completed any sessions yet. Once you complete your first session, it will appear here."
          }
        </p>
        {type === "upcoming" && (
          <Button 
            className="mt-6 gap-2 shadow-md transition-all hover:shadow-lg hover:translate-y-[-2px]"
            size="lg"
          >
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
      {filteredAppointments.map((appointment) => {
        const statusColor = getStatusColor(appointment.status);
        return (
          <Card key={appointment.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
            <div className={cn("h-1.5", statusColor.split(" ")[0].replace("text-", "bg-"))}></div>
            <CardContent className="p-5 pt-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {appointment.expert.title.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{appointment.expert.title}</div>
                    <div className="text-sm text-muted-foreground">{appointment.expert.specialties[0]}</div>
                  </div>
                </div>
                <div className={cn("text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1", statusColor)}>
                  {getStatusIcon(appointment.status)}
                  <span>{getStatusLabel(appointment.status)}</span>
                </div>
              </div>
              
              <div className="space-y-3 mt-4 text-sm">
                <div className="flex items-center gap-2.5 text-foreground">
                  <div className="w-5 flex justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{format(new Date(appointment.scheduled_time), "EEEE, MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2.5 text-foreground">
                  <div className="w-5 flex justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <span>{format(new Date(appointment.scheduled_time), "h:mm a")}</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 flex justify-center">
                      <Clock4 className="h-4 w-4" />
                    </div>
                    <span>{appointment.service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 flex justify-center">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <span>${appointment.service.price}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-muted/50 p-4 flex justify-end gap-3">
              {type === "upcoming" && canCancel(appointment.status) && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-900 dark:text-rose-400 dark:hover:bg-rose-950/50"
                  onClick={() => setAppointmentToCancel(appointment)}
                >
                  <XIcon className="h-3.5 w-3.5 mr-1.5" />
                  Cancel
                </Button>
              )}
              {type === "upcoming" && (
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-primary/90 hover:bg-primary"
                  asChild
                >
                  <a 
                    href={appointment.expert.google_meet_link} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Video className="h-3.5 w-3.5 mr-1.5" />
                    Join Meeting
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  )

  // Desktop view (table-based interface for larger screens)
  const desktopView = (
    <div className="hidden md:block rounded-lg border border-border/40 overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-medium">Session</TableHead>
            <TableHead className="font-medium">Date & Time</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            {type === "upcoming" && <TableHead className="font-medium">Meeting</TableHead>}
            {type === "upcoming" && <TableHead className="w-[100px] text-right font-medium">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.map((appointment) => {
            const statusColor = getStatusColor(appointment.status);
            return (
              <TableRow 
                key={appointment.id} 
                className="hover:bg-muted/20 group transition-colors"
              >
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border/50 shadow-sm group-hover:shadow transition-shadow">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {appointment.expert.title.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{appointment.expert.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.expert.specialties[0]}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 text-sm text-muted-foreground ml-1 pl-12">
                      <div className="flex items-center gap-1">
                        <Clock4 className="h-3.5 w-3.5 text-muted-foreground/70" />
                        <span>{appointment.service.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5 text-muted-foreground/70" />
                        <span>${appointment.service.price}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="h-4 w-4 text-primary/70" />
                      <span className="font-medium">{format(new Date(appointment.scheduled_time), "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-primary/70" />
                      <span>{format(new Date(appointment.scheduled_time), "h:mm a")}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", statusColor)}>
                    {getStatusIcon(appointment.status)}
                    <span>{getStatusLabel(appointment.status)}</span>
                  </div>
                </TableCell>
                {type === "upcoming" && (
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="gap-1.5 shadow-sm hover:shadow border-primary/20 text-primary hover:text-primary hover:bg-primary/5"
                      asChild
                    >
                      <a 
                        href={appointment.expert.google_meet_link} 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Video className="h-3.5 w-3.5" />
                        Join Meeting
                        <ExternalLink className="h-3 w-3 ml-0.5 opacity-70" />
                      </a>
                    </Button>
                  </TableCell>
                )}
                {type === "upcoming" && (
                  <TableCell className="text-right">
                    {canCancel(appointment.status) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/50"
                        onClick={() => setAppointmentToCancel(appointment)}
                      >
                        <XIcon className="h-3.5 w-3.5 mr-1.5" />
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <>
      {mobileView}
      {desktopView}

      <AlertDialog open={!!appointmentToCancel} onOpenChange={() => setAppointmentToCancel(null)}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="mt-0">No, keep it</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelAppointment}
              className="bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
            >
              Yes, cancel it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 