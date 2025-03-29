"use client"

import { format } from "date-fns"
import {
  Calendar,
  Clock,
  Video,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CalendarCheck,
  Mail,
  PhoneCall,
  FileText,
  MoreVertical,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { getExpertAppointments, cancelAppointment, confirmAppointment, completeAppointment, ExpertAppointment, Client } from "../actions"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ExpertAppointmentListProps {
  type: "upcoming" | "past" 
}

// Status utilities
const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending": return <AlertCircle className="h-4 w-4" />
    case "scheduled":
    case "confirmed": return <CalendarCheck className="h-4 w-4" />
    case "completed": return <CheckCircle2 className="h-4 w-4" />
    case "canceled": return <XCircle className="h-4 w-4" />
    default: return null
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "pending": return "secondary"
    case "scheduled":
    case "confirmed": return "default"
    case "completed": return "outline"
    case "canceled": return "destructive"
    default: return "outline"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "text-amber-500 bg-amber-50 dark:bg-amber-950/30"
    case "scheduled":
    case "confirmed": return "text-blue-500 bg-blue-50 dark:bg-blue-950/30"
    case "completed": return "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
    case "canceled": return "text-rose-500 bg-rose-50 dark:bg-rose-950/30"
    default: return "text-gray-500 bg-gray-50 dark:bg-gray-900/30"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending": return "Pending"
    case "scheduled": return "Scheduled"
    case "confirmed": return "Confirmed"
    case "completed": return "Completed"
    case "canceled": return "Canceled"
    default: return status.charAt(0).toUpperCase() + status.slice(1)
  }
}

// Format price to display
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

// Reusable components
function AppointmentStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={getStatusVariant(status)} className="flex w-fit items-center gap-1">
      {getStatusIcon(status)}
      {getStatusLabel(status)}
    </Badge>
  )
}

function ClientAvatar({ client }: { client: Client }) {
  const clientName = client?.name || "Unknown Client"
  const clientInitials = clientName.split(" ").map((n: string) => n[0]).join("")
  const clientImage = client?.profile_image
  
  return (
    <Avatar>
      <AvatarImage src={clientImage} />
      <AvatarFallback>{clientInitials}</AvatarFallback>
    </Avatar>
  )
}

interface AppointmentActionsProps {
  appointment: ExpertAppointment
  onConfirm: (id: number) => Promise<void>
  onComplete: (id: number) => Promise<void>
  onCancel: (appointment: ExpertAppointment) => void
  isMobile?: boolean
}

