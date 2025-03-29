import { Metadata } from "next"
import { Shell } from "@/components/shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Award, Pencil, Trash2, Shield, Calendar, Building, BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProfile } from "@/app/actions/user"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Certifications | Expert Dashboard",
  description: "Manage your professional certifications and credentials"
}

// Sample certifications data
// In a real app, this would come from an API
const certifications = [
  {
    id: 1,
    name: "Certified Marriage Counselor",
    issuer: "American Association of Marriage and Family Therapy",
    issueDate: "2021-06-15",
    expiryDate: "2024-06-15",
    credentialId: "CMC-2021-78945",
    status: "active",
  },
  {
    id: 2,
    name: "Family Therapy Specialist",
    issuer: "International Association of Family Therapists",
    issueDate: "2020-03-10",
    expiryDate: "2023-03-10",
    credentialId: "FTS-2020-12345",
    status: "expired",
  },
  {
    id: 3,
    name: "Relationship Conflict Resolution Expert",
    issuer: "National Board of Relationship Counselors",
    issueDate: "2022-09-01",
    expiryDate: "2025-09-01",
    credentialId: "RCRE-2022-54321",
    status: "active",
  }
];

export default async function CertificationsPage() {
  const userData = await getProfile();
  const user = userData.data;
  
  // Redirect to dashboard if not an expert
  if (user.role.name !== 'expert') {
    redirect('/dashboard');
  }

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
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Certification
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
                  <p className="font-medium">3 Total Certifications</p>
                  <p className="text-sm text-muted-foreground">2 Active • 1 Expired</p>
                </div>
              </div>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Request Verification
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-4">
          {certifications.map(cert => (
            <Card key={cert.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      cert.status === 'active' ? 'bg-green-100' : 'bg-amber-100'
                    }`}>
                      <Award className={`h-6 w-6 ${
                        cert.status === 'active' ? 'text-green-600' : 'text-amber-600'
                      }`} />
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{cert.name}</h3>
                      <Badge variant={cert.status === 'active' ? 'default' : 'secondary'}>
                        {cert.status === 'active' ? 'Active' : 'Expired'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building className="h-3.5 w-3.5" />
                      <span>{cert.issuer}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5" />
                        <span>ID: {cert.credentialId}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 md:self-start">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {cert.status === 'expired' && (
                  <div className="bg-amber-50 px-6 py-3 text-sm text-amber-700 border-t border-amber-200">
                    This certification has expired. Please renew it to maintain your credentials.
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
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