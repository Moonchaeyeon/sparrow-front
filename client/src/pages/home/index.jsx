import { Suspense, useState, useEffect, useRef } from 'react';
import ThreeCanvas from '../../canvas';
import MeditationRecord from '../../components/record/MeditationRecord';
import UserMeditationList from './UserMeditationList';
import AudioHandler from './AudioHandler';
import MusicHandler from './MusicHandler';
import EyeTracking from './EyeTracking';
import ShowStatus from './ShowStatus';
import { ReactComponent as Pencil } from '../../assets/svg/pencil.svg';
import './index.scss';

function Home() {
    const START = 'START';
    const END = 'END';
    const ING = 'ING';
    const NONE = 'NONE';

    const timer = useRef(null);
    const time = useRef(0);
    const durationTime = useRef(0);
    const [sec, setSec] = useState(0);
    const [duration, setDuration] = useState(0);
    const [faceDetected, setFaceDetected] = useState(false);
    const [eyeClosed, setEyeClosed] = useState(false);
    const [status, setStatus] = useState(NONE);

    const [showUserMeditationList, setShowUserMeditationList] = useState(false);

    useEffect(()=>{
        if (!faceDetected) {
            switch(status) {
                case START:
                    setSec(0);
                    time.current = 0;
                    setStatus(NONE);
                    break;
                case ING:
                    setStatus(END);
                    break;
                default:
            }
        }
    }, [faceDetected])

    useEffect(()=>{
        console.log(status);
        switch(status) {
            case NONE:
                clearInterval(timer.current);
                console.log("clear")
                break;
            case END:
                clearInterval(timer.current);
                durationTime.current = 0;
                setSec(0);
                time.current = 0;
                setStatus(NONE);
                break;
            case START:
                setSec(0);
                time.current = 0;
                clearInterval(timer.current);
                setStatus(ING);
                break;
            case ING:
                timer.current = setInterval(()=>{
                    setDuration(durationTime.current);
                    durationTime.current += 1;
                }, 1000)
            default:
        }
    }, [status])

    useEffect(()=>{
        switch(status) {
            case NONE:
                if (sec >= 10) {
                    setStatus(START);
                }
                break;
            case ING:
                if (sec >= 3) {
                    setStatus(END);
                }
                break;
            default:
        }
    }, [sec])

    useEffect(()=>{
        console.log(sec);
    }, [sec])

    useEffect(()=>{
        console.log(eyeClosed ? "눈 감음" : "눈 뜸");
        if (eyeClosed) {
            if (status === NONE) {
                timer.current = setInterval(()=>{
                    setSec(time.current);
                    time.current += 1;
                }, 1000)
            }

            if (status === ING) {
                clearInterval(timer.current);
                time.current = 0;
                setSec(0);
            }
        } else {
            if (status === NONE) {
                clearInterval(timer.current);
                time.current = 0;
                setSec(0);
            }

            if (status === ING) {
                timer.current = setInterval(()=>{
                    setSec(time.current);
                    time.current += 1;
                }, 1000)
            }
        }
    }, [eyeClosed])

    return (
        <>
            <ThreeCanvas />
            <EyeTracking 
                setFaceDetected={setFaceDetected}
                setEyeClosed={setEyeClosed}
            />
            <button
                className="show-record"
                onClick={()=>{setShowUserMeditationList(true)}}
            >
                <Pencil />
            </button>
            { 
                showUserMeditationList &&
                <UserMeditationList 
                    setShowModal={setShowUserMeditationList}
                />
            }
            <ShowStatus faceDetected={faceDetected} status={status}/>

            {/* <MeditationRecord /> */}
            <AudioHandler status={status}/>
            <MusicHandler status={status}/>
        </>
    )
}
export default Home;