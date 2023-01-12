import { Suspense, useState, useEffect, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
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
import useAudio from '../../hooks/useAudio';

const INIT = 'INIT'; // 맨 처음 상태
const START = 'START'; // meditation start
const END = 'END'; // meditation end
const ING = 'ING'; // meditiation ing
const NONE = 'NONE';

// music source
const startMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/meditation_start.m4a`);
const endMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/meditation_end.mp3`);
const defaultMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/default.mp3`);

function Home() {
    // sound info
    const birdSound = useSelector(state=>state.sound.birdSound);
    const fireSound = useSelector(state=>state.sound.fireSound);
    const oceanSound = useSelector(state=>state.sound.oceanSound);
    const rainSound = useSelector(state=>state.sound.rainSound);
    const selectedMusic = useSelector(state=>state.sound.selectedMusic);

    // const startAudioRef = useRef();
    // const endAudioRef = useRef();
    // const defaultAudioRef = useRef();
    // const selectedAudioRef = useRef();
    let [meditationMusic, setMeditationMusic] = useState(null);

    const timer = useRef(null);
    const time = useRef(0);
    const durationTimer = useRef(null);
    const durationSecTime = useRef(0);
    const [sec, setSec] = useState(0);
    const [durationSec, setDuration] = useState(0);
    const [faceDetected, setFaceDetected] = useState(false);
    const [eyeClosed, setEyeClosed] = useState(false);
    const [status, setStatus] = useState('');

    const [showUserMeditationList, setShowUserMeditationList] = useState(false);

    const [showWriteRecord, setShowWriteRecord] = useState(false);
    const [recordInfo, setRecordInfo] = useState({});

    const finishMeditation = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        let recordInfo = {
            music: selectedMusic,
            birdSound: birdSound,
            fireSound: fireSound,
            oceanSound: oceanSound,
            rainSound: rainSound,
            duration: durationSec,
            createdDate: `${year}-${month}-${date}`
        }
        setRecordInfo(recordInfo);
        setShowWriteRecord(true);
    }

    const closeWriteRecord = () => {
        setStatus(NONE);
        setShowWriteRecord(false);
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
        defaultMusic.loop = true;
        if (meditationMusic) meditationMusic.loop = true;
    }, [defaultMusic, meditationMusic])

    useEffect(()=> {
        setMeditationMusic(new Audio(selectedMusic.musicPath));
    }, [selectedMusic])

    useEffect(()=>{
        console.log(status);
        switch(status) {
            case NONE:
                // music
                meditationMusic.pause();
                endMusic.pause();
                defaultMusic.play();

                // action
                setShowWriteRecord(false);
                clearInterval(timer.current);
                console.log("clear");
                break;
            case END:
                // music
                meditationMusic?.pause();
                endMusic.play();

                // action
                clearInterval(timer.current);
                clearInterval(durationTimer.current);
                durationSecTime.current = 0;
                setSec(0);
                time.current = 0;
                finishMeditation();
                break;
            case START:
                // action
                setSec(0);
                time.current = 0;
                clearInterval(timer.current);
                setDuration(0);
                durationSecTime.current = 0;

                // music
                defaultMusic.pause();
                startMusic.play();
                setTimeout(()=>{
                    setStatus(ING);
                }, 9000)
                break;
            case ING:
                // music
                meditationMusic?.play();

                // action
                durationTimer.current = setInterval(()=>{
                    setDuration(durationSecTime.current);
                    durationSecTime.current += 1;
                }, 1000);
                break;
            default:
                // music
                setTimeout(()=>{
                    defaultMusic.play();
                }, 1000)

                // action
                setStatus(NONE);
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
                if (sec >= 2) {
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
            <ThreeCanvas status={status} setStatus={setStatus}/>
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

            { 
                showWriteRecord && 
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