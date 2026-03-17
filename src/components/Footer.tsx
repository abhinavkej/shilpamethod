export default function Footer() {
  return (
    <footer className="bg-deep text-white py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="font-display text-xl">The Hormone Method</div>
          <div className="font-mono text-[11px] opacity-40 mt-1">
            Dr. Shilpa Saxena &middot; Dr. Tara Scott &middot; shilpamethod.com
          </div>
          <div className="font-body text-[13px] opacity-50 mt-2">
            In partnership with Forum Health and PreventiveHealth.ai
          </div>
        </div>
        <div className="font-body text-[12px] opacity-40 max-w-[320px] leading-relaxed">
          For educational purposes only. This program does not establish a physician-patient
          relationship and does not constitute medical advice. Lab recommendations are educational
          suggestions — ordering, interpretation, and clinical decisions require a licensed provider.
        </div>
      </div>
    </footer>
  )
}
