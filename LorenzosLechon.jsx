import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────
const PRICES = [
  { size: "De Leche",   weight: "7–9 kg",    price: "₱7,000",  highlight: false },
  { size: "Small 1",    weight: "10–11 kg",  price: "₱8,000",  highlight: false },
  { size: "Small 2",    weight: "12–13 kg",  price: "₱8,300",  highlight: false },
  { size: "Regular",    weight: "14–16 kg",  price: "₱9,000",  highlight: false },
  { size: "Medium 1",   weight: "17–19 kg",  price: "₱9,400",  highlight: false },
  { size: "Medium 2",   weight: "20–21 kg",  price: "₱10,000", highlight: false },
  { size: "Large 1",    weight: "22–23 kg",  price: "₱10,500", highlight: false },
  { size: "Large 2",    weight: "24–26 kg",  price: "₱11,500", highlight: false },
  { size: "Xtra Large", weight: "27–29 kg",  price: "₱12,500", highlight: false },
  { size: "Jumbo 1",    weight: "30–32 kg",  price: "₱13,500", highlight: false },
  { size: "Jumbo 2",    weight: "33–35 kg",  price: "₱14,500", highlight: false },
  { size: "Fiesta 1",   weight: "36–38 kg",  price: "₱15,500", highlight: false },
  { size: "Fiesta 2",   weight: "39–40 kg",  price: "₱16,500", highlight: true  },
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

// ─── PALETTE — RED & BLACK ───────────────────────────────
const G = {
  red:     "#E11D2A",
  redDeep: "#A40E1B",
  redGlow: "rgba(225,29,42,0.45)",
  black:   "#0B0B0C",
  charcoal:"#151517",
  charcoal2:"#1E1E21",
  cream:   "#F4EDE6",
  text:    "#E9E7E4",
  muted:   "#A29E9A",
  line:    "rgba(255,255,255,0.08)",
  lineStrong:"rgba(255,255,255,0.16)",
  darkBg:  "#060607",
};

const LOGO = "download.png";

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;0,900;1,800&family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', system-ui, sans-serif; background: ${G.black}; color: ${G.text}; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
  img { display: block; max-width: 100%; }
  a:focus-visible, button:focus-visible { outline: 3px solid ${G.red}; outline-offset: 3px; border-radius: 8px; }
  @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.07); } }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 ${G.redGlow}; }
    50%       { box-shadow: 0 0 0 12px rgba(225,29,42,0); }
  }
  .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-up.visible { opacity: 1; transform: none; }
  .gallery-item img { transition: transform 0.5s ease; }
  .gallery-item:hover img { transform: scale(1.07); }
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
      background: "rgba(11,11,12,0.82)", backdropFilter: "blur(14px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 18px", borderBottom: `1px solid ${G.line}`,
    }}>
      <a href="#home" style={{
        display: "flex", alignItems: "center", gap: 9, textDecoration: "none",
        fontFamily: "'Playfair Display', serif", color: G.cream,
        fontSize: "1.05rem", fontWeight: 800, letterSpacing: "0.01em",
      }}>
        <img src={LOGO} alt="Lorenzo's Lechon logo" style={{
          width: 34, height: 34, borderRadius: "50%",
          border: `1.5px solid ${G.red}`, objectFit: "cover",
        }} />
        Lorenzo's&nbsp;<b style={{ color: G.red }}>Lechon</b>
      </a>

      <div style={{ display: "flex", gap: 4 }}>
        {links.map(({ href, label }) => {
          const isActive = active === href.slice(1);
          return (
            <a key={href} href={href} style={{
              color: isActive ? "#fff" : G.text,
              background: isActive ? G.red : "transparent",
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
      {/* BG — real lechon photo */}
      <div role="img" aria-label="Whole roasted crispy lechon baboy" style={{
        position: "absolute", inset: 0, backgroundColor: "#1a0606",
        background: `linear-gradient(to top, ${G.black} 4%, rgba(11,11,12,0.65) 45%, rgba(11,11,12,0.25) 100%),
                     url('https://loremflickr.com/1200/1600/lechon,roasted,pig?lock=21') center/cover no-repeat`,
        animation: "heroZoom 16s ease-in-out infinite alternate",
      }} />

      {/* Badge */}
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        background: G.red, color: "#fff",
        fontSize: "0.7rem", fontWeight: 800,
        letterSpacing: "0.14em", textTransform: "uppercase",
        padding: "6px 15px", borderRadius: 30,
        marginBottom: 16, width: "fit-content", position: "relative",
        animation: "pulse 2.6s ease-in-out infinite",
      }}>🔥 Now Accepting Orders</span>

      {/* Title */}
      <h1 style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 900,
        fontSize: "clamp(2.5rem, 9.5vw, 4.2rem)", lineHeight: 1.04,
        color: G.cream, position: "relative", marginBottom: 14,
        textShadow: "0 2px 24px rgba(0,0,0,0.6)",
      }}>
        Affordable &amp; Delicious.
        <em style={{ fontStyle: "italic", color: G.red, display: "block" }}>
          Lechon for Everyone!
        </em>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: "1.02rem", color: "rgba(244,237,230,0.86)", fontWeight: 500,
        maxWidth: 340, lineHeight: 1.55, marginBottom: 30, position: "relative",
      }}>
        Crispy skin, juicy meat — authentic Filipino lechon baboy for birthdays, fiestas, or just because.
      </p>

      {/* Buttons */}
      <div className="hero-btns" style={{
        display: "flex", flexDirection: "column", gap: 12,
        maxWidth: 380, position: "relative",
      }}>
        <a href="#menu" style={{
          background: `linear-gradient(135deg, ${G.red}, ${G.redDeep})`,
          color: "#fff", border: "none", padding: "17px 28px",
          borderRadius: 14, fontSize: "1.02rem", fontWeight: 700,
          cursor: "pointer", textDecoration: "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
          boxShadow: `0 8px 30px ${G.redGlow}`,
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

function SectionHeader({ eyebrow, title, highlight }) {
  return (
    <>
      <p style={{
        fontSize: "0.72rem", fontWeight: 800,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: G.red, marginBottom: 10,
      }}>{eyebrow}</p>
      <h2 style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 800,
        fontSize: "clamp(1.9rem, 6.5vw, 2.7rem)",
        color: G.cream, lineHeight: 1.12, marginBottom: 6,
      }}>
        {title} <span style={{ color: G.red }}>{highlight}</span>
      </h2>
      <div style={{
        width: 54, height: 3, background: G.red,
        borderRadius: 2, margin: "16px 0 30px",
      }} />
    </>
  );
}

