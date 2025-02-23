import GuestLayout from "@/layouts/guest-layout";
import { bricolageFont } from "@/utils/fonts";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarIcon, ClockIcon, UserIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogDetail({ params }: { params: { slug: string } }) {
    // In a real app, fetch blog data based on slug
    const post = {
        title: "10 Essential Tips for a Successful Marriage",
        content: `
            <p>Marriage is a beautiful journey that requires dedication, understanding, and continuous effort from both partners. Here are ten essential tips that can help strengthen your marriage and build a lasting relationship:</p>

            <h2>1. Communication is Key</h2>
            <p>Open and honest communication forms the foundation of a strong marriage. Make time each day to talk about your feelings, concerns, and dreams.</p>

            <h2>2. Show Appreciation</h2>
            <p>Never take your partner for granted. Express gratitude for both big and small gestures. A simple "thank you" can go a long way in making your spouse feel valued.</p>
        `,
        author: "Sarah Johnson",
        date: "March 15, 2024",
        readTime: "5 min read",
        category: "Relationship",
        image: "https://image.marriage.com/advice/wp-content/uploads/2017/09/The-5-Challenges-and-Solutions-of-Being-a-Single-Parent-390x250.jpg"
    };

    return (
        <GuestLayout>
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
                            <BreadcrumbLink href="/blog" className="text-primary hover:text-primary/80">
                                Blog
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-muted-foreground">
                                {post.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <Button 
                                className="absolute top-4 left-4 bg-primary/90 hover:bg-primary"
                            >
                                {post.category}
                            </Button>
                        </div>

                        <h1 className={`${bricolageFont.className} text-4xl md:text-5xl font-bold text-primary mb-6`}>
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                            <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    <div className="mt-16 pt-8 border-t">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className={`${bricolageFont.className} text-2xl font-bold text-primary`}>
                                Related Articles
                            </h2>
                            <Link 
                                href="/blog" 
                                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                            >
                                <span className="text-sm font-medium">View all articles</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2].map((i) => (
                                <Link href={`/blog/another-article-${i}`} key={i}>
                                    <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        <div className="relative">
                                            {/* Image Container */}
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={post.image}
                                                    alt="Related post"
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            
                                            {/* Category Badge */}
                                            <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-white text-sm font-medium rounded-full">
                                                {post.category}
                                            </span>
                                        </div>

                                        <div className="p-6">
                                            {/* Meta info */}
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="w-4 h-4" />
                                                    <span>March 10, 2024</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <ClockIcon className="w-4 h-4" />
                                                    <span>4 min read</span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 className={`${bricolageFont.className} text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2`}>
                                                Communication Strategies for Newlyweds: Building a Strong Foundation
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-muted-foreground line-clamp-2">
                                                Discover effective communication techniques that help newlyweds establish 
                                                trust, understanding, and a deeper connection in their marriage.
                                            </p>

                                            {/* Read More Link */}
                                            <div className="mt-4 flex items-center gap-2 text-primary font-medium group/link">
                                                <span>Read more</span>
                                                <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
} 