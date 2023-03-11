import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ThreeCanvas from '../../canvas';
import UserMeditationList from './UserMeditationList';
import AudioHandler from './AudioHandler';
import MusicHandler from './MusicHandler';
import ShowStatus from './ShowStatus';
import { ReactComponent as Pencil } from '../../assets/svg/pencil2.svg';
import { useQuestState } from '../../hooks/useQuestState';
import QuestHandler from './questHandler';
import QuestRecord from '../../components/questRecord';
import './index.scss';

const INIT = 'INIT'; // 맨 처음 상태
const START = 'START'; // quest start
const END = 'END'; // quest end
const ING = 'ING'; // quest ing
const NONE = 'NONE';

// music source
const startMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/meditation_start.m4a`);
const endMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/meditation_end.mp3`);
const defaultMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/default.mp3`);

function Quest() {
    // sound info
    const birdSound = useSelector(state=>state.sound.birdSound);
    const fireSound = useSelector(state=>state.sound.fireSound);
    const oceanSound = useSelector(state=>state.sound.oceanSound);
    const rainSound = useSelector(state=>state.sound.rainSound);
    const selectedMusic = useSelector(state=>state.sound.selectedMusic);

    const { questInfo, createQuest, finishQuest, editQuestTime, timer, showQuestRecord, createQuestRecord } = useQuestState();

    let [meditationMusic, setMeditationMusic] = useState(null);

    // const timer = useRef(null);
    // const time = useRef(0);
    // const durationTimer = useRef(null);
    // const durationSecTime = useRef(0);
    // const [sec, setSec] = useState(0);
    // const [durationSec, setDuration] = useState(0);
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
            // duration: durationSec,
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
        defaultMusic.loop = true;
        if (meditationMusic) meditationMusic.loop = true;
    }, [defaultMusic, meditationMusic])

    useEffect(()=> {
        setMeditationMusic(new Audio(selectedMusic.musicPath));
    }, [selectedMusic])

    useEffect(()=>{
        // status handler
        switch(status) {
            case NONE:
                // music
                meditationMusic.pause();
                endMusic.pause();
                defaultMusic.play();

                // action
                setShowWriteRecord(false);
                // clearInterval(timer.current);
                break;
            case END:
                // music
                meditationMusic?.pause();
                endMusic.play();

                // action
                // clearInterval(timer.current);
                // clearInterval(durationTimer.current);
                // durationSecTime.current = 0;
                // setSec(0);
                // time.current = 0;
                finishMeditation();
                break;
            case START:
                // action
                // setSec(0);
                // time.current = 0;
                // clearInterval(timer.current);
                // setDuration(0);
                // durationSecTime.current = 0;

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
                // durationTimer.current = setInterval(()=>{
                //     setDuration(durationSecTime.current);
                //     durationSecTime.current += 1;
                // }, 1000);
                break;
            default:
                // music
                setTimeout(()=>{
                    defaultMusic.play();
                }, 1000)

                // action
                setStatus(NONE);
        }

        return (()=>{
            // 초기화
            defaultMusic.pause();
            meditationMusic?.pause();
            endMusic.pause();
            // clearInterval(timer.current);
            // clearInterval(durationTimer.current);
        })
    }, [status])

    return (
        <>
            <ThreeCanvas status={status} setStatus={setStatus}/>

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
            <ShowStatus status={status}/>
            <AudioHandler status={status}/>
            <MusicHandler status={status}/>

            <QuestHandler 
                questInfo={questInfo}
                timer={timer}
                createQuest={createQuest}
                finishQuest={finishQuest}
                editQuestTime={editQuestTime}
            />

            { 
                showQuestRecord && 
                <QuestRecord 
                    questInfo={questInfo}
                    setShowModal={closeWriteRecord}
                    createQuestRecord={createQuestRecord}
                    // setStatus={setStatus}
                /> 
            }
        </>
    )
}
export default Quest;