"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, Html, useProgress } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef } from "react";
import { SpacesModel } from "./_function/_mdl.space";
import { StationModel } from "./_function/_mdl.station";
import { CameraController } from "./_function/_ctr.camera";
import { EarthModel } from "./_function/_mdl.earth";
import { VoyagerModel } from "./_function/_mdl.voyager";
import { CE_Headers } from "./_element/client.header";
import { CE_Navbar } from "./_element/client.navbar";
import { CE_Mission } from "./_element/client.mission";
import { CE_Divisions } from "./_element/client.divisions";
import { CE_TrustBar } from "./_element/client.trustbar";
import { CE_Numbers } from "./_element/client.numbers";
import { CE_Features } from "./_element/client.features";
import { CE_Contact } from "./_element/client.contact";

function Loader() {
  const { progress } = useProgress();

  // Disable scrolling when loader is mounted
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <Html center>
      <div
        style={{
          width: "256px",
          backgroundColor: "grey",
          borderRadius: "9999px",
          padding: "4px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: "darkcyan",
            height: "12px",
            borderRadius: "9999px",
            transition: "width 0.3s",
          }}
        />
      </div>
      <p style={{ color: "darkcyan", marginTop: "8px" }}>
        {progress.toFixed(2)}% loaded
      </p>
    </Html>
  );
}

export default function Home() {
  const stationRef = useRef<any>(null);

  return (
    <main
      style={{
        position: "relative",
        scrollBehavior: "smooth",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {/* Navbar */}
      <CE_Navbar />

      {/* Scroll sections */}
      <div style={{ position: "relative", zIndex: 0 }}>
        {/* Section 1: Hero/Header */}
        <div
          id="out1"
          className="flex"
          style={{ height: "100vh", scrollSnapAlign: "start" }}
        >
          <CE_Headers />
        </div>

        {/* Section 2: Mission Statement */}
        <div
          id="out2"
          className="flex"
          style={{ height: "100vh", scrollSnapAlign: "start" }}
        >
          <CE_Mission />
        </div>

        {/* Section 3: Divisions */}
        <div
          id="out3"
          className="flex"
          style={{ height: "100vh", scrollSnapAlign: "start" }}
        >
          <CE_Divisions />
        </div>

        {/* Section 4: Trust Bar */}
        <div
          id="out4"
          className="flex"
          style={{ height: "100vh", scrollSnapAlign: "start" }}
        >
          <CE_TrustBar />
        </div>

        {/* Section 5: Numbers/Stats */}
        <div
          id="out5"
          className="flex"
          style={{ height: "100vh", scrollSnapAlign: "start" }}
        >
          <CE_Numbers />
        </div>

        {/* Section 6: Features */}
        <div
          id="out6"
          className="flex"
          style={{ height: "100vh", scrollSnapAlign: "start" }}
        >
          <CE_Features />
        </div>

        {/* Section 7: About */}
        <div
          id="out7"
          className="flex"
          style={{ height: "100vh", scrollSnapAlign: "start" }}
        >
          {/* <CE_About /> */}
        </div>

        {/* Section 8: Contact */}
        <div
          id="out8"
          className="flex"
          style={{ height: "100vh", scrollSnapAlign: "start" }}
        >
          <CE_Contact />
        </div>
      </div>
      {/* Fixed canvas container */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <Canvas
          dpr={[0.5, 0.8]} // Lower device pixel ratio for lower GPU usage
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 50,
          }}
        >
          <fog attach="fog" args={["#050505", 10, 50]} />
          <Suspense fallback={<Loader />}>
            <Environment preset="night" />
            <ambientLight intensity={0.01} />
            <EarthModel />
            <SpacesModel />
            <VoyagerModel />
            <group ref={stationRef}>
              <StationModel />
            </group>
            <CameraController />
            <EffectComposer>
              <Bloom
                intensity={0.7}
                luminanceThreshold={0.1}
                luminanceSmoothing={0.9}
                kernelSize={3}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}
