"use client";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

function EarthModelInner() {
  const group = useRef<any>(null);

  // Use absolute path from public folder
  const modelPath = "/assets/earth/earth.gltf";

  // Load the GLTF model with error handling
  const { scene, error } = useGLTF(modelPath, true) as any;

  useEffect(() => {
    if (error) {
      console.error("Error loading Earth model:", error);
    } else if (scene) {
      console.log("Earth model loaded successfully");
    }
  }, [scene, error]);

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

// Preload the model with error handling
try {
  useGLTF.preload("/assets/earth/earth.gltf");
} catch (err) {
  console.error("Error preloading Earth model:", err);
}
