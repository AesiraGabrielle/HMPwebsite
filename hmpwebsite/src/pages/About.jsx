import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { FaGlobe, FaHandshake, FaAward, FaUsers, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

const STATS = [
  { value: "20+", label: "Years"     },
  { value: "50+", label: "Projects"  },
  { value: "5",   label: "Countries" },
  { value: "9",   label: "Services"  },
];

const VALUES = [
  { Icon: FaAward,     title: "Quality",         desc: "Every deliverable meets the highest standard — no exceptions."            },
  { Icon: FaHandshake, title: "Reliability",     desc: "We honor commitments. Deadlines, promises, expectations all kept."        },
  { Icon: FaUsers,     title: "Professionalism", desc: "Client-first culture built on transparency and clear communication."      },
  { Icon: FaGlobe,     title: "Sustainability",  desc: "Holistic, enduring results that outlast the project lifecycle."           },
];

const PARTNERS = [
  { name: "Maria Santos",   role: "Managing Director",  country: "Philippines", code: "ph", bio: "Leads HMP Co. Philippines with 15+ years in business development and public sector advisory across Southeast Asia.", image: "/assets/images/partner-ph.jpg" },
  { name: "Julia", role: "Senior Partner",     country: "Philippines",     code: "ph", bio: "Heads the European arm specializing in economic development frameworks and institutional capacity building.",           image: "/assets/images/partner-ph.jpg" },
  { name: "Jenny Cinco",     role: "CEO",  country: "Philippines",   code: "ph", bio: "Oversees HMP partnerships, driving economic integration and SME development programs.",              image: "/assets/images/partner-ph.jpg" },
  { name: "Niel John Butad",  role: "Country Lead",       country: "Philippines", code: "ph", bio: "Guides HMP engagement in Timor-Leste with focus on institutional reform and rural development.",                     image: "/assets/images/partner-ph.jpg" },
  { name: "Linh Nguyen",    role: "Operations Manager", country: "Philippines",     code: "ph", bio: "Coordinates project delivery in Vietnam, linking international expertise with local business realities.",              image: "/assets/images/partner-ph.jpg" },
];

const GROUP_PHOTOS = [
  "/assets/images/Team/1st.jpg", "/assets/images/Team/2nd.jpg",
  "/assets/images/Team/3rd.jpg", "/assets/images/Team/4th.jpg",
  "/assets/images/Team/5th.jpg", "/assets/images/Team/6th.jpg",
];

const VM = [
  {
    tag: "Vision", title: "Complexity into Clarity",
    body: "To be the leading consultancy bridge between Asia and Europe, empowering institutions and enterprises to achieve sustainable growth through people-centered solutions that endure beyond the project.",
    bg:  "linear-gradient(135deg,rgba(59,130,246,0.15),rgba(96,165,250,0.05))",
    bar: "linear-gradient(to bottom,#60a5fa,#1d4ed8)",
  },
  {
    tag: "Mission", title: "Simple Solutions, Real Impact",
    body: "To deliver high-quality, cost-effective advisory services that transform complex challenges into actionable strategies — serving clients across economic development, technology, education, and governance.",
    bg:  "linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",
    bar: "linear-gradient(to bottom,rgba(255,255,255,0.5),rgba(255,255,255,0.08))",
  },
];

function SectionLabel({ text }) {
  return (
    <div className="about-divider mb-10">
      <div className="about-divider-line about-divider-line-r" />
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300 shrink-0">{text}</span>
      <div className="about-divider-line about-divider-line-l" />
    </div>
  );
}

export default function About() {
  return (
    <div className="about-page overflow-x-hidden font-sans text-white min-h-screen">
      <Hero />
      <StoryValues />
      <VisionMission />
      <PartnersCarousel />
      <OurPeople />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-stretch overflow-hidden pb-[72px]">

      {/* Left image — desktop only */}
      <div className="hidden lg:block w-1/2 relative">
        <img src="/assets/images/Team/heroabout.jpg" alt="HMP Team"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d0f1a]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a]/70 to-transparent" />
      </div>

      {/* Right — text */}
      <div className="w-full lg:w-1/2 flex items-center px-5 sm:px-8 lg:px-16 pt-28 sm:pt-32 lg:pt-13 pb-20 relative z-10">
        <div className="absolute left-0 top-1/4 bottom-1/4 w-px hidden lg:block bg-gradient-to-b from-transparent via-[rgba(99,179,237,0.4)] to-transparent" />

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-blue-400/70" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300">About HMP Co.</span>
          </div>

          <h1 className="font-black leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(1.9rem, 5vw, 4.5rem)" }}>
            Connecting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-300">Asia</span>
            {" "}and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-sky-100">Europe</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 max-w-lg">
            HMP Consulting cooperates with partners across Germany, Indonesia, Philippines, Timor-Leste and Vietnam —
            advising ministries, universities, and private institutions in economic development.
          </p>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg mb-10">
            For over two decades we have been passionate about achieving sustainable, holistic, and enduring results.
            Customer satisfaction is our top priority.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}>
              <Link to="/contact"
                className="px-6 py-3 bg-white text-[#003679] font-bold rounded-lg text-sm shadow-xl hover:bg-blue-50 transition-colors duration-200">
                Work With Us
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}>
              <Link to="/services"
                className="px-6 py-3 border border-white/20 text-white font-semibold rounded-lg text-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200">
                Our Services
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.3)_0%,transparent_60%)]" />

      {/* Stats bar */}
      <div className="stats-bar">
        <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.08]">
          {STATS.map((s, i) => (
            <motion.div key={i} className="text-center px-4"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}>
              <p className="stats-value">{s.value}</p>
              <p className="text-gray-400 text-[11px] uppercase tracking-widest mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryValues() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Our Principles" />

        <div className="relative mb-14 max-w-3xl mx-auto text-center">
          <FaQuoteLeft className="text-blue-400/25 text-5xl absolute -top-2 -left-4" />
          <p className="text-base sm:text-xl md:text-2xl text-gray-200 leading-relaxed italic font-light px-2 sm:px-0">
            "We transform complex requests into simple solutions — helping our customers at a low cost and in less time."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {VALUES.map((v, i) => (
            <motion.div key={i} className="value-card"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }} viewport={{ once: true }}
              whileHover={{ y: -5 }}>
              <div className="value-card-glow" />
              <div className="value-card-icon">
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

function VisionMission() {
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
        {VM.map((item, i) => (
          <motion.div key={i} className="vm-card" style={{ background: item.bg }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.6 }} viewport={{ once: true }}>
            <div className="vm-card-bar" style={{ background: item.bar }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300 mb-2 block">{item.tag}</span>
            <h3 className="text-2xl font-black text-white mb-3">{item.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PartnersCarousel() {
  const [active, setActive] = useState(2);
  const total = PARTNERS.length;
  const prev  = () => setActive(a => (a - 1 + total) % total);
  const next  = () => setActive(a => (a + 1) % total);

  const cardStyle = (i) => {
    let off = ((i - active + total) % total);
    if (off > total / 2) off -= total;
    const abs = Math.abs(off);
    return {
      transform: `translateX(${off * 270}px) rotateY(${off * -11}deg) scale(${abs === 0 ? 1 : abs === 1 ? 0.83 : 0.67})`,
      zIndex: total - abs,
      opacity: abs > 2 ? 0 : abs === 2 ? 0.3 : 1,
      pointerEvents: abs > 2 ? "none" : "auto",
    };
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_65%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel text="The Team" />

        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-sky-100">Partners</span>
          </h2>
        </div>

        <div className="p-stage">
          {PARTNERS.map((p, i) => (
            <div key={i} className="p-card" style={cardStyle(i)} onClick={() => setActive(i)}>
              <div className={`p-card-inner ${i === active ? "p-card-active" : "p-card-inactive"}`}>
                <div className="relative h-52 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover object-top" />
                  <div className="p-card-grad" />
                  <img src={`https://flagcdn.com/w40/${p.code}.png`} alt={p.country}
                    className="absolute top-3 right-3 w-8 h-5 object-cover rounded border border-white/20" />
                  {i === active && <div className="p-card-shimmer" />}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-black text-base">{p.name}</h3>
                  <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mt-0.5">{p.role}</p>
                  <p className="text-gray-500 text-[10px] mb-2">{p.country}</p>
                  <AnimatePresence>
                    {i === active && (
                      <motion.p key="bio" className="text-gray-400 text-[11px] leading-relaxed overflow-hidden"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }}>
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
          <motion.button className="p-nav-btn" onClick={prev}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
            <FaChevronLeft size={11} />
          </motion.button>
          <div className="flex gap-2">
            {PARTNERS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? "w-5 h-2 bg-blue-400" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`} />
            ))}
          </div>
          <motion.button className="p-nav-btn" onClick={next}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
            <FaChevronRight size={11} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function OurPeople() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Our People" />

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div style={{ flexShrink: 0 }}
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <div className="relative inline-block">
              <div className="absolute -inset-10 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(59,130,246,0.09)_0%,transparent_65%)]" />
              <div className="carousel-wrapper">
                <div className="carousel-container">
                  <div className="carousel-track">
                    {GROUP_PHOTOS.map((src, i) => (
                      <div key={i} style={{ backgroundImage: `url(${src})` }}
                        aria-label={`HMP Philippines team photo ${i + 1}`} />
                    ))}
                  </div>
                </div>
              </div>
              <motion.div className="mt-4 text-center"
                animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <span className="people-badge">HMP Co. Philippines</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-tight text-center lg:text-left">
              The Faces Behind{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-blue-100">HMP Philippines</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-4 text-center lg:text-left">
              Our Philippine team is the backbone of HMP Co. operations in Southeast Asia — a passionate group
              committed to delivering excellence across all nine service areas.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 rounded-lg text-sm font-semibold text-white hover:border-blue-400/50 hover:bg-blue-400/5 transition-all duration-200">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}