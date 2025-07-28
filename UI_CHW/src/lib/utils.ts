import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: unknown[]) {
  return inputs.filter(Boolean).join(' ');
}
