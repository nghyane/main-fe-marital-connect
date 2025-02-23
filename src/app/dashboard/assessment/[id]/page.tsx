import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, MessageSquare, Timer, HelpCircle,
  ChevronRight, ChevronLeft 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  id: number;
  text: string;
  description?: string;
  options: {
    id: string;
    text: string;
    explanation?: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Khi có vấn đề trong mối quan hệ, bạn thường làm gì?",
    description: "Cách bạn xử lý vấn đề cho thấy phong cách giao tiếp của bạn",
    options: [
      {
        id: "1",
        text: "Chủ động nói chuyện ngay để giải quyết vấn đề",
        explanation: "Phong cách trực tiếp, tích cực"
      },
      {
        id: "2",
        text: "Đợi thời điểm thích hợp rồi mới đề cập",
        explanation: "Phong cách thận trọng, chu đáo"
      },
      {
        id: "3",
        text: "Chờ đối phương nhận ra và chủ động nói chuyện",
        explanation: "Phong cách bị động, né tránh"
      },
      {
        id: "4",
        text: "Thể hiện sự không hài lòng qua thái độ và hành động",
        explanation: "Phong cách gián tiếp, tiêu cực"
      }
    ]
  },
  // Thêm các câu hỏi khác...
];

export default function AssessmentDetailPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Button>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="gap-2">
            <Timer className="w-4 h-4" />
            20:00 phút
          </Badge>
          <Button variant="outline">Lưu và thoát</Button>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-medium">Giao Tiếp & Tình Cảm</h2>
                <p className="text-sm text-muted-foreground">Câu hỏi 1/15</p>
              </div>
            </div>
            <Badge>Đang làm</Badge>
          </div>
          <Progress value={6.67} className="h-2" />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/50">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium shrink-0">
              1
            </span>
            <div>
              <CardTitle className="text-lg font-medium">
                {questions[0].text}
              </CardTitle>
              {questions[0].description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {questions[0].description}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <RadioGroup className="space-y-4">
            {questions[0].options.map((option) => (
              <div key={option.id} className="flex items-start space-x-3">
                <RadioGroupItem 
                  value={option.id} 
                  id={`option-${option.id}`}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label 
                    htmlFor={`option-${option.id}`}
                    className="text-base leading-relaxed cursor-pointer"
                  >
                    {option.text}
                  </Label>
                  {option.explanation && (
                    <p className="text-sm text-muted-foreground">
                      {option.explanation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" disabled className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Câu trước
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <HelpCircle className="w-4 h-4" />
            Trợ giúp
          </Button>
          <Button className="gap-2">
            Câu tiếp theo
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Help Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gợi ý trả lời</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            - Hãy suy nghĩ về những tình huống thực tế đã xảy ra
          </p>
          <p>
            - Chọn câu trả lời phản ánh đúng nhất cách ứng xử thường xuyên của bạn
          </p>
          <p>
            - Không có câu trả lời đúng/sai, hãy trả lời thật lòng để có kết quả chính xác
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 