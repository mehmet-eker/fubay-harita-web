import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Phone, Mail, MapPin, ArrowRight, ArrowLeft, ChevronDown, Menu, X,
  Plane, Mountain, Ruler, Layers,
  Award, Clock, Users, ShieldCheck, Star, Navigation, Instagram, Globe,
} from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fubay Harita Mühendislik & Drone Hizmetleri | Çekmeköy İstanbul" },
      { name: "description", content: "RTK'lı İHA ile ortofoto haritalar, 3D modeller, 2D plankote ve hafriyat kübaj hesapları. Çekmeköy merkezli, Türkiye'nin dört bir yanına hizmet." },
    ],
  }),
  component: Home,
});

/* ── Constants ─────────────────────────────────────────────────────────── */
const PHONE     = "0539 676 09 18";
const PHONE_TEL = "+905396760918";
const MAPS_URL  = "https://www.google.com/maps/place/Fubay+Harita+M%C3%BChendislik+ve+Drone+Hizmetleri/@41.020311,29.1928208,15z/data=!4m6!3m5!1s0x14cad12a73c5d7ef:0x65bf7300e72c9e09!8m2!3d41.02021!4d29.1927735!16s%2Fg%2F11sckps2ps";
const INSTAGRAM_URL = "https://www.instagram.com/fubayharita/";
const ADDRESS   = "Çamlık, Efes Sk. Gürsoy İş Merkezi No:33-35 Kat:2 D:5, 34885 Çekmeköy/İstanbul";
const COMPANY_NAME = "FUBAY HARİTA MÜHENDİSLİK VE DRONE HİZMETLERİ TİC. LTD. ŞTİ.";
const MAIL      = "fubayharita@gmail.com";

/* ── Language ──────────────────────────────────────────────────────────── */
type LangKey = "tr" | "en";
interface LangCtxType { lang: LangKey; setLang: (l: LangKey) => void }
const LangCtx = createContext<LangCtxType>({ lang: "tr", setLang: () => {} });
const useLang = () => useContext(LangCtx);

