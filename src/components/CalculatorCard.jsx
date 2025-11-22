import { useMemo } from 'react';

function Gauge({ value, label, color = '#22c55e', light = false }) {
  const clamped = Math.max(0, Math.min(100, value));
  const angle = useMemo(() => (clamped / 100) * 180, [clamped]);
  const gradientId = `grad-${Math.round(clamped)}-${label}`;

  const baseTrack = light ? '#e5e7eb' : '#1f2937';
  const textMain = light ? '#0f172a' : '#ffffff';
  const textSub = light ? '#475569' : '#cbd5e1';

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
        <path d="M10 110 A 90 90 0 0 1 190 110" fill="none" stroke={baseTrack} strokeWidth="16" strokeLinecap="round" />
        <path d="M10 110 A 90 90 0 0 1 190 110" fill="none" stroke={`url(#${gradientId})`} strokeWidth="16" strokeLinecap="round"
          strokeDasharray="282.6" strokeDashoffset={282.6 - (282.6 * clamped) / 100} />
        <g transform={`translate(100,110) rotate(${angle - 90})`}>
          <line x1="0" y1="0" x2="70" y2="0" stroke={textMain} strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="0" r="6" fill={textMain} />
        </g>
        <text x="100" y="80" textAnchor="middle" fontSize="28" fill={textMain} fontWeight="700">{Math.round(clamped)}%</text>
        <text x="100" y="100" textAnchor="middle" fontSize="12" fill={textSub}>{label}</text>
      </svg>
    </div>
  );
}

export default function CalculatorCard({ title, description, inputs, compute, theme = 'light', onExport }) {
  const isLight = theme === 'light';
  return (
    <div className={`rounded-2xl p-6 shadow-xl relative overflow-hidden border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-800/60 border-white/10 backdrop-blur'}`}>
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-tr from-fuchsia-500/15 via-indigo-500/15 to-cyan-400/15 rounded-full blur-2xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={`text-xl font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{title}</h3>
            <p className={`${isLight ? 'text-slate-600' : 'text-slate-300/80'} mt-1 text-sm`}>{description}</p>
          </div>
          {onExport && (
            <button
              onClick={onExport}
              className={`shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition ${isLight ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50' : 'border-white/20 bg-slate-900/40 text-white hover:bg-slate-900/60'}`}
              aria-label="Export CSV"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {inputs.map((inp) => (
            <div key={inp.key} className="flex flex-col">
              <label className={`${isLight ? 'text-slate-700' : 'text-slate-200'} text-sm mb-1`}>{inp.label}</label>
              <input
                type="number"
                inputMode="decimal"
                defaultValue={inp.defaultValue || 0}
                step={inp.step || 1}
                min={inp.min ?? 0}
                onChange={(e) => inp.onChange(parseFloat(e.target.value) || 0)}
                className={`${isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900/60 border-white/10 text-white'} border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
              />
            </div>
          ))}
        </div>

        <Results inputs={inputs} compute={compute} light={isLight} />
      </div>
    </div>
  );
}

function currency(n) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function Results({ inputs, compute, light }) {
  const data = compute();
  const { savingsPct, annualSavings, paybackMonths, headline } = data;

  return (
    <div className="mt-8 grid lg:grid-cols-2 gap-6 items-center">
      <div className="space-y-3">
        <div className={`text-3xl font-bold ${light ? 'text-slate-900' : 'text-white'}`}>{headline}</div>
        <div className={`${light ? 'text-slate-600' : 'text-slate-300'}`}>Estimated annual savings: <span className={`font-semibold ${light ? 'text-slate-900' : 'text-white'}`}>{currency(annualSavings)}</span></div>
        <div className={`${light ? 'text-slate-600' : 'text-slate-300'}`}>Payback period: <span className={`font-semibold ${light ? 'text-slate-900' : 'text-white'}`}>{Math.max(0, paybackMonths).toFixed(1)} months</span></div>
      </div>
      <div className="">
        <Gauge value={savingsPct} label="Estimated ROI" light={light} />
      </div>
    </div>
  );
}
