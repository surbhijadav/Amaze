// src/pages/Countries.tsx
import { useQuery } from "@tanstack/react-query";
import { FaArrowCircleRight,FaArrowCircleLeft  } from "react-icons/fa";
import { getFacts, type Fact } from "../api/countryApi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export const Countries = () => {
  const { data, isLoading, isError } = useQuery<Fact[]>({
    queryKey: ["countries"],
    queryFn: getFacts,
  });

  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 4;

  // GSAP slide animation when page changes
  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
        }
      );
    }
  }, [index]);

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

  const countries = data || [];

  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const next = () => {
    setIndex((prev) => (prev + 1) % totalPages);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleCountries = countries.slice(
    index * itemsPerPage,
    index * itemsPerPage + itemsPerPage
  );

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-950 via-indigo-950 to-black text-white flex flex-col items-center justify-center px-6 py-14 overflow-hidden">
      {/* 🌍 Title */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-center mb-12 tracking-wide"
      >
        🌍 Discover the{" "}
        <span className="text-yellow-400 drop-shadow-[0_0_10px_#FFD700]">
          World’s Nations
        </span>
      </motion.h2>

      {/* 🌐 Carousel Container */}
      <div className="relative w-full max-w-6xl flex flex-col items-center">
        <motion.div
          ref={listRef}
          key={index} // trigger re-animation on change
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center items-center"
        >
          {visibleCountries.map((country) => (
            <motion.div
              key={country.name.common}
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: "0 0 25px rgba(255,215,0,0.3)",
              }}
              transition={{ duration: 0.4 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg cursor-pointer"
            >
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-24 h-16 object-cover rounded mb-3 border border-white/10"
              />
              <h3 className="text-xl font-semibold text-yellow-400">
                {country.name.common}
              </h3>
              <p className="text-white/85 mt-1">{country.region}</p>
              {country.capital && (
                <p className="text-white/70 text-sm">
                  Capital: {country.capital.join(", ")}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* 🎮 Navigation Buttons */}
        <div className="flex gap-8 mt-12 justify-center">
            {/* Left Button */}
            <motion.button
              onClick={prev}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.15 }}>
              <FaArrowCircleLeft
                className="text-5xl p-3 bg-yellow-400/25 text-yellow-400 rounded-full 
                shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.8)]
                hover:bg-yellow-400 hover:text-black 
                transition-all duration-300 ease-in-out"
              />
              </motion.div>
            </motion.button>

            {/* Right Button */}
            <motion.button
              onClick={next}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.15 }}>
              <FaArrowCircleRight
                className="text-5xl p-3 bg-yellow-400/25 text-yellow-400 rounded-full 
                shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.8)]
                hover:bg-yellow-400 hover:text-black 
                transition-all duration-300 ease-in-out"
              />
              </motion.div> 
            </motion.button>
          </div>


        {/* 🔘 Page Indicator */}
        <div className="flex gap-2 mt-5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3  0transition-all ${
                i === index ? "bg-yellow-400 scale-110" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
