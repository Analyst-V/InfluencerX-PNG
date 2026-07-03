// src/app/data/brandConfig.ts
//
// Single source of truth for brand identity. Every component that currently
// hardcodes a brand string, logo, or color literal should import from here
// instead.

export interface BrandConfig {
  brandName: string;
  brandShortName: string;
  brandLogo: string; // for light backgrounds (Shell header)
  brandLogoLight: string; // for dark backgrounds (Landing page hero)
  brandTagline: string;
  landingPageCreatives?: string[];
  parentCompany: string;
  parentLogo: string;
  parentAttributionText: string;

  vendorName: string;
  vendorLogo: string;

  primaryMarkets: string[];
  defaultMarket: string;

  primaryCategory: string;
  relatedCategories: string[];

  colors: {
    primary: string;
    accent: string;
    primaryForeground: string;
  };

  platformName: string;
  platformShortName: string;

  discoverPoweredBy: string;
  defaultPoweredBy: string;
}

export const pantene: BrandConfig = {
  brandName: 'Pantene',
  brandShortName: 'Pantene',
  brandLogo: '/src/assets/image.png', // TODO: confirm this matches your actual light-mode/Shell asset
  brandLogoLight: '/src/assets/pantene-logo-light.jpg',
  brandTagline: 'Strong is Beautiful',

  parentCompany: 'P&G',
  parentLogo: '/src/assets/P&G_logo.png',
  parentAttributionText: 'A P&G Brand',

  vendorName: 'C5i',
  vendorLogo: '/src/assets/C5i_logo_for_dark_BG.png',

  primaryMarkets: ['South Korea', 'Japan'],
  defaultMarket: 'South Korea',

  primaryCategory: 'Hair Care',
  relatedCategories: ['Skin Care', 'Beauty', 'Hair Care'],

  colors: {
    primary: '#D4AF37',
    accent: '#000000',
    primaryForeground: '#FFFFFF',
  },

  platformName: 'Social Intelligence & Campaign Optimization Platform',
  platformShortName: 'Social Intelligence Platform',

  discoverPoweredBy: 'TrendTraX',
  defaultPoweredBy: 'InfluencerX',
};

export const activeBrand: BrandConfig = pantene;