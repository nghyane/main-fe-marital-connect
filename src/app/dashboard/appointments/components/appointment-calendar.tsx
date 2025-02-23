"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Clock, Video, ExternalLink, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AppointmentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const dayAppointments = [
    {
      id: "1",
      time: "10:00 AM",
      expert: {
        name: "Dr. Sarah Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        specialty: "Career Coach",
      },
      duration: 60,
      meetingUrl: "https://meet.google.com/abc-defg-hij",
      status: "scheduled",
    },
  ]

  return (
    <div className="grid gap-0 md:grid-cols-[380px_1fr]">
      <div className="border-r">
        <div className="p-4 border-b">
          <h3 className="font-medium text-sm">Select Date</h3>
        </div>
        <div className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
          />
        </div>
      </div>

      <div>
        <div className="p-4 border-b">
          <h3 className="font-medium text-sm">
            {date ? format(date, "MMMM d, yyyy") : "Select a date"}
          </h3>
        </div>
        
        <ScrollArea className="h-[600px]">
          <div className="p-4 space-y-4">
            {dayAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="border">
                    <AvatarImage src={appointment.expert.avatar} />
                    <AvatarFallback>{appointment.expert.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="font-medium">{appointment.expert.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.expert.specialty}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
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
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
} 