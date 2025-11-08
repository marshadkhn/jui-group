import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getAssetUrl, logGLTFLoadError } from "./_util.assets";

function CopterModelInner() {
  const group = useRef<any>(null);
  const modelPath = getAssetUrl("/assets/copter/scene.gltf");
  const { scene, animations, error } = useGLTF(modelPath) as any;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (error) {
      logGLTFLoadError("Copter", modelPath, error);
    } else if (scene) {
      console.log("[Copter Model] Loaded successfully from:", modelPath);
    }
  }, [scene, error, modelPath]);

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
if (typeof window !== "undefined") {
  try {
    const preloadPath = getAssetUrl("/assets/copter/scene.gltf");
    console.log("[Copter Model] Preloading from:", preloadPath);
    useGLTF.preload(preloadPath);
  } catch (err) {
    console.error("[Copter Model] Error preloading:", err);
  }
}
