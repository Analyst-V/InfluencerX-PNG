// src/app/data/brandConfig.ts
//
// Single source of truth for brand identity. Every component that currently
// hardcodes a brand string, logo, or color literal should import from here
// instead.

import brandLogo from "../../assets/image.png";
import brandLogoLight from "../../assets/pantene-logo-light.jpg";
import parentLogo from "../../assets/P&G_logo.png";
import vendorLogo from "../../assets/C5i_logo_for_dark_BG.png";

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
  brandName: "Pantene",
  brandShortName: "Pantene",

  // Logo displayed in the Shell header
  brandLogo: brandLogo,

  // Logo displayed on dark backgrounds (Landing page)
  brandLogoLight: brandLogoLight,

  brandTagline: "Strong is Beautiful",

  parentCompany: "P&G",
  parentLogo: parentLogo,
  parentAttributionText: "A P&G Brand",

  vendorName: "C5i",
  vendorLogo: vendorLogo,

  primaryMarkets: ["South Korea", "Japan"],
  defaultMarket: "South Korea",

  primaryCategory: "Hair Care",
  relatedCategories: ["Skin Care", "Beauty", "Hair Care"],

  colors: {
    primary: "#D4AF37",
    accent: "#000000",
    primaryForeground: "#FFFFFF",
  },

  platformName: "Social Intelligence & Campaign Optimization Platform",
  platformShortName: "Social Intelligence Platform",

  discoverPoweredBy: "TrendTraX",
  defaultPoweredBy: "InfluencerX",
};

export const activeBrand: BrandConfig = pantene;