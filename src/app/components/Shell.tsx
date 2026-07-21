import React from 'react';
import { User, Bell, HelpCircle, ChevronDown, Search, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { activeBrand } from '../data/brandConfig';

type Module = 'Discover' | 'Recommend' | 'Plan' | 'Monitor';

interface ShellProps {
  activeModule: Module;
  setActiveModule: (module: Module) => void;
  children: React.ReactNode;
  onLogout?: () => void;
  discoverViewMode?: 'consumer-themes' | 'market-trends';
  setDiscoverViewMode?: (mode: 'consumer-themes' | 'market-trends') => void;
  
  // Optional Filter Props (Available only in Discover mode)
  region?: string;
  setRegion?: (val: string) => void;
  period?: string;
  setPeriod?: (val: string) => void;
  channel?: string;
  setChannel?: (val: string) => void;
  category?: string;
  setProduct?: (val: string) => void;
  // NEW: Brand filter
  brand?: string;
  setBrand?: (val: string) => void;
  language?: string;
setLanguage?: (val: string) => void;
}

const FilterDropdown = ({ 
    label, 
    value, 
    onChange, 
    options 
}: { 
    label: string, 
    value: string, 
    onChange: (val: string) => void, 
    options: string[] 
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:bg-black/5 px-2 py-1 rounded transition-colors group"
            >
                <span className="text-gray-500">{label}:</span>
                <span className="font-semibold text-[#1C1C1C] whitespace-nowrap">{value}</span>
                <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600" />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                            className={clsx(
                                "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between",
                                value === option ? "font-bold text-[#2563EB] bg-blue-50" : "text-gray-700"
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export const Shell: React.FC<ShellProps> = ({ 
    activeModule, 
    setActiveModule, 
    children, 
    onLogout, 
    discoverViewMode, 
    setDiscoverViewMode,
    region = 'Japan',
setRegion,
period = 'Last 30 Days',
setPeriod,
channel = 'All Channels',
setChannel,
category = 'Daily Care',
setProduct,
language = 'English',
setLanguage,
brand = 'All Brands',
setBrand
}) => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#1C1C1C]">
      {/* Sticky Top Ribbon */}
      <div className="sticky top-0 z-50 h-[72px] bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white shadow-lg flex items-center justify-between px-6">
        {/* Left: Branding */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             {/* White Logo and Text for Shell */}
             <img src={activeBrand.brandLogo} alt={activeBrand.brandName} className="h-8 w-auto object-contain brightness-0 invert" />
             <span className="font-bold text-xl tracking-tight text-white">
               {activeModule === 'Discover' ? 'Social Intelligence' : 'Campaign Intelligence'}
             </span>
          </div>
        </div>

        {/* Center: Module Switcher */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="bg-white/10 backdrop-blur-md rounded-full p-1 flex border border-white/20">
            {(['Discover', 'Recommend', 'Plan', 'Monitor'] as Module[]).map((module) => (
              <button
                key={module}
                onClick={() => setActiveModule(module)}
                className={clsx(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out relative",
                  activeModule === module
                    ? "bg-white text-[#2563EB] shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                )}
              >
                {module}
                {activeModule === module && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-white -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-white border border-white/50 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <HelpCircle size={20} />
          </button>
          <div className="flex items-center gap-3 pl-2 border-l border-white/20">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold">Sarah J.</div>
              <div className="text-xs opacity-70">Global Admin</div>
            </div>
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center border border-white/30 relative group cursor-pointer">
              <User size={18} />
              {/* Optional: Simple hover menu could go here, but stick to explicit button for now */}
            </div>
            
            {/* Logout Button */}
            <button 
              onClick={onLogout}
              className="ml-2 p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white group"
              title="Logout"
            >
              <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Global Context Bar */}
      {activeModule === 'Discover' && (
      <div className="h-[48px] bg-white/70 backdrop-blur-xl border-b border-gray-200 flex items-center px-6 gap-6 sticky top-[72px] z-40">
        {setDiscoverViewMode && discoverViewMode ? (
          <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 shadow-inner">
            <button 
              onClick={() => setDiscoverViewMode('consumer-themes')}
              className={clsx(
                "px-3 py-1 rounded-[6px] text-[11px] font-bold uppercase tracking-wide transition-all",
                discoverViewMode === 'consumer-themes'
                  ? "bg-white text-[#2563EB] shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:text-gray-700 hover:bg-black/5"
              )}
            >
              Consumer Themes
            </button>
            <button 
              onClick={() => setDiscoverViewMode('market-trends')}
              className={clsx(
                "px-3 py-1 rounded-[6px] text-[11px] font-bold uppercase tracking-wide transition-all",
                discoverViewMode === 'market-trends'
                  ? "bg-white text-[#2563EB] shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:text-gray-700 hover:bg-black/5"
              )}
            >
              Market Trends
            </button>
          </div>
        ) : (
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Global Context</div>
        )}
        
        <div className="h-4 w-[1px] bg-gray-300"></div>

        <div className="flex items-center gap-4 text-sm">
          {/* NEW: Brand Filter - placed first in the filter list */}
          <FilterDropdown
            label="Brand"
            value={brand}
            onChange={setBrand || (() => {})}
            options={['All Brands', 'Pantene', 'Dove (Unilever)', 'Essential', 'TSUBAKI', '&honey']}
          />

          <FilterDropdown
            label="Category"
            value={category}
            onChange={setProduct || (() => {})}
            options={['Daily Care','Repair & Damage Control','Scalp Health','Volume & Texture','Specialized Treatments']}
          />

          <FilterDropdown 
  label="Region" 
  value={region} 
  onChange={setRegion || (() => {})} 
  options={['Japan', 'South Korea', 'Philippines']} 
/>
          
          <FilterDropdown 
            label="Period" 
            value={period} 
            onChange={setPeriod || (() => {})} 
            options={['Last 24 Hours', 'Last 7 Days', 'Last 30 Days']} 
          />

          <FilterDropdown 
            label="Channel" 
            value={channel} 
            onChange={setChannel || (() => {})} 
            options={['All Channels', 'X (Twitter)', 'YouTube', 'Instagram', 'Facebook', 'TikTok', 'Forums', 'Blogs']} 
          />
          <FilterDropdown
  label="Language"
  value={language}
  onChange={setLanguage || (() => {})}
  options={['English', 'Japanese', 'Korean', 'Filipino']}
/>
          
        </div>

        <div className="ml-auto flex items-center gap-2">
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search intelligence..." 
                    className="bg-gray-100/50 border border-gray-200 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] w-64 transition-all"
                />
            </div>
        </div>
      </div>
      )}

      {/* Main Content Area */}
      <main className="p-6 max-w-[1600px] mx-auto space-y-6">
        {children}
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
  <p className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-xs font-medium text-gray-600 shadow-sm">
    Data shown is for illustration only. The numbers are not actual.
  </p>
</div>
    </div>
  );
};