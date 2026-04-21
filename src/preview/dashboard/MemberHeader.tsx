import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// §1.4 — sticky member header. Shared chrome for dashboard / sessions / document / etc.
// Mount below the orange preview banner so both are visible in the prototype.

export default function MemberHeader({ firstName = 'Sarah', email = 'sarah@example.com' }: { firstName?: string; email?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const initials = (firstName?.[0] || email[0] || '?').toUpperCase()

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('click', onClickOutside)
    return () => window.removeEventListener('click', onClickOutside)
  }, [])

  return (
    <header className="sticky top-10 z-40 bg-cream/90 backdrop-blur-sm border-b border-border/60">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/preview/dashboard" className="flex items-baseline gap-2">
          <span className="font-display text-[20px] text-forest tracking-tight">The Hormone Method</span>
          <span className="font-mono text-[10px] text-slate tracking-widest uppercase hidden sm:inline">
            by Dr. Shilpa Saxena
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/preview/sessions/1" className="text-[13px] text-slate hover:text-forest hidden sm:block">
            Sessions
          </Link>
          <Link to="/preview/resources" className="text-[13px] text-slate hover:text-forest hidden sm:block">
            Resources
          </Link>
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="w-8 h-8 rounded-full bg-forest text-cream text-[13px] font-medium flex items-center justify-center"
              aria-label="Account menu"
            >
              {initials}
            </button>
            {open && (
              <div className="absolute right-0 top-10 w-44 bg-white border border-border rounded-xl shadow-sm py-1 z-50">
                <Link
                  to="/preview/account"
                  className="block px-4 py-2 text-[13px] text-forest hover:bg-sand/60"
                >
                  Account
                </Link>
                <Link
                  to="/preview/document"
                  className="block px-4 py-2 text-[13px] text-forest hover:bg-sand/60"
                >
                  Your document
                </Link>
                <hr className="border-border/60 my-1" />
                <button
                  onClick={() => setOpen(false)}
                  className="block w-full text-left px-4 py-2 text-[13px] text-slate hover:bg-sand/60"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
