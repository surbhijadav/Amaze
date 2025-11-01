import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useQuery } from "@tanstack/react-query";
import { getCountryByName, type Fact } from "../api/countryApi";

export const CountryCard = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();

  // ✅ Fetch full details for one country
  const { data, isLoading, isError } = useQuery<Fact[]>({
    queryKey: ["country", countryName],
    queryFn: () => getCountryByName(countryName!),
    enabled: !!countryName,
  });

  const country = data?.[0];

  // 🎞️ GSAP entry animation
  useEffect(() => {
    gsap.fromTo(
      ".country-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  if (isLoading)
    return (
      <div className="text-center text-white mt-40 text-xl animate-pulse">
        Loading country info...
      </div>
    );

  if (isError || !country) {
    return (
      <div className="text-center text-white mt-40 text-xl">
        Country not found 😔
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-black text-white flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        layout
        className="country-card bg-black/60 backdrop-blur-xl border border-yellow-400/20 
                   rounded-2xl p-10 max-w-3xl text-center shadow-2xl"
      >
        {/* 🏳️ Flag */}
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-48 h-32 mx-auto rounded-lg shadow-lg border border-yellow-400/20 mb-6"
        />

        {/* 🏛️ Country Name */}
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">
          {country.name.common}
        </h2>

        {/* 🗂️ Additional Info */}
        <div className="space-y-3 text-lg text-white/85 text-left mx-auto max-w-xl">
          <p>
            <span className="text-yellow-300 font-semibold">Official Name:</span>{" "}
            {country.name.official}
          </p>

          {country.name.nativeName && (
            <p>
              <span className="text-yellow-300 font-semibold">Native Names:</span>{" "}
              {Object.values(country.name.nativeName)
                .map((n: any) => n.common)
                .join(", ")}
            </p>
          )}

          <p>
            <span className="text-yellow-300 font-semibold">Region:</span>{" "}
            {country.region}
          </p>

          {country.subregion && (
            <p>
              <span className="text-yellow-300 font-semibold">Subregion:</span>{" "}
              {country.subregion}
            </p>
          )}

          {country.capital && (
            <p>
              <span className="text-yellow-300 font-semibold">Capital:</span>{" "}
              {country.capital.join(", ")}
            </p>
          )}

          <p>
            <span className="text-yellow-300 font-semibold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>

          {country.tld && (
            <p>
              <span className="text-yellow-300 font-semibold">Top Level Domain:</span>{" "}
              {country.tld.join(", ")}
            </p>
          )}

          {country.languages && (
            <p>
              <span className="text-yellow-300 font-semibold">Languages:</span>{" "}
              {Object.values(country.languages).join(", ")}
            </p>
          )}

          {country.currencies && (
            <p>
              <span className="text-yellow-300 font-semibold">Currencies:</span>{" "}
              {Object.values(country.currencies)
                .map((c: any) => `${c.name} (${c.symbol})`)
                .join(", ")}
            </p>
          )}

          {country.timezones && (
            <p>
              <span className="text-yellow-300 font-semibold">Timezones:</span>{" "}
              {country.timezones.join(", ")}
            </p>
          )}

          {country.borders && (
            <p>
              <span className="text-yellow-300 font-semibold">Borders:</span>{" "}
              {country.borders.join(", ")}
            </p>
          )}

          {/* 🌍 Map Links */}
          {country.maps && (
            <p className="mt-2">
              <span className="text-yellow-300 font-semibold">Maps:</span>{" "}
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Google Maps
              </a>{" "}
              |{" "}
              <a
                href={country.maps.openStreetMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                OpenStreetMap
              </a>
            </p>
          )}
        </div>

        {/* 🔙 Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-10 px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold 
                     hover:bg-yellow-300 transition-all duration-300 shadow-lg"
        >
          ← Back
        </motion.button>
      </motion.div>
    </div>
  );
};
