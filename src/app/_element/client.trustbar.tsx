"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CE_TrustBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("trust-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Client logos data - replace with actual logo images
  const clients = [
    { name: "Reserve Bank of India", abbr: "RBI" },
    { name: "European Central Bank", abbr: "ECB" },
    { name: "Bank of England", abbr: "BoE" },
    { name: "Federal Reserve", abbr: "FED" },
    { name: "Swiss National Bank", abbr: "SNB" },
    { name: "Bank of Japan", abbr: "BoJ" },
    { name: "People's Bank of China", abbr: "PBOC" },
    { name: "Deutsche Bundesbank", abbr: "DBB" },
  ];

  // Duplicate for seamless loop
  const allClients = [...clients, ...clients, ...clients];

  return (
    <div
      id="trust-section"
      className="flex flex-1 w-full flex-col items-center justify-center h-full bg-gradient-to-b from-transparent via-slate-900/20 to-transparent overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12 px-4"
      >
        <h2 className="font-use-airbeat text-4xl md:text-5xl lg:text-6xl mb-4 text-white">
          TRUSTED GLOBALLY
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
          Partnering with the world&apos;s most prestigious financial
          institutions and government agencies
        </p>
      </motion.div>

      {/* Continuous scrolling carousel */}
      <div className="w-full overflow-hidden relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

        <motion.div
          className="flex gap-8 py-8"
          animate={{
            x: [0, -clients.length * 280],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {allClients.map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 h-32 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex flex-col items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="text-5xl font-bold text-white/80 mb-2">
                {client.abbr}
              </div>
              <div className="text-sm text-white/60 text-center px-4">
                {client.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Social proof text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="mt-12 text-center px-4"
      >
        <p className="text-white/90 text-xl md:text-2xl font-medium">
          <span className="text-sky-400">Trusted by 150+</span> institutions
          worldwide
        </p>
      </motion.div>
    </div>
  );
}
