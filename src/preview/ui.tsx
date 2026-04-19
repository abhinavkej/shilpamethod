import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

// Tiny shared kit for every preview page.

export function PageShell({ children, maxWidth = 'max-w-xl' }: { children: ReactNode; maxWidth?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`${maxWidth} mx-auto px-6 py-14 md:py-20`}
    >
      {children}
    </motion.div>
  )
}

export function ProgressBar({ value, total }: { value: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-2">
        Step {value} of {total}
      </div>
      <div className="h-[3px] bg-border/70 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / total) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-coral rounded-full"
        />
      </div>
    </div>
  )
}

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="font-display text-display-md text-forest mb-4">{children}</h1>
}

export function Lede({ children }: { children: ReactNode }) {
  return <p className="text-body-md text-slate mb-8 leading-relaxed">{children}</p>
}

export function PrimaryButton({
  children,
  onClick,
  to,
  disabled,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  to?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  const className = `inline-flex items-center gap-2 bg-coral text-cream text-[15px] px-6 py-3 rounded-full transition-all hover:bg-rust disabled:opacity-40 disabled:cursor-not-allowed`
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  )
}

export function GhostButton({ children, to, onClick }: { children: ReactNode; to?: string; onClick?: () => void }) {
  const className =
    'inline-flex items-center gap-2 text-forest text-[14px] px-4 py-2 hover:text-ivy underline-offset-4 hover:underline'
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white border border-border rounded-2xl p-6 md:p-7 ${className}`}
    >
      {children}
    </div>
  )
}

export function Mono({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[10px] tracking-widest uppercase text-slate ${className}`}>
      {children}
    </span>
  )
}

export function TextInput({
  label,
  placeholder,
  value,
  onChange,
  hint,
  type = 'text',
}: {
  label: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  hint?: string
  type?: string
}) {
  return (
    <label className="block mb-5">
      <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-2">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[16px] text-ink focus:border-forest focus:outline-none transition-colors"
      />
      {hint && <div className="text-[12px] text-slate mt-2">{hint}</div>}
    </label>
  )
}

export function Toggle({
  label,
  description,
  value,
  onChange,
  disabled,
}: {
  label: string
  description?: string
  value: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <label
      className={`flex items-start gap-4 py-4 border-b border-border/60 last:border-0 ${disabled ? 'opacity-50' : ''}`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={value}
        disabled={disabled}
        onClick={() => !disabled && onChange(!value)}
        className={`relative w-10 h-6 rounded-full flex-none mt-0.5 transition-colors ${
          value ? 'bg-forest' : 'bg-border'
        }`}
      >
        <motion.span
          animate={{ x: value ? 16 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 left-0 w-5 h-5 rounded-full bg-white"
        />
      </button>
      <div>
        <div className="text-[15px] text-forest font-medium">{label}</div>
        {description && <div className="text-[13px] text-slate mt-0.5 leading-relaxed">{description}</div>}
      </div>
    </label>
  )
}
