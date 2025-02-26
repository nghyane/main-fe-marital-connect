'use client';

import { memo } from 'react';
import { CheckCircle2, StarIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { bricolageFont } from "@/utils/fonts";
import { Expert } from '../type';
import { getAvailabilityStatusText } from '@/utils/availability-status';
type ExpertHeaderProps = Pick<Expert, 'title' | 'location' | 'experience' | 'availability_status' | 'user'>;

export const ExpertHeader = memo(function ExpertHeader({
    title,
    location,
    experience,
    availability_status,
    user
}: ExpertHeaderProps) {
    
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/30 overflow-hidden ring-4 ring-primary/20">
                            {/* Add actual image here */}
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className={`${bricolageFont.className} text-3xl font-bold text-primary`}>
                                {user.name}
                            </h1>
                            <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" />
                                {getAvailabilityStatusText(availability_status)}
                            </span>
                        </div>
                        <p className="text-lg text-muted-foreground mb-4">{title}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <StarIcon className="w-4 h-4 text-yellow-400" />
                                <span>4.9 (150 reviews)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPinIcon className="w-4 h-4" />
                                <span>{location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <ClockIcon className="w-4 h-4" />
                                <span>{experience} years</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}); 