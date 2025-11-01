// src/components/HeroSection.tsx
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🌍 Video parallax on scroll
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.1,
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // ✨ Title animation (letters appear one by one)
      const title = heroRef.current?.querySelector("h1");
      if (title) {
        const text = title.textContent || "";
        title.textContent = "";
        const letters = text.split("").map((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          if (char === " ") span.innerHTML = "&nbsp;";
          title.appendChild(span);
          return span;
        });

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
      }

      // ✨ Subtitle + Button animations
      const subtitle = heroRef.current?.querySelector("p");
      const button = heroRef.current?.querySelector("a");

      // Subtitle fade+slide
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 1.5, delay: 1.2 }
        );
      }

      // Button animation: scale + rotation + bounce
      if (button) {
        gsap.fromTo(
          button,
          { opacity: 0, scale: 0.5, rotation: -10, y: 40 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            ease: "elastic.out(1, 0.5)",
            duration: 1.5,
            delay: 2.0, // slightly after subtitle
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
        playsInline
      >
        <source src="/videos/earth2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/25 z-10" />

      {/* Hero Content */}
      <section
        ref={heroRef}
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
          This is The Earth
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
          Explore 195 countries across 5 major regions — from Africa's savannas to Oceania's reefs.
        </p>
        <Link
          to="/countries"
          className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300"
        >
          Explore Countries
        </Link>
      </section>
    </div>
  );
};
