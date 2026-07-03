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
import { TrendStageBoard } from './TrendStageBoard';
import { activeBrand } from '../data/brandConfig';

// --- Theme interface ---
// NOTE: sentiment/volume/engagement/verbatims are required — every item in
// both `themes` and `marketTrends` must supply them, even if verbatims is
// an empty array. `stage` is optional and only meaningful for marketTrends.
export interface Theme {
  id: string;
  name: string;
  type: 'Positive' | 'Critical' | 'Neutral';
  sentiment: number; // -100 to 100
  volume: string;
  engagement: string;
  growth?: string; // Market Trends only, e.g. "+68%"
  insight: string;
  verbatims: { text: string; source: string }[];
  x: number;
  y: number;
  size: number;
  stage?: 'Emerging' | 'Growing' | 'Peaking' | 'Saturating'; // Market Trends only
}

// --- Consumer Themes data (Pantene / Hair Care, South Korea & Japan) ---
export const themes: Theme[] = [
  {
    id: '1',
    name: "Glass Hair (Mul-Gwang) Shine",
    type: 'Positive',
    sentiment: 88,
    volume: '210.4K',
    engagement: '58.2K',
    insight: "Consumers are chasing ultra-glossy 'glass hair' as the K-beauty extension of glass skin, driving demand for high-shine serums and glazing treatments.",
    verbatims: [
      { text: 'My hair finally has that mirror shine after switching my routine', source: 'Instagram' },
      { text: 'Everyone on my FYP is doing the glass hair oil trick', source: 'TikTok' }
    ],
    x: 15,
    y: 30,
    size: 140
  },
  {
    id: '2',
    name: "Before/After 'Miracle' Transformations",
    type: 'Positive',
    sentiment: 91,
    volume: '186.7K',
    engagement: '72.5K',
    insight: 'Transformation-format content continues to be the highest-converting creative style, with visible before/after damage-repair results driving trust and purchase intent.',
    verbatims: [
      { text: 'The difference after 4 weeks is honestly unreal', source: 'YouTube' },
      { text: 'I never believed these videos until I tried it myself', source: 'Naver Blog' }
    ],
    x: 65,
    y: 25,
    size: 130
  },
  {
    id: '3',
    name: 'Scalp Health as Skincare',
    type: 'Positive',
    sentiment: 82,
    volume: '158.3K',
    engagement: '45.1K',
    insight: 'Consumers increasingly treat scalp care as an extension of skincare, seeking serums, exfoliants, and barrier-repair language borrowed directly from facial skincare routines.',
    verbatims: [
      { text: 'I treat my scalp routine just like my face routine now', source: 'Instagram' },
      { text: 'Scalp serums are the new essence step for me', source: 'Naver Blog' }
    ],
    x: 35,
    y: 68,
    size: 125
  },
  {
    id: '4',
    name: 'Hair Fall & Breakage Anxiety',
    type: 'Critical',
    sentiment: -58,
    volume: '132.9K',
    engagement: '39.4K',
    insight: 'Rising anxiety around seasonal hair fall and breakage, amplified by humidity and heat styling, is driving urgent searches for strengthening and bond-repair solutions.',
    verbatims: [
      { text: 'My hair fall got so much worse this summer, I am panicking', source: 'TikTok' },
      { text: 'Anyone else losing way more hair than usual lately', source: 'X (Twitter)' }
    ],
    x: 80,
    y: 60,
    size: 110
  },
  {
    id: '5',
    name: 'Salon-Grade At-Home Acid Treatments',
    type: 'Positive',
    sentiment: 79,
    volume: '121.6K',
    engagement: '33.8K',
    insight: 'At-home bond and acid treatments positioned as "salon results without the salon price" are resonating strongly with budget-conscious Gen Z and millennial consumers.',
    verbatims: [
      { text: 'Saved so much money doing this treatment at home instead', source: 'YouTube' },
      { text: 'Salon results for a fraction of the cost, sold', source: 'Instagram' }
    ],
    x: 45,
    y: 15,
    size: 118
  },
  {
    id: '6',
    name: 'Humidity & Frizz Frustration',
    type: 'Critical',
    sentiment: -47,
    volume: '98.2K',
    engagement: '27.6K',
    insight: "Climate-driven frizz complaints spike seasonally across Korea and Japan's humid months, with consumers actively seeking humidity-proof styling and anti-frizz claims.",
    verbatims: [
      { text: 'The humidity destroys my hair the second I step outside', source: 'X (Twitter)' },
      { text: 'Nothing survives this weather, my hair is a frizzy mess', source: 'TikTok' }
    ],
    x: 10,
    y: 80,
    size: 95
  },
  {
    id: '7',
    name: 'Sulfate-Free & Clean Formulas',
    type: 'Positive',
    sentiment: 74,
    volume: '87.5K',
    engagement: '24.3K',
    insight: 'Ingredient-literate consumers are actively screening for sulfate-free, silicone-free, and "clean" formulation claims before purchase, especially among younger J-beauty audiences.',
    verbatims: [
      { text: 'I only buy sulfate-free now, my scalp thanks me', source: 'Instagram' },
      { text: 'Checking the ingredient list has become a habit for me', source: 'Naver Blog' }
    ],
    x: 90,
    y: 40,
    size: 105
  },
  {
    id: '8',
    name: 'GRWM Hair Routine Content',
    type: 'Positive',
    sentiment: 85,
    volume: '156.8K',
    engagement: '94.0K',
    insight: '"Get Ready With Me" hair-routine content is driving the highest engagement-to-volume ratio in the category, making it a priority creative format for influencer partnerships.',
    verbatims: [
      { text: 'Watching GRWM hair videos is basically a genre for me now', source: 'TikTok' },
      { text: 'This routine video convinced me to switch products', source: 'YouTube' }
    ],
    x: 55,
    y: 85,
    size: 122
  },
  {
    id: '9',
    name: 'Packaging & Refill Sustainability',
    type: 'Neutral',
    sentiment: 38,
    volume: '52.1K',
    engagement: '14.2K',
    insight: 'Conversation around refillable packaging and recyclability is steady but not yet a primary purchase driver — an area of interest without strong urgency behind it.',
    verbatims: [
      { text: 'Nice that its refillable but honestly I buy for results first', source: 'X (Twitter)' },
      { text: 'Wish more brands did refill pouches like this one', source: 'Instagram' }
    ],
    x: 25,
    y: 50,
    size: 88
  },
  {
    id: '10',
    name: 'Salon Professional Endorsements',
    type: 'Positive',
    sentiment: 80,
    volume: '76.4K',
    engagement: '21.9K',
    insight: 'Content featuring licensed stylists explaining product science is building disproportionate trust relative to volume, particularly among consumers wary of pure influencer marketing.',
    verbatims: [
      { text: 'I trust my hairdresser recommendation more than any ad', source: 'Naver Blog' },
      { text: 'When a real stylist explains why it works I actually listen', source: 'Instagram' }
    ],
    x: 75,
    y: 15,
    size: 100
  }
];

