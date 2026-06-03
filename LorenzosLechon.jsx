import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────
const PRICES = [
  { size: "De Leche",   weight: "7–9 kg",    pax: "10 pax",  price: "₱7,000",  highlight: false },
  { size: "Small 1",    weight: "10–11 kg",  pax: "15 pax",  price: "₱8,000",  highlight: false },
  { size: "Small 2",    weight: "12–13 kg",  pax: "18 pax",  price: "₱8,300",  highlight: false },
  { size: "Regular",    weight: "14–16 kg",  pax: "25 pax",  price: "₱9,000",  highlight: false },
  { size: "Medium 1",   weight: "17–19 kg",  pax: "30 pax",  price: "₱9,400",  highlight: false },
  { size: "Medium 2",   weight: "20–21 kg",  pax: "35 pax",  price: "₱10,000", highlight: false },
  { size: "Large 1",    weight: "22–23 kg",  pax: "40 pax",  price: "₱10,500", highlight: false },
  { size: "Large 2",    weight: "24–26 kg",  pax: "50 pax",  price: "₱11,500", highlight: false },
  { size: "Xtra Large", weight: "27–29 kg",  pax: "60 pax",  price: "₱12,500", highlight: false },
  { size: "Jumbo 1",    weight: "30–32 kg",  pax: "70 pax",  price: "₱13,500", highlight: false },
  { size: "Jumbo 2",    weight: "33–35 kg",  pax: "80 pax",  price: "₱14,500", highlight: false },
  { size: "Fiesta 1",   weight: "36–38 kg",  pax: "90 pax",  price: "₱15,500", highlight: false },
  { size: "Fiesta 2",   weight: "39–40 kg",  pax: "100 pax", price: "₱16,500", highlight: true  },
];

const FEATURES = [
  { icon: "🔥", title: "Crispy Skin, Always", text: "Slow-roasted over charcoal for that signature shatter-crisp balat every single time." },
  { icon: "🐷", title: "Fresh & Clean",        text: "Only fresh, well-cleaned pigs — juicy, tender meat your guests will keep talking about." },
  { icon: "🚚", title: "Delivery in Lipa",     text: "We bring your lechon hot and ready straight to your celebration around Lipa City." },
  { icon: "💰", title: "Sulit na Presyo",      text: "Honest, affordable pricing by live weight — premium lechon without the premium markup." },
];

const STATS = [
  { num: "10", sup: "+", label: "Years Roasting" },
  { num: "5,000", sup: "+", label: "Lechon Served" },
  { num: "100", sup: "%", label: "Fresh Daily" },
  { num: "5.0", sup: "★", label: "Customer Rating" },
];

const STEPS = [
  { n: 1, title: "Choose Your Size",  text: "Pick the lechon size that fits your headcount from the price list above." },
  { n: 2, title: "Reserve Your Date", text: "Message or call us to book — pre-order ahead so we can secure your celebration." },
  { n: 3, title: "Enjoy the Feast",   text: "We deliver it hot, crispy, and fiesta-ready. Lutong-handa na ang lechon mo!" },
];

const GALLERY = [
  { src: "https://loremflickr.com/1200/675/lechon,roasted,pig?lock=31", alt: "Whole roasted lechon baboy with crispy golden skin", tag: "Crispy Skin", wide: true },
  { src: "https://loremflickr.com/600/600/lechon,filipino?lock=32",     alt: "Sliced lechon showing juicy tender meat",          tag: "Juicy Meat",  wide: false },
  { src: "https://loremflickr.com/600/600/roasted,pig,fiesta?lock=33",  alt: "Lechon served at a Filipino fiesta celebration",   tag: "Fiesta Ready",wide: false },
];

const REVIEWS = [
  { text: "Masarap at super crispy! Lahat ng bisita namin tinanong kung saan galing. Repeat order kami lagi!", author: "Maria Santos, Lipa City" },
  { text: "Nagamit namin sa debut ng anak ko. Ang sarap! Naubos agad kahit maraming pagkain pa. Sulit na sulit!", author: "Kuya Rodel, San Jose" },
  { text: "Grabe ang balat, so crispy! At ang baboy fresh at malinis. Legit na legit — recommended ko sa lahat!", author: "Ate Gina, Batangas City" },
];

