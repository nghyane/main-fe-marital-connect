"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  text?: string;
  minHeight?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  default: "h-6 w-6",
  lg: "h-8 w-8"
};

export const Loading = ({ 
  className, 
  size = "default", 
  text,
  minHeight = "min-h-[60px]" 
}: LoadingProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-2 py-4",
      minHeight,
      className
    )}>
      <Loader2 
        className={cn(
          "animate-spin text-primary/70",
          sizeClasses[size]
        )} 
      />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}; 