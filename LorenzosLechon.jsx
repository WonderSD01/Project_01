import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────
const PRICES = [
  { size: "De Leche",   weight: "7–9 kg",    price: "₱7,000",  highlight: false },
  { size: "Small 1",    weight: "10–11 kg",  price: "₱8,000",  highlight: false },
  { size: "Small 2",    weight: "12–13 kg",  price: "₱8,300",  highlight: false },
  { size: "Regular",    weight: "14–16 kg",  price: "₱9,000",  highlight: false },
  { size: "Medium 1",   weight: "17–19 kls", price: "₱9,400",  highlight: false },
  { size: "Medium 2",   weight: "20–21 kls", price: "₱10,000", highlight: false },
  { size: "Large 1",    weight: "22–23 kls", price: "₱10,500", highlight: false },
  { size: "Large 2",    weight: "24–26 kls", price: "₱11,500", highlight: false },
  { size: "Xtra Large", weight: "27–29 kls", price: "₱12,500", highlight: false },
  { size: "Jumbo 1",    weight: "30–32 kls", price: "₱13,500", highlight: false },
  { size: "Jumbo 2",    weight: "33–35 kls", price: "₱14,500", highlight: false },
  { size: "Fiesta 1",   weight: "36–38 kls", price: "₱15,500", highlight: false },
  { size: "Fiesta 2",   weight: "39–40 kls", price: "₱16,500", highlight: true  },
];

const REVIEWS = [
  { text: "Masarap at super crispy! Lahat ng bisita namin tinanong kung saan galing. Repeat order kami lagi!", author: "Maria Santos, Lipa City" },
  { text: "Nagamit namin sa debut ng anak ko. Ang sarap! Naubos agad kahit maraming pagkain pa. Sulit na sulit!", author: "Kuya Rodel, San Jose" },
  { text: "Grabe ang balat, so crispy! At ang baboy fresh at malinis. Legit na legit — recommended ko sa lahat!", author: "Ate Gina, Batangas City" },
];

// ─── STYLES ──────────────────────────────────────────────
const G = {
  fire:   "#C8400A",
  gold:   "#E8A020",
  smoke:  "#2A1005",
  cream:  "#FDF0DC",
  dark1:  "#1E0C04",
  dark2:  "#2C1206",
  darkBg: "#0E0502",
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@400;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Nunito', sans-serif; background: ${G.smoke}; overflow-x: hidden; }
  @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.06); } }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(200,64,10,0.5); }
    50%       { box-shadow: 0 0 0 10px rgba(200,64,10,0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .fade-up.visible { opacity: 1; transform: none; }
  @media (min-width: 540px) {
    .hero-btns { flex-direction: row !important; }
    .hero-btns a { flex: 1; }
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
      background: "rgba(28,10,2,0.92)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 20px", borderBottom: `2px solid ${G.gold}`,
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif", color: G.gold,
        fontSize: "1.15rem", fontWeight: 900, letterSpacing: "0.02em",
      }}>🐷 Lorenzo's Lechon</div>

      <div style={{ display: "flex", gap: 6 }}>
        {links.map(({ href, label }) => (
          <a key={href} href={href} style={{
            color: active === href.slice(1) ? G.gold : G.cream,
            textDecoration: "none", fontSize: "0.82rem", fontWeight: 700,
            padding: "6px 12px", borderRadius: 20,
            border: `1.5px solid ${active === href.slice(1) ? G.gold : "transparent"}`,
            transition: "all 0.2s", letterSpacing: "0.04em", textTransform: "uppercase",
          }}>{label}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100svh", display: "flex", flexDirection: "column",
      justifyContent: "flex-end", position: "relative",
      padding: "28px 20px 110px", overflow: "hidden",
    }}>
      {/* BG */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to top, rgba(28,10,2,0.97) 0%, rgba(28,10,2,0.55) 50%, rgba(28,10,2,0.2) 100%),
                     url('https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80') center/cover no-repeat`,
        animation: "heroZoom 14s ease-in-out infinite alternate",
      }} />

      {/* Badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: G.fire, color: "white",
        fontSize: "0.72rem", fontWeight: 800,
        letterSpacing: "0.12em", textTransform: "uppercase",
        padding: "5px 14px", borderRadius: 30,
        marginBottom: 14, width: "fit-content", position: "relative",
        animation: "pulse 2.5s ease-in-out infinite",
      }}>🔥 Now Accepting Orders</div>

      {/* Title */}
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2.4rem, 9vw, 4rem)", lineHeight: 1.05,
        color: G.cream, position: "relative", marginBottom: 12,
      }}>
        Affordable &amp; Delicious.
        <em style={{ fontStyle: "italic", color: G.gold, display: "block" }}>
          Lechon for Everyone!
        </em>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: "1rem", color: "rgba(255,245,230,0.82)", fontWeight: 600,
        maxWidth: 320, lineHeight: 1.5, marginBottom: 28, position: "relative",
      }}>
        Crispy, Juicy Lechon for Every Occasion — birthdays, fiestas, or just because.
      </p>

      {/* Buttons */}
      <div className="hero-btns" style={{
        display: "flex", flexDirection: "column", gap: 12,
        maxWidth: 360, position: "relative",
      }}>
        <a href="#menu" style={{
          background: `linear-gradient(135deg, ${G.fire}, #E05010)`,
          color: "white", border: "none", padding: "17px 28px",
          borderRadius: 14, fontSize: "1.05rem", fontWeight: 800,
          cursor: "pointer", textDecoration: "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: "0 6px 28px rgba(200,64,10,0.5)",
        }}>🔥 See Price List</a>
        <a href="#contact" style={{
          background: "transparent", color: G.cream,
          border: "2px solid rgba(255,245,230,0.4)",
          padding: "15px 28px", borderRadius: 14,
          fontSize: "1rem", fontWeight: 700, cursor: "pointer",
          textDecoration: "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
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
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: G.gold, marginBottom: 8,
      }}>{eyebrow}</p>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.8rem, 6vw, 2.6rem)",
        color: G.cream, lineHeight: 1.15, marginBottom: 6,
      }}>
        {title} <span style={{ color: G.gold }}>{highlight}</span>
      </h2>
      <div style={{
        width: 50, height: 3,
        background: `linear-gradient(to right, ${G.fire}, ${G.gold})`,
        borderRadius: 2, margin: "14px 0 28px",
      }} />
    </>
  );
}

