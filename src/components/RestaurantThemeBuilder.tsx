/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Palette, Type, Link2, Sparkles, Upload, Monitor, Smartphone, ChevronLeft, ChevronRight, Check, Loader2, X, Plus, Wand2, Eye, Globe, Settings } from "lucide-react";
import SahlLogo from '../assets/logo-2.png';

// Types
interface NavLink {
  label: string;
  href: string;
}

interface Theme {
  siteName: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  navBg: string;
  navText: string;
  footerBg: string;
  footerText: string;
  fontDisplay: string;
  fontBody: string;
  heroHeadline: string;
  heroSubline: string;
  heroFoodKeyword: string;
  heroImages: string[];
  ctaText: string;
  address: string;
  phone: string;
  hours: string;
  borderRadius: string;
  navLinks: NavLink[];
}

// Food keyword to Unsplash hero image
const FOOD_IMAGES: Record<string, string> = {
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&q=80",
  sushi: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=1600&q=80",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80",
  tacos: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1600&q=80",
  pasta: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=1600&q=80",
  steak: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=1600&q=80",
  seafood: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=1600&q=80",
  indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&q=80",
  chinese: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1600&q=80",
  bbq: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1600&q=80",
  cafe: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80",
  default: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80",
};

const FOOD_KEYWORDS = ["pizza", "sushi", "burger", "tacos", "pasta", "steak", "seafood", "indian", "chinese", "bbq", "cafe"];

function getHeroImage(keyword: string): string {
  if (!keyword) return FOOD_IMAGES.default;
  const k = keyword.toLowerCase();
  return FOOD_IMAGES[k] || FOOD_IMAGES[Object.keys(FOOD_IMAGES).find(key => k.includes(key)) || "default"] || FOOD_IMAGES.default;
}

