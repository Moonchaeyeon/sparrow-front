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

    // music source
    const startMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/meditation_start.m4a`);
    const endMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/meditation_end.mp3`);
    const defaultMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/default.m4a`);
    let [meditationMusic, setMeditationMusic] = useState(null);

    let [,,setPlayStartMusic] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/meditation_start.m4a`);
    let [,,setPlayDefaultMusic] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/default.mp3`);
    let [,,setPlayMeditationMusic] = useAudio(selectedMusic.musicPath);
    let [,,setPlayEndMusic] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/meditation_end.mp3`);

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
        endMusic.pause();
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
        meditationMusic.loop = true;
    }, [defaultMusic, meditationMusic])

    useEffect(()=> {
        setMeditationMusic(new Audio(selectedMusic.musicPath));
    }, [selectedMusic])

    useEffect(()=>{
        console.log(status);
        switch(status) {
            case NONE:
                // music
                defaultMusic.play();
                endMusic.pause();

                // setPlayStartMusic(false);
                // setPlayEndMusic(false);
                // setPlayDefaultMusic(true);
                // setPlayMeditationMusic(false);

                // defaultAudioRef.current.audioEl.current.play();
                // endAudioRef.current.audioEl.current.pause();

                // action
                setShowWriteRecord(false);
                clearInterval(timer.current);
                console.log("clear");
                break;
            case END:
                // music
                meditationMusic.pause();
                endMusic.play();
                // setPlayStartMusic(false);
                // setPlayEndMusic(true);
                // endMusic.play();
                // setPlayMeditationMusic(false);

                // selectedAudioRef.current.audioEl.current.pause();
                // endAudioRef.current.audioEl.current.play();

                // action
                clearInterval(timer.current);
                clearInterval(durationTimer.current);
                durationSecTime.current = 0;
                setSec(0);
                time.current = 0;
                break;
            case START:
                // action
                setSec(0);
                time.current = 0;
                clearInterval(timer.current);
                setDuration(0);
                durationSecTime.current = 0;
                // startAudioRef.current.audioEl.current.play();
                // console.log(startAudioRef.current.audioEl.current)
                // startAudioRef.current.audioEl.current.play();

                // music
                startMusic.play();
                // setPlayStartMusic(true);
                // startMusic.play();
                // setPlayDefaultMusic(false);
                // setPlayMeditationMusic(false);

                // startAudioRef.current.audioEl.current.play();
                break;
            case ING:
                // music
                meditationMusic.play();
                defaultMusic.pause();   

                // setPlayStartMusic(false);
                // setPlayMeditationMusic(true);

                // selectedAudioRef.current.audioEl.current.play();

                // action
                durationTimer.current = setInterval(()=>{
                    setDuration(durationSecTime.current);
                    durationSecTime.current += 1;
                }, 1000);
                break;
            default:
                // music
                // setPlayStartMusic(false);
                // setPlayDefaultMusic(true);
                // setPlayMeditationMusic(false);

                // defaultAudioRef.current.audioEl.current.play();

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
            <ThreeCanvas status={status} setStatus={setStatus} finishMeditation={finishMeditation}/>
            <EyeTracking 
                setFaceDetected={setFaceDetected}
                setEyeClosed={setEyeClosed}
            />
            {/* <ReactAudioPlayer
                src={`${process.env.PUBLIC_URL}/assets/audio/meditation_start.m4a`}
                ref={startAudioRef}
            />
            <ReactAudioPlayer
                src={`${process.env.PUBLIC_URL}/assets/audio/meditation_end.m4a`}
                ref={endAudioRef}
            />
            <ReactAudioPlayer
                src={`${process.env.PUBLIC_URL}/assets/audio/default.m4a`}
                ref={defaultAudioRef}
            />
            <ReactAudioPlayer
                src={selectedMusic.musicPath}
                ref={selectedAudioRef}
            /> */}
            {/* <audio
                src={`${process.env.PUBLIC_URL}/assets/audio/meditation_start.m4a`}
                ref={startAudioRef}
            />
            <audio
                src={`${process.env.PUBLIC_URL}/assets/audio/meditation_end.m4a`}
                ref={endAudioRef}
                loop
            />
            <audio
                src={`${process.env.PUBLIC_URL}/assets/audio/default.m4a`}
                ref={defaultAudioRef}
                loop
            />
            <audio
                src={selectedMusic.musicPath}
                ref={selectedAudioRef}
                loop
            /> */}
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