// src/pages/Countries.tsx
import { useQuery } from "@tanstack/react-query";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { getFacts, type Fact } from "../api/countryApi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

export const Countries = () => {
  const { data, isLoading, isError } = useQuery<Fact[]>({
    queryKey: ["countries"],
    queryFn: getFacts,
  });

  const [index, setIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 💡 Configuration
  const itemsPerPage = 4;
  const cardWidth = 280;
  const gap = 32;
  const groupWidth = itemsPerPage * cardWidth + (itemsPerPage - 1) * gap;

  // 🌀 Initial slide-in animation
  useEffect(() => {
    if (isLoading || !data || !carouselRef.current) return;
    const el = carouselRef.current;
    gsap.fromTo(el, { x: groupWidth }, { x: 0, duration: 1.2, ease: "power2.out" });
  }, [data]);

  // 🎞️ Slide animation when index changes
  useEffect(() => {
    if (!carouselRef.current || !data) return;
    const el = carouselRef.current;
    const targetX = -index * groupWidth;
    gsap.to(el, { x: targetX, duration: 1.5, ease: "power2.inOut" });
  }, [index, data]);

  // ⏳ Loading and Error UI
  if (isLoading)
    return (
      <div className="text-center text-white mt-40 text-xl animate-pulse">
        Loading countries...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-400 mt-40 text-lg">
        Failed to load country data.
      </div>
    );

  // 🌍 Data & Pagination setup
  const countries = data || [];
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const next = () => setIndex((prev) => (prev + 1) % totalPages);
  const prev = () => setIndex((prev) => (prev - 1 + totalPages) % totalPages);

  // ✂️ Text truncation utility
  const truncate = (text: string | number, limit: number) => {
    if (!text) return "N/A";
    const str = text.toString();
    return str.length > limit ? str.slice(0, limit) + "..." : str;
  };

  // 🌈 Main Render
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-950 via-indigo-950 to-black text-white flex flex-col items-center justify-start px-6 py-6 overflow-hidden">
      
      {/* 🌍 Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl font-semibold text-center mb-2 tracking-wide"
      >
        🌍 Discover the{" "}
        <span className="text-yellow-300 drop-shadow-[0_0_10px_#FFD700]">
          World’s Nations
        </span>
      </motion.h2>

      {/* 🌐 Carousel */}
      <div className="relative w-full flex flex-col items-center">
        {/* 👇 Centered visible area (Only 4 cards visible) */}
        <div
          className="overflow-hidden mx-auto"
          style={{ width: `${groupWidth}px` }}
        >
          <div
            ref={carouselRef}
            className="flex gap-8 py-8"
            style={{
              width: `${countries.length * (cardWidth + gap) - gap}px`,
            }}
          >
            {countries.map((country) => (
              <motion.div
                key={country.name.common}
                whileHover={{
                  scale: 1.08,
                  y: -6,
                  boxShadow: "0 0 30px rgba(255,215,0,0.6)",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex-shrink-0 w-[280px] bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-lg cursor-pointer hover:shadow-[0_0_20px_#FFD700]/40 transition-all duration-500"
              >
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="w-full h-[140px] object-cover rounded mb-2 border border-white/10"
                />

                <h3 className="text-xl font-semibold text-yellow-300">
                  {truncate(country.name.common, 12)}
                </h3>

                <p className="text-white/85 mt-1">
                  Region: {truncate(country.region, 12)}
                </p>

                {country.capital && (
                  <p className="text-white/70 text-sm">
                    Capital: {truncate(country.capital.join(", "), 12)}
                  </p>
                )}

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#FFD700",
                    boxShadow: "0 0 20px rgba(255,215,0,0.6)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => navigate(`/countries/${country.name.common}`)}
                  className="bg-yellow-300 hover:bg-yellow-400 mt-3 rounded-lg text-black px-3 py-2 text-sm font-semibold transition-all duration-500"
                >
                  Read More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🎮 Navigation Buttons */}
        <div className="flex items-center gap-10 mt-6 justify-center">
          <motion.button
            onClick={prev}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <FaArrowCircleLeft className="text-5xl p-3 bg-yellow-300/25 text-yellow-400 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.8)] hover:bg-yellow-400 hover:text-black transition-all duration-300 ease-in-out" />
          </motion.button>

          <div className="text-white text-2xl font-bold bg-black/40 px-4 py-2 rounded-full border border-yellow-300/50 shadow-[0_0_10px_rgba(255,215,0,0.3)]">
            {index + 1}/{totalPages}
          </div>

          <motion.button
            onClick={next}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <FaArrowCircleRight className="text-5xl p-3 bg-yellow-300/25 text-yellow-400 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.8)] hover:bg-yellow-400 hover:text-black transition-all duration-300 ease-in-out" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
