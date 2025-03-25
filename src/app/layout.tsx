import type { Metadata } from "next";
import "./globals.css";
import { dmSansFont } from "@/utils/fonts";
import { AuthProvider } from "@/providers/auth-provider";
import { cookies } from "next/headers";
import { AUTH_COOKIES } from "@/constants/auth";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from 'react';
import { Loading } from "@/components/ui/loading";
import { ToastContainer } from '@/components/ui/toast'

export const metadata: Metadata = {
  title: "Marriage Advice",
  description: "Marriage Advice",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN);

  return (
    <html lang="en">
      <body
        className={`${dmSansFont.className} antialiased`}
      >
        <AuthProvider token={token}>
          <Suspense fallback={
            <Loading 
              size="lg"
              text="Loading..." 
              minHeight="min-h-[80px]"
            />
          }>
            <ToastContainer>
              {children}
            </ToastContainer>
          </Suspense>
          <Suspense>
            <Toaster />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
