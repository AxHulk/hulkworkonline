import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import type { Group } from "three";

function HulkModel() {
  const { scene } = useGLTF("/models/hulk_bust.glb");
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.1}
      position={[0, -0.2, 0]}
    />
  );
}

const Hulk3DScene = () => (
  <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
    <ambientLight intensity={0.6} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <pointLight position={[-3, 3, 2]} intensity={0.5} color="#6B2FA0" />
    <Suspense fallback={null}>
      <HulkModel />
    </Suspense>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
  </Canvas>
);

export default Hulk3DScene;
