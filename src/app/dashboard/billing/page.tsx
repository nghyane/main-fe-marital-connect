import { Metadata } from "next"
import Link from "next/link"
import { Shell } from "@/components/shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Receipt, AlertCircle, Clock, DownloadIcon, Calendar, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import { getPaymentHistory, TransactionDataForUI } from "./actions"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Transaction History",
  description: "View your transaction history and invoices"
}

export default function TransactionHistoryPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Transaction History</h1>
            <p className="text-sm text-muted-foreground">
              View and manage your payment history
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <DownloadIcon className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Suspense fallback={<TransactionsTableSkeleton />}>
              <TransactionsTable />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="sessions" className="mt-4">
            <Suspense fallback={<TransactionsTableSkeleton />}>
              <TransactionsTable category="session" />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="refunds" className="mt-4">
            <Suspense fallback={<TransactionsTableSkeleton />}>
              <TransactionsTable type="credit" />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="subscriptions" className="mt-4">
            <Suspense fallback={<TransactionsTableSkeleton />}>
              <TransactionsTable category="subscription" />
            </Suspense>
          </TabsContent>
        </Tabs>

        <Alert className="bg-muted/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Need help with a transaction? <Link href="/dashboard/support" className="font-medium underline underline-offset-4">Contact support</Link>
          </AlertDescription>
        </Alert>
      </div>
    </Shell>
  )
}

async function TransactionsTable({ 
  type, 
  category 
}: { 
  type?: 'debit' | 'credit',
  category?: string 
}) {
  const transactions = await getPaymentHistory();
  
  // Filter transactions based on type and category if provided
  const filteredTransactions = transactions.filter(transaction => {
    if (type && transaction.type !== type) return false;
    if (category && transaction.category !== category) return false;
    return true;
  });

  return (
    <Card>
      <CardHeader className="px-6 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {type === 'credit' ? 'Refunds' : 
             category === 'session' ? 'Session Payments' :
             category === 'subscription' ? 'Subscription Payments' :
             'Recent Transactions'}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Total: {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </p>
        </div>
      </CardHeader>
      
      {filteredTransactions.length > 0 ? (
        <>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredTransactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4 mb-3 md:mb-0">
                    <div className={cn(
                      "rounded-full p-2 flex-shrink-0",
                      transaction.type === 'credit' ? "bg-green-100" : "bg-primary/10"
                    )}>
                      {transaction.type === 'credit' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      {transaction.expertName && (
                        <p className="text-sm text-muted-foreground">
                          Expert: {transaction.expertName}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{transaction.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Receipt className="h-3.5 w-3.5" />
                          <span>{transaction.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className={cn(
                      "font-medium",
                      transaction.type === 'credit' ? "text-green-600" : ""
                    )}>
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={transaction.type === 'credit' ? "default" : "outline"} className={cn(
                        "text-xs",
                        transaction.type === 'credit' ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                      )}>
                        {transaction.type === 'credit' ? 'Refund' : 'Payment'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {transaction.status === 'paid' ? 'Completed' : 
                         transaction.status === 'pending' ? 'Pending' : 
                         'Refunded'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between bg-muted/40 px-6 py-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTransactions.length} of {filteredTransactions.length} transactions
            </p>
            <Button variant="ghost" size="sm" className="gap-1">
              <span>View Older</span>
              <Clock className="h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </>
      ) : (
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Receipt className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">No Transactions Found</h3>
            <p className="text-sm text-muted-foreground">
              {type === 'credit' ? 'You have no refund transactions yet.' : 
               category === 'session' ? 'You have no session payment transactions yet.' :
               category === 'subscription' ? 'You have no subscription payments yet.' :
               'You have no transaction history yet.'}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function TransactionsTableSkeleton() {
  return (
    <Card>
      <CardHeader className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="p-6">
              <div className="flex items-start gap-4 mb-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/40 px-6 py-4">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-8 w-28" />
      </CardFooter>
    </Card>
  );
} 