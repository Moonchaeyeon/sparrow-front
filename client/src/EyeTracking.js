import { useState, useEffect, useRef } from "react";
import WebCam from "react-webcam";
import { FaceMesh, FACEMESH_LEFT_EYE, FACEMESH_RIGHT_EYE } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

let camera;

function EyeTracking() {
    const webcamRef = useRef();
    const [eyeClosed, setEyeClosed] = useState(false);

    const getDistance = (p1, p2) => {
        return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2);
    }

    const onResults = (results) => {
        if (results.multiFaceLandmarks) {
            for (const landmarks of results.multiFaceLandmarks) {
                const eyeClosedDistance = 0.02;
                const leftEyeClosed = getDistance(landmarks[386], landmarks[374]) < eyeClosedDistance;
                const rightEyeClosed = getDistance(landmarks[159], landmarks[145]) < eyeClosedDistance;
                setEyeClosed(leftEyeClosed && rightEyeClosed);
                // console.log(getDistance(landmarks[159], landmarks[145]), getDistance(landmarks[386], landmarks[374]));
                // let rh_right = landmarks[FACEMESH_LEFT_EYE[0]]
                // let rh_left = landmarks[FACEMESH_LEFT_EYE[8]]
                // console.log(rh_right, rh_left);
            }
        }
    }

    useEffect(() => {
        const faceMesh = new FaceMesh({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
          },
        });
        
        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
        
        faceMesh.onResults(onResults);
        
        if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null
        ) {
          camera = new Camera(webcamRef.current.video, {
            onFrame: async () => {
              await faceMesh.send({ image: webcamRef.current.video });
            },
            width: 1280,
            height: 720,
          });
          camera.start();
          console.log(camera);
        }
    }, []);

    return (
        <>
        <div>
            <div>{ eyeClosed ? '눈 감음' : '눈 뜸' }</div>
            <WebCam 
                autio={"false"}
                height={720}
                onUserMedia={()=>{

                }}
                ref={webcamRef}
            />
        </div>
        </>
    )
}
export default EyeTracking;