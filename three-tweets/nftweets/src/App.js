import "./App.scss";
import { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls, Stars } from "drei";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

import tweet from "./tweet.png";
import abstract from "./trump.png";

softShadows();

const InnerMesh = ({ position, args }) => {
  const mesh = useRef(null);
  const side_abstract = useLoader(TextureLoader, abstract);
  const side_tweet = useLoader(TextureLoader, tweet);
  const texture_4 = useLoader(TextureLoader, tweet);
  const texture_5 = useLoader(TextureLoader, tweet);
  const texture_6 = useLoader(TextureLoader, tweet);
  useFrame(() => (mesh.current.rotation.y += 0.01));
  return (
    <mesh castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial map={side_abstract} attachArray="material" />
      <meshStandardMaterial map={side_abstract} attachArray="material" />
      <meshStandardMaterial map={side_tweet} attachArray="material" />
      <meshStandardMaterial map={side_tweet} attachArray="material" />
      <meshStandardMaterial map={side_tweet} attachArray="material" />
      <meshStandardMaterial map={side_tweet} attachArray="material" />
    </mesh>
  );
};

const OuterMesh = ({ position, color, opacity, speed, args }) => {
  const mesh = useRef(null);
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.001));
  return (
    <mesh castShadow position={position} ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        attach="material"
        color="black"
        speed={(speed = 1)}
        factor={0.6}
        transparent={true}
        visible={true}
        depthTest={true}
        wireframe={true}
        opacity={0.3}
      />
    </mesh>
  );
};

function App() {
  return (
    <Container>
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <OrbitControls />
      </Canvas>
    </Container>
  );
}

export default App;
