import { Metadata } from "next";
import { Shell } from "@/components/shell";
import { getProfile } from "@/app/actions/user";
import { redirect } from "next/navigation";
import { CertificationUploadForm } from "../_components/certification-upload-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Upload Certification | Expert Dashboard",
  description: "Upload your professional certifications and credentials"
};

export default async function UploadCertificationPage() {
  const userData = await getProfile();
  const user = userData.data;
  
  // Redirect to dashboard if not an expert
  if (user.role.name !== 'expert') {
    redirect('/dashboard');
  }

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            asChild
            className="h-8 w-8"
          >
            <Link href="/dashboard/certifications">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Upload Certification</h1>
            <p className="text-sm text-muted-foreground">
              Add a new professional certification to your profile
            </p>
          </div>
        </div>
        
        <CertificationUploadForm />
      </div>
    </Shell>
  );
} 