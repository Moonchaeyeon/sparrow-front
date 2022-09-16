import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Forest } from "./objects/Forest";
import { Cloud } from "./objects/Cloud";
import { MagicForest } from "./objects/MagicForest";
import { Sparrow } from "./objects/Sparrow";
import { MangoBird } from "./objects/MangoBird";

function ThreeCanvas({ status }) {
    const hour = new Date().getHours();
    const isMorning = (hour < 18 && hour > 5);

    return (
        <Canvas id="three-js-canvas" shadows>
            <OrbitControls />
            <PerspectiveCamera makeDefault fov={50} position={[3, 10, 3]}/>
            <color args={isMorning ? [0.561, 0.925, 1] : [0.098, 0.043, 0.231]} attach="background"/>
            {
                isMorning 
                ? <>
                    <ambientLight
                        color={[1, 1, 1]}
                        intensity={0.2}
                    />
                    <spotLight 
                        color={[0.961, 0.569, 0.106]}
                        intensity={1.0}
                        angle={1}
                        position={[0, 100, 0]}
                        castShadow
                        shadow-bias={-0.0001}
                    />
                </>
                : <>
                    <ambientLight
                        color={[0.616, 0, 1]}
                        intensity={0.05}
                    />
                    <spotLight 
                        color={[0.961, 0.569, 0.106]}
                        intensity={1.0}
                        angle={1}
                        position={[0, 100, 0]}
                        castShadow
                        shadow-bias={-0.0001}
                    />
                </>
            }
            <Forest />
            <Cloud/>
            {/* <Sparrow status={status}/> */}
            <MangoBird />
        </Canvas>
    )
}
export default ThreeCanvas;