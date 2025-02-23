'use client';

import { Card } from '@/components/ui/card';
import { CalendarIcon, Clock3Icon, BadgeCheck, ShieldCheck, InfoIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function BookingSummary() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <InfoIcon className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Booking Information</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Flexible Scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Choose from available time slots that work best for you
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Clock3Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Session Duration</h3>
            <p className="text-sm text-muted-foreground">
              30-90 minutes based on your selected service
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <BadgeCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Expert Verified</h3>
            <p className="text-sm text-muted-foreground">
              All our experts are thoroughly vetted and certified
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Secure Booking</h3>
            <p className="text-sm text-muted-foreground">
              Your payment and personal information are protected
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
} 