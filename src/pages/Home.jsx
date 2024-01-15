import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'

import Island from '../models/island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'

import sakura from '../assets/sakura.mp3'
import { soundoff, soundon } from '../assets/icons'

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;    // Modify the volume
  audioRef.current.loop = true;    // We want it to loop

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if(isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    }
  }, [isPlayingMusic])


  const adjustIslandForScreenSize = () => {
    let screenScale = null; 
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if(window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  }


  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;
    
    if(window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0]
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4]
    }
    
    return [screenScale, screenPosition];
  }
  

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();


  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>

      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} camera={{ near: 0.1, far: 1000 }}>  {/* Acts as root component that sets up our entire 3D scene */}
        <Suspense fallback={<Loader/>}>  {/* Used for rendering loading screen */}
          {/* Lighting up our scene (Without lighting up scene we won't be able to see 3D models clearly) */}

          {/* Directional light simulates the light coming from a distant source like sun */}
          <directionalLight position={[1, 1, 1]} intensity={2}/>

          {/* Ambient light iluminates all objects in the scene equally without casting shadows, so we don't have to declare position here */}
          <ambientLight intensity={0.5}/>

          {/* A Point light emits light in all directions from a single point */}
          {/* In this case we won't need it bcoz we're outside, we've the sun and the ambient light */}
          {/* <pointLight/> */}

          {/* Spotlight is similar the point light in a sense that it emits light from 1 direction but in this case in shape of a cone, so you can also provide an angle */}
          {/* In this case we won;t be needing it */}
          {/* <spotLight/> */}

          {/* Hemisphere light illuminates the scene with a gradient */}
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>

          <Bird/>
          <Sky isRotating={isRotating}/>
          <Island position={islandPosition} scale={islandScale} rotation={islandRotation} isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={setCurrentStage}/>
          <Plane position={planePosition} scale={planeScale} isRotating={isRotating} rotation={[0, 20, 0]}/>
        </Suspense>
      </Canvas>

      {/* Volume Button */}
      <div className='absolute bottom-2 left-2'>
        <img src={isPlayingMusic ? soundon : soundoff} alt='sound' className='w-10 h-10 cursor-pointer object-contain' onClick={() => setIsPlayingMusic(!isPlayingMusic)}/>
      </div>
    </section>
  )
}

export default Home