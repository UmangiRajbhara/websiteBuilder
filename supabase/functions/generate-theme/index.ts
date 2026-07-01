/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore: the jsr prefix is understood by Deno but not by standard TypeScript/Node
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// Theme presets based on restaurant types and vibes
const THEME_PRESETS: Record<string, Record<string, object>> = {
  pizza: {
    rustic: {
      siteName: "Napoli Nights",
      tagline: "Authentic wood-fired pizza since 2019",
      primaryColor: "#C41E3A",
      secondaryColor: "#8B0000",
      accentColor: "#FFD700",
      bgColor: "#FDF5E6",
      textColor: "#2C1810",
      navBg: "#C41E3A",
      navText: "#FFFFFF",
      footerBg: "#2C1810",
      footerText: "#FDF5E6",
      fontDisplay: "Playfair Display",
      fontBody: "Lato",
      heroHeadline: "Pizza Made With Passion",
      heroSubline: "Every slice tells a story — from Naples to your table.",
      heroFoodKeyword: "pizza",
      ctaText: "Order Now",
      address: "12 Olive Street, Downtown",
      phone: "+1 (555) 123-4567",
      hours: "Mon–Sun: 11am – 11pm",
      borderRadius: "8",
    },
    modern: {
      siteName: "Slice Lab",
      tagline: "Craft pizza, reimagined",
      primaryColor: "#1A1A2E",
      secondaryColor: "#16213E",
      accentColor: "#E94560",
      bgColor: "#FFFFFF",
      textColor: "#1A1A2E",
      navBg: "#1A1A2E",
      navText: "#FFFFFF",
      footerBg: "#0F0F1A",
      footerText: "#FFFFFF",
      fontDisplay: "Syne",
      fontBody: "Inter",
      heroHeadline: "Pizza Perfected",
      heroSubline: "Artisan crusts, premium toppings, unforgettable taste.",
      heroFoodKeyword: "pizza",
      ctaText: "Order Online",
      address: "456 Modern Ave, Arts District",
      phone: "+1 (555) 234-5678",
      hours: "Tue–Sun: 12pm – 10pm",
      borderRadius: "16",
    },
  },
  sushi: {
    elegant: {
      siteName: "Sakura Sushi",
      tagline: "The art of Japanese cuisine",
      primaryColor: "#1B1B1B",
      secondaryColor: "#2D2D2D",
      accentColor: "#D4AF37",
      bgColor: "#FAFAFA",
      textColor: "#1B1B1B",
      navBg: "#1B1B1B",
      navText: "#FFFFFF",
      footerBg: "#0A0A0A",
      footerText: "#FAFAFA",
      fontDisplay: "Cormorant Garamond",
      fontBody: "DM Sans",
      heroHeadline: "Omakase Excellence",
      heroSubline: "Fresh from Tokyo's Tsukiji market to your plate.",
      heroFoodKeyword: "sushi",
      ctaText: "Reserve",
      address: "888 Cherry Blossom Lane",
      phone: "+1 (555) 345-6789",
      hours: "Tue–Sat: 5pm – 11pm",
      borderRadius: "4",
    },
    modern: {
      siteName: "Kaiten",
      tagline: "Next-gen sushi bar",
      primaryColor: "#00C9A7",
      secondaryColor: "#00A896",
      accentColor: "#FF6B6B",
      bgColor: "#FFFFFF",
      textColor: "#1A1A2E",
      navBg: "#00C9A7",
      navText: "#FFFFFF",
      footerBg: "#1A1A2E",
      footerText: "#FFFFFF",
      fontDisplay: "Raleway",
      fontBody: "Source Sans 3",
      heroHeadline: "Sushi, Simplified",
      heroSubline: "Conveyor belt fresh, always authentic.",
      heroFoodKeyword: "sushi",
      ctaText: "Find Us",
      address: "123 Tech Park Blvd",
      phone: "+1 (555) 456-7890",
      hours: "Daily: 11am – 10pm",
      borderRadius: "20",
    },
  },
  burger: {
    classic: {
      siteName: "Big Stack Burger",
      tagline: "Stack 'em high since 1985",
      primaryColor: "#D62828",
      secondaryColor: "#9B1B1B",
      accentColor: "#FCBF49",
      bgColor: "#FFFBEB",
      textColor: "#1A1A1A",
      navBg: "#D62828",
      navText: "#FFFFFF",
      footerBg: "#1A1A1A",
      footerText: "#FFFBEB",
      fontDisplay: "Bebas Neue",
      fontBody: "Poppins",
      heroHeadline: "Double the Patty, Double the Fun",
      heroSubline: "Hand-crafted burgers made with 100% Angus beef.",
      heroFoodKeyword: "burger",
      ctaText: "Order Now",
      address: "789 Grill Street",
      phone: "+1 (555) 567-8901",
      hours: "Mon–Sun: 10am – 12am",
      borderRadius: "12",
    },
    gourmet: {
      siteName: "The Burger Atelier",
      tagline: "Elevated burgers, craft culture",
      primaryColor: "#2E4057",
      secondaryColor: "#048A81",
      accentColor: "#F4D35E",
      bgColor: "#FFFFFF",
      textColor: "#2E4057",
      navBg: "#2E4057",
      navText: "#FFFFFF",
      footerBg: "#1B2838",
      footerText: "#FFFFFF",
      fontDisplay: "DM Serif Display",
      fontBody: "Plus Jakarta Sans",
      heroHeadline: "Burgers, Refined",
      heroSubline: "Wagyu blends, aged cheddars, brioche baked fresh daily.",
      heroFoodKeyword: "burger",
      ctaText: "View Menu",
      address: "42 Gourmet Row, Midtown",
      phone: "+1 (555) 678-9012",
      hours: "Wed–Mon: 5pm – 11pm",
      borderRadius: "8",
    },
  },
  tacos: {
    authentic: {
      siteName: "Casa de Tacos",
      tagline: "Tacos from the heart of Mexico",
      primaryColor: "#F15025",
      secondaryColor: "#C12C1B",
      accentColor: "#00A878",
      bgColor: "#FFFAF5",
      textColor: "#3D1308",
      navBg: "#F15025",
      navText: "#FFFFFF",
      footerBg: "#3D1308",
      footerText: "#FFFAF5",
      fontDisplay: "Fraunces",
      fontBody: "Nunito",
      heroHeadline: "Sabor Auténtico",
      heroSubline: "Family recipes passed down through generations.",
      heroFoodKeyword: "tacos",
      ctaText: "Ordenar",
      address: "555 Fiesta Ave",
      phone: "+1 (555) 789-0123",
      hours: "Daily: 10am – 11pm",
      borderRadius: "16",
    },
    modern: {
      siteName: "Taco Republik",
      tagline: "Street tacos, street style",
      primaryColor: "#6B2D5C",
      secondaryColor: "#4A1D3F",
      accentColor: "#FFBC42",
      bgColor: "#FFFFFF",
      textColor: "#1A1A2E",
      navBg: "#6B2D5C",
      navText: "#FFFFFF",
      footerBg: "#1A1A2E",
      footerText: "#FFFFFF",
      fontDisplay: "Oswald",
      fontBody: "Roboto",
      heroHeadline: "Tacos After Dark",
      heroSubline: "Fusion flavors, late nights, good vibes only.",
      heroFoodKeyword: "tacos",
      ctaText: "Order Online",
      address: "99 Hipster Lane",
      phone: "+1 (555) 890-1234",
      hours: "Tue–Sun: 4pm – 2am",
      borderRadius: "6",
    },
  },
  pasta: {
    rustic: {
      siteName: "Nonna's Kitchen",
      tagline: "Homemade pasta, Nonna's way",
      primaryColor: "#8B4513",
      secondaryColor: "#5D2E0C",
      accentColor: "#228B22",
      bgColor: "#FFF8DC",
      textColor: "#3E2723",
      navBg: "#8B4513",
      navText: "#FFFFFF",
      footerBg: "#3E2723",
      footerText: "#FFF8DC",
      fontDisplay: "Libre Baskerville",
      fontBody: "Lato",
      heroHeadline: "Pasta Made With Love",
      heroSubline: "Every noodle rolled by hand, every sauce simmered for hours.",
      heroFoodKeyword: "pasta",
      ctaText: "Reserve a Table",
      address: "77 Trattoria Lane",
      phone: "+1 (555) 901-2345",
      hours: "Tue–Sun: 5pm – 10pm",
      borderRadius: "10",
    },
  },
  steak: {
    premium: {
      siteName: "Prime & Co.",
      tagline: "Prime cuts, prime experience",
      primaryColor: "#1C1C1C",
      secondaryColor: "#333333",
      accentColor: "#C9A227",
      bgColor: "#FFFFFF",
      textColor: "#1C1C1C",
      navBg: "#1C1C1C",
      navText: "#FFFFFF",
      footerBg: "#0D0D0D",
      footerText: "#FFFFFF",
      fontDisplay: "Cormorant Garamond",
      fontBody: "Inter",
      heroHeadline: "The Art of Steak",
      heroSubline: "USDA Prime, dry-aged to perfection.",
      heroFoodKeyword: "steak",
      ctaText: "Book a Table",
      address: "1 Steakhouse Row",
      phone: "+1 (555) 012-3456",
      hours: "Tue–Sat: 5pm – 11pm",
      borderRadius: "2",
    },
  },
  seafood: {
    coastal: {
      siteName: "The Dockside",
      tagline: "Fresh from boat to plate",
      primaryColor: "#1E6091",
      secondaryColor: "#154C79",
      accentColor: "#F4A261",
      bgColor: "#F0F7FA",
      textColor: "#1B4965",
      navBg: "#1E6091",
      navText: "#FFFFFF",
      footerBg: "#0D3B66",
      footerText: "#F0F7FA",
      fontDisplay: "Playfair Display",
      fontBody: "DM Sans",
      heroHeadline: "Ocean Fresh Daily",
      heroSubline: "Caught this morning, on your plate tonight.",
      heroFoodKeyword: "seafood",
      ctaText: "See Today's Catch",
      address: "88 Harbor Way",
      phone: "+1 (555) 123-7890",
      hours: "Daily: 11am – 10pm",
      borderRadius: "12",
    },
  },
  indian: {
    traditional: {
      siteName: "Maharaja Palace",
      tagline: "Royal flavors of India",
      primaryColor: "#B8860B",
      secondaryColor: "#996515",
      accentColor: "#DC143C",
      bgColor: "#FFFAF0",
      textColor: "#2C1810",
      navBg: "#B8860B",
      navText: "#FFFFFF",
      footerBg: "#2C1810",
      footerText: "#FFFAF0",
      fontDisplay: "Playfair Display",
      fontBody: "Poppins",
      heroHeadline: "Taste the Tradition",
      heroSubline: "Authentic recipes from the palaces of Rajasthan.",
      heroFoodKeyword: "indian",
      ctaText: "Book Now",
      address: "56 Spice Garden Rd",
      phone: "+1 (555) 234-8901",
      hours: "Daily: 11:30am – 10pm",
      borderRadius: "8",
    },
    street: {
      siteName: "Street Spice",
      tagline: "Bold flavors from Mumbai's streets",
      primaryColor: "#E85A4F",
      secondaryColor: "#C74B40",
      accentColor: "#FFC857",
      bgColor: "#FFF8F0",
      textColor: "#2D3436",
      navBg: "#E85A4F",
      navText: "#FFFFFF",
      footerBg: "#2D3436",
      footerText: "#FFF8F0",
      fontDisplay: "DM Serif Display",
      fontBody: "Source Sans 3",
      heroHeadline: "Street Food, Elevated",
      heroSubline: "Vada pav, pav bhaji, and more — authentic Mumbai flavors.",
      heroFoodKeyword: "indian",
      ctaText: "Order Now",
      address: "78 Chowpatty Lane",
      phone: "+1 (555) 345-6789",
      hours: "Daily: 10am – 11pm",
      borderRadius: "12",
    },
  },
  vadapav: {
    minimal: {
      siteName: "Vada Pav Co.",
      tagline: "Mumbai's iconic street food",
      primaryColor: "#728C69",
      secondaryColor: "#5A7050",
      accentColor: "#1A1A1A",
      bgColor: "#FAFAFA",
      textColor: "#1A1A1A",
      navBg: "#1A1A1A",
      navText: "#FFFFFF",
      footerBg: "#1A1A1A",
      footerText: "#FAFAFA",
      fontDisplay: "Syne",
      fontBody: "Inter",
      heroHeadline: "The Soul of Mumbai",
      heroSubline: "Crispy vada, soft pav, spicy chutney — street food perfection.",
      heroFoodKeyword: "indian",
      ctaText: "Order",
      address: "42 Vikhroli Street",
      phone: "+1 (555) 123-4567",
      hours: "Daily: 11am – 10pm",
      borderRadius: "24",
    },
    premium: {
      siteName: "Vada Pav Haus",
      tagline: "Elevated street cuisine",
      primaryColor: "#1C1C1C",
      secondaryColor: "#333333",
      accentColor: "#8B9A46",
      bgColor: "#FFFFFF",
      textColor: "#1C1C1C",
      navBg: "#1C1C1C",
      navText: "#FFFFFF",
      footerBg: "#0D0D0D",
      footerText: "#FFFFFF",
      fontDisplay: "Cormorant Garamond",
      fontBody: "Plus Jakarta Sans",
      heroHeadline: "Street Food, Reimagined",
      heroSubline: "Premium vada pav with artisan chutneys and fresh ingredients.",
      heroFoodKeyword: "indian",
      ctaText: "Visit Us",
      address: "88 Gourmet Street, Downtown",
      phone: "+1 (555) 987-6543",
      hours: "Tue–Sun: 11am – 10pm",
      borderRadius: "6",
    },
  },
  chinese: {
    classic: {
      siteName: "Golden Dragon",
      tagline: "Sichuan to Cantonese mastery",
      primaryColor: "#C41E3A",
      secondaryColor: "#8B0000",
      accentColor: "#FFD700",
      bgColor: "#FFFBF0",
      textColor: "#2C1810",
      navBg: "#C41E3A",
      navText: "#FFD700",
      footerBg: "#2C1810",
      footerText: "#FFFBF0",
      fontDisplay: "Noto Serif SC",
      fontBody: "Noto Sans SC",
      heroHeadline: "Flavors of the East",
      heroSubline: "Hand-pulled noodles, wok-fired perfection.",
      heroFoodKeyword: "chinese",
      ctaText: "Order Online",
      address: "888 Jade Street",
      phone: "+1 (555) 345-9012",
      hours: "Daily: 11am – 11pm",
      borderRadius: "6",
    },
  },
  bbq: {
    smokehouse: {
      siteName: "Smokin' Joe's",
      tagline: "Low and slow since '92",
      primaryColor: "#5D4037",
      secondaryColor: "#3E2723",
      accentColor: "#FF6F00",
      bgColor: "#FFF8E1",
      textColor: "#3E2723",
      navBg: "#5D4037",
      navText: "#FFFFFF",
      footerBg: "#3E2723",
      footerText: "#FFF8E1",
      fontDisplay: "Bebas Neue",
      fontBody: "Roboto",
      heroHeadline: "Smoked to Perfection",
      heroSubline: "18-hour brisket, fall-off-the-bone ribs, legendary sauce.",
      heroFoodKeyword: "bbq",
      ctaText: "Grab a Plate",
      address: "123 Smoker Alley",
      phone: "+1 (555) 456-0123",
      hours: "Wed–Sun: 11am – 9pm",
      borderRadius: "4",
    },
  },
  cafe: {
    modern: {
      siteName: "The Daily Grind",
      tagline: "Coffee, community, connection",
      primaryColor: "#6F4E37",
      secondaryColor: "#5D4037",
      accentColor: "#D4A574",
      bgColor: "#FDF6E3",
      textColor: "#3E2723",
      navBg: "#6F4E37",
      navText: "#FFFFFF",
      footerBg: "#3E2723",
      footerText: "#FDF6E3",
      fontDisplay: "Playfair Display",
      fontBody: "Inter",
      heroHeadline: "Your Morning Ritual",
      heroSubline: "Single-origin beans, pastries baked fresh, cozy corners.",
      heroFoodKeyword: "cafe",
      ctaText: "Find Us",
      address: "42 Bean Street",
      phone: "+1 (555) 567-1234",
      hours: "Mon–Fri: 6am – 6pm, Sat–Sun: 7am – 5pm",
      borderRadius: "16",
    },
    minimalist: {
      siteName: "NODE Coffee",
      tagline: "Code your morning",
      primaryColor: "#1A1A1E",
      secondaryColor: "#2D2D30",
      accentColor: "#00E676",
      bgColor: "#FAFAFA",
      textColor: "#1A1A1E",
      navBg: "#1A1A1E",
      navText: "#FFFFFF",
      footerBg: "#0D0D0F",
      footerText: "#FAFAFA",
      fontDisplay: "Syne",
      fontBody: "Manrope",
      heroHeadline: "Coffee._run()",
      heroSubline: "Specialty roasts for developers and dreamers.",
      heroFoodKeyword: "cafe",
      ctaText: "Load More",
      address: "Terminal 1, Tech Park",
      phone: "+1 (555) 678-2345",
      hours: "Daily: 7am – 7pm",
      borderRadius: "24",
    },
  },
};

