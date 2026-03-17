import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/80 backdrop-blur-[12px] border-b border-border/50'
          : 'bg-cream border-b border-border/50'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <div>
          <span className="font-display text-[22px] text-deep">The Hormone Method</span>
          <div className="font-mono text-[10px] text-warm tracking-[1.5px]">Dr. Shilpa Saxena & Dr. Tara Scott</div>
        </div>
        <button
          onClick={scrollToRegistration}
          className="bg-terra text-white font-body text-[13px] md:text-sm px-4 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-terra/90 transition-colors whitespace-nowrap shrink-0"
        >
          Reserve your spot &rarr;
        </button>
      </div>
    </nav>
  )
}
