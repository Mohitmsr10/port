import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

import skyScene from '../assets/3d/sky.glb'
import { useFrame } from '@react-three/fiber';

const Sky = ({isRotating}) => {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();

  useFrame((_, delta) => {
    if(isRotating) {
      skyRef.current.rotation.y += 0.15 * delta;
    }
  })

  return (
    <mesh ref={skyRef}>
        <primitive object={sky.scene}/>
        {/* We didn't use a regular image as a background bcoz as we're gonna scroll through it, we need to feel like we're inside of a sphere bcoz as we rotate the clouds need to rotate as well */}
        {/* Thatswhy we use another 3D object */}
    </mesh>
  );
}

export default Sky