import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const RegionDetail = () => {
  const { regionName } = useParams<{ regionName: string }>();
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch countries by region name
  const { data: countries = [], isLoading } = useQuery({
    queryKey: ["countries", regionName],
    queryFn: async () => {
      const res = await fetch(`https://restcountries.com/v3.1/region/${regionName}`);
      if (!res.ok) throw new Error("Failed to fetch countries");
      return res.json();
    },
  });

  // ✅ Animate cards when they appear
  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".country-card");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        );
      });
    }
  }, [countries]);

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-blue-950 via-indigo-950 to-black text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold capitalize">{regionName} Region</h1>
        <p className="text-gray-400 mt-2 text-lg">
          Explore countries from {regionName} 🌍
        </p>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-300">Loading countries...</p>
      ) : (
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6 max-w-7xl mx-auto"
        >
          {countries.map((country: any) => {
            // 🧠 Safely extract nested data
            const languages = Object.values(country.languages || {}).join(", ");
            const currencies = Object.values(country.currencies || {})
              .map((c: any) => `${c.name} (${c.symbol || ""})`)
              .join(", ");
            const capital = country.capital?.join(", ") || "N/A";

            return (
              <div
                key={country.cca3}
                className="country-card fact-card bg-black/50 backdrop-blur-md rounded-xl p-8 shadow-xl cursor-pointer transition-all duration-500 border border-white/10"
              >
                {/* Flag */}
                <img
                  src={country.flags?.png}
                  alt={country.flags?.alt || country.name?.common}
                  className="w-20 h-14 object-cover rounded-md mx-auto mb-4 shadow-lg"
                />

                {/* Name */}
                <h2 className="text-xl font-semibold mb-1">
                  {country.name?.common}
                </h2>

                {/* Official Name */}
                <p className="text-gray-400 text-sm mb-3 italic">
                  {country.name?.official}
                </p>

                {/* Capital */}
                <p className="text-gray-300 text-sm mb-1">
                  <strong>Capital:</strong> {capital}
                </p>

                {/* Population */}
                {/* <p className="text-gray-300 text-sm mb-1">
                  <strong>Population:</strong>{" "}
                  {country.population?.toLocaleString() || "N/A"}
                </p> */}

                {/* Subregion */}
                <p className="text-gray-300 text-sm mb-1">
                  <strong>Subregion:</strong> {country.subregion || "N/A"}
                </p>

                {/* Languages */}
                <p className="text-gray-300 text-sm mb-1">
                  <strong>Languages:</strong> {languages || "N/A"}
                </p>

                {/* Currencies */}
                <p className="text-gray-300 text-sm">
                  <strong>Currency:</strong> {currencies || "N/A"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
