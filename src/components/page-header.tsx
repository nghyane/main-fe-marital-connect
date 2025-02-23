import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function PageHeader({
  heading,
  text,
  children,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("grid gap-1", className)} {...props}>
      <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
      {text && <p className="text-lg text-muted-foreground">{text}</p>}
      {children}
    </div>
  )
}

interface PageHeaderHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export function PageHeaderHeading({
  children,
  className,
  ...props
}: PageHeaderHeadingProps) {
  return (
    <h1
      className={cn(
        "font-heading text-3xl md:text-4xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

interface PageHeaderDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function PageHeaderDescription({
  children,
  className,
  ...props
}: PageHeaderDescriptionProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground text-lg",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
} 