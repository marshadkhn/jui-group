"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

function Counter({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration });
    const unsubscribe = rounded.on("change", (latest) =>
      setDisplayValue(latest)
    );

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, count, rounded, duration]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export function CE_Numbers() {
  const [isVisible, setIsVisible] = useState(false);
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start counting after a small delay
          setTimeout(() => setStartCounting(true), 300);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("numbers-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 30,
      suffix: "+",
      label: "Years of Leadership",
      description: "Decades of excellence in security solutions",
      icon: "🏆",
    },
    {
      value: 25,
      suffix: "+",
      label: "Global Partners",
      description: "Strategic partnerships worldwide",
      icon: "🌍",
    },
    {
      value: 15,
      suffix: "+",
      label: "Government Institutions",
      description: "Trusted by nations globally",
      icon: "🏛️",
    },
    {
      value: 150,
      suffix: "+",
      label: "Countries Served",
      description: "Security solutions across continents",
      icon: "🌐",
    },
  ];

  return (
    <div
      id="numbers-section"
      className="flex flex-1 w-full flex-col items-center justify-center h-full px-4 bg-gradient-to-b from-transparent via-sky-950/20 to-transparent"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="font-use-airbeat text-4xl md:text-5xl lg:text-6xl mb-4 text-white">
          BY THE NUMBERS
        </h2>
        <p className="text-white/70 text-lg md:text-xl">
          Quantified success, undeniable excellence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-sky-400/50 transition-all duration-300 hover:scale-105 h-full flex flex-col items-center text-center">
              {/* Icon */}
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Number */}
              <div className="font-use-airbeat text-5xl md:text-6xl lg:text-7xl mb-3 text-white bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                {startCounting ? (
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>

              {/* Label */}
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm md:text-base">
                {stat.description}
              </p>

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400/0 via-sky-400/20 to-sky-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="mt-16"
      >
        <p className="text-white/80 text-lg md:text-xl text-center mb-6">
          Join the legacy of excellence
        </p>
        <div className="flex justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/50">
            Partner With Us →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
