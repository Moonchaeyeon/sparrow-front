import { useState, useEffect, useRef } from "react";
import { secToTime, getDiffSec } from "../utils/action/time";
import QuestApi from "../api/QuestApi"

export const useQuestState = () => {
    const questApi = new QuestApi();
    const [questInfo, setQuestInfo] = useState(null);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);

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
        setTimer(newQuest.timer * 60);
    }

    const finishQuest = async () => {
        const res = await questApi.deleteQuestState(questInfo.questStateId);
        // setQuestInfo(null);
        setTimer(0);
    }

    const settingTimer = () => {
        if (!questInfo?.isExpired) {
            const now = new Date();
            const questCreatedDate = new Date(questInfo.createdDate);
            const questEndDate = new Date(questCreatedDate.setMinutes(questCreatedDate.getMinutes() + questInfo.timer));
            if (now > questEndDate) {
                // quest가 종료되었다면
                setQuestInfo(null);
                timer(0);
            } else {
                // quest가 진행 중이라면
                const diffSec = getDiffSec(questCreatedDate);
                setTimer(diffSec);
            }
        } else {
            // 진행 중인 quest가 없다면
            setQuestInfo(null);
            timer(0);
        }
    }
    
    useEffect(()=>{
        // quest timer 제어
        if (questInfo) {
            timerRef.current = setInterval(()=>{
                console.log(timer);
                setTimer(timer-1);
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
            res && setQuestInfo(res);

            // 진행 중인 quest가 있다면
            // if (!res?.isExpired) {
            //     setQuestInfo(res);
            //     const now = new Date();
            //     const questCreatedDate = new Date(res.createdDate);
            //     const questEndDate = new Date(questCreatedDate.setMinutes(questCreatedDate.getMinutes() + res.timer));
            //     if (now > questEndDate) {
            //         // quest가 종료되었다면
            //         setQuestInfo(null);
            //         timer(0);
            //     } else {
            //         // quest가 진행 중이라면
            //         setQuestInfo(res);
            //         const diffSec = getDiffSec(questCreatedDate);
            //         setTimer(diffSec);
            //         console.log(secToTime(diffSec));
            //     }
            // } else {
            //     // 진행 중인 quest가 없다면
            //     setQuestInfo(null);
            //     timer(0);
            // }
        }
        getUserCurrQuest();
    }, [])

    return { questInfo, timer, createQuest, finishQuest, editQuestTime };
}