import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import {
  FaCode, FaCalculator, FaPaintBrush, FaLanguage, FaHome,
  FaBriefcase, FaFileAlt, FaTools, FaCogs,
} from "react-icons/fa";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id:1, title:"Web & Software Development",            Icon:FaCode,       description:"We design and develop high-performance websites, web applications, and custom software solutions tailored to your business goals. From frontend UI to backend architecture, we build scalable digital products that grow with you.",     image:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80", thumb:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=70" },
  { id:2, title:"Accounting & Bookkeeping",              Icon:FaCalculator, description:"Accurate, reliable financial management for businesses of all sizes. We handle bookkeeping, payroll, tax preparation, and financial reporting — so you can focus on growth while staying fully compliant.",                             image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",    thumb:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=70"    },
  { id:3, title:"Social Media & Graphics Design",        Icon:FaPaintBrush, description:"Compelling social media strategies and eye-catching visual content that elevate your brand. From content calendars and community management to logo design and marketing collateral — we make your brand unforgettable.",                image:"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80", thumb:"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=70" },
  { id:4, title:"German Language Tutorials",             Icon:FaLanguage,   description:"Professional German language instruction for beginners through advanced learners. Our tutors offer personalised sessions focused on conversational fluency, grammar, and business German.",                                              image:"https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?w=1200&q=80", thumb:"https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?w=400&q=70" },
  { id:5, title:"German Au Pair Agency",                 Icon:FaHome,       description:"We connect qualified au pairs with welcoming German host families, managing the full matching, documentation, and cultural preparation process. A trusted bridge between cultures for enriching family experiences.",                     image:"https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=1200&q=80",    thumb:"https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=400&q=70"    },
  { id:6, title:"Consultancy Services",                  Icon:FaBriefcase,  description:"Expert advisory across economic development, institutional capacity, and business strategy for governments, NGOs, and private enterprises — delivering data-driven insights and actionable roadmaps.",                                   image:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80", thumb:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=70" },
  { id:7, title:"Business Plan, Feasibility & Research", Icon:FaFileAlt,    description:"Comprehensive business plans, feasibility studies, and market research reports that give investors and stakeholders the confidence to move forward. Rigorous analysis. Professional presentation. Real-world insight.",               image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80", thumb:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70" },
  { id:8, title:"IT Technical Support",                  Icon:FaTools,      description:"Fast, dependable IT support for hardware, software, networks, and systems. On-site troubleshooting, remote assistance, or ongoing maintenance contracts — our technicians keep your operations running.",                                image:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80", thumb:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=70" },
  { id:9, title:"Engineering Services",                  Icon:FaCogs,       description:"From project design and structural analysis to technical documentation and on-site supervision, our engineering team delivers precision solutions across civil, mechanical, and electrical disciplines.",                                 image:"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80", thumb:"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=70" },
];

