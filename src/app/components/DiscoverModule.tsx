import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  LayoutGrid, 
  List, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  Heart, 
  Smile,
  X,
  TrendingUp,
  Activity,
  FileText,
  Target,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { CampaignContext } from '../App';

// --- Types ---

interface Theme {
  id: string;
  name: string;
  sentiment: number;
  engagement: string;
  volume: string;
  type: 'Positive' | 'Critical' | 'Neutral';
  insight: string;
  verbatims: { text: string; source: string }[];
  size: number; // px - based on volume
  x: number; // %
  y: number; // %
  searchInterest?: number; // 0-100 (Trends only)
  growth?: string; // e.g. "+25%" (Trends only)
}

// --- Mock Data ---

const themes: Theme[] = [
  // Hero / Large
  {
    id: 'ai-perf',
    name: 'AI Performance',
    sentiment: 62,
    engagement: '1.5M',
    volume: '45.2K',
    type: 'Positive',
    insight: "Users are praising the NPU speed for creative workflows, specifically Adobe Premiere rendering.",
    verbatims: [
      { text: "The new NPU is a game changer! #Pro", source: "X" },
      { text: "Copilot integration is seamless.", source: "Reddit" },
      { text: "Finally, local AI that works.", source: "YouTube" }
    ],
    size: 130,
    x: 50,
    y: 40
  },
  {
    id: 'battery',
    name: 'Battery Life',
    sentiment: -15,
    engagement: '1.2M',
    volume: '38.5K',
    type: 'Critical',
    insight: "Significant concerns about battery drain during high-performance tasks on the X1 Carbon Gen 11.",
    verbatims: [
      { text: "Battery barely lasts 4 hours on load.", source: "TechForum" },
      { text: "Need better power management.", source: "Twitter" }
    ],
    size: 115,
    x: 25,
    y: 55
  },
  // Medium
  {
    id: 'keyboard',
    name: 'Keyboard Feel',
    sentiment: 92,
    engagement: '900K',
    volume: '50K',
    type: 'Positive',
    insight: "Consistent praise for the tactile feedback, maintaining the professional legacy.",
    verbatims: [
      { text: "Best keyboard in the industry, period.", source: "Reddit" }
    ],
    size: 95,
    x: 78,
    y: 35
  },
  {
    id: 'oled',
    name: 'OLED Display',
    sentiment: 85,
    engagement: '800K',
    volume: '22.1K',
    type: 'Positive',
    insight: "The new OLED panel's color accuracy is a major selling point for designers.",
    verbatims: [
      { text: "These blacks are infinite.", source: "YouTube" }
    ],
    size: 90,
    x: 65,
    y: 15
  },
  {
    id: 'thermals',
    name: 'Thermal Mgmt',
    sentiment: -25,
    engagement: '750K',
    volume: '12K',
    type: 'Critical',
    insight: "Users report throttling during heavy NPU workloads. Comparisons to MacBook Pro thermals are increasing.",
    verbatims: [
      { text: "My X1 gets too hot rendering video.", source: "Reddit" },
      { text: "Fans are spinning constantly.", source: "Forum" }
    ],
    size: 95,
    x: 65,
    y: 60
  },
  // Small
  {
    id: 'ports',
    name: 'Port Selection',
    sentiment: 5,
    engagement: '500K',
    volume: '15K',
    type: 'Neutral',
    insight: "Mixed feelings about the removal of the SD card slot on some models.",
    verbatims: [
      { text: "Why no SD card slot?", source: "Forum" }
    ],
    size: 75,
    x: 20,
    y: 25
  },
  {
    id: 'webcam',
    name: 'Webcam Quality',
    sentiment: 10,
    engagement: '450K',
    volume: '8K',
    type: 'Neutral',
    insight: "1080p is standard, but users want 4K options for executive calls.",
    verbatims: [
      { text: "Webcam is okay, not great.", source: "Twitter" }
    ],
    size: 70,
    x: 40,
    y: 10
  },
  {
    id: 'trackpoint',
    name: 'TrackPoint',
    sentiment: 45,
    engagement: '300K',
    volume: '5K',
    type: 'Neutral',
    insight: "Loyalists love it, new users are confused. Niche appeal remains strong.",
    verbatims: [
      { text: "Never remove the red dot!", source: "Reddit" }
    ],
    size: 65,
    x: 85,
    y: 55
  },
  {
    id: 'build',
    name: 'Build Quality',
    sentiment: 78,
    engagement: '600K',
    volume: '18K',
    type: 'Positive',
    insight: "Mil-spec testing marketing is resonating with enterprise buyers.",
    verbatims: [
      { text: "Feels like a tank.", source: "YouTube" }
    ],
    size: 80,
    x: 35,
    y: 70
  },
  {
    id: 'price',
    name: 'Price Point',
    sentiment: -10,
    engagement: '550K',
    volume: '25K',
    type: 'Critical',
    insight: "High entry price is a barrier for freelance creatives compared to competitors.",
    verbatims: [
      { text: "Too expensive for the specs.", source: "Twitter" }
    ],
    size: 75,
    x: 15,
    y: 68
  }
];

