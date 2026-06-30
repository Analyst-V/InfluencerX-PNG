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

// --- Types ---

type CreatorCategory = 'UGC' | 'Micro Creators' | 'Mid-tier Creators' | 'Macro Creators' | 'Enterprise';
type CampaignObjective = 'All Objectives' | 'Awareness' | 'Engagement' | 'Sales' | 'New Customer Acquisition';
type CampaignPlatform = 'All Platforms' | 'Instagram' | 'Facebook' | 'TikTok' | 'LinkedIn' | 'Twitter' | 'YouTube';
type CampaignGeography = 'Global' | 'United States' | 'Europe' | 'India' | 'US / Europe / India';
type ProductModel = 'All Models' | 'ThinkPad X1 Carbon' | 'ThinkPad T14' | 'Yoga 9i' | 'Legion Pro 7' | 'IdeaPad Slim 5' | 'ThinkCentre M90' | 'ThinkStation P3' | 'Legion Go' | 'Smart Display' | 'ThinkBook 16';

type ProductLine = 'all' | 'thinkpad-x1' | 'thinkpad-t14' | 'yoga-9i' | 'legion-pro-7' | 'ideapad-slim-5' | 'thinkcentre-m90' | 'thinkstation-p3' | 'legion-go' | 'smart-display' | 'thinkbook-16';

interface CampaignData {
  model: ProductModel;
  objective: CampaignObjective;
  platform: CampaignPlatform;
  geography: CampaignGeography;
  details: string;
  creatorCategory: CreatorCategory;
}

interface PerformanceMetric { week: string; value: number; }
interface InfluencerPerformance { weeklyEngagement: PerformanceMetric[]; weeklyROI: PerformanceMetric[]; avgROI: string; totalEngagement: string; totalImpressions: string; attributedRevenue: string; }

interface Influencer { 
  id: string; 
  rank: number; 
  name: string; 
  handle: string; 
  platform: string; 
  category: string; 
  type: string; 
  avatarUrl: string; 
  followers: string; 
  followersRaw: number; 
  totalEngagement: string; 
  engagementRate: number; 
  emv: string; 
  safetyScore: number; 
  riskLevel: string; 
  strengths: string[]; 
  considerations: string[]; 
  avgViews: string; 
  avgLikes: string; 
  avgComments: string; 
  avgShares: string; 
  fitScores: { reach: number; resonance: number; relevance: number; reliability: number; efficiency: number; }; 
  audienceGeo: string; 
  audienceDemographics: string; 
  campaignRecommendation: string; 
  suggestedContent: string; 
  performance: InfluencerPerformance;
  isNew?: boolean;
  brandAffinity?: string[];
  actionInsights?: {
    strengths: string[];
    considerations: string[];
    actions: string[];
  };
  influencerCost?: number;
  executionCost?: number;
}

// --- Product Data ---

const PRODUCT_LINES = [
  { value: "all", label: "All Products" },
  { value: "thinkpad-x1", label: "ThinkPad X1 Carbon" },
  { value: "thinkpad-t14", label: "ThinkPad T14" },
  { value: "yoga-9i", label: "Yoga 9i" },
  { value: "legion-pro-7", label: "Legion Pro 7" },
  { value: "ideapad-slim-5", label: "IdeaPad Slim 5" },
  { value: "thinkcentre-m90", label: "ThinkCentre M90" },
  { value: "thinkstation-p3", label: "ThinkStation P3" },
  { value: "legion-go", label: "Legion Go" },
  { value: "smart-display", label: "Smart Display" },
  { value: "thinkbook-16", label: "ThinkBook 16" }
];

const OBJECTIVES = [
  { value: "all-objectives", label: "All Objectives" },
  { value: "awareness", label: "Awareness" },
  { value: "engagement", label: "Engagement" },
  { value: "sales", label: "Sales" },
  { value: "new-customers", label: "New Customer Acquisition" }
];

