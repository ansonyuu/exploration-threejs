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
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={10} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
        <ambientLight intensity={0.5} color="white" />
        <directionalLight
          color="white"
          castShadow
          position={[0, 10, 0]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.2} color="white" />
        <pointLight position={[0, -10, 0]} intensity={1} color="white" />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>

          <Suspense fallback={null}>
            <InnerMesh position={[0, 1, 0]} args={[2, 2, 2]} />
          </Suspense>

          <OuterMesh position={[0, 1, 0]} args={[3, 8]} />
          <OuterMesh position={[0, 1, 0]} args={[4, 10]} />
        </group>
        <OrbitControls />
      </Canvas>
    </Container>
  );
}

export default App;
