import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";

function VoyagerModelInner() {
  const { scene, error } = useGLTF("/assets/voyager/scene.gltf") as any;
  const ref = useRef<any>(null);
  let time = 0;
  const baseY = -35.05;

  useEffect(() => {
    if (error) {
      console.error("Error loading Voyager model:", error);
    } else if (scene) {
      console.log("Voyager model loaded successfully");
    }
  }, [scene, error]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    time += delta;
    ref.current.position.y = baseY + Math.sin(time * 2) * 0.004;
    ref.current.rotation.y += delta * 0.1;
  });

  if (error || !scene) {
    return null;
  }

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.01}
      position={[-210, baseY, -180.16]}
      rotation={[0.1, Math.PI / 3.8, -1.1]}
    />
  );
}

export function VoyagerModel() {
  return (
    <ErrorBoundary
      fallback={null}
      onError={(error) => console.error("Voyager model error:", error)}
    >
      <VoyagerModelInner />
    </ErrorBoundary>
  );
}

// Preload
try {
  useGLTF.preload("/assets/voyager/scene.gltf");
} catch (err) {
  console.error("Error preloading Voyager model:", err);
}
