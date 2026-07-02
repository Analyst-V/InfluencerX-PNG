import React from 'react';
import { 
  TrendingUp, 
  Activity, 
  Sparkles, 
  DollarSign, 
  ArrowUpRight, 
  Download, 
  Filter, 
  MoreHorizontal,
  Youtube,
  Linkedin,
  Instagram,
  Eye,
  MousePointer2,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import clsx from 'clsx';

// --- Mock Data ---

const KPI_DATA = [
  {
    id: 1,
    label: 'Est. Sales Lift',
    subLabel: 'ROI from recent JP/KR campaigns',
    value: '$1.2M',
    growth: '+12%',
    icon: DollarSign,
    color: 'bg-blue-50 text-blue-600',
    iconColor: '#2563EB'
  },
  {
    id: 2,
    label: 'Brand Sentiment',
    subLabel: 'Brand Lift vs. Competitors',
    value: '+12%',
    growth: '+12%',
    icon: TrendingUp,
    color: 'bg-red-50 text-[#2563EB]',
    iconColor: '#2563EB'
  },
  {
    id: 3,
    label: 'Content Engagement',
    subLabel: 'Total views across platforms',
    value: '4.5M',
    growth: '+12%',
    icon: Activity,
    color: 'bg-purple-50 text-purple-600',
    iconColor: '#9333EA'
  },
  {
    id: 4,
    label: 'Audience Reach',
    subLabel: 'Unique Beauty Consumers Reached (KR/JP)',
    value: '850k',
    growth: '+12%',
    icon: Sparkles,
    color: 'bg-orange-50 text-orange-600',
    iconColor: '#EA580C'
  }
];

const PERFORMANCE_DATA = [
  { date: 'Week 1', views: 120000, value: 50000 },
  { date: 'Week 2', views: 350000, value: 120000 },
  { date: 'Week 3', views: 980000, value: 350000 },
  { date: 'Week 4', views: 2100000, value: 680000 },
  { date: 'Week 5', views: 3200000, value: 950000 },
  { date: 'Week 6', views: 4500000, value: 1200000 },
];

const CHANNEL_DATA = [
  { name: 'YouTube', value: 55, color: '#FF0000' },
  { name: 'LinkedIn', value: 30, color: '#0077B5' },
  { name: 'TikTok', value: 15, color: '#000000' },
];

const INFLUENCER_PERFORMANCE = [
  {
    id: 1,
    name: '@SeoulGlow_Joo',
    platform: 'TikTok',
    content: 'Before/After: Miracles Glass Hair Shine',
    status: 'Live',
    views: '2.1M',
    conversions: '4.5%',
    roi: '4.8x'
  },
  {
    id: 2,
    name: 'SakuraBeauty_Vlogs',
    platform: 'YouTube',
    content: 'My Micellar Scalp Care Routine',
    status: 'Live',
    views: '1.2M',
    conversions: '5.2%',
    roi: '5.5x'
  },
  {
    id: 3,
    name: 'K-Hair Diary (Naver)',
    platform: 'Naver Blog',
    content: 'Review: Nutrient Blends 14-Day Challenge',
    status: 'Live',
    views: '850K',
    conversions: '3.1%',
    roi: '3.2x'
  },
  {
    id: 4,
    name: '@Aika_Styles',
    platform: 'Instagram',
    content: 'Pro-V Deep Repair - First Impressions',
    status: 'Scheduled',
    views: '-',
    conversions: '-',
    roi: '-'
  }
];

// --- Components ---

const KPICard = ({ data }: { data: typeof KPI_DATA[0] }) => (
  <motion.div 
    whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center", data.color)}>
        <data.icon size={24} />
      </div>
      <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">
        <ArrowUpRight size={14} />
        {data.growth}
      </div>
    </div>
    
    <div>
      <h3 className="text-3xl font-bold text-[#1C1C1C] mb-1">{data.value}</h3>
      <div className="text-sm font-bold text-gray-700 mb-1">{data.label}</div>
      <div className="text-xs text-gray-400 font-medium">{data.subLabel}</div>
    </div>

    {/* Background Decoration */}
    <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-[0.03] bg-current pointer-events-none" />
  </motion.div>
);

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'YouTube': return <Youtube size={16} className="text-[#FF0000]" />;
    case 'LinkedIn': return <Linkedin size={16} className="text-[#0077B5]" />;
    case 'Instagram': return <Instagram size={16} className="text-[#E1306C]" />;
    default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
  }
};

export const MonitorModule = () => {
  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] pb-24 relative">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-[#1C1C1C]">Campaign Intelligence</h1>
            <span className="px-3 py-1 rounded-full bg-green-100 text-xs font-bold text-green-700 uppercase tracking-wider flex items-center gap-1.5 border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" /> Live Monitoring
            </span>
          </div>
          <p className="text-gray-500">Real-time performance tracking for "Glass Hair Awareness" Campaign.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1C1C1C] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors shadow-lg">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="px-8 pb-8 space-y-6 overflow-y-auto custom-scrollbar relative">
        
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {KPI_DATA.map(kpi => (
            <KPICard key={kpi.id} data={kpi} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
          {/* Main Area Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#1C1C1C]">Performance Over Time</h3>
                <p className="text-xs text-gray-500 font-medium">Engagement Volume vs. Pipeline Value</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" /> Engagement
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Pipeline
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#2563EB" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorViews)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-[#1C1C1C] mb-1">Channel Breakdown</h3>
            <p className="text-xs text-gray-500 font-medium mb-4">ROI attribution by platform</p>
            
            <div className="flex-1 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CHANNEL_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CHANNEL_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value, entry: any) => <span className="text-xs font-bold text-gray-600 ml-1">{value} ({entry.payload.value}%)</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                <span className="text-3xl font-bold text-[#1C1C1C]">100%</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Influencer Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-bold text-[#1C1C1C]">Partner Performance</h3>
            <button className="text-xs font-bold text-[#2563EB] hover:underline">View All</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Influencer</th>
                <th className="px-6 py-4">Content</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Conv. Rate</th>
                <th className="px-6 py-4 text-right">ROI</th>
              </tr>
            </thead>
            <tbody>
              {INFLUENCER_PERFORMANCE.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-600">
                        {row.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#1C1C1C]">{row.name}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <PlatformIcon platform={row.platform} /> {row.platform}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600 truncate max-w-[200px]">
                    {row.content}
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                      row.status === 'Live' ? "bg-green-50 text-green-700 border-green-100" : "bg-gray-50 text-gray-600 border-gray-200"
                    )}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#1C1C1C] text-sm">
                    {row.views}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600 text-sm">
                    {row.conversions}
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600 text-sm text-right">
                    {row.roi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};