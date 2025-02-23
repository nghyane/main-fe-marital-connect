"use client"

import { format } from "date-fns"
import {
  Calendar,
  Clock,
  MoreHorizontal,
  Video,
  ExternalLink,
  Star,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Appointment {
  id: string
  expert: {
    name: string
    avatar: string
    specialty: string
  }
  date: Date
  duration: number
  meetingUrl: string
  status: "scheduled" | "completed" | "cancelled"
  rating?: number
  feedback?: string
  topics?: string[]
  learnings?: string[]
}

const appointments: Appointment[] = [
  {
    id: "1",
    expert: {
      name: "Dr. Sarah Wilson",
      avatar: "https://cdn.cloudflare.com/avatars/sarah-wilson.jpg",
      specialty: "Career Coach",
    },
    date: new Date("2024-03-20T10:00:00"),
    duration: 60,
    meetingUrl: "https://meet.google.com/abc-defg-hij",
    status: "scheduled",
  },
  {
    id: "2",
    expert: {
      name: "Dr. Michael Chen",
      avatar: "https://cdn.cloudflare.com/avatars/michael-chen.jpg",
      specialty: "Business Mentor",
    },
    date: new Date("2024-03-18T15:30:00"),
    duration: 45,
    meetingUrl: "https://meet.google.com/xyz-uvwx-yz",
    status: "completed",
  },
]

interface AppointmentListProps {
  type: "upcoming" | "past"
}

export function AppointmentList({ type }: AppointmentListProps) {
  const filteredAppointments = appointments.filter(appointment => {
    if (type === "upcoming") {
      return appointment.status === "scheduled"
    }
    return appointment.status === "completed" || appointment.status === "cancelled"
  })

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Expert</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Duration</TableHead>
            {type === "upcoming" && <TableHead>Meeting Link</TableHead>}
            <TableHead>Status</TableHead>
            {type === "past" && <TableHead>Rating</TableHead>}
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="border">
                    <AvatarImage src={appointment.expert.avatar} />
                    <AvatarFallback className="bg-primary/10">
                      {appointment.expert.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{appointment.expert.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.expert.specialty}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(appointment.date, "MMM d, yyyy")}</span>
                  <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                  <span>{format(appointment.date, "h:mm a")}</span>
                </div>
              </TableCell>
              <TableCell>{appointment.duration} mins</TableCell>
              {type === "upcoming" && (
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <a 
                      href={appointment.meetingUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Video className="h-4 w-4" />
                      Join Meeting
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </TableCell>
              )}
              <TableCell>
                <Badge 
                  variant={
                    appointment.status === "scheduled" 
                      ? "default"
                      : appointment.status === "completed"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {appointment.status}
                </Badge>
              </TableCell>
              {type === "past" && (
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="gap-2">
                        {appointment.rating ? (
                          <div className="flex items-center gap-2">
                            {[...Array(appointment.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-primary text-primary"
                              />
                            ))}
                          </div>
                        ) : (
                          "Rate Session"
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Session Feedback</DialogTitle>
                        <DialogDescription>
                          Share your feedback about this mentoring session
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Rating</Label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <Button
                                key={rating}
                                variant="ghost"
                                size="sm"
                                className="p-2"
                              >
                                <Star className={`h-6 w-6 ${
                                  rating <= (appointment.rating || 0)
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground"
                                }`} />
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Feedback</Label>
                          <Textarea
                            placeholder="Share your thoughts about the session..."
                            defaultValue={appointment.feedback}
                          />
                        </div>
                        {appointment.learnings && (
                          <div className="space-y-2">
                            <Label>Key Learnings</Label>
                            <div className="space-y-2">
                              {appointment.learnings.map((learning, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                  {learning}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
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
                    {appointment.status === "scheduled" ? (
                      <>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Cancel Session
                        </DropdownMenuItem>
                      </>
                    ) : appointment.status === "completed" && !appointment.rating && (
                      <DropdownMenuItem>Rate Session</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 