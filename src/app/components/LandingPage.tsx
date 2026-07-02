import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  ShieldCheck,
  BrainCircuit,
  TrendingUp,
  ArrowRight,
  PlayCircle
} from 'lucide-react';
import { activeBrand } from '../data/brandConfig';

const LandingPage = ({ onStart }: { onStart: () => void }) => {
  // Pulling the creatives directly from the config
  const mainHeroBg = activeBrand.landingPageCreatives?.[0] || '';
  const secondaryHeroBg = activeBrand.landingPageCreatives?.[1] || mainHeroBg;

  return (
    <div 
      className="h-screen w-screen bg-[#050505] text-white overflow-hidden selection:bg-[#2563EB]/30 font-sans flex flex-col relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* --- SIDE-BY-SIDE IMAGE BACKGROUND --- */}
      <div className="absolute inset-0 z-0 flex w-full h-full">
        {/* Left Half */}
        <div className="w-1/2 h-full relative">
          {mainHeroBg && (
            <img
              src={mainHeroBg}
              alt="Creative Left"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          )}
        </div>
        
        {/* Right Half */}
        <div className="w-1/2 h-full relative">
          {secondaryHeroBg && (
            <img
              src={secondaryHeroBg}
              alt="Creative Right"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          )}
        </div>
        
        {/* Unified Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/90 via-black/40 to-[#050505]" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-12 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={activeBrand.vendorLogo} 
              alt={activeBrand.vendorName} 
              className="h-10 w-auto object-contain" 
            />
            <span
              className="text-xl font-bold tracking-tight text-white border-l border-white/20 pl-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {activeBrand.platformName}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-white/20 pr-6">
            <img 
              src={activeBrand.parentLogo} 
              alt={activeBrand.parentCompany} 
              className="h-10 w-auto object-contain" 
            />
            <img 
              src={activeBrand.brandLogoLight} 
              alt={activeBrand.brandName} 
              className="h-10 w-auto object-contain" 
            />
          </div>
          <button 
            onClick={onStart}
            className="text-sm font-medium text-white/90 hover:text-white transition-all border border-white/20 hover:border-[#2563EB]/80 px-5 py-2.5 rounded-full backdrop-blur-md bg-white/10 hover:bg-[#2563EB]/20 flex items-center gap-2 group"
          >
            <span>Launch Campaign</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-6 pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-5xl relative"
        >
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6 drop-shadow-2xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-white drop-shadow-lg">
              Insight. Influence.
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#60A5FA] drop-shadow-lg">
              Impact.
            </span>
          </h1>

          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md">
            {activeBrand.brandName}'s end-to-end social intelligence platform. Track hair care trends across {activeBrand.primaryMarkets.join(' and ')}, find the perfect creators, and optimize campaigns from insight to impact.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px -5px rgba(37,99,235,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="h-14 px-8 bg-[#2563EB] hover:bg-[#1E40AF] text-white text-base font-bold rounded-full shadow-lg transition-all flex items-center gap-3 cursor-pointer"
            >
              Explore Consumer Insights <ChevronRight size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-8 bg-white/10 border border-white/20 text-white text-base font-medium rounded-full hover:bg-white/20 transition-all flex items-center gap-3 cursor-pointer backdrop-blur-md"
            >
              <PlayCircle size={18} /> Watch Demo
            </motion.button>
          </div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-white/20"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <ShieldCheck size={18} className="text-[#60A5FA]" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <BrainCircuit size={18} className="text-[#60A5FA]" />
              <span>AI-Powered Matching</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <TrendingUp size={18} className="text-[#60A5FA]" />
              <span>Real-Time Analytics</span>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default LandingPage;