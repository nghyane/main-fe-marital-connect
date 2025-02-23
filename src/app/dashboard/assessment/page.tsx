import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AssessmentProgress } from "./components/assessment-progress";
import { 
  AlertCircle, Download, Share2, MessageSquare, 
  HeartHandshake, Baby, Home, Coins, Users, Scale,
  ChevronRight
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const assessmentAreas = [
  {
    id: 'communication',
    icon: MessageSquare,
    title: 'Communication & Emotions',
    description: 'Evaluate communication patterns, emotional expression and listening skills',
    topics: [
      'Communication Styles',
      'Emotional Expression',
      'Active Listening',
      'Empathy Skills'
    ],
    questions: 15,
    duration: '20 min',
    progress: 0,
    status: 'not_started' as 'not_started' | 'in_progress' | 'completed'
  },
  {
    id: 'conflict',
    icon: Scale,
    title: 'Conflict Resolution',
    description: 'Analyze how you handle disagreements and solve problems together',
    topics: [
      'Conflict Management',
      'Emotional Control',
      'Compromise Skills',
      'Problem Solving'
    ],
    questions: 12,
    duration: '15 min',
    progress: 0,
    status: 'not_started'
  },
  {
    id: 'family',
    icon: Home,
    title: 'Family Values',
    description: 'Explore differences and harmony in family values and traditions',
    topics: [
      'Family Values',
      'Extended Family',
      'Cultural Traditions',
      'Important Rituals'
    ],
    questions: 10,
    duration: '15 min',
    progress: 0,
    status: 'not_started'
  },
  {
    id: 'parenting',
    icon: Baby,
    title: 'Parenting & Children',
    description: 'Assess views and plans on raising children and family planning',
    topics: [
      'Parenting Styles',
      'Parental Roles',
      'Family Planning',
      'Core Values'
    ],
    questions: 12,
    duration: '15 min',
    progress: 0,
    status: 'not_started'
  },
  {
    id: 'finance',
    icon: Coins,
    title: 'Financial Management',
    description: 'Explore views on financial management and future planning',
    topics: [
      'Money Management',
      'Savings & Investment',
      'Financial Goals',
      'Shared Responsibilities'
    ],
    questions: 10,
    duration: '15 min',
    progress: 0,
    status: 'not_started'
  },
  {
    id: 'values',
    icon: HeartHandshake,
    title: 'Values & Life Goals',
    description: 'Identify alignment in values and shared life goals',
    topics: [
      'Life Direction',
      'Career & Work',
      'Religious Beliefs',
      'Shared Goals'
    ],
    questions: 12,
    duration: '15 min',
    progress: 0,
    status: 'not_started'
  },
];

export default function AssessmentPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      {/* Header Section with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 shadow-sm">
        <div className="relative z-10">
          <h1 className="text-3xl font-semibold mb-2">Pre-Marriage Assessment</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore and evaluate key aspects of your relationship for a stronger foundation
          </p>
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Progress Overview with Animation */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium mb-1">Your Progress</h2>
              <p className="text-sm text-muted-foreground">Completed 2/6 assessments</p>
            </div>
            <Badge variant="secondary" className="h-6">
              33% Complete
            </Badge>
          </div>
          <AssessmentProgress 
            completedModules={2} 
            totalModules={6} 
            timeLeft={75} 
          />
        </CardContent>
      </Card>

      {/* Assessment Areas Grid with Hover Effects */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assessmentAreas.map((area) => (
          <Card 
            key={area.id}
            className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/20"
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header with Icon */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <area.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{area.title}</h3>
                    {area.status === 'completed' && (
                      <Badge variant="default" className="mt-1">Completed</Badge>
                    )}
                    {area.status === 'in_progress' && (
                      <Badge variant="secondary" className="mt-1">In Progress</Badge>
                    )}
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {area.description}
                </p>

                {/* Topics Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {area.topics.map((topic, index) => (
                    <div 
                      key={index}
                      className="text-xs text-muted-foreground flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md"
                    >
                      <div className="w-1 h-1 rounded-full bg-primary/60" />
                      <span className="truncate">{topic}</span>
                    </div>
                  ))}
                </div>

                {/* Progress or Stats */}
                <div className="space-y-2">
                  {area.progress > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span>{area.progress}%</span>
                      </div>
                      <Progress value={area.progress} className="h-1" />
                    </>
                  )}
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                    <span>{area.questions} questions</span>
                    <span>{area.duration}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  variant={area.status === 'not_started' ? 'outline' : 'default'}
                >
                  {area.status === 'completed' ? 'View Results' : 
                   area.status === 'in_progress' ? 'Continue' : 
                   'Start Assessment'}
                  <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Alert */}
      <Alert className="flex items-center bg-primary/5 border-primary/10">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription className="ml-2 text-primary/90">
          Complete the assessments to receive detailed analysis and personalized recommendations.
        </AlertDescription>
      </Alert>

      {/* Results Preview */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/50">
          <CardTitle>Preliminary Results</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Complete at least 3 assessments to receive detailed analysis of your relationship
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 