// Default theme
const DEFAULT_THEME: Theme = {
  siteName: "Napoli Nights",
  tagline: "Authentic wood-fired pizza since 2019",
  logoUrl: "",
  primaryColor: "#00BA6A",
  secondaryColor: "#007a45",
  accentColor: "#ff6b35",
  bgColor: "#ffffff",
  textColor: "#1a1a2e",
  navBg: "#00BA6A",
  navText: "#ffffff",
  footerBg: "#1a1a2e",
  footerText: "#ffffff",
  fontDisplay: "Playfair Display",
  fontBody: "Inter",
  heroHeadline: "Pizza Made With Passion",
  heroSubline: "Every slice tells a story — from Naples to your table.",
  heroFoodKeyword: "pizza",
  heroImages: [],
  ctaText: "Order Now",
  address: "12 Olive Street, Downtown",
  phone: "+1 (555) 123-4567",
  hours: "Mon–Sun: 11am – 11pm",
  borderRadius: "12",
  navLinks: [
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

// Build preview HTML
function buildHTML(t: Theme): string {
  const gf = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(t.fontDisplay)}:wght@400;700;900&family=${encodeURIComponent(t.fontBody)}:wght@300;400;600&display=swap`;
  const r = t.borderRadius || "12";
  const heroImages = t.heroImages && t.heroImages.length > 0 ? t.heroImages : [getHeroImage(t.heroFoodKeyword)];

  const navLinksHTML = (t.navLinks || []).map(l =>
    `<a href="${l.href || "#"}">${l.label}</a>`
  ).join("");

  const logoHTML = t.logoUrl
    ? `<img src="${t.logoUrl}" alt="${t.siteName}" style="height:38px;object-fit:contain;border-radius:4px"/>`
    : `<span class="logo-text">${t.siteName}</span>`;

  return `<!DOCTYPE html><html><head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<link href="${gf}" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --p:${t.primaryColor};
  --s:${t.secondaryColor||t.primaryColor};
  --a:${t.accentColor};
  --bg:${t.bgColor};
  --tx:${t.textColor};
  --nb:${t.navBg};
  --nt:${t.navText};
  --fb:${t.footerBg};
  --ft:${t.footerText};
  --fd:'${t.fontDisplay}',serif;
  --fb2:'${t.fontBody}',sans-serif;
  --r:${r}px;
}
body{font-family:var(--fb2);background:var(--bg);color:var(--tx);line-height:1.6}
a{text-decoration:none;color:inherit}

nav{
  background:var(--nb);padding:0 40px;height:64px;
  display:flex;align-items:center;justify-content:space-between;
  position:sticky;top:0;z-index:50;
  box-shadow:0 2px 12px rgba(0,0,0,0.14);
}
.logo-wrap{display:flex;align-items:center;gap:10px}
.logo-text{font-family:var(--fd);font-size:21px;font-weight:900;color:var(--nt);letter-spacing:-0.02em}
.nav-links{display:flex;gap:28px}
.nav-links a{
  color:var(--nt);opacity:0.82;font-size:13px;font-weight:500;
  letter-spacing:0.05em;text-transform:uppercase;transition:opacity .15s;
}
.nav-links a:hover{opacity:1}
.nav-btn{
  background:var(--a);color:#fff;border:none;padding:9px 22px;
  border-radius:calc(var(--r)*3);font-size:13px;font-weight:700;
  cursor:pointer;font-family:var(--fb2);letter-spacing:0.03em;
}

.hero{
  min-height:88vh;position:relative;
  display:flex;align-items:center;justify-content:center;text-align:center;
  overflow:hidden;
}
.hero-slider {
  position:absolute;inset:0;
  overflow:hidden;
  background:#000;
}
.hero-slide {
  position:absolute;inset:0;
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
  opacity:0;
  transform:scale(1.05);
  transition:opacity 1.5s ease-in-out, transform 6s linear;
  z-index:0;
}
.hero-slide.active {
  opacity:1;
  transform:scale(1);
}
.hero-dots {
  position:absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}
.hero-dot {
  width: 32px;
  height: 4px;
  border-radius: 2px;
  border: none;
  background: rgba(255,255,255,0.3);
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}
.hero-dot.active {
  background: #fff;
  width: 48px;
}
.hero-overlay{
  position:absolute;inset:0;
  background:linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.65) 100%);
}
.hero-content{position:relative;z-index:2;padding:0 24px;max-width:780px}
.hero-eyebrow{
  display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.2em;
  text-transform:uppercase;color:var(--a);margin-bottom:20px;
  background:rgba(255,255,255,0.1);backdrop-filter:blur(6px);
  padding:5px 16px;border-radius:calc(var(--r)*2);border:1px solid rgba(255,255,255,0.2);
}
.hero h1{
  font-family:var(--fd);font-size:clamp(38px,7vw,86px);
  font-weight:900;color:#fff;letter-spacing:-0.03em;
  margin-bottom:18px;line-height:1.0;
}
.hero-sub{
  font-size:clamp(14px,2vw,19px);color:rgba(255,255,255,0.82);
  max-width:480px;margin:0 auto 36px;font-weight:300;line-height:1.65;
}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-primary{
  background:var(--a);color:#fff;padding:14px 34px;
  border-radius:calc(var(--r)*3);border:none;
  font-size:15px;font-weight:700;cursor:pointer;font-family:var(--fb2);
  box-shadow:0 4px 20px rgba(0,0,0,0.25);transition:transform .2s,opacity .2s;
}
.btn-primary:hover{transform:translateY(-2px);opacity:0.92}
.btn-outline{
  background:rgba(255,255,255,0.1);backdrop-filter:blur(6px);color:#fff;
  padding:14px 34px;border-radius:calc(var(--r)*3);
  border:2px solid rgba(255,255,255,0.55);font-size:15px;font-weight:600;
  cursor:pointer;font-family:var(--fb2);transition:border-color .2s;
}
.btn-outline:hover{border-color:#fff}
.hero-scroll{
  position:absolute;bottom:28px;left:50%;transform:translateX(-50%);
  color:rgba(255,255,255,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;
}

.menu-slot{background:var(--bg);padding:80px 40px}
.menu-slot-inner{
  max-width:860px;margin:0 auto;
  border:2px dashed ${t.primaryColor}55;
  border-radius:var(--r);padding:60px 32px;text-align:center;
}
.slot-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:${t.primaryColor}18;border:1px solid ${t.primaryColor}44;
  color:var(--p);font-size:12px;font-weight:700;
  padding:6px 16px;border-radius:calc(var(--r)*2);margin-bottom:20px;
  letter-spacing:0.05em;text-transform:uppercase;
}
.menu-slot h2{
  font-family:var(--fd);font-size:clamp(22px,3.5vw,36px);
  font-weight:900;color:var(--tx);margin-bottom:12px;letter-spacing:-0.02em;
}
.menu-slot p{font-size:14px;color:${t.textColor}88;line-height:1.7;max-width:480px;margin:0 auto 28px}
.npm-block{
  display:inline-block;background:#1e293b;color:#a5f3c0;
  font-family:monospace;font-size:13px;padding:10px 20px;
  border-radius:calc(var(--r)/2);letter-spacing:0.04em;margin-bottom:24px;
}
.slot-features{
  display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin-top:8px;
}
.slot-feat{
  display:flex;align-items:center;gap:6px;
  font-size:12px;color:${t.textColor}66;font-weight:500;
}

footer{background:var(--fb);padding:52px 40px 28px}
.footer-grid{
  display:grid;grid-template-columns:2fr 1fr 1fr;
  gap:40px;max-width:1000px;margin:0 auto 36px;
}
.footer-brand .flogo-wrap{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.footer-brand .flogo-text{
  font-family:var(--fd);font-size:20px;font-weight:900;color:var(--ft);
}
.footer-brand p{font-size:13px;color:${t.footerText}77;line-height:1.7;font-weight:300}
footer h4{
  font-size:11px;font-weight:700;letter-spacing:0.12em;
  text-transform:uppercase;color:var(--ft);margin-bottom:12px;
}
footer p, footer a{
  font-size:13px;color:${t.footerText}66;display:block;line-height:1.95;
}
footer a:hover{color:var(--ft)}
.footer-bottom{
  border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;
  text-align:center;font-size:11px;color:${t.footerText}33;
  max-width:1000px;margin:0 auto;
}
@media(max-width:700px){
  nav{padding:0 20px}
  .nav-links{display:none}
  .hero{min-height:100vw}
  .menu-slot{padding:60px 20px}
  .footer-grid{grid-template-columns:1fr}
}
</style>
</head>
<body>

<nav id="top">
  <div class="logo-wrap">${logoHTML}</div>
  <div class="nav-links">${navLinksHTML}</div>
  <button class="nav-btn">${t.ctaText || "Order Now"}</button>
</nav>

<section class="hero" id="home">
  <div class="hero-slider">
    ${heroImages.map((img, i) => `<div class="hero-slide ${i === 0 ? 'active' : ''}" style="background-image: url('${img}')"></div>`).join('')}
  </div>
  <div class="hero-overlay"></div>
  ${heroImages.length > 1 ? `
  <div class="hero-dots">
    ${heroImages.map((_, i) => `<button class="hero-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`).join('')}
  </div>
  ` : ''}
  <div class="hero-content">
    <div class="hero-eyebrow">${t.siteName}</div>
    <h1>${t.heroHeadline}</h1>
    <p class="hero-sub">${t.heroSubline}</p>
    <div class="hero-btns">
      <button class="btn-primary">${t.ctaText || "Order Now"}</button>
      <button class="btn-outline">View Menu</button>
    </div>
  </div>
  <div class="hero-scroll">scroll</div>
</section>

<section class="menu-slot" id="menu">
  <div class="menu-slot-inner">
    <div class="slot-badge">Step 2 - Menu Integration</div>
    <h2>Menu will appear here</h2>
    <p>Your restaurant menu component will be installed and rendered in this section during Step 2 of the setup.</p>
    <div class="npm-block">npm install @sahl/menu-widget</div>
    <div class="slot-features">
      <span class="slot-feat">Categories & items</span>
      <span class="slot-feat">Add to cart</span>
      <span class="slot-feat">Theme-aware</span>
      <span class="slot-feat">Mobile ready</span>
    </div>
  </div>
</section>

<footer id="contact">
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="flogo-wrap">
        ${t.logoUrl
          ? `<img src="${t.logoUrl}" alt="${t.siteName}" style="height:32px;object-fit:contain;border-radius:3px"/>`
          : `<span class="flogo-text">${t.siteName}</span>`}
      </div>
      <p>${t.tagline}</p>
    </div>
    <div id="about">
      <h4>Visit Us</h4>
      <p>${t.address || "123 Main Street"}</p>
      <p>${t.phone || "+1 (555) 000-0000"}</p>
    </div>
    <div>
      <h4>Hours</h4>
      <p>${t.hours || "Mon–Sun: 11am–10pm"}</p>
    </div>
  </div>
  <div class="footer-bottom">© 2025 ${t.siteName}. All rights reserved. Powered by Sahl.</div>
</footer>

<script>
  (() => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (slides.length > 1) {
      let currentSlide = 0;
      let timer;

      const goToSlide = (idx) => {
        slides[currentSlide].classList.remove('active');
        if(dots[currentSlide]) dots[currentSlide].classList.remove('active');
        currentSlide = idx;
        slides[currentSlide].classList.add('active');
        if(dots[currentSlide]) dots[currentSlide].classList.add('active');
      };

      const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);

      timer = setInterval(nextSlide, 4000);

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          clearInterval(timer);
          goToSlide(idx);
          timer = setInterval(nextSlide, 4000);
        });
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const el = document.querySelector(a.getAttribute('href'));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    });
  })();
</script>
</body></html>`;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";

// Premium Design Tokens
const design = {
  colors: {
    primary: "#0EA5A0",
    primaryLight: "#5EEAD4",
    primaryDark: "#0D9488",
    accent: "#F59E0B",
    bg: {
      primary: "#F8FAFC",
      secondary: "#FFFFFF",
      tertiary: "#F1F5F9",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
      muted: "#94A3B8",
    },
    border: "#E2E8F0",
    success: "#10B981",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
    glow: "0 0 20px rgba(14, 165, 160, 0.25)",
  },
};

// UI Components
function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between py-2 group">
      <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-800 transition-colors duration-200">{label}</span>
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-slate-200 hover:border-teal-400 transition-all duration-200" style={{ backgroundColor: value }}>
          <input
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-[76px] text-[12px] font-mono border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
        />
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, multiline, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={2}
          placeholder={placeholder}
          className="w-full text-[13px] border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 outline-none resize-none transition-all duration-200 focus:border-teal-500 focus:ring-3 focus:ring-teal-500/10 placeholder:text-slate-300"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-[13px] border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 outline-none transition-all duration-200 focus:border-teal-500 focus:ring-3 focus:ring-teal-500/10 placeholder:text-slate-300"
        />
      )}
    </div>
  );
}

