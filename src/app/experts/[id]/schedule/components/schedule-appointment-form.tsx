'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CalendarIcon, Clock3Icon, CheckCircle2, ArrowRight, Building, Wallet, QrCode, Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Shell } from '@/components/shell';
import { Input } from '@/components/ui/input';

interface ScheduleAppointmentFormProps {
  expertId: string;
}

export function ScheduleAppointmentForm({ expertId }: ScheduleAppointmentFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    service: '',
    date: undefined as Date | undefined,
    timeSlot: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'momo'>('bank');

  const services = [
    { 
      id: '1', 
      name: 'Initial Consultation', 
      duration: '30 min', 
      price: 50,
      description: 'Perfect for first-time clients to discuss goals and create a plan'
    },
    { 
      id: '2', 
      name: 'Full Session', 
      duration: '60 min', 
      price: 100,
      description: 'Comprehensive session for detailed discussion and problem-solving'
    },
    { 
      id: '3', 
      name: 'Extended Session', 
      duration: '90 min', 
      price: 150,
      description: 'In-depth consultation for complex topics requiring more time'
    },
  ];

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
  ];

  const handleServiceSelect = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  }, []);

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
  }, []);

  const handleTimeSelect = useCallback((time: string) => {
    setFormData(prev => ({ ...prev, timeSlot: time }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.timeSlot || !formData.service) {
      toast.error('Please complete all required fields');
      return;
    }

    try {
      toast.success('Appointment scheduled successfully!');
      router.push(`/dashboard/appointments`);
    } catch (error) {
      toast.error('Failed to schedule appointment');
    }
  };

  const selectedService = services.find(s => s.id === formData.service);

  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Schedule Appointment</h1>
          <p className="text-muted-foreground">Choose your preferred service and time</p>
        </div>

        <div className="flex items-center justify-between">
          {['Service', 'Date & Time', 'Confirmation'].map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                index + 1 <= getProgressStep(formData) 
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                {index + 1}
              </div>
              <span className="text-sm font-medium hidden md:block">{step}</span>
              {index < 2 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground hidden md:block" />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">1</span>
                </div>
                <h2 className="text-lg font-medium">Select Service</h2>
              </div>

              <RadioGroup
                value={formData.service}
                onValueChange={handleServiceSelect}
                className="grid gap-4 md:grid-cols-3"
              >
                {services.map((service) => (
                  <Label
                    key={service.id}
                    htmlFor={service.id}
                    className="cursor-pointer"
                  >
                    <Card 
                      className={cn(
                        "relative p-4 transition-colors hover:border-primary/50",
                        formData.service === service.id && "border-primary ring-2 ring-primary ring-offset-2"
                      )}
                    >
                      {formData.service === service.id && (
                        <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-primary" />
                      )}
                      <RadioGroupItem 
                        value={service.id} 
                        id={service.id} 
                        className="absolute top-4 left-4 opacity-0"
                      />
                      <div className="space-y-2">
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock3Icon className="w-4 h-4 mr-1" />
                            {service.duration}
                          </div>
                          <span className="font-medium">${service.price}</span>
                        </div>
                      </div>
                    </Card>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </Card>

          {formData.service && (
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">2</span>
                  </div>
                  <h2 className="text-lg font-medium">Select Date & Time</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Select Date</h3>
                    <div className="flex justify-center p-4 border rounded-lg bg-card">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={handleDateSelect}
                        className="rounded-md"
                        disabled={(date) => 
                          date < new Date() || 
                          date.getDay() === 0 || 
                          date.getDay() === 6
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Available Time Slots</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          type="button"
                          variant={formData.timeSlot === slot.time ? "default" : "outline"}
                          className={cn(
                            "w-full h-12 px-4",
                            !slot.available && "opacity-50 cursor-not-allowed",
                            formData.timeSlot === slot.time && "ring-2 ring-primary ring-offset-2"
                          )}
                          disabled={!slot.available}
                          onClick={() => handleTimeSelect(slot.time)}
                        >
                          <div className="flex items-center gap-2">
                            <Clock3Icon className="h-4 w-4" />
                            <span>{slot.time}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All times are in your local timezone
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {formData.service && formData.date && formData.timeSlot && (
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">3</span>
                  </div>
                  <h2 className="text-lg font-medium">Confirm & Pay</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Service</h3>
                    <p className="font-medium">{selectedService?.name}</p>
                    <p className="text-sm text-muted-foreground">${selectedService?.price}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Date</h3>
                    <p className="font-medium">
                      {formData.date?.toLocaleDateString(undefined, { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Time</h3>
                    <p className="font-medium">{formData.timeSlot}</p>
                    <p className="text-sm text-muted-foreground">{selectedService?.duration}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-4">
                    <Label>Select Payment Method</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as 'bank' | 'momo')}
                      className="grid gap-4 pt-2"
                    >
                      <div>
                        <RadioGroupItem
                          value="bank"
                          id="bank"
                          className="peer hidden"
                        />
                        <Label
                          htmlFor="bank"
                          className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <div className="flex items-center gap-4">
                            <Building className="h-5 w-5 text-muted-foreground" />
                            <div className="space-y-1">
                              <p className="font-medium">Bank Transfer</p>
                              <p className="text-sm text-muted-foreground">Pay via bank transfer or QR code</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="momo"
                          id="momo"
                          className="peer hidden"
                        />
                        <Label
                          htmlFor="momo"
                          className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <div className="flex items-center gap-4">
                            <Wallet className="h-5 w-5 text-muted-foreground" />
                            <div className="space-y-1">
                              <p className="font-medium">Momo</p>
                              <p className="text-sm text-muted-foreground">Pay with Momo e-wallet</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full"
                    size="lg"
                  >
                    {paymentMethod === 'bank'
                      ? 'Confirm Bank Transfer'
                      : 'Pay with Momo'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By confirming your appointment, you agree to our{' '}
                    <Link 
                      href="/terms" 
                      className="text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link 
                      href="/privacy" 
                      className="text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </Card>
          )}
        </form>
      </div>
    </Shell>
  );
}

function getProgressStep(formData: { service: string; date?: Date; timeSlot: string }) {
  if (formData.service && formData.date && formData.timeSlot) return 3;
  if (formData.service) return 2;
  return 1;
} 