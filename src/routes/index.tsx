import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Phone, MapPin, ArrowRight, ArrowLeft, ChevronDown, Menu, X,
  Plane, Mountain, Ruler, Layers,
  Award, Clock, Users, ShieldCheck, Star, Navigation, Instagram,
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

const PHONE = "0539 676 09 18";
const PHONE_TEL = "+905396760918";
const MAPS_URL = "https://www.google.com/maps/place/Fubay+Harita+M%C3%BChendislik+ve+Drone+Hizmetleri/@41.020311,29.1928208,15z/data=!4m6!3m5!1s0x14cad12a73c5d7ef:0x65bf7300e72c9e09!8m2!3d41.02021!4d29.1927735!16s%2Fg%2F11sckps2ps";
const INSTAGRAM_URL = "https://www.instagram.com/fubayharita/";
const ADDRESS = "Çamlık, Efes Sk. Gürsoy İş Merkezi No:33-35 Kat:2 D:5, 34885 Çekmeköy/İstanbul";
const COMPANY_NAME = "FUBAY HARİTA MÜHENDİSLİK VE DRONE HİZMETLERİ TİC. LTD. ŞTİ.";

const HERO_SLIDES = [
  {
    image: hero1,
    eyebrow: "Drone ile Hassas Ölçüm",
    headline: ["Gökyüzünden", "milimetrik kesinlik"],
    sub: "Saatler süren arazi çalışmasını, tek bir uçuşla kanıta dönüştürüyoruz. İstanbul'un her şantiyesinde, her parselinde.",
  },
  {
    image: hero2,
    eyebrow: "Ortofoto & Halihazır Harita",
    headline: ["Araziniz,", "santimine kadar"],
    sub: "1/1000 ve 1/500 ölçekli üretimde, kurum onayına hazır CAD ve GIS çıktıları. Sürpriz revizyon yok.",
  },
  {
    image: hero3,
    eyebrow: "Kadastro & İmar",
    headline: ["Mevzuata uygun,", "zamanında teslim"],
    sub: "Tapu, kadastro ve belediye süreçlerinde 15 yıllık saha tecrübesi. Dosyanız ilk seferde geçsin diye buradayız.",
  },
];

const SERVICES = [
  { icon: Plane, color: "var(--amber-deep)", title: "Yüksek Çözünürlüklü RTK'lı İHA'lar", desc: "RTK destekli, yüksek çözünürlüklü insansız hava araçlarıyla santimetrik doğrulukta hava ölçümü." },
  { icon: Mountain, color: "var(--clay)", title: "Ortofoto Haritalar & 3B Modeller", desc: "Koordinatlı ortofoto haritalar ve gerçeğe en yakın üç boyutlu arazi modelleri üretiyoruz." },
  { icon: Ruler, color: "var(--sky)", title: "2D Klasik Plankoteler", desc: "Mühendislik projeleriniz için hassas ve kurum standartlarına uygun 2D klasik plankote çizimleri." },
  { icon: Layers, color: "var(--amber-deep)", title: "Hafriyat Ölçümleri & Kübaj Hesapları", desc: "Hafriyat ve stok sahalarında drone tabanlı hacim ölçümü ile ihtilafsız kübaj raporları." },
];

const STATS = [
  { icon: Award, num: "15+", label: "Yıllık saha tecrübesi" },
  { icon: Users, num: "640+", label: "Tamamlanan proje" },
  { icon: Plane, num: "1.200+", label: "Drone uçuş saati" },
  { icon: ShieldCheck, num: "%100", label: "Mevzuata uygunluk" },
];

