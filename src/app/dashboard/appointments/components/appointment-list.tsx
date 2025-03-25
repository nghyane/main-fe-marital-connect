"use client"

import { format } from "date-fns"
import {
  Calendar,
  Clock,
  MoreHorizontal,
  Video,
  ExternalLink,
  Star,
  Plus,
  DollarSign,
  Clock4,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
        toast.success('Appointment cancelled successfully')
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
    if (type === "upcoming") {
      return appointment.status === "pending" || appointment.status === "scheduled"
    }
    return appointment.status === "completed" || appointment.status === "cancelled"
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loading size="lg" text="Loading appointments..." />
      </div>
    )
  }

  if (filteredAppointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Calendar className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No appointments found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {type === "upcoming" 
            ? "You don't have any upcoming sessions scheduled"
            : "You haven't completed any sessions yet"
          }
        </p>
        {type === "upcoming" && (
          <Button className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            Book New Session
          </Button>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Session</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              {type === "upcoming" && <TableHead>Meeting</TableHead>}
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
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
                    variant={
                      appointment.status === "pending"
                        ? "secondary"
                        : appointment.status === "scheduled"
                        ? "default"
                        : appointment.status === "completed"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {appointment.status}
                  </Badge>
                </TableCell>
                {type === "upcoming" && (
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a 
                        href={`/appointments/${appointment.id}/meeting`} 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Video className="h-4 w-4" />
                        Join
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </TableCell>
                )}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      {(appointment.status === "pending" || appointment.status === "scheduled") && (
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => setAppointmentToCancel(appointment)}
                        >
                          Cancel Session
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!appointmentToCancel} onOpenChange={() => setAppointmentToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep it</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelAppointment}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, cancel it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 