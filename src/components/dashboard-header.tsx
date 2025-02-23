import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Bell, Menu } from "lucide-react"
import Link from "next/link"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { SidebarNav } from "@/app/dashboard/components/sidebar-nav"
import { Shell } from "@/components/shell"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <Shell variant="dashboard">
        <div className="flex h-14 items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <SheetHeader className="border-b px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                    <span className="text-sm font-bold text-primary-foreground">M</span>
                  </div>
                  <SheetTitle className="font-bold">MentorHub</SheetTitle>
                </div>
                <SheetDescription className="sr-only">
                  Navigation menu
                </SheetDescription>
              </SheetHeader>
              <SidebarNav className="py-6" />
            </SheetContent>
          </Sheet>

          <div className="flex w-full items-center gap-4 md:gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">M</span>
              </span>
              <span className="font-bold">MentorHub</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/dashboard/appointments" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                My Sessions
              </Link>
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-muted"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="sr-only">Notifications</span>
              </Button>
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
      </Shell>
    </header>
  )
} 