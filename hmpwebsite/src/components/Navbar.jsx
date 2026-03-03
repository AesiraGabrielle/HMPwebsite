import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change / resize past md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navClass = ({ isActive }) =>
    `relative px-4 py-2 text-sm tracking-widest uppercase font-semibold transition duration-300
    ${
      isActive
        ? "text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-white"
        : "text-gray-300 hover:text-white"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `block w-full px-6 py-4 text-sm tracking-widest uppercase font-semibold border-b border-white/10 transition duration-300
    ${isActive ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"}`;

  const logoFilter = scrolled
    ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.95)) drop-shadow(0 0 18px rgba(59, 130, 246, 0.5))"
    : "drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))";

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled || menuOpen ? "shadow-lg backdrop-blur-md" : "bg-transparent"
        }`}
        style={
          scrolled || menuOpen
            ? {
                background:
                  "linear-gradient(to bottom, rgba(1, 32, 70, 0.88) 0%, rgba(1, 32, 70, 0.58) 100%)",
              }
            : {}
        }
      >
        {/* Main bar */}
        <div
          className="w-full px-6 md:px-10 flex justify-between items-center"
          style={{ height: scrolled ? "56px" : "64px", transition: "height 0.5s" }}
        >
          {/* Logo */}
          <NavLink to="/" className="flex items-center h-full py-3" onClick={() => setMenuOpen(false)}>
            <img
              src="/assets/images/logo.png"
              alt="HMP Consulting Logo"
              className="object-contain transition-all duration-500 w-auto"
              style={{
                height: scrolled ? "32px" : "38px",
                filter: logoFilter,
              }}
            />
          </NavLink>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navClass}>Home</NavLink>
            <NavLink to="/about" className={navClass}>About</NavLink>
            <NavLink to="/services" className={navClass}>Services</NavLink>
            <NavLink to="/clients" className={navClass}>Clients</NavLink>
            <NavLink to="/contact" className={navClass}>Contact</NavLink>
          </div>

          {/* Hamburger button — mobile/tablet only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-[2px] bg-white rounded transition-all duration-300"
              style={{
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-6 h-[2px] bg-white rounded transition-all duration-300"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="block w-6 h-[2px] bg-white rounded transition-all duration-300"
              style={{
                transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-500"
          style={{
            maxHeight: menuOpen ? "400px" : "0px",
          }}
        >
          <div
            style={{
              background: "rgba(1, 32, 70, 0.97)",
              backdropFilter: "blur(12px)",
            }}
          >
            <NavLink to="/" className={mobileNavClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={mobileNavClass} onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/services" className={mobileNavClass} onClick={() => setMenuOpen(false)}>Services</NavLink>
            <NavLink to="/clients" className={mobileNavClass} onClick={() => setMenuOpen(false)}>Clients</NavLink>
            <NavLink to="/contact" className={mobileNavClass} onClick={() => setMenuOpen(false)}>Contact</NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}