// --- Market Trends data (Skin Care, Beauty & Hair Care — South Korea & Japan) ---
export const marketTrends: Theme[] = [
  {
    id: 'mt1',
    name: 'Skinification of Hair Care',
    type: 'Positive',
    sentiment: 72,
    volume: '125.0K',
    engagement: '4.2M',
    growth: '+68%',
    insight: 'Hair care is adopting skincare ingredients and routines, with scalp health becoming a major focus across both Korean and Japanese beauty conversation.',
    verbatims: [],
    x: 20,
    y: 20,
    size: 130,
    stage: 'Emerging'
  },
  {
    id: 'mt2',
    name: 'Derma-Cosmetics & Barrier Repair',
    type: 'Positive',
    sentiment: 66,
    volume: '98.5K',
    engagement: '3.4M',
    growth: '+55%',
    insight: 'Consumers are prioritizing skin (and scalp) barrier health with ceramide-rich and microbiome-friendly formulations.',
    verbatims: [],
    x: 45,
    y: 30,
    size: 140,
    stage: 'Growing'
  },
  {
    id: 'mt3',
    name: 'Clean & Certified Vegan Beauty',
    type: 'Positive',
    sentiment: 61,
    volume: '73.1K',
    engagement: '2.6M',
    growth: '+47%',
    insight: 'Clean beauty is evolving with third-party certifications and vegan formulations as key differentiators, spilling into hair care claims.',
    verbatims: [],
    x: 70,
    y: 25,
    size: 125,
    stage: 'Growing'
  },
  {
    id: 'mt4',
    name: 'Glass Skin (Glass-myeok) / Translucent Complexion',
    type: 'Positive',
    sentiment: 84,
    volume: '189.3K',
    engagement: '5.1M',
    growth: '+42%',
    insight: 'The dewy, ultra-hydrated skin look continues to dominate and is the aesthetic driving the parallel "glass hair" trend.',
    verbatims: [],
    x: 30,
    y: 55,
    size: 150,
    stage: 'Peaking'
  },
  {
    id: 'mt5',
    name: 'Year-Round Advanced Sunscreen Culture',
    type: 'Positive',
    sentiment: 70,
    volume: '112.4K',
    engagement: '3.9M',
    growth: '+38%',
    insight: 'Daily SPF use has become non-negotiable, with chemical vs. physical filters gaining regulatory and consumer attention.',
    verbatims: [],
    x: 65,
    y: 65,
    size: 135,
    stage: 'Peaking'
  },
  {
    id: 'mt6',
    name: 'Inner Beauty & Nutricosmetics',
    type: 'Neutral',
    sentiment: 42,
    volume: '46.8K',
    engagement: '1.5M',
    growth: '+31%',
    insight: 'Beauty-from-within is growing steadily with ingestible collagen, vitamins, and supplements marketed for skin and hair health.',
    verbatims: [],
    x: 50,
    y: 80,
    size: 110,
    stage: 'Saturating'
  },
  {
    id: 'mt7',
    name: "J-Beauty Minimalism & 'Skip-Care'",
    type: 'Neutral',
    sentiment: 35,
    volume: '54.2K',
    engagement: '1.9M',
    growth: '+24%',
    insight: 'A less-is-more approach is gaining traction in Japan, focusing on multi-functional products and simplified routines.',
    verbatims: [],
    x: 80,
    y: 45,
    size: 100,
    stage: 'Saturating'
  },{
  id: 'mt8',
  name: 'Microbiome-Friendly Beauty',
  type: 'Positive',
  sentiment: 67,
  volume: '88.4K',
  engagement: '2.9M',
  growth: '+44%',
  insight: 'Consumers increasingly seek products that protect and balance the skin and scalp microbiome, driving demand for probiotic and postbiotic formulations.',
  verbatims: [],
  x: 15,
  y: 72,
  size: 120,
  stage: 'Growing'
},
{
  id: 'mt9',
  name: 'Waterless & Sustainable Beauty',
  type: 'Positive',
  sentiment: 63,
  volume: '59.8K',
  engagement: '2.1M',
  growth: '+41%',
  insight: 'Solid shampoos, concentrated formulations, and refillable packaging are becoming mainstream as sustainability influences purchasing decisions.',
  verbatims: [],
  x: 88,
  y: 20,
  size: 115,
  stage: 'Growing'
},
{
  id: 'mt10',
  name: 'Blue Light & Urban Pollution Protection',
  type: 'Neutral',
  sentiment: 51,
  volume: '64.5K',
  engagement: '2.0M',
  growth: '+34%',
  insight: 'Consumers are looking for products that defend against pollution and prolonged digital device exposure, especially in urban environments.',
  verbatims: [],
  x: 78,
  y: 82,
  size: 110,
  stage: 'Emerging'
},
{
  id: 'mt11',
  name: 'Personalized AI Beauty Recommendations',
  type: 'Positive',
  sentiment: 74,
  volume: '136.9K',
  engagement: '4.7M',
  growth: '+72%',
  insight: 'AI-powered skin and hair diagnostics are becoming a major driver of personalized product recommendations and shopping experiences.',
  verbatims: [],
  x: 55,
  y: 12,
  size: 145,
  stage: 'Emerging'
},
{
  id: 'mt12',
  name: 'Functional Fragrance in Hair Care',
  type: 'Neutral',
  sentiment: 46,
  volume: '42.3K',
  engagement: '1.4M',
  growth: '+22%',
  insight: 'Hair care products featuring mood-enhancing fragrances and aromatherapy-inspired experiences are gaining attention among younger consumers.',
  verbatims: [],
  x: 92,
  y: 58,
  size: 95,
  stage: 'Emerging'
},
{
  id: 'mt13',
  name: 'Anti-Hair Loss & Scalp Aging Solutions',
  type: 'Positive',
  sentiment: 79,
  volume: '171.5K',
  engagement: '5.8M',
  growth: '+58%',
  insight: 'Consumers are treating scalp aging similarly to facial aging, driving demand for clinically backed anti-hair loss ingredients and scalp serums.',
  verbatims: [],
  x: 25,
  y: 88,
  size: 150,
  stage: 'Peaking'
},
{
  id: 'mt14',
  name: 'Fermented Beauty Ingredients',
  type: 'Positive',
  sentiment: 69,
  volume: '76.2K',
  engagement: '2.5M',
  growth: '+36%',
  insight: 'Fermented botanical extracts continue to be associated with enhanced absorption and gentler formulations in both skincare and haircare.',
  verbatims: [],
  x: 60,
  y: 50,
  size: 120,
  stage: 'Growing'
},
{
  id: 'mt15',
  name: 'Premium Home Salon Experience',
  type: 'Positive',
  sentiment: 71,
  volume: '93.6K',
  engagement: '3.1M',
  growth: '+40%',
  insight: 'Consumers are investing in salon-quality masks, bond-repair treatments, and premium styling products to recreate professional results at home.',
  verbatims: [],
  x: 10,
  y: 45,
  size: 130,
  stage: 'Growing'
}
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

  React.useEffect(() => {
    if (viewMode === 'market-trends') {
      setVisualMode('list');
    } else {
      setVisualMode('bubbles');
    }
  }, [viewMode]);

  const [visualMode, setVisualMode] = useState<'bubbles' | 'list'>(viewMode === 'market-trends' ? 'list' : 'bubbles');
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [showDebugBorders, setShowDebugBorders] = useState(false);

  // Controls bubble size (0.65 = 65% of original size)
  const BUBBLE_SIZE_SCALE = 0.9;

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

  // Top 4 Market Trends by volume, used to drive the "Market Trend Pulse" panel
  const topMarketTrends = [...marketTrends]
    .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
    .slice(0, 4);

  // Top 4 Consumer Themes by volume, used to drive the "Market Intelligence" panel
  const topConsumerThemes = [...themes]
    .sort((a, b) => parseFloat(a.volume) < parseFloat(b.volume) ? 1 : -1)
    .slice(0, 4);

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] gap-4 relative pb-2 mb-4">
      
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* THEME GALAXY / MARKET TRENDS */}
        <div className="flex-1 bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col">
           
           {/* Compact Header / Controls */}
           <div className="px-6 py-3 flex justify-between items-center z-10 bg-white/90 backdrop-blur-sm h-[60px]">
             <div className="flex items-center gap-2">
               <h2 className="text-lg font-bold text-[#111111] tracking-tight">
                 {viewMode === 'market-trends' ? 'Market Trends' : 'Theme Galaxy'}
               </h2>
               {viewMode !== 'market-trends' && <span className="text-gray-400 text-xs font-medium">|</span>}
               <span className="text-gray-500 text-xs font-medium">
                 {viewMode === 'market-trends' ? '' : 'Real-time sentiment clustering'}
               </span>
             </div>
             <div className="flex items-center gap-2">
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
           </div>

           {/* Content Area */}
           <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-50/50 to-white">
              {visualMode === 'bubbles' && viewMode === 'consumer-themes' ? (
                <div 
                    className="absolute inset-0" 
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setSelectedThemeId(null);
                    }}
                >
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:30px_20px] opacity-40 pointer-events-none"></div>
                  
                  {/* Bubbles Container with padding */}
                  <div 
                    className="absolute inset-0 p-20 overflow-hidden"
                    style={{
                      border: showDebugBorders ? '3px solid blue' : 'none',
                      transform: 'scale(0.85)',
                      background: showDebugBorders ? 'rgba(0, 0, 255, 0.05)' : 'transparent'
                    }}
                  >
                    {currentThemes.map((theme) => {
                      const isSelected = selectedThemeId === theme.id;
                      const isNeutral = theme.type === 'Neutral';
                      
                      let gradient = 'radial-gradient(circle at 30% 30%, #ffffff, #e5e7eb)';
                      let glowColor = 'rgba(156, 163, 175, 0.5)';

                      if (!isNeutral) {
                          if (theme.type === 'Positive') {
                              gradient = 'radial-gradient(circle at 30% 30%, #34D399, #059669)';
                              glowColor = 'rgba(16, 185, 129, 0.6)';
                          }
                          if (theme.type === 'Critical') {
                              gradient = 'radial-gradient(circle at 30% 30%, #F87171, #991B1B)';
                              glowColor = 'rgba(239, 68, 68, 0.6)';
                          }
                      }
                      
                      const textColor = isNeutral ? '#333333' : '#FFFFFF';
                      const textShadow = isNeutral ? 'none' : '0 1px 2px rgba(0,0,0,0.2)';

                      const clampedX = Math.max(5, Math.min(95, theme.x));
                      const clampedY = Math.max(5, Math.min(95, theme.y));
                      const isClamped = theme.x !== clampedX || theme.y !== clampedY;

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
                            left: `min(max(calc(${clampedX}% - ${theme.size * BUBBLE_SIZE_SCALE / 2}px), 0px), calc(100% - ${theme.size * BUBBLE_SIZE_SCALE}px))`,
                            top: `min(max(calc(${clampedY}% - ${theme.size * BUBBLE_SIZE_SCALE / 2}px), 0px), calc(100% - ${theme.size * BUBBLE_SIZE_SCALE}px))`,
                            width: `${theme.size * BUBBLE_SIZE_SCALE}px`,
                            height: `${theme.size * BUBBLE_SIZE_SCALE}px`,
                            background: gradient,
                            backdropFilter: 'blur(8px)',
                            boxShadow: isSelected 
                              ? `0 0 0 3px white, 0 0 20px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.4)`
                              : `inset 0 2px 4px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.08)`,
                            borderRadius: '50%',
                            cursor: 'pointer',
                            zIndex: isSelected ? 30 : 10,
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
                              {showDebugBorders && isClamped && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-[8px] px-1 rounded whitespace-nowrap">
                                  clamped
                                </div>
                              )}
                              {theme.stage && (
                                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                  <span className={clsx(
                                    "text-[8px] font-bold px-1.5 py-0.5 rounded-full",
                                    theme.stage === 'Emerging' && "bg-green-100 text-green-700",
                                    theme.stage === 'Growing' && "bg-blue-100 text-blue-700",
                                    theme.stage === 'Peaking' && "bg-yellow-100 text-yellow-700",
                                    theme.stage === 'Saturating' && "bg-gray-100 text-gray-600"
                                  )}>
                                    {theme.stage}
                                  </span>
                                </div>
                              )}
                           </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ) : viewMode === 'market-trends' && visualMode === 'bubbles' ? (
                <TrendStageBoard trends={marketTrends} onSelectTrend={setSelectedThemeId} />
              ) : (
                <div className="p-0 overflow-y-auto h-full relative">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                      <tr>
                        <th className="py-2 px-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">{viewMode === 'market-trends' ? 'Trend' : 'Theme'}</th>
                        <th className="py-2 px-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">{viewMode === 'market-trends' ? 'Mentions' : 'Volume'}</th>
                        <th className="py-2 px-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">{viewMode === 'market-trends' ? 'Engagements' : 'Sentiment'}</th>
                        <th className="py-2 px-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">{viewMode === 'market-trends' ? 'Growth' : 'Engagement'}</th>
                        {viewMode === 'market-trends' && (
                          <th className="py-2 px-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Stage</th>
                        )}
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
                          {viewMode === 'market-trends' && t.stage && (
                            <td className="py-3 px-4">
                              <span className={clsx(
                                "text-[10px] font-bold px-2 py-1 rounded-full",
                                t.stage === 'Emerging' && "bg-green-100 text-green-700",
                                t.stage === 'Growing' && "bg-blue-100 text-blue-700",
                                t.stage === 'Peaking' && "bg-yellow-100 text-yellow-700",
                                t.stage === 'Saturating' && "bg-gray-100 text-gray-600"
                              )}>
                                {t.stage}
                              </span>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
           </div>
        </div>

        {/* INSPECTOR PANEL */}
        <div className="w-[380px] flex-shrink-0 relative bg-white/90 backdrop-blur-xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-2xl flex flex-col overflow-hidden transition-all duration-300">
            <AnimatePresence mode="wait">
                {!selectedTheme ? (
                    <motion.div
                        key="global-pulse"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full bg-gradient-to-br from-white to-gray-50"
                    >
                         <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center h-[48px]">
                            <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
                                <Activity size={18} className="text-[#2563EB]" />
                                {viewMode === 'market-trends' ? 'Market Trend Pulse' : 'Market Intelligence'}
                            </h3>
                        </div>

                        <div className="p-3 flex-1 overflow-hidden flex flex-col justify-center">
                            <div className="flex flex-col gap-2 h-full justify-between">
                                {viewMode === 'market-trends' ? (
                                    topMarketTrends.map((trend) => (
                                      <div key={trend.id} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-colors flex flex-col justify-center h-full">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
                                        <div className="mb-0.5">
                                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{trend.name}</span>
                                        </div>
                                        <p className="text-[11px] font-medium text-[#111111] leading-[1.3]">
                                          {trend.insight}
                                        </p>
                                      </div>
                                    ))
                                ) : (
                                    topConsumerThemes.map((theme) => (
                                      <div key={theme.id} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-colors flex flex-col justify-center h-full">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]"></div>
                                        <div className="mb-0.5">
                                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{theme.name}</span>
                                        </div>
                                        <p className="text-[11px] font-medium text-[#111111] leading-[1.3]">
                                          {theme.insight}
                                        </p>
                                      </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="theme-detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50"
                    >
                        <div className="px-4 pt-4 pb-3 flex justify-between items-start">
                             <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                                    {viewMode === 'market-trends' ? 'Trend Selected' : 'Focus Selected'}
                                </span>
                                <h3 className="text-xl font-bold text-[#111111] leading-tight">{selectedTheme.name}</h3>
                                {viewMode === 'market-trends' && selectedTheme.stage && (
                                  <span className={clsx(
                                    "text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1",
                                    selectedTheme.stage === 'Emerging' && "bg-green-100 text-green-700",
                                    selectedTheme.stage === 'Growing' && "bg-blue-100 text-blue-700",
                                    selectedTheme.stage === 'Peaking' && "bg-yellow-100 text-yellow-700",
                                    selectedTheme.stage === 'Saturating' && "bg-gray-100 text-gray-600"
                                  )}>
                                    {selectedTheme.stage}
                                  </span>
                                )}
                             </div>
                             <button 
                                onClick={() => setSelectedThemeId(null)}
                                className="p-1 text-gray-400 hover:text-[#111111] hover:bg-gray-100 rounded-md transition-colors"
                             >
                                <X size={16} />
                             </button>
                        </div>

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
                            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-1.5 mb-2 text-[#2563EB]">
                                    <Sparkles size={14} />
                                    <span className="text-[11px] font-bold uppercase tracking-wide">Market Signal</span>
                                </div>
                                <p className="text-[13px] text-[#333333] leading-snug">
                                    {selectedTheme.insight}
                                </p>
                            </div>

                            {selectedTheme.verbatims.length > 0 && (
                              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-2">
                                <div className="flex items-center gap-1.5 mb-1 text-gray-500">
                                    <MessageCircle size={14} />
                                    <span className="text-[11px] font-bold uppercase tracking-wide">What people are saying</span>
                                </div>
                                {selectedTheme.verbatims.map((v, i) => (
                                  <div key={i} className="text-[12px] text-gray-700 leading-snug border-l-2 border-gray-200 pl-2">
                                    "{v.text}" <span className="text-gray-400">— {v.source}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                   <Target size={14} className="text-gray-600"/>
                                   <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">Recommended Focus</span>
                                </div>
                                <div className="text-xs text-gray-700 leading-relaxed mb-2">
                                   If selected, the campaign will center on:
                                </div>
                                <div className="bg-white p-2 rounded border border-gray-200 text-xs font-semibold text-[#111111]">
                                   "{selectedTheme.name}-driven campaign strategy"
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-100 mt-auto bg-white/50 backdrop-blur-sm relative">
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
                            <div className="absolute right-4 bottom-4 text-[10px] text-gray-400">
                              Powered by {activeBrand.discoverPoweredBy}
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