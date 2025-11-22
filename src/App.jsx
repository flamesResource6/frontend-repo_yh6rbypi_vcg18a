import Hero from './components/Hero';
import VoiceAgentCalculator from './components/VoiceAgentCalculator';
import AutomationCalculator from './components/AutomationCalculator';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />

      <main className="relative z-10 -mt-10">
        <div className="max-w-6xl mx-auto px-6 pb-24">
          <section className="grid lg:grid-cols-2 gap-6">
            <VoiceAgentCalculator />
            <AutomationCalculator />
          </section>

          <section className="mt-10 text-center text-slate-400 text-sm">
            Numbers are directional estimates. Adjust inputs to match your context.
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