const marketTrends: Theme[] = [
    {
        id: 'mt-aipc',
        name: 'AI Laptops',
        sentiment: 95,
        engagement: '5M+',
        volume: '2.1M',
        type: 'Positive',
        insight: "Explosive growth in searches for 'AI PC' and 'NPU laptops' driven by Copilot+ announcements.",
        verbatims: [],
        size: 140,
        x: 60,
        y: 45,
        searchInterest: 95,
        growth: '+300%'
    },
    {
        id: 'mt-hybrid',
        name: '#HybridWork',
        sentiment: 40,
        engagement: '3.8M',
        volume: '1.2M',
        type: 'Neutral',
        insight: "Sustained interest in remote collaboration tools and noise cancellation hardware.",
        verbatims: [],
        size: 110,
        x: 30,
        y: 30,
        searchInterest: 70,
        growth: '+15%'
    },
    {
        id: 'mt-sustain',
        name: 'Green Tech',
        sentiment: 85,
        engagement: '2.2M',
        volume: '850K',
        type: 'Positive',
        insight: "Rising demand for PCR materials and repairability scores in enterprise procurement.",
        verbatims: [],
        size: 100,
        x: 75,
        y: 20,
        searchInterest: 82,
        growth: '+45%'
    },
    {
        id: 'mt-security',
        name: '#ZeroTrust',
        sentiment: -20,
        engagement: '1.8M',
        volume: '900K',
        type: 'Critical',
        insight: "Increasing anxiety around firmware attacks and supply chain security globally.",
        verbatims: [],
        size: 95,
        x: 40,
        y: 65,
        searchInterest: 88,
        growth: '+80%'
    },
    {
        id: 'mt-gaming',
        name: 'Gaming Series',
        sentiment: 70,
        engagement: '1.5M',
        volume: '600K',
        type: 'Positive',
        insight: "Crossover devices (high performance, subdued aesthetic) are trending up.",
        verbatims: [],
        size: 85,
        x: 80,
        y: 60,
        searchInterest: 65,
        growth: '+35%'
    },
    {
        id: 'mt-foldable',
        name: 'Foldable Devices',
        sentiment: 60,
        engagement: '1.2M',
        volume: '400K',
        type: 'Neutral',
        insight: "Niche but high-value segment growing at 40% YoY.",
        verbatims: [],
        size: 80,
        x: 20,
        y: 50,
        searchInterest: 55,
        growth: '+40%'
    },
    {
        id: 'mt-risc',
        name: '#RISC-V',
        sentiment: 50,
        engagement: '800K',
        volume: '300K',
        type: 'Neutral',
        insight: "Developer interest in alternative architectures is spiking.",
        verbatims: [],
        size: 70,
        x: 55,
        y: 15,
        searchInterest: 48,
        growth: '+60%'
    }
];

const globalTrendData = [
  { val: 40 }, { val: 45 }, { val: 42 }, { val: 50 }, { val: 48 }, { val: 55 }, { val: 60 }, { val: 62 }
];

