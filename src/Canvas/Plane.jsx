import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

const Plane = ({ scale, position, rotation, isRotating,currentStage}) => {
  const ref = useRef();
  const { scene, animations } = useGLTF("/3d/plane.glb");
  const { actions } = useAnimations(animations, ref);


  useEffect(() => {
      actions["Main"].play();
      actions["Main"].setEffectiveTimeScale(2);
      if(currentStage && !isRotating)
      {
        actions["Main"].stop(); 
      }

  }, [isRotating]); 

  return (
    <mesh ref={ref} scale={scale} position={position} rotation={rotation}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
