import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function MyModel(props) {
  const { scene } = useGLTF('/model/scene.gltf') // Corrected path
  return <primitive object={scene} {...props} />
}

function Box(props) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'teal' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas style={{ background: 'black' }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[-2, 0, 0]} />
      <Box position={[2, 0, 0]} />
      <MyModel position={[0, 0, 0]} scale={1} />
      <OrbitControls />
      <gridHelper />
    </Canvas>
  )
}

useGLTF.preload('/model/scene.gltf')