const PORTFOLIO = [
  { title:"E-Commerce Platform Redesign",      tag:"Web Development",       desc:"Full-stack rebuild serving 50k+ monthly users with 40% faster load times.",          image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
  { title:"Financial Dashboard System",         tag:"Accounting & Software", desc:"Custom reporting dashboard that reduced monthly close time by 60%.",                 image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
  { title:"Brand Identity & Social Campaign",   tag:"Graphics & Social",     desc:"Complete brand overhaul and 6-month campaign that grew following by 220%.",          image:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80" },
  { title:"Au Pair Placement — Germany",        tag:"Au Pair Agency",        desc:"Matched 30+ Filipino au pairs with German host families with full documentation.",   image:"https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=600&q=80" },
  { title:"Economic Policy Advisory",           tag:"Consultancy",           desc:"Comprehensive economic policy framework for a Southeast Asian government ministry.", image:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80" },
  { title:"SME Feasibility Study",              tag:"Business Planning",     desc:"Market entry feasibility study for a logistics startup entering the Philippine market.", image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { title:"Network Infrastructure Overhaul",    tag:"IT Support",            desc:"End-to-end upgrade for a 200-person office including cybersecurity implementation.", image:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
  { title:"German Corporate Language Training", tag:"Language Tutorials",    desc:"12-week intensive German program for 40 professionals preparing for overseas deployment.", image:"https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?w=600&q=80" },
  { title:"Industrial Facility Engineering",    tag:"Engineering",           desc:"Structural design and supervision for a 3,000 sqm industrial warehouse.",            image:"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80" },
];

const CLIENT_LOGOS = [
  "/assets/images/Clients/ABE.jpg",     "/assets/images/Clients/Amper's.jpg",
  "/assets/images/Clients/BayCoco.png", "/assets/images/Clients/Bitoon.png",
  "/assets/images/Clients/Bontoc.jpg",  "/assets/images/Clients/Casil.png",
  "/assets/images/Clients/DiveResort.png", "/assets/images/Clients/DTI.png",
  "/assets/images/Clients/EWS.jpg",     "/assets/images/Clients/Hilongos.jpg",
  "/assets/images/Clients/ITEssentials.png", "/assets/images/Clients/JMK.png",
  "/assets/images/Clients/LeyteDive.png","/assets/images/Clients/Maasin.png",
  "/assets/images/Clients/MaasinCollege.png","/assets/images/Clients/MaasinZoo.png",
  "/assets/images/Clients/Moriah.jpg",  "/assets/images/Clients/Nora's.png",
  "/assets/images/Clients/Parish.png",  "/assets/images/Clients/Polymedic.jpg",
  "/assets/images/Clients/SAJ.jpg",     "/assets/images/Clients/Sheallzy.png",
  "/assets/images/Clients/SOGOD.jpg", "/assets/images/Clients/TAlk.png",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" } }),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Services() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];
  return (
    <div className="overflow-x-hidden font-sans text-white min-h-screen"
      style={{ background:"linear-gradient(180deg,#07111f 0%,#0a1628 15%,#0b1a2e 50%,#091525 80%,#07111f 100%)" }}>
      <HeroSection active={active} setActive={setActive} current={current} />
      <PortfolioSection />
      <QuotationSection />
      <Footer />
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection({ active, setActive, current }) {
  return (
    <section className="relative flex flex-col overflow-hidden min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-8">

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse at 8% 35%,rgba(29,78,216,0.16) 0%,transparent 58%)" }} />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 pointer-events-none"
        style={{ background:"radial-gradient(ellipse at 90% 80%,rgba(56,189,248,0.05) 0%,transparent 55%)" }} />
      <SwirlingLines />

      {/* ── Split: left content + right image ── */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1280px] mx-auto
                      px-5 sm:px-8 lg:px-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[54%_46%] gap-6 lg:gap-10 items-center">

          {/* ════ LEFT ════ */}
          <div className="flex flex-col gap-4">

            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-px bg-white/25" />
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-blue-300/55">What We Offer</span>
            </div>

            {/* Page title */}
            <h1 className="m-0">
              <span className="block text-[clamp(2.8rem,5.5vw,5rem)] font-black leading-[0.88] tracking-tight text-white">Our</span>
              <span className="block text-[clamp(2.8rem,5.5vw,5rem)] font-black leading-[0.88] tracking-tight text-transparent bg-clip-text"
                style={{ backgroundImage:"linear-gradient(120deg,#fff 0%,#bfdbfe 50%,#60a5fa 100%)" }}>Services</span>
            </h1>

            {/* Mobile image — sits right under "Our Services" title ── */}
            <div className="flex lg:hidden justify-center items-center">
              <div className="relative w-full rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
                style={{ aspectRatio:"16/9" }}>
                {["top-0 left-0 border-t-[1.5px] border-l-[1.5px]",
                  "top-0 right-0 border-t-[1.5px] border-r-[1.5px]",
                  "bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]",
                  "bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]"
                ].map((cls,i)=>(
                  <div key={i} className={`absolute w-4 h-4 border-blue-400/50 z-20 pointer-events-none ${cls}`} />
                ))}
                <AnimatePresence mode="wait">
                  <motion.img key={`mob-img-${current.id}`} src={current.image} alt={current.title}
                    initial={{ opacity:0, scale:1.04 }} animate={{ opacity:1, scale:1 }}
                    exit={{ opacity:0, scale:0.97 }} transition={{ duration:0.45 }}
                    className="w-full h-full object-cover block absolute inset-0" />
                </AnimatePresence>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background:"linear-gradient(to bottom,rgba(7,17,31,0.08) 0%,transparent 40%,rgba(7,17,31,0.65) 100%)" }} />
                <AnimatePresence mode="wait">
                  <motion.div key={`mob-badge-${current.id}`}
                    initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                    transition={{ duration:0.2 }}
                    className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-sm border border-blue-400/20"
                    style={{ background:"rgba(7,17,31,0.82)" }}>
                    <span className="w-3.5 h-3.5 rounded flex items-center justify-center text-blue-300 shrink-0"
                      style={{ background:"rgba(59,130,246,0.2)", fontSize:"7px" }}>
                      <current.Icon />
                    </span>
                    <span className="text-[0.6rem] font-semibold text-white/80 whitespace-nowrap">{current.title}</span>
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1">
                  {SERVICES.map((_,i)=>(
                    <button key={i} onClick={()=>setActive(i)}
                      className={`h-[3px] rounded-full border-0 cursor-pointer transition-all duration-300
                        ${i===active?"w-[12px] bg-blue-400":"w-[3px] bg-white/20"}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="relative" style={{ height:"130px" }}>
              <AnimatePresence mode="wait">
                <motion.div key={current.id}
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-8 }}
                  transition={{ duration:0.28, ease:[0.22,1,0.36,1] }}
                  className="absolute inset-0 flex flex-col gap-2">

                  {/* Currently viewing chip */}
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inset-0 rounded-full bg-blue-400 opacity-50" />
                      <span className="relative rounded-full h-1.5 w-1.5 bg-blue-400" />
                    </span>
                    <span className="text-[0.6rem] text-blue-300/55">Currently viewing</span>
                    <span className="text-[0.6rem] font-bold text-blue-300/80">
                      {String(current.id).padStart(2,"0")}&nbsp;/&nbsp;{String(SERVICES.length).padStart(2,"0")}
                    </span>
                  </div>

                  {/* Service name + icon */}
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-blue-300 shrink-0 border border-blue-400/25"
                      style={{ background:"rgba(59,130,246,0.15)", fontSize:"12px" }}>
                      <current.Icon />
                    </span>
                    <p className="text-[clamp(0.95rem,1.8vw,1.25rem)] font-bold text-white leading-tight m-0">
                      {current.title}
                    </p>
                  </div>

                  {/* Description — clamped to 3 lines, height stays fixed */}
                  <p className="text-[1rem] text-gray-400 leading-relaxed m-0 line-clamp-4 max-w-[30rem]">
                    {current.description}
                  </p>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to="/contact"
                className="inline-flex items-center px-5 py-2.5 bg-white text-[#003679]
                           font-bold rounded-lg text-sm shadow-lg hover:bg-blue-50 transition-colors">
                Get in Touch →
              </Link>
              <Link to="/contact"
                className="inline-flex items-center px-5 py-2.5 border border-white/20
                           text-white/75 font-semibold rounded-lg text-sm
                           hover:border-white/45 hover:text-white hover:bg-white/5 transition-all">
                Request Quote
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-stretch border border-white/[0.07] rounded-xl overflow-hidden w-fit"
              style={{ background:"rgba(7,17,31,0.6)", backdropFilter:"blur(8px)" }}>
              {[["9","Services"],["5","Countries"],["20+","Years"],["50+","Projects"]].map(([v,l],i)=>(
                <div key={i} className={`px-4 py-2 text-center ${i>0?"border-l border-white/[0.07]":""}`}>
                  <p className="text-[1rem] font-black text-white leading-none">{v}</p>
                  <p className="text-[0.43rem] uppercase tracking-wider text-blue-300/50 mt-0.5 whitespace-nowrap">{l}</p>
                </div>
              ))}
            </div>

            {/* Thumbnail strip — desktop */}
            <div className="hidden sm:grid gap-1.5" style={{ gridTemplateColumns:"repeat(9,1fr)" }}>
              {SERVICES.map((svc,i)=>{
                const on=i===active;
                return (
                  <button key={svc.id} onClick={()=>setActive(i)}
                    className={`relative h-[48px] rounded-lg overflow-hidden cursor-pointer border-0
                                ring-1 transition-all duration-200
                                ${on?"ring-blue-400/70":"ring-white/[0.08] hover:ring-white/25"}`}>
                    <img src={svc.thumb} alt={svc.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background:on?"rgba(0,10,40,0.65)":"rgba(0,5,18,0.58)" }} />
                    {on&&<div className="absolute top-0 inset-x-0 h-[2px]"
                      style={{ background:"linear-gradient(to right,#60a5fa,#93c5fd)" }} />}
                    <p className={`absolute bottom-0.5 left-0.5 right-0.5 text-[0.43rem] font-semibold
                                   leading-tight line-clamp-2 text-left ${on?"text-white":"text-gray-400/80"}`}>
                      {svc.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Thumbnail strip — mobile */}
            <div className="sm:hidden overflow-x-auto -mx-5 px-5 scrollbar-none">
              <div className="flex gap-1.5 w-max">
                {SERVICES.map((svc,i)=>{
                  const on=i===active;
                  return (
                    <button key={svc.id} onClick={()=>setActive(i)}
                      className={`relative w-[64px] h-[44px] rounded-lg overflow-hidden shrink-0 cursor-pointer border-0
                                  ring-1 ${on?"ring-blue-400/65":"ring-white/[0.08]"}`}>
                      <img src={svc.thumb} alt={svc.title} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background:"rgba(0,5,18,0.62)" }} />
                      {on&&<div className="absolute top-0 inset-x-0 h-[2px] bg-blue-400" />}
                      <p className="absolute bottom-0.5 left-0.5 right-0.5 text-[0.4rem] text-white font-medium leading-tight line-clamp-2">
                        {svc.title}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>{/* end LEFT */}

          {/* ════ RIGHT — desktop only (mobile version is above) ════ */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-[500px] rounded-2xl overflow-hidden
                            ring-1 ring-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
              style={{ aspectRatio:"4/3" }}>
              {["top-0 left-0 border-t-[1.5px] border-l-[1.5px]",
                "top-0 right-0 border-t-[1.5px] border-r-[1.5px]",
                "bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]",
                "bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]"
              ].map((cls,i)=>(
                <div key={i} className={`absolute w-5 h-5 border-blue-400/55 z-20 pointer-events-none ${cls}`} />
              ))}
              <AnimatePresence mode="wait">
                <motion.img key={`img-${current.id}`}
                  src={current.image} alt={current.title}
                  initial={{ opacity:0, scale:1.04 }} animate={{ opacity:1, scale:1 }}
                  exit={{ opacity:0, scale:0.97 }} transition={{ duration:0.45 }}
                  className="w-full h-full object-cover block absolute inset-0" />
              </AnimatePresence>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background:"linear-gradient(to bottom,rgba(7,17,31,0.1) 0%,transparent 40%,rgba(7,17,31,0.72) 100%)" }} />
              <AnimatePresence mode="wait">
                <motion.div key={`badge-${current.id}`}
                  initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  transition={{ duration:0.22 }}
                  className="absolute bottom-3 left-3 z-10 flex items-center gap-2
                             px-3 py-1.5 rounded-full backdrop-blur-sm border border-blue-400/20"
                  style={{ background:"rgba(7,17,31,0.85)" }}>
                  <span className="w-4 h-4 rounded-md flex items-center justify-center text-blue-300 shrink-0"
                    style={{ background:"rgba(59,130,246,0.2)", fontSize:"9px" }}>
                    <current.Icon />
                  </span>
                  <span className="text-[0.68rem] font-semibold text-white/80 whitespace-nowrap">{current.title}</span>
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1">
                {SERVICES.map((_,i)=>(
                  <button key={i} onClick={()=>setActive(i)}
                    className={`h-[3px] rounded-full border-0 cursor-pointer transition-all duration-300
                      ${i===active?"w-[14px] bg-blue-400":"w-[3px] bg-white/20"}`} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── OUR CLIENTS — compact strip, bottom of hero, always in viewport ── */}
      <div className="relative z-10 w-full mt-6">

        {/* Hairline separator */}
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 mb-2">
          <div className="h-px" style={{ background:"linear-gradient(to right,transparent,rgba(255,255,255,0.09),transparent)" }} />
        </div>

        {/* "Our Clients" heading */}
        <div className="flex items-center justify-center gap-3 mb-0">
          <div className="w-6 h-px bg-white/25" />
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-blue-300/55">Our Clients</p>
          <div className="w-6 h-px bg-white/25" />
        </div>

        {/* Infinite logo carousel */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-12 sm:w-24 z-10 pointer-events-none"
            style={{ background:"linear-gradient(to right,#0a1628,transparent)" }} />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-24 z-10 pointer-events-none"
            style={{ background:"linear-gradient(to left,#0a1628,transparent)" }} />
          <div style={{ overflow:"hidden" }}>
            <div className="clients-track">
              {[...CLIENT_LOGOS,...CLIENT_LOGOS].map((src,i)=>(
                <div key={i} className="clients-slide" style={{ padding:"0 12px" }}>
                  <img src={src} alt=""
                    className="max-h-10 max-w-[96px] w-full h-full object-contain
                               opacity-40 hover:opacity-75 transition-opacity duration-300 svc-logo-blend" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

// ─── Swirling lines ───────────────────────────────────────────────────────────

function SwirlingLines() {
  const [off, setOff] = useState(0);
  useEffect(() => {
    const fn = () => setOff(window.scrollY * 0.09);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.14]">
      <svg className="w-full h-full" viewBox="0 0 1440 860" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="swirl1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(59,130,246,0)" />
            <stop offset="45%"  stopColor="rgba(96,165,250,0.55)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d={`M 30 ${-40+off} C 70 ${110+off*0.6},190 ${70+off*0.3},150 ${270+off*0.4} S 40 ${470+off*0.5},90 ${610+off*0.3}`}
          stroke="url(#swirl1)" strokeWidth="1.1" strokeLinecap="round"
          animate={{ pathLength:[0,1,0] }} transition={{ duration:11, repeat:Infinity, ease:"easeInOut" }} />
        <motion.path
          d={`M 1410 ${-30+off*0.8} C 1370 ${100+off*0.5},1260 ${55+off*0.3},1295 ${255+off*0.35} S 1405 ${435+off*0.4},1355 ${595+off*0.3}`}
          stroke="url(#swirl1)" strokeWidth="1.1" strokeLinecap="round"
          animate={{ pathLength:[0,1,0] }} transition={{ duration:14, repeat:Infinity, ease:"easeInOut", delay:1.8 }} />
      </svg>
    </div>
  );
}

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────

function PortfolioSection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Hairline top divider */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background:"linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width:"50rem", height:"25rem", background:"radial-gradient(ellipse,rgba(37,99,235,0.08) 0%,transparent 65%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }}
          className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-white/30" />
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-blue-300/70 font-semibold">Our Work</p>
            <div className="w-8 h-px bg-white/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Portfolio &{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage:"linear-gradient(to right,#fff,#93c5fd)" }}>Projects</span>
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Hover any card to pause and explore — a snapshot of what we've built.
          </p>
        </motion.div>

        {/* Desktop 3D carousel */}
        <div className="hidden sm:flex items-center justify-center relative"
          style={{ height:"320px", perspective:"1200px" }}>
          <div className="svc-portfolio-track">
            {PORTFOLIO.map((item, i) => (
              <div key={i} className="svc-portfolio-card">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="svc-portfolio-overlay" />
                <div className="absolute inset-0 flex flex-col justify-end p-3.5 z-10">
                  <span className="text-[0.55rem] font-bold tracking-[0.15em] uppercase text-blue-300 mb-1">{item.tag}</span>
                  <p className="text-white font-bold text-[0.8rem] leading-snug mb-1.5">{item.title}</p>
                  <p className="svc-portfolio-desc text-gray-300/88 text-[0.7rem] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile list */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {PORTFOLIO.map((item, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once:true }}
              className="relative rounded-xl overflow-hidden border border-white/[0.09]"
              style={{ height:"140px" }}>
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background:"linear-gradient(to top,rgba(2,8,24,0.97) 0%,rgba(2,8,24,0.5) 60%,transparent 100%)" }} />
              <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
                <span className="text-[0.55rem] font-bold tracking-widest uppercase text-blue-300 mb-1">{item.tag}</span>
                <p className="text-white font-bold text-sm leading-tight mb-1">{item.title}</p>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background:"linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />
    </section>
  );
}

// ─── QUOTATION FORM ───────────────────────────────────────────────────────────

function QuotationSection() {
  const [form, setForm] = useState({
    name:"", email:"", phone:"", company:"",
    service:"", budget:"", timeline:"", details:""
  });
  const [submitted, setSub] = useState(false);
  const [focused, setFoc]   = useState("");

  const change = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    setSub(true);
    setTimeout(() => setSub(false), 5000);
    setForm({ name:"", email:"", phone:"", company:"", service:"", budget:"", timeline:"", details:"" });
  };

  const fieldCls = (n) =>
    `w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all duration-200
     ${focused===n
       ? "border border-blue-400/65 shadow-[0_0_0_3px_rgba(59,130,246,0.10)]"
       : "border border-white/[0.09] hover:border-white/20"}`;

  const inp = (n, type="text") => ({
    name:n, type,
    value:form[n], onChange:change,
    onFocus:()=>setFoc(n), onBlur:()=>setFoc(""),
    className: fieldCls(n),
    style:{ background:"rgba(255,255,255,0.04)" },
  });

  const selectCls = (n) =>
    `w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-200 appearance-none pr-8 cursor-pointer
     ${focused===n
       ? "border border-blue-400/65 shadow-[0_0_0_3px_rgba(59,130,246,0.10)]"
       : "border border-white/[0.09] hover:border-white/20"}`;

  const Label = ({ children, required }) => (
    <label className="block text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-blue-300/50 mb-1.5">
      {children}{required && <span className="text-blue-400/70 ml-0.5">*</span>}
    </label>
  );

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background:"linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"linear-gradient(180deg,transparent 0%,rgba(11,26,46,0.35) 15%,rgba(11,26,46,0.35) 85%,transparent 100%)" }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{ background:"radial-gradient(circle at 100% 50%,rgba(37,99,235,0.07) 0%,transparent 60%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left copy */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-white/30" />
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-blue-300/70 font-semibold">Take a Look</p>
              <div className="w-8 h-px bg-white/30" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Experience{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage:"linear-gradient(to right,#fff,#93c5fd)" }}>Something</span>
              <br />with Us!
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
              Fill out the form and one of our specialists will respond with a tailored quote — fast and free.
            </p>
            {["No commitment, completely free","Response within 24 hours","Tailored to your business needs"].map((t,i)=>(
              <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once:true }}
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
            <div className="relative mt-8 rounded-2xl overflow-hidden border border-white/[0.09]"
              style={{ height:"180px" }}>
              <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
                alt="Work with us" className="w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background:"linear-gradient(135deg,rgba(0,18,48,0.75) 0%,rgba(0,10,30,0.4) 100%)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div animate={{ x:[0,6,0] }} transition={{ duration:2, repeat:Infinity, ease:"easeInOut" }}
                  className="flex items-center gap-3">
                  <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
                    <path d="M2 14C8 4,20 2,28 10 L24 8 M28 10 L24 14"
                      stroke="rgba(147,197,253,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-white font-bold text-xl leading-tight">Request a<br/>free quote →</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once:true }}
            className="relative rounded-2xl border border-white/[0.09] p-5 sm:p-8"
            style={{ background:"linear-gradient(145deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 100%)" }}>
            <div className="absolute top-0 inset-x-0 h-px rounded-t-2xl"
              style={{ background:"linear-gradient(to right,transparent,rgba(255,255,255,0.28),transparent)" }} />

            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-blue-300 font-semibold mb-1">Free Quote</p>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Request a Quotation</h3>

            <AnimatePresence>
              {submitted && (
                <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  className="mb-5 px-4 py-3 rounded-lg border border-green-400/30 text-green-300 text-sm font-medium"
                  style={{ background:"rgba(16,185,129,0.08)" }}>
                  ✓ Thanks! We'll get back to you within 24 hours.
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={submit} className="flex flex-col gap-3">

              {/* Row 1 — Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label required>Full Name</Label>
                  <input required {...inp("name")} placeholder="Juan dela Cruz" />
                </div>
                <div>
                  <Label required>Email Address</Label>
                  <input {...inp("email","email")} placeholder="juan@company.com" required />
                </div>
              </div>

              {/* Row 2 — Phone + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Phone Number</Label>
                  <input {...inp("phone","tel")} placeholder="+63 9XX XXX XXXX" />
                </div>
                <div>
                  <Label>Company / Org.</Label>
                  <input {...inp("company")} placeholder="Your company name" />
                </div>
              </div>

              {/* Row 3 — Service */}
              <div>
                <Label required>Service Needed</Label>
                <div className="relative">
                  <select name="service" value={form.service} onChange={change}
                    onFocus={()=>setFoc("service")} onBlur={()=>setFoc("")} required
                    className={selectCls("service")}
                    style={{ background:"rgba(12,24,50,0.95)", color: form.service ? "white" : "rgba(255,255,255,0.3)" }}>
                    <option value="" disabled>Select a service…</option>
                    {SERVICES.map(s=>(
                      <option key={s.title} value={s.title} style={{ color:"white", background:"#0a1628" }}>{s.title}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-[0.6rem]">▼</div>
                </div>
              </div>

              {/* Row 4 — Budget + Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Estimated Budget</Label>
                  <div className="relative">
                    <select name="budget" value={form.budget} onChange={change}
                      onFocus={()=>setFoc("budget")} onBlur={()=>setFoc("")}
                      className={selectCls("budget")}
                      style={{ background:"rgba(12,24,50,0.95)", color: form.budget ? "white" : "rgba(255,255,255,0.3)" }}>
                      <option value="" disabled>Select range…</option>
                      {["Below ₱50,000","₱50,000 – ₱150,000","₱150,000 – ₱500,000","₱500,000 – ₱1,000,000","Above ₱1,000,000","To be discussed"].map(b=>(
                        <option key={b} value={b} style={{ color:"white", background:"#0a1628" }}>{b}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-[0.6rem]">▼</div>
                  </div>
                </div>
                <div>
                  <Label>Preferred Timeline</Label>
                  <input {...inp("timeline")} placeholder="e.g. 3 months, ASAP" />
                </div>
              </div>

              {/* Row 5 — Project Details */}
              <div>
                <Label required>Project Details</Label>
                <textarea
                  name="details" rows={3}
                  placeholder="Tell us about your project — goals, requirements, and details…"
                  value={form.details} onChange={change} required
                  onFocus={()=>setFoc("details")} onBlur={()=>setFoc("")}
                  className={`${fieldCls("details")} resize-none`}
                  style={{ background:"rgba(255,255,255,0.04)" }}
                />
              </div>

              <motion.button type="submit"
                whileHover={{ scale:1.02, y:-2 }} whileTap={{ scale:0.98 }}
                transition={{ type:"spring", stiffness:400, damping:18 }}
                className="w-full py-3 font-bold text-sm tracking-widest uppercase rounded-lg
                           relative overflow-hidden text-white"
                style={{ background:"linear-gradient(135deg,#1d4ed8 0%,#2563eb 50%,#1d4ed8 100%)" }}>
                <span className="relative z-10">Submit Request</span>
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)" }} />
              </motion.button>

              <p className="text-center text-[0.62rem] text-white/20">Free &amp; non-binding · We respond within 24 hours</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}