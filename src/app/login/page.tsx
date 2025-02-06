"use client";

import GuestLayout from "@/layouts/guest-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { FormEvent } from 'react'


export default function Login() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        console.log(email, password);

        // TODO: Login user
        // TODO: Redirect to dashboard
        // TODO: Show error message if login fails
    }

    return (
        <GuestLayout>
            <div className="flex flex-col gap-6 max-w-md mx-auto py-12 min-h-screen">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input id="password" type="password" name="password" required />
                                </div>
                                <Button type="submit" className="w-full" > 
                                    Login
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Don't have an account?
                                <a href="/register" className="underline underline-offset-4 pl-1">
                                    Sign up
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

        </GuestLayout>
    );
}

