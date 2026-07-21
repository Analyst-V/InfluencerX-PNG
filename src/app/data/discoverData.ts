// Extracted theme types and mock data from DiscoverModule

export interface Theme {
  id: string;
  name: string;
  sentiment: number;
  engagement: string;
  volume: string;
  type: 'Positive' | 'Critical' | 'Neutral';
  insight: string;
  verbatims: { text: string; source: string }[];
  size: number; // px - based on volume
  x: number; // %
  y: number; // %
  searchInterest?: number; // 0-100 (Trends only)
  growth?: string; // e.g. "+25%" (Trends only)
}

export const themes: Theme[] = [
  {
    id: "theme-01",
    name: "Tsuyu (Rainy Season) Frizz Control",
    sentiment: -45,
    engagement: "2.1M",
    volume: "68.4K",
    type: "Critical",
    insight: "Japanese consumers experience a sharp spike in frustration over flyaways (Aho-ge) and volume control during June/July's high humidity. They perceive current drugstore formulations as too heavy, weighing down fine Asian hair types.",
    verbatims: [
      { text: "No matter how much styling oil I use during Tsuyu, my bangs just collapse and frizz up within an hour. Pantene needs a lighter humidity shield.", source: "X (Twitter) - Tokyo" },
      { text: "Looking for an affordable drugstore shampoo that prevents humidity frizz without leaving my fine hair looking greasy by noon.", source: "Lipscosme - Osaka" }
    ],
    size: 135,
    x: 18,
    y: 72
  },
  {
    id: "theme-02",
    name: "Scalp Scaling & Detox Rituals",
    sentiment: 35,
    engagement: "1.4M",
    volume: "42.1K",
    type: "Neutral",
    insight: "Japanese consumers are treating scalp care with the same multi-step rigor as skincare. There is high interest in 'scalp balancing' products, with users actively searching for clarifying, non-stripping ingredients like Cica and Tea Tree.",
    verbatims: [
      { text: "My hair condition improved so much after treating my scalp like my face. Does Pantene have a dedicated scalp balancing ampoule yet?", source: "@cosme - Tokyo" },
      { text: "Seeing so many 10-step J-beauty scalp routines on my feed. The focus is entirely on a clean, healthy scalp foundation rather than just masking split ends.", source: "Instagram - Tokyo" }
    ],
    size: 95,
    x: 45,
    y: 28
  },
  {
    id: "theme-03",
    name: "Glass Hair (Tsuyatsuya) Shine",
    sentiment: 82,
    engagement: "3.8M",
    volume: "110.5K",
    type: "Positive",
    insight: "J-beauty trends are driving Gen Z and Millennial consumers toward ultra-glossy, liquid-like hair texture. Viral transformation videos highlight immediate, reflective shine as the ultimate sign of premium health.",
    verbatims: [
      { text: "Tried the new Pantene intensive treatment and my hair literally looks like a liquid waterfall under the bathroom light!", source: "TikTok - Tokyo" },
      { text: "Achieving that sleek glass hair look at home is so easy now with the right water-treatment formulas.", source: "YouTube - Tokyo" }
    ],
    size: 140,
    x: 75,
    y: 15
  },
  {
    id: "theme-04",
    name: "Seasonal Transition Hair Fall",
    sentiment: -65,
    engagement: "980K",
    volume: "38.9K",
    type: "Critical",
    insight: "Anxiety around post-summer and early spring shedding is highly prevalent in Japan. Consumers actively seek root-strengthening solutions and express skepticism toward mainstream generic 'anti-hairfall' claims that lack scientific backing.",
    verbatims: [
      { text: "Every autumn my brush is full of broken hair. I need something that actually strengthens the roots, not just glues the split ends together.", source: "@cosme - Yokohama" },
      { text: "Noticeable breakage lately. Is it the climate shift or my shampoo? Switching to a dedicated root care line.", source: "X (Twitter) - Yokohama" }
    ],
    size: 85,
    x: 12,
    y: 40
  },
  {
    id: "theme-05",
    name: "Salon-Grade At-Home Acid Treatments",
    sentiment: 60,
    engagement: "2.7M",
    volume: "89.2K",
    type: "Positive",
    insight: "Due to rising salon costs in Tokyo, consumers are looking for professional alternatives at home. Discussions focus heavily on salon-inspired bond repair and Glycolic/Levulinic acid treatments to repair high-bleach damage from trendy hair colors.",
    verbatims: [
      { text: "Since bleaching my hair silver, salon visits are too expensive. This at-home acid treatment gives me that exact silky post-salon glide.", source: "Instagram - Kyoto" },
      { text: "The technology in drugstore hair masks now matches what my stylist uses. Pantene's latest formula saves me 15,000 yen a month.", source: "@cosme - Tokyo" }
    ],
    size: 120,
    x: 82,
    y: 60
  },
  {
    id: "theme-06",
    name: "Sulfate & Silicone Transparency",
    sentiment: 5,
    engagement: "1.1M",
    volume: "31.4K",
    type: "Neutral",
    insight: "Consumers are highly educated on ingredient lists, actively filtering out sulfates and heavy silicones. However, a growing sub-debate shows users demanding transparency over what replaces these chemicals, fearing alternative surfactants might cause scalp buildup.",
    verbatims: [
      { text: "It says sulfate-free, but when I check the back label, the cleansing agents still look quite harsh for sensitive scalps.", source: "Lipscosme - Nagoya" },
      { text: "I prefer silicone-free for volume, but sometimes my ends feel like straw. We need clear guidance on how to balance both.", source: "@cosme - Osaka" }
    ],
    size: 78,
    x: 50,
    y: 85
  },
  {
    id: "theme-07",
    name: "Eco-Refill & Plastic Waste Reductions",
    sentiment: 48,
    engagement: "850K",
    volume: "24.6K",
    type: "Positive",
    insight: "Eco-consciousness is significantly influencing purchasing habits in Japan's mature market. Consumers heavily favor brands offering high-quality pouch refills, with growing micro-trends demanding aesthetic, minimalist reusable pumps to reduce bathroom visual clutter.",
    verbatims: [
      { text: "I love that Pantene offers eco-pouches, but I wish the refill design looked more minimalist and chic on my shower shelf.", source: "RoomClip - Tokyo" },
      { text: "Buying refills saves money and reduces plastic waste. It's standard practice here now, but we want zero-plastic packaging next.", source: "X (Twitter) - Sapporo" }
    ],
    size: 70,
    x: 33,
    y: 55
  },
  {
    id: "theme-08",
    name: "Before/After 'Miracle' Transformations",
    sentiment: 75,
    engagement: "3.2M",
    volume: "95.1K",
    type: "Positive",
    insight: "Short-form video platforms dominate conversations with dramatic 5-second hair transformation clips. Products that deliver instantaneous, highly visual smoothing or volumizing effects generate rapid word-of-mouth momentum.",
    verbatims: [
      { text: "Look at the comb test! My damaged hair went from a tangled bird's nest to completely straight in one wash.", source: "TikTok - Osaka" },
      { text: "Saw a viral reel demonstrating the 'ring of light' reflection on hair after using this capsule serum. Had to buy it immediately.", source: "Instagram - Fukuoka" }
    ],
    size: 130,
    x: 90,
    y: 35
  },
  {
    id: "theme-09",
    name: "Anti-Aging Hair Thinning Concerns",
    sentiment: -15,
    engagement: "1.2M",
    volume: "48.3K",
    type: "Neutral",
    insight: "Japan's aging demographic is driving discussions on hair thinning and loss of elasticity. Consumers feel current drugstore offerings focus too heavily on youth-centric styling rather than mature hair density.",
    verbatims: [
      { text: "My hair is losing its bounce and volume as I get older. Regular moisturizing shampoos just make it flat.", source: "@cosme - Tokyo" },
      { text: "I wish drugstore brands would create elegant aging-care lines for hair that target volume right from the roots.", source: "@cosme - Saitama" }
    ],
    size: 90,
    x: 60,
    y: 50
  }
];

