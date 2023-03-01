import { useState, useEffect, useRef } from "react";
import WebCam from "react-webcam";
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { ReactComponent as DownArrow } from '../../assets/svg/down_arrow.svg';
import './EyeTracking.scss';

let camera;

// var dragItem = document.querySelector("#webcam-container");
// var container = document.querySelector("body");

// var active = false;
// var currentX;
// var currentY;
// var initialX;
// var initialY;
// var xOffset = 0;
// var yOffset = 0;

// container.addEventListener("touchstart", dragStart, false);
// container.addEventListener("touchend", dragEnd, false);
// container.addEventListener("touchmove", drag, false);

// container.addEventListener("mousedown", dragStart, false);
// container.addEventListener("mouseup", dragEnd, false);
// container.addEventListener("mousemove", drag, false);

// function dragStart(e) {
//   if (e.type === "touchstart") {
//      initialX = e.touches[0].clientX - xOffset;
//      initialY = e.touches[0].clientY - yOffset;
//   } else {
//      initialX = e.clientX - xOffset;
//      initialY = e.clientY - yOffset;
//   }

//   if (e.target === dragItem) {
//      active = true;
//   }
// }

// function dragEnd(e) {
//   initialX = currentX;
//   initialY = currentY;

//   active = false;
// }

// function drag(e) {
//   if (active) {

//      e.preventDefault();

//      if (e.type === "touchmove") {
//         currentX = e.touches[0].clientX - initialX;
//         currentY = e.touches[0].clientY - initialY;
//      } else {
//         currentX = e.clientX - initialX;
//         currentY = e.clientY - initialY;
//      }

//      xOffset = currentX;
//      yOffset = currentY;

//      setTranslate(currentX, currentY, dragItem);
//   }
// }

// function setTranslate(xPos, yPos, el) {
//   el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
// }

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
          height={150}
          ref={webcamRef}
          draggable={true}
        />
      </div>
    )
}
export default EyeTracking;