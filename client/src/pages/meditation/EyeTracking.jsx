import { useState, useEffect, useRef } from "react";
import WebCam from "react-webcam";
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { ReactComponent as DownArrow } from '../../assets/svg/down_arrow.svg';
import './EyeTracking.scss';

let camera;

function EyeTracking({ setFaceDetected, setEyeClosed }) {
    const webcamRef = useRef();
    const [hideCam, setHideCam] = useState(false);

    const getDistance = (p1, p2) => {
        return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2);
    }

    const onResults = (results) => {
      if (results.multiFaceLandmarks.length) {
        setFaceDetected(true);
        for (const landmarks of results.multiFaceLandmarks) {
            const eyeClosedDistance = 0.02;
            const leftEyeClosed = getDistance(landmarks[386], landmarks[374]) < eyeClosedDistance;
            const rightEyeClosed = getDistance(landmarks[159], landmarks[145]) < eyeClosedDistance;
            setEyeClosed(leftEyeClosed && rightEyeClosed);
        }
      } else {
        setFaceDetected(false);
      }
    }

    useEffect(() => {
        const faceMesh = new FaceMesh({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`;
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
        }
    }, [webcamRef, webcamRef.current]);

    return (
      <div className="webcam-container"
        id={hideCam?"hide":null}
      >
        <div className="show-webcam-toggle"
          onClick={()=>{setHideCam(!hideCam)}}
        >
          <DownArrow />
        </div>
        <WebCam 
          autio={"false"}
          // height={150}
          ref={webcamRef}
          draggable={true}
          mirrored={true}
        />
      </div>
    )
}
export default EyeTracking;