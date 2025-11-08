import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";
import { getAssetUrl, logGLTFLoadError } from "./_util.assets";

function VoyagerModelInner() {
  const modelPath = getAssetUrl("/assets/voyager/scene.gltf");
  const { scene, error } = useGLTF(modelPath) as any;
  const ref = useRef<any>(null);
  let time = 0;
  const baseY = -35.05;

  useEffect(() => {
    if (error) {
      logGLTFLoadError("Voyager", modelPath, error);
    } else if (scene) {
      console.log("[Voyager Model] Loaded successfully from:", modelPath);
    }
  }, [scene, error, modelPath]);

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
if (typeof window !== "undefined") {
  try {
    const preloadPath = getAssetUrl("/assets/voyager/scene.gltf");
    console.log("[Voyager Model] Preloading from:", preloadPath);
    useGLTF.preload(preloadPath);
  } catch (err) {
    console.error("[Voyager Model] Error preloading:", err);
  }
}
