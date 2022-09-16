
import { useState, useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { AnimationMixer, Mesh } from "three";
import { useAnimations, useGLTF } from "@react-three/drei";

export function Sparrow() {
    const group = useRef()
    // const { nodes, materials, animations } = useGLTF(`${process.env.PUBLIC_URL}/assets/models/sparrow/sparrow.glb`)
    // const { actions } = useAnimations(animations, group)
    // useEffect(()=>{
    //     console.log(actions);
    //     // actions && actions.Default.play();
    // }, [actions])
    const gltf = useLoader(
        GLTFLoader,
        `${process.env.PUBLIC_URL}/assets/models/sparrow/sparrow.glb`
    );
    const [animationList, setAnimationList] = useState([]);
    const [mixer, setMixer] = useState();

    useFrame(({ state, delta })=>{ mixer && mixer.update(delta); })

    useEffect(() => {
        console.log(gltf);
        const sparrowMesh = gltf.scene.children[0];
        gltf.scene.scale.set(1, 1, 1);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
        // let tempMixer = new AnimationMixer(sparrowMesh);
        // setMixer(mixer);
        // let tempAniList = [];
        // for(let animation of gltf.animations) {
        //     tempAniList.push(tempMixer.clipAction(animation));
        // }
        // // tempAniList[0].play();
        // setAnimationList(tempAniList);
    }, [gltf])

    return <primitive object={gltf.scene}/>
    // return (
    //     <group ref={group}>
    //         <group name="Armature" position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.5, 0.5, 0.5]}>
    //             <primitive object={nodes.heap} />
    //             <skinnedMesh 
    //                 geometry={nodes.body_origin.geometry} 
    //                 // material={materials.yellow} 
    //                 skeleton={nodes.body_origin.skeleton} 
    //             />
    //             <skinnedMesh 
    //                 geometry={nodes.head_origin.geometry} 
    //                 // material={nodes.head_origin.material} 
    //                 skeleton={nodes.head_origin.skeleton} 
    //             />
    //             <skinnedMesh 
    //                 geometry={nodes.helmet.geometry}
    //                 material={nodes.helmet.material} 
    //                 skeleton={nodes.helmet.skeleton}
    //             />
    //         </group>
    //     </group>
    // )
}