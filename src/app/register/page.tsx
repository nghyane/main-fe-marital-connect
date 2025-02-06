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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormEvent } from 'react'


export default function Register() {
    return (
        <GuestLayout>
            <div className="flex flex-col gap-6 max-w-md mx-auto py-12 min-h-screen">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Enter your details below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        required 
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                                    <Input 
                                        id="passwordConfirmation" 
                                        type="password" 
                                        required 
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Register
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?
                                <a href="/login" className="underline underline-offset-4 pl-1">
                                    Login
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

