import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";

function StationModelInner() {
  const group = useRef<any>(null);
  const { scene, animations, error } = useGLTF("/assets/station/scene.gltf") as any;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (error) {
      console.error("Error loading Station model:", error);
    } else if (scene) {
      console.log("Station model loaded successfully");
    }
  }, [scene, error]);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        action?.play();
      });
    }
  }, [actions]);

  if (error || !scene) {
    return null;
  }

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={0.4}
        position={[-10, 0, -320]}
      />
    </group>
  );
}

export function StationModel() {
  return (
    <ErrorBoundary
      fallback={null}
      onError={(error) => console.error("Station model error:", error)}
    >
      <StationModelInner />
    </ErrorBoundary>
  );
}

// Preload
try {
  useGLTF.preload("/assets/station/scene.gltf");
} catch (err) {
  console.error("Error preloading Station model:", err);
}