"use client";

import React, { useRef, useEffect, useState, JSX } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import "./glow.css";

export function CE_Features() {
  const cardData = [
    {
      title: "World-Class Representation",
      description:
        "Representing renowned companies in Banknote & Security Printing, Mint Industry, Security Paper Mills, and Smart Card Industry across India.",
      element: <div>🌍</div>,
    },
    {
      title: "High-Value Tender Expertise",
      description:
        "Specialized in handling complex, high-value tenders with established credentials and proven track record since 1992.",
      element: <div>📋</div>,
    },
    {
      title: "Complete Supply Solutions",
      description:
        "Comprehensive supplier of machineries, raw materials, spares, and consumables for security printing and smart card industries.",
      element: <div>⚙️</div>,
    },
    {
      title: "Strategic Location",
      description:
        "Office located in Mumbai's business district with excellent connectivity to international airports and major highways.",
      element: <div>📍</div>,
    },
    {
      title: "Dedicated Warehouse Facility",
      description:
        "Modern warehouse for stocking spares, consumables, and raw materials ensuring quick delivery and reliable supply chain.",
      element: <div>🏭</div>,
    },
    {
      title: "Expert After-Sales Support",
      description:
        "Team of 15+ professionals including skilled service engineers providing comprehensive after-sales support and maintenance.",
      element: <div>🛠️</div>,
    },
  ];

  const slides = [...cardData, ...cardData, ...cardData];

  const sliderRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [cardWidth, setCardWidth] = useState(0);

  const resumeAnimation = () => {
    const cycle = cardData.length * cardWidth;
    const currentX = x.get();
    const normalizedX = ((currentX + cycle) % cycle) - cycle;
    x.set(normalizedX);
    controls.start({
      x: normalizedX - cycle,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  useEffect(() => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth / 4;
      setCardWidth(width);
      x.set(-cardData.length * width);
      resumeAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderRef, cardData.length, x, cardWidth]);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (cardWidth === 0) return;

    const snapStep = cardWidth * 4;
    const snapPoint = Math.round(currentX / snapStep) * snapStep;

    const cycle = cardData.length * cardWidth;
    const minX = -2 * cycle;
    const maxX = -cycle;

    if (snapPoint > maxX) {
      x.set(minX + (snapPoint - maxX));
    } else if (snapPoint < minX) {
      x.set(maxX - (minX - snapPoint));
    } else {
      x.set(snapPoint);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full">
      <div className="flex-1 flex items-start justify-center pt-[7vh]">
        <span className="font-use-airbeat text-3xl md:text-4xl lg:text-5xl">
          OUR FEATURES
        </span>
      </div>
      <div className="flex-1">
        <div className="flex flex-1 justify-center items-end pb-[7vh]">
          <div ref={sliderRef} className="overflow-hidden">
            <motion.div
              style={{ x }}
              animate={controls}
              drag="x"
              dragConstraints={{ left: -Infinity, right: Infinity }}
              onDragStart={() => controls.stop()}
              onDragEnd={() => {
                handleDragEnd();
                resumeAnimation();
              }}
              className="flex"
            >
              {slides.map((card, index) => (
                <div
                  key={index}
                  style={{ minWidth: cardWidth }}
                  className="p-4"
                >
                  <CardDex
                    title={card.title}
                    description={card.description}
                    element={card.element}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardDex({
  title,
  description,
  element,
}: {
  title: string;
  description: string;
  element: JSX.Element;
}) {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  return (
    <div
      className="w-full min-h-[280px] m-6 bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center justify-center glow border border-white/10"
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
      <div className="flex items-center justify-center mb-4 text-4xl">
        {element}
      </div>
      <div className="flex mb-3">
        <h3 className="font-use-airbeat text-center text-lg md:text-xl text-white">
          {title}
        </h3>
      </div>
      <div className="flex">
        <p className="text-center text-sm md:text-base text-white/80 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