function Section({ title, children, defaultOpen = false, icon }: { title: string; children: React.ReactNode; defaultOpen?: boolean; icon?: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100/80 last:border-b-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-5 py-3.5 bg-transparent border-none flex justify-between items-center cursor-pointer group"
      >
        <span className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-600 uppercase tracking-wider group-hover:text-slate-800 transition-colors duration-200">
          {icon && <span className="text-slate-400 group-hover:text-teal-500 transition-colors duration-200">{icon}</span>}
          {title}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

function StepPill({ num, label, active, done }: { num: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 transition-all duration-300"
        style={{
          background: done ? design.colors.success : active ? `linear-gradient(135deg, ${design.colors.primaryLight}, ${design.colors.primary})` : design.colors.bg.tertiary,
          color: done || active ? "#fff" : design.colors.text.muted,
          boxShadow: active ? design.shadows.glow : "none",
        }}
      >
        {done ? <Check size={12} strokeWidth={3} /> : num}
      </div>
      <span
        className="text-[12px] font-medium transition-colors duration-200"
        style={{ color: active ? design.colors.primary : done ? design.colors.text.secondary : design.colors.text.muted }}
      >
        {label}
      </span>
    </div>
  );
}

function StepConnector({ active }: { active: boolean }) {
  return (
    <div className="w-8 h-0.5 rounded-full transition-all duration-300" style={{ background: active ? design.colors.success : design.colors.border }} />
  );
}

export default function RestaurantThemeBuilder() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [promptText, setPromptText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [activeTab, setActiveTab] = useState<"design" | "content" | "nav">("design");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [currentStep, setCurrentStep] = useState(1);
  const [htmlString, setHtmlString] = useState(() => buildHTML(DEFAULT_THEME));
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);

  const update = useCallback((key: keyof Theme, val: any) => {
    setTheme(prev => {
      const next = { ...prev, [key]: val };
      setHtmlString(buildHTML(next));
      return next;
    });
  }, []);

  const updateNavLink = useCallback((idx: number, field: keyof NavLink, val: string) => {
    setTheme(prev => {
      const links = prev.navLinks.map((l, i) => i === idx ? { ...l, [field]: val } : l);
      const next = { ...prev, navLinks: links };
      setHtmlString(buildHTML(next));
      return next;
    });
  }, []);

  const addNavLink = () => {
    setTheme(prev => {
      const links = [...prev.navLinks, { label: "New Link", href: "#" }];
      const next = { ...prev, navLinks: links };
      setHtmlString(buildHTML(next));
      return next;
    });
  };

  const removeNavLink = (idx: number) => {
    setTheme(prev => {
      const links = prev.navLinks.filter((_, i) => i !== idx);
      const next = { ...prev, navLinks: links };
      setHtmlString(buildHTML(next));
      return next;
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update("logoUrl", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = [...theme.heroImages];
    let loadedCount = 0;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          newImages.push(ev.target.result as string);
        }
        loadedCount++;
        if (loadedCount === files.length) {
          update("heroImages", newImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const generateFromPrompt = async () => {
    if (!promptText.trim()) return;
    setAiLoading(true);
    setAiError("");

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-theme`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ prompt: promptText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Theme generation failed");
      }

      const parsed = data.theme;
      const merged: Theme = {
        ...parsed,
        logoUrl: theme.logoUrl,
        heroImages: theme.heroImages,
        navLinks: parsed.navLinks || DEFAULT_THEME.navLinks,
      };
      setTheme(merged);
      setHtmlString(buildHTML(merged));
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(htmlString);
    doc.close();
  }, [htmlString]);

  const steps = [
    { num: 1, label: "Design Theme" },
    { num: 2, label: "Install Menu" },
    { num: 3, label: "Checkout" },
    { num: 4, label: "Launch" },
  ];

  return (
    <div className="font-sans h-screen flex flex-col overflow-hidden" style={{ background: design.colors.bg.primary }}>
      {/* Header */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0 z-20" style={{ borderColor: design.colors.border, boxShadow: design.shadows.sm }}>
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={SahlLogo} height={52} width={52} />
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-slate-900 tracking-tight">Website Builder</span>
              <span className="text-[10px] text-slate-400 font-medium">Restaurant Theme Studio</span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-1">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <StepPill num={s.num} label={s.label} active={currentStep === s.num} done={currentStep > s.num} />
              {i < steps.length - 1 && <StepConnector active={currentStep > s.num} />}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`flex items-center gap-2 px-3.5 py-2 text-[12px] font-medium rounded-lg transition-all duration-200 ${
                previewMode === "desktop" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Monitor size={15} />
              Desktop
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`flex items-center gap-2 px-3.5 py-2 text-[12px] font-medium rounded-lg transition-all duration-200 ${
                previewMode === "mobile" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Smartphone size={15} />
              Mobile
            </button>
          </div>

          {currentStep === 1 && (
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
              style={{ background: `linear-gradient(135deg, ${design.colors.primaryLight}, ${design.colors.primary})` }}
            >
              Approve & Continue
              <ChevronRight size={16} />
            </button>
          )}
          {currentStep === 2 && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium border rounded-xl transition-all duration-200 text-slate-600 hover:bg-slate-50"
                style={{ borderColor: design.colors.border }}
              >
                <ChevronLeft size={14} />
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${design.colors.primaryLight}, ${design.colors.primary})` }}
              >
                Install Menu
                <ChevronRight size={16} />
              </button>
            </div>
          )}
          {currentStep === 3 && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium border rounded-xl transition-all duration-200 text-slate-600 hover:bg-slate-50"
                style={{ borderColor: design.colors.border }}
              >
                <ChevronLeft size={14} />
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${design.colors.primaryLight}, ${design.colors.primary})` }}
              >
                Setup Checkout
                <ChevronRight size={16} />
              </button>
            </div>
          )}
          {currentStep === 4 && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium border rounded-xl transition-all duration-200 text-slate-600 hover:bg-slate-50"
                style={{ borderColor: design.colors.border }}
              >
                <ChevronLeft size={14} />
                Back
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98] bg-gradient-to-r from-violet-500 to-purple-600">
                <Globe size={16} />
                Launch Site
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Step Banners */}
      {currentStep === 2 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b py-3.5 px-6 flex items-center gap-4 shrink-0" style={{ borderColor: "#FEF3C7" }}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
            <span className="text-xl">📦</span>
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-amber-900">Step 2 - Install Menu NPM Package</div>
            <div className="text-[12px] text-amber-700 mt-0.5">
              Run <code className="bg-amber-100/80 px-2 py-0.5 rounded text-amber-800 font-mono text-[11px]">npm install @sahl/menu-widget</code> in your project
            </div>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 border-b py-3.5 px-6 flex items-center gap-4 shrink-0" style={{ borderColor: "#DBEAFE" }}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-400 to-sky-500 flex items-center justify-center shadow-md">
            <span className="text-xl">💳</span>
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-blue-900">Step 3 - Setup Checkout</div>
            <div className="text-[12px] text-blue-700 mt-0.5">
              Run <code className="bg-blue-100/80 px-2 py-0.5 rounded text-blue-800 font-mono text-[11px]">npm install @sahl/checkout-widget</code> and configure payment
            </div>
          </div>
        </div>
      )}
      {currentStep === 4 && (
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-b py-3.5 px-6 flex items-center gap-4 shrink-0" style={{ borderColor: "#EDE9FE" }}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md">
            <span className="text-xl">🚀</span>
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-violet-900">Step 4 - Launch to Client Domain</div>
            <div className="text-[12px] text-violet-700 mt-0.5">Enter the client's domain below and deploy.</div>
          </div>
          <div className="flex gap-2.5 items-center">
            <input
              placeholder="client-domain.com"
              className="text-[13px] border rounded-xl px-4 py-2.5 outline-none w-60 transition-all duration-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
              style={{ borderColor: "#DDD6FE" }}
            />
            <button className="px-5 py-2.5 text-[12px] font-semibold text-white rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 shadow-md hover:shadow-lg transition-all duration-200">
              Deploy
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        {currentStep === 1 && (
          <div className="w-[350px] min-w-[350px] bg-white border-r flex flex-col overflow-hidden" style={{ borderColor: design.colors.border }}>
            {/* Theme Generator */}
            <div className="px-5 py-3 border-b shrink-0" style={{ borderColor: design.colors.border, background: `linear-gradient(180deg, ${design.colors.bg.secondary} 0%, ${design.colors.bg.tertiary} 100%)` }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-xl" style={{ background: `linear-gradient(135deg, ${design.colors.primaryLight}, ${design.colors.primary})`, boxShadow: design.shadows.glow }}>
                  <Wand2 size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-slate-800">Quick Theme Generator</div>
                  <div className="text-[10px] text-slate-400">Describe your restaurant style</div>
                </div>
              </div>
              <textarea
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generateFromPrompt(); }}
                placeholder="Try: pizza rustic, sushi elegant, burger modern, vadapav minimal..."
                rows={2}
                className="w-full text-[13px] border rounded-xl px-3 py-2 resize-none outline-none transition-all duration-200 focus:border-teal-500 focus:ring-3 focus:ring-teal-500/10 placeholder:text-slate-400"
                style={{ borderColor: design.colors.border }}
              />
              <button
                onClick={generateFromPrompt}
                disabled={aiLoading || !promptText.trim()}
                className="w-full mt-2.5 py-2 text-[12px] font-semibold rounded-xl border-none transition-all duration-200 disabled:cursor-not-allowed"
                style={{
                  background: promptText.trim() && !aiLoading
                    ? `linear-gradient(135deg, ${design.colors.primaryLight}, ${design.colors.primary})`
                    : design.colors.bg.tertiary,
                  color: promptText.trim() && !aiLoading ? "#fff" : design.colors.text.muted,
                  boxShadow: promptText.trim() && !aiLoading ? design.shadows.glow : "none",
                }}
              >
                {aiLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Applying Theme...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles size={16} />
                    Apply Preset
                  </span>
                )}
              </button>
              {aiError && (
                <div className="mt-3 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-[12px] text-red-600">
                  {aiError}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-b shrink-0" style={{ borderColor: design.colors.border }}>
              {[
                { id: "design", label: "Design", icon: <Palette size={14} /> },
                { id: "content", label: "Content", icon: <Type size={14} /> },
                { id: "nav", label: "Nav", icon: <Link2 size={14} /> },
              ].map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as "design" | "content" | "nav")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border-none bg-transparent text-[12px] font-medium transition-all duration-200"
                  style={{
                    color: activeTab === id ? design.colors.primary : design.colors.text.muted,
                    borderBottom: activeTab === id ? `2px solid ${design.colors.primary}` : "2px solid transparent",
                  }}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === "design" && (
                <div>
                  <Section title="Logo" defaultOpen={true} icon={<Upload size={12} />}>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden shrink-0 transition-all duration-200 hover:border-teal-500"
                        style={{ borderColor: design.colors.border, background: theme.logoUrl ? "transparent" : design.colors.bg.tertiary }}
                      >
                        {theme.logoUrl ? (
                          <img src={theme.logoUrl} alt="logo" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-2xl">🏪</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <button
                          onClick={() => logoInputRef.current?.click()}
                          className="w-full py-2.5 border rounded-xl text-[12px] font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-teal-300"
                          style={{ borderColor: design.colors.border, color: design.colors.text.secondary }}
                        >
                          <Upload size={14} />
                          {theme.logoUrl ? "Replace Logo" : "Upload Logo"}
                        </button>
                        {theme.logoUrl && (
                          <button
                            onClick={() => update("logoUrl", "")}
                            className="w-full mt-2 py-2 border border-red-200 rounded-xl text-[12px] text-red-500 font-medium transition-all duration-200 hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-3">PNG or SVG recommended. Max 2MB.</p>
                    <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </Section>

                  <Section title="Brand Colors" defaultOpen={true} icon={<Palette size={12} />}>
                    <div className="space-y-1">
                      <ColorInput label="Primary" value={theme.primaryColor} onChange={v => update("primaryColor", v)} />
                      <ColorInput label="Secondary" value={theme.secondaryColor} onChange={v => update("secondaryColor", v)} />
                      <ColorInput label="Accent / CTA" value={theme.accentColor} onChange={v => update("accentColor", v)} />
                      <ColorInput label="Background" value={theme.bgColor} onChange={v => update("bgColor", v)} />
                      <ColorInput label="Text" value={theme.textColor} onChange={v => update("textColor", v)} />
                    </div>
                  </Section>

                  <Section title="Header & Navigation" defaultOpen={false} icon={<Settings size={12} />}>
                    <ColorInput label="Nav background" value={theme.navBg} onChange={v => update("navBg", v)} />
                    <ColorInput label="Nav text" value={theme.navText} onChange={v => update("navText", v)} />
                  </Section>

                  <Section title="Hero Images" defaultOpen={false} icon={<Eye size={12} />}>
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Upload custom image(s)
                    </label>
                    <div
                      className="w-full h-28 rounded-xl border-2 border-dashed overflow-hidden cursor-pointer flex items-center justify-center relative transition-all duration-200 hover:border-teal-500"
                      style={{ borderColor: design.colors.border, background: theme.heroImages.length > 0 ? "transparent" : design.colors.bg.tertiary }}
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('.remove-btn')) return;
                        heroImageInputRef.current?.click();
                      }}
                    >
                      {theme.heroImages.length > 0 ? (
                        <div className="flex w-full h-full overflow-x-auto gap-2 p-2">
                          {theme.heroImages.map((img, idx) => (
                            <div key={idx} className="relative h-full w-28 shrink-0">
                              <img src={img} alt="hero" className="w-full h-full object-cover rounded-lg" />
                              <button
                                className="remove-btn absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors duration-200"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  update("heroImages", theme.heroImages.filter((_, i) => i !== idx));
                                }}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload size={28} className="mx-auto mb-2 text-slate-300" />
                          <span className="text-[12px] text-slate-400">Click to upload hero image(s)</span>
                        </div>
                      )}
                    </div>
                    <input ref={heroImageInputRef} type="file" accept="image/*" multiple onChange={handleHeroImageUpload} className="hidden" />

                    {theme.heroImages.length === 0 && (
                      <div className="mt-4">
                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
                          Or pick food keyword
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {FOOD_KEYWORDS.map(kw => (
                            <button
                              key={kw}
                              onClick={() => update("heroFoodKeyword", kw)}
                              className="px-3.5 py-1.5 text-[11px] rounded-full font-medium capitalize transition-all duration-200"
                              style={{
                                background: theme.heroFoodKeyword === kw ? design.colors.primary : design.colors.bg.tertiary,
                                color: theme.heroFoodKeyword === kw ? "#fff" : design.colors.text.secondary,
                                boxShadow: theme.heroFoodKeyword === kw ? design.shadows.glow : "none",
                              }}
                            >
                              {kw}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </Section>

                  <Section title="Footer" defaultOpen={false} icon={<Settings size={12} />}>
                    <ColorInput label="Footer background" value={theme.footerBg} onChange={v => update("footerBg", v)} />
                    <ColorInput label="Footer text" value={theme.footerText} onChange={v => update("footerText", v)} />
                  </Section>

                  <Section title="Typography" defaultOpen={false} icon={<Type size={12} />}>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Display font</label>
                        <select
                          value={theme.fontDisplay}
                          onChange={e => update("fontDisplay", e.target.value)}
                          className="w-full text-[13px] border rounded-xl px-3.5 py-2.5 mt-1.5 outline-none transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                          style={{ borderColor: design.colors.border, color: design.colors.text.primary }}
                        >
                          {["Playfair Display", "Cormorant Garamond", "DM Serif Display", "Fraunces", "Libre Baskerville", "Josefin Sans", "Raleway", "Oswald", "Bebas Neue", "Syne"].map(f => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Body font</label>
                        <select
                          value={theme.fontBody}
                          onChange={e => update("fontBody", e.target.value)}
                          className="w-full text-[13px] border rounded-xl px-3.5 py-2.5 mt-1.5 outline-none transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                          style={{ borderColor: design.colors.border, color: design.colors.text.primary }}
                        >
                          {["Inter", "DM Sans", "Nunito", "Lato", "Poppins", "Source Sans 3", "Roboto", "Open Sans", "Manrope", "Plus Jakarta Sans"].map(f => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </Section>

                  <Section title="Roundness" defaultOpen={false} icon={<Settings size={12} />}>
                    <div className="py-2">
                      <div className="flex justify-between mb-2.5">
                        <span className="text-[13px] text-slate-600">Border radius</span>
                        <span className="text-[13px] font-bold" style={{ color: design.colors.primary }}>{theme.borderRadius}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="24"
                        value={theme.borderRadius}
                        onChange={e => update("borderRadius", e.target.value)}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{ accentColor: design.colors.primary }}
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                        <span>Sharp</span>
                        <span>Rounded</span>
                      </div>
                    </div>
                  </Section>
                </div>
              )}

              {activeTab === "content" && (
                <div className="px-5 py-5 space-y-4">
                  <TextInput label="Restaurant name" value={theme.siteName} onChange={v => update("siteName", v)} />
                  <TextInput label="Tagline" value={theme.tagline} onChange={v => update("tagline", v)} />
                  <TextInput label="Hero headline" value={theme.heroHeadline} onChange={v => update("heroHeadline", v)} />
                  <TextInput label="Hero subline" value={theme.heroSubline} onChange={v => update("heroSubline", v)} multiline />
                  <TextInput label="CTA button text" value={theme.ctaText} onChange={v => update("ctaText", v)} />
                  <div className="pt-5 mt-5 border-t" style={{ borderColor: design.colors.border }}>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-4">Footer / Contact Info</div>
                    <div className="space-y-4">
                      <TextInput label="Address" value={theme.address} onChange={v => update("address", v)} />
                      <TextInput label="Phone" value={theme.phone} onChange={v => update("phone", v)} />
                      <TextInput label="Hours" value={theme.hours} onChange={v => update("hours", v)} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "nav" && (
                <div className="px-5 py-5">
                  <p className="text-[12px] text-slate-400 mb-4 leading-relaxed">
                    Set the label and destination URL for each nav link. Use <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 text-[11px]">#section-id</code> for same-page anchors.
                  </p>
                  {(theme.navLinks || []).map((link, idx) => (
                    <div key={idx} className="bg-slate-50 border rounded-xl px-4 py-4 mb-3 relative transition-all duration-200 hover:bg-slate-100" style={{ borderColor: design.colors.border }}>
                      <button
                        onClick={() => removeNavLink(idx)}
                        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <X size={16} />
                      </button>
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Label</label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={e => updateNavLink(idx, "label", e.target.value)}
                            className="w-full text-[13px] border rounded-xl px-3 py-2 mt-1 outline-none transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                            style={{ borderColor: design.colors.border, color: design.colors.text.primary }}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Link / URL</label>
                          <input
                            type="text"
                            value={link.href}
                            onChange={e => updateNavLink(idx, "href", e.target.value)}
                            placeholder="#section or https://..."
                            className="w-full text-[12px] font-mono border rounded-xl px-3 py-2 mt-1 outline-none transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                            style={{ borderColor: design.colors.border, color: design.colors.text.primary }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addNavLink}
                    className="w-full py-3 text-[12px] font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md"
                    style={{
                      border: `2px dashed ${design.colors.primary}`,
                      color: design.colors.primary,
                      background: design.colors.bg.tertiary,
                    }}
                  >
                    <Plus size={16} />
                    Add nav link
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preview */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: design.colors.bg.tertiary }}>
          {/* Toolbar */}
          <div className="bg-white border-b px-5 h-12 flex items-center justify-between shrink-0" style={{ borderColor: design.colors.border }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="ml-2 bg-slate-100 rounded-lg px-4 py-1.5 text-[11px] text-slate-500 font-mono">
                {theme.siteName?.toLowerCase().replace(/\s+/g, "-")}.sahl.app
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold px-3 py-1.5 rounded-full" style={{ color: design.colors.primary, background: "rgba(14, 165, 160, 0.1)" }}>
                {previewMode === "desktop" ? "Desktop" : "Mobile"} Preview
              </span>
              <Eye size={16} className="text-slate-400" />
            </div>
          </div>

          {/* Iframe */}
          <div
            className="flex-1 flex overflow-hidden p-5"
            style={{
              alignItems: previewMode === "mobile" ? "center" : "stretch",
              justifyContent: previewMode === "mobile" ? "center" : "stretch",
            }}
          >
            <div
              className="bg-white overflow-hidden shrink-0 transition-all duration-300"
              style={{
                width: previewMode === "mobile" ? 375 : "100%",
                height: previewMode === "mobile" ? 700 : "100%",
                borderRadius: previewMode === "mobile" ? 36 : 16,
                boxShadow: previewMode === "mobile"
                  ? "0 40px 80px rgba(0,0,0,0.25), 0 0 0 14px #1e293b, 0 0 0 16px #334155"
                  : design.shadows.lg,
              }}
            >
              <iframe
                ref={iframeRef}
                sandbox="allow-same-origin allow-scripts"
                title="Live website preview"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
