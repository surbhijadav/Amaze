import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
  const sidebarRef = useRef<HTMLDivElement>(null);

  const closeNavbar = () => setIsOpen(false);

  // Lock scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNavbar();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* Header Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg">
        <nav className="container mx-auto px-5 md:px-8 py-3 md:py-4 flex justify-between items-center">
          {/* Brand */}
          <p  
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-900 via-orange-500 via-yellow-300 via-green-300 via-blue-300 via-purple-300 to-indigo-500 bg-clip-text text-transparent tracking-wider flex items-center gap-2 drop-shadow-md hover:scale-105 transition-all duration-500"
          >
            Earth Explorer
          </p>

          {/* Hamburger Menu - only visible when sidebar is closed */}
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="text-white/90 hover:text-yellow-400 transition-all p-2 rounded-md focus:outline-none "
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

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.nav
            ref={sidebarRef}
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 w-[280px] max-w-[90vw] bg-gradient-to-br backdrop-blur-none border-l border-white/10 shadow-[ -10px_0_30px_rgba(0,0,0,0.5)] flex flex-col py-8 px-6 z-[70]"
            // className="fixed inset-y-0 right-0 w=[280px] max-w-[90vw] bg-gradient-to-br backdrop-blur-md border-l flex flex-col py-8 px-6 z-[70]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
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

      {/* Background Blur Overlay */}
      {/* <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-none z-[60]"
            onClick={closeNavbar}
          />
        )}
      </AnimatePresence> */}
    </>
  );
}
