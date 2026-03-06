import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  {
    label: "Facebook", href: "https://www.facebook.com/hmpcoph/",
    icon: <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: "LinkedIn", href: "https://linkedin.com",
    icon: <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: "Instagram", href: "https://instagram.com",
    icon: <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: "Email", href: "mailto:hmpconsultingph@gmail.com",
    icon: <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white"
      style={{ background:"linear-gradient(180deg,#0b1a2e 0%,#07111f 60%,#050d18 100%)" }}>

      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background:"linear-gradient(to right,transparent,rgba(96,165,250,0.25),transparent)" }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse at 10% 50%,rgba(29,78,216,0.08) 0%,transparent 60%)" }} />

      {/* ── Main row ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand */}
          <div className="sm:col-span-3 lg:col-span-1">
            <img src="/assets/images/logo.png" alt="HMP Consulting"
              className="h-8 w-auto object-contain mb-3"
              style={{ filter:"drop-shadow(0 0 6px rgba(59,130,246,0.35))" }} />
            <p className="text-gray-400 text-[0.82rem] leading-relaxed max-w-[220px] mb-4">
              Business consulting, technology, and economic development across Asia and Europe.
            </p>
            <div className="flex items-center gap-1.5">
              {socials.map(({ label, href, icon }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y:-2 }} transition={{ type:"spring", stiffness:400, damping:18 }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-blue-300/50
                             border border-white/[0.07] hover:border-blue-400/35 hover:text-blue-300
                             transition-colors duration-200"
                  style={{ background:"rgba(59,130,246,0.07)" }}>
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-blue-300/45 mb-3">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to}
                    className={({ isActive }) =>
                      `text-[0.82rem] transition-colors duration-200 flex items-center gap-1.5 group ${
                        isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
                      }`
                    }>
                    <span className="w-0 group-hover:w-2.5 h-px bg-blue-400/55 transition-all duration-200 overflow-hidden shrink-0" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-blue-300/45 mb-3">
              Contact
            </p>
            <ul className="flex flex-col gap-2.5 text-[0.82rem]">
              <li>
                <a href="mailto:hmpconsultingph@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200 break-all">
                  hmpconsultingph@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+639171159105"
                  className="text-gray-400 hover:text-white transition-colors duration-200">
                  +63 917 115 9105
                </a>
              </li>
              <li className="text-gray-500">Sogod Southern Leyte Philippines 6606 </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-blue-300/45 mb-3">
              Get Started
            </p>
            <p className="text-[0.82rem] text-gray-400 leading-relaxed mb-4">
              Ready to work together? Reach out and let's make it happen.
            </p>
            <motion.div whileHover={{ scale:1.03, y:-1 }} whileTap={{ scale:0.97 }}
              transition={{ type:"spring", stiffness:400, damping:18 }}>
              <Link to="/contact"
                className="inline-flex items-center px-5 py-2 bg-white text-[#003679] font-bold
                           rounded-lg text-[0.82rem] shadow-md hover:bg-blue-50 transition-colors duration-200">
                Get in Touch →
              </Link>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 border-t border-white/[0.05]"
        style={{ background:"rgba(0,0,0,0.25)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-3.5
                        flex flex-col sm:flex-row items-center justify-between gap-1.5
                        text-[0.6rem] text-gray-600">
          <p>© {new Date().getFullYear()} HMP Co. Business Support &amp; Engineering Solutions. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hover:text-gray-400 transition-colors duration-200">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-gray-400 transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}