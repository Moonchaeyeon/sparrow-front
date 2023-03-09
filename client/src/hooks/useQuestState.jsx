import { useEffect } from "react"
import QuestApi from "../api/QuestApi"

export const useQuestState = () => {
    const questApi = new QuestApi();

    useEffect(()=>{
        const getUserCurrQuest = async () => {
            const res = await questApi.getQuestState();
            console.log(res);
        }
        getUserCurrQuest();
    }, [])
}