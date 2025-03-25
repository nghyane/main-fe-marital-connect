import { Metadata } from "next"
import { Shell } from "@/components/shell"
import { AlertCircle } from "lucide-react"
import { getProfile } from "@/app/actions/user"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ProfileForm } from "./components/profile-form"

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your profile settings and preferences"
}

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const userData = await getProfile();
  const user = userData.data;

  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profile Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings
          </p>
        </div>
        
        {!user.profile && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Welcome to Marital Connect!</AlertTitle>
            <AlertDescription>
              Please take a moment to set up your profile. This information helps us personalize your experience.
            </AlertDescription>
          </Alert>
        )}

        <ProfileForm/>
      </div>
    </Shell>
  )
} 