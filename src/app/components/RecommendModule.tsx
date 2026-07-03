import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Target, 
  Globe, 
  Layout, 
  BarChart2, 
  CheckCircle2, 
  MapPin, 
  Zap, 
  ArrowRight,
  Users,
  Eye,
  MousePointer2,
  Lightbulb,
  Laptop,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  X,
  Share2,
  MessageCircle,
  Heart,
  TrendingUp,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Facebook,
  HelpCircle,
  CheckSquare,
  Square,
  ChevronDown,
  DollarSign,
  FileText,
  Clapperboard,
  Wand2,
  Copy,
  Download,
  PlayCircle,
  BrainCircuit,
  Check,
  Building2,
  MonitorPlay,
  ChevronUp,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  Gamepad2,
  Briefcase,
  Gauge,
  Info,
  Video,
  Clock,
  Camera,
  Bookmark,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { CampaignContext } from '../App';
import { activeBrand } from '../data/brandConfig';
import { Influencer, PerformanceMetric, InfluencerPerformance, ProductLine, ProductModel, CampaignGeography, CreatorCategory, PRODUCT_LINES, OBJECTIVES, PLATFORMS, GEOGRAPHIES, CREATOR_TIERS, PRODUCT_MODELS, REAL_INFLUENCERS, PRODUCT_DISPLAY_NAMES, PRODUCT_CONTEXTS, OBJECTIVE_GOALS, PRODUCT_OBJECTIVE_SUGGESTIONS, DEFAULT_PROMPT_SUGGESTIONS } from '../data/recommendData';

// Product data constants are imported from ../data/recommendData

// Generate prompt pills based on selected product and objective
const generatePromptPills = (product: string, objective: string): { product: string; title: string; description: string }[] => {
  const productName = PRODUCT_DISPLAY_NAMES[product];
  const productObjectives = PRODUCT_OBJECTIVE_SUGGESTIONS[product];
  
  if (product && product !== 'all' && productObjectives && productName) {
    const objectiveKey = objective && objective !== 'all-objectives' ? objective : 'awareness';
    const suggestions = productObjectives[objectiveKey] || productObjectives['awareness'];
    
    if (suggestions) {
      return suggestions.map(s => ({
        product: productName,
        title: s.title,
        description: s.description
      }));
    }
  }
  
  return DEFAULT_PROMPT_SUGGESTIONS;
};

// Generate the main description based on selections
const generateMainDescription = (product: string, objective: string): string => {
  const productName = PRODUCT_DISPLAY_NAMES[product] || product;
  const productContext = PRODUCT_CONTEXTS[product];
  const objectiveGoal = OBJECTIVE_GOALS[objective];

  if (product && product !== 'all' && objective && objective !== 'all-objectives' && productContext && objectiveGoal) {
    const audienceShort = productContext.audience.split(',')[0].trim();
    const valueShort = productContext.values.split(',').slice(0, 3).map(v => v.trim().toLowerCase()).join(', ');
    const goalLabel = objectiveGoal.goalLabel.toLowerCase();

    return `${productName} campaign targeting ${audienceShort}. Goal: increase ${goalLabel}. Messaging: ${valueShort}. Key features: ${productContext.keyFeatures.slice(0, 2).join(', ')}.`;
  }

  return "";
};

// --- Icons ---
const PlatformIcon = ({ platform, size = 20 }: { platform: string, size?: number }) => {
  switch (platform) {
    case 'Instagram': return <Instagram size={size} className="text-[#E1306C]" />;
    case 'YouTube': return <Youtube size={size} className="text-[#FF0000]" />;
    case 'TikTok': return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-black"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>;
    case 'LinkedIn': return <Linkedin size={size} className="text-[#0077B5]" />;
    case 'Twitter': 
    case 'X (Twitter)': return <Twitter size={size} className="text-[#1DA1F2]" />;
    case 'Facebook': return <Facebook size={size} className="text-[#1877F2]" />;
    default: return <Globe size={size} className="text-gray-400" />;
  }
};

// --- Format Helpers ---
const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
};

const formatFollowersWithCommas = (num: number): string => {
  return num.toLocaleString();
};

// Real influencer data is imported from ../data/recommendData

// --- Helper Functions ---
const getPlatformIcon = (platform: string, size: 'sm' | 'md' = 'sm') => {
  const sizeClass = size === 'md' ? 'h-5 w-5' : 'h-4 w-4';
  switch (platform.toLowerCase()) {
    case 'youtube': return <Youtube className={`${sizeClass} text-red-500`} />;
    case 'tiktok': return <svg className={sizeClass} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>;
    case 'instagram': return <Instagram className={`${sizeClass} text-pink-500`} />;
    default: return <Users className={sizeClass} />;
  }
};

const getSafetyBadge = (score: number) => {
  const baseClasses = "h-6 px-2.5 rounded-full text-xs font-normal inline-flex items-center";
  if (score >= 90) return <span className={`${baseClasses} bg-emerald-50 text-emerald-600`}>Excellent ({score})</span>;
  if (score >= 80) return <span className={`${baseClasses} bg-emerald-50 text-emerald-600`}>Good ({score})</span>;
  if (score >= 70) return <span className={`${baseClasses} bg-amber-50/80 text-amber-600`}>Moderate ({score})</span>;
  return <span className={`${baseClasses} bg-rose-50 text-rose-600`}>Low ({score})</span>;
};

