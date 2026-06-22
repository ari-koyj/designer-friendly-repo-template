import type { InputHTMLAttributes } from 'react'

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>

/**
 * 純粋な UI の atom。値は props（value/onChange）で制御する。
 */
export function TextInput({ className = '', type = 'text', ...props }: TextInputProps) {
  return (
    <input
      type={type}
      className={`h-8 w-full rounded-[--radius-control] border border-border bg-surface px-3 text-sm text-foreground outline-none placeholder:text-foreground-placeholder focus:border-primary transition-colors ${className}`}
      {...props}
    />
  )
}
