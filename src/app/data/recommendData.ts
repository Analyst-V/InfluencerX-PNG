// Extracted from RecommendModule.tsx

// --- Types matching the provided RecommendModule.tsx source ---

export type PerformanceMetric = { week: string; value: number };

export type InfluencerPerformance = {
  weeklyEngagement: PerformanceMetric[];
  weeklyROI: PerformanceMetric[];
  avgROI: string;
  totalEngagement: string;
  totalImpressions: string;
  attributedRevenue: string;
};

export interface Influencer { 
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

// --- 1. Product Lines Array ---

export const PRODUCT_LINES = [
  { value: 'pro-v', label: 'Pantene Pro-V' },
  { value: 'miracles', label: 'Pantene Miracles' },
  { value: 'micellar', label: 'Pantene Micellar' },
  { value: 'nutrient-blends', label: 'Pantene Nutrient Blends' }
];

// --- 2. Influencer Roster Array ---

export const INFLUENCERS: Influencer[] = [
  {
    id: 'sakura_tanaka',
    rank: 1,
    name: 'Sakura Tanaka',
    handle: '@sakura_hair_diary',
    platform: 'Instagram',
    category: 'Macro Creators',
    type: 'Expert',
    avatarUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '850K',
    followersRaw: 850000,
    totalEngagement: '45K',
    engagementRate: 5.2,
    emv: '$15K',
    safetyScore: 98,
    riskLevel: 'Safe',
    strengths: ['J-Beauty Authority', 'Detailed Tutorials', 'High Trust'],
    considerations: ['Premium Pricing', 'Long lead times'],
    avgViews: '200K',
    avgLikes: '40K',
    avgComments: '1.2K',
    avgShares: '3.8K',
    fitScores: { reach: 85, resonance: 96, relevance: 98, reliability: 99, efficiency: 88 },
    audienceGeo: 'Japan',
    audienceDemographics: 'Women 18-34, Beauty Enthusiasts',
    campaignRecommendation: 'Perfect for Pantene Miracles premium tier product launch.',
    suggestedContent: 'Step-by-step glossy hair routine',
    performance: { 
      weeklyEngagement: [{ week: 'W1', value: 45000 }, { week: 'W2', value: 46000 }], 
      weeklyROI: [{ week: 'W1', value: 3.2 }, { week: 'W2', value: 3.4 }], 
      avgROI: '3.3x', 
      totalEngagement: '1.2M', 
      totalImpressions: '8.5M', 
      attributedRevenue: '$120K' 
    },
    isNew: false,
    brandAffinity: ['miracles', 'micellar'],
    actionInsights: {
      strengths: ['Strong local resonance', 'High conversion rate', 'Premium aesthetic'],
      considerations: ['Strict creative control'],
      actions: ['Product launch', 'Routine videos']
    },
    influencerCost: 15000,
    executionCost: 3000
  },
  {
    id: 'jieun_lee',
    rank: 2,
    name: 'Ji-eun Lee',
    handle: '@jieun_kbeauty',
    platform: 'YouTube',
    category: 'Enterprise',
    type: 'Veteran',
    avatarUrl: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '2.1M',
    followersRaw: 2100000,
    totalEngagement: '180K',
    engagementRate: 8.5,
    emv: '$45K',
    safetyScore: 95,
    riskLevel: 'Safe',
    strengths: ['Glass Skin/Hair Crossover', 'Massive Reach', 'Trend Setter'],
    considerations: ['High Cost', 'Busy Schedule'],
    avgViews: '850K',
    avgLikes: '120K',
    avgComments: '8.5K',
    avgShares: '15K',
    fitScores: { reach: 98, resonance: 92, relevance: 95, reliability: 97, efficiency: 80 },
    audienceGeo: 'South Korea',
    audienceDemographics: 'Women 16-29, Trend Followers',
    campaignRecommendation: 'Broad awareness campaigns focusing on the "Skinification" of hair.',
    suggestedContent: 'Full body & hair K-beauty shower routine',
    performance: { 
      weeklyEngagement: [{ week: 'W1', value: 180000 }, { week: 'W2', value: 195000 }], 
      weeklyROI: [{ week: 'W1', value: 4.1 }, { week: 'W2', value: 4.5 }], 
      avgROI: '4.2x', 
      totalEngagement: '3.5M', 
      totalImpressions: '25M', 
      attributedRevenue: '$400K' 
    },
    isNew: false,
    brandAffinity: ['nutrient-blends', 'pro-v'],
    actionInsights: {
      strengths: ['Trend creation', 'Massive youth appeal'],
      considerations: ['High production demands'],
      actions: ['Brand Awareness', 'Trend Campaign']
    },
    influencerCost: 40000,
    executionCost: 12000
  },
  {
    id: 'kenji_sato',
    rank: 3,
    name: 'Kenji Sato',
    handle: '@kenji_salon_pro',
    platform: 'TikTok',
    category: 'Mid-tier Creators',
    type: 'Expert',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '320K',
    followersRaw: 320000,
    totalEngagement: '35K',
    engagementRate: 10.9,
    emv: '$8K',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['Professional Stylist', 'Ingredient Breakdown', 'High Educational Value'],
    considerations: ['Clinical Tone', 'Niche Audience'],
    avgViews: '150K',
    avgLikes: '25K',
    avgComments: '800',
    avgShares: '9.2K',
    fitScores: { reach: 70, resonance: 98, relevance: 100, reliability: 99, efficiency: 95 },
    audienceGeo: 'Japan',
    audienceDemographics: 'Women 25-45, Haircare Shoppers',
    campaignRecommendation: 'Ingredient transparency and sulfate-free formula education.',
    suggestedContent: 'Salon vs. At-Home treatment comparison',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '5.1x', 
      totalEngagement: '800K', 
      totalImpressions: '4.2M', 
      attributedRevenue: '$65K' 
    },
    isNew: true,
    brandAffinity: ['micellar'],
    actionInsights: {
      strengths: ['Professional Authority', 'Trust building', 'Educational'],
      considerations: ['Less entertainment value'],
      actions: ['Ingredient Education', 'Salon-quality push']
    },
    influencerCost: 6500,
    executionCost: 1500
  },
  {
    id: 'minjun_park',
    rank: 4,
    name: 'Min-jun Park',
    handle: '@minjun_scalpcare',
    platform: 'Naver Blog',
    category: 'Micro Creators',
    type: 'Expert',
    avatarUrl: 'https://images.unsplash.com/photo-1542596594-649edbc13630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '85K',
    followersRaw: 85000,
    totalEngagement: '12K',
    engagementRate: 14.1,
    emv: '$3.5K',
    safetyScore: 96,
    riskLevel: 'Safe',
    strengths: ['Deep Written Reviews', 'SEO Value', 'Scalp Health Focus'],
    considerations: ['Low Video Capability', 'Platform Specific (Korea)'],
    avgViews: '45K',
    avgLikes: '8K',
    avgComments: '3.5K',
    avgShares: '500',
    fitScores: { reach: 55, resonance: 95, relevance: 98, reliability: 94, efficiency: 98 },
    audienceGeo: 'South Korea',
    audienceDemographics: 'Men & Women 25-50, Scalp Concern focused',
    campaignRecommendation: 'Deep dive into anti-hair fall and scalp barrier protection.',
    suggestedContent: '30-Day scalp transformation photo journal',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '6.5x', 
      totalEngagement: '250K', 
      totalImpressions: '1.1M', 
      attributedRevenue: '$35K' 
    },
    isNew: false,
    brandAffinity: ['pro-v'],
    actionInsights: {
      strengths: ['Search engine visibility', 'High intent audience'],
      considerations: ['Static format limitation'],
      actions: ['SEO strategy', 'Scalp health focus']
    },
    influencerCost: 2500,
    executionCost: 500
  },
  {
    id: 'yui_takahashi',
    rank: 5,
    name: 'Yui Takahashi',
    handle: '@yui_everyday_style',
    platform: 'Instagram',
    category: 'Micro Creators',
    type: 'Lifestyle',
    avatarUrl: 'https://th.bing.com/th/id/OIP.GPERQlh9OIFNrcZ8m5ph4gAAAA?w=138&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    followers: '65K',
    followersRaw: 65000,
    totalEngagement: '5.5K',
    engagementRate: 8.4,
    emv: '$2K',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['Relatable', 'Quick Styling Tips', 'Anti-Humidity Focus'],
    considerations: ['Lower reach', 'Generalist lifestyle mix'],
    avgViews: '25K',
    avgLikes: '4.5K',
    avgComments: '400',
    avgShares: '600',
    fitScores: { reach: 45, resonance: 88, relevance: 90, reliability: 98, efficiency: 97 },
    audienceGeo: 'Japan',
    audienceDemographics: 'Working Women 22-35, Tokyo based',
    campaignRecommendation: 'Showcasing frizz control during Japanese humid summers (Tsuyu).',
    suggestedContent: '5-minute morning hair routine for rainy days',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '4.8x', 
      totalEngagement: '120K', 
      totalImpressions: '500K', 
      attributedRevenue: '$15K' 
    },
    isNew: true,
    brandAffinity: ['miracles', 'pro-v'],
    actionInsights: {
      strengths: ['Highly relatable', 'Weather-specific pain points'],
      considerations: ['Lifestyle dilution'],
      actions: ['Seasonal campaign', 'Quick utility videos']
    },
    influencerCost: 1800,
    executionCost: 600
  },
  {
    id: 'sooah_kim',
    rank: 6,
    name: 'Soo-ah Kim',
    handle: '@sooah_glowup',
    platform: 'TikTok',
    category: 'UGC',
    type: 'Authentic',
    avatarUrl: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '28K',
    followersRaw: 28000,
    totalEngagement: '4K',
    engagementRate: 14.2,
    emv: '$1.2K',
    safetyScore: 92,
    riskLevel: 'Moderate',
    strengths: ['Viral Transformation Trends', 'Gen-Z Appeal', 'High Energy'],
    considerations: ['Fast trend cycle', 'Less brand loyalty'],
    avgViews: '150K',
    avgLikes: '18K',
    avgComments: '2K',
    avgShares: '5K',
    fitScores: { reach: 35, resonance: 99, relevance: 85, reliability: 80, efficiency: 99 },
    audienceGeo: 'South Korea',
    audienceDemographics: 'Gen-Z 13-24',
    campaignRecommendation: 'Before/After hair transformation challenges.',
    suggestedContent: 'Damage repair transition edit (TikTok sound trend)',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '8.5x', 
      totalEngagement: '300K', 
      totalImpressions: '2M', 
      attributedRevenue: '$18K' 
    },
    isNew: true,
    brandAffinity: ['miracles'],
    actionInsights: {
      strengths: ['Viral potential', 'Strong hook creation'],
      considerations: ['Unpredictable algorithm'],
      actions: ['Hashtag Challenge', 'Transformation UGC']
    },
    influencerCost: 800,
    executionCost: 200
  },
  {
    id: 'rina_suzuki',
    rank: 7,
    name: 'Rina Suzuki',
    handle: '@rina_minimalist',
    platform: 'YouTube',
    category: 'Mid-tier Creators',
    type: 'Curator',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '450K',
    followersRaw: 450000,
    totalEngagement: '32K',
    engagementRate: 7.1,
    emv: '$9K',
    safetyScore: 99,
    riskLevel: 'Safe',
    strengths: ['J-Beauty Minimalism', 'Aesthetic Vlog Style', 'Sustainability Focus'],
    considerations: ['Slow pacing', 'Subtle branding required'],
    avgViews: '180K',
    avgLikes: '12K',
    avgComments: '800',
    avgShares: '1.2K',
    fitScores: { reach: 75, resonance: 94, relevance: 92, reliability: 98, efficiency: 92 },
    audienceGeo: 'Japan',
    audienceDemographics: 'Women 20-35, Eco-conscious',
    campaignRecommendation: 'Highlighting packaging sustainability and clean ingredients.',
    suggestedContent: 'Minimalist bathroom tour & clean haircare routine',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '4.5x', 
      totalEngagement: '900K', 
      totalImpressions: '5M', 
      attributedRevenue: '$75K' 
    },
    isNew: false,
    brandAffinity: ['nutrient-blends', 'micellar'],
    actionInsights: {
      strengths: ['High aesthetic value', 'Eco-friendly alignment'],
      considerations: ['Overt selling performs poorly'],
      actions: ['Brand Values Campaign', 'Soft placement']
    },
    influencerCost: 8500,
    executionCost: 2500
  },
  {
    id: 'chaewon_choi',
    rank: 8,
    name: 'Chae-won Choi',
    handle: '@chaewon_official',
    platform: 'Instagram',
    category: 'Enterprise',
    type: 'Veteran',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '3.4M',
    followersRaw: 3400000,
    totalEngagement: '250K',
    engagementRate: 7.3,
    emv: '$60K',
    safetyScore: 98,
    riskLevel: 'Safe',
    strengths: ['A-list Status', 'Skincare/Haircare Crossover', 'Premium Endorsements'],
    considerations: ['Very High Cost', 'Highly restrictive contracts'],
    avgViews: '1.2M',
    avgLikes: '220K',
    avgComments: '12K',
    avgShares: '8K',
    fitScores: { reach: 100, resonance: 88, relevance: 90, reliability: 99, efficiency: 75 },
    audienceGeo: 'South Korea, Global',
    audienceDemographics: 'Broad Female Demographic 18-45',
    campaignRecommendation: 'Hero face of the brand for major regional campaigns.',
    suggestedContent: 'High-production commercial style reel',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '3.1x', 
      totalEngagement: '5.2M', 
      totalImpressions: '40M', 
      attributedRevenue: '$650K' 
    },
    isNew: false,
    brandAffinity: ['miracles', 'nutrient-blends'],
    actionInsights: {
      strengths: ['Unmatched Prestige', 'Instant brand elevation'],
      considerations: ['Lower direct ROI efficiency'],
      actions: ['Hero Campaign', 'OOH & Digital Broadcast']
    },
    influencerCost: 75000,
    executionCost: 20000
  },
  // --- REAL KOREAN BEAUTY INFLUENCERS ---
  {
    id: 'hannah_park',
    rank: 9,
    name: 'Hannah Park',
    handle: '@hannah_park_beauty',
    platform: 'YouTube',
    category: 'Macro Creators',
    type: 'Expert',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '1.2M',
    followersRaw: 1200000,
    totalEngagement: '95K',
    engagementRate: 7.9,
    emv: '$28K',
    safetyScore: 97,
    riskLevel: 'Safe',
    strengths: ['K-Beauty Authority', 'Detailed Reviews', 'High Production Quality'],
    considerations: ['Premium pricing', 'Long lead times'],
    avgViews: '450K',
    avgLikes: '75K',
    avgComments: '5.2K',
    avgShares: '8.5K',
    fitScores: { reach: 92, resonance: 94, relevance: 96, reliability: 98, efficiency: 85 },
    audienceGeo: 'South Korea, Global',
    audienceDemographics: 'Women 18-35, Beauty Enthusiasts',
    campaignRecommendation: 'Perfect for luxury and premium haircare launches.',
    suggestedContent: 'Glass hair routine with Pantene Pro-V',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '4.0x', 
      totalEngagement: '1.8M', 
      totalImpressions: '12M', 
      attributedRevenue: '$250K' 
    },
    isNew: false,
    brandAffinity: ['pro-v', 'miracles'],
    actionInsights: {
      strengths: ['High credibility', 'Excellent engagement', 'Professional content'],
      considerations: ['High cost', 'Scheduling constraints'],
      actions: ['Product reviews', 'Tutorial series', 'Brand ambassador']
    },
    influencerCost: 25000,
    executionCost: 5000
  },
  {
    id: 'minji_kim',
    rank: 10,
    name: 'Minji Kim',
    handle: '@minji_skin_hair',
    platform: 'Instagram',
    category: 'Mid-tier Creators',
    type: 'Expert',
    avatarUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '380K',
    followersRaw: 380000,
    totalEngagement: '28K',
    engagementRate: 7.4,
    emv: '$7K',
    safetyScore: 96,
    riskLevel: 'Safe',
    strengths: ['Scalp Health Expert', 'Scientific Approach', 'Trustworthy'],
    considerations: ['Technical content', 'Less lifestyle appeal'],
    avgViews: '80K',
    avgLikes: '22K',
    avgComments: '1.8K',
    avgShares: '2.5K',
    fitScores: { reach: 72, resonance: 90, relevance: 95, reliability: 98, efficiency: 93 },
    audienceGeo: 'South Korea',
    audienceDemographics: 'Women 25-45, Scalp Health Focused',
    campaignRecommendation: 'Educational campaigns focusing on scalp care and hair health.',
    suggestedContent: 'Scalp detox and hair strengthening routine',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '5.2x', 
      totalEngagement: '650K', 
      totalImpressions: '3.8M', 
      attributedRevenue: '$95K' 
    },
    isNew: false,
    brandAffinity: ['micellar', 'pro-v'],
    actionInsights: {
      strengths: ['Deep expertise', 'High trust factor', 'Educational content'],
      considerations: ['Narrow audience', 'Less viral potential'],
      actions: ['Ingredient education', 'Scalp health campaign']
    },
    influencerCost: 7000,
    executionCost: 1500
  },
  {
    id: 'sana_yamamoto',
    rank: 11,
    name: 'Sana Yamamoto',
    handle: '@sana_tokyo_beauty',
    platform: 'TikTok',
    category: 'UGC',
    type: 'Authentic',
    avatarUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '95K',
    followersRaw: 95000,
    totalEngagement: '12K',
    engagementRate: 12.6,
    emv: '$2.5K',
    safetyScore: 94,
    riskLevel: 'Moderate',
    strengths: ['Gen-Z Relatable', 'Quick Tips', 'High Energy'],
    considerations: ['Trend dependent', 'Short attention span'],
    avgViews: '250K',
    avgLikes: '35K',
    avgComments: '3.2K',
    avgShares: '8K',
    fitScores: { reach: 60, resonance: 96, relevance: 88, reliability: 85, efficiency: 98 },
    audienceGeo: 'Japan',
    audienceDemographics: 'Gen-Z 16-25, Trend Followers',
    campaignRecommendation: 'Viral challenges and quick transformation content.',
    suggestedContent: '15-second hair transformation hack',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '7.5x', 
      totalEngagement: '450K', 
      totalImpressions: '2.8M', 
      attributedRevenue: '$42K' 
    },
    isNew: true,
    brandAffinity: ['miracles', 'pro-v'],
    actionInsights: {
      strengths: ['Viral potential', 'Fast content creation'],
      considerations: ['Low retention', 'Trend fatigue'],
      actions: ['Hashtag challenge', 'Quick tutorials']
    },
    influencerCost: 1200,
    executionCost: 300
  },
  // --- JAPANESE BEAUTY INFLUENCERS ---
  {
    id: 'mai_tanaka',
    rank: 12,
    name: 'Mai Tanaka',
    handle: '@mai_beauty_lab',
    platform: 'YouTube',
    category: 'Macro Creators',
    type: 'Expert',
    avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9bef656c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '650K',
    followersRaw: 650000,
    totalEngagement: '42K',
    engagementRate: 6.5,
    emv: '$12K',
    safetyScore: 98,
    riskLevel: 'Safe',
    strengths: ['J-Beauty Expertise', 'Salon Quality Content', 'Trusted Reviews'],
    considerations: ['Formal presentation', 'Higher cost'],
    avgViews: '280K',
    avgLikes: '35K',
    avgComments: '2.8K',
    avgShares: '4.2K',
    fitScores: { reach: 82, resonance: 90, relevance: 94, reliability: 99, efficiency: 88 },
    audienceGeo: 'Japan',
    audienceDemographics: 'Women 22-40, Quality Seekers',
    campaignRecommendation: 'Quality-focused campaigns emphasizing salon-grade results.',
    suggestedContent: 'Salon-quality hair treatment tutorial',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '3.8x', 
      totalEngagement: '1.1M', 
      totalImpressions: '7.5M', 
      attributedRevenue: '$180K' 
    },
    isNew: false,
    brandAffinity: ['miracles', 'nutrient-blends'],
    actionInsights: {
      strengths: ['Quality content', 'High trust', 'Professional appeal'],
      considerations: ['Premium pricing', 'Less casual'],
      actions: ['Premium product launch', 'Educational series']
    },
    influencerCost: 18000,
    executionCost: 4000
  },
  {
    id: 'haruka_watanabe',
    rank: 13,
    name: 'Haruka Watanabe',
    handle: '@haruka_daily_style',
    platform: 'Instagram',
    category: 'Micro Creators',
    type: 'Lifestyle',
    avatarUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '48K',
    followersRaw: 48000,
    totalEngagement: '3.8K',
    engagementRate: 7.9,
    emv: '$1.5K',
    safetyScore: 97,
    riskLevel: 'Safe',
    strengths: ['Relatable Lifestyle', 'Everyday Beauty', 'Authentic Voice'],
    considerations: ['Smaller reach', 'Lifestyle dilution'],
    avgViews: '30K',
    avgLikes: '4.2K',
    avgComments: '450',
    avgShares: '380',
    fitScores: { reach: 40, resonance: 89, relevance: 88, reliability: 97, efficiency: 96 },
    audienceGeo: 'Japan',
    audienceDemographics: 'Women 22-32, Urban Professionals',
    campaignRecommendation: 'Everyday hair care routines for busy professionals.',
    suggestedContent: '5-minute morning hair styling routine',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '5.5x', 
      totalEngagement: '160K', 
      totalImpressions: '750K', 
      attributedRevenue: '$22K' 
    },
    isNew: true,
    brandAffinity: ['pro-v', 'micellar'],
    actionInsights: {
      strengths: ['Authentic engagement', 'Relatable content'],
      considerations: ['Limited scale', 'Competitive space'],
      actions: ['Daily routine content', 'Product integration']
    },
    influencerCost: 1500,
    executionCost: 400
  },
  {
    id: 'yuki_nakamura',
    rank: 14,
    name: 'Yuki Nakamura',
    handle: '@yuki_hair_stylist',
    platform: 'TikTok',
    category: 'Mid-tier Creators',
    type: 'Expert',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '210K',
    followersRaw: 210000,
    totalEngagement: '22K',
    engagementRate: 10.5,
    emv: '$5K',
    safetyScore: 95,
    riskLevel: 'Safe',
    strengths: ['Professional Stylist', 'Fast Tutorials', 'Practical Tips'],
    considerations: ['Technical focus', 'Less lifestyle'],
    avgViews: '180K',
    avgLikes: '28K',
    avgComments: '1.5K',
    avgShares: '6.2K',
    fitScores: { reach: 65, resonance: 95, relevance: 98, reliability: 96, efficiency: 97 },
    audienceGeo: 'Japan',
    audienceDemographics: 'Women 20-40, Hair Enthusiasts',
    campaignRecommendation: 'Professional styling tips using Pantene products.',
    suggestedContent: 'Blowout tutorial with Pantene Pro-V',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '6.2x', 
      totalEngagement: '620K', 
      totalImpressions: '3.5M', 
      attributedRevenue: '$78K' 
    },
    isNew: true,
    brandAffinity: ['pro-v', 'miracles'],
    actionInsights: {
      strengths: ['Professional credibility', 'High engagement'],
      considerations: ['Platform specific', 'Less lifestyle cross-over'],
      actions: ['Tutorial series', 'Salon tips']
    },
    influencerCost: 5500,
    executionCost: 1200
  },
  // --- MORE KOREAN INFLUENCERS ---
  {
    id: 'eunji_choi',
    rank: 15,
    name: 'Eunji Choi',
    handle: '@eunji_kbeauty_glow',
    platform: 'YouTube',
    category: 'Macro Creators',
    type: 'Expert',
    avatarUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '890K',
    followersRaw: 890000,
    totalEngagement: '68K',
    engagementRate: 7.6,
    emv: '$18K',
    safetyScore: 96,
    riskLevel: 'Safe',
    strengths: ['K-Beauty Authority', 'Product Reviews', 'Detailed Analysis'],
    considerations: ['Long format content', 'High expectation'],
    avgViews: '520K',
    avgLikes: '85K',
    avgComments: '6.5K',
    avgShares: '9.8K',
    fitScores: { reach: 90, resonance: 92, relevance: 94, reliability: 97, efficiency: 86 },
    audienceGeo: 'South Korea, Global',
    audienceDemographics: 'Women 18-40, Beauty Lovers',
    campaignRecommendation: 'Detailed reviews and comparison content.',
    suggestedContent: 'Pantene vs. Luxury Haircare Comparison',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '4.2x', 
      totalEngagement: '2.2M', 
      totalImpressions: '15M', 
      attributedRevenue: '$320K' 
    },
    isNew: false,
    brandAffinity: ['nutrient-blends', 'miracles'],
    actionInsights: {
      strengths: ['Deep product knowledge', 'Comparison content expert'],
      considerations: ['High production demands'],
      actions: ['Product comparisons', 'In-depth reviews']
    },
    influencerCost: 22000,
    executionCost: 4500
  },
  {
    id: 'soojin_lee',
    rank: 16,
    name: 'Soojin Lee',
    handle: '@soojin_scalp',
    platform: 'Naver Blog',
    category: 'Micro Creators',
    type: 'Expert',
    avatarUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '32K',
    followersRaw: 32000,
    totalEngagement: '4.8K',
    engagementRate: 15.0,
    emv: '$1.8K',
    safetyScore: 97,
    riskLevel: 'Safe',
    strengths: ['Scalp Health Authority', 'SEO Focused', 'High Trust'],
    considerations: ['Written format', 'Limited reach'],
    avgViews: '35K',
    avgLikes: '5.5K',
    avgComments: '2.8K',
    avgShares: '350',
    fitScores: { reach: 35, resonance: 96, relevance: 100, reliability: 99, efficiency: 99 },
    audienceGeo: 'South Korea',
    audienceDemographics: 'Adults 28-55, Scalp Health Conscious',
    campaignRecommendation: 'In-depth scalp care educational content.',
    suggestedContent: 'Complete guide to scalp health and hair fall prevention',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '8.0x', 
      totalEngagement: '180K', 
      totalImpressions: '850K', 
      attributedRevenue: '$28K' 
    },
    isNew: false,
    brandAffinity: ['micellar', 'pro-v'],
    actionInsights: {
      strengths: ['SEO value', 'High authority', 'Long-lasting content'],
      considerations: ['Written format limitation'],
      actions: ['Blog series', 'Educational content']
    },
    influencerCost: 2000,
    executionCost: 400
  },
  {
    id: 'juri_tanaka',
    rank: 17,
    name: 'Juri Tanaka',
    handle: '@juri_japanbeauty',
    platform: 'Instagram',
    category: 'UGC',
    type: 'Authentic',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    followers: '55K',
    followersRaw: 55000,
    totalEngagement: '5.2K',
    engagementRate: 9.5,
    emv: '$1.8K',
    safetyScore: 95,
    riskLevel: 'Safe',
    strengths: ['Authentic Content', 'J-Beauty Lover', 'Genuine Reviews'],
    considerations: ['Smaller following', 'Less production value'],
    avgViews: '45K',
    avgLikes: '6.8K',
    avgComments: '520',
    avgShares: '980',
    fitScores: { reach: 42, resonance: 92, relevance: 90, reliability: 96, efficiency: 97 },
    audienceGeo: 'Japan',
    audienceDemographics: 'Women 20-32, Authentic Beauty Seekers',
    campaignRecommendation: 'Authentic user experience and real reviews.',
    suggestedContent: 'Real hair transformation journey',
    performance: { 
      weeklyEngagement: [], 
      weeklyROI: [], 
      avgROI: '6.0x', 
      totalEngagement: '190K', 
      totalImpressions: '1.1M', 
      attributedRevenue: '$32K' 
    },
    isNew: true,
    brandAffinity: ['miracles', 'pro-v'],
    actionInsights: {
      strengths: ['High authenticity', 'Strong engagement rate'],
      considerations: ['Limited scale', 'Content style constraints'],
      actions: ['Real reviews', 'Transformation stories']
    },
    influencerCost: 1600,
    executionCost: 350
  }
];

