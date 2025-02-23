"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video } from "lucide-react"
import { format } from "date-fns"

export function RecentAppointments() {
  const appointments = [
    {
      id: "1",
      expert: {
        name: "Dr. Sarah Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        specialty: "Career Coach",
      },
      date: new Date("2024-03-20T10:00:00"),
      duration: 60,
      status: "scheduled",
      meetingUrl: "https://meet.google.com/abc-defg-hij",
    },
    // Add more recent appointments...
  ]

  return (
    <div className="divide-y">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={appointment.expert.avatar} />
              <AvatarFallback>
                {appointment.expert.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{appointment.expert.name}</span>
                <Badge variant="secondary">{appointment.status}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(appointment.date, "MMM d, yyyy")}</span>
                <Clock className="ml-2 h-4 w-4" />
                <span>{format(appointment.date, "h:mm a")}</span>
              </div>
            </div>
          </div>
          {appointment.status === "scheduled" && (
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a 
                href={appointment.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Video className="h-4 w-4" />
                Join
              </a>
            </Button>
          )}
        </div>
      ))}
    </div>
  )
} 