const DEFAULT_NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function generateTheme(prompt: string): object {
  const lowerPrompt = prompt.toLowerCase();

  // Find matching food type
  let matchedType = "";
  for (const type of Object.keys(THEME_PRESETS)) {
    if (lowerPrompt.includes(type)) {
      matchedType = type;
      break;
    }
  }

  // Detect style vibe
  const styleKeywords: Record<string, string[]> = {
    modern: ["modern", "contemporary", "minimalist", "clean", "sleek", "tech"],
    rustic: ["rustic", "traditional", "classic", "authentic", "old-school", "vintage"],
    elegant: ["elegant", "upscale", "fine dining", "premium", "luxury", "sophisticated"],
    classic: ["classic", "american", "diner", "retro"],
    gourmet: ["gourmet", "artisan", "craft", "specialty"],
  };

  let matchedStyle = "";
  for (const [style, keywords] of Object.entries(styleKeywords)) {
    if (keywords.some(kw => lowerPrompt.includes(kw))) {
      matchedStyle = style;
      break;
    }
  }

  // Extract potential restaurant name
  const namePatterns = [
    /(?:called|named|named|"|')([A-Za-z\s]+?)(?:'|"|restaurant|cafe|Kitchen|$)/i,
    /([A-Za-z]+(?:\s+[A-Za-z]+)?)\s+(?:restaurant|cafe|kitchen|pizza|sushi|burger|taco)/i,
  ];

  let extractedName = "";
  for (const pattern of namePatterns) {
    const match = prompt.match(pattern);
    if (match && match[1]) {
      extractedName = match[1].trim().replace(/['"]/g, "").replace(/\b restaurant\b|\b cafe\b|\b kitchen\b/gi, "");
      break;
    }
  }

  // Determine colors from prompt
  const colorPalettes: Record<string, { primary: string; secondary: string; accent: string; bg: string; text: string; navBg: string; footerBg: string }> = {
    black: {
      primary: "#1A1A1A",
      secondary: "#333333",
      accent: "#FFFFFF",
      bg: "#FAFAFA",
      text: "#1A1A1A",
      navBg: "#1A1A1A",
      footerBg: "#0D0D0D",
    },
    white: {
      primary: "#FFFFFF",
      secondary: "#F5F5F5",
      accent: "#1A1A1A",
      bg: "#FFFFFF",
      text: "#1A1A1A",
      navBg: "#FFFFFF",
      footerBg: "#F5F5F5",
    },
    red: {
      primary: "#C41E3A",
      secondary: "#8B0000",
      accent: "#FFD700",
      bg: "#FFFBF0",
      text: "#2C1810",
      navBg: "#C41E3A",
      footerBg: "#2C1810",
    },
    green: {
      primary: "#2D5A27",
      secondary: "#1E3D1A",
      accent: "#D4AF37",
      bg: "#F8FAF7",
      text: "#1A2E1A",
      navBg: "#2D5A27",
      footerBg: "#1A2E1A",
    },
    sage: {
      primary: "#728C69",
      secondary: "#5A7050",
      accent: "#1A1A1A",
      bg: "#FAFAFA",
      text: "#1A1A1A",
      navBg: "#1A1A1A",
      footerBg: "#0D0D0D",
    },
    emerald: {
      primary: "#10B981",
      secondary: "#059669",
      accent: "#FCD34D",
      bg: "#F0FDF4",
      text: "#1A3A2E",
      navBg: "#10B981",
      footerBg: "#1A3A2E",
    },
    blue: {
      primary: "#1E6091",
      secondary: "#154C79",
      accent: "#F4A261",
      bg: "#F0F7FA",
      text: "#1B4965",
      navBg: "#1E6091",
      footerBg: "#0D3B66",
    },
    navy: {
      primary: "#1A365D",
      secondary: "#0F2B4A",
      accent: "#EAB308",
      bg: "#F8FAFC",
      text: "#1E293B",
      navBg: "#1A365D",
      footerBg: "#0F172A",
    },
    orange: {
      primary: "#EA580C",
      secondary: "#C2410C",
      accent: "#FCD34D",
      bg: "#FFF7ED",
      text: "#431407",
      navBg: "#EA580C",
      footerBg: "#431407",
    },
    gold: {
      primary: "#B8860B",
      secondary: "#996515",
      accent: "#1A1A1A",
      bg: "#FFFAF0",
      text: "#2C1810",
      navBg: "#B8860B",
      footerBg: "#2C1810",
    },
    purple: {
      primary: "#7C3AED",
      secondary: "#5B21B6",
      accent: "#FCD34D",
      bg: "#FAF5FF",
      text: "#3B0764",
      navBg: "#7C3AED",
      footerBg: "#3B0764",
    },
    pink: {
      primary: "#EC4899",
      secondary: "#BE185D",
      accent: "#FCD34D",
      bg: "#FDF2F8",
      text: "#831843",
      navBg: "#EC4899",
      footerBg: "#831843",
    },
    brown: {
      primary: "#78350F",
      secondary: "#5C2D0C",
      accent: "#FCD34D",
      bg: "#FFFBEB",
      text: "#451A03",
      navBg: "#78350F",
      footerBg: "#451A03",
    },
    teal: {
      primary: "#0D9488",
      secondary: "#0F766E",
      accent: "#FCD34D",
      bg: "#F0FDFA",
      text: "#134E4A",
      navBg: "#0D9488",
      footerBg: "#134E4A",
    },
  };

  const colorPatterns: Record<string, RegExp> = {
    red: /\bred\b|\bcrimson\b|\bcherry\b/i,
    green: /\bgreen\b/i,
    sage: /\bsage\b/i,
    emerald: /\bemerald\b|\bforest\b/i,
    blue: /\bblue\b/i,
    navy: /\bnavy\b/i,
    black: /\bblack\b|\bdark\b|\bonyx\b/i,
    white: /\bwhite\b|\blight\b|\bclean\b/i,
    orange: /\borange\b|\bcitrus\b|\bpumpkin\b/i,
    gold: /\bgold\b|\bgolden\b|\byellow\b/i,
    purple: /\bpurple\b|\bviolet\b|\broyal\b/i,
    pink: /\bpink\b|\bmagenta\b/i,
    brown: /\bbrown\b|\bchocolate\b|\bwood\b/i,
    teal: /\bteal\b|\bturquoise\b/i,
  };

  let detectedColorKey = "";
  for (const [color, pattern] of Object.entries(colorPatterns)) {
    if (pattern.test(prompt)) {
      detectedColorKey = color;
      break;
    }
  }

  // If we found a matching type, use that preset
  if (matchedType && THEME_PRESETS[matchedType]) {
    const presets = THEME_PRESETS[matchedType];
    let style = matchedStyle || Object.keys(presets)[0];
    if (!presets[style]) {
      style = Object.keys(presets)[0];
    }

    // Get a random variation or the selected style
    const availableStyles = Object.keys(presets);
    style = availableStyles.includes(style) ? style : availableStyles[0];

    const baseTheme = {
      ...presets[style],
      navLinks: DEFAULT_NAV_LINKS,
      ...(extractedName && { siteName: extractedName }),
    };

    // If user specified colors, override the preset colors
    if (detectedColorKey && colorPalettes[detectedColorKey]) {
      const palette = colorPalettes[detectedColorKey];
      return {
        ...baseTheme,
        primaryColor: palette.primary,
        secondaryColor: palette.secondary,
        accentColor: palette.accent,
        bgColor: palette.bg,
        textColor: palette.text,
        navBg: palette.navBg,
        navText: "#FFFFFF",
        footerBg: palette.footerBg,
        footerText: palette.bg,
      };
    }

    return baseTheme;
  }

  // Fallback: analyze prompt and generate a custom theme using detected colors
  const detectedPalette = detectedColorKey && colorPalettes[detectedColorKey]
    ? colorPalettes[detectedColorKey]
    : colorPalettes["green"];

  // Generate base theme
  const fallbackTheme = {
    siteName: extractedName || "Your Restaurant",
    tagline: "A unique dining experience",
    primaryColor: detectedPalette.primary,
    secondaryColor: detectedPalette.secondary,
    accentColor: detectedPalette.accent,
    bgColor: detectedPalette.bg,
    textColor: detectedPalette.text,
    navBg: detectedPalette.navBg,
    navText: "#FFFFFF",
    footerBg: detectedPalette.footerBg,
    footerText: detectedPalette.bg,
    fontDisplay: detectedColorKey === "black" || detectedColorKey === "white" ? "Syne" : "Playfair Display",
    fontBody: "Inter",
    heroHeadline: extractedName ? `Welcome to ${extractedName}` : "Crafted With Passion",
    heroSubline: "Experience dining like never before.",
    heroFoodKeyword: "default",
    ctaText: "Explore",
    address: "123 Main Street",
    phone: "+1 (555) 000-0000",
    hours: "Daily: 11am – 10pm",
    borderRadius: "12",
    navLinks: DEFAULT_NAV_LINKS,
  };

  return fallbackTheme;
}

// @ts-ignore: Deno is a global available in the Supabase Edge Runtime
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const theme = generateTheme(prompt);

    return new Response(JSON.stringify({ theme }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
