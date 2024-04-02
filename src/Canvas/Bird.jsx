import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

const Bird = () => {
  const { scene, animations } = useGLTF("/3d/bird.glb");
  const birdRef = useRef();
  const { actions } = useAnimations(animations, birdRef);

  const [initialPosition, setInitialPosition] = useState([-30, 20, -5]);

  useEffect(() => {
    actions["Take 001"].play();
    actions["Take 001"].setEffectiveTimeScale(0.8);
  }, []);

  useFrame(({ clock, camera }) => {
    // Update the Y position to simulate bird-like motion using a sine wave
    birdRef.current.position.y = Math.sin(clock.elapsedTime * 2) * 0.5 + initialPosition[1];

    // Check if the bird reached a certain endpoint relative to the camera
    if (birdRef.current.position.x > camera.position.x + 5) {
      // Change direction to backward and rotate the bird 180 degrees on the y-axis
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bird's rotation
      birdRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
    if (birdRef.current.rotation.y === 0) {
      // Moving forward
      birdRef.current.position.x += 0.02;
      birdRef.current.position.z -= 0.02;
    } else {
      // Moving backward
      birdRef.current.position.x -= 0.02;
      birdRef.current.position.z += 0.02;
    }
  });

  return (
    <mesh ref={birdRef} position={initialPosition} scale={0.02} rotation={[0, 0, 0]}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;
