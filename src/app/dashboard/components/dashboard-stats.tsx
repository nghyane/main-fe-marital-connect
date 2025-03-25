import { Card } from "@/components/ui/card"
import { Clock, Star, Video, TrendingUp } from "lucide-react"
import { getProfile } from "@/app/actions/user"

export async function DashboardStats() {
  const userData = await getProfile();
  const user = userData.data;
  
  // Ở đây bạn có thể sử dụng dữ liệu từ user để hiển thị thống kê thực tế
  // Ví dụ: số buổi hẹn, đánh giá, v.v.
  
  // Default language if profile is null
  const language = user.profile?.preferences?.language || 'en';
  
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Total Hours</p>
        </div>
        <p className="text-2xl font-bold mt-2">24.5</p>
        <p className="text-xs text-muted-foreground mt-1">
          Across 12 sessions
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Video className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Upcoming</p>
        </div>
        <p className="text-2xl font-bold mt-2">3</p>
        <p className="text-xs text-muted-foreground mt-1">
          Sessions scheduled
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Average Rating</p>
        </div>
        <p className="text-2xl font-bold mt-2">4.8</p>
        <p className="text-xs text-muted-foreground mt-1">
          From 10 reviews
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Growth Score</p>
        </div>
        <p className="text-2xl font-bold mt-2">85%</p>
        <p className="text-xs text-muted-foreground mt-1">
          Based on {language === 'en' ? 'English' : 'Other'} milestones
        </p>
      </Card>
    </div>
  )
} 