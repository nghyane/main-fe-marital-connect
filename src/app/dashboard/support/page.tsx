import { Shell } from "@/components/shell"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

const tickets = [
  {
    id: "T-1234",
    subject: "Session Rescheduling Request",
    status: "open",
    priority: "high",
    createdAt: new Date("2024-02-20"),
    lastUpdated: new Date("2024-02-21"),
  },
  {
    id: "T-1235", 
    subject: "Technical Issue with Video Call",
    status: "in_progress",
    priority: "medium",
    createdAt: new Date("2024-02-19"),
    lastUpdated: new Date("2024-02-20"),
  },
  // ... more tickets
]

const statusMap = {
  open: { label: "Open", class: "bg-blue-100 text-blue-800" },
  in_progress: { label: "In Progress", class: "bg-yellow-100 text-yellow-800" },
  resolved: { label: "Resolved", class: "bg-green-100 text-green-800" },
  closed: { label: "Closed", class: "bg-gray-100 text-gray-800" }
}

const priorityMap = {
  high: { label: "High", class: "text-red-600" },
  medium: { label: "Medium", class: "text-yellow-600" },
  low: { label: "Low", class: "text-blue-600" }
}

export default function SupportPage() {
  return (
    <Shell>
      <div className="container max-w-6xl py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Support</h1>
            <p className="text-sm text-muted-foreground">
              View and manage your support tickets
            </p>
          </div>
          <Button>New Ticket</Button>
        </div>

        <Card>
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead className="w-full">Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id} className="group">
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {ticket.subject}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "font-medium",
                          statusMap[ticket.status].class
                        )}
                      >
                        {statusMap[ticket.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "font-medium",
                        priorityMap[ticket.priority].class
                      )}>
                        {priorityMap[ticket.priority].label}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDistanceToNow(ticket.createdAt, { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDistanceToNow(ticket.lastUpdated, { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </Shell>
  )
} 