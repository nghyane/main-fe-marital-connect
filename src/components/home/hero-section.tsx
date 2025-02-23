import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bricolageFont, dmSansFont } from "@/utils/fonts";
import { ROUTES } from "@/constants/routes";

export const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col items-center justify-center py-10 gap-4">
        <h1 className={`${bricolageFont.className} text-4xl font-bold lg:text-6xl text-center text-primary`}>
          A Strong Start for a Happy Marriage
        </h1>
        <p className={`${dmSansFont.className} text-lg lg:text-2xl text-center text-slate-500`}>
          Marriage is a journey that requires commitment, communication, and a shared vision for the future.
        </p>

        <Link href={ROUTES.BLOG}>
          <Button
            className="mt-6 text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Blog
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}; 