import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function CancelDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Session</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this session? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {/* ... content ... */}
      </DialogContent>
    </Dialog>
  )
} 