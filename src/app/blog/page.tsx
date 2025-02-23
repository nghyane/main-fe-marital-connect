import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { bricolageFont } from "@/utils/fonts";
import Link from "next/link";

const BLOG_POSTS = [
    {
        id: 1,
        slug: "10-essential-tips-for-successful-marriage",
        title: "10 Essential Tips for a Successful Marriage",
        excerpt: "Discover the key principles that can help strengthen your marriage and build a lasting relationship.",
        image: "https://image.marriage.com/advice/wp-content/uploads/2017/09/The-5-Challenges-and-Solutions-of-Being-a-Single-Parent-390x250.jpg",
        category: "Relationship",
        readTime: "5 min read",
        author: "Sarah Johnson",
        date: "Mar 15, 2024"
    },
    {
        id: 2,
        slug: "communication-skills-in-marriage",
        title: "Communication Skills in Marriage",
        excerpt: "Learn effective communication techniques to improve understanding and connection with your partner.",
        image: "https://image.marriage.com/advice/wp-content/uploads/2017/09/The-5-Challenges-and-Solutions-of-Being-a-Single-Parent-390x250.jpg",
        category: "Communication",
        readTime: "4 min read",
        author: "Sarah Johnson",
        date: "Mar 15, 2024"
    },
    {
        id: 3,
        slug: "financial-planning-for-newlyweds",
        title: "Financial Planning for Newlyweds",
        excerpt: "Essential financial advice and tips for couples starting their journey together.",
        image: "https://image.marriage.com/advice/wp-content/uploads/2017/09/The-5-Challenges-and-Solutions-of-Being-a-Single-Parent-390x250.jpg",
        category: "Finance",
        readTime: "6 min read",
        author: "Sarah Johnson",
        date: "Mar 15, 2024"
    },
];

export default function Blog() {
    return (
        <GuestLayout>
            <div className="container mx-auto px-4 py-12">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList className="text-sm">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="text-primary hover:text-primary/80">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/blog" className="text-primary hover:text-primary/80">Blog</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="relative mb-16 text-center">
                    <h1 className={`${bricolageFont.className} text-5xl font-bold text-primary mb-6`}>
                        Marriage Blog & Articles
                    </h1>
                    <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                        Discover expert advice, tips, and insights to help you build a stronger, 
                        happier marriage.
                    </p>
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-primary/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-2xl mx-auto mb-16">
                    <div className="relative group">
                        <Input 
                            type="text" 
                            placeholder="Search articles..." 
                            className="h-14 pl-14 pr-6 text-lg rounded-full border-2 border-primary/10 bg-white/50 backdrop-blur-sm
                                     hover:border-primary/20 focus:border-primary/30 focus:outline-none ring-0
                                     transition-all duration-300 placeholder:text-muted-foreground/70
                                     shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                                     hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]
                                     focus:bg-white focus:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                        />
                        <SearchIcon className="w-6 h-6 absolute left-5 top-4 text-primary/40 group-hover:text-primary/60 transition-colors duration-300" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <Link 
                            href={`/blog/${post.slug}`} 
                            key={post.id}
                            className="block group"
                        >
                            <Card className="group hover:shadow-xl transition-all duration-300 border-none bg-white/50 backdrop-blur-sm">
                                <CardHeader className="p-0">
                                    <div className="relative overflow-hidden rounded-t-xl">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium shadow-lg">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>{post.author}</span>
                                            <span>•</span>
                                            <span>{post.date}</span>
                                        </div>
                                        <CardTitle className="text-2xl font-bold text-primary group-hover:text-primary/90 transition-colors line-clamp-2">
                                            {post.title}
                                        </CardTitle>
                                        <p className="text-muted-foreground text-base line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                                            <span className="text-sm font-medium text-primary/70">
                                                {post.readTime}
                                            </span>
                                            <span 
                                                className="text-primary hover:text-primary hover:bg-primary/5 font-medium"
                                            >
                                                Read More →
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
