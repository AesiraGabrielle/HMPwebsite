import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { FaGlobe, FaHandshake, FaAward, FaUsers, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "20+", label: "Years" },
  { value: "50+", label: "Projects" },
  { value: "5",   label: "Countries" },
  { value: "9",   label: "Services" },
];

const VALUES = [
  { Icon: FaAward,     title: "Quality",         desc: "Every deliverable meets the highest standard — no exceptions." },
  { Icon: FaHandshake, title: "Reliability",     desc: "We honor commitments. Deadlines, promises, expectations all kept." },
  { Icon: FaUsers,     title: "Professionalism", desc: "Client-first culture built on transparency and clear communication." },
  { Icon: FaGlobe,     title: "Sustainability",  desc: "Holistic, enduring results that outlast the project lifecycle." },
];

const PARTNERS = [
  { name: "Maria Santos",   role: "Managing Director",  country: "Philippines", code: "ph", bio: "Leads HMP Co. Philippines with 15+ years in business development and public sector advisory across Southeast Asia.", image: "/assets/images/partner-ph.jpg" },
  { name: "Klaus Hoffmann", role: "Senior Partner",     country: "Germany",     code: "de", bio: "Heads the European arm specializing in economic development frameworks and institutional capacity building.",           image: "/assets/images/partner-de.jpg" },
  { name: "Ayu Rahayu",     role: "Regional Director",  country: "Indonesia",   code: "id", bio: "Oversees HMP partnerships across Indonesia, driving economic integration and SME development programs.",              image: "/assets/images/partner-id.jpg" },
  { name: "Joao da Silva",  role: "Country Lead",       country: "Timor-Leste", code: "tl", bio: "Guides HMP engagement in Timor-Leste with focus on institutional reform and rural development.",                     image: "/assets/images/partner-tl.jpg" },
  { name: "Linh Nguyen",    role: "Operations Manager", country: "Vietnam",     code: "vn", bio: "Coordinates project delivery in Vietnam, linking international expertise with local business realities.",              image: "/assets/images/partner-vn.jpg" },
];

// const GROUP_PHOTOS = [
//   "/assets/images/team-1.jpg",
//   "/assets/images/team-2.jpg",
//   "/assets/images/team-3.jpg",
//   "/assets/images/team-4.jpg",
//   "/assets/images/team-5.jpg",
// ];
const GROUP_PHOTOS = [
  "https://placehold.co/400x250/003679/white?text=Team+Photo+1",
  "https://placehold.co/400x250/012046/white?text=Team+Photo+2",
  "https://placehold.co/400x250/001228/white?text=Team+Photo+3",
  "https://placehold.co/400x250/003679/white?text=Team+Photo+4",
  "https://placehold.co/400x250/012046/white?text=Team+Photo+5",
];

// ─── CSS blocks ───────────────────────────────────────────────────────────────

const PARTNER_CSS = `
  .p-stage {
    position: relative; width: 100%; height: 460px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; perspective: 900px; transform-style: preserve-3d;
  }
  .p-card {
    position: absolute; width: 200px;
    transition: all 0.42s cubic-bezier(0.25,0.46,0.45,0.94);
    cursor: pointer;
  }
  @media (min-width: 480px) { .p-card { width: 240px; } }
`;

