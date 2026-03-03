import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Footer from "../components/Footer";

function PrimaryButton({ to, children }) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-block">
      <Link to={to} className="inline-block px-8 py-3 bg-[#003679] text-white font-semibold rounded-md shadow-lg shadow-[#003679]/30 hover:bg-white hover:text-[#003679] hover:shadow-xl transition-colors duration-300">
        {children}
      </Link>
    </motion.div>
  );
}

function OutlineButton({ to, children }) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-block">
      <Link to={to} className="inline-block px-8 py-3 border border-white/60 text-white font-semibold rounded-md hover:bg-white hover:text-[#003679] hover:border-white hover:shadow-xl transition-colors duration-300">
        {children}
      </Link>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" } }),
};

function SectionEyebrow({ label, centered = false }) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}>
      <div className="w-8 h-px bg-white/40" />
      <p className="text-xs uppercase tracking-[0.3em] text-blue-300 font-semibold">{label}</p>
      {centered && <div className="w-8 h-px bg-white/40" />}
    </div>
  );
}

export default function Home() {
  const bgRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { icon: "📊", label: "Economic Development Advisory" },
    { icon: "🏛️", label: "Institutional Capacity Building" },
    { icon: "📋", label: "Policy & Strategic Planning" },
    { icon: "🔧", label: "Project Implementation Support" },
  ];

  const whyUs = [
    { title: "International Expertise", desc: "Deep experience spanning Germany, Asia-Pacific, and beyond." },
    { title: "Sustainable Impact", desc: "Long-term, measurable outcomes — not short-term fixes." },
    { title: "Multi-Country Reach", desc: "Active presence across 5 countries with proven local knowledge." },
    { title: "Trusted Partnerships", desc: "Decades of reliable, professional relationships with public and private institutions." },
  ];

  const countries = ["🇩🇪 Germany", "🇮🇩 Indonesia", "🇵🇭 Philippines", "🇹🇱 Timor Leste", "🇻🇳 Vietnam"];

  return (
    // Single continuous background — one canvas, sections are just spacing + lighting
    <div className="overflow-x-hidden font-sans text-white"
      style={{ background: "linear-gradient(180deg, #07111f 0%, #0a1628 15%, #0b1a2e 50%, #091525 80%, #07111f 100%)" }}>

      {/* ── HERO ── */}
      <section className="h-screen flex items-center justify-center text-center relative overflow-hidden">
        <div ref={bgRef} className="absolute bg-center bg-cover will-change-transform"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216')", top: "-10%", bottom: "-10%", left: 0, right: 0 }} />
        {/* Fade photo into the page bg seamlessly */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(7,17,31,0.6) 0%, rgba(9,20,38,0.78) 60%, #07111f 100%)"
        }} />

        <motion.div className="relative z-10 px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
          <motion.p className="text-xs uppercase tracking-[0.35em] text-blue-200 mb-5 font-medium"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Economic Development Consulting
          </motion.p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Strategic Solutions for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
              Sustainable Development
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Supporting ministries, universities, and private institutions across Asia with expert-driven economic development strategies.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <PrimaryButton to="/services">Our Services</PrimaryButton>
            <OutlineButton to="/contact">Contact Us</OutlineButton>
          </div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/35 text-xs tracking-widest uppercase z-20"
          animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <span>Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ── WHO WE ARE + GLOBAL PRESENCE ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        {/* Localised white glow — gives this section its own "light source" */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 85% 15%, rgba(255,255,255,0.055) 0%, transparent 60%)" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Who We Are */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <SectionEyebrow label="Who We Are" />
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                International Expertise,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">
                  Regional Insight
                </span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                HMP Consulting partners with institutions in Germany, Indonesia, Philippines, Timor Leste, and Vietnam to deliver impactful, sustainable, and results-oriented economic development solutions.
              </p>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-block">
                <Link to="/about" className="inline-block px-8 py-3 border border-white/30 text-white font-semibold rounded-md hover:border-white/70 hover:bg-white/10 transition-colors duration-300">
                  Learn More →
                </Link>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 gap-5">
              {[{ value: "5+", label: "Countries" }, { value: "20+", label: "Years Experience" }, { value: "50+", label: "Projects Delivered" }, { value: "3", label: "Continents" }].map((stat, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="relative rounded-2xl p-6 text-center overflow-hidden group border border-white/10 hover:border-white/25 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 70%)" }} />
                  <p className="text-4xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200">{stat.value}</p>
                  <p className="text-xs text-gray-300 uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Our Reach — inline card */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-2xl px-8 py-10 border border-white/10 overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)" }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.035) 0%, transparent 70%)" }} />
            <div className="relative z-10 text-center">
              <SectionEyebrow label="Our Reach" centered />
              <h3 className="text-2xl md:text-3xl font-bold mb-8">
                Cross-Border Expertise Across{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">Asia & Europe</span>
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {countries.map((c, i) => (
                  <motion.span key={i}
                    whileHover={{ scale: 1.07, y: -3 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className="px-5 py-2.5 rounded-full text-sm tracking-wide border border-white/15 hover:border-white/40 hover:bg-white/10 transition-colors duration-300 cursor-default"
                    style={{ background: "rgba(255,255,255,0.05)" }}>
                    {c}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Thin white divider line between sections instead of bg color change */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── SERVICES ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        {/* Light source shifts to center-left for this section */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 10% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 w-56 h-56 pointer-events-none overflow-hidden opacity-50">
          <svg width="224" height="224" viewBox="0 0 224 224" fill="none">
            {[0, 32, 64, 96, 128, 160].map((o) => (
              <line key={o} x1={o} y1="224" x2="224" y2={o} stroke="white" strokeOpacity="0.06" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <SectionEyebrow label="What We Do" centered />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Our Core Services</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="group relative rounded-2xl p-7 cursor-default overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300"
                style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)" }}>
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-white/15 rounded-tr-sm group-hover:border-white/45 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-white/15 rounded-bl-sm group-hover:border-white/45 transition-colors duration-300" />
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-semibold text-white text-base leading-snug mb-3">{s.label}</h3>
                <div className="h-[2px] w-6 bg-gradient-to-r from-white to-blue-300 rounded group-hover:w-14 transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-block">
              <Link to="/services" className="inline-block px-9 py-3 border border-white/30 text-white font-semibold rounded-md hover:bg-white/10 hover:border-white/60 hover:shadow-lg transition-colors duration-300">
                Explore All Services →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── WHY US ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        {/* Light source top-right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 90% 10%, rgba(255,255,255,0.05) 0%, transparent 60%)" }} />
        <div className="absolute top-10 right-10 pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {[0,1,2,3,4].map(row => [0,1,2,3,4].map(col => (
              <circle key={`${row}-${col}`} cx={col * 24 + 12} cy={row * 24 + 12} r="1.5" fill="white" fillOpacity="0.11" />
            )))}
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 pointer-events-none">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            {[0,1,2,3].map(row => [0,1,2,3].map(col => (
              <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="1.5" fill="white" fillOpacity="0.08" />
            )))}
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <SectionEyebrow label="Why HMP" centered />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Why Choose Us</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            {whyUs.map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex gap-5 items-start rounded-2xl p-7 border border-white/10 hover:border-white/25 transition-all duration-300 group relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)" }}>
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="mt-1.5 w-2.5 h-2.5 shrink-0 rounded-full bg-gradient-to-b from-white to-blue-300 shadow-lg shadow-white/20" />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}