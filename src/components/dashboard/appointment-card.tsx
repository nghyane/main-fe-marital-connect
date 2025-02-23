import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";

interface AppointmentCardProps {
  expert: string;
  date: string;
  time: string;
  type: string;
}

export const AppointmentCard = ({ expert, date, time, type }: AppointmentCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="space-y-1">
        <h4 className="font-medium">{expert}</h4>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {time}
          </div>
          <div className="flex items-center gap-1">
            <Video className="w-4 h-4" />
            {type}
          </div>
        </div>
      </div>
      <Button size="sm">Join Call</Button>
    </div>
  );
}; 