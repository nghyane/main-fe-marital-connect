"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LayoutDashboard, Calendar, User, Settings, LogOut, ClipboardList, Users, Award, HelpCircle, Wallet } from "lucide-react"
import { useUser } from "../provider"
import { useAuth } from "@/providers/auth-provider"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

const userMenuItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Sessions",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
]

const expertMenuItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Client Sessions",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Clients",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    title: "Revenue Withdrawals",
    href: "/dashboard/withdrawals",
    icon: Wallet,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Certifications",
    href: "/dashboard/certifications",
    icon: Award,
  },
]

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const { user } = useUser()
  const { logout } = useAuth()
  const isExpert = user.role.name === 'expert'
  const menuItems = isExpert ? expertMenuItems : userMenuItems

  return (
    <nav
      className={cn(
        "flex flex-col gap-2 p-4",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start gap-3 py-6 md:py-2",
                isActive && "bg-muted font-medium",
                "hover:bg-muted/50"
              )}
            >
              <Icon className="h-5 w-5 text-muted-foreground" />
              {item.title}
            </Link>
          )
        })}
      </div>

      <div className="mt-auto flex flex-col gap-1 pt-4 border-t">
        <Link
          href="/dashboard/settings"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-3 py-6 md:py-2",
            "hover:bg-muted/50"
          )}
        >
          <Settings className="h-5 w-5 text-muted-foreground" />
          Settings
        </Link>
        <button
          onClick={logout}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-3 py-6 md:py-2",
            "hover:bg-muted/50 text-red-600 hover:text-red-600"
          )}
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </nav>
  )
} 