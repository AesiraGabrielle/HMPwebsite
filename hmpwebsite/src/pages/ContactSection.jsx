import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp,
  FaChevronDown, FaClock, FaPaperPlane,
} from "react-icons/fa";

const EJS_SERVICE  = "service_lquhvw3";
const EJS_TEMPLATE = "template_ya3bi19";
const EJS_KEY      = "fVq3XS0DRhIyEJHzP";

const CARDS = [
  { Icon: FaPhone,        label: "Call Us",  lines: ["+63 917 115 9105"],               href: "tel:+639171159105",                   grad: "from-blue-400 to-sky-300",    glow: "rgba(56,189,248,0.15)"  },
  { Icon: FaEnvelope,     label: "Email Us", lines: ["hmpconsultingph@gmail.com"],       href: "mailto:hmpconsultingph@gmail.com",     grad: "from-indigo-400 to-blue-400", glow: "rgba(129,140,248,0.15)" },
  { Icon: FaMapMarkerAlt, label: "Visit Us", lines: ["Gnd Flr. Visto Bldg., Zone V","Sogod, Southern Leyte 6606"], href: "https://maps.google.com/?q=Sogod,Southern+Leyte,Philippines", grad: "from-emerald-400 to-blue-400", glow: "rgba(52,211,153,0.12)" },
];

const SOCIALS = [
  { Icon: FaFacebook,  label: "Facebook",  sub: "HMP Consulting",   href: "https://www.facebook.com/hmpcoph", hex: "#1877F2" },
  { Icon: FaLinkedin,  label: "LinkedIn",  sub: "HMP Consulting",   href: "https://linkedin.com",             hex: "#0A66C2" },
  { Icon: FaInstagram, label: "Instagram", sub: "@hmpconsulting",   href: "https://instagram.com",            hex: "#E1306C" },
  { Icon: FaWhatsapp,  label: "WhatsApp",  sub: "+63 912 345 6789", href: "https://wa.me/639123456789",       hex: "#25D366" },
];

const SERVICES = ["Web & Software Development","Accounting & Bookkeeping","Social Media & Graphics Design","German Language Tutorials","German Au Pair Agency","Consultancy Services","Business Plan, Feasibility & Research","IT Technical Support","Engineering Services","General Inquiry"];
const BUDGETS  = ["Under ₱50,000","₱50,000 – ₱150,000","₱150,000 – ₱500,000","₱500,000+","To be discussed"];
const HOURS    = [{ day:"Monday – Friday", time:"8:00 AM – 6:00 PM", open:true },{ day:"Saturday", time:"9:00 AM – 1:00 PM", open:true },{ day:"Sunday", time:"Closed", open:false }];
const PILLS    = [{ icon:"⚡", label:"24hr Response" },{ icon:"🌏", label:"5 Countries" },{ icon:"💬", label:"Free Consultation" },{ icon:"✅", label:"No Commitment" }];

const fadeUp = {
  hidden: { opacity:0, y:28 },
  show: (i=0) => ({ opacity:1, y:0, transition:{ duration:0.6, delay:i*0.1, ease:[0.22,1,0.36,1] } }),
};

function Eyebrow({ label, centered=false }) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}>
      <div className="w-8 h-px bg-white/30" />
      <p className="text-xs uppercase tracking-[0.3em] text-blue-300 font-semibold">{label}</p>
      {centered && <div className="w-8 h-px bg-white/30" />}
    </div>
  );
}

