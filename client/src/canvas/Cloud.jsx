import { useEffect } from "react";
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Mesh } from "three";

export function Cloud() {
    const gltf = useLoader(
        GLTFLoader,
        `${process.env.PUBLIC_URL}/assets/models/cloud/scene.gltf`
    );

    useEffect(() => {
        gltf.scene.scale.set(1,1,1);
        gltf.scene.position.set(Math.random() * 20 - 10, Math.random() * 10 + 15, Math.random() * 20 - 10);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                // object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf])

    return <primitive object={gltf.scene}/>
}