import { useState, useEffect, useRef } from "react";
import { secToTime, getDiffSec } from "../utils/action/time";
import QuestApi from "../api/QuestApi"
import MusicApi from "../api/MusicApi"

// status
const NONE = 'NONE';
const QUEST_IN_PROGRESS = 'QUEST_IN_PROGRESS';
const QUEST_RECORDING = 'QUEST_RECORDING';

// music source
const startMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/meditation_start.m4a`);
const endMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/meditation_end.mp3`);
const defaultMusic = new Audio(`${process.env.PUBLIC_URL}/assets/audio/default.mp3`);

export const useQuestState = () => {
    const musicApi = new MusicApi();
    const questApi = new QuestApi();
    // music 관련 state
    const [musicThemeList, setMusicThemeList] = useState([]);
    const [selectedMusicTheme, setSelectedMusicTheme] = useState(); // selected music theme
    const [musicPlayList, setMusicPlayList] = useState([]); // selected music source
    
    // quest 관련 state
    const [questInfo, setQuestInfo] = useState(null);
    const [showQuestRecord, setShowQuestRecord] = useState(false);
    const [timer, setTimer] = useState(0);
    const [status, setStatus] = useState('NONE'); // NONE, QUEST_IN_PROGRESS, QUEST_RECORDING
    const timerRef = useRef(null);

    // useEffect(()=>{
    //     defaultMusic.loop = true;
    //     // if (music) music.loop = true;
    // }, [defaultMusic])

    useEffect(()=> {
        if (selectedMusicTheme) {
            for (let music of selectedMusicTheme.musics) {
                const newAudio = new Audio(music.musicPath);
                newAudio.loop = false;
                setMusicPlayList([...musicPlayList, newAudio])
                // if (music.musicUseFlag) {
                //     setMusic(new Audio(`${process.env.PUBLIC_URL}/assets/audio/${music.musicUrl}`));
                //     break;
                // }
            }
        }
    }, [selectedMusicTheme])

    useEffect(()=>{
        // status handler
        switch(status) {
            case NONE:
                musicPlayList[1]?.pause();
                endMusic.pause();
                defaultMusic.play();
                break;
            case QUEST_IN_PROGRESS:
                musicPlayList[1]?.pause();
                endMusic.play();
                break;
            case QUEST_RECORDING:
                defaultMusic.pause();
                endMusic.play();
                break;
            default:
                // music
                setTimeout(()=>{
                    defaultMusic.play();
                    defaultMusic.loop = true;
                }, 1000)

                // action
                setStatus(NONE);
        }

        return (()=>{
            // 초기화
            defaultMusic.pause();
            musicPlayList[1]?.pause();
            endMusic.pause();
        })
    }, [status])

    const closeQuestRecord = async () => {
        console.log("close!!!!");
        // quest state 삭제 후 questInfo 초기화
        // const res = await questApi.deleteQuestState(questInfo.questStateId);
        setQuestInfo(null);
        setTimer(0);
        setShowQuestRecord(false);
        setStatus(NONE);
    }

    const createQuestRecord = async (title, content, tags) => {
        await questApi.createQuestRecord(title, content, tags);
        setShowQuestRecord(false);
    }

    const editQuestTime = async (hour, min) => {
        await questApi.editQuestStateTimer(hour*60 + min);
        const editedQuest = {...questInfo};
        editedQuest.timer = hour*60 + min;
        setQuestInfo(editedQuest);
    }

    const createQuest = async (newQuestInfo) => {
        const newQuest = {
            title: newQuestInfo.title,
            timer: newQuestInfo.hour*60 + newQuestInfo.min,
            createdDate: new Date(),
            musicThemeId: 1,
            musicUseFlag: true,
        }
        const res = await questApi.createQuestState(newQuest);
        setQuestInfo(res);
        setStatus('QUEST_IN_PROGRESS');
    }

    const finishQuestState = async () => {
        setShowQuestRecord(true);
        setStatus('QUEST_RECORDING');
    }

    const settingTimer = () => {
        // quest status 에 따른 timer 세팅
        if (!questInfo?.isExpired) {
            const now = new Date();
            const questCreatedDate = new Date(questInfo.createdDate);
            const questEndDate = new Date(questCreatedDate.setMinutes(questCreatedDate.getMinutes() + questInfo.timer));
            if (now > questEndDate) {
                // quest가 종료되었다면
                setQuestInfo(null);
                setTimer(0);
            } else {
                // quest가 진행 중이라면
                const diffSec = getDiffSec(questCreatedDate);
                setTimer(diffSec);
            }
        } else {
            // 진행 중인 quest가 없다면
            setQuestInfo(null);
            setTimer(0);
        }
    }
    
    useEffect(()=>{
        // quest timer 제어
        if (questInfo) {
            timerRef.current = setInterval(()=>{
                if (timer > 0) {
                    setTimer(timer-1);
                } else {
                    // quest 끝냈을 시,
                    finishQuestState();
                    clearInterval(timerRef.current);
                }
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [timer])

    useEffect(()=>{
        questInfo && settingTimer();
    }, [questInfo])

    useEffect(()=>{
        const getUserCurrQuest = async () => {
            const res = await questApi.getQuestState();
            // 만료되지 않은 quest가 있다면 -> questInfo에 저장
            !(res?.isExpired) && setQuestInfo(res);
        }

        const getMusicThemeList = async () => {
            const res = await musicApi.getMusicThemeList();
            setMusicThemeList(res);
            setSelectedMusicTheme(res[0]);
        }
        getUserCurrQuest();
        getMusicThemeList();
    }, [])

    return { 
        questInfo, timer, createQuest, finishQuestState, editQuestTime, showQuestRecord, closeQuestRecord, createQuestRecord, 
        musicThemeList, selectedMusicTheme, setSelectedMusicTheme, status
    };
}