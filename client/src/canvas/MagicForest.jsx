import { useEffect } from "react";
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Mesh } from "three";

export function MagicForest() {
    const gltf = useLoader(
        GLTFLoader,
        `${process.env.PUBLIC_URL}/assets/models/magic_forest/scene.gltf`
    );

    useEffect(() => {
        console.log(gltf)
        gltf.scene.scale.set(0.1,0.1,0.1);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf])

    return <primitive object={gltf.scene}/>
}