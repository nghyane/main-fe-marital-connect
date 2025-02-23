"use client";

import { Button } from "@/components/ui/button";
import { Copy, Video, ExternalLink } from "lucide-react";
import { useState } from "react";

interface SessionActionsProps {
  meetLink: string;
}

export const SessionActions = ({ meetLink }: SessionActionsProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleCopyLink}>
        <Copy className="w-4 h-4 mr-2" />
        {copied ? "Copied!" : "Copy Link"}
      </Button>
      <Button size="sm" asChild>
        <a 
          href={meetLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Video className="w-4 h-4 mr-2" />
          Join Meet
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </Button>
    </div>
  );
}; 