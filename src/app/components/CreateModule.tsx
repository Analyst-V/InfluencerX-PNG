import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Layout, 
  CheckCircle, 
  AlertCircle, 
  Wand2, 
  Download, 
  Share2,
  Users,
  Mail,
  Edit3,
  RefreshCw,
  Send,
  Eye,
  Trash2,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  FileText,
  Sparkles,
  Paperclip,
  MoreVertical,
  X,
  MessageSquare,
  Clock,
  ThumbsUp,
  Inbox,
  ArrowRight,
  DollarSign,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Youtube,
  Instagram
} from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { CampaignContext } from '../App';
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from '../components/ui/chart';
import { ComposedChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '../components/ui/table';
import { AssetGeneratorModal } from './AssetGeneratorModal';

// --- Types ---

interface Influencer {
    id: string;
    name: string;
    handle: string;
    avatarUrl: string;
    platform: string;
    followers: string;
    followersRaw: number;
    engagementRate: string;
    category: string;
    influencerCost: number;
    executionCost: number;
    isNew?: boolean;
    primaryPlatform?: string;
    geography?: string;
    brandAffinity?: string[];
}

type InfluencerStatus = 'not_started' | 'draft_ready' | 'contacted';

interface ScriptContent {
    hook: string;
    body: string;
    cta: string;
    caption: string;
    hashtags: string;
}

interface Script {
    id: string;
    status: 'draft' | 'generated' | 'approved';
    content: ScriptContent;
    lastUpdated: Date;
}

interface Asset {
    id: string;
    src: string;
    type: 'image' | 'video_thumb';
    source: 'generated' | 'library';
    isSelected: boolean;
}

// Data specific to one influencer's workspace
interface InfluencerWorkspaceData {
    status: InfluencerStatus;
    script: Script | null;
    assets: Asset[];
    emailDraft: {
        subject: string;
        body: string;
    };
    currentStep: 'script' | 'assets' | 'outreach';
}

// --- Mock Data Generators ---

const MOCK_SCRIPTS: Record<string, ScriptContent> = {
    'UGC': {
        hook: "I bet you didn't know your laptop could do this.",
        body: "I've been using the [Product] for a week, and honestly, the AI features are saving me hours. It's not just hype.",
        cta: "Link in bio to check it out.",
        caption: "Game changer for my daily workflow. 🚀",
        hashtags: "#TechLife #ProductivityHacks #Ad"
    },
    'Macro Creators': {
        hook: "Is this the most powerful laptop of 2026?",
        body: "We're putting the [Product] to the ultimate test against the competition. Let's talk benchmarks, NPU performance, and real-world rendering times.",
        cta: "Watch the full review on my channel.",
        caption: "Deep dive into the new [Product]. You won't believe these numbers. ⚡️",
        hashtags: "#TechReview #Benchmarks #Innovation"
    },
    'Enterprise': {
        hook: "The future of enterprise computing is here.",
        body: "Introducing the [Product]. Security, performance, and AI integration seamlessly combined for the modern professional.",
        cta: "Learn more at the link below.",
        caption: "Elevating business performance. 💼",
        hashtags: "#Enterprise #BusinessTech #Innovation"
    }
};

const DEFAULT_EMAIL_TEMPLATE = (name: string, product: string) => `Hi ${name},

We've been following your content and love your authentic take on tech. We're launching the new ${product} and think your audience would be a perfect fit.

I've attached a preliminary script idea and some assets for you to review. Let me know if you're interested!

Best,
The Team`;

// --- Components ---

const StatusBadge = ({ status }: { status: InfluencerStatus }) => {
    switch (status) {
        case 'contacted':
            return (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wide">
                    <Check size={10} strokeWidth={3} /> Contacted
                </div>
            );
        case 'draft_ready':
            return (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-bold uppercase tracking-wide">
                    <Edit3 size={10} strokeWidth={3} /> Draft Ready
                </div>
            );
        default:
            return (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-wide">
                    <Clock size={10} strokeWidth={3} /> Not Started
                </div>
            );
    }
};

// --- Main Module ---

export const CreateModule = ({ 
    initialContext,
    onBack
}: { 
    initialContext?: CampaignContext | null,
    onBack?: () => void
}) => {
    // State
    const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
    const [influencers, setInfluencers] = useState<Influencer[]>(initialContext?.selectedInfluencers || []);
    const [activeInfluencerId, setActiveInfluencerId] = useState<string | null>(influencers[0]?.id || null);
    
    // Workspace Data (Indexed by Influencer ID)
    const [workspaceData, setWorkspaceData] = useState<Record<string, InfluencerWorkspaceData>>({});

    // Investment Planning State
    const [budget, setBudget] = useState(50000);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [useAiSuggestion, setUseAiSuggestion] = useState(true);

    // Asset Library (Mock Global Assets)
    const [globalAssets, setGlobalAssets] = useState<Asset[]>([
        { id: 'g1', src: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop", type: 'image', source: 'library', isSelected: false },
        { id: 'g2', src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop", type: 'image', source: 'library', isSelected: false },
        { id: 'g3', src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop", type: 'image', source: 'library', isSelected: false },
    ]);

    const activeInfluencer = influencers.find(i => i.id === activeInfluencerId);
    const activeData = activeInfluencerId ? workspaceData[activeInfluencerId] : null;

    // Compute costs and projections
    const fullRosterCost = useMemo(() => {
        return influencers.reduce((s, i) => s + (i.influencerCost || 5000) + (i.executionCost || 2000), 0);
    }, [influencers]);

    const defaultBudget = useMemo(() => {
        return Math.round(fullRosterCost * 1.15 / 1000) * 1000;
    }, [fullRosterCost]);

    // Set initial budget
    useEffect(() => {
        if (defaultBudget > 0) {
            setBudget(defaultBudget);
        }
    }, [defaultBudget]);
    // In CreateModule - update the useEffect that initializes influencers
useEffect(() => {
  // Get influencers from context
  let incomingInfluencers = initialContext?.selectedInfluencers || [];
  
  // If no influencers but we have context data, try to build from available data
  if (incomingInfluencers.length === 0 && initialContext) {
    // Try to use any influencers from the context
    console.log('No influencers found in context, checking for alternatives');
  }
  
  // Ensure each influencer has the required fields
  const validatedInfluencers = incomingInfluencers.map((inf: any) => ({
    id: inf.id || `inf-${Math.random().toString(36).substr(2, 9)}`,
    name: inf.name || 'Unknown Influencer',
    handle: inf.handle || '@unknown',
    avatarUrl: inf.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    platform: inf.platform || inf.primaryPlatform || 'YouTube',
    followers: inf.followers || '0',
    followersRaw: inf.followersRaw || 0,
    engagementRate: inf.engagementRate || '0',
    category: inf.category || 'UGC',
    influencerCost: inf.influencerCost || 5000,
    executionCost: inf.executionCost || 2000,
    isNew: inf.isNew || false,
    primaryPlatform: inf.primaryPlatform || inf.platform || 'YouTube',
    geography: inf.geography || inf.audienceGeo || 'Global',
    brandAffinity: inf.brandAffinity || []
  }));
  
  setInfluencers(validatedInfluencers);
  
  // Set active influencer
  if (validatedInfluencers.length > 0) {
    setActiveInfluencerId(validatedInfluencers[0].id);
    // Initialize selected IDs
    setSelectedIds(new Set(validatedInfluencers.map(i => i.id)));
  }
}, [initialContext]);
    // Rank influencers by efficiency
    const rankedInfluencers = useMemo(() => {
        return influencers.map(inf => {
            const cost = (inf.influencerCost || 5000) + (inf.executionCost || 2000);
            const followersNum = inf.followersRaw || parseInt(inf.followers.replace(/[^0-9]/g, '')) || 10000;
            const engagementNum = parseFloat(inf.engagementRate) || 2;
            const efficiency = (engagementNum * followersNum) / cost;
            const score = efficiency * (1 + (inf.isNew ? 0.1 : 0.3));
            return { ...inf, cost, efficiency, score };
        }).sort((a, b) => b.score - a.score);
    }, [influencers]);

    // AI suggested set
    const aiSuggestedIds = useMemo(() => {
        const suggested = new Set<string>();
        let remaining = budget * 0.87;
        for (const inf of rankedInfluencers) {
            if (inf.cost <= remaining) {
                suggested.add(inf.id);
                remaining -= inf.cost;
            }
        }
        if (suggested.size === 0 && rankedInfluencers.length > 0) {
            suggested.add(rankedInfluencers[0].id);
        }
        return suggested;
    }, [budget, rankedInfluencers]);

    // Auto-apply AI suggestion
    useEffect(() => {
        if (useAiSuggestion) {
            setSelectedIds(aiSuggestedIds);
        }
    }, [aiSuggestedIds, useAiSuggestion]);

    // Initialize workspace data for new influencers
    useEffect(() => {
        const newData = { ...workspaceData };
        let hasChanges = false;
        
        influencers.forEach(inf => {
            if (!newData[inf.id]) {
                newData[inf.id] = {
                    status: 'not_started',
                    script: null,
                    assets: [],
                    emailDraft: {
                        subject: `Partnership: ${inf.name} x ${initialContext?.brand || 'Lenovo'}`,
                        body: DEFAULT_EMAIL_TEMPLATE(inf.name.split(' ')[0], initialContext?.productFocus || "Professional Series")
                    },
                    currentStep: 'script'
                };
                hasChanges = true;
            }
        });

        if (hasChanges) setWorkspaceData(newData);
        
        // Initialize selected IDs
        if (selectedIds.size === 0 && influencers.length > 0) {
            setSelectedIds(new Set(influencers.map(i => i.id)));
        }
    }, [influencers, initialContext]);

    // Handlers
    const handleGenerateScript = () => {
  if (!activeInfluencerId || !activeInfluencer) return;

  setTimeout(() => {
    const category = activeInfluencer.category || 'UGC';
    const template = MOCK_SCRIPTS[category] || MOCK_SCRIPTS['UGC'];
    
    const productName = initialContext?.productFocus || 'Professional Series';
    
    const newScript: Script = {
      id: Math.random().toString(36).substr(2, 9),
      status: 'generated',
      lastUpdated: new Date(),
      content: {
        ...template,
        hook: template.hook.replace('[Product]', productName),
        body: template.body.replace('[Product]', productName),
        cta: template.cta.replace('[Product]', productName),
        caption: template.caption.replace('[Product]', productName),
        hashtags: template.hashtags
      }
    };

    updateWorkspace(activeInfluencerId, { 
      script: newScript,
      status: activeData?.status === 'not_started' ? 'draft_ready' : activeData?.status || 'draft_ready'
    });
  }, 1500);
};

    const handleSaveAssets = (newAssets: Asset[]) => {
        if (!activeInfluencerId || !activeData) return;

        const updatedWorkspaceAssets = [
            ...activeData.assets,
            ...newAssets.map(a => ({ ...a, isSelected: true }))
        ];
        
        updateWorkspace(activeInfluencerId, { assets: updatedWorkspaceAssets });
        setGlobalAssets(prev => [...newAssets, ...prev]);
        setIsGeneratorOpen(false);
    };

    const toggleAssetSelection = (assetId: string) => {
        if (!activeInfluencerId || !activeData) return;
        
        const updatedAssets = activeData.assets.map(a => 
            a.id === assetId ? { ...a, isSelected: !a.isSelected } : a
        );
        updateWorkspace(activeInfluencerId, { assets: updatedAssets });
    };

    const handleSendEmail = () => {
        if (!activeInfluencerId) return;
        alert(`Email sent to ${activeInfluencer?.name}!`);
        updateWorkspace(activeInfluencerId, { status: 'contacted' });
    };

    const updateWorkspace = (id: string, updates: Partial<InfluencerWorkspaceData>) => {
        setWorkspaceData(prev => ({
            ...prev,
            [id]: { ...prev[id], ...updates }
        }));
    };
    
    const setStep = (step: 'script' | 'assets' | 'outreach') => {
        if (!activeInfluencerId) return;
        updateWorkspace(activeInfluencerId, { currentStep: step });
    };

    const toggleInfluencer = useCallback((id: string) => {
        setUseAiSuggestion(false);
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                if (next.size <= 1) return prev;
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, []);

    const toggleAll = useCallback(() => {
        setUseAiSuggestion(false);
        if (selectedIds.size === influencers.length) {
            setSelectedIds(new Set([influencers[0]?.id || '']));
        } else {
            setSelectedIds(new Set(influencers.map(i => i.id)));
        }
    }, [selectedIds.size, influencers]);

    const applyAiSuggestion = useCallback(() => {
        setUseAiSuggestion(true);
        setSelectedIds(aiSuggestedIds);
    }, [aiSuggestedIds]);

    // Get all statuses for slider
    const getAllStatuses = () => {
        const statuses: Record<string, InfluencerStatus> = {};
        influencers.forEach(inf => {
            statuses[inf.id] = workspaceData[inf.id]?.status || 'not_started';
        });
        return statuses;
    };

    // Selected influencers for investment view
    const selectedInfluencers = useMemo(() => {
        return influencers.filter(i => selectedIds.has(i.id));
    }, [influencers, selectedIds]);

    // Cost calculations
    const totalInfluencerFees = useMemo(() => selectedInfluencers.reduce((s, i) => s + (i.influencerCost || 5000), 0), [selectedInfluencers]);
    const totalExecutionCost = useMemo(() => selectedInfluencers.reduce((s, i) => s + (i.executionCost || 2000), 0), [selectedInfluencers]);
    const totalBaseCost = totalInfluencerFees + totalExecutionCost;
    const contingency = Math.round(totalBaseCost * 0.15);
    const totalWithContingency = totalBaseCost + contingency;
    const budgetRemaining = budget - totalWithContingency;

    // Projections
    const projections = useMemo(() => {
        if (selectedInfluencers.length === 0) return { reach: 0, impressions: 0, engagements: 0, conversions: 0, revenue: 0, roi: 0 };
        const selectedCost = totalWithContingency || 1;
        const budgetRatio = budget / selectedCost;
        const avgEngagement = selectedInfluencers.reduce((s, i) => s + parseFloat(i.engagementRate), 0) / selectedInfluencers.length;
        const totalFollowers = selectedInfluencers.reduce((s, i) => s + (i.followersRaw || parseInt(i.followers.replace(/[^0-9]/g, '')) || 10000), 0);
        const effectiveRatio = Math.pow(Math.min(budgetRatio, 2.5), 0.85);
        const reach = Math.round(totalFollowers * effectiveRatio * 0.35);
        const impressions = Math.round(reach * 2.8);
        const engagements = Math.round(impressions * (avgEngagement / 100));
        const conversions = Math.round(engagements * 0.032);
        const revenue = Math.round(conversions * 45);
        const roi = budget > 0 ? Number((revenue / budget).toFixed(1)) : 0;
        return { reach, impressions, engagements, conversions, revenue, roi };
    }, [budget, totalWithContingency, selectedInfluencers]);

    // Chart data
    const impactChartData = useMemo(() => {
        const data: { influencers: string; revenue: number; roi: number }[] = [];
        let cumulativeFollowers = 0;
        let engSum = 0;
        let cumulativeCost = 0;
        for (let i = 0; i < rankedInfluencers.length; i++) {
            const inf = rankedInfluencers[i];
            cumulativeFollowers += inf.followersRaw || parseInt(inf.followers.replace(/[^0-9]/g, '')) || 10000;
            engSum += parseFloat(inf.engagementRate);
            cumulativeCost += inf.cost;
            const avgEng = engSum / (i + 1);
            const eff = Math.pow(Math.min((i + 1) / rankedInfluencers.length * 2, 2.5), 0.85);
            const reach = Math.round(cumulativeFollowers * eff * 0.35);
            const revenue = Math.round(Math.round(reach * 2.8) * (avgEng / 100) * 0.032 * 45);
            const roi = cumulativeCost > 0 ? Number((revenue / cumulativeCost).toFixed(1)) : 0;
            data.push({ influencers: `${i + 1}`, revenue, roi });
        }
        return data;
    }, [rankedInfluencers]);

    const roiTrendData = useMemo(() => {
        const baseRoi = projections.roi;
        return [
            { name: 'Week 1', projected: Number((baseRoi * 0.3).toFixed(1)) },
            { name: 'Week 2', projected: Number((baseRoi * 0.45).toFixed(1)) },
            { name: 'Week 3', projected: Number((baseRoi * 0.58).toFixed(1)) },
            { name: 'Week 4', projected: Number((baseRoi * 0.68).toFixed(1)) },
            { name: 'Week 5', projected: Number((baseRoi * 0.76).toFixed(1)) },
            { name: 'Week 6', projected: Number((baseRoi * 0.83).toFixed(1)) },
            { name: 'Week 7', projected: Number((baseRoi * 0.90).toFixed(1)) },
            { name: 'Week 8', projected: Number((baseRoi * 0.95).toFixed(1)) },
            { name: 'Week 9', projected: Number((baseRoi * 0.98).toFixed(1)) },
            { name: 'Week 10', projected: Number(baseRoi.toFixed(1)) },
        ];
    }, [projections.roi]);

    const chartConfig: ChartConfig = {
        revenue: { label: 'Revenue', color: 'hsl(220 14% 46%)' },
        roi: { label: 'ROI', color: 'hsl(142 71% 45%)' },
        projected: { label: 'Projected ROI', color: 'hsl(220 14% 46%)' },
    };

    const formatCurrency = (n: number) => {
        if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
        if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
        return `$${n.toLocaleString()}`;
    };
    const formatNumber = (n: number) => {
        if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
        if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
        return n.toLocaleString();
    };

    const getPlatformIcon = (platform: string) => {
        switch (platform?.toLowerCase()) {
            case 'youtube': return <Youtube className="h-4 w-4 text-red-500" />;
            case 'tiktok': return <span className="h-4 w-4 text-black">♪</span>;
            case 'instagram': return <Instagram className="h-4 w-4 text-pink-500" />;
            default: return <Users className="h-4 w-4" />;
        }
    };

    return (
        <div className="flex flex-col bg-[#F5F5F5] font-sans text-[#1C1C1C] min-h-screen pb-12">
            {/* 1. Header */}
            <div className="pt-8 pb-4 z-20 flex-shrink-0">
                <div className="px-8 max-w-7xl mx-auto w-full">
                    <div>
                        {onBack && (
                            <button 
                                onClick={onBack}
                                className="text-gray-400 hover:text-[#2563EB] text-[11px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1 transition-colors"
                            >
                                <ChevronDown className="rotate-90" size={14} /> Back to Strategy
                            </button>
                        )}
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold tracking-tight text-[#1C1C1C]">Campaign Execution</h1>
                            <span className="px-3 py-1 rounded-full bg-[#2563EB]/10 text-xs font-bold text-[#2563EB] uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles size={12} fill="currentColor" /> {initialContext?.brand || 'Lenovo'}: {initialContext?.productFocus}
                            </span>
                        </div>
                        <p className="text-gray-500 text-lg">
                            Manage your {influencers.length} selected influencers from scripting to outreach.
                        </p>
                    </div>
                </div>
            </div>

            {/* Investment Planning Section */}
            <div className="px-8 max-w-7xl mx-auto w-full py-4">
                {/* Budget & Projections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Budget Control */}
                    <Card className="lg:col-span-1 shadow-[var(--shadow-card)]">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                Set Your Budget
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-2 block">Investment Amount</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                                    <Input
                                        type="number" value={budget}
                                        onChange={e => setBudget(Math.max(5000, Math.min(200000, Number(e.target.value))))}
                                        className="pl-7 text-lg font-semibold h-12"
                                        min={1000} max={20000} step={200}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>$1K</span>
                                    <span>$10K</span>
                                    <span>$20K</span>
                                </div>
                                <Slider value={[budget]} onValueChange={([val]) => setBudget(val)} min={5000} max={200000} step={1000} className="w-full" />
                            </div>

                            <div className="space-y-2 pt-3 border-t border-border/50">
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Cost Breakdown ({selectedInfluencers.length} influencers)
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Influencer Fees</span>
                                    <span className="font-medium">{formatCurrency(totalInfluencerFees)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Production & Execution</span>
                                    <span className="font-medium">{formatCurrency(totalExecutionCost)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Contingency (15%)</span>
                                    <span className="font-medium">{formatCurrency(contingency)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-semibold pt-1 border-t border-border/50">
                                    <span>Total Allocated</span>
                                    <span>{formatCurrency(totalWithContingency)}</span>
                                </div>
                                <div className={`flex justify-between text-sm font-semibold pt-1 border-t border-border/50 ${budgetRemaining >= 0 ? 'text-emerald-600' : 'text-destructive'}`}>
                                    <span>{budgetRemaining >= 0 ? 'Remaining Budget' : 'Over Budget'}</span>
                                    <span>{budgetRemaining >= 0 ? formatCurrency(budgetRemaining) : `-${formatCurrency(Math.abs(budgetRemaining))}`}</span>
                                </div>
                                <Button 
                                    onClick={applyAiSuggestion} 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full mt-2 text-xs"
                                >
                                    <Sparkles className="h-3 w-3 mr-2" />
                                    Apply AI-Optimized Selection
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Projections */}
                    <Card className="lg:col-span-2 shadow-[var(--shadow-card)]">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-primary" />
                                Projected Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground font-medium">Est. Reach</span>
                                    </div>
                                    <div className="text-2xl font-bold text-foreground">{formatNumber(projections.reach)}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground font-medium">Conversions</span>
                                    </div>
                                    <div className="text-2xl font-bold text-foreground">{formatNumber(projections.conversions)}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground font-medium">Est. Revenue</span>
                                    </div>
                                    <div className="text-2xl font-bold text-foreground">{formatCurrency(projections.revenue)}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground font-medium">Projected ROI</span>
                                    </div>
                                    <div className="text-2xl font-bold text-foreground">{projections.roi}x</div>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Target className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground font-medium">Impressions</span>
                                    </div>
                                    <div className="text-2xl font-bold text-foreground">{formatNumber(projections.impressions)}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Zap className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground font-medium">Engagements</span>
                                    </div>
                                    <div className="text-2xl font-bold text-foreground">{formatNumber(projections.engagements)}</div>
                                </div>
                            </div>

                            

                            <div>
                                <h4 className="text-sm font-semibold text-foreground mb-3">Projected ROI Trajectory</h4>
                                <ChartContainer config={chartConfig} className="h-[180px] w-full">
                                    <AreaChart data={roiTrendData}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                                        <XAxis dataKey="name" className="text-xs" />
                                        <YAxis tickFormatter={(v) => `${v}x`} className="text-xs" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area type="monotone" dataKey="projected" stroke="hsl(220 14% 46%)" fill="hsl(220 14% 46% / 0.15)" strokeWidth={2} />
                                    </AreaChart>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Influencer Selection Table */}
                <Card className="mb-6 shadow-[var(--shadow-card)] overflow-hidden">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Influencer Roster
                            </CardTitle>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground">
                                    {selectedInfluencers.length} selected • Cost: <span className="font-semibold text-foreground">{formatCurrency(totalBaseCost)}</span>
                                </span>
                                <Button variant="outline" size="sm" onClick={toggleAll} className="text-xs">
                                    {selectedIds.size === influencers.length ? 'Deselect All' : 'Select All'}
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 hover:bg-muted/30">
                                    <TableHead className="w-12 text-center font-semibold">
                                        <Checkbox checked={selectedIds.size === influencers.length} onCheckedChange={toggleAll} />
                                    </TableHead>
                                    <TableHead className="font-semibold">Influencer</TableHead>
                                    <TableHead className="font-semibold">Platform</TableHead>
                                    <TableHead className="font-semibold text-center">Followers</TableHead>
                                    <TableHead className="font-semibold text-center">Engagement</TableHead>
                                    <TableHead className="font-semibold text-center">Influencer Fee</TableHead>
                                    <TableHead className="font-semibold text-center">Execution Cost</TableHead>
                                    <TableHead className="font-semibold text-center">Total Cost</TableHead>
                                    <TableHead className="font-semibold text-center">Type</TableHead>
                                    <TableHead className="font-semibold text-center">AI Rank</TableHead>
                                    <TableHead className="font-semibold text-center">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rankedInfluencers.map((inf, idx) => {
                                    const isSelected = selectedIds.has(inf.id);
                                    const isAiSuggested = aiSuggestedIds.has(inf.id);
                                    const status = workspaceData[inf.id]?.status || 'not_started';
                                    return (
                                        <TableRow
                                            key={inf.id}
                                            className={`h-14 transition-all cursor-pointer ${
                                                isSelected
                                                    ? 'bg-background hover:bg-muted/20'
                                                    : 'bg-muted/10 opacity-50 hover:opacity-70'
                                            }`}
                                            onClick={() => toggleInfluencer(inf.id)}
                                        >
                                            <TableCell className="text-center" onClick={e => e.stopPropagation()}>
                                                <Checkbox checked={isSelected} onCheckedChange={() => toggleInfluencer(inf.id)} />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                        {inf.name}
                                                    </span>
                                                    {isAiSuggested && useAiSuggestion && (
                                                        <Sparkles className="h-3 w-3 text-primary" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1.5">
                                                    {getPlatformIcon(inf.platform || inf.primaryPlatform || '')}
                                                    <span className="text-sm capitalize">{inf.platform || inf.primaryPlatform}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center font-medium">{inf.followers}</TableCell>
                                            <TableCell className="text-center font-medium">{inf.engagementRate}%</TableCell>
                                            <TableCell className="text-center font-medium">${(inf.influencerCost || 5000).toLocaleString()}</TableCell>
                                            <TableCell className="text-center font-medium">${(inf.executionCost || 2000).toLocaleString()}</TableCell>
                                            <TableCell className="text-center">
                                                <span className={`font-semibold ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                    ${inf.cost.toLocaleString()}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className={`text-[10px] px-2 py-0.5 rounded-full ${
                                                    inf.isNew ? 'border-primary/30 bg-primary/5 text-primary/80' : 'border-muted-foreground/20 bg-muted/30 text-muted-foreground'
                                                }`}>
                                                    {inf.isNew ? 'New' : 'Existing'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto text-xs font-medium ${
                                                    idx < 3 ? 'bg-primary/10 text-primary' : idx < 8 ? 'bg-muted text-muted-foreground' : 'bg-muted/50 text-muted-foreground/70'
                                                }`}>
                                                    {idx + 1}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <StatusBadge status={status} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Per-Influencer Execution Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">Execution Per Influencer</h2>
                    <p className="text-gray-500 text-sm mb-6">Select an influencer below to generate scripts, manage assets, and send outreach.</p>
                    
                    {/* Influencer Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {influencers.map((inf) => {
                            const isActive = activeInfluencerId === inf.id;
                            const status = workspaceData[inf.id]?.status || 'not_started';
                            const hasScript = !!workspaceData[inf.id]?.script;
                            const hasAssets = (workspaceData[inf.id]?.assets?.length || 0) > 0;
                            
                            return (
                                <motion.div 
                                    key={inf.id}
                                    onClick={() => setActiveInfluencerId(inf.id)}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={clsx(
                                        "bg-white rounded-2xl p-5 cursor-pointer transition-all duration-300 border-2",
                                        isActive 
                                            ? "border-[#2563EB] shadow-xl shadow-blue-900/10" 
                                            : "border-gray-100 hover:border-gray-300 hover:shadow-lg"
                                    )}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="relative">
                                            <img src={inf.avatarUrl} alt={inf.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
                                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-gray-100 shadow-sm">
                                                {getPlatformIcon(inf.platform)}
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-bold text-sm truncate">{inf.name}</h3>
                                            <p className="text-xs text-gray-500 truncate">{inf.handle}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                        <span>{inf.followers} followers</span>
                                        <span>{inf.engagementRate}% engagement</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <StatusBadge status={status} />
                                        <div className="flex gap-1">
                                            {hasScript && <div className="w-2 h-2 rounded-full bg-blue-500" title="Script ready" />}
                                            {hasAssets && <div className="w-2 h-2 rounded-full bg-green-500" title="Assets ready" />}
                                            {status === 'contacted' && <div className="w-2 h-2 rounded-full bg-purple-500" title="Contacted" />}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Active Influencer Workspace */}
                {activeInfluencer && activeData && (
                    <div className="mt-8 bg-white rounded-2xl shadow-xl shadow-gray-100/50 overflow-hidden">
                        {/* Workspace Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <img src={activeInfluencer.avatarUrl} alt={activeInfluencer.name} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <h3 className="font-bold text-[#1C1C1C]">{activeInfluencer.name}</h3>
                                    <p className="text-xs text-gray-500">{activeInfluencer.handle} • {activeInfluencer.category}</p>
                                </div>
                            </div>
                            <StatusBadge status={activeData.status} />
                        </div>

                        {/* Stepper Tabs */}
                        <div className="flex border-b border-gray-200 px-4">
                            <button 
                                onClick={() => setStep('script')}
                                className={clsx(
                                    "px-6 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2",
                                    activeData.currentStep === 'script' ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-gray-400 hover:text-gray-600"
                                )}
                            >
                                <FileText size={16} /> Script
                            </button>
                            <button 
                                onClick={() => setStep('assets')}
                                className={clsx(
                                    "px-6 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2",
                                    activeData.currentStep === 'assets' ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-gray-400 hover:text-gray-600"
                                )}
                            >
                                <ImageIcon size={16} /> Assets
                            </button>
                            <button 
                                onClick={() => setStep('outreach')}
                                className={clsx(
                                    "px-6 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2",
                                    activeData.currentStep === 'outreach' ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-gray-400 hover:text-gray-600"
                                )}
                            >
                                <Mail size={16} /> Outreach
                            </button>
                        </div>

                        {/* Step Content */}
                        <div className="p-6 min-h-[400px]">
                            <AnimatePresence mode="wait">
                                {activeData.currentStep === 'script' && (
                                    <motion.div 
                                        key="script"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-[#1C1C1C]">AI Script Generator</h4>
                                            <button 
                                                onClick={handleGenerateScript}
                                                className="text-sm font-bold text-[#2563EB] hover:bg-[#2563EB]/5 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border border-[#2563EB]/20"
                                            >
                                                <RefreshCw size={14} /> {activeData.script ? 'Regenerate' : 'Generate'}
                                            </button>
                                        </div>

                                        {activeData.script ? (
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="space-y-4">
                                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                                        <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Hook (0-3s)</label>
                                                        <textarea 
                                                            className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:ring-[#2563EB] focus:border-[#2563EB] outline-none shadow-sm"
                                                            rows={2}
                                                            defaultValue={activeData.script.content.hook}
                                                        />
                                                    </div>
                                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                                        <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Core Message</label>
                                                        <textarea 
                                                            className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:ring-[#2563EB] focus:border-[#2563EB] outline-none shadow-sm"
                                                            rows={4}
                                                            defaultValue={activeData.script.content.body}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                                        <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Call to Action</label>
                                                        <input 
                                                            className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:ring-[#2563EB] focus:border-[#2563EB] outline-none shadow-sm"
                                                            defaultValue={activeData.script.content.cta}
                                                        />
                                                    </div>
                                                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                                                        <div className="flex items-center gap-2 font-bold mb-1">
                                                            <Sparkles size={16} /> AI Visual Direction
                                                        </div>
                                                        <p className="italic opacity-80 text-xs">
                                                            Showcase the {initialContext?.productFocus} in a brightly lit studio environment. Emphasize the sleek design.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                                    <Wand2 className="text-[#2563EB]" size={28} />
                                                </div>
                                                <h4 className="text-base font-bold text-gray-900 mb-1">No Script Generated</h4>
                                                <p className="text-sm text-gray-500 max-w-md mb-4">Create a custom script tailored to {activeInfluencer.name}'s audience.</p>
                                                <button 
                                                    onClick={handleGenerateScript}
                                                    className="bg-[#1C1C1C] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-all flex items-center gap-2"
                                                >
                                                    <Sparkles size={16} /> Generate Script
                                                </button>
                                            </div>
                                        )}

                                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                                            <button 
                                                onClick={() => setStep('assets')}
                                                className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#1E40AF] transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/20"
                                            >
                                                Next: Assets <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {activeData.currentStep === 'assets' && (
                                    <motion.div 
                                        key="assets"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-[#1C1C1C]">Asset Library</h4>
                                            <button 
                                                onClick={() => setIsGeneratorOpen(true)}
                                                className="relative group px-5 py-2 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-[#2563EB]/50 bg-black/40 backdrop-blur-xl"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/20 via-[#2563EB]/40 to-[#2563EB]/20 group-hover:from-[#2563EB] group-hover:to-[#1E40AF] transition-all duration-500 opacity-80 group-hover:opacity-100"></div>
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                                <div className="relative flex items-center gap-2 z-10">
                                                    <Wand2 size={14} className="text-white animate-pulse" /> 
                                                    <span className="font-bold text-white text-xs tracking-wide drop-shadow-md">Open Creative Studio</span>
                                                </div>
                                            </button>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {globalAssets.map((asset) => {
                                                    const isSelected = activeData.assets.some(a => a.id === asset.id && a.isSelected);
                                                    return (
                                                        <motion.div 
                                                            key={asset.id} 
                                                            layout
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            onClick={() => {
                                                                const exists = activeData.assets.find(a => a.id === asset.id);
                                                                if (exists) {
                                                                    toggleAssetSelection(asset.id);
                                                                } else {
                                                                    updateWorkspace(activeInfluencerId!, { 
                                                                        assets: [...activeData.assets, { ...asset, isSelected: true }]
                                                                    });
                                                                }
                                                            }}
                                                            className={clsx(
                                                                "relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all group shadow-sm hover:shadow-md",
                                                                isSelected ? "border-[#2563EB] ring-2 ring-[#2563EB]/20" : "border-transparent hover:border-gray-300"
                                                            )}
                                                        >
                                                            <img src={asset.src} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                            <div className={clsx(
                                                                "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200",
                                                                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                                            )}>
                                                                <div className={clsx(
                                                                    "p-2 rounded-full shadow-lg transform transition-transform",
                                                                    isSelected ? "bg-[#2563EB] text-white scale-110" : "bg-white text-gray-800 scale-90"
                                                                )}>
                                                                    <Check size={18} strokeWidth={3} />
                                                                </div>
                                                            </div>
                                                            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur text-white text-[8px] rounded font-bold uppercase tracking-wider">
                                                                {asset.source === 'generated' ? 'AI' : 'Library'}
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                                            <button 
                                                onClick={() => setStep('script')}
                                                className="px-4 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors text-sm"
                                            >
                                                Back
                                            </button>
                                            <button 
                                                onClick={() => setStep('outreach')}
                                                className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#1E40AF] transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/20"
                                            >
                                                Next: Outreach <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {activeData.currentStep === 'outreach' && (
                                    <motion.div 
                                        key="outreach"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-[#1C1C1C]">Outreach Composer</h4>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-500">
                                                <Inbox size={14} /> Status: <span className="text-[#1C1C1C] capitalize">{activeData.status.replace('_', ' ')}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="flex-1 space-y-3">
                                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
                                                    <img src={activeInfluencer.avatarUrl} className="w-10 h-10 rounded-full border border-white shadow-sm" />
                                                    <div>
                                                        <div className="font-bold text-[#1C1C1C] text-sm">{activeInfluencer.name}</div>
                                                        <div className="text-xs text-gray-500">{activeInfluencer.handle}</div>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Subject Line</label>
                                                    <input 
                                                        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-[#2563EB] focus:border-[#2563EB] outline-none shadow-sm"
                                                        value={activeData.emailDraft.subject}
                                                        onChange={(e) => updateWorkspace(activeInfluencerId!, { emailDraft: { ...activeData.emailDraft, subject: e.target.value } })}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Message Body</label>
                                                    <textarea 
                                                        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm leading-relaxed text-gray-700 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none shadow-sm resize-none h-32"
                                                        value={activeData.emailDraft.body}
                                                        onChange={(e) => updateWorkspace(activeInfluencerId!, { emailDraft: { ...activeData.emailDraft, body: e.target.value } })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full md:w-56 bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col">
                                                <h4 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                                                    <Paperclip size={14} /> Attachments
                                                </h4>
                                                
                                                <div className="space-y-2 flex-1">
                                                    {activeData.script ? (
                                                        <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                                                            <FileText size={14} className="text-blue-500" />
                                                            <div className="min-w-0 flex-1">
                                                                <div className="text-xs font-bold text-gray-700 truncate">Script.pdf</div>
                                                            </div>
                                                            <CheckCircle size={14} className="text-green-500" />
                                                        </div>
                                                    ) : (
                                                        <div className="text-xs text-gray-400 italic text-center p-3 border border-dashed border-gray-200 rounded-lg">
                                                            No script
                                                        </div>
                                                    )}

                                                    {activeData.assets.filter(a => a.isSelected).slice(0, 3).map(asset => (
                                                        <div key={asset.id} className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                                                            <img src={asset.src} className="w-6 h-6 rounded object-cover" />
                                                            <div className="min-w-0 flex-1">
                                                                <div className="text-xs font-bold text-gray-700 truncate">Asset</div>
                                                            </div>
                                                            <CheckCircle size={14} className="text-green-500" />
                                                        </div>
                                                    ))}
                                                    {activeData.assets.filter(a => a.isSelected).length > 3 && (
                                                        <div className="text-xs text-gray-400 text-center">+{activeData.assets.filter(a => a.isSelected).length - 3} more</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                                            <button 
                                                onClick={() => setStep('assets')}
                                                className="px-4 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors text-sm"
                                            >
                                                Back
                                            </button>
                                            
                                            {activeData.status !== 'contacted' ? (
                                                <button 
                                                    onClick={handleSendEmail}
                                                    className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#1E40AF] transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/20"
                                                >
                                                    <Send size={16} /> Send & Contact
                                                </button>
                                            ) : (
                                                <button disabled className="bg-gray-100 text-gray-400 px-6 py-2.5 rounded-xl font-bold cursor-not-allowed flex items-center gap-2">
                                                    <Check size={16} /> Sent
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>

            {/* Asset Generator Modal */}
            <AssetGeneratorModal 
                isOpen={isGeneratorOpen}
                onClose={() => setIsGeneratorOpen(false)}
                onSave={handleSaveAssets}
                context={{
                    influencerName: activeInfluencer?.name || 'Partner',
                    influencerCategory: activeInfluencer?.category || 'Creator',
                    productFocus: initialContext?.productFocus || 'Product',
                    campaignObjective: initialContext?.objective || 'Brand Awareness & Sales',
                    scriptHook: activeData?.script?.content.hook
                }}
            />
        </div>
    );
};