import { Metadata } from "next"
import { Shell } from "@/components/shell"
import { AlertCircle } from "lucide-react"
import { getProfile, getExpertProfile } from "@/app/actions/user"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ProfileForm } from "./components/profile-form"
import { ExpertProfileForm } from "./components/expert-profile-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  
  const isExpert = user.role?.name === "expert";
  
  // Load expert profile data if user is an expert
  let expertProfileData;
  if (isExpert) {
    try {
      expertProfileData = await getExpertProfile();
    } catch (error) {
      console.error("Failed to load expert profile:", error);
    }
  }

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

        {isExpert ? (
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Profile</TabsTrigger>
              <TabsTrigger value="expert">Expert Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4">
              <ProfileForm user={user} />
            </TabsContent>
            <TabsContent value="expert" className="space-y-4">
              {expertProfileData ? (
                <ExpertProfileForm expertProfile={expertProfileData.data} />
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Expert Profile Not Found</AlertTitle>
                  <AlertDescription>
                    Your expert profile has not been set up yet. Please complete the form below to create your expert profile.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <ProfileForm user={user} />
        )}
      </div>
    </Shell>
  )
} 