import React, { Component, useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import {
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
  Stars,
} from "@react-three/drei";
import { useSpring, a } from "react-spring/three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import logo from "../../assets/logo.png";

const InnerMesh = ({ position, args, tweet }) => {
  const mesh = useRef(null);
  const side_abstract = useLoader(TextureLoader, logo);
  const side_tweet = useLoader(TextureLoader, logo);
  // useFrame(() => (mesh.current.rotation.y += 0.01));
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
        color="white"
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

function Cube(props) {
  const openChestCubeAnimation = useSpring({
    rotation: props.open ? [0, 0, 0] : [1.61, 0, 0],
    position: props.open ? [0, 1.5, 0] : [0, 0, 0],
    size: props.open ? [10, 10, 10] : [0, 0, 0],
  });

  return (
    <group>
      <a.group
        size={openChestCubeAnimation.size}
        rotation={openChestCubeAnimation.rotation}
        position={openChestCubeAnimation.position}
        visible={openChestCubeAnimation.visible}
      >
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -3, 0]}
        >
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <shadowMaterial attach="material" opacity={0.3} />
        </mesh>
        <Suspense size={props.size} visible={props.visible} fallback={null}>
          <InnerMesh args={props.size} visible={props.size} />
        </Suspense>
      </a.group>

      <OuterMesh position={[0, 0, 0]} args={[4.5, 8]} />
    </group>
  );
}

export default Cube;
