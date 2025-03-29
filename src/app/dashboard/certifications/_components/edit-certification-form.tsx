"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateCertification, UpdateCertificationData } from "@/app/actions/certifications";
import { Certification } from "@/types/expert";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Certification name must be at least 2 characters.",
  }),
  issuer: z.string().min(2, {
    message: "Issuer name must be at least 2 characters.",
  }),
  year: z.string().regex(/^\d{4}$/, {
    message: "Year must be a 4-digit number.",
  }),
  expiry_date: z.date({
    required_error: "Expiration date is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditCertificationFormProps {
  certification: Certification;
  onSuccess: () => void;
  onCancel: () => void;
}

export function EditCertificationForm({
  certification,
  onSuccess,
  onCancel,
}: EditCertificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: certification.name,
      issuer: certification.issuer,
      year: certification.year,
      expiry_date: new Date(certification.expiry_date),
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // Convert date to ISO string format for API
      const updateData: UpdateCertificationData = {
        ...values,
        expiry_date: values.expiry_date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      };

      const result = await updateCertification(certification.id, updateData);

      if (result.success) {
        toast.success("Certification updated", {
          description: "Your certification has been successfully updated.",
        });
        onSuccess();
      } else {
        toast.error("Update failed", {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certification Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Advanced Life Coach Certification" {...field} />
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
                <Input placeholder="e.g. International Coaching Federation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year Issued</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 2023" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiry_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiration Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className="w-full pl-3 text-left font-normal"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                The date when this certification expires.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Certification"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 