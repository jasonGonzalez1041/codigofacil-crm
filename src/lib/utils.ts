import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null): string {
  if (!date) return 'N/A'
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat('es-CR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
  }).format(amount)
}

export function formatPhoneNumber(phone: string): string {
  // Costa Rica phone number format
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 8) {
    return `+506 ${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
  }
  return phone
}