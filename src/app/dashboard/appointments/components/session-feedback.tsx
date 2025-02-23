import { memo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SessionFeedbackProps {
  sessionId: string
}

export const SessionFeedback = memo(function SessionFeedback({ sessionId }: SessionFeedbackProps) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) return

    try {
      setIsSubmitting(true)
      // TODO: Submit feedback API call
      toast.success("Thank you for your feedback!")
    } catch (error) {
      toast.error("Failed to submit feedback")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Rate your session</h3>
          <p className="text-sm text-muted-foreground mb-4">
            How would you rate your experience with this mentor?
          </p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="group p-1 focus-visible:outline-none"
                onClick={() => setRating(star)}
              >
                <StarIcon 
                  className={cn(
                    "w-8 h-8 transition-colors",
                    star <= rating 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-muted-foreground/25 group-hover:text-yellow-400/50"
                  )}
                />
                <span className="sr-only">Rate {star} stars</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="feedback" className="text-sm font-medium">
            Share your experience
          </label>
          <Textarea
            id="feedback"
            placeholder="What did you like about the session? What could be improved?"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            type="submit"
            disabled={!rating || isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Card>
  )
}) 