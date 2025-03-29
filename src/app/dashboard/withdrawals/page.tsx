import { Metadata } from "next"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  AlertCircle, 
  Calendar, 
  CreditCard, 
  ArrowRightLeft, 
  Download, 
  Upload, 
  Wallet,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getExpertBalance, getWithdrawalHistory, requestWithdrawal } from "./actions"
import { WithdrawalDataForUI } from "./actions"
import { Suspense } from "react"
import { getProfile } from "@/app/actions/user"
import { redirect } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { revalidatePath } from "next/cache"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Revenue Withdrawals",
  description: "Manage your revenue and withdrawals"
}

export default async function WithdrawalsPage() {
  const user = (await getProfile()).data;
  
  // Only experts can access this page
  if (user.role.name !== 'expert') {
    redirect('/dashboard');
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Revenue Withdrawals</h1>
        <p className="text-sm text-muted-foreground">
          View your earnings and request withdrawals
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="withdraw">Request Withdrawal</TabsTrigger>
          <TabsTrigger value="history">Withdrawal History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<BalanceSkeleton />}>
            <BalanceOverview />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="withdraw" className="space-y-4">
          <WithdrawalForm />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Suspense fallback={<HistorySkeleton />}>
            <WithdrawalHistory />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

async function BalanceOverview() {
  const balance = await getExpertBalance();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Balance
          </CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(balance.balance / 100).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Your lifetime earnings
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Withdrawals
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(balance.pendingWithdrawals / 100).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Amount currently being processed
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Available for Withdrawal
          </CardTitle>
          <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(balance.available / 100).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Amount you can withdraw now
          </p>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>How Withdrawals Work</CardTitle>
          <CardDescription>Understanding the withdrawal process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-medium">1. Request Funds</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Fill out the withdrawal form with your banking details and the amount you wish to withdraw.
              </p>
            </div>
            
            <div className="flex flex-col gap-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-medium">2. Processing Period</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Your withdrawal request will be processed within 2-3 business days.
              </p>
            </div>
            
            <div className="flex flex-col gap-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-medium">3. Receive Payment</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Once processed, funds will be transferred to your bank account. This may take 1-2 additional business days.
              </p>
            </div>
          </div>
          
          <Alert variant="default" className="bg-primary/5 text-primary border-primary/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              The minimum withdrawal amount is $50.00. Withdrawals are processed Monday through Friday.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

async function WithdrawalForm() {
  const balance = await getExpertBalance();
  const availableForWithdrawal = balance.available / 100;
  
  async function handleWithdrawal(formData: FormData) {
    "use server"
    
    try {
      await requestWithdrawal(formData);
      revalidatePath('/dashboard/withdrawals');
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      throw error;
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Withdrawal</CardTitle>
        <CardDescription>Transfer your earnings to your bank account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleWithdrawal} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount to Withdraw</Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                <Input 
                  id="amount" 
                  name="amount" 
                  type="number" 
                  placeholder="0.00" 
                  className="pl-7" 
                  step="0.01"
                  min="50"
                  max={availableForWithdrawal.toFixed(2)}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Available: ${availableForWithdrawal.toFixed(2)}
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input 
                id="bankName" 
                name="bankName" 
                placeholder="Enter your bank name" 
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input 
                  id="accountNumber" 
                  name="accountNumber" 
                  placeholder="Enter your account number" 
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="accountName">Account Holder Name</Label>
                <Input 
                  id="accountName" 
                  name="accountName" 
                  placeholder="Enter account holder name" 
                  required
                />
              </div>
            </div>
            
            <Alert className="bg-amber-50 text-amber-800 border-amber-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Withdrawals typically take 2-3 business days to process. Ensure your banking details are correct.
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="gap-2">
              <Upload className="h-4 w-4" />
              Request Withdrawal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

async function WithdrawalHistory() {
  const withdrawals = await getWithdrawalHistory();
  
  return (
    <Card>
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-lg">Withdrawal History</CardTitle>
        <CardDescription>All your previous withdrawal requests</CardDescription>
      </CardHeader>
      
      {withdrawals.length > 0 ? (
        <CardContent className="p-0">
          <div className="divide-y">
            {withdrawals.map((withdrawal) => (
              <div 
                key={withdrawal.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4 mb-3 md:mb-0">
                  <div className={cn(
                    "rounded-full p-2 flex-shrink-0",
                    withdrawal.status === 'completed' ? "bg-green-100" : 
                    withdrawal.status === 'failed' ? "bg-red-100" : "bg-amber-100"
                  )}>
                    {withdrawal.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : withdrawal.status === 'failed' ? (
                      <XCircle className="h-4 w-4 text-red-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Withdrawal to {withdrawal.bankName}</p>
                    <p className="text-sm text-muted-foreground">
                      Account: {withdrawal.accountNumber.slice(0, 4)}****{withdrawal.accountNumber.slice(-4)}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Requested: {withdrawal.requestDate}</span>
                      </div>
                      {withdrawal.completedDate && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Completed: {withdrawal.completedDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="font-medium">${withdrawal.amount}</p>
                  <Badge variant={
                    withdrawal.status === 'completed' ? "default" : 
                    withdrawal.status === 'failed' ? "destructive" : "outline"
                  } className={cn(
                    "text-xs",
                    withdrawal.status === 'completed' ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                  )}>
                    {withdrawal.status === 'completed' ? 'Completed' : 
                     withdrawal.status === 'pending' ? 'Processing' : 
                     'Failed'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <Download className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No withdrawals yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              When you request withdrawals, they will appear here. Start by requesting your first withdrawal.
            </p>
            <Button variant="outline" className="gap-2" asChild>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                const tabTrigger = document.querySelector('[data-value="withdraw"]');
                if (tabTrigger && 'click' in tabTrigger) {
                  (tabTrigger as HTMLElement).click();
                }
              }}>
                Request Your First Withdrawal
              </a>
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

// Loading skeletons
function BalanceSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      ))}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-lg border p-4">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function HistorySkeleton() {
  return (
    <Card>
      <CardHeader className="px-6 py-4">
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="flex flex-col md:flex-row md:items-center justify-between p-6"
            >
              <div className="flex items-start gap-4 mb-3 md:mb-0">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 