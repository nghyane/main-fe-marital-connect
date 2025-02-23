"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ClipboardCheck, 
  Search, 
  Calendar, 
  Video,
  Star,
  CreditCard,
  Settings,
  Menu,
  X,
  Heart,
  CircleUser,
  Bell,
  Home
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

const navItems = [
  { 
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  { 
    label: "Assessment",
    icon: ClipboardCheck,
    href: "/dashboard/assessment",
    badge: "75%"
  },
  { 
    label: "Find Experts", 
    icon: Search, 
    href: "/dashboard/experts",
  },
  { 
    label: "Appointments", 
    icon: Calendar, 
    href: "/dashboard/appointments",
    badge: "2"
  },
  { 
    label: "Sessions", 
    icon: Video, 
    href: "/dashboard/sessions",
  }
];

const secondaryItems = [
  { 
    label: "Reviews", 
    icon: Star, 
    href: "/dashboard/reviews",
  },
  { 
    label: "Payments", 
    icon: CreditCard, 
    href: "/dashboard/payments",
  },
  { 
    label: "Settings", 
    icon: Settings, 
    href: "/dashboard/settings",
  }
];

export const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-background border-b z-40">
        <div className="container mx-auto h-full px-4">
          <div className="flex items-center justify-between h-full gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
              <Logo showText={!isOpen} />
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={item.href}
                      variant={isActive ? "ghost" : "ghost"}
                      className={cn(
                        "h-9 transition-colors",
                        isActive && "bg-accent"
                      )}
                      asChild
                    >
                      <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </Button>
              <Button variant="ghost" className="hidden md:flex gap-2">
                <CircleUser className="w-5 h-5" />
                <span>John Doe</span>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <CircleUser className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-16 left-0 w-full bg-background border-b z-50 md:hidden">
            <div className="container mx-auto p-4">
              <div className="grid gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={item.href}
                      variant={isActive ? "ghost" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 h-12",
                        isActive && "bg-accent"
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="w-5 h-5" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </Button>
                  );
                })}
                <div className="h-px bg-border my-2" />
                {secondaryItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={item.href}
                      variant={isActive ? "ghost" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 h-12",
                        isActive && "bg-accent"
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}; 