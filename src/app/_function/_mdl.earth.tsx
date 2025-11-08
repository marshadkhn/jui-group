"use client";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export function EarthModel() {
  const group = useRef<any>(null);
  const { scene } = useGLTF("/assets/earth/earth.gltf", true);

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

// Preload the model
useGLTF.preload("/assets/earth/earth.gltf");
