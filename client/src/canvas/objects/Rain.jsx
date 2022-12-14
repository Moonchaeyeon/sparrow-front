import { useEffect } from "react";
import { Mesh } from "three";
import { useAnimations, useGLTF } from "@react-three/drei";

export function Rain() {
    const { scene, animations } = useGLTF(
        `${process.env.PUBLIC_URL}/assets/models/rain/rain.glb`    
    );
    const { actions } = useAnimations(animations, scene);

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