// --- Backward-compatible alias for previous code expectations ---
export const REAL_INFLUENCERS = INFLUENCERS;

// --- Missing constants expected by RecommendModule.tsx ---
export const OBJECTIVES = [
  { value: 'all-objectives', label: 'All Objectives' },
  { value: 'awareness', label: 'Awareness' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'sales', label: 'Sales' },
  { value: 'new-customers', label: 'New Customer Acquisition' }
];

export const PLATFORMS = [
  { value: 'all-platforms', label: 'All Platforms' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter' }
];

export const GEOGRAPHIES = [
  { value: 'global', label: 'Global' },
  { value: 'us-eu-india', label: 'U.S. / Europe / India' },
  { value: 'united-states', label: 'United States' },
  { value: 'europe', label: 'Europe' },
  { value: 'india', label: 'India' }
];

export const CREATOR_TIERS = [
  { value: 'UGC', label: 'UGC (Authenticity)' },
  { value: 'Micro Creators', label: 'Micro (High Engagement)' },
  { value: 'Mid-tier Creators', label: 'Mid-Tier (Balance)' },
  { value: 'Macro Creators', label: 'Macro (Reach)' },
  { value: 'Enterprise', label: 'Enterprise (Authority)' }
];

export const PRODUCT_MODELS = [
  { value: 'All Models', label: 'All Models' },
  { value: 'Pantene Pro-V', label: 'Pantene Pro-V' },
  { value: 'Pantene Miracles', label: 'Pantene Miracles' },
  { value: 'Pantene Micellar', label: 'Pantene Micellar' },
  { value: 'Pantene Nutrient Blends', label: 'Pantene Nutrient Blends' }
];

// --- Lightweight type aliases for compatibility ---
export type ProductLine = string;
export type ProductModel = string;
export type CampaignGeography = string;
export type CreatorCategory = string;

import { activeBrand } from './brandConfig';

// --- Product display names ---
export const PRODUCT_DISPLAY_NAMES: Record<string, string> = {
  "pro-v": "Pantene Pro-V",
  "miracles": "Pantene Miracles",
  "micellar": "Pantene Micellar",
  "nutrient-blends": "Pantene Nutrient Blends"
};

// --- Product-specific campaign contexts ---
export const PRODUCT_CONTEXTS: Record<string, {
  heritage: string; audience: string; tone: string;
  values: string; keyFeatures: string[];
}> = {
  'pro-v': {
    heritage: 'The foundational Pro-Vitamin B5 formula trusted globally for core strength and daily damage repair.',
    audience: 'Everyday consumers looking for reliable, daily hair health and protection.',
    tone: 'Accessible, reliable, and uplifting.',
    values: 'Healthy, resilient hair should be achievable for everyone, every day.',
    keyFeatures: ['Pro-Vitamin B5 infusion', 'Daily damage repair', 'Strengthens from the core']
  },
  'miracles': {
    heritage: 'Premium, salon-inspired formulations targeting severe damage, color care, and transformative results.',
    audience: 'Trend-conscious consumers and salon frequenters dealing with chemical or heat damage.',
    tone: 'Luxurious, transformative, and expert-led.',
    values: 'Premium ingredients for salon-grade hair rescue without leaving home.',
    keyFeatures: ['Lipid infusion', 'Intense moisture lock', 'Premium signature scent']
  },
  'micellar': {
    heritage: 'Skincare-inspired purifying technology adapted for gentle, deep scalp cleansing.',
    audience: 'Urban dwellers or those with sensitive/oily scalps seeking a clean, lightweight feel.',
    tone: 'Fresh, clean, and clinical.',
    values: 'A healthy scalp is the foundation for beautiful hair; detoxify without stripping.',
    keyFeatures: ['0% silicones', 'Micellar water technology', 'Scalp pH balance']
  }
  ,
  'nutrient-blends': {
    heritage: 'A modern line blending botanical extracts and targeted actives for tailored hair wellness.',
    audience: 'Conscious consumers seeking ingredient-led benefits and lightweight performance.',
    tone: 'Curated, ingredient-forward, and transparent.',
    values: 'Holistic hair care using thoughtfully sourced botanicals and smart formulations.',
    keyFeatures: ['Botanical complexes', 'Lightweight conditioning', 'Targeted scalp & strand nutrition']
  }
};

// (Removed duplicated PRODUCT_OBJECTIVE_SUGGESTIONS — consolidated Pantene suggestions appear later in this file.)

// Objective-specific goals
export const OBJECTIVE_GOALS: Record<string, { goalLabel: string }> = {
  "awareness": { goalLabel: "Brand Awareness" },
  "engagement": { goalLabel: "Engagement" },
  "sales": { goalLabel: "Sales" },
  "new-customers": { goalLabel: "New Customer Acquisition" }
};

// Product + Objective specific campaign suggestions for Pantene
export const PRODUCT_OBJECTIVE_SUGGESTIONS: Record<string, Record<string, { title: string; description: string }[]>> = {
  "pro-v": {
    "awareness": [
      { title: "The 14-Day Core Strength Challenge", description: "Position Pantene Pro-V as the gold standard for daily damage repair. Highlight the Pro-Vitamin B5 formula rebuilding hair bonds from the inside out." },
      { title: "Daily Pollution Defense", description: "Show how working professionals in urban centers use Pro-V to shield hair from environmental damage and micro-dust." },
      { title: "The Science of Pro-Vitamin B5", description: "Emphasize Swiss-heritage vitamin science and laboratory-proven metrics for core hair resilience." }
    ],
    "engagement": [
      { title: "#ProVHairCheck", description: "User-generated content showcasing everyday consumers documenting daily hair health improvements and elasticity over two weeks." },
      { title: "Core Resilience Challenge", description: "Challenge followers to test their hair strength using interactive, relatable styling videos." },
      { title: "Fan Appreciation: The Golden Bottle", description: "Celebrate the multi-generational trust of Pantene's iconic formula with custom brand filters and nostalgic community stories." }
    ],
    "sales": [
      { title: "Daily Essentials Bundle", description: "Promote Pantene Pro-V shampoo and conditioner duo packs with exclusive regional retailer discounts." },
      { title: "Family Care Value Offer", description: "Special subscription pricing for family-sized pump bottles with extended loyalty reward points." },
      { title: "Upgrade Your Wash Routine", description: "Incentivize bulk upgrades from generic private-label lines to Pantene Pro-V with trial-size styling items." }
    ],
    "new-customers": [
      { title: "My First Haircare Routine", description: "Target university students or young adults launching their independent daily grooming routines." },
      { title: "Salon Brand Switcher", description: "Convince premium salon-brand users to switch to Pro-V for cost-effective, clinically backed daily maintenance." },
      { title: "Working Professional Essential", description: "Position Pro-V as the low-maintenance, high-efficiency staple for busy mornings." }
    ]
  },
  "miracles": {
    "awareness": [
      { title: "The At-Home Salon Miracle", description: "Position Pantene Miracles as the ultimate high-performance treatment line for severe chemical, bleach, and heat damage." },
      { title: "Lipid Shot Innovation", description: "Highlight advanced Cashmere Smooth lipid technology that targets hollowed hair fibers to lock in moisture." },
      { title: "Premium Cashmere Finish", description: "Showcase reflective gloss and deep repair configurations for highly processed or colored hair." }
    ],
    "engagement": [
      { title: "#GlassHairTransformation", description: "Community visual highlights and transition edits showcasing dramatic before-and-after silkiness trends." },
      { title: "Stylist Masterclass Series", description: "Partner with celebrity hair artists from Tokyo and Seoul to showcase at-home premium blowout treatments." },
      { title: "Miracles Hair Challenge", description: "Host interactive social media sweepstakes where users tag their friends with bleached or damaged hair to win a routine kit." }
    ],
    "sales": [
      { title: "Intensive Rescue Bundle", description: "Package the Miracles shampoo and dual-active treatment cream with a custom premium micro-fiber hair wrap." },
      { title: "Luxury Self-Care Offer", description: "Premium configuration highlighting the signature white musk and rose fragrance alongside advanced leave-in serums." },
      { title: "Seasonal Damage Recovery", description: "Capitalize on seasonal post-bleach or high-summer repair needs with promotional regional e-vouchers." }
    ],
    "new-customers": [
      { title: "Post-Bleach Recovery Guide", description: "Help Gen-Z and millennial consumers transition from expensive salon treatments to at-home maintenance after drastic color changes." },
      { title: "The Glass Hair Seeker", description: "Position as a premium content creation powerhouse line that achieves the coveted glass-like hyper-reflective shine." },
      { title: "Beauty Trend Enthusiast", description: "Attract luxury-skewed skincare consumers with premium ingredients, sleek packaging, and transformative claims." }
    ]
  },
  "micellar": {
    "awareness": [
      { title: "Scalp Care is Skincare", description: "Celebrate the gentle, purifying power of Micellar technology that lifts micro-impurities without stripping natural oils." },
      { title: "0% Silicone Purifying Detox", description: "Position Micellar as the ultimate weightless tool for deep, scalp-refreshing cleansing." },
      { title: "Lightweight Volume & Balance", description: "Showcase the advanced formulation matching optimal scalp pH levels for a non-greasy, bouncy finish." }
    ],
    "engagement": [
      { title: "#ScalpDetoxRoutine", description: "Creative daily vlogs showing urban consumers resetting their scalps after long, hot commutes." },
      { title: "Anti-Humidity Desk Setup", description: "Partner with corporate lifestyle micro-influCreators to showcase aesthetic office hair-refresh items during humid rainy seasons (*Tsuyu*)." },
      { title: "The Clean Scalp Test", description: "Challenge wellness-focused audiences to track hair grease and weight reduction using micro-influencer step-by-step videos." }
    ],
    "sales": [
      { title: "Urban Refresh Bundle", description: "Package Micellar shampoo with a scalp-massaging detox brush and lightweight mist." },
      { title: "Summer Reset Premium Upgrade", description: "Deep-cleansing configuration paired with exclusive travel size bottles for active or gym-goers." },
      { title: "Student Refresh Offer", description: "Special pricing for students looking for an affordable, high-efficacy solution to combat oily scalps during humid seasons." }
    ],
    "new-customers": [
      { title: "The Heavy Build-Up Alternative", description: "Show why users dealing with flat, weighted-down hair choose Pantene Micellar over heavy conditioning alternatives." },
      { title: "First Pure Scalp Cleanser", description: "Convert traditional shampoo users by introducing the skincare-inspired concept of active micellar water for roots." },
      { title: "Active Lifestyle Starter", description: "Help fitness, outdoor, and wellness enthusiasts build a gentle, everyday scalp-cleansing habit." }
    ]
  }
  ,
  "nutrient-blends": {
    "awareness": [
      { title: "Ingredient Stories", description: "Educate consumers on the provenance and benefits of each botanical blend for targeted hair needs." },
      { title: "Micro-Influencer Lab Tests", description: "Deploy credible micro-creators to trial formulations and report measurable softness/shine gains." },
      { title: "Daily Rituals", description: "Showcase how small, targeted swaps in daily routines produce visible long-term hair health improvements." }
    ],
    "engagement": [
      { title: "Blend & Tell", description: "Interactive polls and UGC where audiences pick their preferred botanical blend for their hair type." },
      { title: "Ingredient Deep Dives", description: "Short-form explainers comparing active profiles and benefits for different hair concerns." },
      { title: "Before/After Diaries", description: "Community-driven progress stories showing gradual improvements using nutrient blends." }
    ],
    "sales": [
      { title: "Starter Kits", description: "Curated sample packs encouraging trial across multiple blend profiles with introductory discounts." },
      { title: "Subscription Bundles", description: "Personalized refill subscriptions based on hair goals and seasonal needs." },
      { title: "Cross-Sell Wellness", description: "Bundles pairing shampoo with complementary scalp serums or leave-ins." }
    ],
    "new-customers": [
      { title: "Try-Your-Blend", description: "Guided quizzes directing new users to the most suitable nutrient blend for their routine." },
      { title: "Wellness Creator Partnerships", description: "Partner with clean-beauty creators to introduce the line to ingredient-focused audiences." },
      { title: "Sample-to-Subscribe", description: "Low-cost trials that convert into personalized subscription offers." }
    ]
  }
};

// --- Default prompt suggestions used as fallback in UI ---
export const DEFAULT_PROMPT_SUGGESTIONS = [
  { product: "Pantene Pro-V", title: "Daily Damage Shield", description: "Showcase Pro-V's core vitamin formula rebuilding daily resilience for urban consumers" },
  { product: "Pantene Miracles", title: "The Glass Hair Trend", description: "Position Miracles for intense damage repair and high-gloss viral visual transformations" },
  { product: "Pantene Micellar", title: "Scalp Care Is Skincare", description: "Highlight non-stripping, 0% silicone purifying tech for a weightless root detox" },
  { product: "Pantene Nutrient Blends", title: "Ingredient Transparency", description: "Demonstrate natural botanical luxury and conscious clean beauty formulations" }
];