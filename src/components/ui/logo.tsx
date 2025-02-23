"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Pacifico } from 'next/font/google';

// Import font Pacifico cho logo text
const pacificoFont = Pacifico({ 
  weight: '400',
  subsets: ['latin'] 
});

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export const Logo = ({ showText = true, className }: LogoProps) => {
  return (
    <Link 
      href="/dashboard" 
      className={cn(
        "flex items-center gap-2.5 group",
        className
      )}
    >
      <div className="relative flex items-center justify-center w-8 h-8">
        <div className="absolute inset-0 bg-primary/10 rounded-lg transform rotate-3 transition-transform group-hover:rotate-6" />
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-primary relative transform -rotate-3 transition-transform group-hover:rotate-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6.5C12 9 14 11 16.5 11C19 11 21 9 21 6.5C21 4 19 2 16.5 2C14 2 12 4 12 6.5ZM12 6.5C12 9 10 11 7.5 11C5 11 3 9 3 6.5C3 4 5 2 7.5 2C10 2 12 4 12 6.5ZM20 17.5C20 20 16.5 22 12 22C7.5 22 4 20 4 17.5C4 15 7.5 13 12 13C16.5 13 20 15 20 17.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 6.5V13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            pacificoFont.className,
            "text-xl leading-none text-foreground"
          )}>
            LovePrep
          </span>
          <span className="text-[10px] text-muted-foreground font-medium tracking-wider">
            relationship guidance
          </span>
        </div>
      )}
    </Link>
  );
}; 