import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Footer from "../components/Footer";
import { FaChartLine, FaHammer, FaBullhorn } from "react-icons/fa";

const PILLARS = [
  { Icon: FaChartLine, label: "We Plan",    desc: "Strategic roadmaps & research" },
  { Icon: FaHammer,    label: "We Build",   desc: "Software, systems & solutions" },
  { Icon: FaBullhorn,  label: "We Promote", desc: "Branding, media & outreach"    },
];

const SERVICES = [
  { icon: "📊", label: "Economic Development Advisory"   },
  { icon: "🏛️", label: "Institutional Capacity Building" },
  { icon: "📋", label: "Policy & Strategic Planning"     },
  { icon: "🔧", label: "Project Implementation Support"  },
];

const WHY_US = [
  { title: "International Expertise",  desc: "Deep experience spanning Germany, Asia-Pacific, and beyond."                            },
  { title: "Sustainable Impact",       desc: "Long-term, measurable outcomes — not short-term fixes."                                },
  { title: "Multi-Country Reach",      desc: "Active presence across 5 countries with proven local knowledge."                       },
  { title: "Trusted Partnerships",     desc: "Decades of reliable, professional relationships with public and private institutions."  },
];

const STATS = [
  { value: "5+",  label: "Countries"          },
  { value: "20+", label: "Years Experience"   },
  { value: "50+", label: "Projects Delivered" },
  { value: "3",   label: "Continents"         },
];

const COUNTRIES = ["🇩🇪 Germany", "🇮🇩 Indonesia", "🇵🇭 Philippines", "🇹🇱 Timor Leste", "🇻🇳 Vietnam"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" } }),
};

function Eyebrow({ label, centered = false }) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}>
      <div className="w-8 h-px bg-white/40" />
      <p className="text-xs uppercase tracking-[0.3em] text-blue-300 font-semibold">{label}</p>
      {centered && <div className="w-8 h-px bg-white/40" />}
    </div>
  );
}

function PrimaryButton({ to, children }) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-block">
      <Link to={to} className="inline-block px-6 sm:px-8 py-3 bg-[#003679] text-white font-semibold rounded-md shadow-lg shadow-[#003679]/30 hover:bg-white hover:text-[#003679] hover:shadow-xl transition-colors duration-300 text-sm sm:text-base">
        {children}
      </Link>
    </motion.div>
  );
}

function OutlineButton({ to, children }) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-block">
      <Link to={to} className="inline-block px-6 sm:px-8 py-3 border border-white/60 text-white font-semibold rounded-md hover:bg-white hover:text-[#003679] hover:border-white hover:shadow-xl transition-colors duration-300 text-sm sm:text-base">
        {children}
      </Link>
    </motion.div>
  );
}

function HexIcon({ Icon }) {
  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shrink-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80" fill="none">
        <polygon points="40,5 72,22 72,58 40,75 8,58 8,22"
          stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="rgba(255,255,255,0.07)" />
      </svg>
      <Icon className="relative z-10 text-white text-lg sm:text-xl md:text-2xl" />
    </div>
  );
}

