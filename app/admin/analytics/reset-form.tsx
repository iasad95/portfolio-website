"use client"

import { Button } from "@/components/ui/button"

export function ResetForm({ action, label, confirmText }: { action: string; label: string; confirmText: string }) {
  return (
    <form
      method="POST"
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault()
      }}
    >
      <Button type="submit" variant="destructive" size="sm">
        {label}
      </Button>
    </form>
  )
}
