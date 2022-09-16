import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sparkles, Stars } from '@react-three/drei';
import { Forest } from "./objects/Forest";
import { MangoBird } from "./objects/MangoBird";
import { Background } from "./objects/Background";
import { Island } from "./objects/Island";
import { SparklesStory } from "./objects/Sparkles";
import { MeshReflectorMaterial } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";
import { Rain } from "./objects/Rain";

function ThreeCanvas({ status, setStatus, finishMeditation }) {
    const hour = new Date().getHours();
    const isMorning = (hour < 18 && hour > 5);

    return (
        <Canvas id="three-js-canvas" shadows
            style={isMorning?{backgroundImage: 'linear-gradient(135deg, #3fa5a6 0%, #7b80c9 100%)'}:{backgroundImage: 'linear-gradient(to top, #106c6d 0%, #202460 100%)'}}
        >
            <OrbitControls />
            <PerspectiveCamera makeDefault fov={50} position={[3, 3, 3]}/>
            {/* <color args={!isMorning ? [0.439, 0.776, 0.812] : [0.098, 0.043, 0.231]} attach="background"/> */}
            {
                !isMorning 
                ? <>
                    <ambientLight
                        color={[1, 1, 1]}
                        intensity={1}
                    />
                    <spotLight 
                        color={[1, 0.761, 0.784]}
                        intensity={0.5}
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
            <pointLight
                color="orange"
                intensity={1}
                position={[0, 2, 0]}
            />
            <mesh position={[0, 2, 0]} scale={[0.5,0.5,0.5]} opacity={0.8}>
                <sphereGeometry/>
                <meshToonMaterial color="orange"/>
            </mesh>
            {/* <Background /> */}
            <Island />
            <MangoBird status={status} setStatus={setStatus} finishMeditation={finishMeditation}/>
            <Sparkles 
                color={"#d7fc79"}
                size={5}
                count={30}
                amount={10}
                opacity={0.8}
                speed={0.3}
                position={[0,0,0]}
                scale={[5,5,5]}
            />
            {/* <Stars /> */}
            <Rain />
        </Canvas>
    )
}
export default ThreeCanvas;