/* ── Translations ──────────────────────────────────────────────────────── */
const TEXTS = {
  tr: {
    nav: ["Hizmetler", "Neden Biz", "Yorumlar", "Ziyaret"],
    directions: "Yol Tarifi",
    apptBtn: "Randevu Al",
    servicesBtn: "Hizmetleri Gör",

    slides: [
      { eyebrow: "RTK'lı İHA ile Hassas Ölçüm", headline: ["Gökyüzünden", "milimetrik kesinlik"] as [string,string], sub: "Saatler süren arazi çalışmasını tek bir uçuşa indiriyoruz. Santimetrik doğrulukta RTK verisiyle Türkiye'nin dört bir yanında, Türk pasaportuyla vizesiz gidilen ülkelerde." },
      { eyebrow: "Ortofoto Haritalar & 3B Modeller",  headline: ["Araziniz,", "üç boyutlu kanıt"]   as [string,string], sub: "Koordinatlı ortofoto haritalar ve gerçeğe en yakın 3B modeller. Kurum onayına hazır CAD ve GIS çıktıları — sürpriz revizyon olmadan." },
      { eyebrow: "Hafriyat & Kübaj Hesapları",        headline: ["Hacim raporunuz,", "aynı gün teslim"] as [string,string], sub: "Drone tabanlı kübaj hesaplarıyla ihtilafsız hakediş belgesi üretiyoruz. Şantiyeden çıkmadan faturanız hazır." },
    ],

    marquee: [
      "★★★★★ \"Hakediş süreci ilk kez bu kadar sorunsuzdu\"",
      "640+ tamamlanan proje",
      "★★★★★ \"Belediye onayını haftasında aldılar\"",
      "1.200+ saat drone uçuş tecrübesi",
      "★★★★★ \"Saha ekibi son derece profesyonel\"",
      "15+ yıllık mühendislik deneyimi",
      "★★★★★ \"Rapor formatı kurum onayına hazır geldi\"",
      "Türkiye geneli + vizesiz ülkelerde saha hizmeti",
    ],

    servicesEyebrow: "Hizmetlerimiz",
    servicesH: ["Tek bir ekip,", "saha & masa", " arasındaki tüm köprü."] as [string,string,string],
    servicesP: "Drone uçuşundan kurum onayına kadar tüm süreç tek bir noktadan yönetilir. Türkiye genelinde ve Türk pasaportuyla vizesiz erişilen ülkelerde hizmet veriyoruz.",
    serviceItems: [
      { title: "Yüksek Çözünürlüklü RTK'lı İHA'lar", desc: "RTK destekli, yüksek çözünürlüklü insansız hava araçlarıyla santimetrik doğrulukta hava ölçümü." },
      { title: "Ortofoto Haritalar & 3B Modeller",    desc: "Koordinatlı ortofoto haritalar ve gerçeğe en yakın üç boyutlu arazi modelleri üretiyoruz." },
      { title: "2D Klasik Plankoteler",               desc: "Mühendislik projeleriniz için hassas ve kurum standartlarına uygun 2D klasik plankote çizimleri." },
      { title: "Hafriyat Ölçümleri & Kübaj Hesapları", desc: "Hafriyat ve stok sahalarında drone tabanlı hacim ölçümü ile ihtilafsız kübaj raporları." },
    ],

    statsLabels: ["Yıllık saha tecrübesi", "Tamamlanan proje", "Drone uçuş saati", "Mevzuata uygunluk"],

    whyEyebrow: "Neden Fubay",
    whyH: ["Rakamların ", "anlattığı", " bir hikâye."] as [string,string,string],
    whyP: "Her proje, raporlanabilir bir kanıt zinciri bırakır. İşte 15 yılda biriken karne.",

    reviewsEyebrow: "Müşteri sesleri",
    reviewsH: ["Bizi ", "tavsiye eden", " projeler."] as [string,string,string],
    reviewsAvg: "4.9 ortalama · 80+ değerlendirme",
    reviewsP: "Müteahhitten arazi sahibine, mimardan kamu kurumuna kadar herkesin teslim aldığı tek şey: zamanında, doğru rapor.",
    reviewsDrag: "Kartları sürükleyerek veya oklarla gezinebilirsiniz.",
    reviewItems: [
      { role: "İnşaat Şefi, Çekmeköy",    text: "Üç aylık hafriyat sürecini tek bir drone ölçümüyle raporladılar. Kübaj raporu mahkemede delil olarak kabul edildi, ihtilafsız teslim ettik. Başka firmayı düşünemem." },
      { role: "Mimar, Üsküdar",            text: "Acil ortofoto talebimizi 48 saat içinde karşıladılar. Belediye dosyamız ilk sunumda onaylandı. Bu hızı ve kaliteyi aynı anda sunan başka bir firma görmedim." },
      { role: "Müteahhit, Maltepe",        text: "Büyük konut projemizin 3B modelini aldık. Müşteri sunumunda rakiplerimizden fark attık. Ekip hem teknik hem iletişim açısından A sınıfı — kesinlikle referans firmamız oldu." },
      { role: "Arazi Sahibi, Gebze",       text: "20 yıllık kadastro anlaşmazlığımızı 5 günde raporladılar. Mahkeme bilirkişisi bile raporun kalitesini takdirle karşıladı. Dava lehimize kesinleşti." },
      { role: "Maden Sahası Yöneticisi",   text: "Stok ölçümlerimizi artık yalnızca Fubay ile yaptırıyoruz. Hassasiyet ve teslim hızı açısından sektörde gördüğüm en iyi ekip. İkinci bir tercihim yok." },
      { role: "Proje Müdürü, Ataşehir",   text: "RTK drone ölçümü sayesinde imar planı revizyonumuzu aylarca kısalttık. Her aşamada yanımızdaydılar, tek kuruş ek ücret talep etmediler. Tam anlamıyla güvenilir bir ortak." },
    ],

    visitEyebrow: "Bizi Ziyaret Edin",
    visitH: ["Çekmeköy'deki ", "ofisimizde", " görüşelim."] as [string,string,string],
    visitAddrName: "Fubay Harita & Drone",
    visitPhoneLabel: "Telefon",
    visitIGLabel: "Instagram",
    visitEmailLabel: "E-posta",
    visitCallBtn: "Hemen Ara",
    visitDirsBtn: "Yol Tarifi Al",
    visitHoursLabel: "Çalışma Saatleri",
    todayLabel: "Bugün",
    hoursDays: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
    closedLabel: "Kapalı",

    ctaEyebrow: "Randevu & Teklif",
    ctaH: ["Projenizi anlatın,", "aynı gün", " teklif alın."] as [string,string,string],
    ctaP: "Keşif görüşmesi yapıyor, sahaya çıkmadan önce net bir fiyat ve takvim sunuyoruz. İlk görüşmeden sonra karar verebilirsiniz.",
    ctaOfficeBtn: "Ofise Yol Tarifi",

    footerDesc: "Harita mühendisliği ve drone teknolojisini tek bir profesyonel hizmette buluşturuyoruz. Türkiye geneli ve Türk pasaportuyla vizesiz gidilen ülkelerde 15+ yıllık tecrübe.",
    footerContactLabel: "İletişim",
    footerWeekdays: "Hafta içi 09:00 – 18:30",
    footerLinksLabel: "Hızlı Bağlantılar",
    footerLinks: ["Hizmetler", "Neden Biz", "Yorumlar", "Ziyaret"],
  },
  en: {
    nav: ["Services", "Why Us", "Reviews", "Visit"],
    directions: "Directions",
    apptBtn: "Book Appointment",
    servicesBtn: "See Services",

    slides: [
      { eyebrow: "RTK UAV Precision Survey",         headline: ["From the sky,", "millimetric accuracy"] as [string,string], sub: "We reduce hours of field work to a single flight. Centimeter-accurate RTK data across Turkey and visa-free destinations." },
      { eyebrow: "Orthophoto Maps & 3D Models",      headline: ["Your land,", "in three dimensions"]    as [string,string], sub: "Georeferenced orthophoto maps and true-to-life 3D terrain models. CAD and GIS outputs ready for institutional approval — no surprise revisions." },
      { eyebrow: "Excavation & Volume Calculations", headline: ["Your volume report,", "delivered same day"] as [string,string], sub: "Drone-based cubic calculations for undisputed progress billing. Your invoice is ready before you leave the site." },
    ],

    marquee: [
      "★★★★★ \"The progress billing ran smoothly for the first time\"",
      "640+ completed projects",
      "★★★★★ \"Municipal approval received within the week\"",
      "1,200+ hours of drone flight experience",
      "★★★★★ \"The field team was extremely professional\"",
      "15+ years of engineering expertise",
      "★★★★★ \"Report format arrived ready for institutional approval\"",
      "Field service across Turkey + visa-free destinations",
    ],

    servicesEyebrow: "Our Services",
    servicesH: ["One team,", "field & office", " — the complete bridge."] as [string,string,string],
    servicesP: "The entire process — from drone flight to institutional approval — is managed from a single point. Serving nationwide across Turkey and in visa-free countries.",
    serviceItems: [
      { title: "High-Resolution RTK UAVs",          desc: "Centimeter-accurate aerial survey with RTK-enabled, high-resolution unmanned aerial vehicles." },
      { title: "Orthophoto Maps & 3D Models",       desc: "Georeferenced orthophoto maps and the most accurate 3D terrain models of your land." },
      { title: "2D Classic Topographic Plans",      desc: "Precise 2D topographic plan drawings that meet institutional standards for engineering projects." },
      { title: "Excavation & Volume Calculations",  desc: "Drone-based volume measurements and undisputed cubic calculations for excavation and stockpile sites." },
    ],

    statsLabels: ["Years of field experience", "Completed projects", "Drone flight hours", "Regulatory compliance"],

    whyEyebrow: "Why Fubay",
    whyH: ["The story ", "numbers", " tell."] as [string,string,string],
    whyP: "Every project leaves a verifiable chain of evidence. Here's the record built over 15 years.",

    reviewsEyebrow: "Client voices",
    reviewsH: ["Projects that ", "recommend", " us."] as [string,string,string],
    reviewsAvg: "4.9 average · 80+ reviews",
    reviewsP: "From contractor to landowner, from architect to public institution — the one thing everyone receives: on-time, accurate reports.",
    reviewsDrag: "Swipe the cards or use the arrows to navigate.",
    reviewItems: [
      { role: "Construction Manager, Çekmeköy", text: "They reported our three-month excavation with a single drone measurement. The volume report was accepted as court evidence — handover completed without dispute. I can't imagine another firm." },
      { role: "Architect, Üsküdar",             text: "They fulfilled our urgent orthophoto request within 48 hours. The municipal file was approved on first submission. I've never seen this speed and quality delivered simultaneously." },
      { role: "Contractor, Maltepe",            text: "We used their 3D model for our major residential project and outperformed competitors in the client presentation. A-class team — they became our reference firm." },
      { role: "Landowner, Gebze",               text: "They documented a 20-year cadastral dispute within 5 days. The court expert even commended the quality of the report. The case was finalized in our favor." },
      { role: "Mine Site Manager",              text: "We now exclusively use Fubay for stockpile measurements. The best team I've encountered for precision and delivery speed. No second option." },
      { role: "Project Manager, Ataşehir",      text: "RTK drone measurement shortened our zoning plan revision by months. Present at every stage, never an extra charge. A truly reliable partner." },
    ],

    visitEyebrow: "Visit Us",
    visitH: ["Let's meet at our ", "Çekmeköy", " office."] as [string,string,string],
    visitAddrName: "Fubay Survey & Drone",
    visitPhoneLabel: "Phone",
    visitIGLabel: "Instagram",
    visitEmailLabel: "Email",
    visitCallBtn: "Call Now",
    visitDirsBtn: "Get Directions",
    visitHoursLabel: "Business Hours",
    todayLabel: "Today",
    hoursDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    closedLabel: "Closed",

    ctaEyebrow: "Appointment & Quote",
    ctaH: ["Tell us about your project,", "same day", " you receive a quote."] as [string,string,string],
    ctaP: "We conduct a project consultation and provide a clear price and schedule before heading to the field. You can decide after the first meeting.",
    ctaOfficeBtn: "Office Directions",

    footerDesc: "We combine land surveying engineering and drone technology in a single professional service. 15+ years of experience across Turkey and visa-free countries.",
    footerContactLabel: "Contact",
    footerWeekdays: "Weekdays 09:00 – 18:30",
    footerLinksLabel: "Quick Links",
    footerLinks: ["Services", "Why Us", "Reviews", "Visit"],
  },
} as const;

