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
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [cardWidth, setCardWidth] = useState(240);
  const heroRef = useRef<HTMLDivElement>(null);
  const gap = 20;

  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 🔹 Responsive Layout
  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerPage(1);
      else if (w < 1024) setItemsPerPage(2);
      else if (w < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // 🎞️ GSAP Animation
  useEffect(() => {
    if (!carouselRef.current || !data) return;
    const totalWidth = cardWidth + gap;
    gsap.to(carouselRef.current, {
      x: -index * itemsPerPage * totalWidth,
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, [index, data, itemsPerPage]);

  useEffect(() => {
    if (!heroRef.current) return;
    const title = heroRef.current;
    const text = title.textContent || "";
  
    // Clear old text
    title.textContent = "";
  
    // Split into spans
    const letters = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      if (char === " ") span.innerHTML = "&nbsp;";
      title.appendChild(span);
      return span;
    });
  
    // Animate
    gsap.fromTo(
      letters,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power3.out",
        duration: 0.8,
        delay: 0.3,
      }
    );
  }, []); // run once on mount
  

  // 🧠 Loading & Error States
  if (isLoading)
    return (
      <div className="text-center text-white mt-40 text-xl animate-pulse">
        Loading countries...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-400 mt-40 text-lg">
        Failed to load data.
      </div>
    );

  const countries = data || [];
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const next = () => setIndex((i) => Math.min(i + 1, totalPages - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const truncate = (text: string | number, limit: number) =>
    text ? text.toString().slice(0, limit) + (text.toString().length > limit ? "..." : "") : "N/A";

  // 🌍 Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-black text-white flex flex-col items-center py-10 overflow-hidden">
      <h2
         ref={heroRef}
        className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 tracking-wide text-center"
      >
        🌍 Discover the{" "}
        <span className="text-yellow-300 drop-shadow-[0_0_10px_#FFD700]">
          World’s Nations
        </span>
      </h2>

      {/* Carousel */}
      <div className="relative w-full flex flex-col items-center">
        <div
          className="overflow-hidden mx-auto"
          style={{
            width: `${itemsPerPage * cardWidth + (itemsPerPage - 1) * gap}px`,
          }}
        >
          <motion.div
            ref={carouselRef}
            className="flex gap-5 py-6 cursor-grab active:cursor-grabbing"
          >
            {countries.map((country, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  boxShadow: "0 0 20px rgba(255,215,0,0.5)",
                }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-[220px] sm:w-[230px] md:w-[240px] bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center text-center shadow-lg transition-all duration-500"
              >
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="w-full h-[110px] object-cover rounded mb-3 border border-white/10"
                />
                <h3 className="text-lg font-semibold text-yellow-300">
                  {truncate(country.name.common, 10)}
                </h3>
                <p className="text-white/85 text-sm mt-1">
                  {truncate(country.region, 12)}
                </p>
                {country.capital && (
                  <p className="text-white/70 text-xs mt-0.5">
                    Capital: {truncate(country.capital.join(", "), 10)}
                  </p>
                )}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#FFD700",
                    color: "#000",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => navigate(`/countries/${country.name.common}`)}
                  className="mt-3 px-3 py-1.5 text-xs font-semibold bg-yellow-300 rounded-md text-black hover:bg-yellow-400"
                >
                  Read More
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-10 mt-6 justify-center">
          <motion.button onClick={prev} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
            <FaArrowCircleLeft className="text-4xl p-2 bg-yellow-300/20 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-black transition-all duration-300" />
          </motion.button>

          <div className="text-white text-xs sm:text-sm font-bold bg-black/40 px-3 py-1.5 rounded-md border border-yellow-300/50">
            {index + 1}/{totalPages}
          </div>

          <motion.button onClick={next} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
            <FaArrowCircleRight className="text-4xl p-2 bg-yellow-300/20 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-black transition-all duration-300" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
