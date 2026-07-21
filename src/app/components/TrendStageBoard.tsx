// src/app/components/TrendStageBoard.tsx
//
// Kanban-style stage board for Market Trends (grid view). Groups trend
// items into 4 lifecycle columns — Emerging / Growing / Peaking /
// Saturating — instead of the free-floating bubble layout used for
// Consumer Themes. Self-contained: only depends on the existing `Theme`
// type (extended with an optional `stage` field, see note below) plus
// lucide-react + clsx, both already used elsewhere in this codebase.
//
// USAGE (in DiscoverModule.tsx):
//   {visualMode === 'bubbles' && viewMode === 'market-trends' ? (
//     <TrendStageBoard trends={marketTrends} onSelectTrend={setSelectedThemeId} />
//   ) : ( ...existing bubble/list JSX... )}
//
// REQUIRED DATA CHANGE:
// Add `stage?: 'Emerging' | 'Growing' | 'Peaking' | 'Saturating';` to the
// `Theme` interface in DiscoverModule.tsx, and assign a `stage` value to
// each item in the `marketTrends` array. Items without a `stage` are
// silently skipped by this component (falls back to omitting them from
// any column) — so double check every market trend item has one set.

import React from 'react';
import { Sprout, TrendingUp, Flame, Hourglass, ArrowUpRight, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export type TrendStage = 'Emerging' | 'Growing' | 'Peaking' | 'Saturating';

export interface StageBoardTrend {
  id: string;
  name: string;
  volume: string; // e.g. "210.4K"
  growth?: string; // e.g. "+91%"
  stage?: TrendStage;
}

interface TrendStageBoardProps {
  trends: StageBoardTrend[];
  onSelectTrend?: (id: string) => void;
}

const STAGE_METADATA: Record<
  TrendStage,
  {
    label: string;
    icon: React.ElementType;
    actionGuidance: string;
    legendText: string;
    accentBorder: string; // top border color
    iconBg: string;
    iconColor: string;
    headerBg: string;
    growthColor: string; // color for the growth % badge on cards in this column
    growthArrowUp: boolean; // whether growth badge shows an up-arrow vs a flat arrow
  }
> = {
  Emerging: {
    label: 'Emerging',
    icon: Sprout,
    actionGuidance: 'First-mover advantage · Act within 6 months',
    legendText: 'Emerging: First-mover opportunity',
    accentBorder: 'border-t-emerald-500',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    headerBg: 'bg-emerald-50/60',
    growthColor: 'bg-amber-100 text-amber-700',
    growthArrowUp: true,
  },
  Growing: {
    label: 'Growing',
    icon: TrendingUp,
    actionGuidance: 'Momentum building · Build now or follow fast',
    legendText: 'Growing: Build momentum',
    accentBorder: 'border-t-violet-500',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    headerBg: 'bg-violet-50/60',
    growthColor: 'bg-amber-100 text-amber-700',
    growthArrowUp: true,
  },
  Peaking: {
    label: 'Peaking',
    icon: Flame,
    actionGuidance: 'High competition entering · Differentiate or reposition',
    legendText: 'Peaking: Differentiate fast',
    accentBorder: 'border-t-orange-400',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    headerBg: 'bg-orange-50/60',
    growthColor: 'bg-emerald-100 text-emerald-700',
    growthArrowUp: true,
  },
  Saturating: {
    label: 'Saturating',
    icon: Hourglass,
    actionGuidance: 'Market crowded · Monitor or exit',
    legendText: 'Saturating: Monitor only',
    accentBorder: 'border-t-gray-300',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-500',
    headerBg: 'bg-gray-50',
    growthColor: 'bg-gray-100 text-gray-600',
    growthArrowUp: false,
  },
};

const STAGE_ORDER: TrendStage[] = ['Emerging', 'Growing', 'Peaking', 'Saturating'];

// Small decorative sparkline — purely visual (matches the reference design),
// not driven by real time-series data, so no data plumbing needed per card.
const MiniSparkline: React.FC<{ colorClass?: string }> = ({ colorClass = 'stroke-violet-500' }) => (
  <svg width="72" height="20" viewBox="0 0 72 20" fill="none" className={colorClass}>
    <path
      d="M1 16 C 14 17, 22 14, 30 11 S 46 6, 54 5 S 66 2, 71 1.5"
      strokeWidth="1.75"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const TrendStageBoard: React.FC<TrendStageBoardProps> = ({ trends, onSelectTrend }) => {
  const grouped: Record<TrendStage, StageBoardTrend[]> = {
    Emerging: [],
    Growing: [],
    Peaking: [],
    Saturating: [],
  };

  trends.forEach((t) => {
    if (t.stage && grouped[t.stage]) {
      grouped[t.stage].push(t);
    }
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 overflow-y-auto">
        {STAGE_ORDER.map((stage) => {
          const meta = STAGE_METADATA[stage];
          const Icon = meta.icon;
          const items = grouped[stage];

          return (
            <div
              key={stage}
              className={clsx(
                'rounded-xl border border-gray-100 bg-white flex flex-col border-t-4',
                meta.accentBorder
              )}
            >
              {/* Column header */}
              <div className={clsx('px-4 py-3 rounded-t-lg', meta.headerBg)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={clsx('w-6 h-6 rounded-md flex items-center justify-center', meta.iconBg)}>
                      <Icon size={14} className={meta.iconColor} />
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase text-gray-800">
                      {meta.label}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-1 leading-snug">{meta.actionGuidance}</p>
              </div>

              {/* Cards */}
              <div className="flex-1 p-3 flex flex-col gap-3">
                {items.length === 0 && (
                  <div className="text-[11px] text-gray-400 italic px-1 py-2">No trends in this stage</div>
                )}
                {items.map((trend) => (
                  <div
                    key={trend.id}
                    className="rounded-lg border border-gray-100 bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.04)] p-3 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)] transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-gray-900 leading-snug">{trend.name}</span>
                      {trend.growth && (
                        <span
                          className={clsx(
                            'shrink-0 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold',
                            meta.growthColor
                          )}
                        >
                          {trend.growth}
                          {meta.growthArrowUp ? <ArrowUpRight size={11} /> : <ArrowRight size={11} />}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Volume: {trend.volume}</p>
                    <div className="flex items-center justify-between mt-2">
                      <MiniSparkline
                        colorClass={
                          stage === 'Emerging'
                            ? 'stroke-emerald-500'
                            : stage === 'Growing'
                            ? 'stroke-violet-500'
                            : stage === 'Peaking'
                            ? 'stroke-orange-500'
                            : 'stroke-gray-400'
                        }
                      />
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend footer */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 border-t border-gray-100 bg-gray-50/50">
        {STAGE_ORDER.map((stage) => {
          const meta = STAGE_METADATA[stage];
          const Icon = meta.icon;
          return (
            <div key={stage} className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <Icon size={12} className={meta.iconColor} />
              <span>{meta.legendText}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};