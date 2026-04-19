// §2.5 — faded preview of the runway dashboard behind the active onboarding cards.
// Purpose: build anticipation. She sees the shape of where she's about to land.

export default function StructuralPreview() {
  return (
    <div className="space-y-5" aria-hidden>
      {/* mock top bar + progress */}
      <div className="h-8 bg-white border border-border rounded-lg" />

      {/* mock hero card */}
      <div className="bg-white border border-border rounded-2xl p-8 h-40" />

      {/* mock three session cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-border rounded-2xl p-6 h-32" />
        ))}
      </div>

      {/* mock two side-by-side cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-border rounded-2xl p-6 h-24" />
        <div className="bg-white border border-border rounded-2xl p-6 h-24" />
      </div>

      {/* mock resources */}
      <div className="bg-white border border-border rounded-2xl p-6 h-28" />
    </div>
  )
}
