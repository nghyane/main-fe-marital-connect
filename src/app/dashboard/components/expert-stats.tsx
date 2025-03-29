import { Card } from "@/components/ui/card"
import { Clock, Star, Users, Calendar, Wallet } from "lucide-react"
import { getProfile } from "@/app/actions/user"

export async function ExpertStats() {
  const userData = await getProfile();
  const user = userData.data;
  
  // In a real application, these stats would come from an API
  // For now, we're using hardcoded sample data
  
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Active Clients</p>
        </div>
        <p className="text-2xl font-bold mt-2">12</p>
        <p className="text-xs text-muted-foreground mt-1">
          3 new this month
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">This Month</p>
        </div>
        <p className="text-2xl font-bold mt-2">18</p>
        <p className="text-xs text-muted-foreground mt-1">
          Sessions scheduled
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Average Rating</p>
        </div>
        <p className="text-2xl font-bold mt-2">4.9</p>
        <p className="text-xs text-muted-foreground mt-1">
          From 24 reviews
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Revenue</p>
        </div>
        <p className="text-2xl font-bold mt-2">$3,240</p>
        <p className="text-xs text-muted-foreground mt-1">
          +15% from last month
        </p>
      </Card>
    </div>
  )
} 