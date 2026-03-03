import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import {
  FaCode, FaCalculator, FaPaintBrush, FaLanguage, FaHome,
  FaBriefcase, FaFileAlt, FaTools, FaCogs, FaChartLine, FaHammer, FaBullhorn,
} from "react-icons/fa";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id:1, title:"Web & Software Development",            Icon:FaCode,       description:"We design and develop high-performance websites, web applications, and custom software solutions tailored to your business goals. From frontend UI to backend architecture, we build scalable digital products that grow with you.",                                                                    image:"/assets/images/Website.jpg",      thumb:"/assets/images/Website.jpg" },
  { id:2, title:"Accounting & Bookkeeping",              Icon:FaCalculator, description:"Accurate, reliable financial management for businesses of all sizes. We handle bookkeeping, payroll, tax preparation, and financial reporting — so you can focus on growth while staying fully compliant.",                                                                                           image:"/assets/images/Accounting.jpg",   thumb:"/assets/images/Accounting.jpg" },
  { id:3, title:"Social Media & Graphics Design",        Icon:FaPaintBrush, description:"We craft compelling social media strategies and eye-catching visual content that elevate your brand. From content calendars and community management to logo design and marketing collateral — we make your brand unforgettable.",                                                                    image:"/assets/images/Social.jpg",       thumb:"/assets/images/Social.jpg" },
  { id:4, title:"German Language Tutorials",             Icon:FaLanguage,   description:"Professional German language instruction for beginners through advanced learners. Our native-level tutors offer personalized sessions focused on conversational fluency, grammar, and business German — online or in-person.",                                                                        image:"/assets/images/Consultancy.jpg",  thumb:"/assets/images/Consultancy.jpg" },
  { id:5, title:"German Au Pair Agency",                 Icon:FaHome,       description:"We connect qualified au pairs with welcoming German host families, handling the full matching process, documentation, and cultural preparation. A trusted bridge between cultures for enriching family experiences.",                                                                                image:"/assets/images/BusinessPlan.jpg", thumb:"/assets/images/BusinessPlan.jpg" },
  { id:6, title:"Consultancy Services",                  Icon:FaBriefcase,  description:"Expert advisory across economic development, institutional capacity, and business strategy. We work alongside governments, NGOs, and private enterprises to deliver data-driven insights and actionable roadmaps for sustainable growth.",                                                             image:"/assets/images/Consultancy.jpg",  thumb:"/assets/images/Consultancy.jpg" },
  { id:7, title:"Business Plan, Feasibility & Research", Icon:FaFileAlt,    description:"We prepare comprehensive business plans, feasibility studies, and market research reports that give investors and stakeholders the confidence to move forward. Rigorous analysis, professional presentation, real-world insight.",                                                                  image:"/assets/images/BusinessPlan.jpg", thumb:"/assets/images/BusinessPlan.jpg" },
  { id:8, title:"IT Technical Support",                  Icon:FaTools,      description:"Fast, dependable IT support for hardware, software, networks, and systems. Whether you need on-site troubleshooting, remote assistance, or ongoing maintenance contracts, our technicians keep your operations running smoothly.",                                                                   image:"/assets/images/Tech.jpg",         thumb:"/assets/images/Tech.jpg" },
  { id:9, title:"Engineering Services",                  Icon:FaCogs,       description:"From project design and structural analysis to technical documentation and on-site supervision, our engineering team delivers precision solutions across civil, mechanical, and electrical disciplines for public and private sector clients.",                                                     image:"/assets/images/Software.jpg",     thumb:"/assets/images/Software.jpg" },
];

const PILLARS = [
  { Icon:FaChartLine, label:"We Plan",    desc:"Strategic roadmaps & research" },
  { Icon:FaHammer,    label:"We Build",   desc:"Software, systems & solutions" },
  { Icon:FaBullhorn,  label:"We Promote", desc:"Branding, media & outreach" },
];

