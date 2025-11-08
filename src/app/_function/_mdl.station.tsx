import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getAssetUrl, logGLTFLoadError } from "./_util.assets";

function StationModelInner() {
  const group = useRef<any>(null);
  const modelPath = getAssetUrl("/assets/station/scene.gltf");
  const { scene, animations, error } = useGLTF(modelPath) as any;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (error) {
      logGLTFLoadError("Station", modelPath, error);
    } else if (scene) {
      console.log("[Station Model] Loaded successfully from:", modelPath);
    }
  }, [scene, error, modelPath]);

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
      <primitive object={scene} scale={0.4} position={[-10, 0, -320]} />
    </group>
  );
}

export function StationModel() {
  // Preload on mount (client-side only)
  useEffect(() => {
    const preloadPath = getAssetUrl("/assets/station/scene.gltf");
    console.log("[Station Model] Preloading from:", preloadPath);
    try {
      useGLTF.preload(preloadPath);
    } catch (err) {
      console.error("[Station Model] Error preloading:", err);
    }
  }, []);

  return (
    <ErrorBoundary
      fallback={null}
      onError={(error) => console.error("Station model error:", error)}
    >
      <StationModelInner />
    </ErrorBoundary>
  );
}
