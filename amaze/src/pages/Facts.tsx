import { useEffect, useRef, useState } from "react";
import countryData from "../api/countries.json"; // your JSON data
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Facts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    // Animate heading
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
      });
    }

    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll<HTMLElement>(".fact-card");

    cards.forEach((card) => {
      // Scroll reveal animation (appears once)
      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true, // ← ensures animation runs only once
        },
      });

      // Hover effect
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          rotateY: 5,
          rotateX: -5,
          boxShadow: "0 15px 40px rgba(255, 215, 0, 0.3)",
          duration: 0.5,
        });
      };
      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          duration: 0.5,
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      // Clean up event listeners
      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [loading]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl animate-pulse">
        Loading Facts...
      </div>
    );

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-950 via-indigo-950 to-black text-white">  
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md -z-10" /> 
      <div className="relative z-2 container mx-auto px-6 py-6 space-y-6">  
        {/* Animated Heading */}
        <h3
          ref={headingRef}
          className="text-2xl md:text-5xl font-bold mb-10 text-center text-white drop-shadow-2xl"  // White text with strong drop shadow for shine
        >
          Here are the Interesting Facts <br /> we're proud of
        </h3>

        {/* Fact Cards */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {countryData.map((data) => {
            const { id, name, capital, population, region, facts } = data;
            return (
              <div
                key={id}
                className="fact-card bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-xl cursor-pointer transition-all duration-500 border border-white/20"  // Login-like bg-black/50 blur rounded-xl, border for shine
              >
                <p className="text-3xl font-midbold mb-4 text-yellow-400 drop-shadow-md">{name}</p> 
                <p className="text-gray-200/90 mb-2 ">  
                  <span className="font-md text-lg text-yellow-400">Capital: </span>
                  {capital}
                </p>
                {/* <p className="text-gray-200/90 mb-2">
                  <span className="font-medium">Population: </span>
                  {population.toLocaleString()}
                </p> */}
                <p className="text-gray-200/90 mb-2">
                  <span className="font-md text-lg text-yellow-400">Region: </span>
                  {region}
                </p>
                <p className="mt-2 text-gray-200/90">
                  <span className="font-md text-lg text-yellow-400">Interesting Facts: </span>
                  {facts}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};