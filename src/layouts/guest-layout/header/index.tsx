"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { bricolageFont } from "@/utils/fonts";


import { useAuth } from '@/providers/auth-provider';

import { ROUTES } from "@/constants/routes";
export default function Header() {

    const { logout, isAuthenticated } = useAuth();

    return (
        <header className="bg-transparent">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/">
                    <h1 className={`${bricolageFont.className} text-2xl font-bold text-center text-primary`}>
                        Marriage.Com
                    </h1>
                </Link>

                <div className="flex items-center gap-x-4">
                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard">Dashboard</Link>
                            <Button variant="outline" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href={ROUTES.REGISTER}>
                                <Button variant="outline" size="lg" className="text-base">
                                    Register
                                </Button>
                            </Link>

                            <Link href={ROUTES.LOGIN}>
                                <Button size="lg" className="text-base">
                                    Login
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
