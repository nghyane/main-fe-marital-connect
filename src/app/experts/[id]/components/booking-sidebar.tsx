'use client';

import { memo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClockIcon, Mail, CheckCircle, Calendar } from "lucide-react";
import { bricolageFont } from "@/utils/fonts";
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useExpert } from '../context';

export const BookingSidebar = memo(function BookingSidebar() {
    const router = useRouter();
    const expert = useExpert();
    
    const { services, user_id } = expert;
    const email = expert.user.email;

    return (
        <Card className="sticky top-6">
            <CardContent className="p-6">
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h2 className={cn(bricolageFont.className, "text-xl font-semibold")}>
                            Book a Session
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Select your preferred service
                        </p>
                    </div>

                    {/* Services */}
                    <div className="space-y-3">
                        {services.map((service) => (
                            <div 
                                key={service.id}
                                className="group relative p-4 border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                                onClick={() => router.push(`/experts/${user_id}/schedule?service=${service.id}`)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="space-y-1">
                                        <h3 className="font-medium">{service.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <ClockIcon className="w-4 h-4 shrink-0" />
                                            <span>{service.duration}</span>
                                        </div>
                                    </div>
                                    <span className="font-medium text-primary">
                                        ${service.price}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Separator />

                    {/* Benefits */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">What you'll get</h3>
                        <ul className="grid gap-2 text-sm">
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>Flexible scheduling options</span>
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span>Free cancellation within 24h</span>
                            </li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button 
                            className="w-full" 
                            size="lg"
                            onClick={() => router.push(`/experts/${user_id}/schedule`)}
                        >
                            Schedule Appointment
                        </Button>
                        {email && (
                            <Button 
                                variant="outline" 
                                className="w-full gap-2" 
                                size="lg"
                                asChild
                            >
                                <a 
                                    href={`mailto:${email}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Mail className="h-4 w-4" />
                                    Contact via Email
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}); 