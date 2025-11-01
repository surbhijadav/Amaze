import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoFlag } from "react-icons/io5";
import { FaMapMarkerAlt, FaLightbulb, FaTimes, FaHome } from "react-icons/fa";

const navbarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
};

const linkVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const closeNavbar = () => setIsOpen(false);

  // detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // close sidebar on ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNavbar();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const isHomePage = location.pathname === "/";

  // background transitions
  const headerBgClass = isHomePage
    ? isScrolled
      ? "bg-black/60 backdrop-blur-md border-b border-white/10"
      : "bg-transparent"
    : isScrolled
    ? "bg-black/60 backdrop-blur-md border-b border-white/10"
    : "bg-black/40 backdrop-blur-md border-b border-white/10";

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${headerBgClass}`}
      >
        <nav className="container mx-auto px-5 md:px-8 py-3 md:py-4 flex justify-between items-center">
          {/* Brand */}
          <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-900 via-orange-500 via-yellow-300 via-green-300 via-blue-300 via-purple-300 to-indigo-500 bg-clip-text text-transparent tracking-wider flex items-center gap-2 drop-shadow-md hover:scale-105 transition-all duration-500">
            Earth Explorer
          </p>

          {/* Hamburger */}
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="text-white/90 hover:text-yellow-400 transition-all p-2 rounded-md focus:outline-none"
            >
              <div className="space-y-1 w-7 h-7">
                <span className="block w-full h-0.5 bg-current" />
                <span className="block w-full h-0.5 bg-current" />
                <span className="block w-full h-0.5 bg-current" />
              </div>
            </button>
          )}
        </nav>
      </header>

      {/* SIDEBAR */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.nav
            ref={sidebarRef}
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 w-[280px] max-w-[90vw]
              bg-gradient-to-br from-indigo/50 via-black-800/40 to-gray/30
              backdrop-blur-xl border-l border-white/10 shadow-[ -10px_0_25px_rgba(255,255,255,0.05)]
              flex flex-col py-8 px-6 z-[70] rounded-l-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeNavbar}
              className="self-end text-white/80 hover:text-yellow-400 transition-all mb-8 text-xl rounded-full p-2 hover:bg-white/10"
            >
              <FaTimes />
            </button>

            {/* Menu Links */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-5 text-lg flex-1"
            >
              {[
                { to: "/", icon: <FaHome />, label: "Home" },
                { to: "/regions", icon: <FaMapMarkerAlt />, label: "Regions" },
                { to: "/countries", icon: <IoFlag />, label: "Countries" },
                { to: "/facts", icon: <FaLightbulb />, label: "Facts" },
                { to: "/about", icon: <FaLightbulb />, label: "About" },
              ].map(({ to, icon, label }) => (
                <motion.li key={label} variants={linkVariants}>
                  <Link
                    to={to}
                    onClick={closeNavbar}
                    className="flex items-center gap-3 text-white/90 py-3 px-4 rounded-lg transition-all duration-300 hover:text-yellow-400 hover:bg-white/10 hover:scale-105 hover:shadow-lg"
                  >
                    {icon}
                    <span className="tracking-wide">{label}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={closeNavbar}
          />
        )}
      </AnimatePresence>
    </>
  );
}
