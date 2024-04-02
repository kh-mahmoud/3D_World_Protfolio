import { useEffect, useRef, useState } from 'react';
import { Island } from '../models/Island';
import { CameraControls, Float } from '@react-three/drei';
import { Bird, Plane, Sky } from '../Canvas';
import Floating_Home from './Floating_Home';
import { Floating_Rock } from '../models/Floating_Rock';




const Model = ({ isRotating, setIsRotating, currentStage, setCurrentStage }) => {

  const controls = useRef()
  const [PlaneRotation, setPlaneRotation] = useState([0, -20.5, 0])



  const intro = async () => {
    controls.current.dolly(-60)
    setTimeout(() => {
      setCurrentStage(1)
    }, 150);
  }

  const adjustPalne = () => {
    let PlaneScale = 0.004
    let PlanePosition = [0, 9.5, 39]


    return [PlaneScale, PlanePosition]
  }

  useEffect(() => {
    intro()
  }, [])

  const [PlaneScale, PlanePosition] = adjustPalne()

  return (
    <>
      <CameraControls maxPolarAngle={Math.PI / 2} smoothTime={1} maxDistance={60} ref={controls} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={2} position={[1, 1, 1]} />
      {/* <pointLight/> */}
      {/* <spotLight/> */}
      <hemisphereLight skyColor={"#b1e1ff"} groundColor={"#000000"} intensity={3} />


      <Island
        isRotating={isRotating}
        setIsRotating={setIsRotating}
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
        setPlaneRotation={setPlaneRotation}
      />
      <Sky isRotating={isRotating} />
      <Bird />
      <Plane
        scale={PlaneScale}
        position={PlanePosition}
        rotation={PlaneRotation}
        isRotating={isRotating}
        setIsRotating={setIsRotating}
        currentStage={currentStage}
       />

      <Float
        speed={2} // Animation speed, defaults to 1
        rotationIntensity={0} // XYZ rotation intensity, defaults to 1
        floatIntensity={1.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[1, 5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Floating_Rock />
      </Float>

      <Floating_Home />
    </>
  );
}

export default Model;
