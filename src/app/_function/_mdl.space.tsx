"use client";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";
import * as THREE from "three";
import { LoadingSpinner, ModelErrorFallback } from "./_other.misc";
import { getAssetUrl, logGLTFLoadError } from "./_util.assets";

function SpacesModelInner() {
  const modelPath = getAssetUrl("/assets/spaces/scene.gltf");
  const { scene, error } = useGLTF(modelPath) as any;
  const modelLoaded = useRef(false);
  const modelRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= delta * 0.0003;
    }
  });

  useEffect(() => {
    if (error) {
      logGLTFLoadError("Spaces", modelPath, error);
    } else if (scene) {
      console.log("[Spaces Model] Loaded successfully from:", modelPath);
      modelLoaded.current = true;
    }
  }, [scene, error, modelPath]);

  useEffect(() => {
    if (!scene) return;

    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(16, 16, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
    const circleTexture = new THREE.CanvasTexture(canvas);

    const starTypes = [
      { color: 0x99ffff, intensity: 1.2 + 3.0 },
      { color: 0x99ffff, intensity: 1.2 + 3.0 },
      { color: 0x99ffff, intensity: 1.2 + 3.0 },
      { color: 0x99ffff, intensity: 1.2 + 3.0 },
      { color: 0x99ffff, intensity: 1.2 + 3.0 },
      { color: 0x99ffff, intensity: 1.2 + 3.0 },
      { color: 0x99ffff, intensity: 1.2 + 3.0 },
      { color: 0xffa500, intensity: 1.5 + 3.0 },
      { color: 0xffa500, intensity: 1.5 + 3.0 },
      { color: 0xffa500, intensity: 1.5 + 3.0 },
      { color: 0xffa500, intensity: 1.5 + 3.0 },
      { color: 0xff3333, intensity: 1.3 + 3.0 },
      { color: 0xff3333, intensity: 1.3 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
      { color: 0xffffff, intensity: 2.0 + 3.0 },
    ];

    scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Points) {
        const positions = child.geometry.attributes.position;
        const colors = new Float32Array(positions.count * 3);

        for (let i = 0; i < positions.count; i++) {
          const starType =
            starTypes[Math.floor(Math.random() * starTypes.length)];
          const color = new THREE.Color(starType.color);
          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;
        }

        child.geometry.setAttribute(
          "color",
          new THREE.BufferAttribute(colors, 3)
        );

        child.material = new THREE.PointsMaterial({
          size: 0.1432,
          sizeAttenuation: true,
          transparent: true,
          opacity: 1,
          map: circleTexture,
          alphaTest: 0.5,
          depthWrite: false,
          vertexColors: true,
          toneMapped: false,
        });
      }
    });
  }, [scene]);

  if (error || !scene) {
    return null;
  }

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={[-10, -150, 60]}
      rotation={[-0.1, Math.PI / 2.4, 0]}
      scale={100}
    />
  );
}

export function SpacesModel() {
  return (
    <ErrorBoundary fallback={<ModelErrorFallback />}>
      <Suspense fallback={<LoadingSpinner />}>
        <SpacesModelInner />
      </Suspense>
    </ErrorBoundary>
  );
}

// Preload
if (typeof window !== "undefined") {
  try {
    const preloadPath = getAssetUrl("/assets/spaces/scene.gltf");
    console.log("[Spaces Model] Preloading from:", preloadPath);
    useGLTF.preload(preloadPath);
  } catch (err) {
    console.error("[Spaces Model] Error preloading:", err);
  }
}
