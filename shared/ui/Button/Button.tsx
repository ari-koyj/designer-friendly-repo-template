import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'default' | 'text' | 'danger'
export type ButtonSize = 'default' | 'sm'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover active:bg-primary-active border border-primary',
  default:
    'bg-surface text-foreground-muted hover:bg-surface-fill border border-border',
  text: 'bg-transparent text-foreground-muted hover:bg-surface-fill border border-transparent',
  danger:
    'bg-error text-white hover:opacity-90 border border-error'
}

const sizeClass: Record<ButtonSize, string> = {
  default: 'h-8 px-4 text-sm',
  sm: 'h-7 px-3 text-xs'
}

/**
 * 純粋な UI の atom。ドメインを一切知らず、props だけで描画する。
 */
export function Button({
  variant = 'default',
  size = 'default',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-1.5 rounded-[--radius-control] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      {...props}
    />
  )
}
