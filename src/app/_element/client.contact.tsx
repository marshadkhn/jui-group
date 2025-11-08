"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./glow.css";

export function CE_Contact() {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
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

    const element = document.getElementById("out8");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: "📍",
      title: "Location",
      details: [
        "Heart of Mumbai's Business District",
        "Close to International & Domestic Airports",
        "Easy Highway Access",
      ],
    },
    {
      icon: "🏭",
      title: "Facilities",
      details: [
        "Modern Warehouse",
        "Spare Parts Stocking",
        "Raw Materials Storage",
      ],
    },
    {
      icon: "👥",
      title: "Team",
      details: [
        "15+ Professionals",
        "Service Engineers",
        "After-Sales Support",
      ],
    },
    {
      icon: "⚙️",
      title: "Services",
      details: [
        "High-Value Tenders",
        "Machinery Supply",
        "Consumables & Spares",
      ],
    },
  ];

  return (
    <div className="flex flex-1 w-full flex-col items-center justify-center h-full bg-gradient-to-b from-transparent to-sky-700/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <h2 className="font-use-airbeat text-4xl md:text-5xl lg:text-6xl mb-4 text-white">
          GET IN TOUCH
        </h2>
        <p className="text-white/70 text-lg md:text-xl">
          Partner with India&apos;s Leading Security Solutions Provider
        </p>
      </motion.div>

      <div className="w-full max-w-6xl">
        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 * index,
                ease: "easeOut",
              }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="text-5xl mb-4 text-center">{item.icon}</div>
              <h3 className="text-white font-semibold text-xl mb-3 text-center">
                {item.title}
              </h3>
              <ul className="space-y-2">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="text-white/70 text-sm text-center">
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto"
        >
          <div
            className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-8 md:p-12 glow"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onMouseLeave={() => setGlowPos({ x: -100, y: -100 })}
            style={
              {
                "--x": `${glowPos.x}px`,
                "--y": `${glowPos.y}px`,
              } as React.CSSProperties
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h3 className="font-use-airbeat text-2xl md:text-3xl mb-6 text-white">
                  Why Choose JUI International?
                </h3>
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-start gap-3">
                    <span className="text-sky-400 text-xl">✓</span>
                    <span>
                      World-class representation in Security Printing & Smart
                      Card Industry
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-400 text-xl">✓</span>
                    <span>Established credentials since 1992</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-400 text-xl">✓</span>
                    <span>Expert handling of high-value tenders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-400 text-xl">✓</span>
                    <span>Highest reputation for fair dealings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-400 text-xl">✓</span>
                    <span>Professional capabilities & customer care</span>
                  </li>
                </ul>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="font-use-airbeat text-2xl md:text-3xl mb-6 text-white">
                  Our Expertise
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4 border-l-4 border-sky-400">
                    <h4 className="text-sky-400 font-semibold mb-2">
                      Banknote & Security Printing
                    </h4>
                    <p className="text-white/70 text-sm">
                      Comprehensive solutions for currency printing industry
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border-l-4 border-green-400">
                    <h4 className="text-green-400 font-semibold mb-2">
                      Smart Card Industry
                    </h4>
                    <p className="text-white/70 text-sm">
                      Advanced smart card technology and solutions
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border-l-4 border-purple-400">
                    <h4 className="text-purple-400 font-semibold mb-2">
                      Mint Industry
                    </h4>
                    <p className="text-white/70 text-sm">
                      Complete mint machinery and equipment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 text-center">
              <button className="px-10 py-4 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/50">
                Request a Consultation →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-center mt-8"
        >
          <p className="text-white/80 text-lg italic">
            &ldquo;Excellence in Security Solutions, Trusted Since 1992&rdquo;
          </p>
        </motion.div>
      </div>
    </div>
  );
}
