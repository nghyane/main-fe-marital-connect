import { Metadata } from "next"
import { Shell } from "@/components/shell"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Mail, Phone, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your profile settings and preferences"
}

export default function ProfilePage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profile Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row gap-8 md:items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">
                    Your profile picture will be shown across the platform
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="John Doe" />
                </div>

                <div className="grid gap-2">
                  <Label>Email</Label>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="john@example.com" disabled />
                    <Button variant="outline" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Email changes require verification
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label>Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="+1234567890" />
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Location</Label>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="New York, USA" />
                    <Button variant="outline" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">About Me</h3>
                <p className="text-sm text-muted-foreground">
                  Share a bit about yourself
                </p>
              </div>
              <Textarea 
                className="min-h-[150px]"
                placeholder="Tell us about yourself..."
              />
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </Shell>
  )
} 