/* ── Language-independent data ─────────────────────────────────────────── */
const SERVICE_ICONS = [
  { icon: Plane,    color: "var(--amber-deep)" },
  { icon: Mountain, color: "var(--clay)" },
  { icon: Ruler,    color: "var(--sky)" },
  { icon: Layers,   color: "var(--amber-deep)" },
];

const STAT_DATA = [
  { icon: Award,      num: "15+" },
  { icon: Users,      num: "640+" },
  { icon: Plane,      num: "1.200+" },
  { icon: ShieldCheck, num: "%100" },
];

const REVIEW_NAMES  = ["Mehmet K.", "Ayşe D.", "Cem A.", "Selin Y.", "Tarık B.", "Zeynep C."];
const HERO_IMAGES   = [hero1, hero2, hero3];
const HOUR_TIMES    = ["09:00 – 18:30", "09:00 – 18:30", "09:00 – 18:30", "09:00 – 18:30", "09:00 – 18:30", "10:00 – 15:00"];

/* ── App root ──────────────────────────────────────────────────────────── */
function Home() {
  const [lang, setLangState] = useState<LangKey>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("fubay-lang") as LangKey) || "tr";
    }
    return "tr";
  });

  const setLang = (l: LangKey) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("fubay-lang", l);
    document.documentElement.lang = l;
  };

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <HeroCarousel />
        <Marquee />
        <Services />
        <WhyUs />
        <Reviews />
        <Visit />
        <CTA />
        <Footer />
      </div>
    </LangCtx.Provider>
  );
}

