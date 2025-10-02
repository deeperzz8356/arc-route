import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { floorPlanData } from "@/data/floorPlanData";
import * as THREE from "three";

interface Room3DProps {
  points: number[][];
  name: string;
  isSelected?: boolean;
}

const Room3D = ({ points, name, isSelected }: Room3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create shape from points
  const shape = new THREE.Shape();
  points.forEach((point, index) => {
    if (index === 0) {
      shape.moveTo(point[0], point[1]);
    } else {
      shape.lineTo(point[0], point[1]);
    }
  });
  shape.closePath();

  // Calculate center for text label
  const centerX = points.reduce((sum, p) => sum + p[0], 0) / points.length;
  const centerY = points.reduce((sum, p) => sum + p[1], 0) / points.length;

  return (
    <group>
      {/* Room floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial
          color={isSelected ? "#4285f4" : "#f8f9fa"}
          transparent
          opacity={isSelected ? 0.8 : 0.6}
        />
      </mesh>

      {/* Room label */}
      <Text
        position={[centerX, 0.1, centerY]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.6}
        color="#202124"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

const Wall3D = ({ p1, p2 }: { p1: number[]; p2: number[] }) => {
  const length = Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
  const angle = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
  const centerX = (p1[0] + p2[0]) / 2;
  const centerZ = (p1[1] + p2[1]) / 2;

  return (
    <mesh
      position={[centerX, floorPlanData.wallHeight / 2, centerZ]}
      rotation={[0, -angle, 0]}
    >
      <boxGeometry args={[length, floorPlanData.wallHeight, floorPlanData.wallThickness]} />
      <meshStandardMaterial color="#5f6368" />
    </mesh>
  );
};

interface FloorPlan3DProps {
  selectedRoom?: string;
}

export const FloorPlan3D = ({ selectedRoom }: FloorPlan3DProps) => {
  return (
    <Canvas
      camera={{ position: [20, 25, 20], fov: 50 }}
      style={{ background: "#ffffff" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, 10, -5]} intensity={0.3} />

      {/* Floor base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[16, -0.01, 16]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#e8eaed" />
      </mesh>

      {/* Rooms */}
      {floorPlanData.rooms.map((room, index) => (
        <Room3D
          key={index}
          points={room.points}
          name={room.name}
          isSelected={room.name === selectedRoom}
        />
      ))}

      {/* Walls */}
      {floorPlanData.walls.map((wall, index) => (
        <Wall3D key={index} p1={wall.p1} p2={wall.p2} />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  );
};
