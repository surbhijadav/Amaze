// src/pages/Countries.tsx
import { useQuery } from "@tanstack/react-query";
import { getFacts, type Fact } from "../api/countryApi";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Countries = () => {
  const { data, isLoading, isError } = useQuery<Fact[]>({
    queryKey: ["countries"],
    queryFn: getFacts,
  });

  // 🌐 Scroll-split reveal animation
  useEffect(() => {
    gsap.utils.toArray(".country-card").forEach((card: any) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [data]);

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

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-950 via-indigo-950 to-black text-white">      
    <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-bold text-center mb-14 tracking-wide"
      >
        🌍 Discover the{" "}
        <span className="text-yellow-400 drop-shadow-[0_0_10px_#FFD700]">
          World’s Nations
        </span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {data?.map((country) => (
          <motion.div
            key={country.name.common}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              rotateX: -5,
              boxShadow: "0 0 25px rgba(255,215,0,0.3)",
            }}
            transition={{ duration: 0.4 }}
            className="country-card bg-black/50 backdrop-blur-md rounded-xl p-8 shadow-xl cursor-pointer transition-all duration-500 border border-white/10"
          >
            <div className="bg-blue/75 rounded-2xl p-5 flex flex-col h-full">
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-full h-40 object-cover rounded-lg mb-4 border border-white/10"
              />
              <h2 className="text-2xl font-semibold mb-2 text-yellow-400 drop-shadow-md">
                {country.name.common}
              </h2>
              <p className="text-white/85 mb-1">
                <span className="font-semibold text-yellow-300">Region:</span>{" "}
                {country.region}
              </p>
              {country.capital && (
                <p className="text-white/85 mb-1">
                  <span className="font-semibold text-yellow-300">
                    Capital:
                  </span>{" "}
                  {country.capital.join(", ")}
                </p>
              )}
              <p className="text-white/85">
                <span className="font-semibold text-yellow-300">
                  Population:
                </span>{" "}
                {country.population.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
