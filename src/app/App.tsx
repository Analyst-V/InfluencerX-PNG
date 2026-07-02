import React, { useState } from 'react';
import { activeBrand } from './data/brandConfig';

import { Shell } from './components/Shell';
import { DiscoverModule } from './components/DiscoverModule';
import { RecommendModule } from './components/RecommendModule';
import { CreateModule } from './components/CreateModule';
import { MonitorModule } from './components/MonitorModule';
import LandingPage from './components/LandingPage';
import { AnimatePresence, motion } from 'motion/react';

// Define the context type shared between modules
// In App.tsx - Update the CampaignContext interface
export interface CampaignContext {
  brand?: string;
  productFocus?: string;
  objective?: string;
  geography?: string;
  description?: string;
  creatorCategory?: string;
  selectedInfluencers?: any[]; // Use any[] to be flexible
  // Additional fields for CreateModule
  productLine?: string;
  campaignObjective?: string;
  targetPlatforms?: string[];
  targetGeography?: string;
  campaignDescription?: string;
  creatorTier?: string;
  // Discovery -> Recommend helper fields
  themeName?: string;
  sentiment?: 'Positive' | 'Negative' | 'Neutral' | string;
  insight?: string;
  sourceModule?: string;
}
const App = () => {
  const [activeModule, setActiveModule] = useState<'Discover' | 'Recommend' | 'Plan' | 'Monitor'>('Discover');
  const [showLanding, setShowLanding] = useState(true);
  const [campaignContext, setCampaignContext] = useState<CampaignContext | null>(null);
  const [discoverViewMode, setDiscoverViewMode] = useState<'consumer-themes' | 'market-trends'>('consumer-themes');

  // Discover Filter State
  const [region, setRegion] = useState(activeBrand?.defaultMarket || 'Japan');
  const [period, setPeriod] = useState('Last 30 Days');
  const [channel, setChannel] = useState('All Channels');
  const [product, setProduct] = useState('Pro-V');

  const handleNavigateToRecommend = (context: CampaignContext) => {
    setCampaignContext(context);
    setActiveModule('Recommend');
  };

  const handleNavigateToCreate = (context: CampaignContext) => {
    setCampaignContext(prev => ({ ...prev, ...context }));
    setActiveModule('Plan');
  };

  const handleLogout = () => {
    setShowLanding(true);
    // Optionally reset other state if needed
    setActiveModule('Discover');
    setCampaignContext(null);
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'Discover':
        return <DiscoverModule onNavigateToRecommend={handleNavigateToRecommend} viewMode={discoverViewMode} />;
      case 'Recommend':
        return <RecommendModule initialContext={campaignContext} onNavigateToCreate={handleNavigateToCreate} onBack={() => setActiveModule('Discover')} />;
      case 'Plan':
        return <CreateModule initialContext={campaignContext} onBack={() => setActiveModule('Recommend')} />;
      case 'Monitor':
        return <MonitorModule />;
      default:
        return <DiscoverModule onNavigateToRecommend={handleNavigateToRecommend} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F5F5]">
      <AnimatePresence mode="wait">
        {showLanding ? (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50"
          >
            <LandingPage onStart={() => setShowLanding(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <Shell 
          activeModule={activeModule} 
          setActiveModule={setActiveModule}
          onLogout={handleLogout}
          discoverViewMode={discoverViewMode}
          setDiscoverViewMode={setDiscoverViewMode}
          
          // Filter Props
          region={region}
          setRegion={setRegion}
          period={period}
          setPeriod={setPeriod}
          channel={channel}
          setChannel={setChannel}
          product={product}
          setProduct={setProduct}
        >
          {renderModule()}
        </Shell>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
