
import  { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'


export function Fox({postion,rotation,scale,Animation, setAnimation,...props}) {
  const group = useRef()

  const { nodes, materials, animations } = useGLTF('/3d/fox.glb')
  const { actions } = useAnimations(animations, group)
  
  useEffect(()=>
  {
    // hit,idle,walk,walk.left
     Object.values(actions).forEach((action)=>action.stop())
      
     actions[Animation].play()
     if(Animation ==="hit")
     {
      actions[Animation].setEffectiveTimeScale(2.5)
     }


  },[Animation])


  return (
    <group  castShadow position={postion} rotation={rotation} scale={scale} ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          castShadow
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_7.skeleton}
        />
        <skinnedMesh
          castShadow
          name="Object_8"
          geometry={nodes.Object_8.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_8.skeleton}
        />
        <skinnedMesh
          castShadow
          name="Object_9"
          geometry={nodes.Object_9.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_9.skeleton}
        />
        <skinnedMesh
          castShadow
          name="Object_10"
          geometry={nodes.Object_10.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_10.skeleton}
        />
        <skinnedMesh
          castShadow
          name="Object_11"
          geometry={nodes.Object_11.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_11.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/3d/fox.glb')
