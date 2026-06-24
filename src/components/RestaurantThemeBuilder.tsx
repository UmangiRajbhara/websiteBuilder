import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Palette, Type, Link2, Sparkles, Upload, Monitor, Smartphone, ChevronLeft, ChevronRight, Check, Loader2, X, Plus } from "lucide-react";

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
  heroImageUrl: string;
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
  heroImageUrl: "",
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
  const heroImg = t.heroImageUrl || getHeroImage(t.heroFoodKeyword);

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
.hero-bg{
  position:absolute;inset:0;
  background:url('${heroImg}') center/cover no-repeat;
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
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
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
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const el = document.querySelector(a.getAttribute('href'));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
</script>
</body></html>`;
}

// Get Supabase URL from environment
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";

// UI Components
function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-1.5">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-7 h-7 border border-gray-200 rounded-md cursor-pointer p-0.5 bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-[72px] text-[11px] font-mono border border-gray-200 rounded px-1.5 py-0.5 text-gray-700 outline-none"
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
    <div className="mb-2.5">
      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={2}
          placeholder={placeholder}
          className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 font-inherit text-gray-700 outline-none resize-vertical mt-1"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 font-inherit text-gray-700 outline-none mt-1"
        />
      )}
    </div>
  );
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-4 py-2.5 bg-transparent border-none flex justify-between items-center cursor-pointer text-xs font-bold text-gray-700 uppercase tracking-wider"
      >
        {title}
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 pb-3.5">{children}</div>}
    </div>
  );
}

function StepPill({ num, label, active, done }: { num: number; label: string; active: boolean; done: boolean }) {
  const GREEN = "#00BA6A";
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-[22px] h-[22px] rounded-full text-[11px] font-bold flex items-center justify-center shrink-0"
        style={{
          background: done ? GREEN : active ? GREEN : "#e5e7eb",
          color: done || active ? "#fff" : "#9ca3af",
        }}
      >
        {done ? <Check size={12} /> : num}
      </div>
      <span
        className="text-xs"
        style={{ fontWeight: active ? 700 : 400, color: active ? GREEN : done ? "#6b7280" : "#9ca3af" }}
      >
        {label}
      </span>
    </div>
  );
}

const GREEN = "#00BA6A";

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

  const update = useCallback((key: keyof Theme, val: string | NavLink[]) => {
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
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update("heroImageUrl", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  // Theme generation via Edge Function (preset-based, no AI API needed)
  const generateFromPrompt = async () => {
    if (!promptText.trim()) return;
    setAiLoading(true);
    setAiError("");

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-theme`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        heroImageUrl: theme.heroImageUrl,
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

  // Inject HTML into iframe
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
    <div className="font-sans h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top bar */}
      <div className="h-13 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-20">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: GREEN }}>
            <span className="text-white text-sm font-extrabold">5</span>
          </div>
          <span className="font-extrabold text-sm text-gray-900">Sahl</span>
          <span className="text-gray-300">/</span>
          <span className="text-[13px] text-gray-500">Website Builder</span>
        </div>

        {/* Steps pipeline */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <StepPill num={s.num} label={s.label} active={currentStep === s.num} done={currentStep > s.num} />
              {i < steps.length - 1 && (
                <div className="w-7 h-px" style={{ background: currentStep > s.num ? GREEN : "#e5e7eb" }} />
              )}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`p-1 px-2.5 text-[13px] border-none cursor-pointer rounded-md ${previewMode === "desktop" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`p-1 px-2.5 text-[13px] border-none cursor-pointer rounded-md ${previewMode === "mobile" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
            >
              <Smartphone size={16} />
            </button>
          </div>

          {currentStep === 1 && (
            <button
              onClick={() => setCurrentStep(2)}
              className="text-white border-none rounded-lg py-1.5 px-4 text-[13px] font-bold cursor-pointer flex items-center gap-1"
              style={{ background: GREEN }}
            >
              Approve & Continue <ChevronRight size={14} />
            </button>
          )}
          {currentStep === 2 && (
            <div className="flex gap-1.5">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-transparent border border-gray-200 text-gray-700 rounded-lg py-1.5 px-3.5 text-[13px] cursor-pointer"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="text-white border-none rounded-lg py-1.5 px-4 text-[13px] font-bold cursor-pointer"
                style={{ background: GREEN }}
              >
                Install Menu <ChevronRight size={14} />
              </button>
            </div>
          )}
          {currentStep === 3 && (
            <div className="flex gap-1.5">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-transparent border border-gray-200 text-gray-700 rounded-lg py-1.5 px-3.5 text-[13px] cursor-pointer"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="text-white border-none rounded-lg py-1.5 px-4 text-[13px] font-bold cursor-pointer"
                style={{ background: GREEN }}
              >
                Setup Checkout <ChevronRight size={14} />
              </button>
            </div>
          )}
          {currentStep === 4 && (
            <div className="flex gap-1.5">
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-transparent border border-gray-200 text-gray-700 rounded-lg py-1.5 px-3.5 text-[13px] cursor-pointer"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <button className="bg-violet-600 text-white border-none rounded-lg py-1.5 px-4 text-[13px] font-bold cursor-pointer flex items-center gap-1">
                Launch Site
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Step info banners */}
      {currentStep === 2 && (
        <div className="bg-amber-50 border-b border-amber-200 py-2.5 px-5 flex items-center gap-3 shrink-0">
          <span className="text-lg">📦</span>
          <div>
            <span className="font-bold text-amber-800 text-[13px]">Step 2 - Install Menu NPM Package</span>
            <span className="ml-2.5 text-xs text-amber-700">
              Run <code className="bg-amber-100 px-1.5 py-px rounded">npm install @sahl/menu-widget</code> in your project
            </span>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="bg-blue-50 border-b border-blue-200 py-2.5 px-5 flex items-center gap-3 shrink-0">
          <span className="text-lg">💳</span>
          <div>
            <span className="font-bold text-blue-800 text-[13px]">Step 3 - Setup Checkout</span>
            <span className="ml-2.5 text-xs text-blue-600">
              Run <code className="bg-blue-100 px-1.5 py-px rounded">npm install @sahl/checkout-widget</code> and configure payment
            </span>
          </div>
        </div>
      )}
      {currentStep === 4 && (
        <div className="bg-violet-50 border-b border-violet-200 py-2.5 px-5 flex items-center gap-3 shrink-0">
          <span className="text-lg">🚀</span>
          <div>
            <span className="font-bold text-violet-800 text-[13px]">Step 4 - Launch to Client Domain</span>
            <span className="ml-2.5 text-xs text-violet-600">Enter the client's domain below and deploy.</span>
          </div>
          <div className="ml-auto flex gap-2 items-center">
            <input
              placeholder="client-domain.com"
              className="text-xs border border-violet-200 rounded-md px-2.5 py-1.5 outline-none text-gray-700"
            />
            <button className="bg-violet-600 text-white border-none rounded-md py-1.5 px-3.5 text-xs font-bold cursor-pointer">
              Deploy
            </button>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel (only shown in step 1) */}
        {currentStep === 1 && (
          <div className="w-[308px] min-w-[308px] bg-white border-r border-gray-200 flex flex-col overflow-hidden">
            {/* Theme Generator */}
            <div className="px-3.5 py-3 border-b border-gray-100 bg-gray-50 shrink-0">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-[18px] h-[18px] rounded flex items-center justify-center" style={{ background: GREEN }}>
                  <Sparkles size={10} className="text-white" />
                </div>
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">Quick Theme Generator</span>
              </div>
              <textarea
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generateFromPrompt(); }}
                placeholder="Try: pizza rustic, sushi elegant, burger modern, tacos authentic..."
                rows={3}
                className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 resize-none outline-none text-gray-700 leading-relaxed focus:border-emerald-400"
              />
              <button
                onClick={generateFromPrompt}
                disabled={aiLoading || !promptText.trim()}
                className="w-full mt-1.5 py-2 text-xs font-bold rounded-lg border-none text-white disabled:bg-emerald-100 cursor-pointer"
                style={{ background: promptText.trim() && !aiLoading ? GREEN : "#d1fae5" }}
              >
                {aiLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={14} className="animate-spin" /> Applying...
                  </span>
                ) : (
                  "Apply Preset"
                )}
              </button>
              {aiError && <p className="text-[11px] text-red-500 mt-1.5">{aiError}</p>}
            </div>

            {/* Tab nav */}
            <div className="flex border-b border-gray-200 shrink-0">
              {[
                ["design", <><Palette size={12} className="inline mr-1" /> Design</>],
                ["content", <><Type size={12} className="inline mr-1" /> Content</>],
                ["nav", <><Link2 size={12} className="inline mr-1" /> Nav</>],
              ].map(([id, label]) => (
                <button
                  key={id as string}
                  onClick={() => setActiveTab(id as "design" | "content" | "nav")}
                  className="flex-1 py-2 border-none bg-transparent text-[11px] cursor-pointer"
                  style={{
                    fontWeight: activeTab === id ? 700 : 400,
                    color: activeTab === id ? GREEN : "#6b7280",
                    borderBottom: activeTab === id ? `2px solid ${GREEN}` : "2px solid transparent",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === "design" && (
                <>
                  <Section title="Logo" defaultOpen={true}>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-13 h-13 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                        {theme.logoUrl ? (
                          <img src={theme.logoUrl} alt="logo" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-[22px]">🏪</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <button
                          onClick={() => logoInputRef.current?.click()}
                          className="w-full py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-700 font-semibold cursor-pointer mb-1 flex items-center justify-center gap-1"
                        >
                          <Upload size={12} /> {theme.logoUrl ? "Replace Logo" : "Upload Logo"}
                        </button>
                        {theme.logoUrl && (
                          <button
                            onClick={() => update("logoUrl", "")}
                            className="w-full py-1 bg-transparent border border-red-200 rounded-lg text-[11px] text-red-500 cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400">PNG or SVG recommended. Max 2MB.</p>
                    <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </Section>

                  <Section title="Brand Colors" defaultOpen={true}>
                    <ColorInput label="Primary" value={theme.primaryColor} onChange={v => update("primaryColor", v)} />
                    <ColorInput label="Secondary" value={theme.secondaryColor} onChange={v => update("secondaryColor", v)} />
                    <ColorInput label="Accent/CTA" value={theme.accentColor} onChange={v => update("accentColor", v)} />
                    <ColorInput label="Background" value={theme.bgColor} onChange={v => update("bgColor", v)} />
                    <ColorInput label="Text" value={theme.textColor} onChange={v => update("textColor", v)} />
                  </Section>

                  <Section title="Header / Nav" defaultOpen={false}>
                    <ColorInput label="Nav background" value={theme.navBg} onChange={v => update("navBg", v)} />
                    <ColorInput label="Nav text" value={theme.navText} onChange={v => update("navText", v)} />
                  </Section>

                  <Section title="Hero Banner Image" defaultOpen={false}>
                    <div className="mb-2.5">
                      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                        Upload custom image
                      </label>
                      <div
                        className="w-full h-20 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden cursor-pointer flex items-center justify-center"
                        style={{ background: theme.heroImageUrl ? "none" : "#f9fafb" }}
                        onClick={() => heroImageInputRef.current?.click()}
                      >
                        {theme.heroImageUrl ? (
                          <img src={theme.heroImageUrl} alt="hero" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-gray-400">Click to upload hero image</span>
                        )}
                      </div>
                      {theme.heroImageUrl && (
                        <button
                          onClick={() => update("heroImageUrl", "")}
                          className="mt-1 text-[11px] text-red-500 bg-transparent border border-red-200 rounded-md px-2.5 py-1 cursor-pointer"
                        >
                          Remove custom image
                        </button>
                      )}
                      <input ref={heroImageInputRef} type="file" accept="image/*" onChange={handleHeroImageUpload} className="hidden" />
                    </div>

                    {!theme.heroImageUrl && (
                      <div>
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                          Or pick food keyword
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {FOOD_KEYWORDS.map(kw => (
                            <button
                              key={kw}
                              onClick={() => update("heroFoodKeyword", kw)}
                              className="px-2.5 py-1 text-[11px] rounded-full cursor-pointer font-medium border"
                              style={{
                                background: theme.heroFoodKeyword === kw ? GREEN : "#f3f4f6",
                                color: theme.heroFoodKeyword === kw ? "#fff" : "#374151",
                                borderColor: theme.heroFoodKeyword === kw ? GREEN : "#e5e7eb",
                              }}
                            >
                              {kw}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </Section>

                  <Section title="Footer" defaultOpen={false}>
                    <ColorInput label="Footer background" value={theme.footerBg} onChange={v => update("footerBg", v)} />
                    <ColorInput label="Footer text" value={theme.footerText} onChange={v => update("footerText", v)} />
                  </Section>

                  <Section title="Typography" defaultOpen={false}>
                    <div className="mb-2.5">
                      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Display font</label>
                      <select
                        value={theme.fontDisplay}
                        onChange={e => update("fontDisplay", e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 mt-1 text-gray-700 outline-none"
                      >
                        {["Playfair Display", "Cormorant Garamond", "DM Serif Display", "Fraunces", "Libre Baskerville", "Josefin Sans", "Raleway", "Oswald", "Bebas Neue", "Syne"].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Body font</label>
                      <select
                        value={theme.fontBody}
                        onChange={e => update("fontBody", e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 mt-1 text-gray-700 outline-none"
                      >
                        {["Inter", "DM Sans", "Nunito", "Lato", "Poppins", "Source Sans 3", "Roboto", "Open Sans", "Manrope", "Plus Jakarta Sans"].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </Section>

                  <Section title="Roundness" defaultOpen={false}>
                    <div className="py-1">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-gray-700">Border radius</span>
                        <span className="text-xs font-bold" style={{ color: GREEN }}>{theme.borderRadius}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="24"
                        value={theme.borderRadius}
                        onChange={e => update("borderRadius", e.target.value)}
                        className="w-full"
                        style={{ accentColor: GREEN }}
                      />
                      <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                        <span>Sharp</span>
                        <span>Rounded</span>
                      </div>
                    </div>
                  </Section>
                </>
              )}

              {activeTab === "content" && (
                <div className="px-4 py-3">
                  <TextInput label="Restaurant name" value={theme.siteName} onChange={v => update("siteName", v)} />
                  <TextInput label="Tagline" value={theme.tagline} onChange={v => update("tagline", v)} />
                  <TextInput label="Hero headline" value={theme.heroHeadline} onChange={v => update("heroHeadline", v)} />
                  <TextInput label="Hero subline" value={theme.heroSubline} onChange={v => update("heroSubline", v)} multiline />
                  <TextInput label="CTA button text" value={theme.ctaText} onChange={v => update("ctaText", v)} />
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">Footer / Contact info</p>
                    <TextInput label="Address" value={theme.address} onChange={v => update("address", v)} />
                    <TextInput label="Phone" value={theme.phone} onChange={v => update("phone", v)} />
                    <TextInput label="Hours" value={theme.hours} onChange={v => update("hours", v)} />
                  </div>
                </div>
              )}

              {activeTab === "nav" && (
                <div className="px-4 py-3">
                  <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
                    Set the label and destination URL for each nav link. Use <code className="bg-gray-100 px-1 rounded">#section-id</code> for same-page anchors or a full URL for external pages.
                  </p>
                  {(theme.navLinks || []).map((link, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-2.5 mb-2 relative">
                      <button
                        onClick={() => removeNavLink(idx)}
                        className="absolute top-1.5 right-2 bg-transparent border-none text-gray-300 cursor-pointer"
                      >
                        <X size={15} />
                      </button>
                      <div className="mb-1.5">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Label</label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={e => updateNavLink(idx, "label", e.target.value)}
                          className="w-full text-xs border border-gray-200 rounded px-1.5 py-1 text-gray-700 outline-none mt-0.5"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Link / URL</label>
                        <input
                          type="text"
                          value={link.href}
                          onChange={e => updateNavLink(idx, "href", e.target.value)}
                          placeholder="#section or https://..."
                          className="w-full text-xs border border-gray-200 rounded px-1.5 py-1 font-mono text-gray-700 outline-none mt-0.5"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addNavLink}
                    className="w-full py-2 text-xs font-semibold bg-emerald-50 rounded-lg cursor-pointer flex items-center justify-center gap-1"
                    style={{ border: `1px dashed ${GREEN}`, color: GREEN }}
                  >
                    <Plus size={14} /> Add nav link
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right: live preview */}
        <div className="flex-1 bg-gray-200 flex flex-col overflow-hidden">
          {/* Preview toolbar */}
          <div className="bg-white border-b border-gray-200 px-3.5 h-10 flex items-center justify-between shrink-0">
            <div className="flex gap-1.5 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div className="ml-2 bg-gray-100 rounded-md px-3.5 py-0.5 text-[11px] text-gray-500">
                {theme.siteName?.toLowerCase().replace(/\s+/g, "-")}.sahl.app
              </div>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full px-2 py-0.5">
              {previewMode === "desktop" ? "Desktop" : "Mobile"} - Live preview
            </span>
          </div>

          {/* iframe wrapper */}
          <div
            className="flex-1 flex overflow-hidden p-3"
            style={{
              alignItems: previewMode === "mobile" ? "center" : "stretch",
              justifyContent: previewMode === "mobile" ? "center" : "stretch",
            }}
          >
            <div
              className="bg-white overflow-hidden shrink-0"
              style={{
                width: previewMode === "mobile" ? 375 : "100%",
                height: previewMode === "mobile" ? 700 : "100%",
                borderRadius: previewMode === "mobile" ? 28 : 8,
                boxShadow: previewMode === "mobile"
                  ? "0 24px 64px rgba(0,0,0,0.3), 0 0 0 10px #1f2937, 0 0 0 11px #374151"
                  : "0 2px 16px rgba(0,0,0,0.08)",
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
