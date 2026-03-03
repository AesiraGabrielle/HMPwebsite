import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/clients", label: "Clients" },
  { to: "/contact", label: "Contact" },
];

function SectionEyebrow({ label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-px bg-white/50" />
      <p className="text-xs uppercase tracking-[0.3em] text-blue-400 font-semibold">{label}</p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#001228] text-white">

      {/* ── Footer body ───────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-12 sm:py-14 lg:py-16">

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-10 gap-x-10 lg:gap-x-14 xl:gap-x-16 items-start">

            {/* Logo + tagline */}
            <div className="sm:col-span-2 xl:col-span-1">
              <img
                src="/assets/images/logo.png"
                alt="HMP Consulting Logo"
                className="h-9 w-auto object-contain mb-3"
                style={{ filter: "drop-shadow(0 0 6px rgba(59,130,246,0.4))" }}
              />
              <p className="text-gray-400 text-sm leading-relaxed max-w-[260px]">
                Expert-driven economic development consulting across Asia and Europe.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-5 font-semibold">
                Quick Links
              </p>
              <ul className="flex flex-col gap-3">
                {navLinks.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `text-sm transition-colors duration-200 ${
                          isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-5 font-semibold">
                Contact
              </p>
              <ul className="flex flex-col gap-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">📧</span>
                  <a
                    href="mailto:hmpconsultingph@gmail.com"
                    className="hover:text-white transition-colors duration-200 break-all"
                  >
                    hmpconsultingph@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">📞</span>
                  <a
                    href="tel:+639171159105"
                    className="hover:text-white transition-colors duration-200"
                  >
                    +63 917 115 9105
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">📍</span>
                  <span>Philippines · Germany · Indonesia</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="sm:col-span-2 xl:col-span-1">
              <SectionEyebrow label="Get Started" />
              <h3 className="text-base font-bold leading-snug">
                Ready to Collaborate on Your Next Initiative?
              </h3>
              <p className="text-blue-100/70 mt-2 text-sm leading-relaxed">
                Let's work together to create sustainable and impactful results.
              </p>
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="mt-5 inline-block"
              >
                <Link
                  to="/contact"
                  className="inline-block px-7 py-2.5 bg-white text-[#003679] font-bold rounded-md text-sm
                             shadow-xl shadow-black/20 hover:bg-[#003679] hover:text-white
                             hover:shadow-2xl transition-colors duration-300"
                >
                  Get in Touch →
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div className="border-t border-white/5 py-5" style={{ background: "#000d1a" }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 flex flex-col items-center justify-center gap-1 text-xs text-gray-600 text-center">
          <p>© {new Date().getFullYear()} HMP Business Support and Co. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
}