import { Metadata } from 'next';
import { ScheduleAppointmentForm } from './components/schedule-appointment-form';
import { BookingSummary } from './components/booking-summary';
import { FAQSection } from './components/faq-section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Schedule Appointment',
  description: 'Schedule an appointment with your expert',
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ScheduleAppointmentPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-muted/10">
        <div className="container mx-auto px-4 py-12">
        <Breadcrumbs
          items={[
            { label: 'Experts', href: '/experts' },
            { label: 'Expert Profile', href: `/experts/${id}` },
            { label: 'Schedule Appointment', href: '#' },
          ]}
          className="mb-6"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ScheduleAppointmentForm expertId={id} />
          </div>
          
          <div className="space-y-6">
            <BookingSummary />
            <FAQSection />
          </div>
        </div>
      </div>
    </main>
  );
} 