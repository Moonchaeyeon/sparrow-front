import { get, post, put, patch, destroy } from "./AxiosCreate";

class QuestApi {
    getQuestState = async () => {
        const res = await get('quest-state');
        return res.data;
    }

    createQuestState = async (quest) => {
        const res = await post('quest-state', {
            title: quest.title,
            timer: quest.timer,
            musicThemeId:  quest.musicThemeId,
            musicUseFlag: quest.musicUseFlag,
        });

        return res.data;
    }

    deleteQuestState = async (questId) => {
        const res = await destroy(`quest-state`, {
            questStateId: questId
        });
        return res.data.data;
    }

    editQuestStateTimer = async (timer) => {
        const res = await put('quest-state/timer', {
            timer: timer
        });
        return res.data;
    }

    // record
    createQuestRecord = async (title, content, tags) => {
        const res = await post('quest-record', {
            title: title,
            content: content,
            tags: tags
        });
        return res.data;
    }

    editQuestRecord = async (questInfo) => {
        const res = await patch('quest-record', {
            questRecordId: questInfo.questRecordId,
            title: questInfo.title,
            content: questInfo.content,
            tags: questInfo.tags
        });
        return res.data;
    }

    deleteQuestRecord = async (questRecordId) => {
        const res = await destroy(`quest-record`, {
            questRecordId: questRecordId
        });
        return res.data;
    }

    getUserRecords = async () => {
        const res = await get('quest-record/all');
        return res.data;
    }
}
export default QuestApi;