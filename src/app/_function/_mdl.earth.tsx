"use client";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getAssetUrl, logGLTFLoadError } from "./_util.assets";

function EarthModelInner() {
  const group = useRef<any>(null);

  // Use the asset URL helper for proper path resolution
  const modelPath = getAssetUrl("/assets/earth/earth.gltf");

  // Load the GLTF model with error handling
  const { scene, error } = useGLTF(modelPath, true) as any;

  useEffect(() => {
    if (error) {
      logGLTFLoadError("Earth", modelPath, error);
    } else if (scene) {
      console.log("[Earth Model] Loaded successfully from:", modelPath);
    }
  }, [scene, error, modelPath]);

  // If there's an error or no scene, return null
  if (error || !scene) {
    if (error) {
      console.error("Earth model failed to load:", error);
    }
    return null;
  }

  // Clone the scene to avoid issues with reusing the same object
  const clonedScene = scene.clone();

  return (
    <group ref={group}>
      <primitive
        object={clonedScene}
        scale={10}
        position={[-13, 0, -300]}
        castShadow
        receiveShadow
      />
    </group>
  );
}

export function EarthModel() {
  // Preload on mount (client-side only)
  useEffect(() => {
    const preloadPath = getAssetUrl("/assets/earth/earth.gltf");
    console.log("[Earth Model] Preloading from:", preloadPath);
    try {
      useGLTF.preload(preloadPath);
    } catch (err) {
      console.error("[Earth Model] Error preloading:", err);
    }
  }, []);

  return (
    <ErrorBoundary
      fallback={null}
      onError={(error, errorInfo) => {
        console.error("Earth model error boundary caught:", error, errorInfo);
      }}
    >
      <EarthModelInner />
    </ErrorBoundary>
  );
}
