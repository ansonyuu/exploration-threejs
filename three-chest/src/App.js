import React, { Suspense, useState } from "react";
import { softShadows, Loader, OrbitControls } from "@react-three/drei";
//Styles
import "./assets/styles/App.scss";
import { Canvas, useThree } from "react-three-fiber";
import Model from "./components/three/chest";
import Lights from "./components/three/lights";
import Floor from "./components/three/floor";
import Cube from "./components/three/cube";

import { useSpring } from "react-spring/three";

softShadows();

const ZoomWithOrbital = () => {
  const { gl, camera } = useThree();
  useSpring({
    from: {
      z: 30,
    },
    x: -5,
    y: 4,
    z: 4,

    onFrame: ({ x, y, z }) => {
      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
    },
  });

  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      target={[0, 0, 0]}
      args={[camera, gl.domElement]}
    />
  );
};
const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 4, 4], fov: 40 }}
      >
        <Suspense>
          <Lights />
          <Model open={open} setOpen={setOpen} />

          <Floor />
          <ZoomWithOrbital />
        </Suspense>
        <Cube open={open} setOpen={setOpen} />
      </Canvas>
    </>
  );
};

export default App;
