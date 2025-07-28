import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-sm text-xs font-medium ring-offset-background transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
        destructive: "bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5] hover:bg-[#fecaca] hover:text-[#991b1b] hover:border-[#f87171]",
        outline:
          "border border-[#e5e7eb] bg-white text-[#2563eb] hover:bg-[#e0e7ef] hover:text-[#2563eb] hover:border-[#2563eb]",
        secondary: "bg-[#f1f5f9] text-[#2563eb] hover:bg-[#e0e7ef] hover:text-[#2563eb]",
        ghost: "hover:bg-[#e0e7ef] hover:text-[#2563eb]",
        link: "underline-offset-4 hover:underline text-[#2563eb]",
      },
      size: {
        default: "h-8 px-3 py-1 text-xs",
        sm: "h-7 rounded px-2 text-xs",
        lg: "h-9 rounded px-5 text-sm",
        icon: "h-8 w-8 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 