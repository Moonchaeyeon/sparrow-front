import { useEffect } from "react";
import { useFrame } from "@react-three/fiber"
import { Mesh } from "three";
import { useAnimations, useGLTF } from "@react-three/drei";

export function MangoBird({ status, setStatus, finishMeditation }) {
    const { scene, animations } = useGLTF(
        `${process.env.PUBLIC_URL}/assets/models/cat/scene.gltf`    
    );
    const { actions } = useAnimations(animations, scene);

    useEffect(()=>{
        actions.BeingCute.play();
    }, [actions])

    useEffect(() => {
        scene.scale.set(0.05, 0.05, 0.05);
        scene.position.set(0, -3, 0);
        scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [scene])

    useFrame(({ state, delta })=>{ 
        switch(status) {
            case 'START':
                // if (scene.position.y < 2) {
                //     scene.position.y += 0.05;
                // } else if (scene.position.y >= 2) {
                //     setStatus('ING');
                // }
                setTimeout(()=>{
                    setStatus('ING');
                }, 9000)
                break;
            case 'END':
                // if (scene.position.y > 0) {
                //     scene.position.y -= 0.05;
                // } else if (scene.position.y <= 0) {
                //     finishMeditation();
                // }
                finishMeditation();
                break;
            case 'ING':
                // scene.position.y = 0;
                break;
            default:
                // scene.position.y = -3;
        }
     })

    return <primitive object={scene}/>
}