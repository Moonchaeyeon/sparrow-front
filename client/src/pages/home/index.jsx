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
import { useSelector } from 'react-redux';

const START = 'START';
const END = 'END';
const ING = 'ING';
const NONE = 'NONE';

function Home() {
    const birdSound = useSelector(state=>state.sound.birdSound);
    const fireSound = useSelector(state=>state.sound.fireSound);
    const oceanSound = useSelector(state=>state.sound.oceanSound);
    const rainSound = useSelector(state=>state.sound.rainSound);
    const selectedMusic = useSelector(state=>state.sound.selectedMusic);

    const timer = useRef(null);
    const time = useRef(0);
    const durationSecTime = useRef(0);
    const [sec, setSec] = useState(0);
    const [durationSec, setDuration] = useState(0);
    const [faceDetected, setFaceDetected] = useState(false);
    const [eyeClosed, setEyeClosed] = useState(false);
    const [status, setStatus] = useState(NONE);

    const [showUserMeditationList, setShowUserMeditationList] = useState(false);

    const [showWriteRecord, setShowWriteRecord] = useState(false);
    const [recordInfo, setRecordInfo] = useState({});

    const finishMeditation = () => {
        let recordInfo = {
            music: selectedMusic,
            birdSound: birdSound,
            fireSound: fireSound,
            oceanSound: oceanSound,
            rainSound: rainSound,
            duration: durationSec,
        }
        setRecordInfo(recordInfo);
        setShowWriteRecord(true);
    }

    const closeWriteRecord = () => {
        setShowWriteRecord(false);
        setStatus('NONE');
    }

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
                durationSecTime.current = 0;
                setSec(0);
                time.current = 0;
                break;
            case START:
                setSec(0);
                time.current = 0;
                clearInterval(timer.current);
                break;
            case ING:
                timer.current = setInterval(()=>{
                    setDuration(durationSecTime.current);
                    durationSecTime.current += 1;
                }, 1000)
            default:
        }
    }, [status])

    useEffect(()=>{
        switch(status) {
            case NONE:
                if (sec >= 5) {
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
            <ThreeCanvas status={status} setStatus={setStatus} finishMeditation={finishMeditation}/>
            <EyeTracking 
                setFaceDetected={setFaceDetected}
                setEyeClosed={setEyeClosed}
            />
            <button
                className="floating-btn show-record"
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
            <AudioHandler status={status}/>
            <MusicHandler status={status}/>

            { showWriteRecord && 
                <MeditationRecord 
                    recordInfo={recordInfo}
                    setShowModal={closeWriteRecord}
                    setStatus={setStatus}
                /> 
            }
        </>
    )
}
export default Home;