function Gallery() {
  return (
    <section id="gallery" style={{ padding: "66px 22px", background: G.black }}>
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
              <figcaption style={{
                position: "absolute", left: 12, bottom: 12,
                background: G.red, color: "#fff",
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
    <section id="menu" style={{ padding: "66px 22px", background: G.black }}>
      <SectionHeader eyebrow="Our Offerings" title="Price" highlight="List" />
      <div ref={ref} className="fade-up" style={{
        maxWidth: 520, margin: "0 auto", borderRadius: 22, overflow: "hidden",
        border: `1px solid ${G.line}`, boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
      }}>
        {/* Header row */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr",
          background: `linear-gradient(135deg, ${G.red}, ${G.redDeep})`,
          padding: "13px 18px", fontSize: "0.7rem", fontWeight: 800,
          letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff",
        }}>
          <span>Size</span>
          <span style={{ textAlign: "center" }}>Live Weight</span>
          <span style={{ textAlign: "right" }}>Price</span>
        </div>

        {PRICES.map((row, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", alignItems: "center",
              padding: "13px 18px",
              background: row.highlight
                ? "linear-gradient(135deg, rgba(225,29,42,0.22), rgba(164,14,27,0.16))"
                : hovered === i
                  ? "rgba(225,29,42,0.1)"
                  : (i % 2 === 0 ? G.charcoal : G.charcoal2),
              borderBottom: i < PRICES.length - 1 ? `1px solid ${G.line}` : "none",
              transition: "background 0.2s",
            }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: G.cream }}>
              {row.size}
            </span>
            <span style={{ fontSize: "0.82rem", color: G.muted, fontWeight: 500, textAlign: "center" }}>
              {row.weight}
            </span>
            <span style={{ fontSize: "0.98rem", fontWeight: 800, color: G.red, textAlign: "right" }}>
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
    <section id="about" style={{ padding: "66px 22px", background: G.black }}>
      <SectionHeader eyebrow="Our Story" title="Made with" highlight="Love & Fire" />
      <div ref={ref} className="fade-up" style={{
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
            background: "rgba(225,29,42,0.1)", border: "1px solid rgba(225,29,42,0.3)",
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
    <section id="reviews" style={{ padding: "66px 22px", background: G.black }}>
      <SectionHeader eyebrow="What Customers Say" title="Mga" highlight="Patunay" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520, margin: "0 auto" }}>
        {REVIEWS.map((r, i) => {
          const ref = useFadeUp();
          return (
            <div key={i} ref={ref} className="fade-up" style={{
              background: G.charcoal, border: `1px solid ${G.line}`,
              borderLeft: `3px solid ${G.red}`, borderRadius: 18, padding: "20px 22px",
            }}>
              <div style={{ color: G.red, fontSize: "1rem", marginBottom: 10, letterSpacing: 2 }}
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
    <section id="contact" style={{ padding: "66px 22px", background: G.black }}>
      <SectionHeader eyebrow="Ready to Order?" title="Mag-" highlight="Order Na!" />
      <p style={{ fontSize: "0.96rem", color: G.text, lineHeight: 1.65, maxWidth: 360, marginBottom: 30 }}>
        Makipag-ugnayan sa amin para mag-reserve ng inyong lechon. Paunang pag-book para matiyak ang availability.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 13, maxWidth: 520, margin: "0 auto" }}>
        <a ref={refFb} className="fade-up"
          href="https://www.facebook.com/lorenzoslechonlipa"
          style={{ ...btnBase, background: "#1877F2" }}>
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
          style={{ ...btnBase, background: `linear-gradient(135deg, ${G.red}, ${G.redDeep})`, boxShadow: `0 8px 28px ${G.redGlow}` }}>
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
        <img src={LOGO} alt="" style={{ width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${G.red}` }} />
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
      background: "rgba(11,11,12,0.92)", backdropFilter: "blur(16px)",
      borderTop: `1px solid ${G.line}`,
      display: "flex", gap: 10, padding: "11px 16px",
    }}>
      <a href="#menu" style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        padding: "13px 8px", borderRadius: 12, fontSize: "0.82rem", fontWeight: 800,
        textDecoration: "none", color: "#fff",
        background: `linear-gradient(135deg, ${G.red}, ${G.redDeep})`,
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
      <Gallery />
      <PriceTable />
      <About />
      <Reviews />
      <Contact />
      <Footer />
      <StickyBar />
    </>
  );
}
