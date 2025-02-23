"use client";

import GuestLayout from "@/layouts/guest-layout";
import { bricolageFont } from "@/utils/fonts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
import { ArrowLeft, Mail, User, LockKeyhole, Building } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Register() {
    const { register, isLoading } = useAuth();
    const [accountType, setAccountType] = React.useState("customer");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);


        register({ 
            email: formData.get('email') as string, 
            password: formData.get('password') as string,
            name: formData.get('name') as string,
            passwordConfirmation: formData.get('passwordConfirmation') as string,
            accountType: accountType
        });
    };

    return (
        <GuestLayout>
            <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dot-pattern">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className={`${bricolageFont.className} text-3xl font-bold text-primary`}>
                            Create an Account
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Join our community and start your journey
                        </p>
                    </div>

                    {/* Register Card */}
                    <Card className="border-0 shadow-lg">
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    {/* Account Type Selection */}
                                    <div className="space-y-2">
                                        <Label>Account Type</Label>
                                        <RadioGroup 
                                            defaultValue="customer" 
                                            className="grid grid-cols-2 gap-4"
                                            name="accountType"
                                            value={accountType}
                                            onValueChange={setAccountType}
                                            required
                                        >
                                            <div className="relative">
                                                <RadioGroupItem 
                                                    value="expert" 
                                                    id="expert"
                                                    className="peer sr-only"
                                                />
                                                <Label
                                                    htmlFor="expert"
                                                    className={`
                                                        flex flex-col items-center justify-between rounded-md border-2 
                                                        border-muted bg-transparent p-4 
                                                        hover:bg-muted/5 hover:border-primary/50
                                                        peer-checked:border-primary peer-checked:bg-primary/5
                                                        [&:has([data-state=checked])]:border-primary 
                                                        [&:has([data-state=checked])]:bg-primary/5
                                                        cursor-pointer transition-all duration-200
                                                        active:scale-95
                                                    `}
                                                >
                                                    <Building className={`
                                                        mb-2 h-6 w-6 
                                                        ${accountType === 'expert' 
                                                            ? 'text-primary' 
                                                            : 'text-muted-foreground'
                                                        }
                                                        transition-colors duration-200
                                                    `} />
                                                    <span className={`
                                                        text-sm font-medium
                                                        ${accountType === 'expert' 
                                                            ? 'text-primary' 
                                                            : 'text-foreground'
                                                        }
                                                        transition-colors duration-200
                                                    `}>
                                                        Expert
                                                    </span>
                                                </Label>
                                            </div>

                                            <div className="relative">
                                                <RadioGroupItem 
                                                    value="customer" 
                                                    id="customer"
                                                    className="peer sr-only" 
                                                />
                                                <Label
                                                    htmlFor="customer"
                                                    className={`
                                                        flex flex-col items-center justify-between rounded-md border-2 
                                                        border-muted bg-transparent p-4 
                                                        hover:bg-muted/5 hover:border-primary/50
                                                        peer-checked:border-primary peer-checked:bg-primary/5
                                                        [&:has([data-state=checked])]:border-primary 
                                                        [&:has([data-state=checked])]:bg-primary/5
                                                        cursor-pointer transition-all duration-200
                                                        active:scale-95
                                                    `}
                                                >
                                                    <User className={`
                                                        mb-2 h-6 w-6 
                                                        ${accountType === 'customer' 
                                                            ? 'text-primary' 
                                                            : 'text-muted-foreground'
                                                        }
                                                        transition-colors duration-200
                                                    `} />
                                                    <span className={`
                                                        text-sm font-medium
                                                        ${accountType === 'customer' 
                                                            ? 'text-primary' 
                                                            : 'text-foreground'
                                                        }
                                                        transition-colors duration-200
                                                    `}>
                                                        Client
                                                    </span>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                required
                                                className="pl-10"
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                placeholder="name@example.com"
                                                required
                                                className="pl-10"
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                placeholder="Create a password"
                                                required
                                                className="pl-10"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Must be at least 8 characters long, 
                                            contain at least one uppercase letter, one number, and one special character
                                        </p>
                                    </div>

                                    {/* Password Confirmation */}
                                    <div className="space-y-2">
                                        <Label htmlFor="passwordConfirmation">Confirm Password</Label>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <Input
                                                id="passwordConfirmation"
                                                type="password"
                                                name="passwordConfirmation"
                                                placeholder="Confirm your password"
                                                required
                                                className="pl-10"
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    Create Account
                                </Button>
                            </form>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <Separator />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-card px-2 text-muted-foreground">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <Button variant="outline" className="w-full">
                                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        Google
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"/>
                                        </svg>
                                        Apple
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-muted-foreground">
                            Already have an account?{" "}
                            <Link 
                                href="/login" 
                                className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