const REVIEWS = [
  { name: "Mehmet K.", role: "İnşaat Şefi, Çekmeköy", text: "Şantiyemizin hacim raporlarını bir günde teslim ettiler. Hakediş süreci ilk kez bu kadar sorunsuz ilerledi.", rating: 5 },
  { name: "Ayşe D.", role: "Mimar, Üsküdar", text: "Halihazır harita ihtiyacımız çok aciliydi. Hem belediye onayını aldılar hem de süreç boyunca tek bir saniye bizi beklemediler.", rating: 5 },
  { name: "Cem A.", role: "Müteahhit, Çekmeköy", text: "Drone ortofotoları sayesinde müşteriye projeyi anlatmak çok kolaylaştı. Profesyonel ve dakik bir ekip.", rating: 5 },
  { name: "Selin Y.", role: "Arazi Sahibi", text: "Sınır anlaşmazlığımızı yıllardır çözemiyorduk. Fubay ekibi haftasında raporu hazırladı, dava lehimize sonuçlandı.", rating: 5 },
];

const HOURS = [
  { day: "Pazartesi", h: "09:00 – 18:30" },
  { day: "Salı", h: "09:00 – 18:30" },
  { day: "Çarşamba", h: "09:00 – 18:30" },
  { day: "Perşembe", h: "09:00 – 18:30" },
  { day: "Cuma", h: "09:00 – 18:30" },
  { day: "Cumartesi", h: "10:00 – 15:00" },
  { day: "Pazar", h: "Kapalı" },
];

function Home() {
  return (
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
  );
}

