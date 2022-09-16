import { useEffect } from "react";
import { Mesh } from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useSelector } from "react-redux";

export function Rain() {
    const rainSound = useSelector(state=>state.sound.rainSound);
    const { scene, animations } = useGLTF(
        `${process.env.PUBLIC_URL}/assets/models/rain/rain.glb`    
    );
    const { actions } = useAnimations(animations, scene);

    useEffect(()=>{
        if (rainSound < 10) {
            scene.opacity = 0;
        } else {
            scene.opacity = 1;
            actions['Take 001'].timeScale = 0.2 * rainSound / 100 + 0.3;
        }
    }, [rainSound])

    useEffect(()=>{
        actions['Take 001'].timeScale = 0.3;
        actions['Take 001'].play();
    }, [actions])

    useEffect(() => {
        scene.scale.set(0.01, 0.01, 0.01);
        scene.position.set(0, -2.5, 0);
        scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [scene])

    return <primitive object={scene}/>
}