const PLATFORMS = [
  { value: "all-platforms", label: "All Platforms" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" }
];

const GEOGRAPHIES = [
  { value: "us-eu-india", label: "U.S. / Europe / India" },
  { value: "united-states", label: "United States" },
  { value: "europe", label: "Europe" },
  { value: "india", label: "India" },
  { value: "global", label: "Global" }
];

const CREATOR_TIERS = [
  { value: 'UGC', label: 'UGC (Authenticity)' },
  { value: 'Micro Creators', label: 'Micro (High Engagement)' },
  { value: 'Mid-tier Creators', label: 'Mid-Tier (Balance)' },
  { value: 'Macro Creators', label: 'Macro (Reach)' },
  { value: 'Enterprise', label: 'Enterprise (Authority)' }
];

const PRODUCT_MODELS = [
  { value: 'All Models', label: 'All Models' },
  { value: 'ThinkPad X1 Carbon', label: 'ThinkPad X1 Carbon' },
  { value: 'ThinkPad T14', label: 'ThinkPad T14' },
  { value: 'Yoga 9i', label: 'Yoga 9i' },
  { value: 'Legion Pro 7', label: 'Legion Pro 7' },
  { value: 'IdeaPad Slim 5', label: 'IdeaPad Slim 5' },
  { value: 'ThinkCentre M90', label: 'ThinkCentre M90' },
  { value: 'ThinkStation P3', label: 'ThinkStation P3' },
  { value: 'Legion Go', label: 'Legion Go' },
  { value: 'Smart Display', label: 'Smart Display' },
  { value: 'ThinkBook 16', label: 'ThinkBook 16' }
];

// Product display names
const PRODUCT_DISPLAY_NAMES: Record<string, string> = {
  "thinkpad-x1": "ThinkPad X1 Carbon",
  "thinkpad-t14": "ThinkPad T14",
  "yoga-9i": "Yoga 9i",
  "legion-pro-7": "Legion Pro 7",
  "ideapad-slim-5": "IdeaPad Slim 5",
  "thinkcentre-m90": "ThinkCentre M90",
  "thinkstation-p3": "ThinkStation P3",
  "legion-go": "Legion Go",
  "smart-display": "Smart Display",
  "thinkbook-16": "ThinkBook 16"
};

// Product-specific campaign contexts
const PRODUCT_CONTEXTS: Record<string, { heritage: string; audience: string; tone: string; values: string; keyFeatures: string[] }> = {
  "thinkpad-x1": {
    heritage: "Lenovo's flagship business ultrabook, renowned for premium build quality, exceptional keyboard, and enterprise-grade security",
    audience: "business professionals, executives, remote workers, and IT decision-makers who demand performance and reliability",
    tone: "sophisticated, professional, and performance-focused with emphasis on productivity and security",
    values: "durability, performance, security, and the ultimate business mobility",
    keyFeatures: ["Carbon fiber chassis", "Dolby Vision display", "Intel vPro security", "All-day battery life"]
  },
  "thinkpad-t14": {
    heritage: "The backbone of enterprise computing, balancing performance, portability, and durability for business users worldwide",
    audience: "enterprise IT departments, business professionals, and students seeking reliable computing",
    tone: "dependable, professional, and value-oriented with focus on business productivity",
    values: "reliability, security, performance, and enterprise-grade support",
    keyFeatures: ["AMD Ryzen or Intel Core processors", "MIL-STD-810H durability", "ThinkShield security", "Up to 48GB RAM"]
  },
  "yoga-9i": {
    heritage: "Lenovo's premium convertible laptop, blending elegant design with versatile form factors for creative professionals",
    audience: "creative professionals, designers, artists, and lifestyle users who value aesthetics and flexibility",
    tone: "elegant, creative, and lifestyle-focused with emphasis on design and versatility",
    values: "design, flexibility, creativity, and premium experiences",
    keyFeatures: ["360° hinge", "OLED display with Dolby Vision", "Lenovo Precision Pen", "Bowers & Wilkins speakers"]
  },
  "legion-pro-7": {
    heritage: "Lenovo's flagship gaming laptop, engineered for competitive gamers with cutting-edge performance and thermal technology",
    audience: "competitive gamers, esports enthusiasts, and content creators demanding maximum performance",
    tone: "powerful, aggressive, and performance-obsessed with focus on gaming excellence",
    values: "performance, thermal innovation, competitive edge, and gaming community",
    keyFeatures: ["NVIDIA RTX 4090", "Intel Core i9", "16\" 240Hz display", "ColdFront 5.0 cooling"]
  },
  "ideapad-slim-5": {
    heritage: "Lenovo's popular mainstream laptop, offering the perfect balance of performance, portability, and value",
    audience: "students, home users, and everyday consumers seeking reliable computing at accessible prices",
    tone: "approachable, practical, and value-focused with emphasis on everyday computing",
    values: "value, reliability, performance, and everyday usability",
    keyFeatures: ["AMD Ryzen or Intel Core", "FHD display", "Long battery life", "Lightweight design"]
  },
  "thinkcentre-m90": {
    heritage: "Lenovo's premium business desktop, designed for enterprise productivity with robust security and manageability",
    audience: "enterprise IT departments, financial services, and business users requiring desktop power",
    tone: "professional, reliable, and security-focused with emphasis on business productivity",
    values: "security, manageability, performance, and enterprise reliability",
    keyFeatures: ["Intel vPro", "DDR5 memory", "Multiple storage options", "ThinkShield security"]
  },
  "thinkstation-p3": {
    heritage: "Lenovo's professional workstation, engineered for the most demanding creative and engineering workflows",
    audience: "3D designers, engineers, architects, and data scientists requiring extreme performance",
    tone: "powerful, professional, and performance-obsessed with focus on professional creation",
    values: "performance, reliability, certification, and professional workflows",
    keyFeatures: ["NVIDIA RTX A6000", "Intel Xeon", "ISV certifications", "Up to 128GB RAM"]
  },
  "legion-go": {
    heritage: "Lenovo's revolutionary handheld gaming device, combining PC gaming power with portable convenience",
    audience: "portable gamers, travel enthusiasts, and gaming on-the-go consumers",
    tone: "exciting, innovative, and gaming-first with focus on portable gaming experiences",
    values: "portability, performance, gaming, and innovation",
    keyFeatures: ["AMD Ryzen Z1", "8.8\" QHD+ display", "Detachable controllers", "Legion Space software"]
  },
  "smart-display": {
    heritage: "Lenovo's smart home display, integrating Google Assistant with premium audio and visual experiences",
    audience: "smart home enthusiasts, families, and consumers seeking connected living experiences",
    tone: "smart, connected, and lifestyle-focused with emphasis on home integration",
    values: "connectivity, convenience, smart living, and family-friendly",
    keyFeatures: ["Google Assistant", "10\" FHD display", "Premium speakers", "Smart home control"]
  },
  "thinkbook-16": {
    heritage: "Lenovo's modern business laptop, designed for professionals who need a large screen without sacrificing portability",
    audience: "small business owners, consultants, and professionals seeking a larger display",
    tone: "modern, versatile, and professional with focus on productivity and mobility",
    values: "productivity, portability, modern design, and business value",
    keyFeatures: ["16\" 16:10 display", "Intel Core i7", "Dolby Atmos", "Fingerprint reader"]
  }
};

// Objective-specific goals
const OBJECTIVE_GOALS: Record<string, { goalLabel: string }> = {
  "awareness": { goalLabel: "Brand Awareness" },
  "engagement": { goalLabel: "Engagement" },
  "sales": { goalLabel: "Sales" },
  "new-customers": { goalLabel: "New Customer Acquisition" }
};

// Product + Objective specific campaign suggestions
const PRODUCT_OBJECTIVE_SUGGESTIONS: Record<string, Record<string, { title: string; description: string }[]>> = {
  "thinkpad-x1": {
    "awareness": [
      { title: "The Ultimate Business Machine", description: "Position ThinkPad X1 Carbon as the gold standard for business professionals. Highlight premium build, security features, and the iconic keyboard experience." },
      { title: "Executive Productivity", description: "Show how executives use the X1 Carbon for boardroom presentations and remote work success stories." },
      { title: "Security First", description: "Emphasize ThinkShield security and vPro technology for enterprise-grade protection." }
    ],
    "engagement": [
      { title: "#X1CarbonLife", description: "User-generated content showcasing professionals working from anywhere with their X1 Carbon." },
      { title: "Productivity Challenge", description: "Challenge professionals to share their daily workflow using the X1 Carbon's features." },
      { title: "Keyboard Love Story", description: "Celebrate the iconic ThinkPad keyboard with a fan appreciation campaign." }
    ],
    "sales": [
      { title: "Business Bundle", description: "Promote X1 Carbon with premium accessories for the complete business setup." },
      { title: "Enterprise Offer", description: "Special pricing for bulk enterprise purchases with extended warranty." },
      { title: "Trade-Up Program", description: "Incentivize businesses to upgrade from older models to the X1 Carbon." }
    ],
    "new-customers": [
      { title: "First Business Laptop", description: "Target young professionals buying their first premium business laptop." },
      { title: "MacBook Switcher", description: "Convince Mac users to switch to ThinkPad for business productivity." },
      { title: "Startup Essential", description: "Position the X1 Carbon as the must-have laptop for startup founders." }
    ]
  },
  "legion-pro-7": {
    "awareness": [
      { title: "Esports Ready", description: "Position Legion Pro 7 as the ultimate esports gaming laptop with pro-level performance." },
      { title: "Thermal Innovation", description: "Highlight ColdFront 5.0 cooling technology that enables sustained gaming performance." },
      { title: "Pro Gaming Performance", description: "Showcase the RTX 4090 and Intel Core i9 combination for extreme gaming." }
    ],
    "engagement": [
      { title: "#LegionGaming", description: "Community gaming highlights and best moments from Legion users." },
      { title: "Streamer Showcase", description: "Partner with streamers to showcase the Legion Pro 7's streaming capabilities." },
      { title: "Esports Tournament", description: "Host online tournaments featuring Legion Pro 7 as the official gaming platform." }
    ],
    "sales": [
      { title: "Gaming Bundle", description: "Package with gaming mouse, headset, and game pass subscription." },
      { title: "Pro Gamer Offer", description: "Premium configuration with advanced cooling station and extended support." },
      { title: "Trade-In Program", description: "Upgrade from older gaming laptops with attractive trade-in values." }
    ],
    "new-customers": [
      { title: "Console to PC", description: "Help console gamers transition to PC gaming with the Legion Pro 7." },
      { title: "Creative Professional", description: "Position as both gaming machine and content creation powerhouse." },
      { title: "Tech Enthusiast", description: "Attract enthusiasts with top-tier specs and upgradeability." }
    ]
  },
  "yoga-9i": {
    "awareness": [
      { title: "Design Excellence", description: "Celebrate the premium design and build quality of the Yoga 9i convertible." },
      { title: "Creative Freedom", description: "Position Yoga 9i as the ultimate tool for creative professionals and artists." },
      { title: "Innovative Flexibility", description: "Showcase the 360° hinge and versatile form factors for any scenario." }
    ],
    "engagement": [
      { title: "#YogaDesign", description: "Creative designs and artistic content created using the Yoga 9i." },
      { title: "Desk Setup Series", description: "Beautiful desk setups featuring the Yoga 9i in stunning workspaces." },
      { title: "Art Challenge", description: "Challenge artists to create digital art using the Yoga 9i and Precision Pen." }
    ],
    "sales": [
      { title: "Creative Bundle", description: "Package with pen, sleeve, and Adobe Creative Cloud subscription." },
      { title: "Premium Upgrade", description: "OLED display configuration for true color accuracy." },
      { title: "Student Offer", description: "Special pricing for students in design and creative programs." }
    ],
    "new-customers": [
      { title: "iPad Alternative", description: "Show why creative professionals choose Yoga 9i over iPad Pro." },
      { title: "First 2-in-1", description: "Convert traditional laptop users with the flexibility of a convertible." },
      { title: "Creative Starter", description: "Help aspiring creatives start their digital art journey." }
    ]
  }
};

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
  
  return [
    { product: "ThinkPad X1 Carbon", title: "Executive Productivity", description: "Showcase X1 Carbon's premium build and performance for business leaders" },
    { product: "Legion Pro 7", title: "Ultimate Gaming", description: "Position Legion Pro 7 for competitive esports and high-performance gaming" },
    { product: "Yoga 9i", title: "Creative Freedom", description: "Highlight Yoga 9i's versatility for creative professionals" },
    { product: "ThinkStation P3", title: "Professional Power", description: "Demonstrate ThinkStation's capabilities for 3D design and engineering" }
  ];
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
    case 'Twitter': return <Twitter size={size} className="text-[#1DA1F2]" />;
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

// --- Real Influencer Data (Tech-Focused with realistic variance) ---

const REAL_INFLUENCERS: Influencer[] = [
  // --- Enterprise / Celebrity Tech Influencers ---
  {
    id: 'mkbhd',
    rank: 1,
    name: 'Marques Brownlee',
    handle: '@MKBHD',
    platform: 'YouTube',
    category: 'Enterprise',
    type: 'Veteran',
    avatarUrl: "https://images.unsplash.com/photo-1757773873686-2257941bbcb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjBibGFjayUyMG1hbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEyNDI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '18.2M',
    followersRaw: 18200000,
    totalEngagement: '2.5M',
    engagementRate: 4.8,
    emv: '$250K',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['Cinematic Production', 'Executive Trust', 'Global Trend Setter', 'Tech Authority'],
    considerations: ['Premium Pricing', 'Strict Creative Control'],
    avgViews: '3.5M',
    avgLikes: '150K',
    avgComments: '8.5K',
    avgShares: '12K',
    fitScores: { reach: 99, resonance: 95, relevance: 98, reliability: 99, efficiency: 85 },
    audienceGeo: 'Global',
    audienceDemographics: 'Tech Enthusiasts, Professionals',
    campaignRecommendation: 'Ideal for flagship product launches and brand authority campaigns.',
    suggestedContent: 'Cinematic Review',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '4.5x', totalEngagement: '10M', totalImpressions: '50M', attributedRevenue: '$500K' },
    isNew: false,
    brandAffinity: ['thinkpad-x1', 'legion-pro-7'],
    actionInsights: {
      strengths: ['High Production Value', 'Trusted Authority', 'Global Reach'],
      considerations: ['Premium Pricing', 'Selective Partnerships'],
      actions: ['Launch Campaign', 'Brand Authority']
    },
    influencerCost: 45000,
    executionCost: 12000
  },
  {
    id: 'linus',
    rank: 2,
    name: 'Linus Sebastian',
    handle: '@LinusTech',
    platform: 'YouTube',
    category: 'Enterprise',
    type: 'Veteran',
    avatarUrl: "https://images.unsplash.com/photo-1737338849301-4e0ab7e2cdef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjB3aGl0ZSUyMG1hbGUlMjBnbGFzc2VzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxMjQyODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '15.5M',
    followersRaw: 15500000,
    totalEngagement: '1.8M',
    engagementRate: 3.9,
    emv: '$180K',
    safetyScore: 92,
    riskLevel: 'Safe',
    strengths: ['Technical Depth', 'PC Enthusiast Loyalty', 'Performance Metrics', 'Entertainment Value'],
    considerations: ['Unpredictable Tone', 'Competitor Comparisons'],
    avgViews: '2.1M',
    avgLikes: '95K',
    avgComments: '12K',
    avgShares: '5K',
    fitScores: { reach: 98, resonance: 92, relevance: 95, reliability: 90, efficiency: 88 },
    audienceGeo: 'Global',
    audienceDemographics: 'Gamers, PC Builders',
    campaignRecommendation: 'Performance benchmarks and extreme testing scenarios.',
    suggestedContent: 'Extreme Challenge',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '3.8x', totalEngagement: '8M', totalImpressions: '40M', attributedRevenue: '$350K' },
    isNew: false,
    brandAffinity: ['legion-pro-7', 'thinkstation-p3'],
    actionInsights: {
      strengths: ['Technical Authority', 'PC Community', 'Entertaining Content'],
      considerations: ['Long Lead Times', 'Competitor Focused'],
      actions: ['Performance Testing', 'Benchmark Campaign']
    },
    influencerCost: 38000,
    executionCost: 10000
  },
  {
    id: 'unboxtherapy',
    rank: 3,
    name: 'Lewis Hilsenteger',
    handle: '@UnboxTherapy',
    platform: 'YouTube',
    category: 'Enterprise',
    type: 'Veteran',
    avatarUrl: "https://images.unsplash.com/photo-1720166067122-b5036f549ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjBiZWFyZGVkJTIwbWFsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTI0MjgyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '19.1M',
    followersRaw: 19100000,
    totalEngagement: '3.1M',
    engagementRate: 3.5,
    emv: '$300K',
    safetyScore: 88,
    riskLevel: 'Moderate',
    strengths: ['Massive Viral Reach', 'Hype Generation', 'Unboxing Experience', 'Product First Look'],
    considerations: ['Short Attention Span', 'Generalist Audience'],
    avgViews: '2.8M',
    avgLikes: '120K',
    avgComments: '15K',
    avgShares: '25K',
    fitScores: { reach: 100, resonance: 85, relevance: 88, reliability: 85, efficiency: 80 },
    audienceGeo: 'Global',
    audienceDemographics: 'Casual Tech Consumers',
    campaignRecommendation: 'Generating hype for new product launches.',
    suggestedContent: 'Mega Unboxing',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '3.1x', totalEngagement: '12M', totalImpressions: '60M', attributedRevenue: '$400K' },
    isNew: true,
    brandAffinity: ['legion-pro-7', 'thinkpad-x1'],
    actionInsights: {
      strengths: ['Massive Reach', 'Hype Generation', 'Quick Turnaround'],
      considerations: ['Shallow Coverage', 'Competitive Platforms'],
      actions: ['Product Launch', 'Unboxing Campaign']
    },
    influencerCost: 50000,
    executionCost: 8000
  },
  {
    id: 'mrwhosetheboss',
    rank: 4,
    name: 'Arun Maini',
    handle: '@Mrwhosetheboss',
    platform: 'YouTube',
    category: 'Enterprise',
    type: 'Expert',
    avatarUrl: "https://images.unsplash.com/photo-1598097599413-17a71172168c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZW50aHVzaWFzdCUyMGhvbWUlMjBzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEyNDMyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '16.5M',
    followersRaw: 16500000,
    totalEngagement: '2.2M',
    engagementRate: 5.2,
    emv: '$220K',
    safetyScore: 98,
    riskLevel: 'Safe',
    strengths: ['Visual Storytelling', 'Feature Comparison Expert', 'Gen Z Appeal', 'Clear Explanations'],
    considerations: ['High Demand Schedule', 'Complex Production'],
    avgViews: '3.2M',
    avgLikes: '200K',
    avgComments: '10K',
    avgShares: '8K',
    fitScores: { reach: 99, resonance: 96, relevance: 97, reliability: 98, efficiency: 86 },
    audienceGeo: 'Global',
    audienceDemographics: 'Gen Z, Tech Enthusiasts',
    campaignRecommendation: 'Feature comparisons and "Does It Suck?" style content.',
    suggestedContent: 'Feature Comparison',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '4.2x', totalEngagement: '9M', totalImpressions: '45M', attributedRevenue: '$450K' },
    isNew: false,
    brandAffinity: ['thinkpad-x1', 'yoga-9i'],
    actionInsights: {
      strengths: ['Feature Expertise', 'Engaging Format', 'Young Audience'],
      considerations: ['High Production Cost', 'Schedule Constraints'],
      actions: ['Feature Deep Dive', 'Comparison Content']
    },
    influencerCost: 32000,
    executionCost: 9000
  },
  // --- Macro Creators ---
  {
    id: 'dave2d',
    rank: 5,
    name: 'Dave2D',
    handle: '@Dave2D',
    platform: 'YouTube',
    category: 'Macro Creators',
    type: 'Expert',
    avatarUrl: "https://images.unsplash.com/photo-1605504836193-e77d3d9ede8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjBhc2lhbiUyMG1hbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEyNDI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '3.6M',
    followersRaw: 3600000,
    totalEngagement: '450K',
    engagementRate: 5.1,
    emv: '$60K',
    safetyScore: 97,
    riskLevel: 'Safe',
    strengths: ['Clean Aesthetic', 'Objective Reviews', 'Concise Scripting', 'Professional Production'],
    considerations: ['Selective Partnerships', 'Minimalist Style'],
    avgViews: '850K',
    avgLikes: '55K',
    avgComments: '3K',
    avgShares: '2K',
    fitScores: { reach: 85, resonance: 96, relevance: 99, reliability: 97, efficiency: 94 },
    audienceGeo: 'US, CA',
    audienceDemographics: 'Tech Professionals',
    campaignRecommendation: 'Detailed reviews highlighting design and performance.',
    suggestedContent: 'Deep Dive Review',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '5.2x', totalEngagement: '2M', totalImpressions: '8M', attributedRevenue: '$200K' },
    isNew: false,
    brandAffinity: ['thinkpad-x1', 'yoga-9i'],
    actionInsights: {
      strengths: ['Clean Aesthetic', 'Professional Quality', 'Trusted Reviews'],
      considerations: ['Limited Volume', 'Selective Brands'],
      actions: ['Design Showcase', 'Premium Review']
    },
    influencerCost: 18000,
    executionCost: 5000
  },
  {
    id: 'mrmobile',
    rank: 6,
    name: 'Michael Fisher',
    handle: '@TheMrMobile',
    platform: 'YouTube',
    category: 'Macro Creators',
    type: 'Expert',
    avatarUrl: "https://images.unsplash.com/photo-1598097599413-17a71172168c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZW50aHVzaWFzdCUyMGhvbWUlMjBzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEyNDMyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '1.2M',
    followersRaw: 1200000,
    totalEngagement: '150K',
    engagementRate: 4.8,
    emv: '$30K',
    safetyScore: 98,
    riskLevel: 'Safe',
    strengths: ['Voiceover Quality', 'Nostalgia Factor', 'Premium Feel', 'Storytelling'],
    considerations: ['Mobile Specific', 'Niche Appeal'],
    avgViews: '200K',
    avgLikes: '12K',
    avgComments: '1K',
    avgShares: '500',
    fitScores: { reach: 80, resonance: 98, relevance: 95, reliability: 99, efficiency: 90 },
    audienceGeo: 'US',
    audienceDemographics: 'Enthusiasts, Professionals',
    campaignRecommendation: 'Premium feel and product storytelling.',
    suggestedContent: 'Feature Review',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '4.0x', totalEngagement: '800K', totalImpressions: '3M', attributedRevenue: '$50K' },
    isNew: true,
    brandAffinity: ['thinkpad-x1', 'thinkbook-16'],
    actionInsights: {
      strengths: ['Premium Production', 'Storytelling', 'Loyal Audience'],
      considerations: ['Mobile Focus', 'Niche Reach'],
      actions: ['Product Story', 'Heritage Campaign']
    },
    influencerCost: 12000,
    executionCost: 4000
  },
  {
    id: 'techspurt',
    rank: 7,
    name: 'Tech Spurt',
    handle: '@TechSpurt',
    platform: 'YouTube',
    category: 'Macro Creators',
    type: 'Expert',
    avatarUrl: "https://images.unsplash.com/photo-1720166067122-b5036f549ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjBiZWFyZGVkJTIwbWFsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTI0MjgyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '800K',
    followersRaw: 800000,
    totalEngagement: '100K',
    engagementRate: 4.5,
    emv: '$20K',
    safetyScore: 98,
    riskLevel: 'Safe',
    strengths: ['British Humor', 'Wearables Specialist', 'Engaging Host', 'Entertaining Reviews'],
    considerations: ['Wearable Focus', 'Niche Comedy'],
    avgViews: '150K',
    avgLikes: '8K',
    avgComments: '500',
    avgShares: '200',
    fitScores: { reach: 76, resonance: 92, relevance: 95, reliability: 97, efficiency: 93 },
    audienceGeo: 'UK',
    audienceDemographics: 'Mobile Users, Tech Fans',
    campaignRecommendation: 'Entertaining product reviews with humor.',
    suggestedContent: 'Review & Comedy',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '3.8x', totalEngagement: '500K', totalImpressions: '2M', attributedRevenue: '$45K' },
    isNew: false,
    brandAffinity: ['legion-pro-7', 'legion-go'],
    actionInsights: {
      strengths: ['Unique Personality', 'Engaging Content', 'UK Market'],
      considerations: ['Niche Audience', 'Comedy Focus'],
      actions: ['Entertainment Campaign', 'Review Series']
    },
    influencerCost: 8500,
    executionCost: 3000
  },
  // --- Mid-tier Creators ---
  {
    id: 'matthewmoniz',
    rank: 8,
    name: 'Matthew Moniz',
    handle: '@MatthewMoniz',
    platform: 'YouTube',
    category: 'Mid-tier Creators',
    type: 'Expert',
    avatarUrl: "https://images.unsplash.com/photo-1737338849301-4e0ab7e2cdef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjB3aGl0ZSUyMG1hbGUlMjBnbGFzc2VzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxMjQyODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '200K',
    followersRaw: 200000,
    totalEngagement: '25K',
    engagementRate: 5.2,
    emv: '$6K',
    safetyScore: 98,
    riskLevel: 'Safe',
    strengths: ['Laptop Specialist', 'Benchmark Focus', 'Canadian Market', 'Technical Analysis'],
    considerations: ['PC Specific', 'Technical Content'],
    avgViews: '45K',
    avgLikes: '2.8K',
    avgComments: '180',
    avgShares: '80',
    fitScores: { reach: 69, resonance: 93, relevance: 98, reliability: 97, efficiency: 94 },
    audienceGeo: 'CA',
    audienceDemographics: 'Pros, Tech Enthusiasts',
    campaignRecommendation: 'In-depth laptop reviews with benchmarks.',
    suggestedContent: 'Technical Review',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '4.1x', totalEngagement: '120K', totalImpressions: '500K', attributedRevenue: '$12K' },
    isNew: false,
    brandAffinity: ['thinkpad-x1', 'thinkpad-t14'],
    actionInsights: {
      strengths: ['Technical Depth', 'Benchmark Expert', 'Canadian Market'],
      considerations: ['Laptop Only', 'Technical Audience'],
      actions: ['Benchmark Review', 'Technical Deep Dive']
    },
    influencerCost: 5500,
    executionCost: 2200
  },
  {
    id: 'techodyssey',
    rank: 9,
    name: 'Tech Odyssey',
    handle: '@TheTechOdyssey',
    platform: 'YouTube',
    category: 'Mid-tier Creators',
    type: 'Expert',
    avatarUrl: "https://images.unsplash.com/photo-1720166067122-b5036f549ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjBiZWFyZGVkJTIwbWFsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTI0MjgyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '100K',
    followersRaw: 100000,
    totalEngagement: '15K',
    engagementRate: 5.8,
    emv: '$4K',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['Laptop Reviews', 'Durability Focus', 'Product Comparisons', 'Detailed Analysis'],
    considerations: ['Niche Content', 'Audio Quality'],
    avgViews: '30K',
    avgLikes: '1.5K',
    avgComments: '100',
    avgShares: '40',
    fitScores: { reach: 65, resonance: 94, relevance: 95, reliability: 99, efficiency: 97 },
    audienceGeo: 'US',
    audienceDemographics: 'Buyers, Tech Enthusiasts',
    campaignRecommendation: 'Detailed product comparisons and reviews.',
    suggestedContent: 'Comparison Review',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '4.8x', totalEngagement: '80K', totalImpressions: '300K', attributedRevenue: '$8K' },
    isNew: true,
    brandAffinity: ['thinkpad-t14', 'ideapad-slim-5'],
    actionInsights: {
      strengths: ['Detailed Analysis', 'Honest Reviews', 'Value Focus'],
      considerations: ['Small Reach', 'Production Quality'],
      actions: ['Comparison Series', 'Honest Review']
    },
    influencerCost: 3500,
    executionCost: 1500
  },
  {
    id: 'juanbagnell',
    rank: 10,
    name: 'Juan Bagnell',
    handle: '@JuanBagnell',
    platform: 'YouTube',
    category: 'Mid-tier Creators',
    type: 'Expert',
    avatarUrl: "https://images.unsplash.com/photo-1757773873686-2257941bbcb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjBibGFjayUyMG1hbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEyNDI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '120K',
    followersRaw: 120000,
    totalEngagement: '18K',
    engagementRate: 6.2,
    emv: '$4.5K',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['Technical Deep Dives', 'Audio Engineering', 'Live Streaming', 'Expert Analysis'],
    considerations: ['Very Long Form', 'Complex Topics'],
    avgViews: '35K',
    avgLikes: '1.8K',
    avgComments: '100',
    avgShares: '50',
    fitScores: { reach: 66, resonance: 96, relevance: 93, reliability: 98, efficiency: 96 },
    audienceGeo: 'US',
    audienceDemographics: 'Techies, Audiophiles',
    campaignRecommendation: 'Deep technical analysis and reviews.',
    suggestedContent: 'Deep Dive Analysis',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '4.6x', totalEngagement: '90K', totalImpressions: '350K', attributedRevenue: '$9K' },
    isNew: false,
    brandAffinity: ['thinkstation-p3', 'thinkcentre-m90'],
    actionInsights: {
      strengths: ['Deep Technical Knowledge', 'Expert Analysis', 'Professional Audience'],
      considerations: ['Long Format', 'Technical Depth'],
      actions: ['Technical Deep Dive', 'Workstation Focus']
    },
    influencerCost: 4200,
    executionCost: 1800
  },
  // --- Micro Creators ---
  {
    id: 'techwithkg',
    rank: 11,
    name: 'Tech With KG',
    handle: '@TechWithKG',
    platform: 'YouTube',
    category: 'Micro Creators',
    type: 'Expert',
    avatarUrl: "https://images.unsplash.com/photo-1757773873686-2257941bbcb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjBibGFjayUyMG1hbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEyNDI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '45K',
    followersRaw: 45000,
    totalEngagement: '5K',
    engagementRate: 7.5,
    emv: '$2K',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['Budget Friendly', 'Value Analysis', 'Audio Focus', 'Practical Reviews'],
    considerations: ['Small Reach', 'Production Value'],
    avgViews: '15K',
    avgLikes: '1K',
    avgComments: '80',
    avgShares: '20',
    fitScores: { reach: 60, resonance: 97, relevance: 95, reliability: 98, efficiency: 98 },
    audienceGeo: 'US',
    audienceDemographics: 'Budget Buyers, Students',
    campaignRecommendation: 'Value-focused product recommendations.',
    suggestedContent: 'Best Budget Tech',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '5.5x', totalEngagement: '30K', totalImpressions: '100K', attributedRevenue: '$3K' },
    isNew: true,
    brandAffinity: ['ideapad-slim-5'],
    actionInsights: {
      strengths: ['Value Focus', 'Practical Reviews', 'Budget Audience'],
      considerations: ['Limited Reach', 'Production Value'],
      actions: ['Budget Campaign', 'Value Series']
    },
    influencerCost: 2000,
    executionCost: 1000
  },
  {
    id: 'dayoaworunse',
    rank: 12,
    name: 'Dayo Aworunse',
    handle: '@DayoAworunse',
    platform: 'YouTube',
    category: 'Micro Creators',
    type: 'Lifestyle',
    avatarUrl: "https://images.unsplash.com/photo-1550949249-c92801a213b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRlY2glMjByZXZpZXdlciUyMGNyZWF0aXZlJTIwbGlnaHRpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEyNDMyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '35K',
    followersRaw: 35000,
    totalEngagement: '4K',
    engagementRate: 8.0,
    emv: '$1.5K',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['High Aesthetics', 'Creative Lighting', 'Apple Ecosystem', 'Visual Storytelling'],
    considerations: ['Limited Dialogue', 'Visual Heavy'],
    avgViews: '12K',
    avgLikes: '900',
    avgComments: '60',
    avgShares: '15',
    fitScores: { reach: 58, resonance: 98, relevance: 96, reliability: 99, efficiency: 99 },
    audienceGeo: 'US',
    audienceDemographics: 'Creatives, Designers',
    campaignRecommendation: 'Aesthetic tech setup content.',
    suggestedContent: 'Tech Setup Tour',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '6.0x', totalEngagement: '25K', totalImpressions: '80K', attributedRevenue: '$2.5K' },
    isNew: false,
    brandAffinity: ['yoga-9i'],
    actionInsights: {
      strengths: ['Aesthetic Content', 'Creative Audience', 'Visual Quality'],
      considerations: ['Visual Focus', 'Creative Niche'],
      actions: ['Design Campaign', 'Setup Series']
    },
    influencerCost: 1500,
    executionCost: 800
  },
  {
    id: 'minimalistik',
    rank: 13,
    name: 'Minimalistik',
    handle: '@Minimalistik',
    platform: 'YouTube',
    category: 'Micro Creators',
    type: 'Lifestyle',
    avatarUrl: "https://images.unsplash.com/photo-1605504836193-e77d3d9ede8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjBhc2lhbiUyMG1hbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEyNDI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '49K',
    followersRaw: 49000,
    totalEngagement: '6K',
    engagementRate: 7.2,
    emv: '$2.3K',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['Extreme Minimalism', 'Clean Editing', 'Calm Tone', 'Desk Aesthetics'],
    considerations: ['Style Over Spec', 'Specific Look'],
    avgViews: '20K',
    avgLikes: '1.4K',
    avgComments: '100',
    avgShares: '40',
    fitScores: { reach: 62, resonance: 96, relevance: 98, reliability: 98, efficiency: 97 },
    audienceGeo: 'CA',
    audienceDemographics: 'Minimalists, Designers',
    campaignRecommendation: 'Minimalist tech setups and desk tours.',
    suggestedContent: 'Minimal Desk Setup',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '5.6x', totalEngagement: '38K', totalImpressions: '130K', attributedRevenue: '$3.8K' },
    isNew: false,
    brandAffinity: ['thinkbook-16', 'yoga-9i'],
    actionInsights: {
      strengths: ['Clean Aesthetic', 'Minimalist Audience', 'Calm Content'],
      considerations: ['Style Focus', 'Limited Tech Depth'],
      actions: ['Desk Campaign', 'Minimalist Series']
    },
    influencerCost: 1800,
    executionCost: 900
  },
  // --- UGC ---
  {
    id: 'ugc1',
    rank: 14,
    name: 'Tech Student Life',
    handle: '@TechStudentLife',
    platform: 'TikTok',
    category: 'UGC',
    type: 'Authentic',
    avatarUrl: "https://images.unsplash.com/photo-1583674392456-1f2830df8e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjB5b3VuZyUyMG1hbGUlMjBzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEyNDI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '4.5K',
    followersRaw: 4500,
    totalEngagement: '800',
    engagementRate: 12.0,
    emv: '$200',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['Raw & Authentic', 'Student Perspective', 'Humor', 'Relatable Content'],
    considerations: ['Unpolished', 'Gen Z Slang'],
    avgViews: '3K',
    avgLikes: '300',
    avgComments: '50',
    avgShares: '20',
    fitScores: { reach: 30, resonance: 99, relevance: 90, reliability: 95, efficiency: 99 },
    audienceGeo: 'US',
    audienceDemographics: 'Students, Young Adults',
    campaignRecommendation: 'Authentic student tech experiences.',
    suggestedContent: 'Tech Student Day in Life',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '8.0x', totalEngagement: '5K', totalImpressions: '15K', attributedRevenue: '$500' },
    isNew: true,
    brandAffinity: ['ideapad-slim-5'],
    actionInsights: {
      strengths: ['Authenticity', 'Student Audience', 'Relatable Content'],
      considerations: ['Production Quality', 'Limited Reach'],
      actions: ['Student Campaign', 'Authentic Series']
    },
    influencerCost: 800,
    executionCost: 400
  },
  {
    id: 'ugc2',
    rank: 15,
    name: 'Desk Setup Daily',
    handle: '@DeskSetupDaily',
    platform: 'Instagram',
    category: 'UGC',
    type: 'Curator',
    avatarUrl: "https://images.unsplash.com/photo-1751200065697-4461cc2b43cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29udGVudCUyMGNyZWF0b3IlMjBkZXNrJTIwc2V0dXAlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEyNDMyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '3.2K',
    followersRaw: 3200,
    totalEngagement: '500',
    engagementRate: 10.0,
    emv: '$150',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['High Quality Photos', 'Daily Consistency', 'Clean Feed', 'Workspace Inspiration'],
    considerations: ['Low Video Content', 'Generic Captions'],
    avgViews: '2K',
    avgLikes: '200',
    avgComments: '20',
    avgShares: '10',
    fitScores: { reach: 25, resonance: 98, relevance: 95, reliability: 96, efficiency: 98 },
    audienceGeo: 'UK',
    audienceDemographics: 'Professionals, Designers',
    campaignRecommendation: 'Desk setup inspiration content.',
    suggestedContent: 'Workspace Photo',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '7.5x', totalEngagement: '3K', totalImpressions: '10K', attributedRevenue: '$300' },
    isNew: false,
    brandAffinity: ['thinkbook-16', 'thinkcentre-m90'],
    actionInsights: {
      strengths: ['Visual Quality', 'Workspace Focus', 'Consistent Posting'],
      considerations: ['Limited Video', 'Generic Content'],
      actions: ['Workspace Campaign', 'Photo Series']
    },
    influencerCost: 600,
    executionCost: 300
  },
  {
    id: 'ugc3',
    rank: 16,
    name: 'Tech Mom Reviews',
    handle: '@TechMomReviews',
    platform: 'Instagram',
    category: 'UGC',
    type: 'Lifestyle',
    avatarUrl: "https://images.unsplash.com/photo-1584347922562-5d9542ec02ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjBmZW1hbGUlMjBibG9uZCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTI0MjgyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '3.5K',
    followersRaw: 3500,
    totalEngagement: '400',
    engagementRate: 9.0,
    emv: '$140',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['Parent Perspective', 'Family Tech', 'Practicality', 'Relatable Reviews'],
    considerations: ['Niche: Parents', 'Less Technical'],
    avgViews: '2.2K',
    avgLikes: '180',
    avgComments: '40',
    avgShares: '15',
    fitScores: { reach: 24, resonance: 96, relevance: 94, reliability: 99, efficiency: 98 },
    audienceGeo: 'US',
    audienceDemographics: 'Parents, Families',
    campaignRecommendation: 'Family-friendly tech reviews.',
    suggestedContent: 'Family Tech Review',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '7.0x', totalEngagement: '3.5K', totalImpressions: '11K', attributedRevenue: '$350' },
    isNew: false,
    brandAffinity: ['smart-display'],
    actionInsights: {
      strengths: ['Family Perspective', 'Practical Reviews', 'Trusted Voice'],
      considerations: ['Niche Audience', 'Tech Depth'],
      actions: ['Family Campaign', 'Practical Series']
    },
    influencerCost: 700,
    executionCost: 350
  },
  {
    id: 'ugc4',
    rank: 17,
    name: 'Budget Tech Finder',
    handle: '@BudgetTechFinder',
    platform: 'YouTube',
    category: 'UGC',
    type: 'Authentic',
    avatarUrl: "https://images.unsplash.com/photo-1757773873686-2257941bbcb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmV2aWV3ZXIlMjBibGFjayUyMG1hbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEyNDI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    followers: '3.8K',
    followersRaw: 3800,
    totalEngagement: '400',
    engagementRate: 8.0,
    emv: '$120',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['Deal Hunting', 'Budget Focus', 'Honest Value', 'Practical Advice'],
    considerations: ['Low Quality Video', 'Small Audience'],
    avgViews: '2K',
    avgLikes: '100',
    avgComments: '20',
    avgShares: '5',
    fitScores: { reach: 28, resonance: 95, relevance: 94, reliability: 96, efficiency: 97 },
    audienceGeo: 'US',
    audienceDemographics: 'Budget Shoppers',
    campaignRecommendation: 'Budget tech deals and reviews.',
    suggestedContent: 'Best Budget Tech',
    performance: { weeklyEngagement: [], weeklyROI: [], avgROI: '6.0x', totalEngagement: '3K', totalImpressions: '9K', attributedRevenue: '$250' },
    isNew: true,
    brandAffinity: ['ideapad-slim-5'],
    actionInsights: {
      strengths: ['Value Focus', 'Deal Expertise', 'Practical Advice'],
      considerations: ['Production Quality', 'Small Audience'],
      actions: ['Budget Campaign', 'Deal Series']
    },
    influencerCost: 500,
    executionCost: 250
  }
];

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
    if (geo === 'United States') {
      filtered = filtered.filter(inf => inf.audienceGeo.includes('US'));
    } else if (geo === 'Europe') {
      filtered = filtered.filter(inf => inf.audienceGeo.includes('UK') || inf.audienceGeo.includes('Europe'));
    } else if (geo === 'India') {
      filtered = filtered.filter(inf => inf.audienceGeo.includes('India'));
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
  const [showScriptGenerator, setShowScriptGenerator] = useState(false);
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
                  <button className="px-4 py-3 bg-[#2563EB] text-white rounded-xl font-bold text-sm hover:bg-[#1E40AF] transition-colors flex items-center justify-center gap-2">
                    <Plus size={18} /> Add to Campaign
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
            <span className="font-bold text-[#1C1C1C]">InfluencerX Intelligence</span>
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
  
  const [productLine, setProductLine] = useState<ProductLine>('thinkpad-x1');
  const [objective, setObjective] = useState<string>('awareness');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [geography, setGeography] = useState<CampaignGeography>('Global');
  const [description, setDescription] = useState<string>('');
  const [creatorCategory, setCreatorCategory] = useState<CreatorCategory>('UGC');
  const [productFocus, setProductFocus] = useState<ProductModel>('All Models');

  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [selectedInfluencerIds, setSelectedInfluencerIds] = useState<string[]>([]);
  const [selectedInfluencerForModal, setSelectedInfluencerForModal] = useState<Influencer | null>(null);
  const [showWarning, setShowWarning] = useState(false);

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
    return initialContext?.productFocus || "Lenovo Product Campaign";
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
    
    let geoMap: Record<string, CampaignGeography> = {
      'global': 'Global',
      'us-eu-india': 'US / Europe / India',
      'united-states': 'United States',
      'europe': 'Europe',
      'india': 'India'
    };
    const campaignGeo = geoMap[geography] || 'Global';
    
    const platformDisplayNames: Record<string, string> = {
      'instagram': 'Instagram',
      'tiktok': 'TikTok',
      'youtube': 'YouTube',
      'facebook': 'Facebook',
      'linkedin': 'LinkedIn',
      'twitter': 'Twitter'
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
    
    const geographyMap: Record<string, any> = {
      'global': 'Global',
      'us-eu-india': 'US / Europe / India',
      'united-states': 'United States',
      'europe': 'Europe',
      'india': 'India'
    };
    
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
      geography: geographyMap[geography] || geography,
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
      creatorTier: creatorCategory
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
                <Sparkles size={14} /> Lenovo Campaign Setup
              </div>
              <h1 className="text-2xl font-bold text-[#1C1C1C] mb-1">Campaign Strategy Setup</h1>
              <p className="text-gray-500 text-sm">
                Define your Lenovo product campaign parameters to discover the perfect tech influencers.
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
                          {GEOGRAPHIES.map((g) => (
                            <option key={g.value} value={g.value}>{g.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-[#1C1C1C] block mb-1 flex items-center gap-2">
                        <MonitorPlay size={16} /> Platforms <span className="text-gray-400 font-normal text-xs">(optional)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PLATFORMS.filter(p => p.value !== 'all-platforms').map((p) => (
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
                          {CREATOR_TIERS.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-[#1C1C1C] block mb-1">
                        Product Focus
                      </label>
                      <div className="relative">
                        <select 
                          value={productFocus}
                          onChange={(e) => setProductFocus(e.target.value as ProductModel)}
                          className="w-full h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] appearance-none"
                        >
                          {PRODUCT_MODELS.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                          ))}
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
                  placeholder={suggestedDescription || "Describe your Lenovo campaign goals, target audience, key messaging..."}
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
                      Analyzing Tech Network...
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
                  <h2 className="text-2xl font-bold text-[#1C1C1C] leading-tight">Recommended Tech Partners</h2>
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

            {/* Influencer Table - Removed Selected Count Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-1 flex flex-col">
              <div className="overflow-auto flex-1">
                <table className="w-full">
                  <thead className="bg-gray-50/80 sticky top-0 z-10">
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">Rank</th>
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
                              "hover:bg-gray-50/50 transition-colors cursor-pointer",
                              isSelected ? "bg-blue-50/30" : ""
                            )}
                            onClick={() => setSelectedInfluencerForModal(inf)}
                          >
                            <td className="px-4 py-3">
                              <div className={`
                                w-7 h-7 rounded-full flex items-center justify-center mx-auto font-bold text-xs
                                ${index === 0 ? 'bg-amber-50 text-amber-500' : ''}
                                ${index === 1 ? 'bg-gray-100 text-gray-500' : ''}
                                ${index === 2 ? 'bg-orange-50 text-orange-400' : ''}
                                ${index > 2 ? 'bg-gray-50 text-gray-400' : ''}
                              `}>
                                {index + 1}
                              </div>
                            </td>
                            <td className="px-4 py-3">
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
                            <td className="px-4 py-3">
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