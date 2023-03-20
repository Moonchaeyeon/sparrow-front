import { useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sparkles, Stars } from '@react-three/drei';
import { Cat } from "./objects/Cat";
import { Island } from "./objects/Island";
import { Rain } from "./objects/Rain";
import { Ocean } from "./objects/Ocean";
import { Bird } from "./objects/Bird";

function ThreeCanvas() {
    const birdSound = useSelector(state=>state.sound.birdSound);
    const rainSound = useSelector(state=>state.sound.rainSound);
    const oceanSound = useSelector(state=>state.sound.oceanSound);
    const hour = new Date().getHours();
    const isMorning = (hour < 18 && hour > 5);
    console.log("rendering")

    return (
        <Canvas id="three-js-canvas" shadows
            style={isMorning?{backgroundImage: 'linear-gradient(135deg, #3fa5a6 0%, #7b80c9 100%)'}:{backgroundImage: 'linear-gradient(to top, #106c6d 0%, #202460 100%)'}}
        >
            <OrbitControls/>
            <PerspectiveCamera makeDefault fov={50} position={[8, 0, 8]} rotation={[1,1,1]}/>
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
            <pointLight
                color="orange"
                intensity={1}
                position={[0, 2, 0]}
            />
            <mesh position={[0, 1.5, 0]} scale={[0.5,0.5,0.5]} opacity={0.5}>
                <sphereGeometry/>
                <meshToonMaterial color="orange" transparent={true}/>
            </mesh>
            <Cat />
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
            { birdSound > 0 && <Bird /> }
            { rainSound > 0 && <Rain /> }
            { oceanSound > 0 ? <Ocean /> : <Island /> }
        </Canvas>
    )
}
export default ThreeCanvas;