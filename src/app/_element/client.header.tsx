"use client";
import { useState } from "react";
import "./glow.css";

export function CE_Headers() {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  return (
    <div className="flex flex-1 w-full flex-col items-center justify-center h-full bg-gradient-to-b from-sky-700/30 to-transparent">
      <div className="flex-1 flex flex-col items-center justify-center mt-20 px-4">
        <h1 className="font-use-airbeat text-6xl md:text-7xl lg:text-8xl mb-6 text-white">
          JUI GROUPS
        </h1>
        <p className="text-white/80 text-center max-w-2xl text-lg md:text-xl leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
      <div className="flex flex-2 items-end justify-center relative">
        <div
          className="p-3 flex justify-center items-center rounded-xl absolute bottom-[10vh] bg-white/10 w-full max-w-[350px] h-[48px] backdrop-blur glow"
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
          {/* <span className="text-center text-white text-lg">
                        scroll to explore the universe
                    </span> */}
        </div>
      </div>
    </div>
  );
}
