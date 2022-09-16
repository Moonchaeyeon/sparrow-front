import { useEffect } from "react";
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Mesh } from "three";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Background() {
    const gltf = useLoader(
        GLTFLoader,
        `${process.env.PUBLIC_URL}/assets/models/nature_pack/scene.gltf`
        // `${process.env.PUBLIC_URL}/assets/models/temple_at_night_modular_kit_02/scene.gltf`
    );
    const { scene, animations } = useGLTF(
        `${process.env.PUBLIC_URL}/assets/models/nature_pack/scene.gltf`  
    );
    const { actions } = useAnimations(animations, scene);

    useEffect(()=>{
        console.log(actions);
    }, [])

    useEffect(() => {
        console.log(gltf.scene)
        gltf.scene.scale.set(0.1,0.1,0.1);
        gltf.scene.position.set(1.8, -2.5, -2.5);
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