function CustomSelect({ name, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`contact-select w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm border transition-all duration-200 bg-white/[0.04] ${
          open ? "border-blue-400/55 shadow-[0_0_0_3px_rgba(59,130,246,0.09)]" : "border-white/10 hover:border-white/20"
        }`}
        style={{ color: value ? "white" : "rgba(255,255,255,0.3)" }}>
        <span className="truncate">{value || placeholder}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="ml-2 shrink-0">
          <FaChevronDown className="text-white/30 text-[10px]" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul className="contact-dropdown absolute z-50 w-full mt-1.5 rounded-xl border border-white/10 overflow-hidden"
            style={{ background: "rgba(8,18,40,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity:0, y:-6, scaleY:0.92 }} animate={{ opacity:1, y:0, scaleY:1 }}
            exit={{ opacity:0, y:-6, scaleY:0.92 }} transition={{ duration:0.16 }}>
            {options.map(opt => (
              <li key={opt}>
                <button type="button" onClick={() => { onChange(name, opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                    value === opt ? "text-blue-300 bg-blue-500/10" : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}>{opt}</button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [tab,        setTab]        = useState("quote");
  const [form,       setForm]       = useState({ name:"", email:"", phone:"", company:"", service:"", budget:"", timeline:"", message:"" });
  const [focused,    setFocused]    = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState("");

  const set    = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const setSel = (name, val) => setForm(p => ({ ...p, [name]: val }));

  const handleSubmit = async e => {
    e.preventDefault(); setSubmitting(true); setError("");
    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        form_type: tab === "quote" ? "Quote Request" : "General Inquiry",
        from_name: form.name, from_email: form.email,
        phone:    form.phone    || "Not provided",
        company:  form.company  || "Not provided",
        service:  form.service  || "Not specified",
        budget:   form.budget   || "Not specified",
        timeline: form.timeline || "Not specified",
        message:  form.message,
      }, EJS_KEY);
      setSubmitted(true);
      setForm({ name:"", email:"", phone:"", company:"", service:"", budget:"", timeline:"", message:"" });
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setError("Something went wrong — please try again or contact us directly.");
    } finally { setSubmitting(false); }
  };

  const inputClass = name =>
    `w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 border outline-none transition-all duration-200 bg-white/[0.04] ${
      focused === name
        ? "border-blue-400/55 shadow-[0_0_0_3px_rgba(59,130,246,0.09)]"
        : "border-white/10 hover:border-white/20"
    }`;

  const field = name => ({
    name, value: form[name], onChange: set,
    onFocus: () => setFocused(name), onBlur: () => setFocused(""),
    className: inputClass(name),
  });

  return (
    <div className="overflow-x-hidden font-sans text-white min-h-screen bg-gradient-to-b from-[#07111f] to-[#040c1a]">

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden pt-[72px]">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.22)_0%,transparent_65%)]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_0%_100%,rgba(56,189,248,0.10)_0%,transparent_60%)]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_100%_100%,rgba(99,102,241,0.10)_0%,transparent_60%)]" />
        </div>

        {/* Grid texture — needs backgroundImage, kept as style */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(147,197,253,1) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <motion.div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(37,99,235,0.08)_0%,transparent_70%)]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(56,189,248,0.06)_0%,transparent_70%)]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-16 sm:py-20">
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}>
            <Eyebrow label="Get In Touch" centered />

            <h1 className="font-bold leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
              Let's Build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#bfdbfe] to-[#60a5fa]">Something</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] to-white">Great Together</span>
            </h1>

            <p className="text-gray-300/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Whether you need a quote or have a quick question — we'd love to hear from you. We respond within 24 hours.
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {PILLS.map((s, i) => (
                <motion.span key={i}
                  initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration:0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/70 border border-white/10 bg-white/[0.05] backdrop-blur-sm">
                  <span>{s.icon}</span><span>{s.label}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none bg-gradient-to-b from-transparent to-[#07111f]" />
      </section>

      {/* ── Info Cards ── */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CARDS.map((c, i) => (
            <motion.a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
              variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once:true }}
              whileHover={{ y:-5, scale:1.02 }} transition={{ type:"spring", stiffness:300, damping:22 }}
              className="group relative flex items-center gap-4 p-5 rounded-2xl border border-white/[0.08] overflow-hidden bg-white/[0.04] backdrop-blur-[10px]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 20% 50%, ${c.glow} 0%, transparent 70%)` }} />
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${c.grad}`}
                style={{ boxShadow: `0 4px 16px ${c.glow}` }}>
                <c.Icon className="text-white text-sm" />
              </div>
              <div className="relative z-10 min-w-0 flex-1">
                <p className="text-[9px] text-white/35 uppercase tracking-widest mb-1">{c.label}</p>
                {c.lines.map((l, j) => (
                  <p key={j} className="text-white/80 text-xs sm:text-sm font-medium leading-snug truncate">{l}</p>
                ))}
              </div>
              <svg className="text-white/15 group-hover:text-blue-300 transition-colors duration-300 shrink-0" width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6 xl:gap-10 items-start">

          {/* Form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} className="lg:col-span-3">

            <div className="inline-flex rounded-xl border border-white/[0.08] p-1 mb-4 bg-white/[0.04]">
              {[{ key:"quote", label:"Request a Quote" },{ key:"general", label:"General Inquiry" }].map(t => (
                <button key={t.key} type="button" onClick={() => setTab(t.key)}
                  className="relative px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200"
                  style={{ color: tab === t.key ? "white" : "rgba(255,255,255,0.4)" }}>
                  {tab === t.key && (
                    <motion.div layoutId="tab"
                      className="absolute inset-0 rounded-lg border border-white/10 bg-[rgba(37,99,235,0.45)]"
                      transition={{ type:"spring", stiffness:420, damping:32 }} />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-white/[0.03] backdrop-blur-[16px]">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(147,197,253,0.3)] to-transparent" />

              <div className="p-5 sm:p-6">
                <AnimatePresence>
                  {submitted && (
                    <motion.div initial={{ opacity:0, y:-12, scale:0.96 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, scale:0.96 }}
                      className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-400/20 bg-[rgba(16,185,129,0.08)]">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-emerald-500/20">
                        <svg width="12" height="9" viewBox="0 0 13 10" fill="none"><path d="M1 5l3.5 3.5L12 1" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <div>
                        <p className="text-emerald-300 font-semibold text-sm">Message sent!</p>
                        <p className="text-emerald-400/60 text-xs mt-0.5">We'll be in touch within 24 hours.</p>
                      </div>
                    </motion.div>
                  )}
                  {error && (
                    <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                      className="mb-4 px-4 py-3 rounded-xl border border-red-400/20 text-red-300 text-sm bg-[rgba(239,68,68,0.07)]">
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 pl-1">Full Name *</label>
                      <input type="text" placeholder="Juan dela Cruz" required {...field("name")} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 pl-1">Email Address *</label>
                      <input type="email" placeholder="juan@company.com" required {...field("email")} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 pl-1">Phone Number</label>
                      <input type="tel" placeholder="+63 9XX XXX XXXX" {...field("phone")} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 pl-1">Company / Org.</label>
                      <input type="text" placeholder="Your company name" {...field("company")} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 pl-1">Service Needed *</label>
                    <CustomSelect name="service" value={form.service} onChange={setSel} options={SERVICES} placeholder="Select a service…" />
                  </div>
                  <AnimatePresence>
                    {tab === "quote" && (
                      <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
                        transition={{ duration:0.28 }} className="overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                          <div>
                            <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 pl-1">Estimated Budget</label>
                            <CustomSelect name="budget" value={form.budget} onChange={setSel} options={BUDGETS} placeholder="Select range…" />
                          </div>
                          <div>
                            <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 pl-1">Preferred Timeline</label>
                            <input type="text" placeholder="e.g. 3 months, ASAP" {...field("timeline")} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div>
                    <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 pl-1">
                      {tab === "quote" ? "Project Details *" : "Your Message *"}
                    </label>
                    <textarea rows={4} required {...field("message")}
                      placeholder={tab === "quote" ? "Tell us about your project — goals, requirements, and details…" : "How can we help you today?"}
                      className={`${inputClass("message")} resize-none`} />
                  </div>

                  <motion.button type="submit"
                    whileHover={{ scale:1.015, y:-1 }} whileTap={{ scale:0.98 }}
                    transition={{ type:"spring", stiffness:400, damping:18 }}
                    disabled={submitting}
                    className="w-full py-3 font-bold text-sm rounded-xl relative overflow-hidden text-white disabled:opacity-60 mt-1 bg-gradient-to-br from-[#1d4ed8] via-[#2563eb] to-[#1d4ed8]">
                    <span className="relative z-10 flex items-center justify-center gap-2.5">
                      {submitting
                        ? <><motion.span className="w-4 h-4 rounded-full border-2 border-white/25 border-t-white inline-block"
                            animate={{ rotate:360 }} transition={{ duration:0.75, repeat:Infinity, ease:"linear" }} />Sending…</>
                        : <><FaPaperPlane className="text-xs" />{tab === "quote" ? "Submit Quote Request" : "Send Message"}</>}
                    </span>
                  </motion.button>
                  <p className="text-center text-[10px] text-white/20">Free &amp; non-binding · We respond within 24 hours</p>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once:true }}
              className="rounded-2xl border border-white/[0.08] p-5 bg-white/[0.03] backdrop-blur-[16px]">
              <div className="mb-5">
                <Eyebrow label="Other Ways to Reach Us" />
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  Always <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">Here for You</span>
                </h2>
                <p className="text-gray-400/70 text-xs mt-1.5 leading-relaxed">Prefer a direct line? Reach us through any of these channels.</p>
              </div>
              <div className="h-px w-full mb-4 bg-white/[0.06]" />
              <p className="text-[9px] text-white/35 uppercase tracking-widest mb-3">Follow &amp; Connect</p>
              <div className="grid grid-cols-2 gap-2.5">
                {SOCIALS.map((s, i) => (
                  <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale:1.03, y:-2 }} whileTap={{ scale:0.97 }}
                    transition={{ type:"spring", stiffness:380, damping:20 }}
                    className="group flex items-center gap-2.5 p-3 rounded-xl border border-white/[0.07] transition-all duration-200 bg-white/[0.04]"
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.hex}50`; e.currentTarget.style.background = `${s.hex}14`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.hex}22` }}>
                      <s.Icon style={{ color: s.hex, fontSize: 13 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white/75 group-hover:text-white transition-colors leading-none mb-0.5">{s.label}</p>
                      <p className="text-[10px] text-white/30 truncate">{s.sub}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once:true }}
              className="rounded-2xl border border-white/[0.08] overflow-hidden bg-white/[0.03] backdrop-blur-[16px]">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(147,197,253,0.2)] to-transparent" />

              <div className="p-5 pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <FaClock className="text-blue-300/60 text-[10px]" />
                  <p className="text-[9px] text-blue-300/60 uppercase tracking-widest">Office Hours</p>
                </div>
                <div className="space-y-2">
                  {HOURS.map((h, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-xs text-white/50">{h.day}</span>
                      <span className={`text-xs font-semibold ${h.open ? "text-white/80" : "text-white/20"}`}>{h.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-[11px] text-emerald-300/70">We're open — ready to help</span>
                </div>
              </div>

              <div className="mx-5 h-px bg-white/[0.06]" />

              <a href="https://maps.google.com/?q=Visto+Building+Zone+V+Sogod+Southern+Leyte+Philippines+6606"
                target="_blank" rel="noopener noreferrer" className="block group">
                <div className="h-28 relative overflow-hidden bg-gradient-to-br from-[#060d1a] to-[#0a1628]">
                  <svg className="absolute inset-0 w-full h-full opacity-20">
                    {[10,20,30,40,50,60,70,80,90].map(x => <line key={`x${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="rgba(147,197,253,0.6)" strokeWidth="0.5"/>)}
                    {[25,50,75].map(y => <line key={`y${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="rgba(147,197,253,0.6)" strokeWidth="0.5"/>)}
                  </svg>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(37,99,235,0.18)_0%,transparent_65%)]" />
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center z-10 relative"
                        style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", boxShadow: "0 0 0 4px rgba(37,99,235,0.22), 0 6px 18px rgba(37,99,235,0.4)" }}>
                        <FaMapMarkerAlt className="text-white text-[11px]" />
                      </div>
                      <motion.div className="absolute inset-0 rounded-full border-2 border-blue-400/35"
                        animate={{ scale:[1,2.3], opacity:[0.5,0] }} transition={{ duration:2, repeat:Infinity, ease:"easeOut" }} />
                      <motion.div className="absolute inset-0 rounded-full border-2 border-blue-400/20"
                        animate={{ scale:[1,2.9], opacity:[0.3,0] }} transition={{ duration:2, repeat:Infinity, ease:"easeOut", delay:0.4 }} />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-blue-300/0 group-hover:text-blue-300 border border-transparent group-hover:border-blue-400/30 transition-all duration-300 backdrop-blur-sm">
                    Open in Maps ↗
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3 px-4 py-3 border-t border-white/[0.06] group-hover:bg-white/[0.02] transition-colors duration-200">
                  <div>
                    <p className="text-white/80 text-xs font-semibold mb-0.5">HMP Co. Office</p>
                    <p className="text-white/40 text-[10px] leading-relaxed">Gnd Flr. Visto Bldg., Zone V<br />Sogod, Southern Leyte 6606</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 pt-0.5">
                    <p className="text-blue-300/70 text-[10px] font-medium">+63 917 115 9105</p>
                    <p className="text-blue-300/50 text-[10px]">hmpconsultingph@gmail.com</p>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden border-t border-white/[0.05]">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[rgba(29,78,216,0.12)] via-transparent to-[rgba(37,99,235,0.08)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }}>
            <Eyebrow label="Ready to Start?" centered />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Your next big move{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">starts here</span>
            </h2>
            <p className="text-gray-400/80 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              From strategy to execution — we're with you every step of the way.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a href="mailto:info@hmpconsulting.com"
                whileHover={{ scale:1.05, y:-2 }} whileTap={{ scale:0.97 }}
                transition={{ type:"spring", stiffness:400, damping:18 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-br from-[#1d4ed8] to-[#2563eb]">
                <FaEnvelope className="text-xs" /> Email Us Now
              </motion.a>
              <motion.a href="https://wa.me/639123456789" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.05, y:-2 }} whileTap={{ scale:0.97 }}
                transition={{ type:"spring", stiffness:400, damping:18 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                <FaWhatsapp className="text-sm" /> WhatsApp Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}