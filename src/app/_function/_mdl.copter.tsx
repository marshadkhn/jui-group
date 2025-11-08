import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";

function CopterModelInner() {
  const group = useRef<any>(null);
  const { scene, animations, error } = useGLTF(
    "/assets/copter/scene.gltf"
  ) as any;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (error) {
      console.error("Error loading Copter model:", error);
    } else if (scene) {
      console.log("Copter model loaded successfully");
    }
  }, [scene, error]);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        action?.play();
      });
    }
  }, [actions]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
    }
  });

  if (error || !scene) {
    return null;
  }

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={0.3}
        position={[-0.5, -0.8, 0]}
        rotation={[0.2, -0.4, -0.3]}
      />
    </group>
  );
}

export function CopterModel() {
  return (
    <ErrorBoundary
      fallback={null}
      onError={(error) => console.error("Copter model error:", error)}
    >
      <CopterModelInner />
    </ErrorBoundary>
  );
}

// Preload
try {
  useGLTF.preload("/assets/copter/scene.gltf");
} catch (err) {
  console.error("Error preloading Copter model:", err);
}