function PriceTable() {
  const ref = useFadeUp();
  const [hovered, setHovered] = useState(null);
  return (
    <section id="menu" style={{ padding: "60px 20px", background: G.smoke }}>
      <SectionHeader eyebrow="Our Offerings" title="Price" highlight="List" />
      <div ref={ref} className="fade-up" style={{
        maxWidth: 480, margin: "0 auto", borderRadius: 20, overflow: "hidden",
        border: "1px solid rgba(232,160,32,0.25)",
        boxShadow: "0 4px 28px rgba(0,0,0,0.4)",
      }}>
        {/* Header row */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          background: `linear-gradient(135deg, ${G.fire}, #A03008)`,
          padding: "12px 16px", fontSize: "0.72rem", fontWeight: 800,
          letterSpacing: "0.12em", textTransform: "uppercase", color: "white",
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
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              padding: "11px 16px",
              background: row.highlight
                ? "linear-gradient(135deg, rgba(232,160,32,0.18), rgba(200,64,10,0.14))"
                : hovered === i
                  ? "rgba(232,160,32,0.09)"
                  : `linear-gradient(135deg, ${G.dark1}, #2A1005)`,
              borderBottom: i < PRICES.length - 1 ? "1px solid rgba(232,160,32,0.1)" : "none",
              transition: "background 0.2s",
            }}>
            <span style={{ fontSize: "0.88rem", fontWeight: 700, color: row.highlight ? G.gold : G.cream }}>
              {row.size}
            </span>
            <span style={{ fontSize: "0.82rem", color: "rgba(255,245,230,0.6)", fontWeight: 600, textAlign: "center" }}>
              {row.weight}
            </span>
            <span style={{ fontSize: "0.92rem", fontWeight: 800, color: G.gold, textAlign: "right" }}>
              {row.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const ref = useFadeUp();
  return (
    <section id="about" style={{
      padding: "60px 20px",
      background: `linear-gradient(180deg, ${G.smoke} 0%, #1A0A02 100%)`,
    }}>
      <SectionHeader eyebrow="Our Story" title="Made with" highlight="Love & Fire" />
      <div ref={ref} className="fade-up" style={{
        background: `linear-gradient(135deg, ${G.dark1}, ${G.dark2})`,
        border: "1px solid rgba(232,160,32,0.2)", borderRadius: 20,
        padding: "24px 20px", maxWidth: 480, margin: "0 auto",
      }}>
        <p style={{ fontSize: "0.95rem", color: "rgba(255,245,230,0.8)", lineHeight: 1.7, marginBottom: 20 }}>
          Affordable and delicious lechon for every occasion. Whether it's a birthday, fiesta, or grand celebration —
          Lorenzo's Lechon is here to make your event truly special with crispy, juicy, and authentic Filipino lechon.
        </p>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(232,160,32,0.12)", border: "1px solid rgba(232,160,32,0.3)",
          borderRadius: 12, padding: "12px 16px",
        }}>
          <span style={{ fontSize: "1.3rem" }}>📍</span>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: G.gold }}>Antipolo del Norte, Lipa City</div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,245,230,0.55)" }}>Batangas, Philippines</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" style={{ padding: "60px 20px", background: G.smoke }}>
      <SectionHeader eyebrow="What Customers Say" title="Mga" highlight="Patunay" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480, margin: "0 auto" }}>
        {REVIEWS.map((r, i) => {
          const ref = useFadeUp();
          return (
            <div key={i} ref={ref} className="fade-up" style={{
              background: `linear-gradient(135deg, ${G.dark1}, ${G.dark2})`,
              border: "1px solid rgba(232,160,32,0.18)", borderRadius: 18, padding: "18px 20px",
            }}>
              <div style={{ color: G.gold, fontSize: "1rem", marginBottom: 8, letterSpacing: 2 }}>★★★★★</div>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,245,230,0.82)", lineHeight: 1.6, fontStyle: "italic", marginBottom: 10 }}>
                "{r.text}"
              </p>
              <div style={{ fontSize: "0.78rem", fontWeight: 800, color: G.gold, textTransform: "uppercase", letterSpacing: "0.08em" }}>
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
    color: "white", border: "none", padding: "18px 24px", borderRadius: 16,
    fontSize: "1.05rem", fontWeight: 800, cursor: "pointer", textDecoration: "none",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
    letterSpacing: "0.01em", transition: "transform 0.15s",
  };

  return (
    <section id="contact" style={{
      padding: "60px 20px",
      background: `linear-gradient(180deg, ${G.smoke}, #1A0A02)`,
    }}>
      <SectionHeader eyebrow="Ready to Order?" title="Mag-" highlight="Order Na!" />
      <p style={{ fontSize: "0.95rem", color: "rgba(255,245,230,0.7)", lineHeight: 1.6, maxWidth: 340, marginBottom: 28 }}>
        Makipag-ugnayan sa amin para mag-reserve ng inyong lechon. Paunang pag-book para matiyak ang availability.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 480, margin: "0 auto" }}>
        <a ref={refFb} className="fade-up"
          href="https://www.facebook.com/lorenzoslechonhouse"
          style={{ ...btnBase, background: "#1877F2", boxShadow: "0 6px 24px rgba(24,119,242,0.4)" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Lorenzo's Lechon House
        </a>
        <a ref={refSms} className="fade-up"
          href="sms:+639970665673"
          style={{ ...btnBase, background: "#25A058", boxShadow: "0 6px 24px rgba(37,160,88,0.4)" }}>
          💬 Text Us – 0997-066-5673
        </a>
        <a ref={refCall} className="fade-up"
          href="tel:+639970665673"
          style={{ ...btnBase, background: `linear-gradient(135deg, ${G.fire}, #D04800)`, boxShadow: "0 6px 24px rgba(200,64,10,0.5)" }}>
          📞 Call – 0997-066-5673
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: G.darkBg, padding: "28px 20px 120px",
      textAlign: "center", borderTop: "1px solid rgba(232,160,32,0.15)",
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif", fontSize: "1.4rem",
        fontWeight: 900, color: G.gold, marginBottom: 6,
      }}>🐷 Lorenzo's Lechon</div>
      <p style={{ fontSize: "0.8rem", color: "rgba(255,245,230,0.4)" }}>
        Antipolo del Norte, Lipa City · Open Daily · Pre-order required
      </p>
    </footer>
  );
}

function StickyBar() {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(20,8,2,0.96)", backdropFilter: "blur(14px)",
      borderTop: "1.5px solid rgba(232,160,32,0.3)",
      display: "flex", gap: 10, padding: "12px 16px",
    }}>
      <a href="#menu" style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        padding: "12px 8px", borderRadius: 12, fontSize: "0.82rem", fontWeight: 800,
        textDecoration: "none", color: "white",
        background: `linear-gradient(135deg, ${G.fire}, #E05010)`,
      }}>🔥 See Prices</a>
      <a href="tel:+639970665673" style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        padding: "12px 8px", borderRadius: 12, fontSize: "0.82rem", fontWeight: 800,
        textDecoration: "none", color: "white",
        background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.25)",
      }}>📞 Call Now</a>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Track active nav section on scroll
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
      {/* Inject global CSS */}
      <style>{globalCSS}</style>

      <Navbar active={activeSection} />
      <Hero />
      <PriceTable />
      <About />
      <Reviews />
      <Contact />
      <Footer />
      <StickyBar />
    </>
  );
}
