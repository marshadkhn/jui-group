"use client";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState, Suspense } from "react";
import "./glow.css";

// Placeholder 3D Models - replace with actual passport and smart card models
function PassportModel() {
  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[1.2, 0.05, 0.8]} />
      <meshStandardMaterial color="#8B0000" metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

function SmartCardModel() {
  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[1, 0.05, 0.6]} />
      <meshStandardMaterial color="#1e40af" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export function CE_Divisions() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("divisions-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const divisions = [
    {
      title: "Currency & Security Printing",
      description:
        "Advanced banknote printing with cutting-edge anti-counterfeit features, serving central banks and governments worldwide.",
      icon: "💵",
      model: <PassportModel />,
      gradient: "from-red-900/30 to-orange-900/30",
    },
    {
      title: "Digital Security",
      description:
        "Next-generation smart card solutions, biometric systems, and digital identity protection for the modern world.",
      icon: "💳",
      model: <SmartCardModel />,
      gradient: "from-blue-900/30 to-cyan-900/30",
    },
  ];

  return (
    <div
      id="divisions-section"
      className="flex flex-1 w-full flex-col items-center justify-center h-full px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="font-use-airbeat text-4xl md:text-5xl lg:text-6xl mb-4 text-white">
          OUR DIVISIONS
        </h2>
        <p className="text-white/70 text-lg md:text-xl">
          Choose your path to security excellence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
        {divisions.map((division, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2 + index * 0.2,
              ease: "easeOut",
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            className="relative"
          >
            <div
              className={`relative h-full min-h-[500px] rounded-2xl bg-gradient-to-br ${
                division.gradient
              } backdrop-blur-md border border-white/10 overflow-hidden glow transition-transform duration-300 ${
                hoveredCard === index ? "scale-105" : "scale-100"
              }`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setGlowPos({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
              onMouseLeave={() => setGlowPos({ x: -100, y: -100 })}
              style={
                {
                  "--x": `${glowPos.x}px`,
                  "--y": `${glowPos.y}px`,
                } as React.CSSProperties
              }
            >
              {/* 3D Model Section */}
              <div className="h-64 w-full">
                <Canvas
                  camera={{ position: [0, 0, 3], fov: 50 }}
                  gl={{ antialias: true, powerPreference: "high-performance" }}
                >
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    {division.model}
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      autoRotate
                      autoRotateSpeed={hoveredCard === index ? 4 : 2}
                    />
                  </Suspense>
                </Canvas>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="text-6xl mb-4 text-center">{division.icon}</div>
                <h3 className="font-use-airbeat text-2xl md:text-3xl mb-4 text-white text-center">
                  {division.title}
                </h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed text-center mb-6">
                  {division.description}
                </p>
                <div className="flex justify-center">
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white font-medium transition-all duration-300 hover:scale-105">
                    Explore {index === 0 ? "Printing" : "Digital"} →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
