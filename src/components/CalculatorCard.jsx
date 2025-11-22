import { useMemo } from 'react';

function Gauge({ value, label, color = '#22c55e' }) {
  const clamped = Math.max(0, Math.min(100, value));
  const angle = useMemo(() => (clamped / 100) * 180, [clamped]);
  const gradientId = `grad-${Math.round(clamped)}-${label}`;

  return (
    <div className="w-full max-w-sm mx-auto">
      <svg viewBox="0 0 200 120" className="w-full">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path d="M10 110 A 90 90 0 0 1 190 110" fill="none" stroke="#1f2937" strokeWidth="16" strokeLinecap="round" />
        <path d="M10 110 A 90 90 0 0 1 190 110" fill="none" stroke={`url(#${gradientId})`} strokeWidth="16" strokeLinecap="round"
          strokeDasharray="282.6" strokeDashoffset={282.6 - (282.6 * clamped) / 100} />
        <g transform={`translate(100,110) rotate(${angle - 90})`}>
          <line x1="0" y1="0" x2="70" y2="0" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="0" r="6" fill="white" />
        </g>
        <text x="100" y="80" textAnchor="middle" fontSize="28" fill="white" fontWeight="700">{Math.round(clamped)}%</text>
        <text x="100" y="100" textAnchor="middle" fontSize="12" fill="#cbd5e1">{label}</text>
      </svg>
    </div>
  );
}

export default function CalculatorCard({ title, description, inputs, compute }) {
  return (
    <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-tr from-fuchsia-500/20 via-indigo-500/20 to-cyan-400/20 rounded-full blur-2xl" />
      <div className="relative">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-slate-300/80 mt-1 text-sm">{description}</p>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {inputs.map((inp) => (
            <div key={inp.key} className="flex flex-col">
              <label className="text-slate-200 text-sm mb-1">{inp.label}</label>
              <input
                type="number"
                inputMode="decimal"
                defaultValue={inp.defaultValue || 0}
                step={inp.step || 1}
                min={inp.min ?? 0}
                onChange={(e) => inp.onChange(parseFloat(e.target.value) || 0)}
                className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <Results inputs={inputs} compute={compute} />
      </div>
    </div>
  );
}

function currency(n) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function Results({ inputs, compute }) {
  const data = compute();
  const { savingsPct, annualSavings, paybackMonths, headline } = data;

  return (
    <div className="mt-8 grid lg:grid-cols-2 gap-6 items-center">
      <div className="space-y-3">
        <div className="text-3xl font-bold text-white">{headline}</div>
        <div className="text-slate-300">Estimated annual savings: <span className="font-semibold text-white">{currency(annualSavings)}</span></div>
        <div className="text-slate-300">Payback period: <span className="font-semibold text-white">{Math.max(0, paybackMonths).toFixed(1)} months</span></div>
      </div>
      <div className="">
        <Gauge value={savingsPct} label="Estimated ROI" />
      </div>
    </div>
  );
}
