import { useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Mesh } from "three";

export function MangoBird({ status, setStatus, finishMeditation }) {
    const gltf = useLoader(
        GLTFLoader,
        `${process.env.PUBLIC_URL}/assets/models/bird/mango_bird.glb`
    );

    useEffect(() => {
        gltf.scene.scale.set(1,1,1);
        gltf.scene.position.set(0, -3, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf])

    useFrame(({ state, delta })=>{ 
        switch(status) {
            case 'START':
                if (gltf.scene.position.y < 0) {
                    gltf.scene.position.y += delta * 0.1;
                } else if (gltf.scene.position.y === 0) {
                    setStatus('ING');
                }
                break;
            case 'END':
                if (gltf.scene.position.y > -3) {
                    gltf.scene.position.y -= delta * 0.1;
                } else if (gltf.scene.position.y === -3) {
                    finishMeditation();
                }
                break;
            default:
                gltf.scene.position.y = -3;
        }
     })

    return <primitive object={gltf.scene}/>
}