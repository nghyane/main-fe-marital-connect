"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ExpertAppointmentList } from "./expert-appointment-list"
import { AppointmentCalendar } from "./appointment-calendar"

export function ExpertAppointmentTabs() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  
  const tab = searchParams.get('tab') || 'upcoming'

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', value)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue={tab} 
        className="w-full" 
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        {tab === 'upcoming' && (
          <ExpertAppointmentList type="upcoming" />
        )}
        
        {tab === 'past' && (
          <ExpertAppointmentList type="past" />
        )}
        
        {tab === 'calendar' && (
          <AppointmentCalendar />
        )}
      </Tabs>
    </div>
  )
} 