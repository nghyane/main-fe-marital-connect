"use client";

import { Progress } from "@/components/ui/progress";
import { Brain, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentProgressProps {
  completedModules: number;
  totalModules: number;
  timeLeft: number;
}

export const AssessmentProgress = ({
  completedModules,
  totalModules,
  timeLeft,
}: AssessmentProgressProps) => {
  const progressPercentage = Math.round((completedModules / totalModules) * 100);

  const stats = [
    {
      icon: Target,
      iconClass: "text-primary",
      label: "Tiến Độ",
      value: `${progressPercentage}%`,
    },
    {
      icon: Brain,
      iconClass: "text-violet-500",
      label: "Độ Phù Hợp",
      value: "85%",
    },
    {
      icon: Clock,
      iconClass: "text-green-500",
      label: "Thời Gian",
      value: `${timeLeft}p`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-3">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm font-medium">{progressPercentage}%</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2 transition-all duration-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
          >
            <stat.icon className={cn("w-5 h-5", stat.iconClass)} />
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="font-medium">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 