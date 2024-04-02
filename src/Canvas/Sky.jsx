import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Sky = ({isRotating}) => {
    const sky = useGLTF("/3d/sky.glb")
    const skyRef = useRef()

    useFrame((_,delta)=>
    {
      if(isRotating)
      {
         skyRef.current.rotation.y+=0.15*-delta
      }
    })

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene}/>
    </mesh>
  );
}

export default Sky;
