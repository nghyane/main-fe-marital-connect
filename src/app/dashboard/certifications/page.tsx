import { Metadata } from "next"
import { Shell } from "@/components/shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Award, Pencil, Trash2, Shield, Calendar, Building, BadgeCheck, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProfile } from "@/app/actions/user"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getExpertProfile } from "@/app/actions/expert"
import { Certification } from "@/types/expert"
import { VerificationRequestButton } from "./_components/verification-request-button"
import { DeleteCertificationButton } from "./_components/delete-certification-button"
import { EditCertificationButton } from "./_components/edit-certification-button"

export const metadata: Metadata = {
  title: "Certifications | Expert Dashboard",
  description: "Manage your professional certifications and credentials"
}

export default async function CertificationsPage() {
  const userData = await getProfile();
  const user = userData.data;
  
  // Redirect to dashboard if not an expert
  if (user.role.name !== 'expert') {
    redirect('/dashboard');
  }

  // Fetch expert profile data
  const expertProfileResponse = await getExpertProfile();
  const expertProfile = expertProfileResponse.data;
  const certifications = expertProfile.certifications || [];

  // Count active and expired certifications
  const now = new Date();
  const activeCertifications = certifications.filter((cert: Certification) => new Date(cert.expiry_date) > now);
  const expiredCertifications = certifications.filter((cert: Certification) => new Date(cert.expiry_date) <= now);

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Professional Certifications</h1>
            <p className="text-sm text-muted-foreground">
              Manage your credentials and professional certifications
            </p>
          </div>
          <Button className="flex items-center gap-2" asChild>
            <Link href="/dashboard/certifications/upload">
              <Plus className="h-4 w-4" />
              Add Certification
            </Link>
          </Button>
        </div>
        
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50/50">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-800">Verification Status</CardTitle>
            </div>
            <CardDescription>
              Verified credentials help build trust with clients and improve your profile visibility
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <BadgeCheck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{certifications.length} Total Certifications</p>
                  <p className="text-sm text-muted-foreground">
                    {activeCertifications.length} Active • {expiredCertifications.length} Expired
                  </p>
                </div>
              </div>
              <VerificationRequestButton />
            </div>
          </CardContent>
        </Card>
        
        {certifications.length === 0 ? (
          <Card className="border-dashed border-primary/50">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Award className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Certifications Yet</h3>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                Add your professional certifications to showcase your expertise and qualifications to potential clients.
              </p>
              <Button className="flex items-center gap-2" asChild>
                <Link href="/dashboard/certifications/upload">
                  <Plus className="h-4 w-4" />
                  Add Your First Certification
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {certifications.map((cert: Certification) => {
              const expiryDate = new Date(cert.expiry_date);
              const isActive = expiryDate > now;
              const formattedIssueYear = cert.year;
              const formattedExpiryDate = expiryDate.toLocaleDateString();
              const certificateId = `CERT-${cert.id}-${cert.year}`;
              
              // Map verification status to appropriate badge properties
              const verificationBadge = {
                approved: { variant: 'success', label: 'Verified', icon: <CheckCircle className="h-3.5 w-3.5 mr-1" /> },
                pending: { variant: 'warning', label: 'Pending Verification', icon: <Clock className="h-3.5 w-3.5 mr-1" /> },
                rejected: { variant: 'destructive', label: 'Verification Failed', icon: <AlertCircle className="h-3.5 w-3.5 mr-1" /> }
              }[cert.verification_status || 'pending'];
              
              return (
                <Card key={cert.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-green-100' : 'bg-amber-100'
                        }`}>
                          <Award className={`h-6 w-6 ${
                            isActive ? 'text-green-600' : 'text-amber-600'
                          }`} />
                        </div>
                      </div>
                      
                      <div className="flex-grow space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium">{cert.name}</h3>
                          <Badge variant={isActive ? 'default' : 'secondary'}>
                            {isActive ? 'Active' : 'Expired'}
                          </Badge>
                          <Badge variant={verificationBadge.variant as any} className="flex items-center">
                            {verificationBadge.icon}
                            {verificationBadge.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building className="h-3.5 w-3.5" />
                          <span>{cert.issuer}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Issued: {formattedIssueYear}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Expires: {formattedExpiryDate}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Shield className="h-3.5 w-3.5" />
                            <span>ID: {certificateId}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 md:self-start">
                        <EditCertificationButton certification={cert} />
                        <DeleteCertificationButton 
                          certificationId={cert.id} 
                          certificationName={cert.name}
                        />
                      </div>
                    </div>
                    
                    {!isActive && (
                      <div className="bg-amber-50 px-6 py-3 text-sm text-amber-700 border-t border-amber-200">
                        This certification has expired. Please renew it to maintain your credentials.
                      </div>
                    )}
                    
                    {cert.verification_status === 'rejected' && (
                      <div className="bg-red-50 px-6 py-3 text-sm text-red-700 border-t border-red-200">
                        Verification failed. Please check the certificate details and resubmit.
                      </div>
                    )}
                    
                    {cert.verification_status === 'pending' && (
                      <div className="bg-yellow-50 px-6 py-3 text-sm text-yellow-700 border-t border-yellow-200">
                        Verification in progress. This typically takes 2-3 business days.
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Certification FAQ</CardTitle>
            <CardDescription>
              Common questions about certifications and verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">How are certifications verified?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Our team reviews certification details with the issuing organizations to confirm their validity.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium">Why should I add my certifications?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Verified certifications enhance your credibility and help clients find specialists with specific qualifications.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium">How long does verification take?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Verification typically takes 2-3 business days after submission of all required documentation.
              </p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 flex justify-between">
            <p className="text-sm text-muted-foreground">Need help with certifications?</p>
            <Button variant="link" className="p-0 h-auto">Contact Support</Button>
          </CardFooter>
        </Card>
      </div>
    </Shell>
  )
} 