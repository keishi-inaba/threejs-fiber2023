import './App.css';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { config, useSpring, animated } from "@react-spring/three";

function Box(props) {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHoverd] = useState(false);

  useFrame(() => (ref.current.rotation.x += 0.01));

  const { scale } = useSpring({
    scale: clicked ? 2 : 1,
    config: config.wobbly,
  });

  return (
    <animated.mesh
      {...props}
      ref={ref}
      onClick={() => setClicked(!clicked) }
      onPointerOver={() => setHoverd(true)}
      onPointerOut={() => setHoverd(false)}
      scale={scale}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "green" : "orange"}/>
    </animated.mesh>
  )
}

function App() {
  return (
    <>
      <div id="canvas-container">
        <Canvas>
            <Box position={[-1.7, 0, 0]}/>
            <Box position={[1.7, 0, 0]}/>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
            <pointLight position={[-10, -10, -10]} />
        </Canvas>
      </div>
      <h1>Three.js Fiber</h1>
      <a href="#">more show</a>
    </>
  );
}

export default App;