function AppointmentActions({ 
  appointment, 
  onConfirm, 
  onComplete, 
  onCancel, 
  isMobile = false 
}: AppointmentActionsProps) {
  const canCancel = ["pending", "scheduled", "confirmed"].includes(appointment.status)
  
  return (
    <div className={isMobile ? "flex justify-end" : "flex items-center justify-end"}>
      {(appointment.status === "scheduled" || appointment.status === "confirmed") && !isMobile && (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a 
                    href={`mailto:${appointment.client?.email}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Email Client</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 mx-2"
            asChild
          >
            <a 
              href={appointment.expert?.google_meet_link || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Video className="h-4 w-4" />
              Join
            </a>
          </Button>
        </>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {appointment.status === "pending" && (
            <>
              <DropdownMenuItem 
                className="text-primary cursor-pointer"
                onClick={() => onConfirm(appointment.id)}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirm
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive cursor-pointer"
                onClick={() => onCancel(appointment)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Decline
              </DropdownMenuItem>
            </>
          )}
          
          {(appointment.status === "scheduled" || appointment.status === "confirmed") && (
            <>
              {isMobile && (
                <>
                  <DropdownMenuItem asChild>
                    <a 
                      href={`mailto:${appointment.client?.email}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email Client
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a 
                      href={appointment.expert?.google_meet_link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Join Session
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              
              {appointment.status === "confirmed" && (
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => onComplete(appointment.id)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Completed
                </DropdownMenuItem>
              )}
              
              {canCancel && (
                <DropdownMenuItem 
                  className="text-destructive cursor-pointer"
                  onClick={() => onCancel(appointment)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Appointment
                </DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// Loading skeletons
function MobileAppointmentSkeleton() {
  return (
    <Card className="mb-4 overflow-hidden border-none shadow-md">
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
  )
}

function DesktopAppointmentSkeleton({ type }: { type: "upcoming" | "past" }) {
  return (
    <TableRow className="hover:bg-muted/30">
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
  )
}

function MobileAppointmentCard({
  appointment,
  onConfirm,
  onComplete,
  onCancel
}: {
  appointment: ExpertAppointment,
  onConfirm: (id: number) => Promise<void>,
  onComplete: (id: number) => Promise<void>,
  onCancel: (appointment: ExpertAppointment) => void
}) {
  const appointmentDate = new Date(appointment.scheduled_time)
  const endTime = new Date(appointment.end_time)
  const duration = (endTime.getTime() - appointmentDate.getTime()) / (1000 * 60)
  
  const clientName = appointment.client?.name || "Unknown Client"
  
  return (
    <Card key={appointment.id} className="overflow-hidden shadow-sm">
      <div className={cn("h-2", getStatusColor(appointment.status))}></div>
      <CardContent className="p-5">
        <div className="flex items-center gap-4 mb-3">
          <ClientAvatar client={appointment.client} />
          <div className="flex-1">
            <div className="font-medium">{clientName}</div>
            <div className="text-sm text-muted-foreground">
              {appointment.service.name}
            </div>
          </div>
          <AppointmentStatusBadge status={appointment.status} />
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-start gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <div>{format(appointmentDate, "EEEE, MMMM d, yyyy")}</div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  {format(appointmentDate, "h:mm a")} - {format(endTime, "h:mm a")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{duration} minutes</span>
          </div>

          {appointment.notes && (
            <div className="flex items-start gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="line-clamp-2">{appointment.notes}</div>
            </div>
          )}
        </div>

        {(appointment.status === "scheduled" || appointment.status === "confirmed") && (
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              asChild
            >
              <a 
                href={appointment.expert?.google_meet_link || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Video className="h-4 w-4" />
                Join Session
              </a>
            </Button>
            
            <AppointmentActions 
              appointment={appointment}
              onConfirm={onConfirm}
              onComplete={onComplete}
              onCancel={onCancel}
              isMobile={true}
            />
          </div>
        )}
        
        {appointment.status === "pending" && (
          <div className="flex justify-end mt-4">
            <AppointmentActions 
              appointment={appointment}
              onConfirm={onConfirm}
              onComplete={onComplete}
              onCancel={onCancel}
              isMobile={true}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Main component
export function ExpertAppointmentList({ type }: ExpertAppointmentListProps) {
  const [appointments, setAppointments] = useState<ExpertAppointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [appointmentToCancel, setAppointmentToCancel] = useState<ExpertAppointment | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  async function fetchAppointments() {
    try {
      setIsLoading(true)
      const response = await getExpertAppointments()
      
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
        setIsConfirmDialogOpen(false)
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

  const handleConfirmAppointment = async (appointmentId: number) => {
    try {
      const response = await confirmAppointment(appointmentId)
      
      if (response.success) {
        toast.success('Appointment confirmed successfully')
        // Refresh appointments list
        fetchAppointments()
      } else {
        toast.error(response.error || 'Failed to confirm appointment')
      }
    } catch (error) {
      console.error('Error confirming appointment:', error)
      toast.error('An unexpected error occurred')
    }
  }

  const handleCompleteAppointment = async (appointmentId: number) => {
    try {
      const response = await completeAppointment(appointmentId)
      
      if (response.success) {
        toast.success('Session marked as completed')
        // Refresh appointments list
        fetchAppointments()
      } else {
        toast.error(response.error || 'Failed to mark session as completed')
      }
    } catch (error) {
      console.error('Error completing appointment:', error)
      toast.error('An unexpected error occurred')
    }
  }

  const handleCancelButton = (appointment: ExpertAppointment) => {
    setAppointmentToCancel(appointment)
    setIsConfirmDialogOpen(true)
  }

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.scheduled_time)
    const now = new Date()

    switch (type) {
      case "upcoming":
        return (
          (appointment.status === "pending" || 
           appointment.status === "scheduled" || 
           appointment.status === "confirmed") && 
          appointmentDate > now
        )
      case "past":
        return (
          appointment.status === "completed" || 
          appointment.status === "canceled" || 
          (appointmentDate < now && appointment.status !== "pending")
        )
      default:
        return false
    }
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="md:hidden">
          {[1, 2, 3].map((i) => (
            <MobileAppointmentSkeleton key={i} />
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
                <DesktopAppointmentSkeleton key={i} type={type} />
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
          {type === "upcoming" ? (
            <Calendar className="h-8 w-8 text-primary" />
          ) : (
            <Clock className="h-8 w-8 text-primary" />
          )}
        </div>
        <h3 className="font-medium text-lg mb-2">
          {type === "upcoming" ? "No upcoming sessions" : "No past sessions"}
        </h3>
        <p className="text-muted-foreground text-sm max-w-md mb-6">
          {type === "upcoming"
            ? "You don't have any upcoming sessions with clients yet."
            : "You don't have any past session history."}
        </p>
        {type === "upcoming" && (
          <Button variant="default" asChild>
            <a href="/dashboard/appointments/schedule">Schedule a Session</a>
          </Button>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {filteredAppointments.map((appointment) => (
          <MobileAppointmentCard
            key={appointment.id}
            appointment={appointment}
            onConfirm={handleConfirmAppointment}
            onComplete={handleCompleteAppointment}
            onCancel={handleCancelButton}
          />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead>Client</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              {type === "upcoming" && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => {
              const appointmentDate = new Date(appointment.scheduled_time)
              const endTime = new Date(appointment.end_time)
              
              const clientName = appointment.client?.name || "Unknown Client"
              
              return (
                <TableRow key={appointment.id} className="hover:bg-muted/40">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ClientAvatar client={appointment.client} />
                      <div>
                        <div className="font-medium">{clientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.client?.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{format(appointmentDate, "MMM d, yyyy")}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {format(appointmentDate, "h:mm a")} - {format(endTime, "h:mm a")}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{appointment.service.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatPrice(appointment.service.price)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <AppointmentStatusBadge status={appointment.status} />
                  </TableCell>
                  {type === "upcoming" && (
                    <TableCell className="text-right">
                      <AppointmentActions
                        appointment={appointment}
                        onConfirm={handleConfirmAppointment}
                        onComplete={handleCompleteAppointment}
                        onCancel={handleCancelButton}
                      />
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel your appointment with {appointmentToCancel?.client?.name}.
              {appointmentToCancel?.status === "pending" ? 
                " The client will be notified that their appointment request was declined." : 
                " The client will be notified that their appointment has been canceled."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAppointmentToCancel(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelAppointment}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {appointmentToCancel?.status === "pending" ? "Decline" : "Cancel Appointment"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 