const GALLERY_CSS = `
  .carousel-wrapper {
    width: 520px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 5px 25px 0px rgba(46, 61, 73, 0.35);
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(9,18,36,0.5);
  }
  .carousel-container {
    width: 400px;
    height: 250px;
    overflow: hidden;
    border-radius: 12px;
  }
  .carousel-track {
    display: flex;
    width: calc(400px * 5);
    animation: hmpSliding 20s infinite;
  }
  .carousel-track:hover {
    animation-play-state: paused;
  }
  .carousel-track > div {
    width: 400px;
    height: 250px;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
  }
  @keyframes hmpSliding {
    0%   { transform: translateX(0); }
    18%  { transform: translateX(0); }
    22%  { transform: translateX(-400px); }
    38%  { transform: translateX(-400px); }
    42%  { transform: translateX(-800px); }
    58%  { transform: translateX(-800px); }
    62%  { transform: translateX(-1200px); }
    78%  { transform: translateX(-1200px); }
    82%  { transform: translateX(-1600px); }
    98%  { transform: translateX(-1600px); }
    100% { transform: translateX(0); }
  }
  @media screen and (max-width: 768px) {
    .carousel-wrapper {
      width: 312px;
      height: 210px;
    }
    .carousel-container {
      width: 240px;
      height: 150px;
    }
    .carousel-track {
      width: calc(240px * 5);
      animation-name: hmpSlidingMobile;
    }
    .carousel-track > div {
      width: 240px;
      height: 150px;
    }
    @keyframes hmpSlidingMobile {
      0%   { transform: translateX(0); }
      18%  { transform: translateX(0); }
      22%  { transform: translateX(-240px); }
      38%  { transform: translateX(-240px); }
      42%  { transform: translateX(-480px); }
      58%  { transform: translateX(-480px); }
      62%  { transform: translateX(-720px); }
      78%  { transform: translateX(-720px); }
      82%  { transform: translateX(-960px); }
      98%  { transform: translateX(-960px); }
      100% { transform: translateX(0); }
    }
  }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="overflow-x-hidden font-sans text-white min-h-screen"
      style={{ background: "linear-gradient(160deg, #0d0f1a 0%, #0f1c2e 40%, #091929 70%, #0a1020 100%)" }}>
      <HeroSplit />
      <StoryValues />
      <VisionMission />
      <PartnersCarousel />
      <OurPeople />
      <Footer />
    </div>
  );
}

// ─── 1. Hero ──────────────────────────────────────────────────────────────────

function HeroSplit() {
  return (
    <section className="relative min-h-screen flex items-stretch overflow-hidden" style={{ paddingBottom: "72px" }}>
      <div className="hidden lg:block w-1/2 relative">
        <img src="/assets/images/about-hero.jpg" alt="HMP Team"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(13,15,26,0) 40%, rgba(13,15,26,1) 100%)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,15,26,0.7) 0%, transparent 40%)" }} />
      </div>

      <div className="w-full lg:w-1/2 flex items-center px-5 sm:px-8 lg:px-16 pt-25 sm:pt-24 lg:pt-15 pb-20 relative z-10">
        <div className="absolute left-0 top-1/4 bottom-1/4 w-px hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(99,179,237,0.4), transparent)" }} />
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-blue-400/70" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300">About HMP Co.</span>
          </div>
          <h1 className="font-black leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(1.9rem, 5vw, 4.5rem)" }}>
            Connecting{" "}
            <em className="not-italic text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg,#60a5fa,#a5f3fc)" }}>Asia</em>
            {" "}and{" "}
            <em className="not-italic text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg,#93c5fd,#e0f2fe)" }}>Europe</em>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-4 max-w-lg">
            HMP Consulting cooperates with partners across Germany, Indonesia, Philippines, Timor-Leste and Vietnam —
            advising ministries, universities, and private institutions in economic development.
          </p>
          <p className="text-gray-400 text-base leading-relaxed max-w-lg mb-10">
            For over two decades we have been passionate about achieving sustainable, holistic, and enduring results.
            Customer satisfaction is our top priority.
          </p>
          <div className="flex gap-4 flex-wrap">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }} className="inline-block">
              <Link to="/contact"
                className="px-6 py-3 bg-white text-[#003679] font-bold rounded-lg text-sm shadow-xl hover:bg-blue-50 transition-colors duration-200">
                Work With Us
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }} className="inline-block">
              <Link to="/services"
                className="px-6 py-3 border border-white/20 text-white font-semibold rounded-lg text-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200">
                Our Services
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle at 80% 20%, rgba(96,165,250,0.3) 0%, transparent 60%)" }} />

      <div className="absolute bottom-0 inset-x-0 border-t border-white/8 z-20"
        style={{ background: "rgba(13,15,26,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/8">
          {STATS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
              className="text-center px-4">
              <p className="text-2xl font-black text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg,#ffffff,#93c5fd)" }}>
                {s.value}
              </p>
              <p className="text-gray-400 text-[11px] uppercase tracking-widest mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 2. Story + Values ────────────────────────────────────────────────────────

function StoryValues() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right,rgba(96,165,250,0.4),transparent)" }} />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300 shrink-0">Our Principles</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left,rgba(96,165,250,0.4),transparent)" }} />
        </div>
        <div className="relative mb-14 max-w-3xl mx-auto text-center">
          <FaQuoteLeft className="text-blue-400/25 text-5xl absolute -top-2 -left-4" />
          <p className="text-base sm:text-xl md:text-2xl text-gray-200 leading-relaxed italic font-light px-2 sm:px-0">
            "We transform complex requests into simple solutions — helping our customers at a low cost and in less time."
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {VALUES.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }} viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl p-6 border border-white/8 hover:border-blue-400/30 transition-all duration-300 relative overflow-hidden"
              style={{ background: "linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.015) 100%)" }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(96,165,250,0.08) 0%, transparent 65%)" }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-blue-400/20"
                style={{ background: "rgba(59,130,246,0.10)" }}>
                <v.Icon className="text-blue-300 text-base" />
              </div>
              <h3 className="text-white font-bold text-base mb-1">{v.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. Vision & Mission ──────────────────────────────────────────────────────

function VisionMission() {
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[
            {
              tag: "Vision",
              title: "Complexity into Clarity",
              body: "To be the leading consultancy bridge between Asia and Europe, empowering institutions and enterprises to achieve sustainable growth through people-centered solutions that endure beyond the project.",
              accent: "linear-gradient(135deg,rgba(59,130,246,0.15),rgba(96,165,250,0.05))",
              bar: "linear-gradient(to bottom,#60a5fa,#1d4ed8)",
            },
            {
              tag: "Mission",
              title: "Simple Solutions, Real Impact",
              body: "To deliver high-quality, cost-effective advisory services that transform complex challenges into actionable strategies — serving clients across economic development, technology, education, and governance.",
              accent: "linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",
              bar: "linear-gradient(to bottom,rgba(255,255,255,0.5),rgba(255,255,255,0.08))",
            },
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }} viewport={{ once: true }}
              className="relative rounded-2xl p-5 sm:p-8 border border-white/8 overflow-hidden"
              style={{ background: item.accent }}>
              <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: item.bar }} />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300 mb-2 block">{item.tag}</span>
              <h3 className="text-2xl font-black text-white mb-3">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. Partners Carousel ─────────────────────────────────────────────────────

function PartnersCarousel() {
  const [active, setActive] = useState(2);
  const total = PARTNERS.length;
  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);

  function cardStyle(i) {
    let off = ((i - active + total) % total);
    if (off > total / 2) off -= total;
    const abs = Math.abs(off);
    return {
      transform: `translateX(${off * 270}px) rotateY(${off * -11}deg) scale(${abs === 0 ? 1 : abs === 1 ? 0.83 : 0.67})`,
      zIndex: total - abs,
      opacity: abs > 2 ? 0 : abs === 2 ? 0.3 : 1,
      pointerEvents: abs > 2 ? "none" : "auto",
    };
  }

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <style>{PARTNER_CSS}</style>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 65%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right,rgba(96,165,250,0.4),transparent)" }} />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300 shrink-0">The Team</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left,rgba(96,165,250,0.4),transparent)" }} />
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg,#93c5fd,#e0f2fe)" }}>Partners</span>
          </h2>
        </div>
        <div className="p-stage">
          {PARTNERS.map((p, i) => (
            <div key={i} className="p-card" style={cardStyle(i)} onClick={() => setActive(i)}>
              <div className={`rounded-2xl overflow-hidden border transition-all duration-300 ${i === active ? "border-blue-400/50 shadow-2xl shadow-blue-900/40" : "border-white/8"}`}
                style={{ background: "linear-gradient(145deg,rgba(15,28,46,0.95),rgba(9,25,41,0.98))" }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top,rgba(9,25,41,1) 0%,transparent 55%)" }} />
                  <img src={`https://flagcdn.com/w40/${p.code}.png`} alt={p.country}
                    className="absolute top-3 right-3 w-8 h-5 object-cover rounded border border-white/20" />
                  {i === active && (
                    <div className="absolute bottom-0 inset-x-0 h-0.5"
                      style={{ background: "linear-gradient(to right,transparent,#60a5fa,transparent)" }} />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-black text-base">{p.name}</h3>
                  <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mt-0.5">{p.role}</p>
                  <p className="text-gray-500 text-[10px] mb-2">{p.country}</p>
                  <AnimatePresence>
                    {i === active && (
                      <motion.p key="bio"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }}
                        className="text-gray-400 text-[11px] leading-relaxed overflow-hidden">
                        {p.bio}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-5 mt-4">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} onClick={prev}
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-all"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <FaChevronLeft size={11} />
          </motion.button>
          <div className="flex gap-2">
            {PARTNERS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? "w-5 h-2 bg-blue-400" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`} />
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} onClick={next}
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-all"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <FaChevronRight size={11} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

// ─── 5. Our People ────────────────────────────────────────────────────────────

function OurPeople() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden border-t border-white/5">
      <style>{GALLERY_CSS}</style>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-14">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right,rgba(96,165,250,0.4),transparent)" }} />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300 shrink-0">Our People</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left,rgba(96,165,250,0.4),transparent)" }} />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Sliding carousel — left */}
          <motion.div
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
            style={{ flexShrink: 0 }}
          >
            <div style={{ position: "relative", display: "inline-block" }}>
              {/* Soft blue glow */}
              <div style={{
                position: "absolute", inset: "-40px",
                background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 65%)",
                pointerEvents: "none", borderRadius: "50%",
              }} />

              {/* Sliding carousel */}
              <div className="carousel-wrapper">
                <div className="carousel-container">
                  <div className="carousel-track">
                    {GROUP_PHOTOS.map((src, i) => (
                      <div
                        key={i}
                        style={{ backgroundImage: `url(${src})` }}
                        aria-label={`HMP Philippines team photo ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ marginTop: "16px", textAlign: "center", display: "block", position: "relative", zIndex: 10 }}
              >
                <span
                  className="inline-block px-5 py-2 rounded-xl border border-white/12 text-xs font-bold text-white whitespace-nowrap"
                  style={{ background: "rgba(9,18,36,0.95)", boxShadow: "0 6px 20px rgba(0,0,0,0.4)" }}
                >
                  HMP Co. Philippines
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text — right */}
          <motion.div
            initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-tight text-center lg:text-left">
              The Faces Behind{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg,#93c5fd,#bfdbfe)" }}>
                HMP Philippines
              </span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-4 text-center lg:text-left">
              Our Philippine team is the backbone of HMP Co. operations in Southeast Asia — a passionate group
              committed to delivering excellence across all nine service areas.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 text-center lg:text-left">
              Replace the placeholders with real team photos at{" "}
              <code className="text-blue-300 text-xs bg-white/5 px-1.5 py-0.5 rounded">public/assets/images/team-1.jpg</code>{" "}
              through{" "}
              <code className="text-blue-300 text-xs bg-white/5 px-1.5 py-0.5 rounded">team-5.jpg</code>.
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 rounded-lg text-sm font-semibold text-white hover:border-blue-400/50 hover:bg-blue-400/5 transition-all duration-200">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}