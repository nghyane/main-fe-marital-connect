import GuestLayout from "@/layouts/guest-layout";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";



export default function Blog() {
    return (
        <GuestLayout>
            <div className="container mx-auto px-4 py-4">
                <h1>Blog</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <img
                                    src="https://image.marriage.com/advice/wp-content/uploads/2017/09/The-5-Challenges-and-Solutions-of-Being-a-Single-Parent-390x250.jpg"
                                    alt="Blog post image"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1">
                                    <CardTitle className="text-primary text-xl">Blog Post {index + 1}</CardTitle>
                                    <p>This is a blog post</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </GuestLayout>
    )
}
