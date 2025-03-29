"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { saveExpertProfile, ExpertProfileFormData } from "@/app/actions/user"
import { ExpertProfile } from "@/types/expert"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const expertProfileFormSchema = z.object({
  title: z.string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  about: z.string()
    .min(10, "About description must be at least 10 characters")
    .max(1000, "About description must not exceed 1000 characters"),
  location: z.string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must not exceed 100 characters"),
  experience: z.coerce.number()
    .min(0, "Experience must be a positive number")
    .max(100, "Experience must not exceed 100 years"),
  google_meet_link: z.string().url("Please enter a valid URL"),
  specialties: z.array(z.string()),
  availability_status: z.enum(["online", "offline", "away"]),
})

type ExpertProfileFormValues = z.infer<typeof expertProfileFormSchema>

export function ExpertProfileForm({ expertProfile }: { expertProfile: ExpertProfile }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newSpecialty, setNewSpecialty] = useState("")
  const router = useRouter()
  
  const form = useForm<ExpertProfileFormValues>({
    resolver: zodResolver(expertProfileFormSchema),
    defaultValues: {
      title: expertProfile.title || "",
      about: expertProfile.about || "",
      location: expertProfile.location || "",
      experience: expertProfile.experience || 0,
      google_meet_link: expertProfile.google_meet_link || "",
      specialties: expertProfile.specialties || [],
      availability_status: (expertProfile.availability_status as "online" | "offline" | "away") || "offline",
    },
  })

  async function onSubmit(data: ExpertProfileFormValues) {
    try {
      setIsSubmitting(true)
      const result = await saveExpertProfile(data as ExpertProfileFormData)
      
      if (result.success) {
        toast.success(result.message)
        router.refresh()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function addSpecialty() {
    if (newSpecialty.trim() !== "") {
      const currentSpecialties = form.getValues().specialties || []
      if (!currentSpecialties.includes(newSpecialty.trim())) {
        form.setValue("specialties", [...currentSpecialties, newSpecialty.trim()])
        setNewSpecialty("")
      }
    }
  }

  function removeSpecialty(specialty: string) {
    const currentSpecialties = form.getValues().specialties || []
    form.setValue(
      "specialties",
      currentSpecialties.filter((s) => s !== specialty)
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Expert Profile Information</h3>
            <p className="text-sm text-muted-foreground">
              Update your professional profile that clients will see
            </p>
          </div>
          <Separator />
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Marriage Counselor" {...field} />
                </FormControl>
                <FormDescription>
                  Your professional title or role
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell clients about your expertise, experience, and approach..."
                    className="min-h-[150px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A detailed description of your professional background and expertise
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. New York, NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="google_meet_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Meet Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://meet.google.com/xxx-xxxx-xxx" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your personal Google Meet link for sessions
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availability_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your availability status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="away">Away</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="specialties"
            render={() => (
              <FormItem>
                <FormLabel>Specialties</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.watch("specialties")?.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="px-2 py-1">
                      {specialty}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => removeSpecialty(specialty)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="Add a specialty"
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSpecialty();
                      }
                    }}
                  />
                  <Button type="button" onClick={addSpecialty} size="sm">
                    Add
                  </Button>
                </div>
                <FormDescription>
                  Your areas of expertise and specialization
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 