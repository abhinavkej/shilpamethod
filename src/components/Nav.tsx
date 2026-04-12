import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-border/60'
          : 'bg-white/0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <span className="text-[15px] font-medium text-primary tracking-tight">
          The Shilpa Method
        </span>
        <button
          onClick={scrollToRegistration}
          className="bg-primary text-white text-body-sm px-5 py-2 rounded-full hover:bg-accent-hover transition-colors"
        >
          Reserve your spot
        </button>
      </div>
    </nav>
  )
}
