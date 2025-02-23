import { cn } from "@/lib/utils"

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "default" | "sidebar" | "centered" | "dashboard"
}

export function Shell({
  children,
  variant = "default",
  className,
  ...props
}: ShellProps) {
  return (
    <div
      className={cn(
        "grid items-start gap-8 p-8",
        {
          "px-0": variant === "sidebar",
          "container": variant === "default",
          "container py-0": variant === "dashboard",
          "container max-w-lg": variant === "centered",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
} 