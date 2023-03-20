import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import QuestApi from "../api/QuestApi";

export const useQuestRecordList = () => {
    const questApi = new QuestApi();
    const auth = useSelector(state=>state.userData.auth);
    const [questRecordList, setQuestRecordList] = useState([]);

    const editQuestRecord = async (newRecord) => {
        const res = await questApi.editQuestRecord(newRecord);
        let temp = [...questRecordList];
        for (let el of temp) {
            if (el.questRecordId === newRecord.questRecordId) {
                el = res.data;
            }
        }
        setQuestRecordList(temp);
    }

    const deleteQuestRecord = async (recordId) => {
        await questApi.deleteQuestRecord(recordId);
        setQuestRecordList(questRecordList.filter(el=>el.questRecordId !== recordId));
    }

    useEffect(()=>{
        const getUserMeditationRecordList = async () => {
            const res = await questApi.getUserRecords();
            console.log(res);
            setQuestRecordList(res);
        }
        getUserMeditationRecordList();
    }, [auth])

    return { questRecordList, editQuestRecord, deleteQuestRecord };
}