const getRiskBadge = (risk: string) => {
  const baseClasses = "h-6 px-2.5 rounded-full text-xs font-normal inline-flex items-center gap-1.5";
  switch (risk) {
    case 'Safe':
      return <span className={`${baseClasses} bg-emerald-50 text-emerald-600`}><CheckCircle2 className="h-3 w-3" /> Safe</span>;
    case 'Moderate':
      return <span className={`${baseClasses} bg-amber-50/80 text-amber-600`}><AlertTriangle className="h-3 w-3" /> Moderate</span>;
    case 'High':
      return <span className={`${baseClasses} bg-rose-50 text-rose-600`}><AlertTriangle className="h-3 w-3" /> High</span>;
    default:
      return <span className={baseClasses}>Unknown</span>;
  }
};

// Calculate engagement breakdown
const calculateEngagementBreakdown = (followers: number, engagementRate: number) => {
  const rawEngagement = Math.round(followers * (engagementRate / 100));
  const likes = Math.round(rawEngagement * 0.65);
  const comments = Math.round(rawEngagement * 0.15);
  const shares = Math.round(rawEngagement * 0.12);
  const saves = Math.round(rawEngagement * 0.08);
  const total = likes + comments + shares + saves;
  
  return {
    total,
    totalFormatted: formatNumber(total),
    likes,
    likesFormatted: formatNumber(likes),
    comments,
    commentsFormatted: formatNumber(comments),
    shares,
    sharesFormatted: formatNumber(shares),
    saves,
    savesFormatted: formatNumber(saves),
  };
};

const generateInfluencers = (category: CreatorCategory, geo: CampaignGeography, targetPlatforms: string[]): Influencer[] => {
  let filtered = REAL_INFLUENCERS.filter(inf => inf.category === category);

  if (targetPlatforms.length > 0) {
    filtered = filtered.filter(inf => targetPlatforms.includes(inf.platform));
  }
  
  if (geo !== 'Global') {
    if (geo === 'Japan') {
      filtered = filtered.filter(inf => inf.audienceGeo.includes('Japan'));
    } else if (geo === 'South Korea') {
      filtered = filtered.filter(inf => inf.audienceGeo.includes('South Korea'));
    } else if (geo === 'Both') {
      filtered = filtered.filter(inf => inf.audienceGeo.includes('Japan') || inf.audienceGeo.includes('South Korea'));
    }
  }

  // Ensure we have at least 5 influencers
  if (filtered.length < 5) {
    const filteredIds = new Set(filtered.map(inf => inf.id));
    const fallbacks = REAL_INFLUENCERS
      .filter(inf => !filteredIds.has(inf.id))
      .sort((a, b) => b.engagementRate - a.engagementRate);
    
    for (const fb of fallbacks) {
      if (filtered.length >= 5) break;
      filtered.push(fb);
    }
  }

  return filtered.sort((a, b) => b.engagementRate - a.engagementRate);
};

// --- Influencer Detail Modal Component ---

interface InfluencerDetailModalProps {
  influencer: Influencer | null;
  onClose: () => void;
  productFocus: string;
  onToggleSelection?: (id: string) => void;
  isSelected?: boolean;
}