export const marketTrends = [
  {
    id: "trend-01",
    name: "Skinification of Hair Care",
    sentiment: 78,
    engagement: "4.2M",
    volume: "125.0K",
    type: "Positive",
    insight: "The 'scalp-as-skincare' movement is dominating Japan. Consumers are applying traditional facial skincare ingredients—like hyaluronic acid, ceramides, and salicylic acid—to their hair routines to treat the scalp as an extension of their face.",
    verbatims: [
      { text: "I started using a niacinamide scalp serum and my roots feel so much stronger. Hair care is just skincare now.", source: "@cosme - Tokyo" },
      { text: "Looking for shampoos that treat my dry scalp with the same gentle care as my morning facial cleanser.", source: "Lipscosme - Osaka" }
    ],
    size: 135,
    x: 25,
    y: 80,
    searchInterest: 92,
    growth: "+68%"
  },
  {
    id: "trend-02",
    name: "Glass Hair (Tsuyatsuya) / Luminous Shine",
    sentiment: 85,
    engagement: "5.1M",
    volume: "189.3K",
    type: "Positive",
    insight: "Japan continues to refine the ultra-dewy hair aesthetic with high-gloss barrier treatments aligned with 'Bihaku' (translucent, luminous hair). Japanese consumers prioritize deep, water-like hydration and reflective shine over heavy cosmetic coverage.",
    verbatims: [
      { text: "Achieving that transparent luminous look requires layers of watery treatments. The goal is to look naturally radiant, not product-heavy.", source: "Instagram - Tokyo" },
      { text: "Obsessed with finding base products that let your natural hair texture shine through while giving a crystal-clear glossy finish.", source: "Lipscosme - Kyoto" }
    ],
    size: 140,
    x: 70,
    y: 20,
    searchInterest: 98,
    growth: "+42%"
  },
  {
    id: "trend-03",
    name: "Derma-Cosmetics & Barrier Repair",
    sentiment: 62,
    engagement: "3.4M",
    volume: "98.5K",
    type: "Positive",
    insight: "Driven by sensitive skin concerns from environmental stressors and urban pollution, clinical derma-cosmetics are booming in Japan. Formulas featuring Cica (Centella Asiatica), Panthenol, and Mugwort are highly sought after for targeted skin barrier healing.",
    verbatims: [
      { text: "Whenever my skin barrier breaks down from pollution, I immediately strip back my routine to just a medical-grade Cica balm.", source: "@cosme - Kyoto" },
      { text: "My dermatologist recommended switching to barrier-first brands. The redness around my cheeks subsided in days.", source: "YouTube - Tokyo" }
    ],
    size: 115,
    x: 48,
    y: 65,
    searchInterest: 85,
    growth: "+55%"
  },
  {
    id: "trend-04",
    name: "J-Beauty Minimalism & 'Skip-Care'",
    sentiment: 40,
    engagement: "1.9M",
    volume: "54.2K",
    type: "Neutral",
    insight: "In contrast to the intensive multi-step routine, a strong counter-trend toward 'skip-care' or minimalism is rising, particularly in Japan. Consumers are opting for multi-functional products (e.g., 3-in-1 toner-essence-emulsions) to save time and reduce skin irritation.",
    verbatims: [
      { text: "Using 10 different products was actually making my skin break out. Reducing it to three high-quality items completely saved my skin.", source: "X (Twitter) - Osaka" },
      { text: "Skip-care is perfect for busy mornings. One high-performance hybrid fluid is all I need before sunscreen.", source: "Lipscosme - Tokyo" }
    ],
    size: 90,
    x: 15,
    y: 35,
    searchInterest: 68,
    growth: "+24%"
  },
  {
    id: "trend-05",
    name: "Clean & Certified Vegan Beauty",
    sentiment: 55,
    engagement: "2.6M",
    volume: "73.1K",
    type: "Positive",
    insight: "Gen Z consumers are driving a shift toward ethical consumption, actively searching for certified vegan, cruelty-free, and reef-safe labels. However, skepticism remains regarding 'greenwashing', with users demanding rigorous third-party certifications.",
    verbatims: [
      { text: "I only buy brands that have official Eve Vegan certification now. It's better for my body and the planet.", source: "@cosme - Tokyo" },
      { text: "Many brands claim to be 'clean' but their packaging is still wrapped in excess plastic. We need true sustainability.", source: "X (Twitter) - Nagoya" }
    ],
    size: 105,
    x: 85,
    y: 50,
    searchInterest: 79,
    growth: "+47%"
  },
  {
    id: "trend-06",
    name: "Year-Round Advanced Sunscreen Culture",
    sentiment: 25,
    engagement: "3.9M",
    volume: "112.4K",
    type: "Neutral",
    insight: "Sun protection is treated as a non-negotiable health standard rather than seasonal care in Japan. The current focus is on specialized UV filters that double as lightweight serum-primers, offering blue-light protection, anti-pollution shields, and zero white cast.",
    verbatims: [
      { text: "Even indoors on a rainy winter day, blue light from my monitor causes pigmentation. A protective fluid gel is essential.", source: "YouTube - Tokyo" },
      { text: "The new serum-style sunscreens feel so weightless that I completely forget I'm wearing UV protection.", source: "@cosme - Yokohama" }
    ],
    size: 125,
    x: 38,
    y: 15,
    searchInterest: 91,
    growth: "+38%"
  },
  {
    id: "trend-07",
    name: "Inner Beauty & Nutricosmetics",
    sentiment: -12,
    engagement: "1.5M",
    volume: "46.8K",
    type: "Critical",
    insight: "Consumers increasingly believe that topical beauty is limited without internal support. High interest surrounds ingestible collagen, glutathione, and biotin, though critics call out the high price points and slow visible results of oral beauty supplements.",
    verbatims: [
      { text: "Drinking liquid collagen daily definitely plumped my skin, but it's becoming way too expensive to maintain monthly.", source: "@cosme - Osaka" },
      { text: "So many beauty supplements claim to improve hair density, but I haven't seen a noticeable difference after three months of regular use.", source: "X (Twitter) - Saitama" }
    ],
    size: 85,
    x: 60,
    y: 88,
    searchInterest: 74,
    growth: "+31%"
  }
];