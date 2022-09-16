import { useEffect } from "react";
import { useFrame } from "@react-three/fiber"
import { Mesh } from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";

export function Island() {
    const { scene, animations } = useGLTF(
        `${process.env.PUBLIC_URL}/assets/models/island/handpainted_environment.glb`    
    );
    const { actions } = useAnimations(animations, scene);

    useEffect(()=>{
        console.log(actions['Take 001']);
        actions['Take 001']?.play();
    }, [actions])

    useEffect(() => {
        scene.scale.set(3.5, 3.5, 3.5);
        scene.position.set(3.5, -4, 0);
        scene.rotation.y = degToRad(-110);
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