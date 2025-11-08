"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CE_Mission() {
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

    const element = document.getElementById("mission-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="mission-section"
      className="flex flex-1 w-full flex-col items-center justify-center h-full bg-gradient-to-b from-transparent via-sky-900/20 to-transparent"
    >
      <div className="max-w-4xl px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-use-airbeat text-4xl md:text-5xl lg:text-6xl mb-8 text-white">
            THE MISSION
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-white/90 text-xl md:text-2xl leading-relaxed mb-6">
            Pioneering the future of secure technology solutions across the
            globe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            For over three decades, we have stood at the forefront of the
            security industry, delivering cutting-edge currency printing and
            digital security solutions that protect nations, empower economies,
            and build trust across continents. Our legacy is built on precision,
            innovation, and an unwavering commitment to safeguarding what
            matters most.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-12"
        >
          <div className="inline-block px-8 py-3 border-2 border-sky-400/50 rounded-full">
            <span className="text-sky-400 font-medium text-lg">
              Clarity. Confidence. Security.
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
