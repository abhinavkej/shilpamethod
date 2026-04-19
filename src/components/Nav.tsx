import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/85 backdrop-blur-xl border-b border-border/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-baseline gap-2"
        >
          <span className="font-display text-[22px] text-forest tracking-tight">The Hormone Method</span>
          <span className="font-mono text-[10px] text-slate tracking-widest uppercase hidden sm:inline">
            by Forum Health
          </span>
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollTo('document')}
            className="text-[14px] text-slate hover:text-forest transition-colors hidden md:block"
          >
            The Document
          </button>
          <button
            onClick={() => scrollTo('program')}
            className="text-[14px] text-slate hover:text-forest transition-colors hidden md:block"
          >
            Program
          </button>
          <button
            onClick={() => scrollTo('cohorts')}
            className="text-[14px] text-slate hover:text-forest transition-colors hidden md:block"
          >
            Cohorts
          </button>
          <button
            onClick={() => scrollTo('registration')}
            className="bg-forest text-cream text-[14px] px-5 py-2 rounded-full hover:bg-ivy transition-colors"
          >
            Reserve your spot
          </button>
        </div>
      </div>
    </nav>
  )
}