const InfluencerDetailModal = ({ 
  influencer, 
  onClose, 
  productFocus,
  onToggleSelection,
  isSelected = false
}: InfluencerDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'campaign'>('overview');
  const [showScriptGenerator, setShowScriptGenerator] = useState(true);
  const [script, setScript] = useState<string | null>(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);

  if (!influencer) return null;

  // Calculate engagement breakdown
  const engagementData = calculateEngagementBreakdown(influencer.followersRaw, influencer.engagementRate);

  // Generate IFS breakdown
  const ifsScores = {
    reach: influencer.fitScores.reach || Math.min(Math.round(influencer.safetyScore * 0.95), 98),
    resonance: influencer.fitScores.resonance || Math.min(Math.round(influencer.engagementRate * 10 * 0.95), 98),
    relevance: influencer.fitScores.relevance || Math.min(Math.round(influencer.safetyScore * 0.92 + influencer.engagementRate * 2), 99),
    reliability: influencer.fitScores.reliability || Math.min(Math.round(influencer.safetyScore * 0.95), 98),
    efficiency: influencer.fitScores.efficiency || Math.min(Math.round(influencer.engagementRate * 9.5), 97)
  };

  // Get platform info
  const getPlatformInfo = () => {
    const platform = influencer.platform.toLowerCase();
    switch (platform) {
      case 'tiktok': return { type: 'Short-form Video', audience: 'Gen Z & Millennials' };
      case 'youtube': return { type: 'Long-form Video', audience: 'Dedicated Subscribers' };
      case 'instagram': return { type: 'Visual Content', audience: 'Engaged Followers' };
      default: return { type: 'Digital Content', audience: 'Social Media Users' };
    }
  };

  const platformInfo = getPlatformInfo();

  // Get strengths text
  const getStrengthsText = () => {
    const strengths = influencer.strengths || [];
    if (strengths.length > 0) return strengths;
    return [
      `High engagement rate (${influencer.engagementRate}% vs industry 4.2%)`,
      `Proven expertise in ${platformInfo.type} creation`,
      `${influencer.followersRaw >= 1000000 ? 'Macro' : influencer.followersRaw >= 100000 ? 'Mid-Tier' : 'Micro'} influence`
    ];
  };

  // Get considerations text
  const getConsiderationsText = () => {
    const considerations = influencer.considerations || [];
    if (considerations.length > 0) return considerations;
    return [
      `Content style alignment may require review`,
      `Partnership onboarding support recommended`
    ];
  };

  // Generate mock script
  const generateMockScript = () => {
    return `**Title:** The ${productFocus} Experience
**Creator:** ${influencer.name} (${influencer.handle})
**Format:** ${influencer.platform === 'YouTube' ? 'Long-form Video' : 'Short-form Vertical (9:16)'}

**HOOK (0-3s):**
Visual: Close-up of the ${productFocus} screen showing a complex task completing instantly.
Audio: "Stop waiting for your tech to catch up. Watch this."

**BODY (3-45s):**
Visual: Quick cuts of ${influencer.name} using the device in a coffee shop, then a studio.
Audio: "I've been testing the new features on this ${productFocus} for a week, and it's actually changing my workflow. The performance handles rendering while I continue editing..."

**CTA (45-60s):**
Visual: ${influencer.name} closing the laptop with a satisfying snap.
Audio: "Link in bio to check it out. You need to experience this."`;
  };

  const handleGenerateScript = () => {
    setIsGeneratingScript(true);
    setTimeout(() => {
      setScript(generateMockScript());
      setIsGeneratingScript(false);
    }, 1500);
  };

  const handleCopyScript = () => {
    if (script) {
      navigator.clipboard.writeText(script);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col relative"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-start bg-white z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white shadow-md">
                <img src={influencer.avatarUrl} alt={influencer.name} className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-gray-100">
                <PlatformIcon platform={influencer.platform} size={16} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">{influencer.name}</h2>
                {isSelected && <CheckCircle2 className="text-green-500 fill-green-50" size={20} />}
                {influencer.isNew && (
                  <span className="h-5 px-2 text-[10px] font-medium rounded-full border border-[#2563EB]/30 bg-[#2563EB]/5 text-[#2563EB]/80 flex items-center">New</span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-sm font-medium text-gray-500">{influencer.handle}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-wide">{influencer.category}</span>
                <span className="text-xs font-medium text-gray-400">{influencer.platform}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-[#1C1C1C] transition-colors flex-shrink-0">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: <Target size={16} /> },
              { id: 'metrics', label: 'Metrics', icon: <BarChart2 size={16} /> },
              { id: 'campaign', label: 'Campaign', icon: <Sparkles size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={clsx(
                  "px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  activeTab === tab.id 
                    ? "bg-[#2563EB] text-white shadow-sm" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <Users className="h-5 w-5 text-[#2563EB] mx-auto mb-1" />
                    <div className="text-xl font-bold text-[#1C1C1C]">{formatNumber(influencer.followersRaw)}</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <TrendingUp className="h-5 w-5 text-[#2563EB] mx-auto mb-1" />
                    <div className="text-xl font-bold text-[#1C1C1C]">{influencer.engagementRate}%</div>
                    <div className="text-xs text-gray-500">Engagement Rate</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <Eye className="h-5 w-5 text-[#2563EB] mx-auto mb-1" />
                    <div className="text-xl font-bold text-[#1C1C1C]">{influencer.avgViews}</div>
                    <div className="text-xs text-gray-500">Avg Views</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <ShieldCheck className="h-5 w-5 text-[#2563EB] mx-auto mb-1" />
                    <div className="text-xl font-bold text-[#1C1C1C]">{influencer.safetyScore}</div>
                    <div className="text-xs text-gray-500">Safety Score</div>
                  </div>
                </div>

                {/* Fit Score Breakdown */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
                    <Target className="text-[#2563EB]" size={18} />
                    Influencer Fit Score
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {Object.entries(ifsScores).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-xs font-medium text-gray-500 capitalize mb-1">{key}</div>
                        <div className="relative pt-1">
                          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={clsx(
                                "h-full rounded-full",
                                value >= 80 ? "bg-green-500" :
                                value >= 60 ? "bg-yellow-500" : "bg-red-500"
                              )}
                            />
                          </div>
                          <div className="text-sm font-bold text-[#1C1C1C] mt-1">{value}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths & Considerations */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-green-50/50 rounded-xl p-5 border border-green-100">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="text-green-600" size={18} />
                      <h3 className="font-bold text-[#1C1C1C]">Key Strengths</h3>
                    </div>
                    <ul className="space-y-2">
                      {getStrengthsText().map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-100">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="text-orange-500" size={18} />
                      <h3 className="font-bold text-[#1C1C1C]">Risk Factors</h3>
                    </div>
                    <ul className="space-y-2">
                      {getConsiderationsText().map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <AlertTriangle size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Audience Data */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-bold text-[#1C1C1C] mb-3 flex items-center gap-2">
                    <Users className="text-[#2563EB]" size={18} />
                    Audience Data
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Geography</div>
                      <div className="font-medium text-[#1C1C1C]">{influencer.audienceGeo}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Demographics</div>
                      <div className="font-medium text-[#1C1C1C]">{influencer.audienceDemographics}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Platform</div>
                      <div className="font-medium text-[#1C1C1C]">{influencer.platform}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Content Type</div>
                      <div className="font-medium text-[#1C1C1C]">{platformInfo.type}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'metrics' && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Engagement Metrics */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
                    <Heart className="text-[#2563EB]" size={18} />
                    Engagement Breakdown
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-[#1C1C1C]">{engagementData.totalFormatted}</div>
                      <div className="text-xs text-gray-500 mt-1">Total Engagement</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-[#1C1C1C]">{engagementData.likesFormatted}</div>
                      <div className="text-xs text-gray-500 mt-1">Likes</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-[#1C1C1C]">{engagementData.commentsFormatted}</div>
                      <div className="text-xs text-gray-500 mt-1">Comments</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-[#1C1C1C]">{engagementData.sharesFormatted}</div>
                      <div className="text-xs text-gray-500 mt-1">Shares</div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
                    <BarChart2 className="text-[#2563EB]" size={18} />
                    Performance Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500">Avg Views</span>
                      <span className="font-bold text-[#1C1C1C]">{influencer.avgViews}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500">Avg Likes</span>
                      <span className="font-bold text-[#1C1C1C]">{influencer.avgLikes}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500">Avg Comments</span>
                      <span className="font-bold text-[#1C1C1C]">{influencer.avgComments}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500">Avg Shares</span>
                      <span className="font-bold text-[#1C1C1C]">{influencer.avgShares}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-500">EMV</span>
                      <span className="font-bold text-[#1C1C1C]">{influencer.emv}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-500">Avg ROI</span>
                      <span className="font-bold text-[#1C1C1C]">{influencer.performance?.avgROI || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Safety & Risk */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <h3 className="font-bold text-[#1C1C1C] mb-3 flex items-center gap-2">
                      <ShieldCheck className="text-[#2563EB]" size={18} />
                      Safety Score
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-[#1C1C1C]">{influencer.safetyScore}</div>
                      <div className="text-sm text-gray-500">/ 100</div>
                      <div className={clsx(
                        "px-3 py-1 rounded-full text-xs font-bold",
                        influencer.safetyScore >= 90 ? "bg-green-100 text-green-700" :
                        influencer.safetyScore >= 70 ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      )}>
                        {influencer.safetyScore >= 90 ? "Excellent" :
                         influencer.safetyScore >= 70 ? "Good" : "Needs Review"}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <h3 className="font-bold text-[#1C1C1C] mb-3 flex items-center gap-2">
                      <AlertTriangle className="text-[#2563EB]" size={18} />
                      Risk Level
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className={clsx(
                        "px-4 py-2 rounded-lg text-sm font-bold",
                        influencer.riskLevel === 'Safe' ? "bg-green-100 text-green-700" :
                        influencer.riskLevel === 'Moderate' ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      )}>
                        {influencer.riskLevel}
                      </div>
                      <div className="text-sm text-gray-500">
                        {influencer.riskLevel === 'Safe' ? "Low risk, trusted creator" :
                         influencer.riskLevel === 'Moderate' ? "Monitor closely" :
                         "High risk, proceed with caution"}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'campaign' && (
              <motion.div
                key="campaign"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Campaign Recommendation */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
                    <Sparkles className="text-[#2563EB]" size={18} />
                    Campaign Recommendation
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Strategy:</span> {influencer.campaignRecommendation}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">Suggested Content:</span>
                      <span className="font-medium text-[#1C1C1C]">{influencer.suggestedContent}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">Best For:</span>
                      <span className="font-medium text-[#1C1C1C]">{influencer.category} campaigns</span>
                    </div>
                  </div>
                </div>

                {/* Script Generator */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                      <Wand2 className="text-[#2563EB]" size={18} />
                      <h3 className="font-bold text-[#1C1C1C]">AI Script Generator</h3>
                    </div>
                    <button
                      onClick={() => setShowScriptGenerator(!showScriptGenerator)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showScriptGenerator ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  
                  {showScriptGenerator && (
                    <div className="p-5">
                      {!script ? (
                        <div className="text-center py-6">
                          <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                            Generate a custom tailored script for <span className="font-bold text-[#1C1C1C]">{influencer.name}</span> based on the "{productFocus}" campaign focus.
                          </p>
                          <button 
                            onClick={handleGenerateScript}
                            disabled={isGeneratingScript}
                            className="px-6 py-2.5 bg-[#1C1C1C] text-white text-sm font-bold rounded-lg shadow-lg hover:bg-black transition-all flex items-center gap-2 mx-auto disabled:opacity-70"
                          >
                            {isGeneratingScript ? (
                              <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <Sparkles size={16} /> Generate Script
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 font-mono text-xs leading-relaxed text-gray-700 whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
                            {script}
                          </div>
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={handleCopyScript}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              <Copy size={14} /> Copy
                            </button>
                            <button 
                              onClick={() => setScript(null)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              Regenerate
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => {
                      if (onToggleSelection && influencer) {
                        onToggleSelection(influencer.id);
                      }
                    }}
                    className={clsx(
                      "px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors",
                      isSelected
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-[#2563EB] text-white hover:bg-[#1E40AF]"
                    )}
                  >
                    {isSelected ? (
                      <><X size={18} /> Remove from Campaign</>
                    ) : (
                      <><Plus size={18} /> Add to Campaign</>
                    )}
                  </button>
                  <button className="px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Bookmark size={18} /> Save for Later
                  </button>
                  <button className="px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={18} /> Share Profile
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0 flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Powered by</span>
            <span className="font-bold text-[#1C1C1C]">{activeBrand.defaultPoweredBy}</span>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-white hover:shadow-sm transition-all text-sm">
              Close
            </button>
            {onToggleSelection && (
              <button 
                onClick={() => {
                  onToggleSelection(influencer.id);
                }} 
                className={clsx(
                  "px-8 py-2.5 rounded-xl font-bold shadow-lg transition-all text-sm flex items-center gap-2",
                  isSelected 
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200" 
                    : "bg-[#2563EB] text-white hover:bg-[#1E40AF]"
                )}
              >
                {isSelected ? (
                  <>Remove <X size={16} /></>
                ) : (
                  <>Add to Campaign <Plus size={16} /></>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Component ---

interface RecommendModuleProps {
  initialContext?: CampaignContext | null;
  onNavigateToCreate: (context: CampaignContext) => void;
  onBack?: () => void;
}

export const RecommendModule = ({ 
  initialContext, 
  onNavigateToCreate,
  onBack
}: RecommendModuleProps) => {
  const [viewState, setViewState] = useState<'setup' | 'results'>('setup');
  const [isLoading, setIsLoading] = useState(false);
  
  const [productLine, setProductLine] = useState<ProductLine>('pro-v');
  const [objective, setObjective] = useState<string>('awareness');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [geography, setGeography] = useState<CampaignGeography>('Global');
  const [description, setDescription] = useState<string>('');
  const [creatorCategory, setCreatorCategory] = useState<CreatorCategory>('UGC');
  const [productFocus, setProductFocus] = useState<ProductModel>('All Models');
  // NEW: Live Streaming Campaign toggle
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(false);

  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [selectedInfluencerIds, setSelectedInfluencerIds] = useState<string[]>([]);
  const [selectedInfluencerForModal, setSelectedInfluencerForModal] = useState<Influencer | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  // Updated GEOGRAPHIES constant - removed Global, US, Europe, India, and added Japan, South Korea, Both
  const UPDATED_GEOGRAPHIES = [
    { value: 'Japan', label: 'Japan' },
    { value: 'South Korea', label: 'South Korea' },
    { value: 'Both', label: 'Both' }
  ];

  // Updated CREATOR_TIERS - removed bracketed text
  const UPDATED_CREATOR_TIERS = [
    { value: 'UGC', label: 'UGC' },
    { value: 'Macro Creators', label: 'Macro Creators' },
    { value: 'Enterprise', label: 'Enterprise' },
    { value: 'B2B Tech', label: 'B2B Tech' },
    { value: 'Micro Influencers', label: 'Micro Influencers' }
  ];

  // Updated PLATFORMS - renamed Twitter to X (Twitter)
  const UPDATED_PLATFORMS = [
    { value: 'all-platforms', label: 'All Platforms' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'twitter', label: 'X (Twitter)' }
  ];

  const promptPills = useMemo(() => {
    return generatePromptPills(productLine, objective);
  }, [productLine, objective]);

  const suggestedDescription = useMemo(() => {
    return generateMainDescription(productLine, objective);
  }, [productLine, objective]);

  const derivedProductFocus = useMemo(() => {
    if (productLine && productLine !== 'all') {
      const productName = PRODUCT_DISPLAY_NAMES[productLine] || productLine;
      const objectiveLabel = OBJECTIVES.find(o => o.value === objective)?.label || '';
      return `${productName} ${objectiveLabel}`.trim();
    }
    return initialContext?.productFocus || `${activeBrand.brandName} Product Campaign`;
  }, [productLine, objective, initialContext]);

  const getPrompt = () => {
    let prompt = "";
    if (creatorCategory === 'UGC') {
      prompt = `Create authentic, slice-of-life content showing how ${derivedProductFocus} solves real daily problems. Tone should be casual, relatable, and shot on mobile. Focus on practical use cases and everyday scenarios.`;
    } else if (creatorCategory === 'Macro Creators') {
      prompt = `Position ${derivedProductFocus} as an industry-leading innovation. Content should be high-production value, authoritative, and benchmark-driven. Compare directly with competitors using data.`;
    } else if (creatorCategory === 'Enterprise') {
      prompt = `Showcase ${derivedProductFocus} in enterprise environments. Highlight security, reliability, and professional-grade features. Tone: Executive, trustworthy, and business-focused.`;
    } else {
      prompt = `Demonstrate ${derivedProductFocus} in a professional workflow. Highlight efficiency gains and reliability. Tone: Expert yet accessible.`;
    }

    if (geography !== 'Global') {
      prompt += ` Adapt messaging for ${geography} cultural nuances and localized trends.`;
    }
    return prompt;
  };

  const isFormValid = useMemo(() => {
    return productLine && productLine !== 'all' && objective && objective !== 'all-objectives' && geography;
  }, [productLine, objective, geography]);

  const handleDescriptionSelect = (content: string) => {
    setDescription(content);
  };

  const handleSuggest = () => {
    if (!isFormValid) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    setIsLoading(true);
    
    const campaignGeo = geography as CampaignGeography;
    
    const platformDisplayNames: Record<string, string> = {
      'instagram': 'Instagram',
      'tiktok': 'TikTok',
      'youtube': 'YouTube',
      'facebook': 'Facebook',
      'linkedin': 'LinkedIn',
      'twitter': 'X (Twitter)'
    };
    const platformList = platforms.length > 0 
      ? platforms.map(p => platformDisplayNames[p] || p)
      : [];
    
    setTimeout(() => {
      const generatedInfluencers = generateInfluencers(creatorCategory, campaignGeo, platformList);
      setInfluencers(generatedInfluencers);
      
      // Select ALL influencers by default
      const allIds = generatedInfluencers.map(inf => inf.id);
      setSelectedInfluencerIds(allIds);
      
      setIsLoading(false);
      setViewState('results');
    }, 1500);
  };

  const handleProceedToCreate = () => {
    const selectedObjects = influencers.filter(inf => selectedInfluencerIds.includes(inf.id));
    
    const objectiveMap: Record<string, any> = {
      'awareness': 'Awareness',
      'engagement': 'Engagement',
      'sales': 'Sales',
      'new-customers': 'New Customer Acquisition'
    };
    
    const mappedInfluencers = selectedObjects.length > 0 ? selectedObjects : influencers;
    
    const campaignContext: CampaignContext = {
      ...initialContext,
      brand: PRODUCT_DISPLAY_NAMES[productLine] || productLine,
      productFocus: derivedProductFocus,
      objective: objectiveMap[objective] || objective,
      geography: geography,
      description: description || suggestedDescription,
      creatorCategory: creatorCategory,
      selectedInfluencers: mappedInfluencers.map(inf => ({
        id: inf.id,
        name: inf.name,
        handle: inf.handle,
        avatarUrl: inf.avatarUrl,
        platform: inf.platform,
        followers: inf.followers,
        followersRaw: inf.followersRaw,
        engagementRate: inf.engagementRate,
        category: inf.category,
        influencerCost: inf.influencerCost || 5000,
        executionCost: inf.executionCost || 2000,
        isNew: inf.isNew,
        primaryPlatform: inf.platform,
        geography: inf.audienceGeo,
        brandAffinity: inf.brandAffinity
      })),
      productLine: productLine,
      campaignObjective: objective,
      targetPlatforms: platforms,
      targetGeography: geography,
      campaignDescription: description || suggestedDescription,
      creatorTier: creatorCategory,
      isLiveStreaming: isLiveStreaming // Add live streaming flag
    };
    
    console.log('Navigating to Create with context:', campaignContext);
    onNavigateToCreate(campaignContext);
  };

  const toggleSelection = (id: string) => {
    if (selectedInfluencerIds.includes(id)) {
      setSelectedInfluencerIds(prev => prev.filter(i => i !== id));
    } else {
      setSelectedInfluencerIds(prev => [...prev, id]);
    }
  };

  // Loading skeleton for table
  const LoadingSkeleton = () => (
    <div className="h-16 border-b border-gray-100 flex items-center px-4">
      <div className="w-12"><div className="h-6 w-8 bg-gray-200 rounded animate-pulse" /></div>
      <div className="flex-1 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        <div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="w-24"><div className="h-4 w-20 bg-gray-200 rounded animate-pulse" /></div>
      <div className="w-28"><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></div>
      <div className="w-20"><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></div>
      <div className="w-20"><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></div>
      <div className="w-20"><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></div>
      <div className="w-28"><div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" /></div>
      <div className="w-24"><div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" /></div>
      <div className="w-64"><div className="h-20 w-56 bg-gray-200 rounded animate-pulse" /></div>
    </div>
  );

  return (
    <div className="h-full flex flex-col p-4 w-full mx-auto">
      <AnimatePresence mode="wait">
        {viewState === 'setup' ? (
          <motion.div 
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-4"
          >
            <div>
              {onBack && (
                <button 
                  onClick={onBack}
                  className="text-gray-400 hover:text-[#2563EB] text-[11px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1 transition-colors"
                >
                  <ChevronDown className="rotate-90" size={14} /> Back to Discover
                </button>
              )}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2563EB]/10 text-[#2563EB] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={14} /> {activeBrand.brandName} Campaign Setup
              </div>
              <h1 className="text-2xl font-bold text-[#1C1C1C] mb-1">Campaign Strategy Setup</h1>
              <p className="text-gray-500 text-sm">
                Define your {activeBrand.brandName} product campaign parameters to discover the perfect beauty and haircare influencers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xl shadow-gray-100/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 flex items-center gap-2">
                    <Laptop size={16} /> Product & Campaign
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-bold text-[#1C1C1C] block mb-1">
                        Product Line <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          value={productLine}
                          onChange={(e) => setProductLine(e.target.value as ProductLine)}
                          className="w-full h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] appearance-none"
                        >
                          {PRODUCT_LINES.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-[#1C1C1C] block mb-1">
                        Campaign Objective <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          value={objective}
                          onChange={(e) => setObjective(e.target.value)}
                          className="w-full h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] appearance-none"
                        >
                          {OBJECTIVES.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-[#1C1C1C] block mb-1">
                        Geography <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          value={geography}
                          onChange={(e) => setGeography(e.target.value as CampaignGeography)}
                          className="w-full h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] appearance-none"
                        >
                          {UPDATED_GEOGRAPHIES.map((g) => (
                            <option key={g.value} value={g.value}>{g.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                      </div>
                    </div>

                    {/* NEW: Live Streaming Campaign toggle */}
                    <div>
                      <label className="text-sm font-bold text-[#1C1C1C] block mb-1">
                        Live Streaming Campaign
                      </label>
                      <button
                        onClick={() => setIsLiveStreaming(!isLiveStreaming)}
                        className={clsx(
                          "px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                          isLiveStreaming
                            ? "bg-[#2563EB] text-white shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                      >
                        {isLiveStreaming ? <Check size={16} /> : <X size={16} />}
                        {isLiveStreaming ? "Yes" : "No"}
                      </button>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-[#1C1C1C] block mb-1 flex items-center gap-2">
                        <MonitorPlay size={16} /> Platforms <span className="text-gray-400 font-normal text-xs">(optional)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {UPDATED_PLATFORMS.filter(p => p.value !== 'all-platforms').map((p) => (
                          <button
                            key={p.value}
                            onClick={() => {
                              if (platforms.includes(p.value)) {
                                setPlatforms(platforms.filter(pl => pl !== p.value));
                              } else {
                                setPlatforms([...platforms, p.value]);
                              }
                            }}
                            className={clsx(
                              "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                              platforms.includes(p.value) 
                                ? "bg-[#2563EB] text-white border-[#2563EB]" 
                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                            )}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-l border-gray-100 pl-6">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 flex items-center gap-2">
                    <Target size={16} /> Targeting & Messaging
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-bold text-[#1C1C1C] block mb-1">
                        Creator Tier
                      </label>
                      <div className="relative">
                        <select 
                          value={creatorCategory}
                          onChange={(e) => setCreatorCategory(e.target.value as CreatorCategory)}
                          className="w-full h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] appearance-none"
                        >
                          {UPDATED_CREATOR_TIERS.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-[#1C1C1C] block mb-1">
                        Category
                      </label>
                      <div className="relative">
                        <select 
                          value={productFocus}
                          onChange={(e) => setProductFocus(e.target.value as ProductModel)}
                          className="w-full h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] appearance-none"
                        >
                          <option value="Daily Care">Daily Care</option>
                          <option value="Repair & Damage Control">Repair & Damage Control</option>
                          <option value="Scalp Health">Scalp Health</option>
                          <option value="Volume & Texture">Volume & Texture</option>
                          <option value="Specialized Treatments">Specialized Treatments</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">AI Strategic Prompt</label>
                        <Sparkles size={12} className="text-purple-500" />
                      </div>
                      <p className="text-xs text-gray-600 italic leading-relaxed">
                        "{getPrompt()}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={16} className="text-amber-500" />
                  <span className="text-sm font-bold text-[#1C1C1C]">Quick Start Templates</span>
                  <span className="text-xs text-gray-400">Click to auto-fill description</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {promptPills.slice(0, 6).map((pill, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (pill.description.includes('Goal:')) {
                          handleDescriptionSelect(pill.description);
                        } else {
                          const productKey = pill.product.toLowerCase().replace(/ /g, '-');
                          const productContext = PRODUCT_CONTEXTS[productKey];
                          const objectiveGoal = OBJECTIVE_GOALS[objective];
                          if (productContext && objectiveGoal) {
                            const audienceShort = productContext.audience.split(',')[0].trim();
                            const goalLabel = objectiveGoal.goalLabel.toLowerCase();
                            handleDescriptionSelect(`${pill.product} ${pill.title.toLowerCase()} targeting ${audienceShort}. Goal: increase ${goalLabel}. ${pill.description}`);
                          } else {
                            handleDescriptionSelect(`${pill.product} ${pill.title.toLowerCase()} - ${pill.description}`);
                          }
                        }
                      }}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors flex items-center gap-1.5"
                    >
                      <span className="font-semibold">{pill.product}</span>
                      <span className="text-gray-400">·</span>
                      <span>{pill.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-bold text-[#1C1C1C] block mb-1 flex items-center gap-2">
                  <FileText size={16} /> Campaign Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={suggestedDescription || `Describe your ${activeBrand.brandName} campaign goals, target audience, key messaging...`}
                  className="w-full h-20 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] resize-none transition-all"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col items-end gap-3">
                {showWarning && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm w-full">
                    <AlertTriangle size={16} className="flex-shrink-0" />
                    Please fill in all required fields (Product Line, Objective, Geography)
                  </div>
                )}
                <button 
                  onClick={handleSuggest}
                  disabled={isLoading}
                  className="px-8 py-3 bg-[#2563EB] hover:bg-[#1E40AF] text-white font-bold rounded-xl shadow-lg hover:shadow-blue-900/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                >
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing Beauty Network...
                    </>
                  ) : (
                    <>
                      Suggest Influencers <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full gap-4"
          >
            {/* Results Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setViewState('setup')}
                  className="text-gray-400 hover:text-gray-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <ChevronDown className="rotate-90" size={14} /> Back
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-[#1C1C1C] leading-tight">Recommended Beauty/Haircare Influencers</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {isLoading ? 'Updating results...' : `${influencers.length} influencers match your criteria`}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button 
                  onClick={handleSuggest}
                  className="px-5 py-2.5 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Regenerate List
                </button>
                <button 
                  onClick={handleProceedToCreate}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#1A3A8A] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-blue-900/30 transition-all flex items-center gap-2"
                >
                  <Sparkles size={16} />
                  Launch Campaign Execution
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Influencer Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-1 flex flex-col">
              <div className="overflow-auto flex-1">
                <table className="w-full">
                  <thead className="bg-gray-50/80 sticky top-0 z-10">
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                        <button 
                          onClick={() => {
                            // Toggle select all
                            const allIds = influencers.map(inf => inf.id);
                            const allSelected = allIds.every(id => selectedInfluencerIds.includes(id));
                            if (allSelected) {
                              setSelectedInfluencerIds([]);
                            } else {
                              setSelectedInfluencerIds(allIds);
                            }
                          }}
                          className="hover:text-[#2563EB] transition-colors"
                        >
                          {influencers.every(inf => selectedInfluencerIds.includes(inf.id)) ? (
                            <CheckSquare size={18} className="text-[#2563EB]" />
                          ) : (
                            <Square size={18} className="text-gray-400" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Influencer</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Followers</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <span className="inline-flex items-center gap-1">Engagement <Info className="h-3 w-3" /></span>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Resonance</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Relevance</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Reliability</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Safety</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Risk</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[200px]">Action Insights</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {isLoading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <LoadingSkeleton key={i} />
                      ))
                    ) : (
                      influencers.map((inf, index) => {
                        const isSelected = selectedInfluencerIds.includes(inf.id);
                        const breakdown = calculateEngagementBreakdown(inf.followersRaw, inf.engagementRate);
                        const resonance = Math.min(Math.round(inf.engagementRate * 10 * 0.95), 98);
                        const relevance = Math.min(Math.round(inf.safetyScore * 0.92 + inf.engagementRate * 2), 99);
                        const reliability = Math.min(Math.round(inf.safetyScore * 0.95), 98);
                        
                        return (
                          <tr 
                            key={inf.id}
                            className={clsx(
                              "hover:bg-gray-50/50 transition-colors",
                              isSelected ? "bg-blue-50/30" : ""
                            )}
                          >
                            <td className="px-4 py-3">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSelection(inf.id);
                                }}
                                className="hover:text-[#2563EB] transition-colors"
                              >
                                {isSelected ? (
                                  <CheckSquare size={18} className="text-[#2563EB]" />
                                ) : (
                                  <Square size={18} className="text-gray-400" />
                                )}
                              </button>
                            </td>
                            <td className="px-4 py-3 cursor-pointer" onClick={() => setSelectedInfluencerForModal(inf)}>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                  {inf.avatarUrl ? (
                                    <img src={inf.avatarUrl} alt={inf.name} className="w-full h-full object-cover" />
                                  ) : (
                                    getPlatformIcon(inf.platform, 'md')
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-[#1C1C1C] text-sm">{inf.name}</span>
                                    {inf.isNew && (
                                      <span className="h-4 px-1.5 text-[9px] font-medium rounded-full border border-[#2563EB]/30 bg-[#2563EB]/5 text-[#2563EB]/80">New</span>
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-400">{inf.handle}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="font-semibold text-[#1C1C1C]">{formatFollowersWithCommas(inf.followersRaw)}</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="font-semibold text-[#1C1C1C]">{breakdown.totalFormatted}</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-100">
                                {resonance}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs font-semibold border border-purple-100">
                                {relevance}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold border border-emerald-100">
                                {reliability}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              {getSafetyBadge(inf.safetyScore)}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {getRiskBadge(inf.riskLevel)}
                            </td>
                            <td className="px-4 py-3 cursor-pointer" onClick={() => setSelectedInfluencerForModal(inf)}>
                              <div className="space-y-1.5">
                                <div className="flex flex-wrap gap-1">
                                  {inf.actionInsights?.strengths.slice(0, 2).map((s, i) => (
                                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded">+ {s}</span>
                                  ))}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {inf.actionInsights?.actions.slice(0, 2).map((a, i) => (
                                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-sky-50 text-sky-600 rounded">→ {a}</span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                  <Eye className="h-3 w-3" />
                                  <span>Click for details</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Legend & Bottom Actions */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="h-4 px-1.5 text-[9px] font-medium rounded-full border border-[#2563EB]/30 bg-[#2563EB]/5 text-[#2563EB]/80">New</span>
                  <span>First-time partnership</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 px-1.5 text-[9px] font-medium rounded-full border border-gray-300 bg-gray-50 text-gray-500">Existing</span>
                  <span>Previous campaign history</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-400">
                    {selectedInfluencerIds.length} of {influencers.length} selected
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleProceedToCreate}
                className="px-6 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#1A3A8A] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-blue-900/30 transition-all flex items-center gap-2"
              >
                <Sparkles size={16} />
                Launch Campaign
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Influencer Detail Modal */}
        {selectedInfluencerForModal && (
          <InfluencerDetailModal 
            influencer={selectedInfluencerForModal} 
            onClose={() => setSelectedInfluencerForModal(null)}
            productFocus={derivedProductFocus}
            isSelected={selectedInfluencerIds.includes(selectedInfluencerForModal.id)}
            onToggleSelection={toggleSelection}
          />
        )}
      </AnimatePresence>
    </div>
  );
};