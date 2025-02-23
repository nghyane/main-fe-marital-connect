"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard, AlertCircle } from "lucide-react";

interface PaymentSummaryProps {
  sessionPrice: number;
}

export const PaymentSummary = ({ sessionPrice }: PaymentSummaryProps) => {
  const handlePayment = async () => {
    try {
      // TODO: Integrate with your payment API
      console.log("Processing payment for $", sessionPrice);
      
      // Example API call
      // const response = await fetch('/api/create-payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount: sessionPrice })
      // });
      
      // Redirect to payment page or show payment modal
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader className="p-4 pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-primary" />
          Payment Required
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-4">
          {/* Payment Details */}
          <div className="p-3 rounded-lg bg-accent/50">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Session Fee</span>
                <span className="font-medium">${sessionPrice}.00</span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Duration</span>
                <span>45 minutes</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span className="text-primary">${sessionPrice}.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Notice */}
          <div className="flex items-start gap-2 p-3 text-sm bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 rounded-lg">
            <AlertCircle className="w-4 h-4 mt-0.5" />
            <p>Payment is required to confirm your session booking</p>
          </div>

          {/* Payment Actions */}
          <div className="space-y-2">
            <Button className="w-full gap-2" onClick={handlePayment}>
              <CreditCard className="w-4 h-4" />
              Pay Now
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 