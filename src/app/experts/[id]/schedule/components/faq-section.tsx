'use client';

import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export function FAQSection() {
  const faqs = [
    {
      question: 'How do I prepare for the session?',
      answer: 'Make sure you have a stable internet connection and a quiet environment. Have any relevant documents or questions ready before the session starts.'
    },
    {
      question: 'What if I need to reschedule?',
      answer: 'You can reschedule your appointment up to 24 hours before the scheduled time. Simply go to your dashboard and select the reschedule option.'
    },
    {
      question: 'How do payments work?',
      answer: 'Payments are processed securely at the time of booking. We accept all major credit cards and digital payment methods.'
    },
    {
      question: 'What happens after booking?',
      answer: "You will receive a confirmation email with session details and a calendar invite. The expert may also send you preparation materials if needed."
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border-b last:border-b-0"
          >
            <AccordionTrigger className="text-left hover:text-primary transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
} 