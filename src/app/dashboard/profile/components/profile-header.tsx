"use client"

import { CameraIcon, PencilIcon, Link2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export function ProfileHeader() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Avatar className="h-20 w-20 border-2 border-muted">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="ghost"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full bg-background shadow-sm opacity-0 transition-opacity group-hover:opacity-100"
            >
              <CameraIcon className="h-4 w-4" />
              <span className="sr-only">Change profile picture</span>
            </Button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">John Doe</h1>
              <Badge variant="secondary">Pro Plan</Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>@johndoe</span>
              <span>•</span>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
          <Button variant="outline" size="sm" className="gap-2">
            <Link2Icon className="h-4 w-4" />
            Share Profile
          </Button>
          <Button size="sm">View Public Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="text-sm font-medium">Total Sessions</div>
          <div className="mt-1 text-2xl font-bold">128</div>
          <div className="text-xs text-muted-foreground">+14% from last month</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium">Total Reviews</div>
          <div className="mt-1 text-2xl font-bold">84</div>
          <div className="text-xs text-muted-foreground">4.8 average rating</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium">Member Since</div>
          <div className="mt-1 text-2xl font-bold">2022</div>
          <div className="text-xs text-muted-foreground">Active for 2 years</div>
        </Card>
      </div>
    </div>
  )
} 