const PORTFOLIO = [
  { title:"E-Commerce Platform Redesign",      tag:"Web Development",       desc:"Full-stack rebuild serving 50k+ monthly users with 40% faster load times.",                              image:"/assets/images/Website.jpg" },
  { title:"Financial Dashboard System",         tag:"Accounting & Software", desc:"Custom reporting dashboard that reduced monthly close time by 60% for a mid-sized enterprise.",          image:"/assets/images/Accounting.jpg" },
  { title:"Brand Identity & Social Campaign",   tag:"Graphics & Social",     desc:"Complete brand overhaul and 6-month campaign that grew the client's following by 220%.",                 image:"/assets/images/Social.jpg" },
  { title:"Au Pair Placement — Germany",        tag:"Au Pair Agency",        desc:"Matched 30+ Filipino au pairs with German host families with full visa and documentation support.",       image:"/assets/images/BusinessPlan.jpg" },
  { title:"Economic Policy Advisory",           tag:"Consultancy",           desc:"Delivered a comprehensive economic policy framework for a Southeast Asian government ministry.",           image:"/assets/images/Consultancy.jpg" },
  { title:"SME Feasibility Study",              tag:"Business Planning",     desc:"In-depth market entry feasibility study for a logistics startup entering the Philippine market.",         image:"/assets/images/BusinessPlan.jpg" },
  { title:"Network Infrastructure Overhaul",    tag:"IT Support",            desc:"End-to-end upgrade for a 200-person office: cabling, servers, and full cybersecurity implementation.",   image:"/assets/images/Tech.jpg" },
  { title:"German Corporate Language Training", tag:"Language Tutorials",    desc:"12-week intensive German program for 40 professionals preparing for overseas deployment.",                image:"/assets/images/Consultancy.jpg" },
  { title:"Industrial Facility Engineering",    tag:"Engineering",           desc:"Structural design and on-site supervision for a 3,000 sqm industrial warehouse completed on schedule.",  image:"/assets/images/Software.jpg" },
];

// ─── Small reusable components ───────────────────────────────────────────────

function Eyebrow({ label }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-8 h-px bg-white/40" />
      <p className="text-xs uppercase tracking-[0.3em] text-blue-300 font-semibold">{label}</p>
      <div className="w-8 h-px bg-white/40" />
    </div>
  );
}

function HexIcon({ Icon }) {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shrink-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80" fill="none">
        <polygon points="40,5 72,22 72,58 40,75 8,58 8,22"
          stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" />
      </svg>
      <Icon className="relative z-10 text-white text-xl md:text-2xl" />
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function Services() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  return (
    <div className="overflow-x-hidden font-sans text-white min-h-screen"
      style={{ background:"linear-gradient(180deg,#07111f 0%,#0a1628 15%,#0b1a2e 55%,#091525 85%,#07111f 100%)" }}>
      <HeroSection active={active} setActive={setActive} current={current} />
      <PillarsSection />
      <PortfolioSection />
      <QuotationSection />
      <Footer />
    </div>
  );
}

// ─── Hero + service carousel ─────────────────────────────────────────────────

