"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditCertificationForm } from "./edit-certification-form";
import { Certification } from "@/types/expert";

interface EditCertificationButtonProps {
  certification: Certification;
}

export function EditCertificationButton({ certification }: EditCertificationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Certification</DialogTitle>
        </DialogHeader>
        <EditCertificationForm 
          certification={certification} 
          onSuccess={handleSuccess} 
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
} 