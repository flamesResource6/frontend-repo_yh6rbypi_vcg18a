import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Scene */}
      <div className="absolute inset-0 opacity-70">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-slate-950/60" />

      {/* Floating glow orbs (dark) */}
      <style>{`
        @keyframes float1 { 0% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-20px) translateX(10px); } 100% { transform: translateY(0) translateX(0); } }
        @keyframes float2 { 0% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-12px) translateX(-12px); } 100% { transform: translateY(0) translateX(0); } }
        @keyframes float3 { 0% { transform: translateY(0) translateX(0); } 50% { transform: translateY(16px) translateX(-8px); } 100% { transform: translateY(0) translateX(0); } }
      `}</style>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] left-[12%] w-48 h-48 rounded-full bg-fuchsia-500/20 blur-2xl" style={{ animation: 'float1 8s ease-in-out infinite' }} />
        <div className="absolute top-[20%] right-[18%] w-40 h-40 rounded-full bg-indigo-500/20 blur-2xl" style={{ animation: 'float2 10s ease-in-out infinite' }} />
        <div className="absolute bottom-[15%] left-[25%] w-56 h-56 rounded-full bg-cyan-500/15 blur-2xl" style={{ animation: 'float3 12s ease-in-out infinite' }} />
        <div className="absolute bottom-[10%] right-[8%] w-48 h-48 rounded-full bg-rose-500/15 blur-2xl" style={{ animation: 'float1 11s ease-in-out infinite' }} />
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl" style={{ animation: 'float2 9s ease-in-out infinite' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm mb-4 border border-white/10 backdrop-blur">
          AI Voice Agent & Automation
        </div>

        {/* Decorative purple glow behind the heading */}
        <div className="relative inline-block">
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-purple-500/30 blur-3xl" />
          </div>
          <h1 className="relative text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            ROI Calculators
          </h1>
        </div>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          Estimate the impact of an AI voice agent and process automation on your bottom line. Adjust inputs and see ROI instantly — with clear visuals.
        </p>
      </div>
    </section>
  );
}
