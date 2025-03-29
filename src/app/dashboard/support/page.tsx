import { Metadata } from "next"
import { Shell } from "@/components/shell"
import { 
  LifeBuoy, 
  Mail, 
  MessageSquare, 
  PanelRight, 
  Phone, 
  PlusCircle, 
  UserPlus,
  ChevronDown,
  CheckCircle2,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SupportForm } from "./components/support-form"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with your account and services"
}

export default async function SupportPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Support Center</h1>
          <p className="text-sm text-muted-foreground">
            Get help with your account and services
          </p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>Our team will respond to your inquiry within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <SupportForm />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Reach out through other channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-sm text-muted-foreground">support@maritalconnect.com</p>
                    <p className="text-xs text-muted-foreground mt-1">For general inquiries and support</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Phone Support</h3>
                    <p className="text-sm text-muted-foreground">+1 (800) 123-4567</p>
                    <p className="text-xs text-muted-foreground mt-1">Available Monday-Friday, 9AM-5PM PT</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MessageSquare className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-sm text-muted-foreground">Available on our website</p>
                    <p className="text-xs text-muted-foreground mt-1">For immediate assistance during business hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I schedule a session?</AccordionTrigger>
                    <AccordionContent>
                      To schedule a session, navigate to the expert's profile page and click on the "Schedule" button. 
                      Select your preferred date and time, choose a service, and complete the booking process.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do payments work?</AccordionTrigger>
                    <AccordionContent>
                      Payments are processed securely through our platform. We accept credit cards and PayPal. 
                      You'll be charged when you book a session, and experts receive payment after the session is completed.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I reschedule or cancel a session?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can reschedule or cancel a session up to 24 hours before the scheduled time without any penalty. 
                      To do this, go to your Appointments page and select the session you want to change.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I become an expert on the platform?</AccordionTrigger>
                    <AccordionContent>
                      To become an expert, you need to apply through our website. Click on the "Become an Expert" link 
                      on the homepage, fill out the application form, and submit your credentials for review. Our team will 
                      evaluate your application and respond within 7 business days.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is my information secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we take privacy and security seriously. All personal information and session details are encrypted 
                      and stored securely. We never share your information with third parties without your consent.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Help Resources</CardTitle>
                <CardDescription>Explore our documentation and guides</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <Button variant="outline" className="justify-start gap-2" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <PanelRight className="h-4 w-4" />
                      User Guide
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start gap-2" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <UserPlus className="h-4 w-4" />
                      Expert Onboarding
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start gap-2" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <PlusCircle className="h-4 w-4" />
                      Billing & Payments FAQ
                    </a>
                  </Button>
                </div>
                
                <div className="rounded-lg border p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <LifeBuoy className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Support Status</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <p className="text-sm">All systems operational</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Current response time: <Badge variant="outline" className="ml-1">~3 hours</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  )
} 