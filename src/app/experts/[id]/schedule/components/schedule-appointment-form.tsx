'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  Clock3Icon, 
  CheckCircle2, 
  ArrowRight, 
  Building, 
  CheckIcon,
  AlertCircle,
  ExternalLink,
  Loader2,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Shell } from '@/components/shell';
import { useExpert } from '../../context';
import { getAvailableTimeSlots, createAppointment, createPayment } from '../actions';
import { Textarea } from '@/components/ui/textarea';

// Types
interface ScheduleAppointmentFormProps {
  expertId: string;
}

interface FormData {
  service: string;
  date: Date | undefined;
  timeSlot: string;
  notes: string;
}

interface TimeSlot {
  start_time: string;
  end_time: string;
  duration: number;
  is_available: boolean;
}

// Constants
const STEPS = ['Service', 'Date & Time', 'Confirmation', 'Checkout'] as const;
const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = { 
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

// Helper function to format time from ISO string
const formatTimeSlot = (isoTimeString?: string): string => {
  if (!isoTimeString) return '';
  
  const timeDate = new Date(isoTimeString);
  return timeDate.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

// Component
export function ScheduleAppointmentForm({ expertId }: ScheduleAppointmentFormProps) {
  const router = useRouter();
  const expert = useExpert();
  
  const [formData, setFormData] = useState<FormData>({
    service: '',
    date: undefined,
    timeSlot: '',
    notes: '',
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [timeSlotsError, setTimeSlotsError] = useState<string | null>(null);
  const [appointmentCreated, setAppointmentCreated] = useState(false);
  const [appointmentId, setAppointmentId] = useState<number | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<number | null>(null);

  // Fetch available time slots when date or service changes
  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;
    
    async function fetchTimeSlots() {
      // Reset state
      setTimeSlotsError(null);
      
      if (!formData.date || !formData.service) {
        setAvailableTimeSlots([]);
        return;
      }

      try {
        setIsLoadingTimeSlots(true);
        
        // Format date as YYYY-MM-DD
        const formattedDate = formData.date.toISOString().split('T')[0];
        
        // Call server action to fetch time slots
        const result = await getAvailableTimeSlots(expertId, formattedDate, formData.service);
        
        if (isMounted) {
          if (result.success) {
            setAvailableTimeSlots(result.data.time_slots);
          } else {
            setAvailableTimeSlots([]);
            setTimeSlotsError(result.error || 'Failed to load time slots');
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching time slots:', error);
          setTimeSlotsError('An unexpected error occurred');
          setAvailableTimeSlots([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingTimeSlots(false);
        }
      }
    }

    // Add a small delay to prevent excessive calls during rapid date changes
    timeoutId = setTimeout(() => {
      fetchTimeSlots();
    }, 300);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [formData.date, formData.service, expertId]);

  // Show error toast when API fails
  useEffect(() => {
    if (timeSlotsError) {
      toast.error(`Failed to load time slots: ${timeSlotsError}`);
    }
  }, [timeSlotsError]);

  // Memoized values
  const services = useMemo(() => 
    expert.services.map(service => ({
      ...service,
      id: String(service.id)
    })),
    [expert.services]
  );

  const selectedService = useMemo(() => 
    services.find(s => s.id === formData.service),
    [services, formData.service]
  );

  const currentStep = useMemo(() => 
    getProgressStep(formData, isConfirmed),
    [formData, isConfirmed]
  );

  // Find the selected time slot to get end time
  const selectedTimeSlot = useMemo(() => 
    availableTimeSlots.find(slot => slot.start_time === formData.timeSlot),
    [availableTimeSlots, formData.timeSlot]
  );

  // Event handlers
  const handleServiceSelect = useCallback((value: string) => {
    // Prevent changes if already confirmed
    if (isConfirmed) {
      toast.error('Cannot change service after confirmation');
      return;
    }
    
    setFormData(prev => ({ ...prev, service: value }));
  }, [isConfirmed]);

  const handleDateSelect = useCallback((date: Date | undefined) => {
    // Prevent changes if already confirmed
    if (isConfirmed) {
      toast.error('Cannot change date after confirmation');
      return;
    }
    
    setFormData(prev => ({ ...prev, date, timeSlot: '' }));
  }, [isConfirmed]);

  const handleTimeSelect = useCallback((time: string) => {
    // Prevent changes if already confirmed
    if (isConfirmed) {
      toast.error('Cannot change time slot after confirmation');
      return;
    }
    
    setFormData(prev => ({ ...prev, timeSlot: time }));
  }, [isConfirmed]);

  const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Prevent changes if already confirmed
    if (isConfirmed) {
      toast.error('Cannot change notes after confirmation');
      return;
    }
    
    setFormData(prev => ({ ...prev, notes: e.target.value }));
  }, [isConfirmed]);

  const handleConfirmBooking = useCallback(async () => {
    if (!formData.date || !formData.timeSlot || !formData.service) {
      toast.error('Please complete all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Find the selected time slot to get end time
      const selectedSlot = availableTimeSlots.find(slot => slot.start_time === formData.timeSlot);
      
      if (!selectedSlot) {
        toast.error('Selected time slot is no longer available');
        return;
      }
      
      // Create appointment payload
      const payload = {
        expert_id: parseInt(expertId, 10),
        service_id: parseInt(formData.service, 10),
        scheduled_time: formData.timeSlot,
        end_time: selectedSlot.end_time,
        notes: formData.notes
      };
      
      // Call server action to create appointment
      const result = await createAppointment(payload);
      
      if (result.success && result.data) {
        setAppointmentCreated(true);
        setAppointmentId(result.data.id);
        setIsConfirmed(true);
        toast.success('Appointment booked successfully!');
      } else {
        toast.error(`Failed to book appointment: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, expertId, availableTimeSlots]);

  const handleProceedToCheckout = useCallback(async () => {
    if (!isConfirmed) {
      toast.error('Please confirm your booking details first');
      return;
    }

    if (!appointmentId) {
      toast.error('No appointment found. Please try again.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const baseUrl = window.location.origin;

      const returnUrl = `${baseUrl}/dashboard/appointments`;
      const cancelUrl = `${baseUrl}/dashboard/appointments`;
      const description = "Thanh toan lich hen - " + appointmentId;
      
      // Create payment payload
      const paymentPayload = {
        appointmentId: appointmentId,
        returnUrl,
        cancelUrl,
        description
      };
      
      // Call server action to create payment
      const result = await createPayment(paymentPayload);
      
      if (result.success && result.data.checkoutUrl) {
        setPaymentUrl(result.data.checkoutUrl);
        setPaymentId(result.data.paymentId);
        
        // Redirect to payment URL
        window.location.href = result.data.checkoutUrl;
      } else {
        toast.error(`Failed to create payment: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast.error('Failed to proceed to checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isConfirmed, appointmentId, selectedService, expert.user.name]);

  // Render helpers
  const renderStepIndicator = useCallback((step: string, index: number) => (
    <div key={step} className="flex items-center gap-2">
      <div className={cn(
        "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
        index + 1 <= currentStep 
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground"
      )}>
        {index + 1}
      </div>
      <span className="text-sm font-medium hidden md:block">{step}</span>
      {index < STEPS.length - 1 && (
        <ArrowRight className="h-4 w-4 text-muted-foreground hidden md:block" />
      )}
    </div>
  ), [currentStep]);

  const renderStepNumber = useCallback((number: number) => (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-sm font-medium text-primary">{number}</span>
      </div>
      <h2 className="text-lg font-medium">{STEPS[number - 1]}</h2>
    </div>
  ), []);

  const renderServiceOptions = useCallback(() => (
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
  ), [formData.service, handleServiceSelect, services]);

  const renderTimeSlots = useCallback(() => {
    if (!formData.date) {
      return (
        <div className="flex items-center justify-center h-32 border rounded-lg bg-muted/20">
          <div className="text-center">
            <Clock3Icon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Please select a date first</p>
          </div>
        </div>
      );
    }
    
    if (isLoadingTimeSlots) {
      return (
        <div className="flex items-center justify-center h-32 border rounded-lg bg-muted/20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-muted-foreground mx-auto mb-2 animate-spin" />
            <p className="text-muted-foreground">Loading available time slots...</p>
          </div>
        </div>
      );
    }
    
    if (availableTimeSlots.length === 0) {
      return (
        <div className="flex items-center justify-center h-32 border rounded-lg bg-muted/20">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No time slots available for this date</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-2 gap-3">
        {availableTimeSlots.map((slot) => {
          const formattedTime = formatTimeSlot(slot.start_time);
          
          return (
            <Button
              key={slot.start_time}
              type="button"
              variant={formData.timeSlot === slot.start_time ? "default" : "outline"}
              className={cn(
                "w-full h-12 px-4",
                !slot.is_available && "opacity-50 cursor-not-allowed",
                formData.timeSlot === slot.start_time && "ring-2 ring-primary ring-offset-2"
              )}
              disabled={!slot.is_available}
              onClick={() => handleTimeSelect(slot.start_time)}
              aria-selected={formData.timeSlot === slot.start_time}
            >
              <div className="flex items-center gap-2">
                <Clock3Icon className="h-4 w-4" />
                <span>{formattedTime}</span>
              </div>
            </Button>
          );
        })}
      </div>
    );
  }, [formData.date, formData.timeSlot, handleTimeSelect, availableTimeSlots, isLoadingTimeSlots]);

  const renderAppointmentDetails = useCallback(() => {
    const formattedTimeSlot = formatTimeSlot(formData.timeSlot);
    
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <AppointmentDetail 
            label="Service" 
            value={selectedService?.name} 
            subtext={`$${selectedService?.price}`} 
          />
          <AppointmentDetail 
            label="Date" 
            value={formData.date?.toLocaleDateString(undefined, DATE_FORMAT_OPTIONS)} 
          />
          <AppointmentDetail 
            label="Time" 
            value={formattedTimeSlot} 
            subtext={selectedService?.duration} 
          />
        </div>
        
        {isConfirmed && formData.notes && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Additional Notes</h3>
            <p className="text-sm">{formData.notes}</p>
          </div>
        )}
      </div>
    );
  }, [formData.date, formData.timeSlot, formData.notes, selectedService, isConfirmed]);

  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Schedule Appointment</h1>
          <p className="text-muted-foreground">Choose your preferred service and time</p>
        </div>

        <div className="flex items-center justify-between">
          {STEPS.map(renderStepIndicator)}
        </div>

        <div className="space-y-8">
          {/* Step 1: Service Selection */}
          <Card className="p-6">
            <div className="space-y-6">
              {renderStepNumber(1)}
              {renderServiceOptions()}
            </div>
          </Card>

          {/* Step 2: Date & Time Selection */}
          {formData.service && (
            <Card className="p-6">
              <div className="space-y-6">
                {renderStepNumber(2)}

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
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {formData.date ? 'Available Time Slots' : 'Time Slots'}
                    </h3>
                    {renderTimeSlots()}
                    {formData.date && !isLoadingTimeSlots && availableTimeSlots.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        All times are in your local timezone
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Confirmation */}
          {formData.service && formData.date && formData.timeSlot && (
            <Card className="p-6">
              <div className="space-y-6">
                {renderStepNumber(3)}

                {renderAppointmentDetails()}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium text-muted-foreground">
                      Additional Notes <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requests or information for the expert..."
                      className="resize-none"
                      rows={3}
                      value={formData.notes}
                      onChange={handleNotesChange}
                      disabled={isConfirmed}
                    />
                    <p className="text-xs text-muted-foreground">
                      Please provide any additional information that might be helpful for your appointment.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium">Please review your appointment details</p>
                        <p className="text-sm text-muted-foreground">
                          Once confirmed, you will proceed to checkout. You can still make changes before confirming.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button 
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => setFormData(prev => ({ ...prev, service: '' }))}
                      disabled={isConfirmed}
                    >
                      Change Service
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => setFormData(prev => ({ ...prev, date: undefined, timeSlot: '' }))}
                      disabled={isConfirmed}
                    >
                      Change Date/Time
                    </Button>
                    <Button 
                      type="button"
                      className="w-full sm:w-auto ml-auto"
                      onClick={isConfirmed ? undefined : handleConfirmBooking}
                      disabled={isConfirmed || isSubmitting}
                      variant={isConfirmed ? "outline" : "default"}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </div>
                      ) : isConfirmed ? (
                        <div className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          Confirmed
                        </div>
                      ) : (
                        'Confirm Booking'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Step 4: Checkout Button */}
          {isConfirmed && (
            <Card className="p-6">
              <div className="space-y-6">
                {renderStepNumber(4)}

                <div className="space-y-6">
                  <div className="bg-primary/5 p-6 rounded-lg border">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">Ready to Complete Your Booking</h3>
                        <p className="text-muted-foreground mt-1">
                          You'll be redirected to our secure payment gateway
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 bg-muted/30 px-4 py-2 rounded-md">
                        <p className="text-sm font-medium">Total:</p>
                        <p className="text-xl font-bold">${selectedService?.price}</p>
                      </div>
                      
                      <Button 
                        type="button"
                        size="lg"
                        className="w-full sm:w-auto min-w-[200px] mt-2"
                        onClick={handleProceedToCheckout}
                        disabled={isSubmitting}
                      >
                        <div className="flex items-center gap-2">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="h-4 w-4" />
                              Proceed to Payment
                            </>
                          )}
                        </div>
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    By proceeding to payment, you agree to our{' '}
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
        </div>
      </div>
    </Shell>
  );
}

// Helper components
interface AppointmentDetailProps {
  label: string;
  value?: string;
  subtext?: string;
}

function AppointmentDetail({ label, value, subtext }: AppointmentDetailProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{label}</h3>
      {value && <p className="font-medium">{value}</p>}
      {subtext && <p className="text-sm text-muted-foreground">{subtext}</p>}
    </div>
  );
}

// Helper function
function getProgressStep(formData: FormData, isConfirmed: boolean): number {
  if (isConfirmed) return 4;
  if (formData.service && formData.date && formData.timeSlot) return 3;
  if (formData.service) return 2;
  return 1;
} 