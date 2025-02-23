"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, Link as LinkIcon } from "lucide-react";

interface MeetingLinkProps {
  link: string;
}

export const MeetingLink = ({ link }: MeetingLinkProps) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-accent/30 rounded-md">
      <LinkIcon className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="text-sm text-muted-foreground truncate flex-1">
        {link}
      </span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={copyLink}
      >
        {copied ? (
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}; 