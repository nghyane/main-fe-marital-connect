"use client"

import { Button } from "@/components/ui/button"

export function RequestWithdrawalButton() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const tabTrigger = document.querySelector('[data-value="withdraw"]');
    if (tabTrigger && 'click' in tabTrigger) {
      (tabTrigger as HTMLElement).click();
    }
  };

  return (
    <Button variant="outline" className="gap-2" asChild>
      <a href="#" onClick={handleClick}>
        Request Your First Withdrawal
      </a>
    </Button>
  );
} 