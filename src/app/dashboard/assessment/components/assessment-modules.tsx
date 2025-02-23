"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  ChevronRight, 
  Clock,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ModuleType = "chat" | "quiz" | "analysis";
type ModuleStatus = "completed" | "in_progress" | "locked";

interface Module {
  id: number;
  title: string;
  description: string;
  status: ModuleStatus;
  type: ModuleType;
  duration: string;
  progress?: number;
}

const modules: Module[] = [
  {
    id: 1,
    title: "Giá Trị Cốt Lõi",
    description: "Đánh giá sự tương đồng về giá trị sống và mục tiêu cuộc sống",
    status: "completed",
    type: "chat",
    duration: "15 min",
    progress: 100,
  },
  {
    id: 2,
    title: "Kỹ Năng Giao Tiếp",
    description: "Phân tích cách thức giao tiếp và giải quyết vấn đề trong mối quan hệ",
    status: "completed",
    type: "analysis",
    duration: "12 min",
    progress: 100,
  },
  {
    id: 3,
    title: "Tài Chính & Trách Nhiệm",
    description: "Đánh giá quan điểm về tài chính và phân chia trách nhiệm",
    status: "in_progress",
    type: "quiz",
    duration: "20 min",
    progress: 60,
  },
  {
    id: 4,
    title: "Kế Hoạch Tương Lai",
    description: "Khám phá kế hoạch và mong đợi về cuộc sống hôn nhân",
    status: "locked",
    type: "analysis",
    duration: "15 min",
  },
];

const moduleTypeConfig = {
  chat: {
    icon: MessageSquare,
    iconClass: "text-violet-500",
  },
  quiz: {
    icon: Brain,
    iconClass: "text-blue-500",
  },
  analysis: {
    icon: Brain,
    iconClass: "text-amber-500",
  },
};

export const AssessmentModules = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">AI Assessment</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Complete all modules to get your personalized insights
        </p>
      </div>

      <div className="grid gap-4">
        {modules.map((module, index) => {
          const type = moduleTypeConfig[module.type];
          const isLocked = module.status === "locked";
          const isInProgress = module.status === "in_progress";
          const isCompleted = module.status === "completed";
          
          return (
            <Card 
              key={module.id} 
              className={cn(
                "transition-all duration-200 group overflow-hidden",
                isLocked ? "opacity-50" : "hover:border-primary/20"
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Left Content */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-center gap-3">
                      <type.icon className={cn("w-5 h-5", type.iconClass)} />
                      <h3 className="font-medium truncate">{module.title}</h3>
                      {isInProgress && (
                        <Badge variant="secondary" className="h-6">In Progress</Badge>
                      )}
                      {isCompleted && (
                        <Badge variant="default" className="h-6">Completed</Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {module.description}
                    </p>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                      {module.progress && (
                        <div className="flex items-center gap-2 flex-1">
                          <div>•</div>
                          <Progress 
                            value={module.progress} 
                            className="h-2 flex-1 max-w-[100px]"
                          />
                          <span>{module.progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    variant={isInProgress ? "default" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    disabled={isLocked}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}; 