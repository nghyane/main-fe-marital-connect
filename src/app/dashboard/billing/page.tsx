import { Metadata } from "next"
import Link from "next/link"
import { Shell } from "@/components/shell"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Receipt, AlertCircle, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your billing and payment methods"
}

export default function BillingPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
          <p className="text-sm text-muted-foreground">
            Manage your billing and view transaction history
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Payment Methods</h3>
                  <p className="text-sm text-muted-foreground">
                    Your saved payment methods
                  </p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Receipt className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-muted-foreground">****6789</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Remove</Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Add Payment Method
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Receipt className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Transaction History</h3>
                  <p className="text-sm text-muted-foreground">
                    Your recent transactions
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between py-4 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <p className={transaction.type === 'credit' ? 'text-green-600' : ''}>
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Alert variant="warning" className="bg-yellow-50/50 border-yellow-200">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <AlertDescription className="text-sm text-yellow-800">
                  For any billing inquiries, please{' '}
                  <Link 
                    href="/support" 
                    className="font-medium text-yellow-800 underline underline-offset-4 hover:text-yellow-900"
                  >
                    contact our support team
                  </Link>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </div>
      </div>
    </Shell>
  )
}

const transactions = [
  {
    id: '1',
    description: 'Career Coaching Session',
    date: 'Mar 15, 2024',
    amount: '100.00',
    type: 'debit'
  },
  {
    id: '2',
    description: 'Session Refund',
    date: 'Mar 10, 2024',
    amount: '50.00',
    type: 'credit'
  },
  {
    id: '3',
    description: 'Initial Consultation',
    date: 'Mar 5, 2024',
    amount: '75.00',
    type: 'debit'
  },
] 