/* ---------------- HEADER ---------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 24);
    onS();
    window.addEventListener("scroll", onS);
    return () => window.removeEventListener("scroll", onS);
  }, []);
  const links = [
    { l: "Hizmetler", h: "#hizmetler" },
    { l: "Neden Biz", h: "#neden-biz" },
    { l: "Yorumlar", h: "#yorumlar" },
    { l: "Ziyaret", h: "#ziyaret" },
  ];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_8px_30px_-12px_rgba(0,0,0,.12)]" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-2" aria-label="Fubay Harita ana sayfa">
          <img src={logo} alt="Fubay Harita Mühendislik ve Drone Hizmetleri" className="h-11 w-auto rounded-xl shadow-sm" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(l => <a key={l.h} href={l.h} className="nav-link text-foreground/80 hover:text-foreground">{l.l}</a>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 hover:bg-secondary transition">
            <Instagram className="h-4 w-4" />
          </a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium hover:bg-secondary transition">
            <Navigation className="h-4 w-4" /> Yol Tarifi
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
              {links.map(l => <a key={l.h} href={l.h} onClick={() => setOpen(false)} className="border-b border-border py-4 font-serif text-3xl">{l.l}</a>)}
            </div>
            <div className="mt-10 grid gap-3 px-6">
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] px-5 py-4 text-base font-semibold text-[color:var(--cream)]"><Phone className="h-4 w-4" /> Hemen Ara</a>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-4 text-base font-semibold"><Navigation className="h-4 w-4" /> Yol Tarifi Al</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-4 text-base font-semibold"><Instagram className="h-4 w-4" /> Instagram</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------- HERO CAROUSEL ---------------- */
function HeroCarousel() {
  const [i, setI] = useState(0);
  const n = HERO_SLIDES.length;
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % n), 6500);
    return () => clearInterval(t);
  }, [n]);
  const slide = HERO_SLIDES[i];
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="kenburns absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-24 pt-32 text-[color:var(--cream)] lg:px-8 lg:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
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
                Ücretsiz Keşif İste <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#hizmetler" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3.5 text-base font-semibold backdrop-blur hover:bg-white/15">
                Hizmetleri Gör
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between">
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`}
                className="h-1.5 overflow-hidden rounded-full bg-white/30"
                style={{ width: k === i ? 56 : 24, transition: "width .5s" }}>
                <span className={`block h-full bg-[color:var(--amber)] ${k === i ? "w-full" : "w-0"}`} style={{ transition: "width 6.5s linear" }} />
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

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = [
    "★★★★★ \"Hakediş süreci ilk kez bu kadar sorunsuzdu\"",
    "640+ tamamlanan proje",
    "★★★★★ \"Belediye onayını haftasında aldılar\"",
    "1.200+ saat drone uçuş tecrübesi",
    "★★★★★ \"Saha ekibi son derece profesyonel\"",
    "15+ yıllık mühendislik deneyimi",
    "★★★★★ \"Rapor formatı kurum onayına hazır geldi\"",
  ];
  const loop = [...items, ...items];
  return (
    <div className="marquee-wrap overflow-hidden border-y border-border bg-[color:var(--ink)] py-5 text-[color:var(--cream)]">
      <div className="marquee-track">
        {loop.map((t, k) => (
          <span key={k} className="inline-flex items-center gap-3 text-sm tracking-wide">
            <span className="font-serif italic text-[color:var(--amber)]">·</span> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SERVICES (3D tilt) ---------------- */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  const shineX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
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
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform([shineX, shineY], ([sx, sy]) => `radial-gradient(220px circle at ${sx} ${sy}, rgba(255,255,255,.35), transparent 60%)`),
        }}
      />
    </motion.div>
  );
}

function Services() {
  return (
    <section id="hizmetler" className="relative px-5 py-24 lg:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber-deep)]">Hizmetlerimiz</span>
            <h2 className="mt-4 font-sans text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Tek bir ekip,<br />
              <span className="font-serif italic text-[color:var(--amber-deep)]">saha & masa</span> arasındaki tüm köprü.
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">Drone uçuşundan kurum onayına kadar tüm süreç tek bir noktadan yönetilir. Üç ayrı firmayla uğraşmazsınız, üç ayrı fatura ödemezsiniz.</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 [perspective:1200px]">
          {SERVICES.map((s, k) => (
            <div key={s.title} className="group">
              <TiltCard>
                <div className="relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[28px] border border-border bg-card p-7 shadow-[0_10px_40px_-20px_rgba(20,30,60,.25)]">
                  <div className="flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
                    <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ backgroundColor: `color-mix(in oklab, ${s.color} 18%, transparent)`, color: s.color }}>
                      <s.icon className="h-7 w-7" strokeWidth={1.8} />
                    </span>
                    <span className="font-serif text-2xl text-muted-foreground/40">0{k + 1}</span>
                  </div>
                  <div style={{ transform: "translateZ(20px)" }}>
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

/* ---------------- WHY US ---------------- */
function WhyUs() {
  return (
    <section id="neden-biz" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber-deep)]">Neden Fubay</span>
          <h2 className="mt-4 font-sans text-4xl font-bold leading-tight sm:text-5xl">
            Rakamların <span className="font-serif italic text-[color:var(--amber-deep)]">anlattığı</span> bir hikâye.
          </h2>
          <p className="mt-5 text-muted-foreground">Her proje, raporlanabilir bir kanıt zinciri bırakır. İşte 15 yılda biriken karne.</p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, k) => (
            <motion.div
              key={s.label}
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
                <div className="mt-2 text-sm text-muted-foreground transition group-hover:text-[color:var(--cream)]/80">{s.label}</div>
                <ArrowRight className="mt-6 h-5 w-5 -translate-x-2 text-foreground/50 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-[color:var(--amber)] group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- REVIEWS ---------------- */
function Reviews() {
  const [i, setI] = useState(0);
  const n = REVIEWS.length;
  const next = () => setI(p => (p + 1) % n);
  const prev = () => setI(p => (p - 1 + n) % n);
  return (
    <section id="yorumlar" className="bg-[color:var(--ink)] px-5 py-24 text-[color:var(--cream)] lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber)]">Müşteri sesleri</span>
          <h2 className="mt-4 font-sans text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Bizi <span className="font-serif italic text-[color:var(--amber)]">tavsiye eden</span> projeler.
          </h2>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex gap-1">{[...Array(5)].map((_, k) => <Star key={k} className="h-5 w-5 fill-[color:var(--amber)] text-[color:var(--amber)]" />)}</div>
            <span className="text-sm text-white/70">4.9 ortalama · 80+ değerlendirme</span>
          </div>
          <p className="mt-8 max-w-md text-white/70">Müteahhitten arazi sahibine, mimardan kamu kurumuna kadar herkesin teslim aldığı tek şey: zamanında, doğru rapor.</p>
          <div className="mt-10 flex gap-3">
            <button onClick={prev} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 hover:bg-white/10" aria-label="Önceki"><ArrowLeft className="h-5 w-5" /></button>
            <button onClick={next} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 hover:bg-white/10" aria-label="Sonraki"><ArrowRight className="h-5 w-5" /></button>
            <span className="ml-3 self-center font-serif text-2xl tabular-nums text-white/60">{String(i + 1).padStart(2, "0")} <span className="text-white/30">/ {String(n).padStart(2, "0")}</span></span>
          </div>
          <p className="mt-4 text-xs text-white/40">Kartları sürükleyerek veya oklarla gezinebilirsiniz.</p>
        </div>

        <div className="relative h-[420px] touch-pan-y select-none [perspective:1500px]">
          {REVIEWS.map((r, k) => {
            const offset = (k - i + n) % n;
            const visible = offset < 3;
            return (
              <motion.div
                key={k}
                animate={{
                  z: -offset * 80,
                  y: offset * 24,
                  scale: 1 - offset * 0.06,
                  opacity: visible ? 1 - offset * 0.25 : 0,
                  rotateX: offset * 4,
                }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: "preserve-3d", zIndex: n - offset }}
                className="absolute inset-0"
                drag={offset === 0 ? "x" : false}
                dragSnapToOrigin
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) next();
                  else if (info.offset.x > 80) prev();
                }}
              >
                <div className="flex h-full cursor-grab flex-col justify-between rounded-[28px] bg-[color:var(--cream)] p-8 text-[color:var(--ink)] shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)] active:cursor-grabbing sm:p-10">
                  <div>
                    <div className="flex gap-1">{[...Array(r.rating)].map((_, j) => <Star key={j} className="h-4 w-4 fill-[color:var(--amber-deep)] text-[color:var(--amber-deep)]" />)}</div>
                    <p className="mt-6 font-serif text-2xl leading-snug sm:text-3xl">"{r.text}"</p>
                  </div>
                  <div className="mt-8 flex items-center gap-4 border-t border-black/10 pt-6">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--ink)] font-serif text-lg text-[color:var(--cream)]">{r.name[0]}</span>
                    <div>
                      <div className="font-semibold">{r.name}</div>
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

/* ---------------- VISIT ---------------- */
function Visit() {
  const todayIdx = useMemo(() => (new Date().getDay() + 6) % 7, []);
  const [open, setOpen] = useState<number | null>(todayIdx);
  return (
    <section id="ziyaret" className="px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="rounded-[32px] border border-border bg-card p-8 sm:p-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber-deep)]">Bizi Ziyaret Edin</span>
          <h2 className="mt-4 font-sans text-4xl font-bold leading-tight sm:text-5xl">
            Çekmeköy'deki <span className="font-serif italic text-[color:var(--amber-deep)]">ofisimizde</span> görüşelim.
          </h2>
          <div className="mt-8 flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--amber)]/20 text-[color:var(--amber-deep)]"><MapPin className="h-5 w-5" /></span>
            <div>
              <div className="font-semibold">Fubay Harita & Drone</div>
              <p className="text-muted-foreground">{ADDRESS}</p>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--amber)]/20 text-[color:var(--amber-deep)]"><Phone className="h-5 w-5" /></span>
            <div>
              <div className="font-semibold">Telefon</div>
              <a href={`tel:${PHONE_TEL}`} className="text-muted-foreground hover:text-foreground">{PHONE}</a>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--amber)]/20 text-[color:var(--amber-deep)]"><Instagram className="h-5 w-5" /></span>
            <div>
              <div className="font-semibold">Instagram</div>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">@fubayharita</a>
            </div>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] px-5 py-3.5 text-sm font-semibold text-[color:var(--cream)] hover:bg-[color:var(--amber-deep)]"><Phone className="h-4 w-4" /> Hemen Ara</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3.5 text-sm font-semibold hover:bg-secondary"><Navigation className="h-4 w-4" /> Yol Tarifi Al</a>
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-[color:var(--amber-deep)]" /> Çalışma Saatleri
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-[28px] border border-border bg-card">
            {HOURS.map((d, k) => {
              const isToday = k === todayIdx;
              const isOpen = open === k;
              return (
                <button
                  key={d.day}
                  onClick={() => setOpen(isOpen ? null : k)}
                  className={`relative flex w-full items-center justify-between px-7 py-5 text-left transition ${isToday ? "bg-[color:var(--amber)]/15" : "hover:bg-secondary/50"}`}
                >
                  <div className="flex items-center gap-4">
                    {isToday && <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--amber-deep)]" />}
                    <span className={`font-serif text-xl ${isToday ? "text-[color:var(--amber-deep)]" : ""}`}>{d.day}</span>
                    {isToday && <span className="rounded-full bg-[color:var(--ink)] px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-[color:var(--cream)]">Bugün</span>}
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

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section className="px-5 pb-24 lg:px-8 lg:pb-32">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] px-8 py-20 sm:px-14 lg:px-20 lg:py-28"
        style={{ background: "radial-gradient(120% 120% at 0% 0%, var(--amber) 0%, var(--amber-deep) 45%, var(--clay) 100%)" }}>
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-white/80">Hızlı Teklif</span>
            <h2 className="mt-4 font-sans text-4xl font-bold leading-[1.05] text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              Projenizi anlatın,<br />
              <span className="font-serif italic">aynı gün</span> içinde teklif gelsin.
            </h2>
            <p className="mt-5 max-w-lg text-lg text-[color:var(--ink)]/80">Ücretsiz keşif görüşmesi yapıyor, sahaya çıkmadan önce net bir fiyat ve takvim sunuyoruz.</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] px-6 py-4 text-base font-semibold text-[color:var(--cream)] shadow-xl hover:bg-black"><Phone className="h-5 w-5" /> {PHONE}</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--ink)]/30 bg-white/60 px-6 py-4 text-base font-semibold text-[color:var(--ink)] backdrop-blur hover:bg-white"><Navigation className="h-5 w-5" /> Ofise Yol Tarifi</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-[color:var(--ink)] px-5 py-16 text-[color:var(--cream)] lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
        <div>
          <img src={logo} alt="Fubay Harita Mühendislik ve Drone Hizmetleri" className="h-14 w-auto rounded-xl" />
          <p className="mt-5 max-w-sm text-sm text-white/65">Harita mühendisliği ve drone teknolojisini tek bir profesyonel hizmette buluşturuyoruz. İstanbul ve çevresinde, 15+ yıllık tecrübe.</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
            <Instagram className="h-4 w-4 text-[color:var(--amber)]" /> @fubayharita
          </a>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber)]">İletişim</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--amber)]" /><a href={`tel:${PHONE_TEL}`} className="hover:text-[color:var(--amber)]">{PHONE}</a></li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--amber)]" /><a href={MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-[color:var(--amber)]">{ADDRESS}</a></li>
            <li className="flex items-start gap-3"><Instagram className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--amber)]" /><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-[color:var(--amber)]">@fubayharita</a></li>
            <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--amber)]" /><span>Hafta içi 09:00 – 18:30</span></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--amber)]">Hızlı Bağlantılar</div>
          <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <li><a href="#hizmetler" className="hover:text-[color:var(--amber)]">Hizmetler</a></li>
            <li><a href="#neden-biz" className="hover:text-[color:var(--amber)]">Neden Biz</a></li>
            <li><a href="#yorumlar" className="hover:text-[color:var(--amber)]">Yorumlar</a></li>
            <li><a href="#ziyaret" className="hover:text-[color:var(--amber)]">Ziyaret</a></li>
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
