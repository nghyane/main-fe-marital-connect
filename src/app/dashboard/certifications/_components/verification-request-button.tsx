"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { requestCertificationVerification } from "@/app/actions/certifications";
import { redirect } from "next/navigation";
export function VerificationRequestButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleVerificationRequest = async () => {
    setIsLoading(true);
    try {
      const result = await requestCertificationVerification();
      
      if (result.success) {
        toast.success("Verification request submitted successfully", {
          description: "We'll review your certifications and update their status soon.",
          duration: 5000,
        });
      } else {
        toast.error("Failed to submit verification request", {
          description: result.message,
          duration: 5000,
        });

      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please try again later",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="border-blue-200 text-blue-600 hover:bg-blue-50"
      onClick={handleVerificationRequest}
      disabled={isLoading}
    >
      {isLoading ? "Submitting..." : "Request Verification"}
    </Button>
  );
} 