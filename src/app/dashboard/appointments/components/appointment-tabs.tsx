'use client'

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentList } from "./appointment-list"
import { AppointmentCalendar } from "./appointment-calendar"

interface AppointmentTabsProps {
  defaultTab: string
}

export function AppointmentTabs({ defaultTab }: AppointmentTabsProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value)
    // Update URL without reload
    router.push(`?tab=${value}`, { scroll: false })
  }, [router])

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past">
            Past
          </TabsTrigger>
          <TabsTrigger value="calendar">
            Calendar
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="upcoming" className="space-y-4">
        <AppointmentList type="upcoming" />
      </TabsContent>

      <TabsContent value="past" className="space-y-4">
        <AppointmentList type="past" />
      </TabsContent>

      <TabsContent value="calendar">
        <AppointmentCalendar />
      </TabsContent>
    </Tabs>
  )
} 