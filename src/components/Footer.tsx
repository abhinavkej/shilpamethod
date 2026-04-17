// {{CONSENT_LANGUAGE_FINAL}} — final legal consent language still being drafted.
const CONSENT_LANGUAGE_FINAL = '{{CONSENT_LANGUAGE_FINAL}}'

export default function Footer() {
  return (
    <footer className="bg-forest text-cream py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-10 mb-12">
          <div>
            <div className="font-display text-[28px] text-cream mb-1">Shilpa Method</div>
            <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-4">
              Boot Camp · shilpamethod.com
            </div>
            <p className="text-body-sm text-cream/70 leading-relaxed max-w-[380px]">
              A live, 3-day program with Dr. Shilpa Saxena, MD. In partnership with
              Forum Health and PreventiveHealth.ai.
            </p>
          </div>

          <div>
            <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-4">
              Explore
            </div>
            <ul className="space-y-2 text-body-sm text-cream/80">
              <li><a href="#document" className="hover:text-cream">The Document</a></li>
              <li><a href="#program" className="hover:text-cream">Program</a></li>
              <li><a href="#cohorts" className="hover:text-cream">Cohorts</a></li>
              <li><a href="#coach-kai" className="hover:text-cream">Coach Kai</a></li>
              <li><a href="#registration" className="hover:text-cream">Reserve</a></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-4">
              Contact
            </div>
            <ul className="space-y-2 text-body-sm text-cream/80">
              <li>hello@shilpamethod.com</li>
              <li>coachkai@shilpamethod.com</li>
            </ul>
          </div>
        </div>

        <hr className="border-cream/10 mb-8" />

        <div className="grid md:grid-cols-2 gap-8 text-[12px] text-cream/50 leading-relaxed">
          <div>
            <div className="font-mono text-[10px] text-cream/50 tracking-widest uppercase mb-2">
              Educational, not medical
            </div>
            <p>
              Shilpa Method Boot Camp is educational guidance, not medical advice.
              Participation does not establish a physician-patient relationship. Clinical
              concerns should be directed to your healthcare provider. Lab recommendations are
              educational suggestions — ordering, interpretation, and clinical decisions require
              a licensed provider in your jurisdiction.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] text-cream/50 tracking-widest uppercase mb-2">
              Consent
            </div>
            <p>
              By registering, you consent to receive program communications and educational
              materials.
            </p>
            <p className="mt-3 font-mono text-[10px] text-cream/30 italic">
              {CONSENT_LANGUAGE_FINAL}
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/10 flex justify-between items-center text-[11px] text-cream/40">
          <span>© 2026 Shilpa Method Boot Camp</span>
          <span className="font-mono tracking-widest uppercase">Made in collaboration with Forum Health</span>
        </div>
      </div>
    </footer>
  )
}
