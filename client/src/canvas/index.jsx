import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Forest } from "./Forest";
import { Cloud } from "./Cloud";
import { MagicForest } from "./MagicForest";

function ThreeCanvas() {
    return (
        <Canvas id="three-js-canvas" shadows>
            <OrbitControls />
            <PerspectiveCamera makeDefault fov={50} position={[3, 10, 3]}/>
            <color args={[0.561, 0.925, 1]} attach="background"/>
            <ambientLight
                color={[1, 1, 1]}
                intensity={0.3}
            />
            <spotLight 
                color={"orange"}
                intensity={1.5}
                angle={1}
                position={[0, 100, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
            <Forest />
            <Cloud/>
        </Canvas>
    )
}
export default ThreeCanvas;