/* ── Header ────────────────────────────────────────────────────────────── */
function Header() {
  const { lang, setLang } = useLang();
  const t = TEXTS[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 24);
    onS();
    window.addEventListener("scroll", onS);
    return () => window.removeEventListener("scroll", onS);
  }, []);

  const NAV_HREFS = ["#hizmetler", "#neden-biz", "#yorumlar", "#ziyaret"];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_8px_30px_-12px_rgba(0,0,0,.12)]" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-2" aria-label="Fubay Harita ana sayfa">
          <img src={logo} alt="Fubay Harita Mühendislik ve Drone Hizmetleri" className="h-11 w-auto rounded-xl shadow-sm" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {t.nav.map((label, k) => (
            <a key={k} href={NAV_HREFS[k]} className="nav-link text-foreground/80 hover:text-foreground">{label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => setLang(lang === "tr" ? "en" : "tr")}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3.5 py-2 text-sm font-semibold hover:bg-secondary transition"
            aria-label="Change language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "tr" ? "TR" : "EN"}
          </button>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 hover:bg-secondary transition">
            <Instagram className="h-4 w-4" />
          </a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium hover:bg-secondary transition">
            <Navigation className="h-4 w-4" /> {t.directions}
          </a>
          <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] px-5 py-2.5 text-sm font-semibold text-[color:var(--cream)] shadow-lg shadow-black/10 hover:bg-[color:var(--amber-deep)] transition">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </div>

        <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background/60 lg:hidden" aria-label="Menü">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background lg:hidden">
            <div className="flex items-center justify-between p-5">
              <img src={logo} alt="Fubay Harita" className="h-11 w-auto rounded-xl" />
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-border"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex flex-col gap-2 px-6 pt-6">
              {t.nav.map((label, k) => (
                <a key={k} href={NAV_HREFS[k]} onClick={() => setOpen(false)} className="border-b border-border py-4 font-serif text-3xl">{label}</a>
              ))}
            </div>
            <div className="mt-10 grid gap-3 px-6">
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] px-5 py-4 text-base font-semibold text-[color:var(--cream)]"><Phone className="h-4 w-4" /> {t.visitCallBtn}</a>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-4 text-base font-semibold"><Navigation className="h-4 w-4" /> {t.directions}</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-4 text-base font-semibold"><Instagram className="h-4 w-4" /> Instagram</a>
              <button
                onClick={() => { setLang(lang === "tr" ? "en" : "tr"); setOpen(false); }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-4 text-base font-semibold"
              >
                <Globe className="h-4 w-4" /> {lang === "tr" ? "Türkçe" : "English"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── Slide progress bar ────────────────────────────────────────────────── */
function SlideBar({ active }: { active: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    if (!active) {
      el.style.transition = "none";
      el.style.transform = "scaleX(0)";
      return;
    }
    el.style.transition = "none";
    el.style.transform = "scaleX(0)";
    el.getBoundingClientRect(); // force reflow so browser registers the 0 state
    el.style.transition = "transform 8.3s linear";
    el.style.transform = "scaleX(1)";
  }, [active]);
  return (
    <span
      ref={spanRef}
      className="block h-full w-full bg-[color:var(--amber)]"
      style={{ transform: "scaleX(0)", transformOrigin: "left" }}
    />
  );
}

/* ── Hero Carousel ─────────────────────────────────────────────────────── */
function HeroCarousel() {
  const { lang } = useLang();
  const t = TEXTS[lang];
  const [i, setI] = useState(0);
  const n = t.slides.length;

  useEffect(() => {
    const timer = setTimeout(() => setI(p => (p + 1) % n), 8500);
    return () => clearTimeout(timer);
  }, [i, n]);

  const slide = t.slides[i];

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {HERO_IMAGES.map((src, k) => (
        <motion.div
          key={k}
          animate={{ opacity: k === i ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
          style={{ zIndex: k === i ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ animation: k === i ? "kenburns 9s ease-out forwards" : "none" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-24 pt-32 text-[color:var(--cream)] lg:px-8 lg:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${lang}-${i}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--amber)]" /> {slide.eyebrow}
            </span>
            <h1 className="mt-6 text-5xl leading-[0.95] sm:text-6xl lg:text-[88px]">
              <span className="block font-sans font-bold tracking-tight">{slide.headline[0]}</span>
              <span className="block font-serif italic text-[color:var(--amber)]">{slide.headline[1]}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">{slide.sub}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`tel:${PHONE_TEL}`} className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--amber)] px-6 py-3.5 text-base font-semibold text-[color:var(--ink)] transition hover:bg-[color:var(--amber-deep)] hover:text-[color:var(--cream)]">
                {t.apptBtn} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#hizmetler" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3.5 text-base font-semibold backdrop-blur hover:bg-white/15">
                {t.servicesBtn}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between">
          <div className="flex gap-2">
            {t.slides.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`}
                className="h-1.5 overflow-hidden rounded-full bg-white/30"
                style={{ width: k === i ? 56 : 24, transition: "width .5s" }}
              >
                <SlideBar active={k === i} />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setI((i - 1 + n) % n)} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20" aria-label="Önceki"><ArrowLeft className="h-5 w-5" /></button>
            <button onClick={() => setI((i + 1) % n)} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20" aria-label="Sonraki"><ArrowRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Marquee ───────────────────────────────────────────────────────────── */
function Marquee() {
  const { lang } = useLang();
  const items = TEXTS[lang].marquee;
  const loop = [...items, ...items];
  return (
    <div className="marquee-wrap overflow-hidden border-y border-border bg-[color:var(--ink)] py-5 text-[color:var(--cream)]">
      <div className="marquee-track">
        {loop.map((txt, k) => (
          <span key={k} className="inline-flex items-center gap-3 text-sm tracking-wide">
            <span className="font-serif italic text-[color:var(--amber)]">·</span> {txt}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── TiltCard (desktop 3D, mobile flat) ───────────────────────────────── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  if (isMobile) return <div className="relative h-full">{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={e => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className="relative h-full"
    >
      {children}
    </motion.div>
  );
}

/* ── Services ──────────────────────────────────────────────────────────── */
function Services() {
  const { lang } = useLang();
  const t = TEXTS[lang];
  return (
    <section id="hizmetler" className="relative px-5 py-24 lg:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber-deep)]">{t.servicesEyebrow}</span>
            <h2 className="mt-4 font-sans text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {t.servicesH[0]}<br />
              <span className="font-serif italic text-[color:var(--amber-deep)]">{t.servicesH[1]}</span>{t.servicesH[2]}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">{t.servicesP}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:[perspective:1200px]">
          {t.serviceItems.map((s, k) => (
            <div key={k} className="group">
              <TiltCard>
                <div className="relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[28px] border border-border bg-card p-7 shadow-[0_10px_40px_-20px_rgba(20,30,60,.25)]">
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ backgroundColor: `color-mix(in oklab, ${SERVICE_ICONS[k].color} 18%, transparent)`, color: SERVICE_ICONS[k].color }}>
                      {(() => { const Icon = SERVICE_ICONS[k].icon; return <Icon className="h-7 w-7" strokeWidth={1.8} />; })()}
                    </span>
                    <span className="font-serif text-2xl text-muted-foreground/40">0{k + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl leading-tight sm:text-2xl">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Why Us ────────────────────────────────────────────────────────────── */
function WhyUs() {
  const { lang } = useLang();
  const t = TEXTS[lang];
  return (
    <section id="neden-biz" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber-deep)]">{t.whyEyebrow}</span>
          <h2 className="mt-4 font-sans text-4xl font-bold leading-tight sm:text-5xl">
            {t.whyH[0]}<span className="font-serif italic text-[color:var(--amber-deep)]">{t.whyH[1]}</span>{t.whyH[2]}
          </h2>
          <p className="mt-5 text-muted-foreground">{t.whyP}</p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_DATA.map((s, k) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: k * 0.08, duration: 0.6 }}
              className="group relative overflow-hidden rounded-[24px] border border-border bg-card p-7"
            >
              <div className="absolute inset-0 origin-bottom translate-y-full bg-[color:var(--ink)] transition-transform duration-500 group-hover:translate-y-0" />
              <div className="relative">
                <s.icon className="h-7 w-7 text-[color:var(--amber-deep)] transition group-hover:text-[color:var(--amber)]" strokeWidth={1.8} />
                <div className="mt-7 font-serif text-5xl text-foreground transition group-hover:text-[color:var(--cream)]">{s.num}</div>
                <div className="mt-2 text-sm text-muted-foreground transition group-hover:text-[color:var(--cream)]/80">{TEXTS[lang].statsLabels[k]}</div>
                <ArrowRight className="mt-6 h-5 w-5 -translate-x-2 text-foreground/50 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-[color:var(--amber)] group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reviews ───────────────────────────────────────────────────────────── */
function Reviews() {
  const { lang } = useLang();
  const t = TEXTS[lang];
  const [i, setI] = useState(0);
  const isMobile = useIsMobile();
  const n = t.reviewItems.length;
  const next = () => setI(p => (p + 1) % n);
  const prev = () => setI(p => (p - 1 + n) % n);

  return (
    <section id="yorumlar" className="bg-[color:var(--ink)] px-5 py-24 text-[color:var(--cream)] lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber)]">{t.reviewsEyebrow}</span>
          <h2 className="mt-4 font-sans text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t.reviewsH[0]}<span className="font-serif italic text-[color:var(--amber)]">{t.reviewsH[1]}</span>{t.reviewsH[2]}
          </h2>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex gap-1">{[...Array(5)].map((_, k) => <Star key={k} className="h-5 w-5 fill-[color:var(--amber)] text-[color:var(--amber)]" />)}</div>
            <span className="text-sm text-white/70">{t.reviewsAvg}</span>
          </div>
          <p className="mt-8 max-w-md text-white/70">{t.reviewsP}</p>
          <div className="mt-10 flex gap-3">
            <button onClick={prev} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 hover:bg-white/10" aria-label="Önceki"><ArrowLeft className="h-5 w-5" /></button>
            <button onClick={next} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 hover:bg-white/10" aria-label="Sonraki"><ArrowRight className="h-5 w-5" /></button>
            <span className="ml-3 self-center font-serif text-2xl tabular-nums text-white/60">{String(i + 1).padStart(2, "0")} <span className="text-white/30">/ {String(n).padStart(2, "0")}</span></span>
          </div>
          <p className="mt-4 text-xs text-white/40">{t.reviewsDrag}</p>
        </div>

        <div className="relative h-[440px] touch-pan-y select-none sm:h-[420px] lg:[perspective:1500px]">
          {t.reviewItems.map((r, k) => {
            const offset = (k - i + n) % n;
            const visible = offset < 3;
            return (
              <motion.div
                key={`${lang}-${k}`}
                animate={{ z: isMobile ? 0 : -offset * 80, y: offset * 22, scale: 1 - offset * 0.06, opacity: visible ? 1 - offset * 0.25 : 0, rotateX: isMobile ? 0 : offset * 4 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: isMobile ? "flat" : "preserve-3d", zIndex: n - offset }}
                className="absolute inset-0"
                drag={offset === 0 ? "x" : false}
                dragSnapToOrigin
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => { if (info.offset.x < -80) next(); else if (info.offset.x > 80) prev(); }}
              >
                <div className="flex h-full cursor-grab flex-col justify-between rounded-[28px] bg-[color:var(--cream)] p-7 text-[color:var(--ink)] shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)] active:cursor-grabbing sm:p-9">
                  <div>
                    <div className="flex gap-1">{[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-[color:var(--amber-deep)] text-[color:var(--amber-deep)]" />)}</div>
                    <p className="mt-5 font-serif text-xl leading-snug sm:text-2xl">"{r.text}"</p>
                  </div>
                  <div className="mt-8 flex items-center gap-4 border-t border-black/10 pt-6">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--ink)] font-serif text-lg text-[color:var(--cream)]">{REVIEW_NAMES[k][0]}</span>
                    <div>
                      <div className="font-semibold">{REVIEW_NAMES[k]}</div>
                      <div className="text-sm text-black/60">{r.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Visit ─────────────────────────────────────────────────────────────── */
function Visit() {
  const { lang } = useLang();
  const t = TEXTS[lang];
  const todayIdx = useMemo(() => (new Date().getDay() + 6) % 7, []);
  const [open, setOpen] = useState<number | null>(todayIdx);

  const hours = [
    ...HOUR_TIMES.map((h, k) => ({ day: t.hoursDays[k], h })),
    { day: t.hoursDays[6], h: t.closedLabel },
  ];

  return (
    <section id="ziyaret" className="px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="rounded-[32px] border border-border bg-card p-8 sm:p-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber-deep)]">{t.visitEyebrow}</span>
          <h2 className="mt-4 font-sans text-4xl font-bold leading-tight sm:text-5xl">
            {t.visitH[0]}<span className="font-serif italic text-[color:var(--amber-deep)]">{t.visitH[1]}</span>{t.visitH[2]}
          </h2>
          <div className="mt-8 flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--amber)]/20 text-[color:var(--amber-deep)]"><MapPin className="h-5 w-5" /></span>
            <div>
              <div className="font-semibold">{t.visitAddrName}</div>
              <p className="text-muted-foreground">{ADDRESS}</p>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--amber)]/20 text-[color:var(--amber-deep)]"><Phone className="h-5 w-5" /></span>
            <div>
              <div className="font-semibold">{t.visitPhoneLabel}</div>
              <a href={`tel:${PHONE_TEL}`} className="text-muted-foreground hover:text-foreground">{PHONE}</a>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--amber)]/20 text-[color:var(--amber-deep)]"><Instagram className="h-5 w-5" /></span>
            <div>
              <div className="font-semibold">{t.visitIGLabel}</div>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">@fubayharita</a>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--amber)]/20 text-[color:var(--amber-deep)]"><Mail className="h-5 w-5" /></span>
            <div>
              <div className="font-semibold">{t.visitEmailLabel}</div>
              <a href={`mailto:${MAIL}`} className="text-muted-foreground hover:text-foreground">{MAIL}</a>
            </div>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] px-5 py-3.5 text-sm font-semibold text-[color:var(--cream)] hover:bg-[color:var(--amber-deep)]"><Phone className="h-4 w-4" /> {t.visitCallBtn}</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3.5 text-sm font-semibold hover:bg-secondary"><Navigation className="h-4 w-4" /> {t.visitDirsBtn}</a>
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-[color:var(--amber-deep)]" /> {t.visitHoursLabel}
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-[28px] border border-border bg-card">
            {hours.map((d, k) => {
              const isToday = k === todayIdx;
              const isOpen = open === k;
              return (
                <button
                  key={k}
                  onClick={() => setOpen(isOpen ? null : k)}
                  className={`relative flex w-full items-center justify-between px-7 py-5 text-left transition ${isToday ? "bg-[color:var(--amber)]/15" : "hover:bg-secondary/50"}`}
                >
                  <div className="flex items-center gap-4">
                    {isToday && <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--amber-deep)]" />}
                    <span className={`font-serif text-xl ${isToday ? "text-[color:var(--amber-deep)]" : ""}`}>{d.day}</span>
                    {isToday && <span className="rounded-full bg-[color:var(--ink)] px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-[color:var(--cream)]">{t.todayLabel}</span>}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground/80">{d.h}</span>
                    <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ───────────────────────────────────────────────────────────────── */
function CTA() {
  const { lang } = useLang();
  const t = TEXTS[lang];
  return (
    <section className="px-5 pb-24 lg:px-8 lg:pb-32">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] px-8 py-20 sm:px-14 lg:px-20 lg:py-28"
        style={{ background: "radial-gradient(120% 120% at 0% 0%, var(--amber) 0%, var(--amber-deep) 45%, var(--clay) 100%)" }}>
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-white/80">{t.ctaEyebrow}</span>
            <h2 className="mt-4 font-sans text-4xl font-bold leading-[1.05] text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              {t.ctaH[0]}<br />
              <span className="font-serif italic">{t.ctaH[1]}</span>{t.ctaH[2]}
            </h2>
            <p className="mt-5 max-w-lg text-lg text-[color:var(--ink)]/80">{t.ctaP}</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] px-6 py-4 text-base font-semibold text-[color:var(--cream)] shadow-xl hover:bg-black"><Phone className="h-5 w-5" /> {PHONE}</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--ink)]/30 bg-white/60 px-6 py-4 text-base font-semibold text-[color:var(--ink)] backdrop-blur hover:bg-white"><Navigation className="h-5 w-5" /> {t.ctaOfficeBtn}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────────────────────────── */
function Footer() {
  const { lang } = useLang();
  const t = TEXTS[lang];
  const NAV_HREFS = ["#hizmetler", "#neden-biz", "#yorumlar", "#ziyaret"];
  return (
    <footer className="border-t border-border bg-[color:var(--ink)] px-5 py-16 text-[color:var(--cream)] lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
        <div>
          <img src={logo} alt="Fubay Harita Mühendislik ve Drone Hizmetleri" className="h-14 w-auto rounded-xl" />
          <p className="mt-5 max-w-sm text-sm text-white/65">{t.footerDesc}</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
            <Instagram className="h-4 w-4 text-[color:var(--amber)]" /> @fubayharita
          </a>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber)]">{t.footerContactLabel}</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--amber)]" /><a href={`tel:${PHONE_TEL}`} className="hover:text-[color:var(--amber)]">{PHONE}</a></li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--amber)]" /><a href={MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-[color:var(--amber)]">{ADDRESS}</a></li>
            <li className="flex items-start gap-3"><Instagram className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--amber)]" /><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-[color:var(--amber)]">@fubayharita</a></li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--amber)]" /><a href={`mailto:${MAIL}`} className="hover:text-[color:var(--amber)]">{MAIL}</a></li>
            <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--amber)]" /><span>{t.footerWeekdays}</span></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber)]">{t.footerLinksLabel}</div>
          <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {t.footerLinks.map((label, k) => (
              <li key={k}><a href={NAV_HREFS[k]} className="hover:text-[color:var(--amber)]">{label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center text-xs text-white/45 sm:flex-row sm:text-left">
        <span>© {new Date().getFullYear()} {COMPANY_NAME}</span>
        <span>Çekmeköy · İstanbul · Türkiye</span>
      </div>
    </footer>
  );
}
