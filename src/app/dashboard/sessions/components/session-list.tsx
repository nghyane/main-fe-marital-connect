"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Clock, Star, MessageSquare } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Session {
  id: string
  expert: {
    name: string
    avatar: string
    specialty: string
  }
  date: Date
  duration: number
  rating?: number
  feedback?: string
  topics: string[]
  learnings: string[]
}

const sessions: Session[] = [
  {
    id: "1",
    expert: {
      name: "Dr. Sarah Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      specialty: "Career Coach",
    },
    date: new Date("2024-03-15T10:00:00"),
    duration: 60,
    rating: 5,
    feedback: "Excellent session with actionable insights",
    topics: ["Career Planning", "Industry Transition", "Personal Branding"],
    learnings: [
      "Created 3-month transition plan",
      "Identified target companies",
      "Developed networking strategy"
    ]
  },
  {
    id: "2",
    expert: {
      name: "Dr. Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      specialty: "Business Mentor",
    },
    date: new Date("2024-03-10T14:30:00"),
    duration: 45,
    rating: 4,
    topics: ["Business Strategy", "Growth Planning", "Market Analysis"],
    learnings: [
      "Developed scaling roadmap",
      "Analyzed market opportunities",
      "Created resource allocation plan"
    ]
  },
]

export function SessionList() {
  return (
    <div className="divide-y">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Session History</h2>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Session Details</TableHead>
              <TableHead>Topics</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="border">
                        <AvatarImage src={session.expert.avatar} />
                        <AvatarFallback className="bg-primary/10">
                          {session.expert.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{session.expert.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {session.expert.specialty}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(session.date, "MMM d, yyyy")}</span>
                      <Clock className="ml-2 h-4 w-4" />
                      <span>{format(session.date, "h:mm a")}</span>
                      <span>•</span>
                      <span>{session.duration} mins</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {session.topics?.map((topic) => (
                      <div
                        key={topic}
                        className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="gap-2">
                        {session.rating ? (
                          <div className="flex items-center gap-2">
                            {[...Array(session.rating)].map((_, i) => (
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
                                  rating <= (session.rating || 0)
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
                            defaultValue={session.feedback}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Key Learnings</Label>
                          <div className="space-y-2">
                            {session.learnings?.map((learning, index) => (
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
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 