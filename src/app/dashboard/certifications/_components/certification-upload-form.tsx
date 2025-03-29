"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { uploadCertification } from "@/app/actions/certifications";
import { Upload, Calendar, Building, Award } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { redirect } from "next/navigation";
const currentYear = new Date().getFullYear();

const certificationFormSchema = z.object({
  name: z.string().min(2, { message: "Certification name must be at least 2 characters." }),
  issuer: z.string().min(2, { message: "Issuer name must be at least 2 characters." }),
  year: z.string().regex(/^\d{4}$/, { message: "Year must be a 4-digit number" })
    .refine(val => {
      const yearNum = parseInt(val);
      return yearNum >= 1950 && yearNum <= currentYear;
    }, { message: `Year must be between 1950 and ${currentYear}` }),
  expiry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Expiry date must be in YYYY-MM-DD format" }),
});

export function CertificationUploadForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof certificationFormSchema>>({
    resolver: zodResolver(certificationFormSchema),
    defaultValues: {
      name: "",
      issuer: "",
      year: new Date().getFullYear().toString(),
      expiry_date: "",
    },
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileError(null);
    
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate file type (PDF only)
    if (file.type !== "application/pdf") {
      setFileError("Only PDF files are accepted");
      setSelectedFile(null);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size must be less than 5MB");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  }

  function onSubmit(values: z.infer<typeof certificationFormSchema>) {
    setError(null);
    
    if (!selectedFile) {
      setFileError("Please upload a certificate file");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("issuer", values.issuer);
    formData.append("year", values.year);
    formData.append("expiry_date", values.expiry_date);
    formData.append("certificate", selectedFile);

    startTransition(async () => {
      try {
        const result = await uploadCertification(formData);
        
        // If we get here, there was an error since successful uploads redirect
        if (!result.success) {
          setError(result.message);
          toast.error("Failed to upload certification", {
            description: result.message,
          });
        } else {
          toast.success("Certification uploaded successfully", {
            description: result.message,
          });

        form.reset();
        setSelectedFile(null);
        setFileError(null);
        setError(null);

        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        toast.error("Failed to upload certification", {
          description: errorMessage,
        });
      }
    });
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification Name</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g. Professional Web Developer" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="issuer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issuing Organization</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g. Udacity" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Year</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="number" 
                            placeholder={currentYear.toString()} 
                            {...field} 
                            min="1950" 
                            max={currentYear.toString()}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="expiry_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="date" 
                            {...field} 
                            min={`${currentYear}-01-01`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormItem>
                <FormLabel>Certificate File</FormLabel>
                <FormControl>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      htmlFor="certificate"
                      className="group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-primary/50 px-6 py-10 text-center transition-colors hover:bg-primary/5"
                    >
                      <div className="flex flex-col items-center justify-center gap-1">
                        <Upload className={`h-10 w-10 ${selectedFile ? 'text-primary' : 'text-muted-foreground'}`} />
                        {selectedFile ? (
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{selectedFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Upload Certificate</p>
                            <p className="text-xs text-muted-foreground">PDF only, max 5MB</p>
                          </div>
                        )}
                      </div>
                      <input
                        id="certificate"
                        type="file"
                        accept="application/pdf"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    {fileError && (
                      <p className="text-[0.8rem] font-medium text-destructive">
                        {fileError}
                      </p>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Upload a scan or digital version of your certificate as a PDF file
                </FormDescription>
              </FormItem>

              {error && (
                <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  type="button" 
                  asChild
                >
                  <Link href="/dashboard/certifications">Cancel</Link>
                </Button>
                <Button 
                  type="submit" 
                  disabled={isPending}
                >
                  {isPending ? "Uploading..." : "Upload Certification"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 