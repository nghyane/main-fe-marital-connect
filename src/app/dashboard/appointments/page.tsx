"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "../provider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentTabs } from "./components/appointment-tabs"
import { ExpertAppointmentTabs } from "./components/expert-appointments-tabs"
import { useSearchParams } from "next/navigation"

export default function AppointmentsPage() {
  const { user } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'upcoming'
  
  const isExpert = user?.role?.name === 'expert'

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {isExpert ? "Client Sessions" : "My Sessions"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isExpert 
              ? "View and manage sessions that clients have booked with you" 
              : "View and manage your upcoming and past sessions"}
          </p>
        </div>
      </div>
      
      <Card className="mt-6">
        <CardContent className="p-6">
          {isExpert ? (
            <ExpertAppointmentTabs />
          ) : (
            <AppointmentTabs defaultTab={tab} />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 