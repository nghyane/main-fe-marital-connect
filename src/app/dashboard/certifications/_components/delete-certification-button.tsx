"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCertification } from "@/app/actions/certifications";

interface DeleteCertificationButtonProps {
  certificationId: number;
  certificationName: string;
}

export function DeleteCertificationButton({ certificationId, certificationName }: DeleteCertificationButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteCertification(certificationId);
      
      if (result.success) {
        toast.success("Certification deleted", {
          description: `"${certificationName}" has been removed from your profile.`,
          duration: 5000,
        });
      } else {
        toast.error("Failed to delete certification", {
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
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Certification</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{certificationName}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 