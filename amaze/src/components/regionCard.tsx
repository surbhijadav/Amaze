import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import type{ RootState } from "../store"; // adjust path to your store
import { GiWorld } from "react-icons/gi";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const RegionCard = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const regions = useSelector((state: RootState) => state.regions.regions);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll<HTMLElement>(".grid-card");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "back.out(1.5)",
            duration: 1.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1.5,
            },
          }
        );

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -5,
            boxShadow: "0 10px 30px rgba(255, 215, 0, 0.3)",
            duration: 0.4,
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            duration: 0.4,
          });
        });
      });
    }
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GiWorld":
        return <GiWorld />;
      default:
        return null;
    }
  };

  return (
    <section className="relative z-20 bg-black/40 backdrop-blur-md py-12 min-h-[50vh]">
<div
  ref={gridRef}
  className="
    container mx-auto px-4 
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
    gap-10 max-w-7xl place-items-center
  "
>
  {regions.map((region) => (
    <div
      key={region.name}
      className="grid-card 
        w-full max-w-[250px] 
        text-center p-6 
        rounded-2xl shadow-lg 
        border border-white/10 
        bg-black/30 backdrop-blur-md 
        hover:bg-black/50 transition-all duration-300
        relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      <div
        className={`${region.color} text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-3xl shadow-lg`}
      >
        {getIcon(region.icons)}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2 tracking-wide">
        {region.name}
      </h3>
      <p className="text-gray-300 text-sm mb-4">
        Countries: {region.count}
      </p>
      <Link
        to={`/regions/${region.name.toLowerCase()}`}
        className="bg-white/10 text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
      >
        Explore
      </Link>
    </div>
  ))}
</div>

    </section>
  );
};