export default function Home() {
  const bgRef = useRef(null);
  useEffect(() => {
    const fn = () => { if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="overflow-x-hidden font-sans text-white bg-gradient-to-b from-[#07111f] via-[#0b1a2e] to-[#07111f]"
      style={{ backgroundSize: "100% 100%" }}>

      {/* ── Hero ── */}
      <section className="h-screen flex items-center justify-center text-center relative overflow-hidden">
        <div ref={bgRef}
          className="absolute inset-[-10%_0] bg-center bg-cover will-change-transform"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(7,17,31,0.6)] via-[rgba(9,20,38,0.78)] to-[#07111f]" />

        <motion.div className="relative z-10 px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}>
          <motion.p className="text-xs uppercase tracking-[0.35em] text-blue-200 mb-5 font-medium"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Economic Development Consulting
          </motion.p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Strategic Solutions for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
              Sustainable Development
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Supporting ministries, universities, and private institutions across Asia with expert-driven economic development strategies.
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap px-4 sm:px-0">
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

      {/* ── Who We Are + Reach + Pillars ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.055)_0%,transparent_60%)]" />

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Who We Are */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-12 sm:mb-16">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Who We Are" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
                International Expertise,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">Regional Insight</span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                HMP Consulting partners with institutions in Germany, Indonesia, Philippines, Timor Leste, and Vietnam to deliver impactful, sustainable, and results-oriented economic development solutions.
              </p>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-block">
                <Link to="/about" className="inline-block px-6 sm:px-8 py-3 border border-white/30 text-white font-semibold rounded-md hover:border-white/70 hover:bg-white/10 transition-colors duration-300 text-sm sm:text-base">
                  Learn More →
                </Link>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl p-5 sm:p-6 text-center overflow-hidden group border border-white/10 hover:border-white/25 transition-all duration-300 bg-gradient-to-br from-white/[0.09] to-white/[0.03]">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                  <p className="text-3xl sm:text-4xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200">{s.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-widest">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Our Reach */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-2xl px-6 sm:px-8 py-8 border border-white/10 overflow-hidden mb-12 bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.035)_0%,transparent_70%)]" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[480px] h-[480px] rounded-full border border-white/[0.04]" />
              <div className="absolute w-[320px] h-[320px] rounded-full border border-white/[0.03]" />
              <div className="absolute w-[160px] h-[160px] rounded-full border border-white/[0.04]" />
            </div>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="relative z-10 text-center">
              <Eyebrow label="Our Reach" centered />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
                Cross-Border Expertise Across{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">Asia & Europe</span>
              </h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {COUNTRIES.map((c, i) => (
                  <motion.span key={i} whileHover={{ scale: 1.07, y: -3 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm tracking-wide border border-white/15 hover:border-white/40 hover:bg-white/10 transition-colors duration-300 cursor-default bg-white/[0.05]">
                    {c}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pillars divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

          {/* Pillars — desktop */}
          <div className="hidden sm:grid grid-cols-3 divide-x divide-white/[0.08]">
            {PILLARS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.14 }} viewport={{ once: true }} whileHover={{ scale: 1.03 }}
                className="flex items-center gap-4 md:gap-5 px-6 md:px-10 py-4 cursor-default first:pl-0 last:pr-0">
                <HexIcon Icon={p.Icon} />
                <div>
                  <p className="text-white font-bold text-xl md:text-2xl leading-tight">{p.label}</p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pillars — mobile */}
          <div className="flex flex-col gap-5 sm:hidden">
            {PILLARS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.14 }} viewport={{ once: true }}
                className="flex items-center gap-4 cursor-default">
                <HexIcon Icon={p.Icon} />
                <div>
                  <p className="text-white font-bold text-lg leading-tight">{p.label}</p>
                  <p className="text-gray-400 text-sm mt-0.5">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Services ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-48 sm:w-56 h-48 sm:h-56 pointer-events-none overflow-hidden">
          <svg width="224" height="224" viewBox="0 0 224 224" fill="none">
            {[0, 32, 64, 96, 128, 160].map(o => (
              <line key={o} x1={o} y1="224" x2="224" y2={o} stroke="white" strokeOpacity="0.04" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="text-center mb-8 sm:mb-12" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Eyebrow label="What We Do" centered />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Our Core Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SERVICES.map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="group relative rounded-2xl p-6 sm:p-7 cursor-default transition-all duration-300 border border-white/10 hover:border-blue-400/40 bg-gradient-to-br from-white/[0.07] to-white/[0.02]">
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-white/15 rounded-tr-sm group-hover:border-blue-400/50 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-white/15 rounded-bl-sm group-hover:border-blue-400/50 transition-colors duration-300" />
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{s.icon}</div>
                <h3 className="font-semibold text-white text-sm sm:text-base leading-snug mb-3">{s.label}</h3>
                <div className="h-[2px] w-6 bg-blue-400/70 rounded group-hover:w-14 transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-block">
              <Link to="/services"
                className="inline-block px-7 sm:px-9 py-3 border border-blue-400/40 text-blue-300 font-semibold rounded-md hover:bg-blue-400/10 hover:border-blue-400/70 hover:text-white transition-all duration-300 text-sm sm:text-base">
                Explore All Services →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none bg-[radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
        <div className="absolute top-10 right-10 pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {[0,1,2,3,4].map(r => [0,1,2,3,4].map(c => (
              <circle key={`${r}-${c}`} cx={c*24+12} cy={r*24+12} r="1.5" fill="white" fillOpacity="0.11" />
            )))}
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 pointer-events-none">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            {[0,1,2,3].map(r => [0,1,2,3].map(c => (
              <circle key={`${r}-${c}`} cx={c*20+10} cy={r*20+10} r="1.5" fill="white" fillOpacity="0.08" />
            )))}
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="text-center mb-8 sm:mb-12" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Eyebrow label="Why HMP" centered />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Why Choose Us</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {WHY_US.map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex gap-4 sm:gap-5 items-start rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-white/25 transition-all duration-300 group relative overflow-hidden bg-gradient-to-br from-white/[0.07] to-white/[0.02]">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="mt-1.5 w-2.5 h-2.5 shrink-0 rounded-full bg-gradient-to-b from-white to-blue-300 shadow-lg shadow-white/20" />
                <div>
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item.desc}</p>
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