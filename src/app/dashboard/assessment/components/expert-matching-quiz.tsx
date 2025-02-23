"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    expertPreference?: {
      experience?: number;
      specialties?: string[];
      approach?: string;
    };
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Bạn mong muốn tư vấn viên có bao nhiêu năm kinh nghiệm?",
    options: [
      {
        id: "1",
        text: "1-3 năm - Tôi cần người có góc nhìn trẻ trung, hiện đại",
        expertPreference: { experience: 2 }
      },
      {
        id: "2",
        text: "3-5 năm - Tôi cần sự cân bằng giữa kinh nghiệm và sự năng động",
        expertPreference: { experience: 4 }
      },
      {
        id: "3",
        text: "Trên 5 năm - Tôi cần người có nhiều kinh nghiệm tư vấn",
        expertPreference: { experience: 6 }
      }
    ]
  },
  {
    id: 2,
    text: "Bạn quan tâm nhất đến lĩnh vực nào trong hôn nhân?",
    options: [
      {
        id: "1",
        text: "Giao tiếp và giải quyết mâu thuẫn",
        expertPreference: { specialties: ["communication", "conflict-resolution"] }
      },
      {
        id: "2",
        text: "Tài chính và kế hoạch tương lai",
        expertPreference: { specialties: ["financial-planning", "future-planning"] }
      },
      {
        id: "3",
        text: "Giá trị sống và sự tương thích",
        expertPreference: { specialties: ["values-alignment", "compatibility"] }
      }
    ]
  },
  {
    id: 3,
    text: "Bạn thích phong cách tư vấn như thế nào?",
    options: [
      {
        id: "1",
        text: "Trực tiếp, đưa ra lời khuyên cụ thể",
        expertPreference: { approach: "directive" }
      },
      {
        id: "2",
        text: "Lắng nghe, gợi mở để tự tìm ra giải pháp",
        expertPreference: { approach: "facilitative" }
      },
      {
        id: "3",
        text: "Kết hợp cả hai, linh hoạt theo tình huống",
        expertPreference: { approach: "balanced" }
      }
    ]
  }
];

export const ExpertMatchingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const progress = (currentQuestion / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleNext = () => {
    if (selectedOption) {
      setAnswers(prev => ({
        ...prev,
        [question.id]: selectedOption
      }));
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        // TODO: Calculate expert matching based on answers
        console.log("Quiz completed", answers);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Tìm Chuyên Gia Phù Hợp
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Trả lời một số câu hỏi để chúng tôi gợi ý chuyên gia phù hợp nhất với bạn
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tiến độ</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Question */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-lg font-medium">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">
                  {currentQuestion + 1}
                </span>
                {question.text}
              </div>
            </div>

            {/* Options */}
            <RadioGroup
              value={selectedOption || ""}
              onValueChange={setSelectedOption}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div key={option.id} className="flex items-start space-x-3">
                  <RadioGroupItem 
                    value={option.id} 
                    id={`option-${option.id}`}
                    className="mt-1"
                  />
                  <Label 
                    htmlFor={`option-${option.id}`}
                    className="leading-relaxed cursor-pointer"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selectedOption}
          className="gap-2"
        >
          {currentQuestion === questions.length - 1 ? "Hoàn thành" : "Tiếp tục"}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Time Estimate */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>Còn {questions.length - currentQuestion} câu hỏi</span>
      </div>
    </div>
  );
}; 