function HeroSection({ active, setActive, current }) {
  const bottomThumbs = SERVICES.slice(0, 6);
  const rightThumbs  = SERVICES.slice(6, 9);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 pointer-events-none"
        style={{ background:"radial-gradient(ellipse,rgba(59,130,246,0.10) 0%,transparent 65%)" }} />

      {/* Title */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 md:pt-44 pb-10 sm:pb-14 text-center">
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
          <Eyebrow label="What We Offer" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-5 leading-tight tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
              Services
            </span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Comprehensive solutions designed to drive growth, efficiency, and sustainable impact.
          </p>
          <motion.div
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.4, duration:0.5 }}
            className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 flex-wrap px-4">
            {["9 Services", "5 Countries", "20+ Years", "50+ Projects"].map((t, i) => (
              <span key={i} className="px-3 sm:px-4 py-1.5 text-xs font-semibold border border-white/15 rounded-full text-gray-300"
                style={{ background:"rgba(255,255,255,0.05)" }}>
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Carousel wrapper */}
      <div className="relative">
        <CarouselSwirl />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-10">

          {/* ── DESKTOP/LAPTOP: featured + right thumbs side by side ── */}
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.2 }}
            className="hidden lg:flex gap-4 mb-4">

            {/* Featured panel */}
            <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10" style={{ minHeight:"480px" }}>
              <AnimatePresence mode="wait">
                <motion.div key={`img-${current.id}`}
                  initial={{ opacity:0, scale:1.05 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                  transition={{ duration:0.45 }} className="absolute inset-0">
                  <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{
                    background:"linear-gradient(to top,rgba(2,8,24,0.97) 0%,rgba(2,8,24,0.6) 42%,rgba(2,8,24,0.1) 100%)"
                  }} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 z-10 flex flex-col justify-end">
                <div className="px-8 pb-8 pt-16"
                  style={{ background:"linear-gradient(to top,rgba(2,8,24,0.99) 60%,transparent 100%)" }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={`text-${current.id}`}
                      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                      transition={{ duration:0.35, delay:0.1 }}>
                      <p className="text-xs uppercase tracking-[0.3em] text-blue-300 mb-4 font-semibold">
                        {String(current.id).padStart(2,"0")} / {String(SERVICES.length).padStart(2,"0")}
                      </p>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg border border-blue-400/40 flex items-center justify-center shrink-0"
                          style={{ background:"rgba(59,130,246,0.18)" }}>
                          <current.Icon className="text-blue-300" style={{ fontSize:"15px" }} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight">
                          {current.title}
                        </h2>
                      </div>
                      <div className="w-10 h-px bg-blue-400/50 mb-3" />
                      <p className="text-gray-300 text-sm leading-relaxed max-w-md mb-5 line-clamp-3">
                        {current.description}
                      </p>
                      <motion.div whileHover={{ scale:1.05, y:-2 }} whileTap={{ scale:0.97 }}
                        transition={{ type:"spring", stiffness:400, damping:18 }} className="inline-block">
                        <Link to="/contact"
                          className="inline-flex items-center gap-2 px-5 py-2 bg-white text-[#003679] font-bold rounded-md text-sm shadow-xl hover:bg-blue-50 transition-colors duration-200">
                          Get in Touch →
                        </Link>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div className="absolute top-5 right-5 z-10 flex gap-1.5">
                {SERVICES.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${i===active ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/25 hover:bg-white/55"}`} />
                ))}
              </div>
            </div>

            {/* Right column — 3 thumbs */}
            <div className="flex flex-col gap-4 w-52 shrink-0">
              {rightThumbs.map((svc, i) => {
                const idx = i + 6;
                const isActive = idx === active;
                return (
                  <motion.button key={svc.id}
                    initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay:0.2 + i * 0.08 }}
                    whileHover={{ scale:1.02, x:-3 }}
                    onClick={() => setActive(idx)}
                    className={`relative rounded-xl overflow-hidden border flex-1 text-left group transition-all duration-300 ${isActive ? "border-blue-400/60 shadow-lg shadow-blue-900/30" : "border-white/10 hover:border-white/25"}`}
                    style={{ minHeight:"140px" }}>
                    <img src={svc.thumb} alt={svc.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{
                      background:isActive
                        ? "linear-gradient(to top,rgba(0,10,40,0.96) 0%,rgba(0,10,40,0.55) 100%)"
                        : "linear-gradient(to top,rgba(0,5,20,0.92) 0%,rgba(0,5,20,0.45) 100%)"
                    }} />
                    {isActive && <div className="absolute top-0 left-0 w-0.5 h-full bg-blue-400" />}
                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border transition-colors duration-300 ${isActive ? "border-blue-400/50 bg-blue-900/50" : "border-white/20 bg-black/40"}`}>
                          <svc.Icon style={{ fontSize:"11px" }} className={isActive ? "text-blue-300" : "text-white/65"} />
                        </div>
                        <p className={`text-xs font-semibold leading-tight transition-colors duration-200 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                          {svc.title}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* ── TABLET: featured panel full width, no right column ── */}
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.2 }}
            className="hidden sm:block lg:hidden mb-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ minHeight:"380px" }}>
              <AnimatePresence mode="wait">
                <motion.div key={`img-tab-${current.id}`}
                  initial={{ opacity:0, scale:1.05 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                  transition={{ duration:0.45 }} className="absolute inset-0">
                  <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(2,8,24,0.97) 0%,rgba(2,8,24,0.6) 42%,rgba(2,8,24,0.1) 100%)" }} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 z-10 flex flex-col justify-end">
                <div className="px-6 pb-6 pt-12" style={{ background:"linear-gradient(to top,rgba(2,8,24,0.99) 60%,transparent 100%)" }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={`text-tab-${current.id}`}
                      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                      transition={{ duration:0.35, delay:0.1 }}>
                      <p className="text-xs uppercase tracking-[0.3em] text-blue-300 mb-3 font-semibold">
                        {String(current.id).padStart(2,"0")} / {String(SERVICES.length).padStart(2,"0")}
                      </p>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg border border-blue-400/40 flex items-center justify-center shrink-0"
                          style={{ background:"rgba(59,130,246,0.18)" }}>
                          <current.Icon className="text-blue-300" style={{ fontSize:"13px" }} />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">{current.title}</h2>
                      </div>
                      <div className="w-8 h-px bg-blue-400/50 mb-2" />
                      <p className="text-gray-300 text-sm leading-relaxed max-w-lg mb-4 line-clamp-2">{current.description}</p>
                      <Link to="/contact"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#003679] font-bold rounded-md text-sm shadow-xl hover:bg-blue-50 transition-colors duration-200">
                        Get in Touch →
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div className="absolute top-4 right-4 z-10 flex gap-1.5 flex-wrap justify-end max-w-[160px]">
                {SERVICES.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${i===active ? "w-4 h-2 bg-white" : "w-2 h-2 bg-white/25 hover:bg-white/55"}`} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── MOBILE: featured panel compact ── */}
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.2 }}
            className="block sm:hidden mb-4">
            <div className="relative rounded-xl overflow-hidden border border-white/10" style={{ minHeight:"300px" }}>
              <AnimatePresence mode="wait">
                <motion.div key={`img-mob-${current.id}`}
                  initial={{ opacity:0, scale:1.05 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                  transition={{ duration:0.45 }} className="absolute inset-0">
                  <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(2,8,24,0.97) 0%,rgba(2,8,24,0.6) 42%,rgba(2,8,24,0.1) 100%)" }} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 z-10 flex flex-col justify-end">
                <div className="px-4 pb-4 pt-10" style={{ background:"linear-gradient(to top,rgba(2,8,24,0.99) 60%,transparent 100%)" }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={`text-mob-${current.id}`}
                      initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                      transition={{ duration:0.3 }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-md border border-blue-400/40 flex items-center justify-center shrink-0"
                          style={{ background:"rgba(59,130,246,0.18)" }}>
                          <current.Icon className="text-blue-300" style={{ fontSize:"11px" }} />
                        </div>
                        <h2 className="text-base font-bold text-white leading-tight">{current.title}</h2>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-2">{current.description}</p>
                      <Link to="/contact"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#003679] font-bold rounded-md text-xs shadow-xl hover:bg-blue-50 transition-colors duration-200">
                        Get in Touch →
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              {/* Dot indicators mobile */}
              <div className="absolute top-3 right-3 z-10 flex gap-1 flex-wrap justify-end max-w-[120px]">
                {SERVICES.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${i===active ? "w-3 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/25"}`} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom thumbnails — responsive grid */}
          {/* Desktop: 6 cols */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.3 }}
            className="hidden lg:grid grid-cols-6 gap-4">
            {bottomThumbs.map((svc, i) => {
              const isActive = i === active;
              return (
                <motion.button key={svc.id}
                  whileHover={{ scale:1.04, y:-4 }}
                  transition={{ type:"spring", stiffness:300, damping:18 }}
                  onClick={() => setActive(i)}
                  className={`relative rounded-xl overflow-hidden border group transition-all duration-300 ${isActive ? "border-blue-400/60 shadow-lg shadow-blue-900/30" : "border-white/10 hover:border-white/25"}`}
                  style={{ height:"120px" }}>
                  <img src={svc.thumb} alt={svc.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{
                    background:isActive
                      ? "linear-gradient(to top,rgba(0,10,40,0.96) 0%,rgba(0,10,40,0.5) 100%)"
                      : "linear-gradient(to top,rgba(0,5,20,0.92) 0%,rgba(0,5,20,0.38) 100%)"
                  }} />
                  {isActive && <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200" />}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors duration-300 ${isActive ? "border-blue-400/50 bg-blue-900/50" : "border-white/20 bg-black/40"}`}>
                        <svc.Icon style={{ fontSize:"9px" }} className={isActive ? "text-blue-300" : "text-white/65"} />
                      </div>
                      <p className={`text-[10px] font-semibold leading-tight line-clamp-2 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                        {svc.title}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Tablet: 3 cols for all 9 services */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.3 }}
            className="hidden sm:grid lg:hidden grid-cols-3 gap-3">
            {SERVICES.map((svc, i) => {
              const isActive = i === active;
              return (
                <motion.button key={svc.id}
                  whileHover={{ scale:1.03, y:-3 }}
                  transition={{ type:"spring", stiffness:300, damping:18 }}
                  onClick={() => setActive(i)}
                  className={`relative rounded-xl overflow-hidden border group transition-all duration-300 ${isActive ? "border-blue-400/60 shadow-lg shadow-blue-900/30" : "border-white/10 hover:border-white/25"}`}
                  style={{ height:"90px" }}>
                  <img src={svc.thumb} alt={svc.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{
                    background:isActive
                      ? "linear-gradient(to top,rgba(0,10,40,0.96) 0%,rgba(0,10,40,0.5) 100%)"
                      : "linear-gradient(to top,rgba(0,5,20,0.92) 0%,rgba(0,5,20,0.38) 100%)"
                  }} />
                  {isActive && <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200" />}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-2">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors duration-300 ${isActive ? "border-blue-400/50 bg-blue-900/50" : "border-white/20 bg-black/40"}`}>
                        <svc.Icon style={{ fontSize:"9px" }} className={isActive ? "text-blue-300" : "text-white/65"} />
                      </div>
                      <p className={`text-[9px] font-semibold leading-tight line-clamp-2 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                        {svc.title}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Mobile: horizontal scroll strip */}
          <div className="block sm:hidden overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-3" style={{ width:"max-content" }}>
              {SERVICES.map((svc, i) => {
                const isActive = i === active;
                return (
                  <motion.button key={svc.id}
                    whileTap={{ scale:0.96 }}
                    onClick={() => setActive(i)}
                    className={`relative rounded-xl overflow-hidden border shrink-0 transition-all duration-300 ${isActive ? "border-blue-400/60" : "border-white/10"}`}
                    style={{ width:"100px", height:"70px" }}>
                    <img src={svc.thumb} alt={svc.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{
                      background:isActive
                        ? "linear-gradient(to top,rgba(0,10,40,0.96) 0%,rgba(0,10,40,0.5) 100%)"
                        : "linear-gradient(to top,rgba(0,5,20,0.92) 0%,rgba(0,5,20,0.38) 100%)"
                    }} />
                    {isActive && <div className="absolute top-0 inset-x-0 h-0.5 bg-blue-400" />}
                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-1.5">
                      <p className={`text-[8px] font-semibold leading-tight line-clamp-2 ${isActive ? "text-white" : "text-gray-400"}`}>
                        {svc.title}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Swirling lines ───────────────────────────────────────────────────────────

function CarouselSwirl() {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.15);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex:0 }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice" fill="none" style={{ opacity:0.22 }}>
        <motion.path
          d={`M 20 ${-40 + offset * 0.8} C 60 ${120 + offset * 0.5}, 180 ${80 + offset * 0.3}, 140 ${280 + offset * 0.4} S 30 ${480 + offset * 0.5}, 80 ${620 + offset * 0.3} S 200 ${720 + offset * 0.2}, 160 ${800 + offset * 0.1}`}
          stroke="url(#swirl1)" strokeWidth="1.5" strokeLinecap="round"
          animate={{ pathLength:[0,1,0] }} transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }} />
        <motion.path
          d={`M 120 ${-20 + offset * 0.6} C 200 ${140 + offset * 0.4}, 60 ${260 + offset * 0.3}, 180 ${400 + offset * 0.35} S 80 ${560 + offset * 0.3}, 200 ${680 + offset * 0.2}`}
          stroke="url(#swirl2)" strokeWidth="0.8" strokeLinecap="round"
          animate={{ pathLength:[0,1,0] }} transition={{ duration:14, repeat:Infinity, ease:"easeInOut", delay:2 }} />
        <motion.path
          d={`M 1420 ${-40 + offset * 0.7} C 1380 ${100 + offset * 0.5}, 1260 ${60 + offset * 0.3}, 1300 ${260 + offset * 0.4} S 1410 ${440 + offset * 0.4}, 1360 ${600 + offset * 0.3} S 1240 ${720 + offset * 0.2}, 1280 ${800 + offset * 0.1}`}
          stroke="url(#swirl1)" strokeWidth="1.5" strokeLinecap="round"
          animate={{ pathLength:[0,1,0] }} transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:1 }} />
        <motion.path
          d={`M 1320 ${-10 + offset * 0.5} C 1240 ${160 + offset * 0.35}, 1380 ${300 + offset * 0.25}, 1260 ${440 + offset * 0.3} S 1360 ${600 + offset * 0.25}, 1240 ${700 + offset * 0.15}`}
          stroke="url(#swirl2)" strokeWidth="0.8" strokeLinecap="round"
          animate={{ pathLength:[0,1,0] }} transition={{ duration:16, repeat:Infinity, ease:"easeInOut", delay:4 }} />
        <motion.path
          d={`M -60 ${640 - offset * 0.2} C 300 ${700 - offset * 0.15}, 800 ${660 - offset * 0.1}, 1100 ${700 - offset * 0.15} S 1380 ${650 - offset * 0.2}, 1500 ${620 - offset * 0.1}`}
          stroke="url(#swirl3)" strokeWidth="1" strokeLinecap="round"
          animate={{ pathLength:[0,1,0] }} transition={{ duration:18, repeat:Infinity, ease:"easeInOut", delay:3 }} />
        <defs>
          <linearGradient id="swirl1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(59,130,246,0)" />
            <stop offset="35%"  stopColor="rgba(99,179,237,0.9)" />
            <stop offset="65%"  stopColor="rgba(147,210,255,0.7)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
          <linearGradient id="swirl2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(147,197,253,0)" />
            <stop offset="50%"  stopColor="rgba(186,230,253,0.8)" />
            <stop offset="100%" stopColor="rgba(147,197,253,0)" />
          </linearGradient>
          <linearGradient id="swirl3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(59,130,246,0)" />
            <stop offset="30%"  stopColor="rgba(99,179,237,0.7)" />
            <stop offset="70%"  stopColor="rgba(147,210,255,0.5)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 sm:w-48 h-96 pointer-events-none"
        style={{ background:"radial-gradient(ellipse at left, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 sm:w-48 h-96 pointer-events-none"
        style={{ background:"radial-gradient(ellipse at right, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />
    </div>
  );
}

// ─── Pillars ─────────────────────────────────────────────────────────────────

function PillarsSection() {
  return (
    <section className="relative mt-10 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/assets/images/Consultancy.jpg"
          alt="" className="w-full h-full object-cover object-center"
          style={{ filter:"blur(4px)", transform:"scale(1.05)" }} />
        <div className="absolute inset-0" style={{
          background:"linear-gradient(135deg,rgba(0,18,48,0.91) 0%,rgba(0,24,60,0.88) 50%,rgba(0,14,38,0.93) 100%)"
        }} />
      </div>
      <div className="absolute top-0 inset-x-0 h-12 pointer-events-none"
        style={{ background:"linear-gradient(to bottom,#091525,transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-12 pointer-events-none"
        style={{ background:"linear-gradient(to top,#07111f,transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Desktop/tablet: 3 col horizontal */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {PILLARS.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.5, delay:i * 0.14 }} viewport={{ once:true }}
              whileHover={{ scale:1.03 }}
              className="flex items-center gap-4 sm:gap-6 px-6 sm:px-10 py-6 md:py-0 first:pl-0 last:pr-0 cursor-default">
              <HexIcon Icon={p.Icon} />
              <div>
                <p className="text-white font-bold text-xl sm:text-2xl leading-tight">{p.label}</p>
                <p className="text-gray-400 text-sm mt-1">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Mobile: stacked */}
        <div className="flex flex-col gap-6 sm:hidden">
          {PILLARS.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.5, delay:i * 0.14 }} viewport={{ once:true }}
              className="flex items-center gap-4 cursor-default">
              <HexIcon Icon={p.Icon} />
              <div>
                <p className="text-white font-bold text-xl leading-tight">{p.label}</p>
                <p className="text-gray-400 text-sm mt-1">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio 3D carousel ────────────────────────────────────────────────────

const PORTFOLIO_CSS = `
  @keyframes rotate3d {
    from { transform: rotateY(0deg); }
    to   { transform: rotateY(-360deg); }
  }
  .portfolio-track {
    position: absolute; width: 100%; height: 100%;
    transform-style: preserve-3d;
    animation: rotate3d 40s infinite linear;
  }
  .portfolio-track:hover { animation-play-state: paused; }
  .portfolio-card {
    position: absolute;
    width: 240px; height: 165px;
    left: calc(50% - 120px); top: calc(50% - 82px);
    border-radius: 14px; overflow: hidden; cursor: pointer;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.1);
  }
  @media (min-width: 768px) {
    .portfolio-card { width: 280px; height: 190px; left: calc(50% - 140px); top: calc(50% - 95px); }
  }
  .portfolio-card:nth-child(1) { transform: rotateY(  0deg) translateZ(420px); }
  .portfolio-card:nth-child(2) { transform: rotateY( 40deg) translateZ(420px); }
  .portfolio-card:nth-child(3) { transform: rotateY( 80deg) translateZ(420px); }
  .portfolio-card:nth-child(4) { transform: rotateY(120deg) translateZ(420px); }
  .portfolio-card:nth-child(5) { transform: rotateY(160deg) translateZ(420px); }
  .portfolio-card:nth-child(6) { transform: rotateY(200deg) translateZ(420px); }
  .portfolio-card:nth-child(7) { transform: rotateY(240deg) translateZ(420px); }
  .portfolio-card:nth-child(8) { transform: rotateY(280deg) translateZ(420px); }
  .portfolio-card:nth-child(9) { transform: rotateY(320deg) translateZ(420px); }
  @media (min-width: 768px) {
    .portfolio-card:nth-child(1) { transform: rotateY(  0deg) translateZ(480px); }
    .portfolio-card:nth-child(2) { transform: rotateY( 40deg) translateZ(480px); }
    .portfolio-card:nth-child(3) { transform: rotateY( 80deg) translateZ(480px); }
    .portfolio-card:nth-child(4) { transform: rotateY(120deg) translateZ(480px); }
    .portfolio-card:nth-child(5) { transform: rotateY(160deg) translateZ(480px); }
    .portfolio-card:nth-child(6) { transform: rotateY(200deg) translateZ(480px); }
    .portfolio-card:nth-child(7) { transform: rotateY(240deg) translateZ(480px); }
    .portfolio-card:nth-child(8) { transform: rotateY(280deg) translateZ(480px); }
    .portfolio-card:nth-child(9) { transform: rotateY(320deg) translateZ(480px); }
  }
  .portfolio-card .card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(2,8,24,0.97) 0%, rgba(2,8,24,0.45) 55%, transparent 100%);
    transition: background 0.35s;
  }
  .portfolio-card:hover .card-overlay { background: rgba(2,8,24,0.88); }
  .portfolio-card .card-desc { opacity: 0; transform: translateY(8px); transition: all 0.3s ease; }
  .portfolio-card:hover .card-desc { opacity: 1; transform: translateY(0); }
`;

function PortfolioSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <style>{PORTFOLIO_CSS}</style>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 pointer-events-none"
        style={{ background:"radial-gradient(ellipse,rgba(59,130,246,0.07) 0%,transparent 65%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.6 }} viewport={{ once:true }} className="text-center mb-12 sm:mb-16">
          <Eyebrow label="Our Work" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Portfolio &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">Projects</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            A showcase of our work across industries — hover any card to pause and read.
          </p>
        </motion.div>

        {/* 3D Carousel — hidden on mobile, shown on sm+ */}
        <div className="hidden sm:flex items-center justify-center relative"
          style={{ height:"320px", perspective:"1200px" }}>
          <div className="portfolio-track">
            {PORTFOLIO.map((item, i) => (
              <div key={i} className="portfolio-card">
                <img src={item.image} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div className="card-overlay" />
                <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"14px", zIndex:10 }}>
                  <span style={{ display:"inline-block", fontSize:"9px", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(147,197,253,1)", marginBottom:"5px" }}>
                    {item.tag}
                  </span>
                  <p style={{ color:"#fff", fontWeight:700, fontSize:"13px", lineHeight:1.3, marginBottom:"6px" }}>{item.title}</p>
                  <p className="card-desc" style={{ color:"rgba(209,213,219,0.9)", fontSize:"11px", lineHeight:1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: flat card grid instead of 3D */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {PORTFOLIO.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.4, delay:i * 0.06 }} viewport={{ once:true }}
              className="relative rounded-xl overflow-hidden border border-white/10" style={{ height:"140px" }}>
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(2,8,24,0.97) 0%,rgba(2,8,24,0.5) 60%,transparent 100%)" }} />
              <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
                <span className="text-[9px] font-bold tracking-widest uppercase text-blue-300 mb-1">{item.tag}</span>
                <p className="text-white font-bold text-sm leading-tight mb-1">{item.title}</p>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

    
      </div>
    </section>
  );
}

// ─── Request a Quotation ──────────────────────────────────────────────────────

const SERVICE_OPTIONS = [
  "Web & Software Development","Accounting & Bookkeeping","Social Media & Graphics Design",
  "German Language Tutorials","German Au Pair Agency","Consultancy Services",
  "Business Plan, Feasibility & Research","IT Technical Support","Engineering Services",
];

function QuotationSection() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", service:"", business:"", type:"" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name:"", email:"", phone:"", service:"", business:"", type:"" });
  };

  const inputBase = "w-full bg-transparent border rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 ";
  const inputIdle   = "border-white/10 hover:border-white/20";
  const inputActive = "border-blue-400/70 shadow-[0_0_0_3px_rgba(59,130,246,0.10)]";

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 pointer-events-none"
        style={{ background:"radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 65%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left copy */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
            transition={{ duration:0.7 }} viewport={{ once:true }}>
            <Eyebrow label="Take a Look" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Experience{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">Something</span>
              <br />with Us!
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-sm">
              Ready to take the next step? Fill out the form and one of our specialists
              will get back to you with a tailored quote — fast and free.
            </p>
            {["No commitment, completely free","Response within 24 hours","Tailored to your business needs"].map((t, i) => (
              <motion.div key={i}
                initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
                transition={{ delay:0.2 + i * 0.1, duration:0.5 }} viewport={{ once:true }}
                className="flex items-center gap-3 mb-4">
                <div className="w-5 h-5 rounded-full border border-blue-400/50 flex items-center justify-center shrink-0"
                  style={{ background:"rgba(59,130,246,0.15)" }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="rgba(147,197,253,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">{t}</span>
              </motion.div>
            ))}
            <div className="relative mt-8 sm:mt-10 rounded-2xl overflow-hidden border border-white/10" style={{ height:"180px" }}>
              <img src="/assets/images/Software.jpg" alt="Work with us" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(135deg,rgba(0,18,48,0.75) 0%,rgba(0,10,30,0.4) 100%)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div animate={{ x:[0,6,0] }} transition={{ duration:2, repeat:Infinity, ease:"easeInOut" }}
                  className="flex items-center gap-3">
                  <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
                    <path d="M2 14 C8 4, 20 2, 28 10 L24 8 M28 10 L24 14"
                      stroke="rgba(147,197,253,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-white font-bold text-lg sm:text-xl leading-tight">Request a<br />free quote →</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
            transition={{ duration:0.7, delay:0.1 }} viewport={{ once:true }}
            className="relative rounded-2xl border border-white/10 p-5 sm:p-8"
            style={{ background:"linear-gradient(145deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 100%)" }}>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl" />
            <p className="text-xs uppercase tracking-[0.3em] text-blue-300 font-semibold mb-1">Free Quote</p>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">Request a Quotation</h3>

            <AnimatePresence>
              {submitted && (
                <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  className="mb-5 px-4 py-3 rounded-lg border border-green-400/30 text-green-300 text-sm font-medium"
                  style={{ background:"rgba(16,185,129,0.08)" }}>
                  ✓ Thanks! We'll get back to you within 24 hours.
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["name","email"].map((name) => (
                  <input key={name} name={name} type={name==="email"?"email":"text"}
                    placeholder={name==="name"?"Your Name":"Your E-mail"}
                    value={form[name]} onChange={handleChange}
                    onFocus={() => setFocused(name)} onBlur={() => setFocused("")}
                    required
                    className={inputBase + (focused===name ? inputActive : inputIdle)}
                    style={{ background:"rgba(255,255,255,0.04)" }} />
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="phone" type="tel" placeholder="Your Phone"
                  value={form.phone} onChange={handleChange}
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                  className={inputBase + (focused==="phone" ? inputActive : inputIdle)}
                  style={{ background:"rgba(255,255,255,0.04)" }} />
                <div className="relative">
                  <select name="service" value={form.service} onChange={handleChange}
                    onFocus={() => setFocused("service")} onBlur={() => setFocused("")}
                    required
                    className={inputBase + (focused==="service" ? inputActive : inputIdle) + " appearance-none pr-8 cursor-pointer"}
                    style={{ background:"rgba(12,24,50,0.95)", color:form.service?"white":"rgba(255,255,255,0.3)" }}>
                    <option value="" disabled>What service do you need?</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s} style={{ color:"white", background:"#0a1628" }}>{s}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-xs">▼</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["business","type"].map((name) => (
                  <input key={name} name={name} type="text"
                    placeholder={name==="business"?"Your Business Name":"Business Type"}
                    value={form[name]} onChange={handleChange}
                    onFocus={() => setFocused(name)} onBlur={() => setFocused("")}
                    className={inputBase + (focused===name ? inputActive : inputIdle)}
                    style={{ background:"rgba(255,255,255,0.04)" }} />
                ))}
              </div>
              <motion.button type="submit"
                whileHover={{ scale:1.02, y:-2 }} whileTap={{ scale:0.98 }}
                transition={{ type:"spring", stiffness:400, damping:18 }}
                className="w-full py-3.5 font-bold text-sm tracking-widest uppercase rounded-lg transition-all duration-300 relative overflow-hidden group"
                style={{ background:"linear-gradient(135deg,#1d4ed8 0%,#2563eb 50%,#1d4ed8 100%)" }}>
                <span className="relative z-10">Submit Request</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.12) 50%,transparent 100%)" }} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}