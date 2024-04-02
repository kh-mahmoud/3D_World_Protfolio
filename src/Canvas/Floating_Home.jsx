import { Float, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Floating_Home = () => {
    const {scene} = useGLTF("3d/Floating_Home.glb")
    const rockRef=useRef()

    useFrame((_,delta)=>
    {
    rockRef.current.rotation.y+=0.15*delta
    })

  return (
    <Float
    speed={2} // Animation speed, defaults to 1
    rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
    floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
    floatingRange={[1, 4]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
  >
    <mesh ref={rockRef} scale={0.08} position={[-38,8,15]} rotation={[0,5,0]}>
       <primitive object={scene} />
    </mesh>
</Float>
  );
}

export default  Floating_Home;
