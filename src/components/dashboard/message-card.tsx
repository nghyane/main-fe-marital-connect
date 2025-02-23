import { MessageSquare } from "lucide-react";

interface MessageCardProps {
  name: string;
  message: string;
  time: string;
}

export const MessageCard = ({ name, message, time }: MessageCardProps) => {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <MessageSquare className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{name}</h4>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
      </div>
    </div>
  );
}; 