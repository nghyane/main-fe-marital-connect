export function WelcomeHeader({ name }: { name: string }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Welcome back, {name}
      </h1>
      <p className="text-sm text-muted-foreground md:text-base">
        Here's an overview of your mentoring journey
      </p>
    </div>
  );
} 