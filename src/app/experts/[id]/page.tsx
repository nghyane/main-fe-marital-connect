import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ExpertHeader } from './components/expert-header';
import { ExpertTabs } from './components/expert-tabs';
import { BookingSidebar } from './components/booking-sidebar';
import { ExpertResponse } from './type';
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

import { api } from '@/lib/api-client';

export default async function ExpertDetail({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    const expert = await api.fetch<ExpertResponse>(`/experts/${id}`).then((res) => res.data);

    return (
        <div className="container mx-auto px-4 py-12">
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-primary hover:text-primary/80">
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/experts" className="text-primary hover:text-primary/80">
                            Experts
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-muted-foreground">
                            {expert.user.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <ExpertHeader
                        title={expert.title}
                        location={expert.location}
                        experience={expert.experience}
                        availability_status={expert.availability_status}
                        user={expert.user}
                    />
                    <ExpertTabs
                        about={expert.about}
                        specialties={expert.specialties}
                        education={expert.education}
                        certifications={expert.certifications}
                    />
                </div>

                {/* Sidebar */}
                <BookingSidebar 
                    services={expert.services} 
                    user_id={expert.user_id} 
                    email={expert.user.email}
                />
            </div>
        </div>
    );
} 