// --- Components ---

interface DiscoverModuleProps {
  onNavigateToRecommend: (context: CampaignContext) => void;
  viewMode?: 'consumer-themes' | 'market-trends';
}

export const DiscoverModule: React.FC<DiscoverModuleProps> = ({ onNavigateToRecommend, viewMode = 'consumer-themes' }) => {
  // Add scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [visualMode, setVisualMode] = useState<'bubbles' | 'list'>('bubbles');
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

  const currentThemes = viewMode === 'market-trends' ? marketTrends : themes;
  const selectedTheme = currentThemes.find(t => t.id === selectedThemeId);

  const handleCreateCampaign = () => {
    if (!selectedTheme) return;
    onNavigateToRecommend({
      themeName: selectedTheme.name,
      sentiment: selectedTheme.type === 'Positive' ? 'Positive' : selectedTheme.type === 'Critical' ? 'Negative' : 'Neutral',
      insight: selectedTheme.insight,
      sourceModule: 'Discover',
      productFocus: selectedTheme.name
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] gap-4 relative pb-2 mb-4">
      
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* PART 2: THE "DENSE" THEME GALAXY */}
        <div className="flex-1 bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col border border-gray-100">
           
           {/* Compact Header / Controls */}
           <div className="px-6 py-3 border-b border-gray-100 flex justify-between items-center z-10 bg-white/90 backdrop-blur-sm h-[60px]">
             <div className="flex items-center gap-2">
               <h2 className="text-lg font-bold text-[#111111] tracking-tight">
                 {viewMode === 'market-trends' ? 'Market Trends' : 'Theme Galaxy'}
               </h2>
               {viewMode !== 'market-trends' && <span className="text-gray-400 text-xs font-medium">|</span>}
               <span className="text-gray-500 text-xs font-medium">
                 {viewMode === 'market-trends' ? '' : 'Real-time sentiment clustering'}
               </span>
             </div>
             <div className="bg-gray-100 p-1 rounded-lg flex">
               <button 
                 onClick={() => setVisualMode('bubbles')}
                 className={clsx("p-1.5 rounded-md transition-all", visualMode === 'bubbles' ? "bg-white text-[#2563EB] shadow-sm" : "text-gray-400")}
               >
                 <LayoutGrid size={16} />
               </button>
               <button 
                 onClick={() => setVisualMode('list')}
                 className={clsx("p-1.5 rounded-md transition-all", visualMode === 'list' ? "bg-white text-[#2563EB] shadow-sm" : "text-gray-400")}
               >
                 <List size={16} />
               </button>
             </div>
           </div>

           {/* Content Area */}
           <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-50/50 to-white">
              {visualMode === 'bubbles' ? (
                <div 
                    className="absolute inset-0" 
                    onClick={(e) => {
                        // Deselect if clicking background
                        if (e.target === e.currentTarget) setSelectedThemeId(null);
                    }}
                >
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>
                  
                  {/* Bubbles */}
                  {currentThemes.map((theme) => {
                    const isSelected = selectedThemeId === theme.id;
                    // Force neutral appearance for market trends as per user request (no sentiment data)
                    const isNeutral = theme.type === 'Neutral' || viewMode === 'market-trends';
                    
                    // Gradient Logic
                    let gradient = 'radial-gradient(circle at 30% 30%, #ffffff, #e5e7eb)'; // Default Neutral
                    let glowColor = 'rgba(156, 163, 175, 0.5)'; // Gray glow

                    // Custom tinted neutral for Market Trends
                    if (viewMode === 'market-trends') {
                         gradient = 'radial-gradient(circle at 30% 30%, #FFFFFF, #EFF6FF)'; // White to very subtle blue tint
                         glowColor = 'rgba(37, 99, 235, 0.15)'; // Subtle blue glow
                    }

                    if (!isNeutral) {
                        if (theme.type === 'Positive') {
                            gradient = 'radial-gradient(circle at 30% 30%, #34D399, #059669)'; // Emerald to Teal
                            glowColor = 'rgba(16, 185, 129, 0.6)';
                        }
                        if (theme.type === 'Critical') {
                            gradient = 'radial-gradient(circle at 30% 30%, #F87171, #991B1B)'; // Red to Maroon
                            glowColor = 'rgba(239, 68, 68, 0.6)';
                        }
                    }
                    
                    // Text Color Logic
                    const textColor = isNeutral ? '#333333' : '#FFFFFF';
                    const textShadow = isNeutral ? 'none' : '0 1px 2px rgba(0,0,0,0.2)';

                    return (
                      <motion.div
                        key={theme.id}
                        layoutId={`bubble-${theme.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedThemeId(theme.id);
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: isSelected ? 1.1 : 1,
                          opacity: 1,
                          // Gentle floating animation
                          y: isSelected ? 0 : [0, -4, 4, 0],
                        }}
                        whileHover={{ 
                          scale: isSelected ? 1.15 : 1.1,
                          zIndex: 50,
                          boxShadow: isSelected 
                            ? `0 0 0 4px white, 0 0 30px ${glowColor}, inset 0 2px 4px rgba(255,255,255,0.4)`
                            : `inset 0 2px 4px rgba(255,255,255,0.5), 0 12px 24px rgba(0,0,0,0.15), 0 0 20px ${glowColor}` 
                        }}
                        transition={{  
                          scale: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
                          boxShadow: { duration: 0.2 },
                          y: { duration: 4 + Math.random() * 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: Math.random() * 2 }
                        }}
                        style={{
                          position: 'absolute',
                          left: `${theme.x}%`,
                          top: `${theme.y}%`,
                          width: theme.size,
                          height: theme.size,
                          background: gradient,
                          backdropFilter: 'blur(8px)',
                          boxShadow: isSelected 
                            ? `0 0 0 3px white, 0 0 20px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.4)`
                            : `inset 0 2px 4px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.08)`,
                          borderRadius: '50%',
                          cursor: 'pointer',
                          zIndex: isSelected ? 30 : 10,
                          transform: 'translate(-50%, -50%)',
                          border: isNeutral ? '1px solid #E5E7EB' : 'none'
                        }}
                        className={clsx(
                            "flex items-center justify-center text-center p-2 group cursor-pointer",
                            !isSelected && isNeutral && "hover:border-[#999999]"
                        )}
                      >
                         <div className="relative">
                            <span 
                                style={{ color: textColor, textShadow }}
                                className="font-bold text-[11px] leading-tight pointer-events-none select-none font-inter tracking-tight block"
                            >
                            {theme.name}
                            </span>
                            {/* Volume Indicator on Bubble (Optional, or just keep clean) */}
                         </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-0 overflow-y-auto h-full relative">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                      <tr>
                        <th className="py-2 px-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">{viewMode === 'market-trends' ? 'Trend' : 'Theme'}</th>
                        <th className="py-2 px-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">{viewMode === 'market-trends' ? 'Mentions' : 'Volume'}</th>
                        <th className="py-2 px-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">{viewMode === 'market-trends' ? 'Engagements' : 'Sentiment'}</th>
                        <th className="py-2 px-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">{viewMode === 'market-trends' ? 'Growth' : 'Engagement'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentThemes.map(t => (
                        <tr 
                          key={t.id} 
                          onClick={() => setSelectedThemeId(t.id)}
                          className={clsx(
                              "cursor-pointer border-b border-gray-50 hover:bg-gray-50 transition-colors text-sm", 
                              selectedThemeId === t.id && "bg-red-50"
                          )}
                        >
                          <td className="py-3 px-4 font-bold text-[#111111]">{t.name}</td>
                          <td className="py-3 px-4 font-medium text-gray-600">
                             {t.volume}
                          </td>
                          <td className={clsx("py-3 px-4 font-bold", (viewMode !== 'market-trends' && t.type === 'Positive') ? 'text-green-600' : (viewMode !== 'market-trends' && t.type === 'Critical') ? 'text-[#2563EB]' : 'text-gray-500')}>
                            {viewMode === 'market-trends' ? t.engagement : (t.type === 'Positive' ? '+' : '') + t.sentiment}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {viewMode === 'market-trends' ? <span className="text-green-600 font-bold">{t.growth}</span> : t.engagement}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
           </div>
        </div>

        {/* PART 3: THE "SMART" INSPECTOR PANEL (High Density) */}
        <div className="w-[380px] flex-shrink-0 relative bg-white/90 backdrop-blur-xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-2xl flex flex-col overflow-hidden transition-all duration-300">
            <AnimatePresence mode="wait">
                {!selectedTheme ? (
                    // STATE A: DEFAULT (Global Brand Pulse)
                    <motion.div
                        key="global-pulse"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full bg-gradient-to-br from-white to-gray-50"
                    >
                         {/* Header */}
                        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center h-[48px]">
                            <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
                                <Activity size={18} className="text-[#2563EB]" />
                                {viewMode === 'market-trends' ? 'Market Trend Pulse' : 'Market Intelligence'}
                            </h3>
                        </div>

                        <div className="p-3 flex-1 overflow-hidden flex flex-col justify-center">
                            <div className="flex flex-col gap-2 h-full justify-between">
                                {viewMode === 'market-trends' ? (
                                    <>
                                        {/* Highlight 1 - Trends */}
                                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-colors flex flex-col justify-center h-full">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
                                            <div className="mb-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">AI Everywhere</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-[#111111] leading-[1.3]">
                                                AI-related search terms have surged <span className="font-bold">300% YoY</span>, indicating a massive shift in consumer interest.
                                            </p>
                                        </div>

                                        {/* Highlight 2 - Trends */}
                                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-colors flex flex-col justify-center h-full">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
                                            <div className="mb-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hybrid Hardware</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-[#111111] leading-[1.3]">
                                                Interest in 'Hybrid Work Laptops' remains steady, showing it's a <span className="font-bold">new baseline expectation</span>.
                                            </p>
                                        </div>

                                        {/* Highlight 3 - Trends */}
                                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-colors flex flex-col justify-center h-full">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
                                            <div className="mb-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sustainability</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-[#111111] leading-[1.3]">
                                                Green tech queries are up <span className="font-bold">45%</span>, with 'PCR Plastic' becoming a key differentiator.
                                            </p>
                                        </div>

                                        {/* Highlight 4 - Trends */}
                                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-colors flex flex-col justify-center h-full">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
                                            <div className="mb-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Security Anxiety</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-[#111111] leading-[1.3]">
                                                Searches for 'Firmware Security' are spiking, reflecting growing <span className="font-bold">enterprise concerns</span>.
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Highlight 1 - Themes */}
                                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-colors flex flex-col justify-center h-full">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
                                            <div className="mb-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">AI Performance</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-[#111111] leading-[1.3]">
                                                AI Performance dominates conversation volume (<span className="font-bold">1.5M mentions</span>) with overwhelmingly positive sentiment.
                                            </p>
                                        </div>

                                        {/* Highlight 2 - Themes */}
                                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-colors flex flex-col justify-center h-full">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
                                            <div className="mb-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Battery Life</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-[#111111] leading-[1.3]">
                                                Battery life concerns account for <span className="font-bold">25% of critical feedback</span>, specifically regarding high-load tasks.
                                            </p>
                                        </div>

                                        {/* Highlight 3 - Themes */}
                                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-colors flex flex-col justify-center h-full">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
                                            <div className="mb-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Keyboard</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-[#111111] leading-[1.3]">
                                                Keyboard satisfaction remains a brand stronghold, acting as a <span className="font-bold">primary retention driver</span>.
                                            </p>
                                        </div>

                                        {/* Highlight 4 - Themes */}
                                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-colors flex flex-col justify-center h-full">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
                                            <div className="mb-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">OLED Display</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-[#111111] leading-[1.3]">
                                                OLED Display adoption is driving a <span className="font-bold">15% increase</span> in engagement among creative professionals.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    // STATE B: SELECTED (Theme Deep Dive)
                    <motion.div
                        key="theme-detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50"
                    >
                        {/* Compact Header */}
                        <div className="px-4 pt-4 pb-3 flex justify-between items-start">
                             <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                                    {viewMode === 'market-trends' ? 'Trend Selected' : 'Focus Selected'}
                                </span>
                                <h3 className="text-xl font-bold text-[#111111] leading-tight">{selectedTheme.name}</h3>
                             </div>
                             <button 
                                onClick={() => setSelectedThemeId(null)}
                                className="p-1 text-gray-400 hover:text-[#111111] hover:bg-gray-100 rounded-md transition-colors"
                             >
                                <X size={16} />
                             </button>
                        </div>

                        {/* Sentiment & Volume Summary */}
                        <div className="px-4 pb-4 border-b border-gray-100 grid grid-cols-3 gap-2">
                             {viewMode === 'market-trends' ? (
                                <>
                                     <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 text-center">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">Mentions</div>
                                        <div className="text-sm font-bold text-[#111111]">{selectedTheme.volume}</div>
                                     </div>
                                     <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 text-center">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">Engagements</div>
                                        <div className="text-sm font-bold text-[#111111]">{selectedTheme.engagement}</div>
                                     </div>
                                     <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 text-center">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">Growth</div>
                                        <div className="text-sm font-bold text-green-600">
                                            {selectedTheme.growth || '+0%'}
                                        </div>
                                     </div>
                                </>
                             ) : (
                                <>
                                     <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 text-center">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">Volume</div>
                                        <div className="text-sm font-bold text-[#111111]">{selectedTheme.volume}</div>
                                     </div>
                                     <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 text-center">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">Engagement</div>
                                        <div className="text-sm font-bold text-[#111111]">{selectedTheme.engagement}</div>
                                     </div>
                                     <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 text-center">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase">Net Sentiment</div>
                                        <div className={clsx("text-sm font-bold", selectedTheme.type === 'Positive' ? 'text-green-600' : selectedTheme.type === 'Critical' ? 'text-[#2563EB]' : 'text-gray-500')}>
                                            {selectedTheme.type === 'Positive' ? '+' : ''}{selectedTheme.sentiment}
                                        </div>
                                     </div>
                                </>
                             )}
                        </div>

                        <div className="p-4 space-y-4 flex-1 overflow-y-auto relative">
                            
                            {/* AI Summary Card */}
                            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-1.5 mb-2 text-[#2563EB]">
                                    <Sparkles size={14} />
                                    <span className="text-[11px] font-bold uppercase tracking-wide">Market Signal</span>
                                </div>
                                <p className="text-[13px] text-[#333333] leading-snug">
                                    {selectedTheme.insight}
                                </p>
                            </div>

                            {/* Campaign Preview Logic - New! */}
                            <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                   <Target size={14} className="text-gray-600"/>
                                   <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">Recommended Focus</span>
                                </div>
                                <div className="text-xs text-gray-700 leading-relaxed mb-2">
                                   If selected, the campaign will center on:
                                </div>
                                <div className="bg-white p-2 rounded border border-gray-200 text-xs font-semibold text-[#111111]">
                                   "High-performance {selectedTheme.name.toLowerCase()}-driven productivity"
                                </div>
                            </div>
                        </div>

                        {/* CTA (Pinned Bottom) */}
                        <div className="p-4 border-t border-gray-100 mt-auto bg-white/50 backdrop-blur-sm">
                            <button 
                                onClick={handleCreateCampaign}
                                className="w-full h-12 bg-[#2563EB] hover:bg-[#1E40AF] text-white text-[14px] font-bold rounded-xl shadow-lg hover:shadow-blue-900/20 transition-all flex items-center justify-center gap-2 group"
                            >
                                <Zap size={16} fill="currentColor" />
                                Set as Campaign Focus
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="text-center mt-2">
                               <span className="text-[10px] text-gray-400">Auto-links to Recommended Strategy</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
