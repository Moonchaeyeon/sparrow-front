import { useEffect, useState } from "react";
import { Mesh } from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils";

export function Bird() {
    const { scene, animations } = useGLTF(
        `${process.env.PUBLIC_URL}/assets/models/bird/bird.glb`    
    );
    const { actions } = useAnimations(animations, scene);
    const [time, setTime] = useState(0);

    useFrame((state, delta)=>{
        setTime(time + 0.01);
        scene.position.x = Math.sin(time) * 3.5;
        scene.position.z = Math.cos(time) * 3.5;
        scene.position.y = Math.sin(time) * 0.5;
        scene.rotation.y = degToRad(time * 57 - 90);
    })

    useEffect(()=>{
        actions['Take 001']?.play();
    }, [actions])

    useEffect(() => {
        scene.scale.set(1, 1, 1);
        scene.position.set(0, 3, 0);
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