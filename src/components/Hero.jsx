import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/80 text-sm mb-4 border border-white/10">
          AI Voice Agent & Automation
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(139,92,246,0.35)]">
          ROI Calculators
        </h1>
        <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
          Estimate the impact of an AI voice agent and process automation on your bottom line. Adjust inputs and see ROI instantly — with clear visuals.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80" />
    </section>
  );
}
