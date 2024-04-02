import { Canvas } from "@react-three/fiber";
import Model from "../Canvas/Model";
import { Suspense, useEffect, useRef, useState } from "react";
import {HomeInfo, Loader} from "../components"
import sakura from "../Assets/sakura.mp3";
import { soundoff, soundon } from "../Assets/icons";
import { Kbd } from '@chakra-ui/react'
import { rightArrow,leftArrow } from "../Assets/icons";


const Home = () => {
  
  const [isRotating,setIsRotating]= useState(false)
  const [currentStage, setCurrentStage] = useState(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;


  return (
    <section className={`h-screen w-full relative border-2 ${isRotating? "cursor-grabbing":"cursor-grab"}`}>
        <div className="flex justify-center items-center absolute top-28 left-0 right-0 z-10">
           {currentStage && <HomeInfo currentStage={currentStage} setCurrentStage={setCurrentStage} />}
        </div>
       <Canvas  className="h-screen w-full bg-transparent">
           <Suspense fallback={<Loader/>}>
              <Model isRotating={isRotating} setIsRotating={setIsRotating} currentStage={currentStage} setCurrentStage={setCurrentStage} />
           </Suspense>
       </Canvas>
      <div className='absolute bottom-2 left-2 flex flex-col flex-col-reverse gap-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />

        <Kbd className="flex justify-center items-center">
           <img src={leftArrow} alt="left-arrow" />
        </Kbd>
        <Kbd className="flex justify-center items-center">
           <img src={rightArrow} alt="right-arrow" />
        </Kbd>
      </div>
    </section>
  );
}

export default Home;
