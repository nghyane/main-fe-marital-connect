import { Metadata } from "next"
import { Shell } from "@/components/shell"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Globe, Clock, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences"
}

export default function SettingsPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Bell className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your notification preferences
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="session-reminders">Session Reminders</Label>
                  <Switch id="session-reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-updates">Email Updates</Label>
                  <Switch id="email-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <Switch id="sms-notifications" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Globe className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Language & Region</h3>
                  <p className="text-sm text-muted-foreground">
                    Set your language and regional preferences
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="vi">Vietnamese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Time Zone</Label>
                  <Select defaultValue="gmt7">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmt7">(GMT+7) Asia/Ho_Chi_Minh</SelectItem>
                      <SelectItem value="gmt8">(GMT+8) Asia/Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Shield className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Privacy & Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your privacy and security settings
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Two-factor Authentication</Label>
                  <Switch id="two-factor" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="activity-log">Activity Log</Label>
                  <Switch id="activity-log" defaultChecked />
                </div>
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </Shell>
  )
} 