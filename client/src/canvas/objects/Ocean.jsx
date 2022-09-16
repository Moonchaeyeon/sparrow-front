import { useEffect } from "react";
import { Mesh } from "three";
import { useAnimations, useGLTF } from "@react-three/drei";

export function Ocean() {
    const { scene, animations } = useGLTF(
        `${process.env.PUBLIC_URL}/assets/models/ocean/ocean.glb`    
    );
    const { actions } = useAnimations(animations, scene);

    useEffect(()=>{
        actions['Animation']?.play();
    }, [actions])

    useEffect(() => {
        scene.scale.set(1, 1, 1);
        scene.position.set(0, -3.8, 0);
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