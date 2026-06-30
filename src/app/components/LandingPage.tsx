import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ChevronRight, 
  Radar, 
  Users, 
  Wand2, 
  BarChart3, 
  Search, 
  Sparkles, 
  Share2, 
  Zap,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Database,
  Laptop,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  Gamepad2,
  Briefcase,
  Gauge,
  ShieldCheck,
  ArrowRight,
  Star,
  Rocket,
  Globe,
  Target,
  Layout,
  Eye,
  MessageCircle,
  Heart,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  PlayCircle,
  Clock
} from 'lucide-react';


const StageConnector = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed left-[50%] top-0 bottom-0 w-[2px] bg-white/5 hidden lg:block transform -translate-x-1/2 z-0">
      <motion.div 
        className="w-full bg-gradient-to-b from-[#2563EB] via-[#7C3AED] to-[#2563EB] origin-top h-full shadow-[0_0_30px_rgba(37,99,235,0.3)]"
        style={{ scaleY }}
      />
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#2563EB] rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)] z-10"
        style={{ 
          top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) 
        }}
      />
    </div>
  );
};

const Section = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => (
  <section className={`min-h-screen w-full flex flex-col items-center justify-center relative snap-start ${className}`}>
    {children}
  </section>
);

const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#2563EB]/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const LandingPage = ({ onStart }: { onStart: () => void }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div 
      ref={containerRef}
      className="bg-[#050505] text-white overflow-x-hidden selection:bg-[#2563EB]/30 font-sans"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Global Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a0a1a] via-[#050505] to-[#000000]" />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-12 py-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1E40AF] flex items-center justify-center shadow-lg shadow-[#2563EB]/20">
              <Laptop size={20} className="text-white" />
            </div>
            <span
              className="text-xl font-bold tracking-tight text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Lenovo<span className="text-[#2563EB]">AI</span>
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Products</a>
            <a href="#" className="hover:text-white transition-colors">Solutions</a>
            <a href="#" className="hover:text-white transition-colors">AI Studio</a>
            <a href="#" className="hover:text-white transition-colors">Community</a>
          </nav>
        </div>
        <button 
          onClick={onStart}
          className="text-sm font-medium text-white/70 hover:text-white transition-all border border-white/10 hover:border-[#2563EB]/50 px-5 py-2.5 rounded-full backdrop-blur-md bg-white/5 hover:bg-[#2563EB]/10 flex items-center gap-2 group"
        >
          <span>Launch Campaign</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </header>

      {/* Flow Line */}
      <StageConnector scrollYProgress={scrollYProgress} />

      {/* --- HERO SECTION --- */}
      <Section className="z-10 pt-20">
        <FloatingParticles />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-5xl px-6 relative"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2563EB]/10 rounded-full blur-[150px] -z-10 animate-pulse" />
          
          <div className="relative inline-block">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 border border-[#2563EB]/30 mb-8 backdrop-blur-xl"
            >
              <Sparkles size={14} className="text-[#2563EB]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">AI-Powered Influencer Marketing</span>
            </motion.div>
          </div>

          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Discover. Create.
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB]">
              Dominate.
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Lenovo's all-in-one influencer marketing platform. Find the perfect creators, 
            generate AI-powered content, and track campaign performance in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px -5px rgba(37,99,235,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="h-14 px-8 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white text-base font-bold rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.6)] transition-all flex items-center gap-3 cursor-pointer relative z-20"
            >
              Start Your Campaign <ChevronRight size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-8 bg-white/5 border border-white/10 text-white/70 text-base font-medium rounded-full hover:bg-white/10 transition-all flex items-center gap-3 cursor-pointer relative z-20 backdrop-blur-sm"
            >
              <PlayCircle size={18} /> Watch Demo
            </motion.button>
          </div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-white/5"
          >
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <ShieldCheck size={16} className="text-[#2563EB]" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <BrainCircuit size={16} className="text-[#2563EB]" />
              <span>AI-Powered Matching</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <TrendingUp size={16} className="text-[#2563EB]" />
              <span>Real-Time Analytics</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
        </motion.div>
      </Section>

      {/* --- DISCOVER STAGE --- */}
      <Section className="z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full max-w-[90%] mx-auto items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right space-y-6 order-2 lg:order-1"
          >
            <div className="inline-flex items-center justify-center lg:justify-end gap-3 text-blue-400 font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> 01. INTELLIGENT DISCOVERY
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Find <span className="text-blue-400">Your</span> Perfect Creators
            </h2>
            <p className="text-xl text-white/70 font-light">AI-driven influencer discovery</p>
            <p className="text-white/50 leading-relaxed max-w-md ml-auto">
              Lenovo's AI engine scans millions of creators to find the perfect match for your brand. 
              Filter by audience, engagement, content style, and more.
            </p>
            <div className="flex flex-wrap gap-3 justify-end">
              {['Real-time Analytics', 'Audience Insights', 'Brand Safety'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="relative h-[500px] w-full flex items-center justify-center order-1 lg:order-2">
            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[100px]" />
            
            {/* Central Scanner */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ margin: "-20%" }}
              className="relative w-64 h-64"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-blue-500/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-blue-500/10"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/50 backdrop-blur-md">
                  <Radar size={40} className="text-blue-400 animate-pulse" />
                </div>
              </div>
              
              {/* Floating Data Points */}
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-blue-400/60"
                  animate={{
                    x: [0, Math.cos(i * 1.2) * 80, 0],
                    y: [0, Math.sin(i * 1.2) * 80, 0],
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </motion.div>

            {/* Result Cards */}
            {[
              { name: 'TechReview Pro', match: '98%', platform: 'YouTube' },
              { name: 'Creative Studio', match: '95%', platform: 'Instagram' },
              { name: 'Gaming Guru', match: '92%', platform: 'TikTok' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -100 : i === 1 ? 100 : 0, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ margin: "-20%" }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
                className={`absolute p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg w-56 ${
                  i === 0 ? 'top-0 left-0' : 
                  i === 1 ? 'top-0 right-0' : 
                  'bottom-0 left-1/2 -translate-x-1/2'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Users size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-white/40">{item.platform}</div>
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Match</span>
                  <span className="text-green-400">{item.match}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- RECOMMEND STAGE --- */}
      <Section className="z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full max-w-[90%] mx-auto items-center">
          <div className="relative h-[500px] w-full flex items-center justify-center order-1">
            <div className="absolute inset-0 bg-purple-500/5 rounded-full blur-[100px]" />
            
            {/* AI Core */}
            <div className="relative w-64 h-64">
              {/* Orbiting Platforms */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {['YouTube', 'Instagram', 'TikTok', 'Twitter'].map((platform, i) => {
                  const angle = (i / 4) * Math.PI * 2;
                  const radius = 100;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <motion.div
                      key={platform}
                      className="absolute w-12 h-12 rounded-full bg-[#1a1a2e] border border-purple-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                      style={{
                        left: `calc(50% + ${x}px - 24px)`,
                        top: `calc(50% + ${y}px - 24px)`,
                      }}
                    >
                      {platform === 'YouTube' && <Youtube size={20} className="text-red-500" />}
                      {platform === 'Instagram' && <Instagram size={20} className="text-pink-500" />}
                      {platform === 'TikTok' && <span className="text-white text-xl font-bold">♪</span>}
                      {platform === 'Twitter' && <Twitter size={20} className="text-white" />}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Center AI */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 30px rgba(168,85,247,0.3)',
                      '0 0 60px rgba(168,85,247,0.5)',
                      '0 0 30px rgba(168,85,247,0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex flex-col items-center justify-center backdrop-blur-md"
                >
                  <BrainCircuit size={32} className="text-purple-400" />
                  <span className="text-[8px] font-bold text-white/60 mt-1">AI MATCH</span>
                </motion.div>
              </div>
            </div>

            {/* Recommendation Cards */}
            {[
              { title: 'Algorithm Match', value: '94%', color: 'purple' },
              { title: 'Brand Alignment', value: '89%', color: 'blue' },
              { title: 'Audience Fit', value: '97%', color: 'green' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i < 2 ? (i === 0 ? -80 : 80) : 0, y: i === 2 ? 80 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ margin: "-20%" }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
                className={`absolute p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg w-48 ${
                  i === 0 ? 'top-0 left-0' : 
                  i === 1 ? 'top-0 right-0' : 
                  'bottom-0 left-1/2 -translate-x-1/2'
                }`}
              >
                <div className="text-xs text-white/40 mb-1">{item.title}</div>
                <div className={`text-2xl font-bold text-${item.color}-400`}>{item.value}</div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6 order-2"
          >
            <div className="inline-flex items-center justify-center lg:justify-start gap-3 text-purple-400 font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span> 02. AI-POWERED RECOMMENDATIONS
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Smart <span className="text-purple-400">Matches</span>,<br />Better Results
            </h2>
            <p className="text-xl text-white/70 font-light">Data-driven creator recommendations</p>
            <p className="text-white/50 leading-relaxed max-w-md">
              Our AI analyzes millions of data points to recommend the perfect creators for your 
              campaign. Get detailed insights on audience overlap, engagement quality, and projected ROI.
            </p>
            <div className="flex flex-wrap gap-3">
              {['ROI Predictions', 'Audience Overlap', 'Engagement Quality'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* --- CREATE STAGE --- */}
      <Section className="z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full max-w-[90%] mx-auto items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right space-y-6 order-2 lg:order-1"
          >
            <div className="inline-flex items-center justify-center lg:justify-end gap-3 text-pink-400 font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span> 03. GENERATIVE CREATION
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Create <span className="text-pink-400">Smarter</span>,<br />Not Harder
            </h2>
            <p className="text-xl text-white/70 font-light">AI-powered content generation</p>
            <p className="text-white/50 leading-relaxed max-w-md ml-auto">
              Generate compelling scripts, briefs, and creative assets automatically. 
              Our AI understands your brand voice and campaign goals to create content that resonates.
            </p>
            <div className="flex flex-wrap gap-3 justify-end">
              {['Script Generation', 'Asset Creation', 'Brand Voice'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="relative h-[500px] w-full flex items-center justify-center order-1 lg:order-2">
            <div className="absolute inset-0 bg-pink-500/5 rounded-full blur-[100px]" />
            
            {/* Workspace Interface */}
            <motion.div
              initial={{ rotateY: -5, rotateX: 5, opacity: 0, scale: 0.95 }}
              whileInView={{ rotateY: 0, rotateX: 0, opacity: 1, scale: 1 }}
              viewport={{ margin: "-20%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 w-full max-w-2xl"
            >
              {/* Mock UI Window */}
              <div className="bg-[#0a0a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 text-center text-xs text-white/20">Creative Studio</div>
                </div>
                
                {/* Content Area */}
                <div className="p-6 space-y-4">
                  {/* Script Preview */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Wand2 size={16} className="text-pink-400" />
                      <span className="text-xs font-medium text-white/60">AI-Generated Script</span>
                    </div>
                    <div className="space-y-2 text-sm text-white/40">
                      <div className="h-2 w-full bg-white/5 rounded" />
                      <div className="h-2 w-5/6 bg-white/5 rounded" />
                      <div className="h-2 w-4/6 bg-white/5 rounded" />
                      <div className="flex gap-2 mt-2">
                        <div className="h-2 w-16 bg-pink-500/20 rounded" />
                        <div className="h-2 w-12 bg-pink-500/10 rounded" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-white/30 mb-1">
                        <span>Generating assets</span>
                        <span>78%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ x: ['-100%', '0%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="h-full w-1/2 bg-gradient-to-r from-pink-500 to-purple-500"
                        />
                      </div>
                    </div>
                    <div className="text-xs text-pink-400 animate-pulse">● Processing</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* --- MONITOR STAGE --- */}
      <Section className="z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full max-w-[90%] mx-auto items-center">
          <div className="relative h-[500px] w-full flex items-center justify-center order-1">
            <div className="absolute inset-0 bg-[#2563EB]/5 rounded-full blur-[100px]" />
            
            {/* Analytics Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md bg-[#0a0a1a] border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm font-medium text-white/60">Campaign Performance</div>
                <div className="flex items-center gap-1 text-[#2563EB] text-sm">
                  <TrendingUp size={14} /> +24.5%
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-32 flex items-end gap-1.5 mb-6">
                {[30, 55, 40, 75, 60, 90, 85, 70, 95, 80].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ margin: "-20%" }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-[#2563EB]/20 to-[#2563EB] rounded-t-sm"
                  />
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                {[
                  { label: 'Reach', value: '2.4M', change: '+12%' },
                  { label: 'Engagement', value: '8.2%', change: '+3%' },
                  { label: 'Revenue', value: '$124K', change: '+18%' }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xs text-white/30">{stat.label}</div>
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] text-green-400">{stat.change}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6 order-2"
          >
            <div className="inline-flex items-center justify-center lg:justify-start gap-3 text-[#2563EB] font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span> 04. REAL-TIME MONITORING
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Track, <span className="text-[#2563EB]">Optimize</span>,<br />Scale
            </h2>
            <p className="text-xl text-white/70 font-light">Data-driven campaign optimization</p>
            <p className="text-white/50 leading-relaxed max-w-md">
              Monitor campaign performance in real-time. Get actionable insights to optimize 
              your strategy and maximize ROI. Every data point feeds back into the AI engine.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Real-time Analytics', 'ROI Tracking', 'Performance Alerts'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* --- UNIFIED PLATFORM --- */}
      <Section className="bg-gradient-to-t from-[#0a0a1a] to-transparent z-10 !min-h-[80vh] pb-32">
        <div className="text-center space-y-12 relative z-10 max-w-4xl px-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-2xl flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.3)]">
              <Rocket size={40} className="text-white" />
            </div>
          </motion.div>

          <h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">All-in-One</span> Platform
          </h2>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            From discovery to creation and monitoring, Lenovo's AI-powered platform 
            streamlines your entire influencer marketing workflow. No silos. No friction. Just results.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8">
            {[
              { icon: <Radar size={20} />, label: 'Discovery' },
              { icon: <BrainCircuit size={20} />, label: 'AI Matching' },
              { icon: <Wand2 size={20} />, label: 'Creation' },
              { icon: <BarChart3 size={20} />, label: 'Analytics' }
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="flex justify-center mb-2 text-[#2563EB]">{item.icon}</div>
                <div className="text-xs font-medium text-white/60">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(37,99,235,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="h-14 px-10 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold text-base rounded-full shadow-xl hover:shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all flex items-center gap-3 mx-auto"
            >
              Launch Your Campaign <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default LandingPage;