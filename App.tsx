import React from 'react';
import { VALIDATION_METHODS } from './constants';
import MethodCard from './components/MethodCard';
import Timeline from './components/Timeline';
import ImageAnalyzer from './components/ImageAnalyzer';
import { Lightbulb, Layout, TrendingUp, Users, Activity, Layers } from 'lucide-react';

const App: React.FC = () => {
  // Group methods by category
  const technicalMethods = VALIDATION_METHODS.filter(m => m.category === 'technical');
  const marketMethods = VALIDATION_METHODS.filter(m => m.category === 'market');
  const businessMethods = VALIDATION_METHODS.filter(m => m.category === 'business');
  const uxMethods = VALIDATION_METHODS.filter(m => m.category === 'ux');
  const testingMethods = VALIDATION_METHODS.filter(m => m.category === 'testing');

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-800">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 max-w-6xl pt-8">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 p-8 md:p-16 text-center text-white bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-white/10 via-transparent to-white/5 rotate-45 animate-shimmer pointer-events-none"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-6 tracking-tight drop-shadow-sm">
              Project Validation Guide
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed font-light">
              Master the art of de-risking your ideas. Explore 20+ proven methods and use AI to identify techniques from screenshots.
            </p>
          </div>
        </div>

        {/* AI Analysis Section */}
        <section className="mb-16 scroll-mt-24" id="analyze">
          <ImageAnalyzer />
        </section>

        {/* Timeline Section */}
        <section className="mb-20">
          <div className="glass-card rounded-3xl p-6 md:p-10">
             <SectionHeader icon={Layers} title="Mobile App Development: Idea to Launch" />
             <p className="text-slate-600 text-lg mb-8 max-w-3xl leading-relaxed">
               A comprehensive roadmap for transforming your mobile app concept into a market-ready product through structured phases and strategic validation.
             </p>
             <Timeline />
          </div>
        </section>

        {/* Technical Validation Methods */}
        <section className="mb-16">
          <SectionHeader icon={Layout} title="Technical Validation Methods" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalMethods.map((method, idx) => (
              <MethodCard key={method.id} method={method} delayIndex={idx} />
            ))}
          </div>
        </section>

        {/* Market Validation Methods */}
        <section className="mb-16">
          <SectionHeader icon={TrendingUp} title="Market Validation Methods" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketMethods.map((method, idx) => (
              <MethodCard key={method.id} method={method} delayIndex={idx} />
            ))}
          </div>
        </section>

        {/* Business Validation Methods */}
        <section className="mb-16">
          <SectionHeader icon={Activity} title="Business & Implementation" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessMethods.map((method, idx) => (
              <MethodCard key={method.id} method={method} delayIndex={idx} />
            ))}
          </div>
        </section>

        {/* UX Validation Methods */}
        <section className="mb-16">
          <SectionHeader icon={Users} title="UX Validation Methods" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uxMethods.map((method, idx) => (
              <MethodCard key={method.id} method={method} delayIndex={idx} />
            ))}
          </div>
        </section>

        {/* Testing Methods */}
        <section className="mb-16">
          <SectionHeader icon={Lightbulb} title="Technical Testing Methods" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testingMethods.map((method, idx) => (
              <MethodCard key={method.id} method={method} delayIndex={idx} />
            ))}
          </div>
        </section>

        {/* Decision Framework Section */}
        <section className="glass-card rounded-2xl p-8 md:p-12 text-center bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-2xl">
          <h2 className="text-3xl font-bold font-display mb-6">Ready to Validate?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Choosing the right method depends on your current stage, budget, and what risks you need to mitigate first. Start small, learn fast.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="font-bold text-indigo-300 mb-2">High Uncertainty</h3>
              <p className="text-sm text-slate-300">Focus on problem validation. Use <strong>Interviews</strong> and <strong>Paper Prototypes</strong>.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="font-bold text-purple-300 mb-2">Technical Risk</h3>
              <p className="text-sm text-slate-300">Focus on feasibility. Use <strong>Spikes</strong> and <strong>POCs</strong>.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="font-bold text-emerald-300 mb-2">Market Risk</h3>
              <p className="text-sm text-slate-300">Focus on demand. Use <strong>Landing Pages</strong> and <strong>Concierge MVPs</strong>.</p>
            </div>
          </div>
        </section>
        
        <footer className="mt-16 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Project Validation Guide. Powered by Gemini.</p>
        </footer>

      </div>
    </div>
  );
};

export default App;
