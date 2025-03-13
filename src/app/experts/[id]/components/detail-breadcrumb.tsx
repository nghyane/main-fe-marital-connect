'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useExpert } from "../context";

export default function DetailBreadcrumb() {
    const expert = useExpert();

    return (
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
    )
}