// ─── PALETTE — FIRE (black base + amber→orange→red gradients) ──
const G = {
  amber:   "#FFC83D",
  orange:  "#FF7A18",
  red:     "#E11D2A",
  redDeep: "#A40E1B",
  orangeGlow: "rgba(255,122,24,0.40)",
  gradFire: "linear-gradient(120deg, #FFC83D 0%, #FF7A18 38%, #E11D2A 72%, #A40E1B 100%)",
  gradRed:  "linear-gradient(135deg, #FF4D2E, #E11D2A 55%, #A40E1B)",
  gradEmber:"linear-gradient(135deg, #FF7A18, #E11D2A)",
  black:   "#0B0B0C",
  charcoal:"#161618",
  charcoal2:"#1F1F22",
  panel:   "linear-gradient(160deg, #1a1518, #131013)",
  cream:   "#F6EFE8",
  text:    "#E9E7E4",
  muted:   "#A29E9A",
  line:    "rgba(255,255,255,0.08)",
  lineStrong:"rgba(255,255,255,0.16)",
  darkBg:  "#060607",
};

const LOGO = "download.png";

// reusable gradient-text style
const gradText = {
  background: G.gradFire, backgroundSize: "200% auto",
  WebkitBackgroundClip: "text", backgroundClip: "text",
  color: "transparent", animation: "gradientShift 7s ease infinite",
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;0,900;1,800&family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', system-ui, sans-serif; color: ${G.text}; overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    background-color: ${G.black}; position: relative;
  }
  img { display: block; max-width: 100%; }
  a:focus-visible, button:focus-visible { outline: 3px solid ${G.orange}; outline-offset: 3px; border-radius: 8px; }

  @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 ${G.orangeGlow}; }
    50%       { box-shadow: 0 0 0 13px rgba(255,122,24,0); }
  }
  @keyframes shimmer { from { transform: translateX(-120%); } to { transform: translateX(220%); } }
  @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes drift { from { transform: translate(-7%, -5%) scale(1); } to { transform: translate(7%, 6%) scale(1.18); } }
  @keyframes riseIn { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }

  /* living ember background */
  body::before {
    content:''; position: fixed; inset: 0; z-index: -2; pointer-events: none;
    background:
      radial-gradient(60% 50% at 82% -2%, rgba(255,122,24,0.22), transparent 60%),
      radial-gradient(55% 55% at -5% 32%, rgba(225,29,42,0.20), transparent 60%),
      radial-gradient(60% 55% at 50% 112%, rgba(255,200,61,0.13), transparent 60%);
  }
  body::after {
    content:''; position: fixed; inset: -25%; z-index: -1; pointer-events: none;
    background:
      radial-gradient(34% 34% at 30% 35%, rgba(255,122,24,0.14), transparent 70%),
      radial-gradient(30% 30% at 75% 65%, rgba(225,29,42,0.13), transparent 70%);
    animation: drift 24s ease-in-out infinite alternate;
  }

  .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-up.visible { opacity: 1; transform: none; }

  /* feature + step hovers */
  .feature-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
  .feature-card:hover { transform: translateY(-5px); border-color: rgba(255,122,24,0.45); box-shadow: 0 16px 38px rgba(225,29,42,0.2); }
  .step-row { transition: transform 0.3s ease, border-color 0.3s ease; }
  .step-row:hover { transform: translateX(5px); border-color: rgba(255,122,24,0.4); }
  .banner-btn { transition: transform 0.15s ease, box-shadow 0.25s; }
  .banner-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 38px rgba(0,0,0,0.45); }

  /* gallery hover animation */
  .gallery-item { transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease; }
  .gallery-item img { transition: transform 0.6s cubic-bezier(0.2,0.7,0.2,1), filter 0.4s ease; }
  .gallery-item::before {
    content:''; position:absolute; inset:0; z-index:1;
    background: linear-gradient(to top, rgba(164,14,27,0.55), rgba(255,122,24,0.12) 55%, transparent);
    opacity:0; transition: opacity 0.4s ease;
  }
  .gallery-item:hover { transform: translateY(-6px); border-color: rgba(255,122,24,0.5); box-shadow: 0 16px 40px rgba(225,29,42,0.28); }
  .gallery-item:hover img { transform: scale(1.12); filter: saturate(1.15) brightness(1.05); }
  .gallery-item:hover::before { opacity: 1; }
  .gallery-item .tag { transform: translateY(4px); opacity: 0.92; transition: transform 0.4s ease, opacity 0.4s ease, box-shadow 0.4s ease; }
  .gallery-item:hover .tag { transform: translateY(0); opacity: 1; box-shadow: 0 6px 18px rgba(225,29,42,0.5); }

  /* card + row hovers */
  .about-box { transition: transform 0.35s ease, box-shadow 0.35s ease; }
  .about-box:hover { transform: translateY(-4px); box-shadow: 0 16px 44px rgba(0,0,0,0.55); }
  .about-box img { transition: transform 0.6s cubic-bezier(0.2,0.7,0.2,1); }
  .about-box:hover img { transform: scale(1.07); }
  .review-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .review-card:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(225,29,42,0.18); }
  .nav-logo img { transition: transform 0.3s ease; }
  .nav-logo:hover img { transform: rotate(-6deg) scale(1.08); }

  @media (min-width: 560px) {
    .hero-btns { flex-direction: row !important; }
    .hero-btns a { flex: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
    html { scroll-behavior: auto; }
    .fade-up { opacity: 1; transform: none; }
  }
`;

// ─── HOOKS ───────────────────────────────────────────────
function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── COMPONENTS ──────────────────────────────────────────

function Navbar({ active }) {
  const links = [
    { href: "#home",    label: "Home" },
    { href: "#menu",    label: "Menu" },
    { href: "#contact", label: "Order" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(11,11,12,0.78)", backdropFilter: "blur(14px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 18px", borderBottom: `1px solid ${G.line}`,
    }}>
      <a className="nav-logo" href="#home" style={{
        display: "flex", alignItems: "center", gap: 9, textDecoration: "none",
        fontFamily: "'Playfair Display', serif", color: G.cream,
        fontSize: "1.05rem", fontWeight: 800, letterSpacing: "0.01em",
      }}>
        <img src={LOGO} alt="Lorenzo's Lechon logo" style={{
          width: 36, height: 36, borderRadius: "50%",
          border: `2px solid ${G.orange}`, objectFit: "cover",
        }} />
        Lorenzo's&nbsp;<b style={gradText}>Lechon</b>
      </a>

      <div style={{ display: "flex", gap: 4 }}>
        {links.map(({ href, label }) => {
          const isActive = active === href.slice(1);
          return (
            <a key={href} href={href} style={{
              color: isActive ? "#fff" : G.text,
              background: isActive ? G.gradRed : "transparent",
              textDecoration: "none", fontSize: "0.78rem", fontWeight: 700,
              padding: "7px 13px", borderRadius: 22,
              transition: "all 0.2s", letterSpacing: "0.05em", textTransform: "uppercase",
            }}>{label}</a>
          );
        })}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100svh", display: "flex", flexDirection: "column",
      justifyContent: "flex-end", position: "relative",
      padding: "28px 22px 120px", overflow: "hidden",
    }}>
      <div role="img" aria-label="Whole roasted crispy lechon baboy" style={{
        position: "absolute", inset: 0, backgroundColor: "#1a0606",
        background: `linear-gradient(to top, ${G.black} 4%, rgba(11,11,12,0.55) 45%, rgba(11,11,12,0.15) 100%),
                     url('https://loremflickr.com/1200/1600/lechon,roasted,pig?lock=21') center/cover no-repeat`,
        animation: "heroZoom 18s ease-in-out infinite alternate",
      }} />

      <span style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        background: G.gradEmber, backgroundSize: "180% auto", color: "#fff",
        fontSize: "0.7rem", fontWeight: 800,
        letterSpacing: "0.14em", textTransform: "uppercase",
        padding: "6px 15px", borderRadius: 30,
        marginBottom: 16, width: "fit-content", position: "relative",
        animation: "pulse 2.6s ease-in-out infinite, gradientShift 6s ease infinite",
      }}>🔥 Now Accepting Orders</span>

      <h1 style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 900,
        fontSize: "clamp(2.5rem, 9.5vw, 4.2rem)", lineHeight: 1.04,
        color: G.cream, position: "relative", marginBottom: 14,
        textShadow: "0 2px 24px rgba(0,0,0,0.6)",
      }}>
        Affordable &amp; Delicious.
        <em style={{ ...gradText, fontStyle: "italic", display: "block" }}>
          Lechon for Everyone!
        </em>
      </h1>

      <p style={{
        fontSize: "1.02rem", color: "rgba(246,239,232,0.88)", fontWeight: 500,
        maxWidth: 340, lineHeight: 1.55, marginBottom: 30, position: "relative",
      }}>
        Crispy skin, juicy meat — authentic Filipino lechon baboy for birthdays, fiestas, or just because.
      </p>

      <div className="hero-btns" style={{
        display: "flex", flexDirection: "column", gap: 12,
        maxWidth: 380, position: "relative",
      }}>
        <a href="#menu" style={{
          background: G.gradFire, backgroundSize: "200% auto",
          animation: "gradientShift 6s ease infinite",
          color: "#fff", border: "none", padding: "17px 28px",
          borderRadius: 14, fontSize: "1.02rem", fontWeight: 700,
          cursor: "pointer", textDecoration: "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
          boxShadow: `0 8px 32px ${G.orangeGlow}`,
        }}>🔥 See Price List</a>
        <a href="#contact" style={{
          background: "rgba(255,255,255,0.04)", color: G.cream,
          border: `1.5px solid ${G.lineStrong}`,
          padding: "17px 28px", borderRadius: 14,
          fontSize: "1.02rem", fontWeight: 700, cursor: "pointer",
          textDecoration: "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
        }}>📞 Contact Us</a>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, highlight, center }) {
  return (
    <div style={center ? { textAlign: "center" } : undefined}>
      <p style={{
        ...gradText, animation: "none",
        fontSize: "0.72rem", fontWeight: 800,
        letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10,
      }}>{eyebrow}</p>
      <h2 style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 800,
        fontSize: "clamp(1.9rem, 6.5vw, 2.7rem)",
        color: G.cream, lineHeight: 1.12, marginBottom: 6,
      }}>
        {title} <span style={gradText}>{highlight}</span>
      </h2>
      <div style={{
        width: 56, height: 4, background: G.gradFire, backgroundSize: "200% auto",
        animation: "gradientShift 5s linear infinite",
        borderRadius: 3, margin: center ? "16px auto 30px" : "16px 0 30px",
      }} />
    </div>
  );
}

function Features() {
  return (
    <section id="why" style={{ padding: "64px 22px" }}>
      <SectionHeader eyebrow="Why Lorenzo's" title="The" highlight="Crispy Choice" center />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 540, margin: "0 auto" }}>
        {FEATURES.map((f, i) => {
          const ref = useFadeUp();
          return (
            <div key={i} ref={ref} className="fade-up feature-card" style={{
              background: G.panel, border: `1px solid ${G.line}`, borderRadius: 18, padding: "22px 18px",
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14, display: "grid", placeItems: "center",
                fontSize: "1.5rem", background: G.gradEmber, marginBottom: 14,
                boxShadow: `0 8px 22px ${G.orangeGlow}`,
              }} aria-hidden="true">{f.icon}</div>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: G.cream, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: "0.85rem", color: G.muted, lineHeight: 1.55 }}>{f.text}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Stats() {
  const ref = useFadeUp();
  return (
    <section id="stats" style={{ padding: "20px 22px 44px" }}>
      <div ref={ref} className="fade-up" style={{
        maxWidth: 540, margin: "0 auto",
        background: G.gradRed, backgroundSize: "200% auto", animation: "gradientShift 9s ease infinite",
        borderRadius: 22, padding: "26px 18px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 8px",
        boxShadow: "0 16px 44px rgba(225,29,42,0.28)",
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
              {s.num}<span style={{ fontSize: "1.2rem" }}>{s.sup}</span>
            </div>
            <div style={{ fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.85)", marginTop: 6 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowToOrder() {
  return (
    <section id="how" style={{ padding: "64px 22px" }}>
      <SectionHeader eyebrow="Easy as 1-2-3" title="How to" highlight="Order" center />
      <div style={{ maxWidth: 540, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
        {STEPS.map((s, i) => {
          const ref = useFadeUp();
          return (
            <div key={i} ref={ref} className="fade-up step-row" style={{
              display: "flex", alignItems: "flex-start", gap: 16,
              background: G.panel, border: `1px solid ${G.line}`, borderRadius: 18, padding: "18px 20px",
            }}>
              <div style={{
                flexShrink: 0, width: 42, height: 42, borderRadius: "50%", display: "grid", placeItems: "center",
                fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.2rem", color: "#fff",
                background: G.gradFire, backgroundSize: "200% auto", animation: "gradientShift 6s ease infinite",
                boxShadow: `0 6px 18px ${G.orangeGlow}`,
              }}>{s.n}</div>
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: G.cream, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: "0.86rem", color: G.muted, lineHeight: 1.55 }}>{s.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CtaBanner() {
  const ref = useFadeUp();
  return (
    <section id="cta" style={{ padding: "44px 22px" }}>
      <div ref={ref} className="fade-up" style={{
        maxWidth: 540, margin: "0 auto", position: "relative", overflow: "hidden",
        borderRadius: 22, border: "1px solid rgba(255,122,24,0.3)",
        padding: "44px 26px", textAlign: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: -1,
          background: `linear-gradient(135deg, rgba(164,14,27,0.86), rgba(255,122,24,0.6)),
                       url('https://loremflickr.com/1000/600/lechon,roasted,pig?lock=51') center/cover no-repeat`,
        }} />
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: "clamp(1.7rem, 6.5vw, 2.4rem)", color: "#fff",
          lineHeight: 1.15, marginBottom: 10, textShadow: "0 2px 18px rgba(0,0,0,0.5)",
        }}>Make Your Fiesta Unforgettable</h2>
        <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "0.95rem", marginBottom: 22, maxWidth: 360, marginInline: "auto" }}>
          Book your crispy, juicy lechon today and give your guests something to remember.
        </p>
        <a href="#contact" className="banner-btn" style={{
          display: "inline-flex", alignItems: "center", gap: 9,
          background: "#fff", color: G.redDeep, fontWeight: 800, fontSize: "1rem", textDecoration: "none",
          padding: "15px 30px", borderRadius: 40, boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}>🔥 Reserve Your Lechon</a>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" style={{ padding: "66px 22px" }}>
      <SectionHeader eyebrow="Fresh from the Fire" title="Our" highlight="Lechon" />
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
        maxWidth: 520, margin: "0 auto",
      }}>
        {GALLERY.map((g, i) => {
          const ref = useFadeUp();
          return (
            <figure key={i} ref={ref} className="fade-up gallery-item" style={{
              position: "relative", borderRadius: 18, overflow: "hidden",
              border: `1px solid ${G.line}`, background: G.charcoal,
              gridColumn: g.wide ? "span 2" : "auto",
              aspectRatio: g.wide ? "16 / 9" : "1 / 1",
            }}>
              <img src={g.src} alt={g.alt} loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <figcaption className="tag" style={{
                position: "absolute", left: 12, bottom: 12, zIndex: 2,
                background: G.gradEmber, color: "#fff",
                fontSize: "0.68rem", fontWeight: 800,
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "5px 12px", borderRadius: 20,
              }}>{g.tag}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function PriceTable() {
  const ref = useFadeUp();
  const [hovered, setHovered] = useState(null);
  return (
    <section id="menu" style={{ padding: "66px 22px" }}>
      <SectionHeader eyebrow="Our Offerings" title="Price" highlight="List" />
      <div ref={ref} className="fade-up" style={{
        maxWidth: 520, margin: "0 auto", borderRadius: 22, overflow: "hidden",
        border: `1px solid ${G.line}`, boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1.3fr 1fr 0.9fr",
          background: G.gradRed, backgroundSize: "200% auto",
          animation: "gradientShift 7s ease infinite",
          padding: "13px 18px", fontSize: "0.7rem", fontWeight: 800,
          letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff",
        }}>
          <span>Size</span>
          <span style={{ textAlign: "center" }}>Good For</span>
          <span style={{ textAlign: "right" }}>Price</span>
        </div>

        {PRICES.map((row, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "grid", gridTemplateColumns: "1.3fr 1fr 0.9fr", alignItems: "center",
              padding: "13px 18px",
              transform: hovered === i ? "translateX(4px)" : "none",
              background: row.highlight
                ? "linear-gradient(135deg, rgba(255,122,24,0.22), rgba(225,29,42,0.18))"
                : hovered === i
                  ? "rgba(255,122,24,0.12)"
                  : (i % 2 === 0 ? G.charcoal : G.charcoal2),
              borderBottom: i < PRICES.length - 1 ? `1px solid ${G.line}` : "none",
              transition: "background 0.25s, transform 0.2s",
            }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: G.cream }}>{row.size}</span>
              <span style={{ fontSize: "0.75rem", color: G.muted, fontWeight: 500, marginTop: 2 }}>{row.weight}</span>
            </div>
            <span style={{ fontSize: "0.82rem", color: G.text, fontWeight: 600, textAlign: "center" }}>
              {row.pax}
            </span>
            <span style={{ ...gradText, animation: "none", fontSize: "0.98rem", fontWeight: 800, textAlign: "right" }}>
              {row.price}
            </span>
          </div>
        ))}
      </div>
      <p style={{ maxWidth: 520, margin: "14px auto 0", fontSize: "0.8rem", color: G.muted, textAlign: "center" }}>
        Prices based on live weight · Pre-order required to secure your date
      </p>
    </section>
  );
}

function About() {
  const ref = useFadeUp();
  return (
    <section id="about" style={{ padding: "66px 22px" }}>
      <SectionHeader eyebrow="Our Story" title="Made with" highlight="Love & Fire" />
      <div ref={ref} className="fade-up about-box" style={{
        background: G.charcoal, border: `1px solid ${G.line}`, borderRadius: 22,
        overflow: "hidden", maxWidth: 520, margin: "0 auto",
      }}>
        <img src="https://loremflickr.com/800/520/lechon,roasted,pig?lock=41"
          alt="Lorenzo's Lechon freshly roasted over coals" loading="lazy"
          style={{ width: "100%", height: 220, objectFit: "cover" }} />
        <div style={{ padding: "24px 22px" }}>
          <p style={{ fontSize: "0.96rem", color: G.text, lineHeight: 1.75, marginBottom: 22 }}>
            Affordable and delicious lechon for every occasion. Whether it's a birthday, fiesta, or grand celebration —
            Lorenzo's Lechon is here to make your event truly special with crispy, juicy, and authentic Filipino lechon.
          </p>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "rgba(255,122,24,0.1)", border: "1px solid rgba(255,122,24,0.3)",
            borderRadius: 14, padding: "13px 16px",
          }}>
            <span style={{ fontSize: "1.4rem" }} aria-hidden="true">📍</span>
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: G.cream }}>Antipolo del Norte, Lipa City</div>
              <div style={{ fontSize: "0.78rem", color: G.muted }}>Batangas, Philippines</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" style={{ padding: "66px 22px" }}>
      <SectionHeader eyebrow="What Customers Say" title="Mga" highlight="Patunay" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520, margin: "0 auto" }}>
        {REVIEWS.map((r, i) => {
          const ref = useFadeUp();
          return (
            <div key={i} ref={ref} className="fade-up review-card" style={{
              position: "relative", overflow: "hidden",
              background: G.charcoal, border: `1px solid ${G.line}`,
              borderRadius: 18, padding: "20px 22px 20px 25px",
            }}>
              <span style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
                background: G.gradFire, backgroundSize: "auto 200%",
                animation: "gradientShift 6s ease infinite",
              }} />
              <div style={{ ...gradText, animation: "none", fontSize: "1rem", marginBottom: 10, letterSpacing: 2 }}
                aria-label="5 out of 5 stars">★★★★★</div>
              <p style={{ fontSize: "0.92rem", color: G.text, lineHeight: 1.65, marginBottom: 12 }}>
                "{r.text}"
              </p>
              <div style={{ fontSize: "0.76rem", fontWeight: 800, color: G.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                — {r.author}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  const refFb  = useFadeUp();
  const refSms = useFadeUp();
  const refCall= useFadeUp();

  const btnBase = {
    color: "#fff", border: "none", padding: "18px 24px", borderRadius: 15,
    fontSize: "1.02rem", fontWeight: 700, cursor: "pointer", textDecoration: "none",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
    letterSpacing: "0.01em", transition: "transform 0.15s, filter 0.2s",
  };

  return (
    <section id="contact" style={{ padding: "66px 22px" }}>
      <SectionHeader eyebrow="Ready to Order?" title="Mag-" highlight="Order Na!" />
      <p style={{ fontSize: "0.96rem", color: G.text, lineHeight: 1.65, maxWidth: 360, marginBottom: 30 }}>
        Makipag-ugnayan sa amin para mag-reserve ng inyong lechon. Paunang pag-book para matiyak ang availability.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 13, maxWidth: 520, margin: "0 auto" }}>
        <a ref={refFb} className="fade-up"
          href="https://www.facebook.com/lorenzoslechonlipa"
          style={{ ...btnBase, background: "linear-gradient(135deg, #2D88FF, #1877F2)" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Lorenzo's Lechon House
        </a>
        <a ref={refSms} className="fade-up"
          href="sms:+639970665673"
          style={{ ...btnBase, background: G.charcoal2, border: `1.5px solid ${G.lineStrong}` }}>
          💬 Text Us – 0997-066-5673
        </a>
        <a ref={refCall} className="fade-up"
          href="tel:+639970665673"
          style={{ ...btnBase, background: G.gradFire, backgroundSize: "200% auto", animation: "gradientShift 6s ease infinite", boxShadow: `0 8px 28px ${G.orangeGlow}` }}>
          📞 Call – 0997-066-5673
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: G.darkBg, padding: "32px 22px 130px",
      textAlign: "center", borderTop: `1px solid ${G.line}`,
    }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 9,
        fontFamily: "'Playfair Display', serif", fontSize: "1.35rem",
        fontWeight: 900, color: G.cream, marginBottom: 8,
      }}>
        <img src={LOGO} alt="" style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${G.orange}`, animation: "floaty 4s ease-in-out infinite" }} />
        Lorenzo's Lechon
      </div>
      <p style={{ fontSize: "0.8rem", color: G.muted }}>
        Antipolo del Norte, Lipa City · Open Daily · Pre-order required
      </p>
    </footer>
  );
}

function StickyBar() {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(11,11,12,0.9)", backdropFilter: "blur(16px)",
      borderTop: `1px solid ${G.line}`,
      display: "flex", gap: 10, padding: "11px 16px",
    }}>
      <a href="#menu" style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        padding: "13px 8px", borderRadius: 12, fontSize: "0.82rem", fontWeight: 800,
        textDecoration: "none", color: "#fff",
        background: G.gradFire, backgroundSize: "200% auto", animation: "gradientShift 6s ease infinite",
      }}>🔥 See Prices</a>
      <a href="tel:+639970665673" style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        padding: "13px 8px", borderRadius: 12, fontSize: "0.82rem", fontWeight: 800,
        textDecoration: "none", color: "#fff",
        background: "rgba(255,255,255,0.07)", border: `1.5px solid ${G.lineStrong}`,
      }}>📞 Call Now</a>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const onScroll = () => {
      let current = "home";
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 80) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{globalCSS}</style>

      <Navbar active={activeSection} />
      <Hero />
      <Features />
      <Gallery />
      <Stats />
      <PriceTable />
      <HowToOrder />
      <About />
      <Reviews />
      <CtaBanner />
      <Contact />
      <Footer />
      <StickyBar />
    </>
  );
}
