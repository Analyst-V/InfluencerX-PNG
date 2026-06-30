import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Image as ImageIcon, 
  Type, 
  Palette, 
  Layout, 
  Check, 
  Download, 
  RefreshCw, 
  Plus,
  Monitor,
  Smartphone,
  Maximize,
  Minimize,
  Save,
  Wand2,
  ChevronRight,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { CampaignContext } from '../App';

// --- Types ---
// Reuse types from CreateModule or define local ones if they are specific to generation
interface Asset {
    id: string;
    src: string;
    type: 'image' | 'video_thumb';
    source: 'generated' | 'library';
    isSelected: boolean;
    complianceScore?: number;
    complianceDetails?: string[];
}

interface GeneratorContext {
    influencerName: string;
    influencerCategory: string;
    productFocus: string;
    campaignObjective?: string; // e.g. "Brand Awareness"
    scriptHook?: string;
}

interface AssetGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
    context: GeneratorContext;
    onSave: (assets: Asset[]) => void;
}

// --- Mock Image Pools based on styles ---
const MOCK_IMAGES = {
    'minimal': [
        'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd2hpdGUlMjBsYXB0b3AlMjBkZXNrJTIwc2V0dXAlMjBjbGVhbnxlbnwxfHx8fDE3NzEyNDU3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1764755932155-dabbee87df7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGRlc2slMjBzZXR1cCUyMGxhcHRvcCUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzEyNDU3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1759588071895-6b5efd5502af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMHNpbHZlciUyMGxhcHRvcCUyMHByb2R1Y3QlMjBzaG90fGVufDF8fHx8MTc3MTI0NTc1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    'neon': [
        'https://images.unsplash.com/photo-1643109141676-91a2cffeebb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3AlMjBuZW9uJTIwbGlnaHRzJTIwZGFyayUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzcxMjQ1NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1755997268323-1f462caf4a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBnYW1pbmclMjBzZXR1cCUyMGxhcHRvcHxlbnwxfHx8fDE3NzEyNDU3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1632603093711-0d93a0bcc6cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZ2IlMjBrZXlib2FyZCUyMGxhcHRvcCUyMGRhcmt8ZW58MXx8fHwxNzcxMjQ1NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    'professional': [
        'https://images.unsplash.com/photo-1759593218431-6f1585bc14de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9mZXNzaW9uYWwlMjBsYXB0b3AlMjBidXNpbmVzcyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzEyNDU3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1758519288445-5847dd89f313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBleGVjdXRpdmUlMjBsYXB0b3AlMjBtZWV0aW5nfGVufDF8fHx8MTc3MTI0NTc1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1550622824-928e5f246f81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHR5cGluZyUyMG9uJTIwbGFwdG9wfGVufDF8fHx8MTc3MTI0NTc1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    'lifestyle': [
        'https://images.unsplash.com/photo-1718279602896-6df6c34f61e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwZXJzb24lMjB1c2luZyUyMGxhcHRvcCUyMGNhZmUlMjBjYXN1YWwlMjB3b3JrfGVufDF8fHx8MTc3MTI0NTc0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1700113019655-fa4159d9acd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGFwdG9wJTIwbGlicmFyeSUyMGNvZmZlZXxlbnwxfHx8fDE3NzEyNDU3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1742678531208-7513a486fe9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbmVyJTIwd29ya3NwYWNlJTIwbGFwdG9wfGVufDF8fHx8MTc3MTIzOTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ]
};

export const AssetGeneratorModal: React.FC<AssetGeneratorModalProps> = ({ isOpen, onClose, context, onSave }) => {
    // --- State ---
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedAssets, setGeneratedAssets] = useState<Asset[]>([]);
    const [step, setStep] = useState<'input' | 'preview'>('input');
    const [isCheckingCompliance, setIsCheckingCompliance] = useState(false);
    const [complianceRun, setComplianceRun] = useState(false);

    // Inputs
    const [tagline, setTagline] = useState('');
    const [mood, setMood] = useState('Professional');
    const [style, setStyle] = useState('Studio');
    const [format, setFormat] = useState('Campaign Image');
    const [includeInfluencer, setIncludeInfluencer] = useState(true);
    const [ctaText, setCtaText] = useState('Learn More');

    // Reset when opening
    useEffect(() => {
        if (isOpen) {
            setStep('input');
            setGeneratedAssets([]);
            setComplianceRun(false);
            setIsCheckingCompliance(false);
            setTagline(context.scriptHook ? context.scriptHook.slice(0, 50) + "..." : `Experience the new ${context.productFocus}`);
        }
    }, [isOpen, context]);

    const handleGenerate = () => {
        setIsGenerating(true);
        setComplianceRun(false); // Reset compliance when generating new assets
        
        // Simulate AI Processing Time
        setTimeout(() => {
            // Select random images based on style (mock logic)
            const styleKey = mood.toLowerCase().includes('neon') ? 'neon' : 
                             style.toLowerCase().includes('lifestyle') ? 'lifestyle' :
                             style.toLowerCase().includes('minimal') ? 'minimal' : 'professional';
            
            const pool = MOCK_IMAGES[styleKey as keyof typeof MOCK_IMAGES] || MOCK_IMAGES['professional'];
            
            // Generate 3 variations
            const newAssets: Asset[] = pool.map((src, i) => ({
                id: `gen-new-${Date.now()}-${i}`,
                src: src,
                type: 'image',
                source: 'generated',
                isSelected: false // Used locally to track selection for saving
            }));

            setGeneratedAssets(newAssets);
            setIsGenerating(false);
            setStep('preview');
        }, 2500);
    };

    const handleCheckCompliance = () => {
        setIsCheckingCompliance(true);
        
        setTimeout(() => {
            const updatedAssets = generatedAssets.map(asset => ({
                ...asset,
                complianceScore: Math.floor(Math.random() * (100 - 85) + 85), // Random score between 85-100
                complianceDetails: [
                    'Logo Placement: Verified',
                    'Safe Zone: Cleared',
                    'Color Contrast: Pass',
                    'Brand Voice: Aligned'
                ]
            }));
            
            setGeneratedAssets(updatedAssets);
            setIsCheckingCompliance(false);
            setComplianceRun(true);
        }, 1500);
    };

    const handleSaveSelected = (asset: Asset) => {
        onSave([asset]);
        // Visual feedback could be added here
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-6xl h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
            >
                {/* 1. Header */}
                <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0 z-20">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#2563EB] text-white rounded-lg shadow-sm">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#1C1C1C] leading-none">Creative Studio</h2>
                            <p className="text-xs text-gray-500 mt-1">AI-Powered Asset Generation</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Main Content Layout */}
                <div className="flex-1 flex overflow-hidden">
                    
                    {/* LEFT PANEL: Inputs & Context */}
                    <div className="w-[400px] flex flex-col border-r border-gray-200 bg-gray-50/50 overflow-y-auto">
                        
                        {/* 2. Locked Context Section */}
                        <div className="p-6 border-b border-gray-200 bg-white/50">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Layers size={12} /> Active Campaign Context
                            </h3>
                            <div className="space-y-3">
                                <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                                    <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Product Focus</div>
                                    <div className="text-sm font-semibold text-[#1C1C1C] flex items-center gap-2">
                                        <Monitor size={14} className="text-[#2563EB]" /> {context.productFocus}
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                                    <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Partner</div>
                                    <div className="text-sm font-semibold text-[#1C1C1C] flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-gray-200 overflow-hidden">
                                            {/* Placeholder for avatar if we had it, or icon */}
                                            <div className="w-full h-full bg-[#2563EB]" />
                                        </div>
                                        {context.influencerName} <span className="text-gray-400 font-normal">({context.influencerCategory})</span>
                                    </div>
                                </div>
                                {context.scriptHook && (
                                    <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                                        <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Script Context (Hook)</div>
                                        <div className="text-xs text-gray-600 italic line-clamp-2">"{context.scriptHook}"</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 3. Creative Inputs */}
                        <div className="p-6 space-y-6 flex-1">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Wand2 size={12} /> Creative Direction
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tagline / Headline</label>
                                    <input 
                                        type="text"
                                        value={tagline}
                                        onChange={(e) => setTagline(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
                                        placeholder="e.g. Unlimit Your Potential"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
                                        <select 
                                            value={mood}
                                            onChange={(e) => setMood(e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
                                        >
                                            <option>Professional</option>
                                            <option>Energetic</option>
                                            <option>Minimalist</option>
                                            <option>Bold / High Contrast</option>
                                            <option>Premium</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Visual Style</label>
                                        <select 
                                            value={style}
                                            onChange={(e) => setStyle(e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
                                        >
                                            <option>Studio Photography</option>
                                            <option>Lifestyle</option>
                                            <option>3D Render</option>
                                            <option>Abstract</option>
                                            <option>Tech-Focused</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Campaign Image', 'Instagram Story', 'Ad Creative', 'Thumbnail'].map((fmt) => (
                                            <button
                                                key={fmt}
                                                onClick={() => setFormat(fmt)}
                                                className={clsx(
                                                    "text-xs py-2 px-3 rounded-lg border transition-all text-left",
                                                    format === fmt 
                                                        ? "bg-[#2563EB]/5 border-[#2563EB] text-[#2563EB] font-bold" 
                                                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                                                )}
                                            >
                                                {fmt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Call to Action (CTA)</label>
                                    <input 
                                        type="text"
                                        value={ctaText}
                                        onChange={(e) => setCtaText(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
                                        placeholder="e.g. Shop Now"
                                    />
                                </div>

                                <div className="pt-2 border-t border-gray-200 space-y-3">
                                    <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={includeInfluencer}
                                            onChange={(e) => setIncludeInfluencer(e.target.checked)}
                                            className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]" 
                                        />
                                        <span>Include Influencer Avatar/Likeness</span>
                                    </label>
                                    <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-[#2563EB]" />
                                        <span>Include Product Overlay</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Generate Button Area */}
                        <div className="p-6 border-t border-gray-200 bg-white">
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="w-full bg-[#1C1C1C] text-white py-4 rounded-xl font-bold text-base shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isGenerating ? (
                                    <>
                                        <RefreshCw className="animate-spin" size={20} /> Generating Assets...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} /> Generate {format}s
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Preview & Results */}
                    <div className="flex-1 bg-[#F5F5F5] p-8 flex flex-col overflow-hidden relative">
                        
                        {/* Background Decoration */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                             <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#2563EB] rounded-full blur-[100px]" />
                        </div>

                        {step === 'input' && !isGenerating ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                                    <ImageIcon size={48} className="opacity-20" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">Ready to Create</h3>
                                <p className="max-w-md">Configure your creative direction on the left and click Generate to see AI-powered results tailored to your campaign.</p>
                            </div>
                        ) : step === 'preview' || isGenerating ? (
                             <div className="flex-1 flex flex-col h-full">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-[#1C1C1C]">Generated Results</h3>
                                    {!isGenerating && (
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={handleCheckCompliance}
                                                disabled={isCheckingCompliance || complianceRun}
                                                className={clsx(
                                                    "px-4 py-2 border rounded-lg text-sm font-medium flex items-center gap-2 transition-all",
                                                    complianceRun 
                                                        ? "bg-green-50 border-green-200 text-green-700"
                                                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                                )}
                                            >
                                                {isCheckingCompliance ? (
                                                    <>
                                                        <RefreshCw size={14} className="animate-spin" /> Checking...
                                                    </>
                                                ) : complianceRun ? (
                                                    <>
                                                        <ShieldCheck size={14} /> Brand Compliance Verified
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShieldCheck size={14} /> Check Compliance
                                                    </>
                                                )}
                                            </button>
                                            <button onClick={handleGenerate} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                                                <RefreshCw size={14} /> Regenerate All
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {isGenerating ? (
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="bg-gray-200 rounded-xl aspect-video w-full h-full relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
                                            {generatedAssets.map((asset, index) => (
                                                <motion.div 
                                                    key={asset.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
                                                >
                                                    {/* Image Container */}
                                                    <div className="relative aspect-video bg-gray-100 overflow-hidden group-hover:shadow-md transition-all">
                                                        <img src={asset.src} alt="Generated Asset" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                                                        {/* Compliance Score Overlay */}
                                                        {asset.complianceScore && (
                                                            <motion.div 
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className={clsx(
                                                                    "absolute top-4 right-16 z-30 flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-bold shadow-sm backdrop-blur-md",
                                                                    asset.complianceScore >= 90 
                                                                        ? "bg-green-500/90 border-green-400 text-white" 
                                                                        : "bg-yellow-500/90 border-yellow-400 text-white"
                                                                )}
                                                            >
                                                                <ShieldCheck size={12} />
                                                                {asset.complianceScore}/100
                                                            </motion.div>
                                                        )}

                                                        {/* Ad Overlay Simulation */}
                                                        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                                <p className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest mb-1 bg-white/10 backdrop-blur-md inline-block px-2 py-0.5 rounded-sm border border-white/20">
                                                                    {context.productFocus}
                                                                </p>
                                                                <h4 className="text-white font-bold text-xl leading-tight mb-2 drop-shadow-md max-w-[90%]">
                                                                    {tagline || "Unlimit Your Potential"}
                                                                </h4>
                                                                {format !== 'Thumbnail' && (
                                                                    <button className="bg-[#2563EB] text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-2 hover:bg-[#1E40AF] transition-colors w-fit shadow-lg">
                                                                        {ctaText || "Learn More"} <ChevronRight size={12} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Hover Overlay - Actions */}
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-10">
                                                            <button className="p-3 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white hover:text-[#1C1C1C] transition-all transform scale-90 group-hover:scale-100 duration-300">
                                                                <Maximize size={20} />
                                                            </button>
                                                        </div>

                                                        {/* Badge */}
                                                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-20">
                                                            Variation {index + 1}
                                                        </div>
                                                    </div>

                                                    {/* Action Footer */}
                                                    <div className="p-4 bg-white border-t border-gray-100 flex flex-col gap-2">
                                                        {asset.complianceDetails && (
                                                            <div className="mb-2 bg-green-50 rounded-lg p-2 text-[10px] text-green-700 font-medium flex gap-2 items-start border border-green-100">
                                                                <Check size={12} className="mt-0.5" />
                                                                <div>
                                                                    {asset.complianceDetails.join(" • ")}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-xs text-gray-500 font-medium">
                                                                {format} • {style}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Discard">
                                                                    <X size={18} />
                                                                </button>
                                                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                                                                    <Download size={18} />
                                                                </button>
                                                                <button 
                                                                    onClick={() => handleSaveSelected(asset)}
                                                                    className="px-4 py-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                                                                >
                                                                    <Save size={16} /> Save to Campaign
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                             </div>
                        ) : null}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
