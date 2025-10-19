import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mt-auto bg-gradient-to-r from-blue-950/60 to-gray-900/60 backdrop-blur-md text-gray-200/80 py-8 relative overflow-hidden"
    >
      {/* Enhanced Starry Overlay (Faint Twinkle) */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_top_left,_rgba(128,128,128,0.4)_100%,_transparent_100%)] bg-[length:40px_40px] animate-twinkle" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="text-gray-200/80 mb-4">© 2025 Earth Explorer. Discover the world, one region at a time.</p>
        <ul className="flex justify-center space-x-6">
          <li><Link to="#" className="text-gray-300/80 hover:text-yellow-200/80 transition-all duration-300">Privacy</Link></li>
          <li><Link to="/contact" className="text-gray-300/80 hover:text-yellow-200/80 transition-all duration-300">Contact</Link></li>
          <li><Link to="/about" className="text-gray-300/80 hover:text-yellow-200/80 transition-all duration-300">About</Link></li>
        </ul>
      </div>
    </motion.footer>
  )
}